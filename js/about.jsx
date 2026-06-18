/* ============================================================
   Phoenix Pulsar — About / "the signal"
   Self-contained reading-depth component.
   Depends only on React (global) + optional GSAP (global) and the
   shared design tokens in styles.css. Export: window.AboutSection.
   ============================================================ */
const { useState: useStateB, useRef: useRefB, useLayoutEffect: useLayoutEffectB, useEffect: useEffectB, useMemo: useMemoB } = React;

/* ---- content ---- block types:
   lead | p | mantra (multiline) | anaphora (items) | projects (items) | kicker | hr  */
const PP_ABOUT = {
  tldr: {
    label: "TL;DR",
    blocks: [
      { t: "lead", x: "I build independent software experiments \u2014 AI tools, Telegram bots, data interfaces, on-chain utilities, games, and small tools that make complex workflows feel simpler. Professionally, I work as a technical lead, project-minded problem solver, and full-stack developer helping teams turn ambiguity into working software." },
    ],
  },
  small: {
    label: "Small",
    blocks: [
      { t: "p", x: "I build independent software under the Phoenix Pulsar name: a collection of projects, prototypes, tools, bots, and experiments focused on AI, data, productivity, and small practical problems." },
      { t: "p", x: "The work moves across AI assistants, Telegram utilities, data explorers, text tools, project trackers, on-chain experiments, and lightweight products. Some projects are polished, some are early, and some are simply useful experiments that helped me learn something worth keeping." },
      { t: "p", x: "Professionally, I\u2019ve spent a decade building enterprise software across healthcare, finance, manufacturing, HR, and education. My work has grown from hands-on engineering into technical leadership, mentorship, client communication, and project ownership." },
      { t: "p", x: "I enjoy the space between product, engineering, and delivery: understanding the real problem, shaping a path forward, coordinating with people, and helping teams ship useful software without getting lost in process." },
      { t: "p", x: "I believe in the practical side of Agile: people over process, working software over performance theater, collaboration over handoffs, and adapting when reality changes the plan." },
      { t: "p", x: "This site is where the independent work lives." },
      { t: "mantra", x: "Useful tools.\nThoughtful experiments.\nBetter every day." },
    ],
  },
  medium: {
    label: "Medium",
    blocks: [
      { t: "lead", x: "I build independent software experiments under the Phoenix Pulsar name." },
      { t: "p", x: "Most of the projects here orbit around AI, Telegram, data, productivity, games, and tools that reduce unnecessary friction. AskPDF AI explores how documents can become easier to question and understand. TransformText reshapes text where people already type. Timeliner experiments with a lighter way to track projects over time. Swimlane looks at how booking swimming lanes could be simpler. FinalTapWins plays with Telegram-native game mechanics. Ordo One explores client-side encryption. Other ideas move through voice companions, missed-call automation, on-chain login starters, and small-business tools." },
      { t: "p", x: "That is the indie side: fast loops, practical experiments, and a bias toward building the first version so an idea can be tested against reality." },
      { t: "p", x: "The professional side gives the work its foundation." },
      { t: "p", x: "I\u2019ve spent years building software across healthcare, finance, manufacturing, HR, education, and enterprise data. That includes front-end architecture, full-stack development, dashboards, reporting tools, data explorers, approval systems, cloud infrastructure, AI-assisted development workflows, and client-facing technical leadership." },
      { t: "p", x: "The role I keep growing into sits somewhere between technical lead, project lead, product-minded engineer, mentor, and problem solver. I like helping teams clarify what they are building, why it matters, what needs to happen next, and how to keep the work moving without adding unnecessary complexity." },
      { t: "p", x: "I\u2019m drawn to the messy middle of projects: unclear requirements, changing priorities, strange data, multiple stakeholders, and the need to turn all of that into a plan people can actually execute. Good software is rarely just code. It is communication, sequencing, tradeoffs, feedback, trust, and a shared understanding of what \u201Cdone\u201D really means." },
      { t: "p", x: "I\u2019ve helped build interfaces over billions of rows of data, converted print-heavy datasets into searchable applications, worked on permission and approval systems, built chatbot UIs, prototyped GraphQL middle tiers, shipped Angular, React, Vue, Rails, Node, and Python systems, and mentored teams of junior developers and designers. I\u2019ve also interviewed candidates, designed technical assessments, coached interns, led front-end teams, worked with stakeholders, and translated vague business needs into usable software." },
      { t: "p", x: "The independent projects here are playful, but they are not random. They come from the same instinct that guides my professional work: understand the system, find the friction, remove what is unnecessary, and build something that helps the next step feel clearer." },
      { t: "p", x: "AI is now a major part of that loop. I use it for brainstorming, prototyping, refactoring, documentation, testing, UI exploration, and moving faster across the software development lifecycle. But I still believe judgment matters most. Structure, naming, maintainability, product sense, and knowing what not to build are still part of the craft." },
      { t: "mantra", x: "AI can help make things faster.\nExperience helps decide what is worth making." },
      { t: "p", x: "Outside of code, I climb, swim, play chess, and practice Brazilian Jiu-Jitsu. Different formats, same pattern: stay curious, adapt, learn from feedback, and keep improving." },
    ],
  },
  full: {
    label: "Full",
    blocks: [
      { t: "lead", x: "I build independent software experiments under the Phoenix Pulsar name." },
      { t: "p", x: "Most of the projects here orbit around AI, Telegram, data, productivity, games, and tools that reduce unnecessary friction. AskPDF AI explores how documents can become easier to question and understand. TransformText reshapes text where people already type. Timeliner experiments with a lighter way to track projects over time. Swimlane looks at how booking swimming lanes could be simpler. FinalTapWins plays with Telegram-native game mechanics. Ordo One explores client-side encryption. Other ideas move through voice companions, missed-call automation, on-chain login starters, and small-business tools." },
      { t: "p", x: "That is the indie side: fast loops, practical experiments, and a bias toward building the first version so an idea can be tested against reality." },
      { t: "p", x: "The professional side gives the work its foundation." },
      { t: "p", x: "I\u2019ve spent years building software across healthcare, finance, manufacturing, HR, education, and enterprise data. That includes front-end architecture, full-stack development, dashboards, reporting tools, data explorers, approval systems, cloud infrastructure, AI-assisted development workflows, and client-facing technical leadership." },
      { t: "p", x: "The role I keep growing into sits somewhere between technical lead, project lead, product-minded engineer, mentor, and problem solver. I like helping teams clarify what they are building, why it matters, what needs to happen next, and how to keep the work moving without adding unnecessary complexity." },
      { t: "p", x: "I\u2019m drawn to the messy middle of projects: unclear requirements, changing priorities, strange data, multiple stakeholders, and the need to turn all of that into a plan people can actually execute. Good software is rarely just code. It is communication, sequencing, tradeoffs, feedback, trust, and a shared understanding of what \u201Cdone\u201D really means." },
      { t: "p", x: "I\u2019ve helped build interfaces over billions of rows of data, converted print-heavy datasets into searchable applications, worked on permission and approval systems, built chatbot UIs, prototyped GraphQL middle tiers, shipped Angular, React, Vue, Rails, Node, and Python systems, and mentored teams of junior developers and designers. I\u2019ve also interviewed candidates, designed technical assessments, coached interns, led front-end teams, worked with stakeholders, and translated vague business needs into usable software." },
      { t: "p", x: "The independent projects here are playful, but they are not random. They come from the same instinct that guides my professional work: understand the system, find the friction, remove what is unnecessary, and build something that helps the next step feel clearer." },
      { t: "p", x: "AI is now a major part of that loop. I use it for brainstorming, prototyping, refactoring, documentation, testing, UI exploration, and moving faster across the software development lifecycle. But I still believe judgment matters most. Structure, naming, maintainability, product sense, and knowing what not to build are still part of the craft." },
      { t: "mantra", x: "AI can help make things faster.\nExperience helps decide what is worth making." },
      { t: "p", x: "Outside of code, I climb, swim, play chess, and practice Brazilian Jiu-Jitsu. Different formats, same pattern: stay curious, adapt, learn from feedback, and keep improving." },
    ],
  },
};

