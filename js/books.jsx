/* ============================================================
   Phoenix Pulsar — Books / the reading log
   Self-contained overlay component. Depends only on React
   (global) + the shared design tokens in styles.css.
   Export: window.BooksSection.
   ============================================================ */
const { useState: useStateBk, useRef: useRefBk, useLayoutEffect: useLayoutEffectBk } = React;

/* ---- content ---- */
const PP_BOOKS = [
  { title: "Flowers for Algernon", author: "Daniel Keyes" },
  { title: "The River of Doubt", author: "Candice Millard" },
  { title: "Endurance: Shackleton's Incredible Voyage", author: "Alfred Lansing" },
  { title: "Don't Believe Everything You Think", author: "Joseph Nguyen" },
  { title: "The Almanack of Naval Ravikant", author: "Eric Jorgenson", tag: "Value your time — it's all you have" },
  { title: "The Last Emperor of Mexico", author: "Edward Shawcross" },
  { title: "The Mastery of Love", author: "Don Miguel Ruiz" },
];

const PP_BOOKS_READING = [
  { title: "Red Rising (Book 1)", author: "Pierce Brown" },
];

function renderBook(b, i) {
  return (
    <li className="bk" data-bk key={i}>
      <span className="bk-title">{b.title}</span>
      <span className="bk-author">{b.author}</span>
      {b.tag && <span className="bk-tag">{b.tag}</span>}
    </li>
  );
}

function BooksSection() {
  const flowRef = useRefBk(null);

  // gentle stagger-in on mount (matches About's entrance feel)
  useLayoutEffectBk(() => {
    const g = window.gsap;
    const flow = flowRef.current;
    if (!flow) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!g || reduce) return;
    const items = flow.querySelectorAll("[data-bk]");
    g.fromTo(items, { opacity: 0, y: 14 }, {
      opacity: 1, y: 0, duration: 0.5, ease: "power2.out", stagger: 0.04, delay: 0.06,
      clearProps: "transform",
    });
  }, []);

  return (
    <section id="books" className="books">
      <div className="books-head">
        <div className="books-kicker">
          <span className="line" />
          <span className="kicker">Books · the reading log</span>
        </div>
        <h2>Things I'm reading. Or have read.</h2>
      </div>

      <p className="bk-lead">
        Reading log starts 2026 onwards. These are things I'm reading (or have read).
        Feel free to reach out and talk to me about any of these — always happy to chat.
      </p>

      <div className="books-flow" ref={flowRef}>
        <ul className="bk-list">
          {PP_BOOKS.map((b, i) => renderBook(b, i))}
        </ul>

        <div className="bk-group" data-bk>Currently reading</div>
        <ul className="bk-list">
          {PP_BOOKS_READING.map((b, i) => renderBook(b, i))}
        </ul>
      </div>
    </section>
  );
}

window.BooksSection = BooksSection;
window.PP_BOOKS = PP_BOOKS;
