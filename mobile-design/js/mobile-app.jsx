/* ============================================================
   Phoenix Pulsar — MOBILE app
   Vertical signal spine: avatar beacon on top, every project +
   nav node hanging off one live wire. Tap a node to open the
   full-screen detail / about / contact overlays.
   ============================================================ */
const { useState: useStateM, useEffect: useEffectM, useRef: useRefM, useMemo: useMemoM } = React;

const M_FILTERS = [
  { id: "all", label: "All" },
  { id: "live", label: "Live" },
  { id: "funding", label: "Funding" },
  { id: "beta", label: "Beta" },
  { id: "shipped", label: "Shipped" },
  { id: "dev", label: "Building" },
  { id: "concept", label: "Concept" },
];

const M_NAV = [
  { id: "about", label: "About", meta: "The signal", kind: "about" },
  { id: "contact", label: "Contact", meta: "Transmit", kind: "contact" },
  { id: "github", label: "GitHub", meta: "↗", href: "https://github.com/phoenixpulsar" },
  { id: "notes", label: "Notes", meta: "↗", href: "https://phoenixpulsar.github.io/docs/intro" },
  { id: "blog", label: "Blog", meta: "↗", href: "https://phoenixpulsar.github.io/blog" },
];

function MobileApp() {
  const [dark, setDark] = useStateM(() => {
    try { return localStorage.getItem("pp-mobile-theme") === "dark"; } catch (e) { return false; }
  });
  const [filter, setFilter] = useStateM("all");
  const [overlay, setOverlay] = useStateM(null); // null | {type:'project',p} | {type:'about'} | {type:'contact'}
  const [scrolled, setScrolled] = useStateM(false);
  const listRef = useRefM(null);
  const heroAvRef = useRefM(null);
  const progRef = useRefM(null);
  const gridRef = useRefM(null);

  useEffectM(() => {
    document.documentElement.setAttribute("data-theme", dark ? "dark" : "light");
    try { localStorage.setItem("pp-mobile-theme", dark ? "dark" : "light"); } catch (e) {}
  }, [dark]);

  useEffectM(() => {
    const f = () => setScrolled(window.scrollY > 8);
    f();
    window.addEventListener("scroll", f, { passive: true });
    return () => window.removeEventListener("scroll", f);
  }, []);

  /* entrance reveal — staggered down the spine */
  useEffectM(() => {
    document.documentElement.classList.remove("no-js");
    const els = document.querySelectorAll(".m-reveal");
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    els.forEach((el, i) => {
      if (reduce) { el.classList.add("in"); return; }
      setTimeout(() => el.classList.add("in"), 120 + i * 55);
    });
  }, []);

  /* scroll morph — rAF poll (embedded previews don't always fire scroll events).
     The beacon avatar shrinks + docks into the top bar; the teal wire
     energises down the spine and each node powers on as the wire reaches
     it. Fully reversible on scroll-up. Scroll-linked, so it also runs
     under reduced-motion (only the autonomous packets are CSS-disabled). */
  useEffectM(() => {
    const apply = () => {
      const inner = heroAvRef.current;
      if (inner) {
        const beacon = inner.closest(".m-avatar");
        const range = window.innerHeight * 0.5;
        const hp = Math.max(0, Math.min(1, window.scrollY / Math.max(1, range)));
        // shrink toward a small beacon that lands centred in the top bar
        const scale = 1 - 0.865 * hp;          // 1 -> ~0.135  (230px -> ~31px)
        inner.style.transform = `scale(${scale.toFixed(3)})`;
        inner.style.opacity = (1 - 0.12 * hp).toFixed(3);
        if (beacon) beacon.style.filter = hp > 0.6
          ? `drop-shadow(0 2px 10px color-mix(in srgb, var(--signal) ${((hp-0.6)*120).toFixed(0)}%, transparent))`
          : "none";
      }
      if (gridRef.current) {
        gridRef.current.style.transform = `translateY(${(window.scrollY * -0.06).toFixed(1)}px)`;
      }
      const spine = listRef.current, prog = progRef.current;
      if (spine && prog) {
        const r = spine.getBoundingClientRect();
        const beam = window.innerHeight * 0.58;      // where the wire-front sits
        const max = document.documentElement.scrollHeight - window.innerHeight;
        const frac = max > 0 ? Math.max(0, Math.min(1, window.scrollY / max)) : 0;
        // beam-driven through the middle; scroll-fraction guarantees the
        // wire completes (and the last nodes light) at the bottom of the page
        let h = Math.max(beam - r.top, r.height * frac);
        h = Math.max(0, Math.min(r.height, h));
        prog.style.height = h.toFixed(0) + "px";
        spine.querySelectorAll(".m-node, .m-spine-label").forEach((el) => {
          const er = el.getBoundingClientRect();
          el.classList.toggle("lit", er.top + er.height * 0.5 - r.top <= h);
        });
      }
    };
    const loop = () => { apply(); };
    apply();
    window.addEventListener("scroll", loop, { passive: true });
    window.addEventListener("resize", loop);
    /* interval fallback: rAF is throttled/frozen in backgrounded iframes */
    const iv = setInterval(apply, 100);
    let raf = requestAnimationFrame(function spin() { apply(); raf = requestAnimationFrame(spin); });
    return () => {
      window.removeEventListener("scroll", loop);
      window.removeEventListener("resize", loop);
      clearInterval(iv);
      cancelAnimationFrame(raf);
    };
  }, []);

  /* body scroll lock while an overlay is up */
  useEffectM(() => {
    document.body.style.overflow = overlay ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [overlay]);

  /* esc closes overlays (external keyboards / desktop preview) */
  useEffectM(() => {
    const h = (e) => { if (e.key === "Escape") setOverlay(null); };
    window.addEventListener("keydown", h);
    return () => window.removeEventListener("keydown", h);
  }, []);

  const close = () => setOverlay(null);

  const visibleFilters = useMemoM(() => {
    const present = new Set((window.PP_PROJECTS || []).map((p) => p.status));
    return M_FILTERS.filter((f) => f.id === "all" || present.has(f.id));
  }, []);

  /* stable, meaningful order: status weight then year desc */
  const projects = useMemoM(() => {
    const wgt = { live: 0, funding: 1, beta: 2, shipped: 3, dev: 4, concept: 5 };
    return (window.PP_PROJECTS || []).slice().sort((a, b) => {
      const d = (wgt[a.status] ?? 9) - (wgt[b.status] ?? 9);
      return d !== 0 ? d : String(b.year).localeCompare(String(a.year));
    });
  }, []);

  function onNav(n) {
    if (n.kind === "about") return setOverlay({ type: "about" });
    if (n.kind === "contact") return setOverlay({ type: "contact" });
    if (n.href) window.open(n.href, "_blank", "noopener");
  }

  const inProject = overlay && overlay.type === "project";
  const inAbout = overlay && overlay.type === "about";
  const inContact = overlay && overlay.type === "contact";

  return (
    <React.Fragment>
      <div className="m-grid-bg" ref={gridRef} aria-hidden="true"></div>

      {/* top bar */}
      <header className={"m-top" + (scrolled ? " scrolled" : "")}>
        <div className="brand" style={{ cursor: "default" }}>
          <Pulsar size={24} />
          <span className="brand-name">phoenix<span className="sep"> · </span>pulsar</span>
        </div>
        <span className="spacer"></span>
        <button className="theme-toggle" onClick={() => setDark(!dark)} aria-label="Toggle theme">
          <ThemeIcon dark={dark} />
        </button>
      </header>

      <main data-screen-label="Mobile hub">
        {/* beacon avatar — sticky, docks into the bar on scroll */}
        <div className="m-avatar m-reveal">
          <div className="av-inner" ref={heroAvRef}>
            <div className="av-glow"></div>
            <img className="av-img" src="assets/avatar.jpeg" alt="Phoenix Pulsar" draggable="false" />
          </div>
        </div>

        {/* hero text */}
        <section className="m-hero">
          <span className="m-eyebrow m-reveal">Independent software · the signal</span>
          <h1 className="m-reveal">I build, for an interestingly complex world.</h1>
          <p className="m-lead m-reveal">Bots, AI tools, data interfaces, games, on-chain experiments — small machines that remove friction from modern life.</p>
        </section>

        {/* filters */}
        <div className="m-filter-wrap m-reveal">
          <div className="m-filter" role="group" aria-label="Filter projects by status">
            {visibleFilters.map((f) => (
              <button key={f.id} type="button" className={"fchip" + (filter === f.id ? " on" : "")}
                onClick={() => setFilter(f.id)}>{f.label}</button>
            ))}
          </div>
        </div>

        {/* the spine */}
        <div className="m-spine" ref={listRef}>
          <span className="m-spine-progress" ref={progRef} aria-hidden="true"></span>
          <span className="m-packet" aria-hidden="true"></span>
          <span className="m-packet p2" aria-hidden="true"></span>

          <div className="m-spine-label m-reveal">Projects · {projects.length}</div>
          {projects.map((p) => {
            const s = window.PP_STATUS[p.status];
            const off = filter !== "all" && p.status !== filter;
            return (
              <button key={p.id} type="button"
                className={"m-node m-reveal " + p.status + (off ? " filtered" : "")}
                style={{ "--dot": s.dot }}
                disabled={off}
                onClick={() => setOverlay({ type: "project", p })}
                aria-label={p.name + " — " + s.label}>
                <span className="node-dot"></span>
                <span className="m-row">
                  <span className="m-name">{p.name}</span>
                  <span className="m-meta"><span className="sdot"></span>{s.label === "SEEKING FUNDING" ? "FUNDING" : s.label} · {p.year}</span>
                </span>
                <p className="m-summary">{p.summary}</p>
              </button>
            );
          })}

          <div className="m-spine-label m-reveal">Elsewhere</div>
          {M_NAV.map((n) => (
            <button key={n.id} type="button" className="m-node nav m-reveal" onClick={() => onNav(n)}>
              <span className="node-dot"></span>
              <span className="m-row">
                <span className="m-name">{n.label}</span>
                <span className="m-meta">{n.meta}</span>
              </span>
            </button>
          ))}
        </div>

        <footer className="m-foot m-reveal">
          <span className="f-tag">phoenix · pulsar — better every day</span>
        </footer>
      </main>

      {/* overlays */}
      <div className={"detail-scrim" + (overlay ? " open" : "")} onClick={close}></div>

      <div className={"detail" + (inProject ? " open" : "")} data-screen-label="Project detail">
        {inProject && <ProjectDetail project={overlay.p} onClose={close} animateKey={overlay.p.id} />}
      </div>

      <div className={"detail" + (inAbout ? " open" : "")} data-screen-label="About">
        {inAbout && (
          <React.Fragment>
            <div className="detail-bar">
              <button className="detail-close" onClick={close}><span aria-hidden>←</span> Back</button>
              <Pulsar size={20} />
              <span className="db-name">About · the signal</span>
            </div>
            <div className="about-overlay-inner">
              <AboutSection />
            </div>
          </React.Fragment>
        )}
      </div>

      <div className={"detail" + (inContact ? " open" : "")} data-screen-label="Contact">
        {inContact && (
          <React.Fragment>
            <div className="detail-bar">
              <button className="detail-close" onClick={close}><span aria-hidden>←</span> Back</button>
              <Pulsar size={20} />
              <span className="db-name">Contact · transmit</span>
            </div>
            <div className="contact-overlay-inner">
              <ContactSection onDone={close} />
            </div>
          </React.Fragment>
        )}
      </div>
    </React.Fragment>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<MobileApp />);
