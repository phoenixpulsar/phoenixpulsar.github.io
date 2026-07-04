/* Phoenix Pulsar — app root: the Signal Hub is the whole experience. */
const { useState: useStateA, useEffect: useEffectA } = React;

if (window.gsap && window.MotionPathPlugin) window.gsap.registerPlugin(window.MotionPathPlugin);

const PP_ACCENTS = ["#e8541e", "#f0b400", "#c8442a", "#3a7d5a"];
const PP_SIGNALS = ["#1aa6b7", "#2a6fdb", "#3a9d7a", "#8a6fd0"];

const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "glow": 1,
  "speed": 5,
  "spread": 1,
  "accent": "#e8541e",
  "signal": "#1aa6b7",
  "dark": false
}/*EDITMODE-END*/;

function App() {
  const [t, setTweak] = useTweaks(TWEAK_DEFAULTS);

  useEffectA(() => { document.documentElement.setAttribute("data-theme", t.dark ? "dark" : "light"); }, [t.dark]);
  useEffectA(() => { document.documentElement.style.setProperty("--accent", t.accent); }, [t.accent]);
  useEffectA(() => { document.documentElement.style.setProperty("--signal", t.signal); }, [t.signal]);
  useEffectA(() => { document.documentElement.style.setProperty("--glow", String(t.glow)); }, [t.glow]);
  useEffectA(() => {
    const dur = Math.max(1.6, 10 - t.speed * 0.85);
    document.documentElement.style.setProperty("--packet", dur.toFixed(2) + "s");
  }, [t.speed]);

  return (
    <React.Fragment>
      {/* top chrome */}
      <div className="hub-top">
        <div className="brand" style={{ cursor: "default" }}>
          <Pulsar size={24} />
          <span className="brand-name">phoenix<span className="sep"> · </span>pulsar</span>
        </div>
        <span className="hub-eyebrow">Independent software · the signal</span>
        <span className="spacer" />
        <button className="theme-toggle" onClick={() => setTweak("dark", !t.dark)} aria-label="Toggle theme">
          <ThemeIcon dark={t.dark} />
        </button>
      </div>

      <Hub tw={t} />

      {/* TWEAKS */}
      <TweaksPanel>
        <TweakSection label="Wiring" />
        <TweakSlider label="Signal glow" min={0} max={1.4} step={0.05} value={t.glow}
          onChange={(v) => setTweak("glow", v)} />
        <TweakSlider label="Signal speed" min={1} max={10} step={1} value={t.speed}
          onChange={(v) => setTweak("speed", v)} />
        <TweakSlider label="Constellation spread" min={0.82} max={1.16} step={0.02} value={t.spread}
          onChange={(v) => setTweak("spread", v)} />

        <TweakSection label="Colour" />
        <TweakColor label="Accent (you)" value={t.accent} options={PP_ACCENTS}
          onChange={(v) => setTweak("accent", v)} />
        <TweakColor label="Signal (wires)" value={t.signal} options={PP_SIGNALS}
          onChange={(v) => setTweak("signal", v)} />

        <TweakSection label="Theme" />
        <TweakToggle label="Dark mode" value={t.dark} onChange={(v) => setTweak("dark", v)} />
      </TweaksPanel>
    </React.Fragment>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<App />);
