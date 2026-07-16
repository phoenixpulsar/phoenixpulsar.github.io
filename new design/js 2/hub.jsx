/* ============================================================
   Phoenix Pulsar — Signal Hub (view)
   Avatar at centre; wires radiate to project + nav nodes.
   All nodes reveal on boot (jump in from the first frame).
   Scroll MORPHS the hub: the avatar shrinks into the left
   column, the bio fades in beneath it, and the constellation
   rearranges into a tidy two-column index — one continuous
   interpolation, no context switch.
   XState drives the overlay lifecycle; GSAP draws the wiring;
   MotionPath sends signal packets down every live trace.
   ============================================================ */
const { useState: useStateH, useEffect: useEffectH, useLayoutEffect: useLayoutEffectH, useRef: useRefH, useMemo: useMemoH } = React;

function prefersReduced() {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}
function lerp(a, b, t) { return a + (b - a) * t; }
function smooth(t) { return t * t * (3 - 2 * t); }

const HUB_FILTERS = [
  { id: "all", label: "All" },
  { id: "live", label: "Live" },
  { id: "funding", label: "Funding" },
  { id: "beta", label: "Beta" },
  { id: "shipped", label: "Shipped" },
  { id: "dev", label: "Building" },
  { id: "concept", label: "Concept" },
];

/* thin hook binding an XState service to React */
function useHubMachine() {
  const serviceRef = useRefH(null);
  if (!serviceRef.current) {
    serviceRef.current = window.XState.interpret(window.createHubMachine()).start();
  }
  const [state, setState] = useStateH(serviceRef.current.state);
  useEffectH(() => {
    const sub = serviceRef.current.subscribe(setState);
    return () => sub.unsubscribe && sub.unsubscribe();
  }, []);
  return [state, serviceRef.current.send];
}