const PP_ABOUT_ORDER = ["tldr", "small", "medium", "full"];

function countWords(blocks) {
  let n = 0;
  blocks.forEach((b) => {
    if (b.x) n += b.x.split(/\s+/).filter(Boolean).length;
    if (b.items) b.items.forEach((it) => { n += it.split(/\s+/).filter(Boolean).length; });
  });
  return n;
}

function renderBlock(b, i) {
  switch (b.t) {
    case "lead":
      return <p className="ab ab-lead" data-ab key={i}>{b.x}</p>;
    case "p":
      return <p className="ab ab-p" data-ab key={i}>{b.x}</p>;
    case "mantra":
      return (
        <div className="ab ab-mantra" data-ab key={i}>
          {b.x.split("\n").map((l, k) => <span className="ml" key={k}>{l}</span>)}
        </div>
      );
    case "anaphora":
      return (
        <ul className="ab ab-anaphora" data-ab key={i}>
          {b.items.map((it, k) => <li key={k}><span className="tk" />{it}</li>)}
        </ul>
      );
    case "projects":
      return (
        <div className="ab ab-projects" data-ab key={i}>
          {b.items.map((it, k) => <span key={k}>{it}</span>)}
        </div>
      );
    case "kicker":
      return <div className="ab ab-kicker" data-ab key={i}>{b.x}</div>;
    case "hr":
      return <hr className="ab ab-hr" data-ab key={i} />;
    default:
      return null;
  }
}

