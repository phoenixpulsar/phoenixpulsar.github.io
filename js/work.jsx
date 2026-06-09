/* Phoenix Pulsar — interactive "Selected Work" section
   Three directions: domino · constellation · stack
   Filter = Flip reorder (matching to front, others dim into background)
   Idle = subtle GSAP float on each tile's inner layer
*/
const { useState: useStateW, useEffect: useEffectW, useRef: useRefW, useMemo: useMemoW, useLayoutEffect: useLayoutEffectW } = React;

if (window.gsap && window.Flip) {
  try { window.gsap.registerPlugin(window.Flip); } catch (e) {}
}

const PP_MODE_HINT = {
  domino:        "Hover a tile to open it · click to explore",
  constellation: "Hover a node to bloom · click to explore",
  stack:         "Hover to pull a card forward · click to explore",
};

function statusDot(s) { return (window.PP_STATUS[s] || {}).dot || "var(--muted)"; }

/* ---- per-mode tile content ---- */
function DominoTile({ p, index }) {
  return (
    <div className="tile-inner">
      <span className="dom-spine" style={{ background: statusDot(p.status) }} />
      <div className="dom-collapsed">
        <span className="dom-idx">{String(index + 1).padStart(2, "0")}</span>
        <span className="dom-vname">{p.name}</span>
        <span className="dom-vdot" style={{ background: statusDot(p.status) }} />
      </div>
      <div className="dom-full">
        <div className="df-top">
          <span className="df-glyph">{p.glyph}</span>
          <Status status={p.status} />
        </div>
        <div>
          <div className="df-name">{p.name}</div>
          <div className="df-sum">{p.summary}</div>
        </div>
        <div className="df-foot">
          <span className="df-yr">{String(index + 1).padStart(2, "0")} — {p.year}</span>
          <span className="df-open">Open <span aria-hidden>→</span></span>
        </div>
      </div>
    </div>
  );
}

function ConstellationTile({ p, index }) {
  return (
    <div className="tile-inner">
      <div className="con-face" style={{ "--st": statusDot(p.status) }}>
        <span className="con-glyph">{p.glyph}</span>
        <span className="con-dot" style={{ background: statusDot(p.status) }} />
      </div>
      <div className="con-mini">
        <div className="cm-row">
          <span className="cm-name">{p.name}</span>
          <span className="con-dot" style={{ background: statusDot(p.status) }} />
        </div>
        <div className="cm-sum">{p.summary}</div>
        <div className="cm-foot">
          <span className="cm-yr">{String(index + 1).padStart(2, "0")} — {p.year}</span>
          <span className="cm-open"><Status status={p.status} /></span>
        </div>
      </div>
    </div>
  );
}

function StackTile({ p, index }) {
  return (
    <div className="tile-inner">
      <div className="stk-sliver">
        <span className="stk-idx">{String(index + 1).padStart(2, "0")}</span>
        <span className="stk-vname">{p.name}</span>
        <span className="stk-spinedot" style={{ background: statusDot(p.status) }} />
      </div>
      <div className="stk-body">
        <div className="sb-top">
          <span className="sb-glyph">{p.glyph}</span>
          <Status status={p.status} />
        </div>
        <div>
          <div className="sb-name">{p.name}</div>
          <div className="sb-sum">{p.summary}</div>
        </div>
        <div className="sb-foot">
          <span className="sb-yr">{p.year}</span>
          <span className="sb-open">Open <span aria-hidden>→</span></span>
        </div>
      </div>
    </div>
  );
}

const MODE_RENDER = { domino: DominoTile, constellation: ConstellationTile, stack: StackTile };
const MODE_CLASS = { domino: "work-domino", constellation: "work-constellation", stack: "work-stack" };