function Hub({ tw }) {
  const [state, send] = useHubMachine();
  const [size, setSize] = useStateH({ w: window.innerWidth, h: window.innerHeight });
  const [booted, setBooted] = useStateH(false);
  const [revealedTier, setRevealedTier] = useStateH(-1);
  const [hot, setHot] = useStateH(null);
  const [filter, setFilter] = useStateH("all");
  const [prog, setProg] = useStateH(0);
  const [shownIds, setShownIds] = useStateH(() => new Set());
  const markShown = (id) => setShownIds((prev) => { if (prev.has(id)) return prev; const nx = new Set(prev); nx.add(id); return nx; });

  const avatarInnerRef = useRefH(null);
  const originRef = useRefH(null);
  const scrimRef = useRefH(null);
  const detailRef = useRefH(null);
  const aboutRef = useRefH(null);
  const contactRef = useRefH(null);
  const flipOriginRef = useRefH(null);

  const wireRefs = useRefH([]);
  const packetRefs = useRefH([]);
  const nodeRefs = useRefH([]);
  const packetTweens = useRefH([]);
  const animated = useRefH(new Set());
  const scrollIdleT = useRefH(0);
  const scrollingRef = useRefH(false);

  const spread = tw.spread == null ? 1 : tw.spread;
  const radial = useMemoH(() => window.hubLayout(size.w, size.h, spread), [size.w, size.h, spread]);
  const isSpine = radial.mode === "spine";
  const index = useMemoH(() => (isSpine ? null : window.hubIndexLayout(size.w, size.h)), [size.w, size.h, isSpine]);

  /* ---- morph: interpolate radial -> index by scroll progress ---- */
  const t = isSpine ? 0 : smooth(Math.max(0, Math.min(1, prog)));
  const layout = useMemoH(() => {
    if (isSpine || !index || t <= 0.0001) return radial;
    const byId = {};
    index.nodes.forEach((n) => { byId[n.id] = n; });
    const nodes = radial.nodes.map((n) => {
      const to = byId[n.id];
      if (!to) return n;
      return {
        ...n,
        x: lerp(n.x, to.x, t),
        y: lerp(n.y, to.y, t),
        curve: lerp(n.curve || 0, 0.05, t),
        side: t > 0.5 ? to.side : n.side,
      };
    });
    return {
      mode: t > 0.5 ? "index" : "radial",
      cx: lerp(radial.cx, index.cx, t),
      cy: lerp(radial.cy, index.cy, t),
      ox: lerp(radial.ox, index.ox, t),
      oy: lerp(radial.oy, index.oy, t),
      avatarW: lerp(radial.avatarW, index.avatarW, t),
      avatarH: lerp(radial.avatarH, index.avatarH, t),
      nodes,
      bio: index.bio,
    };
  }, [radial, index, t, isSpine]);
  const nodes = layout.nodes;
  const bioOn = !isSpine && t > 0.55;
  const bioOpacity = Math.max(0, Math.min(1, (t - 0.45) / 0.35));

  const isFiltered = (n) => n.type === "project" && filter !== "all" && n.project.status !== filter;

  /* within-tier index for reveal stagger */
  const staggerIndex = useMemoH(() => {
    const seen = {};
    return nodes.map((n) => { const k = n.tier; seen[k] = (seen[k] || 0); return seen[k]++; });
  }, [nodes.length]);

  /* ---- resize ---- */
  useEffectH(() => {
    let raf = 0;
    const onResize = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => setSize({ w: window.innerWidth, h: window.innerHeight }));
    };
    window.addEventListener("resize", onResize);
    return () => { window.removeEventListener("resize", onResize); cancelAnimationFrame(raf); };
  }, []);

  /* ---- boot + timed tier reveal (everything selectable from the first frame) ---- */
  useEffectH(() => {
    document.documentElement.classList.remove("no-js");
    const reduce = prefersReduced();
    if (reduce) { send("READY"); setBooted(true); setRevealedTier(2); return; }
    const t0 = setTimeout(() => { send("READY"); setBooted(true); setRevealedTier(0); }, 700);
    const t1 = setTimeout(() => setRevealedTier(1), 1350);
    const t2 = setTimeout(() => setRevealedTier(2), 1950);
    return () => { clearTimeout(t0); clearTimeout(t1); clearTimeout(t2); };
  }, []);

  /* ---- ambient life: avatar breathing + origin pulse ---- */
  useEffectH(() => {
    if (prefersReduced() || !window.gsap) return;
    const tweens = [];
    if (avatarInnerRef.current) {
      tweens.push(window.gsap.to(avatarInnerRef.current, { scale: 1.014, duration: 4.5, yoyo: true, repeat: -1, ease: "sine.inOut", transformOrigin: "50% 50%" }));
    }
    if (originRef.current) {
      const ring = originRef.current.querySelector(".hub-origin-ring");
      if (ring) tweens.push(window.gsap.fromTo(ring, { attr: { r: 6 }, opacity: 0.6 }, { attr: { r: 20 }, opacity: 0, duration: 2.6, ease: "power2.out", repeat: -1 }));
    }
    return () => tweens.forEach((tn) => tn.kill());
  }, [booted]);

  /* ---- packets ---- */
  function killPacket(i) {
    if (packetTweens.current[i]) { packetTweens.current[i].kill(); packetTweens.current[i] = null; }
    const p = packetRefs.current[i];
    if (p && window.gsap) window.gsap.set(p, { opacity: 0 });
  }
  function startPacket(i, delay) {
    const wire = wireRefs.current[i], packet = packetRefs.current[i];
    if (!wire || !packet || !window.gsap || !window.MotionPathPlugin || prefersReduced()) return;
    if (packetTweens.current[i]) packetTweens.current[i].kill();
    const dur = parseFloat(getComputedStyle(document.documentElement).getPropertyValue("--packet")) || 5.4;
    window.gsap.set(packet, { opacity: 0.9 });
    packetTweens.current[i] = window.gsap.to(packet, {
      duration: dur * (0.8 + Math.random() * 0.5),
      repeat: -1, ease: "none", delay: delay || 0, repeatDelay: Math.random() * 1.6,
      motionPath: { path: wire, align: wire, alignOrigin: [0.5, 0.5] },
    });
  }
  function restartPackets() {
    nodes.forEach((n, i) => {
      if (!booted || n.tier > revealedTier) return;
      if (isFiltered(n)) { killPacket(i); return; }
      startPacket(i, Math.random() * 0.6);
    });
  }
  const restartRef = useRefH(null);
  restartRef.current = restartPackets;

  /* ---- reveal choreography (runs on tier/filter changes, not per-frame) ---- */
  useLayoutEffectH(() => {
    const reduce = prefersReduced();
    nodes.forEach((n, i) => {
      const wire = wireRefs.current[i], node = nodeRefs.current[i];
      if (!wire || !node) return;
      const revealed = booted && n.tier <= revealedTier;

      if (!revealed) {
        const len = wire.getTotalLength ? wire.getTotalLength() : 300;
        if (window.gsap) window.gsap.set(wire, { strokeDasharray: len, strokeDashoffset: len });
        killPacket(i);
        return;
      }
      if (reduce || !window.gsap) {
        wire.style.strokeDasharray = "none"; wire.style.strokeDashoffset = "0";
        markShown(n.id); animated.current.add(n.id);
        return;
      }
      if (!animated.current.has(n.id)) {
        animated.current.add(n.id);
        const len = wire.getTotalLength ? wire.getTotalLength() : 300;
        const delay = staggerIndex[i] * 0.075;
        window.gsap.set(wire, { strokeDasharray: len, strokeDashoffset: len });
        window.gsap.to(wire, { strokeDashoffset: 0, duration: 0.9, ease: "power2.inOut", delay, onComplete: () => { wire.style.strokeDasharray = "none"; } });
        const dot = node.querySelector(".node-dot");
        if (dot) window.gsap.fromTo(dot, { scale: 0 }, { scale: 1, duration: 0.5, ease: "back.out(2)", delay: delay + 0.35 });
        setTimeout(() => markShown(n.id), (delay + 0.3) * 1000);
        if (!isFiltered(n)) startPacket(i, delay + 0.8);
      } else {
        wire.style.strokeDasharray = "none"; wire.style.strokeDashoffset = "0";
        markShown(n.id);
        if (isFiltered(n)) killPacket(i);
        else if (!packetTweens.current[i] && !scrollingRef.current) startPacket(i, 0);
      }
    });
  }, [revealedTier, booted, filter, isSpine, tw.speed]);

  /* ---- scroll: drives the morph; packets pause while paths move.
     NOTE: uses an rAF poll, not the 'scroll' event — embedded previews
     don't always deliver scroll events even though scrollY changes. ---- */
  useEffectH(() => {
    let raf = 0, last = -1, lastMove = 0;
    const killAll = () => { for (let i = 0; i < packetRefs.current.length; i++) killPacket(i); };
    const check = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      const p = max > 0 ? Math.max(0, Math.min(1, window.scrollY / max)) : 0;
      if (last < 0) { last = p; setProg(p); }
      else if (Math.abs(p - last) > 0.0005) {
        last = p; lastMove = performance.now();
        if (!scrollingRef.current) { scrollingRef.current = true; killAll(); }
        setProg(p);
      } else if (scrollingRef.current && performance.now() - lastMove > 300) {
        scrollingRef.current = false;
        if (restartRef.current) restartRef.current();
      }
    };
    const loop = () => { check(); raf = requestAnimationFrame(loop); };
    raf = requestAnimationFrame(loop);
    /* fallback for environments that throttle/suspend rAF */
    const iv = setInterval(check, 120);
    return () => { cancelAnimationFrame(raf); clearInterval(iv); };
  }, []);

  /* ---- open project with FLIP from the node dot ---- */
  function openProject(project, el) {
    let rect = null;
    if (el) { const d = el.querySelector(".node-dot"); rect = (d || el).getBoundingClientRect(); }
    flipOriginRef.current = rect;
    document.body.style.overflow = "hidden";
    send({ type: "OPEN_PROJECT", project });
  }
  function openAbout() { document.body.style.overflow = "hidden"; send("OPEN_ABOUT"); }
  function openContact() { document.body.style.overflow = "hidden"; send("OPEN_CONTACT"); }
  function closeOverlay() { document.body.style.overflow = ""; send("CLOSE"); }

  function onNodeActivate(n, el) {
    if (n.type === "project") return openProject(n.project, el);
    if (n.kind === "about") return openAbout();
    if (n.kind === "contact") return openContact();
    if (n.href) window.open(n.href, "_blank", "noopener");
  }

  const inDetail = state.matches("projectDetail");
  const inAbout = state.matches("about");
  const inContact = state.matches("contact");
  const project = state.context.project;

  /* ---- detail entrance (FLIP glyph + reveal) ---- */
  useEffectH(() => {
    if (!inDetail || !project) return;
    const g = window.gsap, reduce = prefersReduced(), el = detailRef.current;
    if (!el) return;
    el.scrollTop = 0;
    const reveals = el.querySelectorAll(".d-reveal");
    if (!g || reduce) { reveals.forEach((r) => r.classList.add("shown")); if (scrimRef.current) scrimRef.current.style.opacity = 1; return; }
    g.set(scrimRef.current, { opacity: 0 }); g.set(el, { opacity: 0 });
    g.to(scrimRef.current, { opacity: 1, duration: 0.4, ease: "power2.out" });
    g.to(el, { opacity: 1, duration: 0.4, ease: "power2.out" });
    const target = el.querySelector("[data-detail-glyph]");
    const o = flipOriginRef.current;
    if (target && o) {
      const tr = target.getBoundingClientRect();
      g.fromTo(target,
        { x: o.left - tr.left, y: o.top - tr.top, scale: 0.25, opacity: 0.4, transformOrigin: "top left" },
        { x: 0, y: 0, scale: 1, opacity: 1, duration: 0.75, ease: "power3.out" });
    }
    reveals.forEach((r) => r.classList.add("shown"));
    g.fromTo(reveals, { opacity: 0, y: 16 }, { opacity: 1, y: 0, duration: 0.6, ease: "power2.out", stagger: 0.06, delay: 0.18, clearProps: "transform" });
  }, [inDetail, project]);

  /* about / contact entrance */
  useEffectH(() => {
    const which = inAbout ? aboutRef.current : inContact ? contactRef.current : null;
    if (!which) return;
    const g = window.gsap, reduce = prefersReduced();
    which.scrollTop = 0;
    if (!g || reduce) { if (scrimRef.current) scrimRef.current.style.opacity = 1; return; }
    g.fromTo(scrimRef.current, { opacity: 0 }, { opacity: 1, duration: 0.4, ease: "power2.out" });
    g.fromTo(which, { opacity: 0, y: 18 }, { opacity: 1, y: 0, duration: 0.5, ease: "power3.out" });
  }, [inAbout, inContact]);

  /* esc closes any overlay */
  useEffectH(() => {
    const h = (e) => { if (e.key === "Escape" && (inDetail || inAbout || inContact)) closeOverlay(); };
    window.addEventListener("keydown", h);
    return () => window.removeEventListener("keydown", h);
  }, [inDetail, inAbout, inContact]);

  const overlayUp = inDetail || inAbout || inContact;
  const visibleFilters = useMemoH(() => {
    const present = new Set((window.PP_PROJECTS || []).map((p) => p.status));
    return HUB_FILTERS.filter((f) => f.id === "all" || present.has(f.id));
  }, []);

  return (
    <React.Fragment>
      {/* scroll track drives the morph */}
      <div className="hub-scroll" style={{ height: isSpine ? "auto" : "260vh" }} aria-hidden={overlayUp}>
        <div className="hub-stage" style={isSpine ? { position: "relative", height: "100vh" } : null}>
          <div className="hub-field">
            {/* wires */}
            <svg className="hub-wires" viewBox={`0 0 ${size.w} ${size.h}`} preserveAspectRatio="none" width="100%" height="100%">
              {nodes.map((n, i) => {
                const d = window.hubPath(layout.ox, layout.oy, n.x, n.y, n.curve);
                const cls = "wire" + (n.nav ? " nav" : "")
                  + (hot === i ? " hot" : hot != null ? " dim" : "")
                  + (isFiltered(n) ? " off" : "");
                return <path key={n.id} ref={(el) => (wireRefs.current[i] = el)} className={cls} d={d} />;
              })}
              {/* origin at the goggles */}
              <g ref={originRef} transform={`translate(${layout.ox},${layout.oy})`}>
                <circle className="hub-origin-ring" r="6" />
                <circle className="hub-origin" r="3.2" />
              </g>
              {/* packets — one per wire, travelling outward */}
              {nodes.map((n, i) => (
                <circle key={"p" + n.id} ref={(el) => (packetRefs.current[i] = el)}
                  className={"packet" + (hot === i ? " hot" : "")} r={n.nav ? 2.4 : 3} cx="0" cy="0" opacity="0" />
              ))}
            </svg>

            {/* avatar */}
            <div className="hub-avatar" style={{ left: layout.cx, top: layout.cy, width: layout.avatarW }}>
              <div className="av-inner" ref={avatarInnerRef} style={{ position: "relative" }}>
                <div className="av-glow" />
                <img className="av-img" src="assets/avatar.jpeg" alt="Phoenix Pulsar" draggable="false" />
                <div className="av-ground" />
              </div>
            </div>

            {/* bio — fades in as the hub morphs to index view */}
            {!isSpine && index && (
              <div className="hub-bio" style={{ left: index.bio.x, top: index.bio.y, width: index.bio.w, opacity: bioOpacity, pointerEvents: bioOn ? "auto" : "none" }}>
                <span className="hb-kicker">The signal</span>
                <p className="hb-lead">Passionate about how to use AI and visualization to reduce cognitive load around complex systems.</p>
                <p className="hb-mantra">Find friction. Cut it open.<br />Build the machine.<br />Ship before the idea gets bored.</p>
                <button className="hb-more" type="button" onClick={openAbout}>Read the full story <span aria-hidden>→</span></button>
              </div>
            )}

            {/* nodes */}
            {nodes.map((n, i) => {
              const s = n.type === "project" ? window.PP_STATUS[n.project.status] : null;
              const stateCls = n.type === "project" ? " " + n.project.status : "";
              return (
                <button key={n.id} type="button"
                  ref={(el) => (nodeRefs.current[i] = el)}
                  className={`hub-node side-${n.side}${stateCls}${shownIds.has(n.id) ? " shown" : ""}${isFiltered(n) ? " filtered" : ""}`}
                  data-type={n.type}
                  style={{ left: n.x, top: n.y, "--dot": s ? s.dot : "var(--signal)" }}
                  onMouseEnter={() => setHot(i)} onMouseLeave={() => setHot(null)}
                  onFocus={() => setHot(i)} onBlur={() => setHot(null)}
                  onClick={(e) => onNodeActivate(n, e.currentTarget)}
                  aria-label={n.type === "project" ? `${n.label} — ${s ? s.label : ""}` : n.label}>
                  <span className="node-dot" />
                  <span className="node-card">
                    <span className="node-name">{n.label}</span>
                    {n.type === "project" && <span className="node-meta">{(s.label === "SEEKING FUNDING" ? "FUNDING" : s.label)} · {n.project.year}</span>}
                    {n.type === "project" && <span className="node-summary">{n.project.summary}</span>}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* HUD: filter + cue */}
      <div className="hub-hud">
        <div className="hub-filter" role="group" aria-label="Filter projects by status">
          {visibleFilters.map((f) => (
            <button key={f.id} type="button" className={"fchip" + (filter === f.id ? " on" : "")}
              onClick={() => setFilter(f.id)}>{f.label}</button>
          ))}
        </div>
        {!isSpine && (
          <div className="cue">
            {t < 0.5 ? "Scroll — the hub reorganises" : "Index view · scroll up for the constellation"} <span className="dot" />
          </div>
        )}
      </div>
      <div className={"hub-hint" + (booted && t < 0.4 ? " show" : "")}>
        Every node is live. Follow a wire, or jump straight in.
      </div>

      {/* boot veil */}
      <div className={"hub-boot" + (booted ? " gone" : "")}>
        <span className="bt">Establishing signal…</span>
      </div>

      {/* overlays */}
      <div className={`detail-scrim ${overlayUp ? "open" : ""}`} ref={scrimRef} onClick={closeOverlay} />
      <div className={`detail ${inDetail ? "open" : ""}`} ref={detailRef}>
        {project && <ProjectDetail project={project} onClose={closeOverlay} animateKey={project.id} />}
      </div>
      <div className={`detail ${inAbout ? "open" : ""}`} ref={aboutRef}>
        <div className="detail-bar">
          <button className="detail-close" onClick={closeOverlay}><span aria-hidden>←</span> Back</button>
          <Pulsar size={20} />
          <span className="db-name">About · the signal</span>
        </div>
        <div className="about-overlay-inner">
          <AboutSection />
        </div>
      </div>
      <div className={`detail ${inContact ? "open" : ""}`} ref={contactRef}>
        <div className="detail-bar">
          <button className="detail-close" onClick={closeOverlay}><span aria-hidden>←</span> Back</button>
          <Pulsar size={20} />
          <span className="db-name">Contact · transmit a signal</span>
        </div>
        <div className="contact-overlay-inner">
          {inContact && <ContactSection onDone={closeOverlay} />}
        </div>
      </div>
    </React.Fragment>
  );
}

window.Hub = Hub;
