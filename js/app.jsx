/* Phoenix Pulsar — app root: state, theme, tweaks, GSAP transitions */
const { useState: useStateA, useEffect: useEffectA, useRef: useRefA, useMemo } = React;

const PP_ACCENTS = ["#e8541e", "#f0b400", "#2a6fdb", "#3a7d5a"];

const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "heroVariant": "statement",
  "workMode": "domino",
  "dark": false,
  "accent": "#e8541e",
  "taglineIndex": 0,
  "showFilters": true
}/*EDITMODE-END*/;

function useReveal(deps) {
  useEffectA(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const els = document.querySelectorAll(".reveal:not(.in)");
    if (reduce) { els.forEach((e) => e.classList.add("in")); return; }
    const io = new IntersectionObserver((entries) => {
      entries.forEach((en, i) => {
        if (en.isIntersecting) {
          const sibs = [...en.target.parentElement.querySelectorAll(".reveal:not(.in)")];
          const delay = Math.min(sibs.indexOf(en.target), 6) * 70;
          setTimeout(() => en.target.classList.add("in"), delay);
          io.unobserve(en.target);
        }
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -8% 0px" });
    els.forEach((e) => io.observe(e));
    return () => io.disconnect();
  }, deps);
}

function App() {
  const [t, setTweak] = useTweaks(TWEAK_DEFAULTS);
  const [selected, setSelected] = useStateA(null);
  const [open, setOpen] = useStateA(false);
  const [animKey, setAnimKey] = useStateA(0);

  const scrimRef = useRefA(null);
  const detailRef = useRefA(null);
  const originRef = useRefA(null);

  const projects = window.PP_PROJECTS;
  const taglines = window.PP_TAGLINES;
  const tagline = taglines[t.taglineIndex] || taglines[0];

  /* theme + accent */
  useEffectA(() => {
    document.documentElement.setAttribute("data-theme", t.dark ? "dark" : "light");
  }, [t.dark]);
  useEffectA(() => {
    document.documentElement.style.setProperty("--accent", t.accent);
  }, [t.accent]);

  /* mark ready for entrance */
  useEffectA(() => {
    document.body.classList.add("is-ready");
    document.documentElement.classList.remove("no-js");
  }, []);

  useReveal([t.heroVariant, t.workMode]);

  /* ---- open project (manual FLIP on the glyph) ---- */
  function openProject(p, el) {
    let rect = null;
    if (el) {
      const g = el.querySelector(".con-glyph") || el.querySelector(".cm-glyph") || el.querySelector(".card-media") || el;
      if (g) rect = g.getBoundingClientRect();
    }
    originRef.current = rect;
    setSelected(p);
    setOpen(true);
    setAnimKey((k) => k + 1);
    document.body.style.overflow = "hidden";
  }

  function closeProject() {
    const g = window.gsap;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (g && !reduce && detailRef.current) {
      g.to(detailRef.current, { opacity: 0, duration: 0.32, ease: "power2.in" });
      g.to(scrimRef.current, { opacity: 0, duration: 0.32, ease: "power2.in", onComplete: finish });
    } else { finish(); }
    function finish() {
      setOpen(false);
      setTimeout(() => setSelected(null), 60);
      document.body.style.overflow = "";
    }
  }

  /* entrance animation when a project opens */
  useEffectA(() => {
    if (!open || !selected) return;
    const g = window.gsap;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const detailEl = detailRef.current;
    if (!detailEl) return;
    detailEl.scrollTop = 0;

    const reveals = detailEl.querySelectorAll(".d-reveal");

    if (!g || reduce) {
      reveals.forEach((r) => r.classList.add("shown"));
      if (scrimRef.current) scrimRef.current.style.opacity = 1;
      return;
    }

    g.set(scrimRef.current, { opacity: 0 });
    g.set(detailEl, { opacity: 0 });
    g.to(scrimRef.current, { opacity: 1, duration: 0.4, ease: "power2.out" });
    g.to(detailEl, { opacity: 1, duration: 0.4, ease: "power2.out" });

    // FLIP the glyph from the originating card
    const target = detailEl.querySelector("[data-detail-glyph]");
    const o = originRef.current;
    if (target && o) {
      const tr = target.getBoundingClientRect();
      const dx = o.left - tr.left;
      const dy = o.top - tr.top;
      const sc = o.width > 0 ? o.width / tr.width : 0.4;
      g.fromTo(target,
        { x: dx, y: dy, scale: sc, opacity: 0.5, transformOrigin: "top left" },
        { x: 0, y: 0, scale: 1, opacity: 1, duration: 0.75, ease: "power3.out" }
      );
    }

    reveals.forEach((r) => r.classList.add("shown"));
    g.fromTo(reveals,
      { opacity: 0, y: 16 },
      { opacity: 1, y: 0, duration: 0.6, ease: "power2.out", stagger: 0.06, delay: 0.18,
        clearProps: "transform" }
    );
  }, [open, selected, animKey]);

  function scrollTo(id) {
    if (id === "top") { window.scrollTo({ top: 0, behavior: "smooth" }); return; }
    const el = document.getElementById(id);
    if (el) window.scrollTo({ top: el.offsetTop - 70, behavior: "smooth" });
  }

  const Hero = (() => {
    if (t.heroVariant === "split") return <HeroSplit tagline={tagline} onWork={() => scrollTo("work")} onOpenProject={openProject} projects={projects} />;
    if (t.heroVariant === "beacon") return <HeroBeacon tagline={tagline} onWork={() => scrollTo("work")} />;
    return <HeroStatement tagline={tagline} onWork={() => scrollTo("work")} projectCount={projects.length} />;
  })();

  return (
    <React.Fragment>
      <TopBar dark={t.dark} onToggleTheme={() => setTweak("dark", !t.dark)} onNav={scrollTo} />

      {Hero}

      <hr className="hairline" />

      <WorkSection projects={projects} onOpen={openProject} mode={t.workMode} showFilters={t.showFilters} />

      <footer className="foot">
        <div className="foot-in">
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 14 }}>
              <Pulsar size={22} />
              <span className="brand-name">phoenix<span className="sep"> · </span>pulsar</span>
            </div>
            <div className="f-tag">Crafted with precision and curiosity.</div>
          </div>
          <div className="foot-links">
            <a className="nav-link" href="https://github.com/phoenixpulsar" target="_blank" rel="noreferrer">GITHUB ↗</a>
            <a className="nav-link" href="https://phoenixpulsar.github.io/docs/intro" target="_blank" rel="noreferrer">TECH NOTES ↗</a>
            <a className="nav-link" href="https://phoenixpulsar.github.io/blog" target="_blank" rel="noreferrer">BLOG ↗</a>
          </div>
        </div>
      </footer>

      {/* detail overlay */}
      <div className={`detail-scrim ${open ? "open" : ""}`} ref={scrimRef} onClick={closeProject} />
      <div className={`detail ${open ? "open" : ""}`} ref={detailRef}>
        {selected && <ProjectDetail project={selected} onClose={closeProject} animateKey={animKey} />}
      </div>

      {/* TWEAKS */}
      <TweaksPanel>
        <TweakSection label="Layout" />
        <TweakRadio label="Hero" value={t.heroVariant}
          options={["statement", "split", "beacon"]}
          onChange={(v) => setTweak("heroVariant", v)} />
        <TweakRadio label="Work" value={t.workMode}
          options={["domino", "constellation", "stack"]}
          onChange={(v) => setTweak("workMode", v)} />
        <TweakToggle label="Status filters" value={t.showFilters}
          onChange={(v) => setTweak("showFilters", v)} />

        <TweakSection label="Identity" />
        <TweakSelect label="Tagline" value={String(t.taglineIndex)}
          options={taglines.map((tl, i) => ({ value: String(i), label: tl.length > 38 ? tl.slice(0, 36) + "…" : tl }))}
          onChange={(v) => setTweak("taglineIndex", parseInt(v, 10))} />

        <TweakSection label="Theme" />
        <TweakToggle label="Dark mode" value={t.dark} onChange={(v) => setTweak("dark", v)} />
        <TweakColor label="Accent" value={t.accent} options={PP_ACCENTS}
          onChange={(v) => setTweak("accent", v)} />
      </TweaksPanel>
    </React.Fragment>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<App />);
