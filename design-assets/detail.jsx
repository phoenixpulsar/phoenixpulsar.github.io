/* Phoenix Pulsar — full-screen project detail + roadmap */
const { useRef: useRefD, useEffect: useEffectD } = React;

/* ---------- Roadmap: vertical timeline, d3 scalePoint for node positions ---------- */
function Roadmap({ project, animateKey }) {
  const svgRef = useRefD(null);
  const steps = project.roadmap || [];
  const rowH = 62;
  const padTop = 14;
  const height = padTop * 2 + (steps.length - 1) * rowH + 16;
  const axisX = 13;

  // d3 scalePoint maps milestone index -> y
  const yOf = (i) => {
    if (window.d3) {
      const scale = window.d3.scalePoint()
        .domain(steps.map((_, k) => k))
        .range([padTop, padTop + (steps.length - 1) * rowH]);
      return scale(i);
    }
    return padTop + i * rowH;
  };

  // progress = through last done/active node
  let lastProg = -1;
  steps.forEach((s, i) => { if (s.state === "done" || s.state === "active") lastProg = i; });
  const progY = lastProg >= 0 ? yOf(lastProg) : padTop;

  useEffectD(() => {
    if (!window.gsap || !svgRef.current) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;
    const nodes = svgRef.current.querySelectorAll("[data-rm-node]");
    const labels = svgRef.current.querySelectorAll("[data-rm-label]");
    const prog = svgRef.current.querySelector("[data-rm-prog]");
    const g = window.gsap;
    if (prog) {
      const len = prog.getTotalLength ? prog.getTotalLength() : 200;
      g.fromTo(prog, { strokeDasharray: len, strokeDashoffset: len }, { strokeDashoffset: 0, duration: 1.1, ease: "power2.inOut", delay: 0.25 });
    }
    g.fromTo(nodes, { scale: 0, transformOrigin: "center" }, { scale: 1, duration: 0.5, ease: "back.out(2)", stagger: 0.09, delay: 0.35 });
    g.fromTo(labels, { opacity: 0, x: 8 }, { opacity: 1, x: 0, duration: 0.5, ease: "power2.out", stagger: 0.09, delay: 0.4 });
  }, [animateKey]);

  const stateLabel = { done: "Done", active: "In progress", planned: "Planned", funded: "With funding" };

  return (
    <div className="roadmap">
      <svg ref={svgRef} className="roadmap-svg" viewBox={`0 0 360 ${height}`} height={height} preserveAspectRatio="xMinYMin meet">
        {/* base axis */}
        <line className="rm-axis" x1={axisX} y1={padTop} x2={axisX} y2={padTop + (steps.length - 1) * rowH} />
        {/* progress overlay */}
        {lastProg >= 0 && (
          <line data-rm-prog className="rm-prog" x1={axisX} y1={padTop} x2={axisX} y2={progY} />
        )}
        {steps.map((s, i) => {
          const y = yOf(i);
          return (
            <g key={i}>
              <circle data-rm-node className={`rm-node ${s.state}`} cx={axisX} cy={y} r={s.state === "active" ? 6.5 : 5} />
              <g data-rm-label>
                <text className="rm-label" x={axisX + 22} y={y - 2}>{s.label}</text>
                <text className={`rm-state ${s.state}`} x={axisX + 22} y={y + 14}>{stateLabel[s.state]}</text>
              </g>
            </g>
          );
        })}
      </svg>
    </div>
  );
}

/* ---------- Detail view ---------- */
function ProjectDetail({ project, onClose, animateKey }) {
  const isFunding = project && project.status === "funding";
  const fundedCount = project ? (project.roadmap || []).filter((s) => s.state === "funded").length : 0;

  // esc to close
  useEffectD(() => {
    const h = (e) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", h);
    return () => window.removeEventListener("keydown", h);
  }, [onClose]);

  if (!project) return null;
  const s = window.PP_STATUS[project.status];

  return (
    <div className="detail-bar-and-body">
      <div className="detail-bar">
        <button className="detail-close" onClick={onClose}>
          <span aria-hidden>←</span> Back
        </button>
        <Pulsar size={20} />
        <span className="db-name">{project.name}</span>
        <span className="db-spacer" />
        <Status status={project.status} />
      </div>

      <div className="detail-hero">
        <div className="d-glyph" data-detail-glyph>{project.glyph}</div>
        <h1 className="d-reveal">{project.name}</h1>
        <p className="d-summary d-reveal">{project.summary}</p>
      </div>

      <div className="detail-grid">
        <div>
          <p className="d-blurb d-reveal">{project.blurb}</p>

          <div className="d-block d-reveal">
            <h3>What it does</h3>
            <ul className="d-highlights">
              {project.highlights.map((h, i) => (
                <li key={i}><span className="hx">{String(i + 1).padStart(2, "0")}</span><span>{h}</span></li>
              ))}
            </ul>
          </div>

          <div className="d-block d-reveal">
            <h3>Built with</h3>
            <div className="tech-tags">
              {project.tech.map((t) => <span key={t}>{t}</span>)}
            </div>
          </div>
        </div>

        <aside className="d-rail">
          <div className="d-card d-reveal">
            <div className="d-meta-row">
              <span className="k">Status</span>
              <span className="v"><Status status={project.status} /></span>
            </div>
            <div className="d-meta-row">
              <span className="k">Stage</span>
              <span className="v">{s.note}</span>
            </div>
            <div className="d-meta-row">
              <span className="k">Year</span>
              <span className="v">{project.year}</span>
            </div>
            {project.url ? (
              <a className="btn btn-primary d-cta" href={project.url} target="_blank" rel="noreferrer">
                Visit project <span className="arrow" aria-hidden>↗</span>
              </a>
            ) : (
              <span className="btn btn-ghost d-cta disabled">
                {isFunding ? "Available to backers" : "In development"}
              </span>
            )}
          </div>

          <div className="d-block d-reveal" style={{ marginTop: 36 }}>
            <h3>Roadmap</h3>
            <Roadmap project={project} animateKey={animateKey} />
            {isFunding && fundedCount > 0 && (
              <div className="funding-note">
                <span className="fn-mark">◆</span>
                <span>
                  <strong>{fundedCount} milestone{fundedCount > 1 ? "s" : ""}</strong> unlock with funding —
                  shown dashed above. The core works today; backing turns it into a product.
                </span>
              </div>
            )}
          </div>
        </aside>
      </div>
    </div>
  );
}

window.Roadmap = Roadmap;
window.ProjectDetail = ProjectDetail;