function AboutSection({ defaultMode = "small" }) {
  const [mode, setMode] = useStateB(defaultMode);
  const stageRef = useRefB(null);
  const flowRef = useRefB(null);
  const thumbRef = useRefB(null);
  const depthRef = useRefB(null);
  const segRefs = useRefB({});
  const prevH = useRefB(null);

  const wordCounts = useMemoB(() => {
    const m = {};
    PP_ABOUT_ORDER.forEach((k) => { m[k] = countWords(PP_ABOUT[k].blocks); });
    return m;
  }, []);

  const activeIndex = PP_ABOUT_ORDER.indexOf(mode);

  function positionThumb() {
    const btn = segRefs.current[mode];
    const thumb = thumbRef.current;
    if (!btn || !thumb) return;
    thumb.style.width = btn.offsetWidth + "px";
    thumb.style.transform = `translateX(${btn.offsetLeft - 4}px)`;
  }

  function pick(k) {
    if (k === mode) return;
    if (stageRef.current) prevH.current = stageRef.current.offsetHeight;
    setMode(k);
  }

  // animate thumb + height + stagger on mode change
  useLayoutEffectB(() => {
    positionThumb();
    const g = window.gsap;
    const stage = stageRef.current;
    const flow = flowRef.current;
    if (!stage || !flow) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const newH = flow.offsetHeight;
    const blocks = flow.querySelectorAll("[data-ab]");

    if (!g || reduce) { stage.style.height = "auto"; return; }

    const oldH = prevH.current;
    if (oldH != null && oldH !== newH) {
      g.fromTo(stage, { height: oldH }, {
        height: newH, duration: 0.62, ease: "power3.inOut",
        onComplete: () => { stage.style.height = "auto"; },
      });
    } else {
      stage.style.height = "auto";
    }
    g.fromTo(blocks, { opacity: 0, y: 14 }, {
      opacity: 1, y: 0, duration: 0.5, ease: "power2.out", stagger: 0.038, delay: 0.06,
      clearProps: "transform",
    });
    prevH.current = null;
  }, [mode]);

  // reposition thumb on resize
  useEffectB(() => {
    const f = () => positionThumb();
    window.addEventListener("resize", f);
    const t = setTimeout(f, 60); // after fonts settle
    return () => { window.removeEventListener("resize", f); clearTimeout(t); };
  }, [mode]);

  const blocks = PP_ABOUT[mode].blocks;

  return (
    <section id="about" className="about">
      <div className="about-head">
        <div>
          <div className="about-kicker">
            <span className="line" />
            <span className="kicker">About · the signal</span>
          </div>
          <h2>About</h2>
        </div>
        <div className="depth-meter" aria-hidden="true">
          {PP_ABOUT_ORDER.map((k, i) => (
            <span className={`tick ${i <= activeIndex ? "on" : ""}`} key={k} />
          ))}
          <span className="wc">{wordCounts[mode]} words</span>
        </div>
      </div>

      <div className="about-depth" ref={depthRef} role="group" aria-label="Reading depth">
        <span className="about-thumb" ref={thumbRef} />
        {PP_ABOUT_ORDER.map((k) => (
          <button
            key={k}
            ref={(el) => { segRefs.current[k] = el; }}
            className="depth-seg"
            aria-pressed={mode === k}
            onClick={() => pick(k)}
          >
            {PP_ABOUT[k].label}
          </button>
        ))}
      </div>

      <div className="about-stage" ref={stageRef}>
        <div className="about-flow" ref={flowRef} key={mode}>
          {blocks.map((b, i) => renderBlock(b, i))}
        </div>
      </div>
    </section>
  );
}

window.AboutSection = AboutSection;
window.PP_ABOUT = PP_ABOUT;
