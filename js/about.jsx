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
      { t: "lead", x: "Passionate about how to use AI and visualization to reduce cognitive load around complex systems." },
    ],
  },
  small: {
    label: "Small",
    blocks: [
      { t: "mantra", x: "No headshot.\nNo founder mythology.\nNo \u201Cthrilled to announce.\u201D" },
      { t: "lead", x: "Just projects." },
      { t: "p", x: "I build bots, AI tools, Telegram utilities, data interfaces, micro-products, games, and on-chain experiments. Some are live. Some are prototypes. Some are waiting in the dark with one eye open." },
      { t: "p", x: "The pattern is simple:" },
      { t: "mantra", x: "Find friction.\nCut it open.\nBuild the machine.\nShip before the idea gets bored." },
      { t: "p", x: "By daylight, I\u2019ve survived serious software: enterprise systems, dashboards, data explorers, cloud infrastructure, approval workflows, and meetings where the word \u201Cvisibility\u201D is used as a distress signal." },
      { t: "mantra", x: "\u201CEmbrace the confusion\u201D \u2014 Sherif Abushadi\n" },
    ],
  },
  medium: {
    label: "Medium",
    blocks: [
      { t: "lead", x: "This is where the side quests live." },
      { t: "p", x: "AI tools. Telegram bots. Data explorers. Text utilities. Project trackers. On-chain experiments. Strange little games. Small-business automation ideas. Things that should probably exist, so I build the first version and see if reality flinches." },
      { t: "p", x: "I like software with a low ceremony-to-usefulness ratio." },
      { t: "anaphora", items: [
        "A PDF should answer back.",
        "A note system should not become another job.",
        "A missed call should not become lost money.",
        "A project tracker should not require a project manager to manage the tracker.",
        "A game should make sense in five seconds and become dangerous in ten.",
      ] },
      { t: "p", x: "The work here moves fast because the rules changed. AI turned the solo-builder loop into something sharper: sketch, prototype, refactor, test, ship, mutate. But speed without taste is just expensive noise. The real trick is knowing what to build, what to delete, and when the machine has a pulse." },
      { t: "p", x: "The professional backstory is there, buried under the floorboards: enterprise apps, data systems, front-end architecture, cloud deployments, dashboards, approval engines, mentoring, interviews." },
      { t: "mantra", x: "But this is not the corporate ladder.\nThis is the trapdoor." },
      { t: "p", x: "Outside the code, the same instinct shows up everywhere: rock climbing, swimming, chess, Brazilian Jiu-Jitsu. Pattern recognition under pressure. Feedback with consequences. Stay calm, adapt, get better." },
      { t: "mantra", x: "Build useful things.\nBuild weird things." },
      { t: "mantra", x: "Better every day." },
    ],
  },
  full: {
    label: "Full",
    blocks: [
      { t: "lead", x: "This is not an About page." },
      { t: "p", x: "It is a project log with a pulse." },
      { t: "p", x: "The work here is a pile of experiments, tools, bots, interfaces, half-polished machines, and ideas that kept tapping on the glass until they became code." },
      { t: "projects", items: [
        "AskPDF AI", "Ordo One", "TransformText", "Timeliner", "Swimlane",
        "FinalTapWins", "Missed Called Money", "Tell Me About Your Day",
        "On-chain starters", "Telegram tools", "Data interfaces", "Small machines for strange little problems",
      ] },
      { t: "mantra", x: "Some are live.\nSome are beta.\nSome are open source.\nSome are dangerous only to my sleep schedule." },
      { t: "p", x: "The thread is friction." },
      { t: "p", x: "Modern life is full of tiny stupid frictions dressed up as platforms, workflows, portals, dashboards, forms, PDFs, status calls, missed calls, forgotten notes, broken handoffs, and \u201Cquick syncs.\u201D" },
      { t: "p", x: "I like cutting those frictions down into tools." },
      { t: "anaphora", items: [
        "A PDF should answer questions.",
        "A Telegram bot should do the thing without asking you to download another app.",
        "A text utility should live where the text already is.",
        "A data explorer should make the pattern visible before the meeting starts.",
        "A project tracker should help you think, not punish you for having projects.",
        "A mini-game should be simple enough to explain instantly and sharp enough to become a problem.",
      ] },
      { t: "p", x: "I\u2019m interested in software that feels inevitable after it exists." },
      { t: "mantra", x: "Simple surface.\nSharp edge.\nStrange engine." },
      { t: "hr" },
      { t: "kicker", x: "The day job" },
      { t: "p", x: "The 9\u20135 world taught me how systems actually break." },
      { t: "p", x: "Enterprise software is not glamorous. It is permissions, datasets, onboarding, more permissions, dashboards, integrations, logs, cloud bills, still more permissions, stakeholders, legacy decisions, security rules, and, more permissions" },
      { t: "p", x: "That world is useful training." },
      { t: "anaphora", items: [
        "You learn that users do not care about your architecture diagram.",
        "You learn that complexity has interest rates.",
        "You learn that the cleanest interface in the room is often an act of mercy.",
        "You learn that the best feature is sometimes the one that removes three steps and lets everyone go home.",
      ] },
      { t: "p", x: "So yes, the serious background is there: front-end, back-end, cloud, data, AI tooling, visualization, architecture, mentoring, interviews, technical leadership, client translation, production scars, the whole machinery." },
      { t: "mantra", x: "But this is not the r\u00E9sum\u00E9.\nThis is the after-hours signal." },
      { t: "hr" },
      { t: "kicker", x: "The tempo" },
      { t: "p", x: "AI changed the tempo." },
      { t: "p", x: "The loop is faster now. An idea can become a prototype before the doubt has time to put on shoes. You can sketch the interface, generate the boring parts, interrogate the edge cases, refactor the mess, write the docs, and deploy the first version while the old world is still scheduling the discovery call." },
      { t: "p", x: "But AI does not replace judgment." },
      { t: "lead", x: "It multiplies it." },
      { t: "p", x: "Bad taste moves faster now too. Bad ideas get prettier. Bad products get landing pages. Bad abstractions get generated at scale." },
      { t: "p", x: "So the work is still the work:" },
      { t: "mantra", x: "Know what matters.\nQuick feedback loops\nCut what is fake.\nShip what is useful.\nKeep the weird part alive." },
      { t: "p", x: "That is the game." },
      { t: "anaphora", items: [
        "A bot here.",
        "A data tool there.",
        "A tiny automation.",
        "A product idea with teeth.",
        "A utility that should not need to exist but does because life keeps adding stupid steps.",
      ] },
      { t: "hr" },
      { t: "kicker", x: "Outside the machine" },
      { t: "p", x: "Outside the machine, the same loop repeats." },
      { t: "mantra", x: "Rock climbing is debugging with gravity.\nSwimming is meditation with consequences.\nChess is pattern recognition plus emotional damage.\nBrazilian Jiu-Jitsu is a weekly reminder that confidence is not a defense system." },
      { t: "p", x: "White belt. " },
      { t: "mantra", x: "The wall gives feedback.\nThe water tells the truth.\nThe mat removes delusion.\nThe code does too, eventually." },
      { t: "p", x: "So the method stays simple:" },
      { t: "mantra", x: "Find the problem.\nStrip the noise.\nBuild the machine.\nLet reality hit it.\nMutate.\nRepeat." },
      { t: "mantra", x: "No guru costume.\nNo polished founder myth.\nNo corporate handshake." },
      { t: "mantra", x: "Just useful things.\nWeird things.\nFast things.\nSmall machines with a pulse." },
      { t: "lead", x: "Better every day." },
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
          <h2>Not a bio. A project log with a pulse.</h2>
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
