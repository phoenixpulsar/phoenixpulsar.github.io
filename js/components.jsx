/* Phoenix Pulsar — UI components (cards, badges, top bar, heroes) */
const { useState, useEffect, useRef } = React;

/* ---------- Status badge ---------- */
function Status({ status, withNote }) {
  const s = window.PP_STATUS[status];
  if (!s) return null;
  return (
    <span className={`status is-${status}`} title={s.note}>
      <span className="sdot" style={{ background: s.dot }} />
      {s.label}
      {withNote && <span style={{ color: "var(--muted)", letterSpacing: 0, textTransform: "none", fontSize: 11 }}>· {s.note}</span>}
    </span>
  );
}

/* ---------- Theme toggle icons ---------- */
function ThemeIcon({ dark }) {
  return dark ? (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round">
      <circle cx="12" cy="12" r="4.2" /><path d="M12 3v2M12 19v2M3 12h2M19 12h2M5.6 5.6l1.4 1.4M17 17l1.4 1.4M18.4 5.6 17 7M7 17l-1.4 1.4" />
    </svg>
  ) : (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20 14.5A8 8 0 0 1 9.5 4 7 7 0 1 0 20 14.5Z" />
    </svg>
  );
}

/* ---------- Top bar ---------- */
function TopBar({ dark, onToggleTheme, onNav }) {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const f = () => setScrolled(window.scrollY > 12);
    f();
    window.addEventListener("scroll", f, { passive: true });
    return () => window.removeEventListener("scroll", f);
  }, []);
  return (
    <header className={`topbar ${scrolled ? "scrolled" : ""}`}>
      <div className="topbar-in">
        <div className="brand" onClick={() => onNav("top")}>
          <Pulsar size={24} />
          <span className="brand-name">phoenix<span className="sep"> · </span>pulsar</span>
        </div>
        <nav>
          <a className="nav-link hide-sm" onClick={() => onNav("work")}>WORK</a>
          <a className="nav-link hide-sm" href="https://phoenixpulsar.github.io/docs/intro" target="_blank" rel="noreferrer">NOTES</a>
          <a className="nav-link hide-sm" href="https://github.com/phoenixpulsar" target="_blank" rel="noreferrer">GITHUB</a>
          <button className="theme-toggle" onClick={onToggleTheme} aria-label="Toggle theme">
            <ThemeIcon dark={dark} />
          </button>
        </nav>
      </div>
    </header>
  );
}

/* ---------- Card media: GIF/video if present, else code-motif ---------- */
function CardMedia({ p }) {
  if (p.media) {
    const isVid = /\.(mp4|webm)$/i.test(p.media);
    return (
      <div className="card-media" data-flip-media>
        {isVid ? (
          <video src={p.media} autoPlay loop muted playsInline />
        ) : (
          <img src={p.media} alt={p.name} loading="lazy" />
        )}
      </div>
    );
  }
  return (
    <div className="card-media" data-flip-media>
      <div className="code-motif">
        <div className="cm-top">
          <span className="cm-brace">{"{"}</span>
          <span className="cm-name">{p.id}.app</span>
        </div>
        <div className="cm-glyph">{p.glyph}</div>
        <span className="cm-brace" style={{ alignSelf: "flex-end" }}>{"}"}</span>
      </div>
    </div>
  );
}

/* ---------- Project card ---------- */
function ProjectCard({ p, index, onOpen }) {
  const ref = useRef(null);
  return (
    <article
      className="card reveal"
      ref={ref}
      data-card-id={p.id}
      onClick={() => onOpen(p, ref.current)}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); onOpen(p, ref.current); } }}
    >
      <CardMedia p={p} />
      <div className="card-body">
        <div className="card-row">
          <span className="card-title">{p.name}</span>
          <Status status={p.status} />
        </div>
        <p className="card-summary">{p.summary}</p>
        <div className="card-foot">
          <span className="yr">{String(index + 1).padStart(2, "0")} — {p.year}</span>
          <span className="card-open">Open <span aria-hidden>→</span></span>
        </div>
      </div>
    </article>
  );
}

/* ============================================================
   HERO VARIANTS
   ============================================================ */