function WorkSection({ projects, onOpen, mode, showFilters }) {
  const [filter, setFilter] = useStateW("all");
  const containerRef = useRefW(null);
  const flipState = useRefW(null);

  const statusOrder = ["live", "beta", "dev", "funding", "shipped", "concept"];
  const present = statusOrder.filter((s) => projects.some((p) => p.status === s));
  const counts = useMemoW(() => {
    const c = {};
    projects.forEach((p) => { c[p.status] = (c[p.status] || 0) + 1; });
    return c;
  }, [projects]);

  // matching-first ordering; non-matching stay mounted but dimmed
  const ordered = useMemoW(() => {
    if (filter === "all") return projects;
    const m = projects.filter((p) => p.status === filter);
    const r = projects.filter((p) => p.status !== filter);
    return [...m, ...r];
  }, [filter, projects]);

  const matchCount = filter === "all" ? projects.length : (counts[filter] || 0);

  function pick(s) {
    if (s === filter) return;
    if (window.Flip && containerRef.current) {
      const tiles = containerRef.current.querySelectorAll("[data-tile]");
      flipState.current = window.Flip.getState(tiles, { props: "opacity" });
    }
    setFilter(s);
  }

  // FLIP shuffle after reorder
  useLayoutEffectW(() => {
    if (!flipState.current || !window.Flip) { flipState.current = null; return; }
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) { flipState.current = null; return; }
    window.Flip.from(flipState.current, {
      duration: 0.72, ease: "power3.inOut", absolute: true, stagger: 0.028,
      onComplete: () => { /* idle resumes naturally */ },
    });
    flipState.current = null;
  }, [filter, mode]);

  // idle floating per mode (on inner layer so it never fights Flip transforms on the tile)
  useEffectW(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce || !window.gsap || !containerRef.current) return;
    const g = window.gsap;
    const inners = [...containerRef.current.querySelectorAll(".tile-inner")];
    const tweens = inners.map((el, i) => {
      if (mode === "constellation") {
        return g.to(el, { y: "random(-9,9)", x: "random(-7,7)", rotation: "random(-2.5,2.5)",
          duration: "random(3.2,5.2)", repeat: -1, yoyo: true, ease: "sine.inOut", delay: i * 0.07 });
      }
      if (mode === "domino") {
        return g.to(el, { y: "random(-6,6)", duration: "random(2.8,4.2)", repeat: -1, yoyo: true, ease: "sine.inOut", delay: i * 0.06 });
      }
      return g.to(el, { y: "random(-3,4)", duration: "random(3,4.6)", repeat: -1, yoyo: true, ease: "sine.inOut", delay: i * 0.05 });
    });
    return () => { tweens.forEach((t) => t && t.kill()); inners.forEach((el) => g.set(el, { clearProps: "transform" })); };
  }, [mode, filter]);

  const Tile = MODE_RENDER[mode] || DominoTile;

  function activate(p, el) { onOpen(p, el); }

  return (
    <section id="work" className="wrap" style={{ paddingTop: "clamp(48px,7vh,86px)", paddingBottom: "clamp(60px,9vh,110px)" }}>
      <div className="section-head reveal">
        <h2>Selected work</h2>
        <span className="count">{String(matchCount).padStart(2, "0")} / {String(projects.length).padStart(2, "0")} projects</span>
      </div>

      {showFilters && (
        <div className="filters playful reveal" role="group" aria-label="Filter by status">
          <button className="chip" aria-pressed={filter === "all"} onClick={() => pick("all")}>
            All <span className="ccount">{projects.length}</span>
          </button>
          {present.map((s) => (
            <button key={s} className="chip" aria-pressed={filter === s} onClick={() => pick(s)}>
              <span className="cdot" style={{ background: window.PP_STATUS[s].dot }} />
              {window.PP_STATUS[s].label}
              <span className="ccount">{counts[s]}</span>
            </button>
          ))}
        </div>
      )}

      <div className="mode-hint reveal"><span className="mh-dot" />{PP_MODE_HINT[mode]}</div>

      <div className="work-stage">
        <div className={`${MODE_CLASS[mode]}`} ref={containerRef}>
          {ordered.map((p) => {
            const idx = projects.indexOf(p);
            const dim = filter !== "all" && p.status !== filter;
            return (
              <div
                key={p.id}
                className={`tile ${mode} ${dim ? "dimmed" : ""}`}
                data-tile
                data-status={p.status}
                role="button"
                tabIndex={0}
                aria-label={`${p.name} — ${(window.PP_STATUS[p.status] || {}).label}`}
                onClick={(e) => activate(p, e.currentTarget)}
                onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); activate(p, e.currentTarget); } }}
              >
                <Tile p={p} index={idx} />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

window.WorkSection = WorkSection;
