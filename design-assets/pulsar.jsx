/* Pulsar mark — a slow rotating beacon sweep. Quiet, recurring brand element.
   Sizes: set via `size` prop. Uses GSAP if present, else CSS keyframes fallback. */
const { useRef, useEffect } = React;

function Pulsar({ size = 22, sweep = true }) {
  const sweepRef = useRef(null);
  const coreRef = useRef(null);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce || !window.gsap) return;
    const tl = window.gsap.timeline({ repeat: -1 });
    if (sweep && sweepRef.current) {
      window.gsap.set(sweepRef.current, { transformOrigin: "50% 50%" });
      tl.to(sweepRef.current, { rotate: 360, duration: 6, ease: "none" }, 0);
    }
    if (coreRef.current) {
      window.gsap.fromTo(
        coreRef.current,
        { scale: 1, opacity: 1, transformOrigin: "50% 50%" },
        { scale: 1.7, opacity: 0, duration: 2.4, ease: "power2.out", repeat: -1 }
      );
    }
    return () => tl.kill();
  }, [sweep]);

  const s = size;
  return (
    <span className="pulsar" style={{ width: s, height: s, lineHeight: 0 }}>
      <svg width={s} height={s} viewBox="0 0 44 44" fill="none" aria-hidden="true">
        <circle className="ring" cx="22" cy="22" r="19" />
        <circle className="ring" cx="22" cy="22" r="12.5" opacity="0.6" />
        {/* expanding pulse */}
        <circle ref={coreRef} cx="22" cy="22" r="4.5" fill="var(--accent)" opacity="0.4" />
        {/* rotating sweep beam */}
        {sweep && (
          <g ref={sweepRef}>
            <defs>
              <linearGradient id="pp-beam" x1="22" y1="22" x2="41" y2="22" gradientUnits="userSpaceOnUse">
                <stop stopColor="var(--accent)" stopOpacity="0.0" />
                <stop offset="1" stopColor="var(--accent)" stopOpacity="0.55" />
              </linearGradient>
            </defs>
            <path d="M22 22 L41 18 A19 19 0 0 1 41 26 Z" fill="url(#pp-beam)" />
          </g>
        )}
        <circle className="core" cx="22" cy="22" r="3.2" />
      </svg>
    </span>
  );
}

window.Pulsar = Pulsar;