/* A — Statement: editorial, big left-aligned tagline */
function HeroStatement({ tagline, onWork, projectCount }) {
  return (
    <section className="hero wrap" style={{ paddingTop: "clamp(60px,12vh,150px)", paddingBottom: "clamp(50px,9vh,110px)" }}>
      <div className="hero-eyebrow reveal">
        <span className="line" />
        <span className="kicker">Phoenix Pulsar · Independent software</span>
      </div>
      <h1 className="display reveal" style={{ fontSize: "clamp(40px, 8.2vw, 104px)", maxWidth: "16ch" }}>
        {tagline}
      </h1>
      <p className="hero-sub reveal">
        Indie engineer building Telegram bots, AI assistants and on-chain tools.
        Small, sharp products — shipped, in beta, and a few looking for a backer.
      </p>
      <div className="hero-actions reveal">
        <button className="btn btn-primary" onClick={onWork}>
          View the work <span className="arrow" aria-hidden>↓</span>
        </button>
        <a className="btn btn-ghost" href="https://github.com/phoenixpulsar" target="_blank" rel="noreferrer">
          GitHub <span className="arrow" aria-hidden>↗</span>
        </a>
        <span className="kicker" style={{ marginLeft: 6 }}>{String(projectCount).padStart(2,"0")} projects</span>
      </div>
    </section>
  );
}

/* B — Split systems: identity left, live project ticker right (Stripe-ish) */
function HeroSplit({ tagline, onWork, onOpenProject, projects }) {
  return (
    <section className="hero wrap" style={{ paddingTop: "clamp(50px,9vh,110px)", paddingBottom: "clamp(40px,7vh,90px)" }}>
      <div style={{ display: "grid", gridTemplateColumns: "1.05fr .95fr", gap: "clamp(32px,5vw,72px)", alignItems: "center" }} className="hero-split-grid">
        <div>
          <div className="hero-eyebrow reveal">
            <span className="line" />
            <span className="kicker">Phoenix Pulsar · Independent software</span>
          </div>
          <h1 className="display reveal" style={{ fontSize: "clamp(34px, 5vw, 66px)", maxWidth: "13ch" }}>
            {tagline}
          </h1>
          <p className="hero-sub reveal">
            Indie engineer shipping Telegram bots, AI assistants and on-chain tools.
          </p>
          <div className="hero-actions reveal">
            <button className="btn btn-primary" onClick={onWork}>Browse all work <span className="arrow" aria-hidden>↓</span></button>
            <a className="btn btn-ghost" href="https://github.com/phoenixpulsar" target="_blank" rel="noreferrer">GitHub <span className="arrow" aria-hidden>↗</span></a>
          </div>
        </div>
        <div className="hero-ticker reveal" aria-label="Selected projects">
          {projects.slice(0, 5).map((p, i) => (
            <div className="ticker-row" key={p.id} onClick={(e) => onOpenProject(p, e.currentTarget)}>
              <span className="idx">{String(i + 1).padStart(2, "0")}</span>
              <span className="tname">{p.name}</span>
              <Status status={p.status} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* C — Centered beacon: big pulsar mark, centered tagline, scroll cue */
function HeroBeacon({ tagline, onWork }) {
  return (
    <section className="hero wrap" style={{ paddingTop: "clamp(56px,11vh,130px)", paddingBottom: "clamp(48px,8vh,96px)", textAlign: "center" }}>
      <div className="reveal" style={{ display: "flex", justifyContent: "center", marginBottom: 30 }}>
        <Pulsar size={64} />
      </div>
      <div className="reveal" style={{ display: "flex", justifyContent: "center", marginBottom: 22 }}>
        <span className="kicker">Phoenix Pulsar · Independent software</span>
      </div>
      <h1 className="display reveal" style={{ fontSize: "clamp(36px, 6.4vw, 86px)", maxWidth: "18ch", marginInline: "auto" }}>
        {tagline}
      </h1>
      <p className="hero-sub reveal" style={{ marginInline: "auto" }}>
        Indie engineer building Telegram bots, AI assistants and on-chain tools — shipped, in beta, and looking for backers.
      </p>
      <div className="hero-actions reveal" style={{ justifyContent: "center" }}>
        <button className="btn btn-primary" onClick={onWork}>View the work <span className="arrow" aria-hidden>↓</span></button>
        <a className="btn btn-ghost" href="https://github.com/phoenixpulsar" target="_blank" rel="noreferrer">GitHub <span className="arrow" aria-hidden>↗</span></a>
      </div>
      <div style={{ marginTop: 30, display: "flex", justifyContent: "center" }}>
        <span className="scroll-cue reveal">Scroll <span className="dot" /></span>
      </div>
    </section>
  );
}

window.Status = Status;
window.TopBar = TopBar;
window.ProjectCard = ProjectCard;
window.HeroStatement = HeroStatement;
window.HeroSplit = HeroSplit;
window.HeroBeacon = HeroBeacon;
