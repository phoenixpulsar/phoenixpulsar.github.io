/* ============================================================
   Phoenix Pulsar — Signal Hub core
   Pure logic: node model, radial/spine layout math, XState machine.
   No JSX here so it parses as plain JS. Exports on window.
   ============================================================ */

/* ---- utility nav nodes (the inner "crown") ---- */
window.HUB_NAV = [
  { id: "about",  type: "nav", label: "About",  kind: "about" },
  { id: "contact", type: "nav", label: "Contact", kind: "contact" },
  { id: "github", type: "nav", label: "GitHub", href: "https://github.com/phoenixpulsar", ext: true },
  { id: "notes",  type: "nav", label: "Notes",  href: "https://phoenixpulsar.github.io/docs/intro", ext: true },
  { id: "blog",   type: "nav", label: "Blog",   href: "https://phoenixpulsar.github.io/all-blogs/", ext: true },
  { id: "spirit", type: "nav", label: "Spirit in the Sky", href: "https://phoenixpulsar.github.io/notes/spirit-in-the-sky/", ext: true },
  { id: "emotional", type: "nav", label: "Emotional Debt", href: "https://phoenixpulsar.github.io/notes/emotional-debt/", ext: true },
  { id: "applayer", type: "nav", label: "App Layer", href: "https://phoenixpulsar.github.io/notes/app-layer/", ext: true },
];

/* ---- curated polar placement.  a = angle in degrees, y-UP convention
   (screen y = cy - r*sin(a)); rf = radius factor; tier = reveal order ---- */
window.HUB_POS = {
  /* projects — outer constellation (bottom-centre kept clear for the HUD) */
  transformtext:  { a: 58,   rf: 0.98, tier: 0, curve: -0.14 },
  askpdf:         { a: 18,   rf: 0.94, tier: 0, curve: -0.14 },
  ordo:           { a: -20,  rf: 0.98, tier: 0, curve:  0.16 },
  "near-starter": { a: 150,  rf: 0.94, tier: 0, curve:  0.14 },
  timeliner:      { a: 98,   rf: 1.00, tier: 1, curve: -0.12 },
  swimlane:       { a: 186,  rf: 0.98, tier: 1, curve: -0.14 },
  finaltapwins:   { a: 210,  rf: 1.02, tier: 1, curve:  0.16 },
  missedcall:     { a: -56,  rf: 1.02, tier: 2, curve:  0.12 },
  tellmeday:      { a: 244,  rf: 1.02, tier: 2, curve: -0.12 },
  /* nav — inner crown */
  notes:          { a: 40,   rf: 0.54, tier: 0, curve:  0.10, nav: true },
  about:          { a: 88,   rf: 0.58, tier: 0, curve:  0.00, nav: true },
  github:         { a: 128,  rf: 0.54, tier: 0, curve: -0.10, nav: true },
  blog:           { a: 158,  rf: 0.60, tier: 0, curve:  0.10, nav: true },
  spirit:         { a: 14,   rf: 0.50, tier: 0, curve:  0.10, nav: true },
  emotional:      { a: -14,  rf: 0.52, tier: 0, curve: -0.10, nav: true },
  applayer:       { a: -40,  rf: 0.50, tier: 0, curve:  0.10, nav: true },
  contact:        { a: -75,  rf: 0.62, tier: 0, curve: -0.08, nav: true },
};

/* Build the ordered node list once (projects + nav), attach pos meta. */
window.buildHubNodes = function () {
  const out = [];
  (window.PP_PROJECTS || []).forEach((p) => {
    const pos = window.HUB_POS[p.id] || { a: 0, rf: 1, tier: 2, curve: 0 };
    out.push({ id: p.id, type: "project", label: p.name, project: p, ...pos });
  });
  window.HUB_NAV.forEach((n) => {
    const pos = window.HUB_POS[n.id] || { a: 90, rf: 0.6, tier: 0, curve: 0, nav: true };
    out.push({ ...n, ...pos });
  });
  return out;
};

/* ---- layout: returns geometry for a given stage size ----
   mode: "radial" (wide) | "spine" (narrow)                     */
window.hubLayout = function (w, h, spread) {
  spread = spread == null ? 1 : spread;
  const nodes = window.buildHubNodes();
  const spine = w < 760;

  if (spine) {
    // vertical menu: avatar on top, nodes flow down in a single column
    const cx = w / 2;
    const avatarH = Math.min(h * 0.34, 260);
    const avatarW = avatarH * (855 / 919);
    const cy = avatarH * 0.5 + 24;
    const ox = cx;
    const oy = cy + avatarH * 0.16;
    // order: nav first, then projects by tier
    const order = nodes.slice().sort((A, B) => {
      const na = A.type === "nav" ? 0 : 1, nb = B.type === "nav" ? 0 : 1;
      if (na !== nb) return na - nb;
      return (A.tier - B.tier);
    });
    const top = cy + avatarH * 0.5 + 16;
    const gap = Math.min(56, (h - top - 110) / order.length);
    const laid = order.map((n, i) => {
      const y = top + gap * (i + 0.5);
      const side = i % 2 === 0 ? "right" : "left";
      const x = cx + (side === "right" ? 26 : -26);
      return { ...n, x, y, side, spine: true };
    });
    return { mode: "spine", cx, cy, ox, oy, avatarW, avatarH, nodes: laid };
  }

  // radial
  const cx = w / 2;
  const cy = h * 0.47;
  const avatarH = Math.min(h * 0.72, 520);
  const avatarW = avatarH * (855 / 919);
  const ox = cx;
  const oy = cy - avatarH * 0.15; // goggle line
  const rx = w * 0.48 * spread;
  const ry = h * 0.44 * spread;
  const mx = 176, my = 86, myBot = 168; // keep labels off the edges + HUD
  /* exclusion ellipse so no node ever sits on the portrait */
  const ecx = cx, ecy = cy - avatarH * 0.06;
  const erx = avatarW * 0.68, ery = avatarH * 0.62;
  const laid = nodes.map((n) => {
    const rad = (n.a * Math.PI) / 180;
    let x = cx + rx * n.rf * Math.cos(rad);
    let y = cy - ry * n.rf * Math.sin(rad);
    x = Math.max(mx, Math.min(w - mx, x));
    y = Math.max(my, Math.min(h - myBot, y));
    // push out of the avatar ellipse
    const dx = x - ecx, dy = y - ecy;
    const v = (dx / erx) * (dx / erx) + (dy / ery) * (dy / ery);
    if (v < 1 && v > 0.0001) {
      const k = 1.12 / Math.sqrt(v);
      x = ecx + dx * k;
      y = ecy + dy * k;
      x = Math.max(mx, Math.min(w - mx, x));
      y = Math.max(my, Math.min(h - myBot, y));
    }
    const side = x >= cx ? "right" : "left";
    return { ...n, x, y, side };
  });
  return { mode: "radial", cx, cy, ox, oy, avatarW, avatarH, nodes: laid };
};

/* ---- index layout: scroll destination.  Avatar small in the left
   column with the bio beneath it; nav in a top row; projects in a
   tidy two-column index on the right. ---- */
window.hubIndexLayout = function (w, h) {
  const nodes = window.buildHubNodes();
  const leftX = Math.max(190, w * 0.22);
  const avatarH = Math.min(h * 0.30, 220);
  const avatarW = avatarH * (855 / 919);
  const cx = leftX;
  const cy = 92 + avatarH / 2;
  const ox = cx;
  const oy = cy - avatarH * 0.15;

  const navNodes = nodes.filter((n) => n.type === "nav");
  const projNodes = nodes.filter((n) => n.type === "project");
  /* stable, meaningful order: status weight then year desc */
  const wgt = { live: 0, funding: 1, beta: 2, shipped: 3, dev: 4, concept: 5 };
  projNodes.sort((a, b) => {
    const d = (wgt[a.project.status] ?? 9) - (wgt[b.project.status] ?? 9);
    return d !== 0 ? d : String(b.project.year).localeCompare(String(a.project.year));
  });

  const laid = [];
  /* nav row, top right */
  const navY = 104;
  const navX0 = w * 0.46;
  const navGap = Math.min(150, (w * 0.48) / navNodes.length);
  navNodes.forEach((n, i) => {
    laid.push({ ...n, x: navX0 + navGap * i, y: navY, side: "right" });
  });
  /* project index, two columns */
  const rows = Math.ceil(projNodes.length / 2);
  const colX = [w * 0.46, w * 0.73];
  const y0 = h * 0.28;
  const gap = Math.min(86, (h * 0.60) / rows);
  projNodes.forEach((n, i) => {
    const col = Math.floor(i / rows);
    const row = i % rows;
    laid.push({ ...n, x: colX[col], y: y0 + gap * (row + 0.5), side: "right" });
  });

  const bio = {
    x: cx - avatarW * 0.62,
    y: cy + avatarH * 0.60,
    w: Math.min(300, Math.max(220, w * 0.26)),
  };
  return { mode: "index", cx, cy, ox, oy, avatarW, avatarH, nodes: laid, bio };
};

/* quadratic-curve path string from origin O to node N, bowed by `curve` */
window.hubPath = function (ox, oy, x, y, curve) {
  const mxp = (ox + x) / 2;
  const myp = (oy + y) / 2;
  const dx = x - ox, dy = y - oy;
  const len = Math.hypot(dx, dy) || 1;
  // perpendicular offset for organic bow
  const px = -dy / len, py = dx / len;
  const amt = (curve || 0) * len;
  const cxp = mxp + px * amt;
  const cyp = myp + py * amt;
  return `M ${ox.toFixed(1)} ${oy.toFixed(1)} Q ${cxp.toFixed(1)} ${cyp.toFixed(1)} ${x.toFixed(1)} ${y.toFixed(1)}`;
};

/* ---- XState machine: overlay lifecycle ----
   booting -> idle <-> projectDetail / about -> closing -> idle           */
window.createHubMachine = function () {
  const X = window.XState;
  const assign = X.assign;
  return X.createMachine(
    {
      id: "hub",
      initial: "booting",
      context: { project: null },
      states: {
        booting: {
          on: { READY: "idle" },
          after: { 1500: "idle" },
        },
        idle: {
          on: {
            OPEN_PROJECT: { target: "projectDetail", actions: "setProject" },
            OPEN_ABOUT: "about",
            OPEN_CONTACT: "contact",
          },
        },
        projectDetail: {
          on: {
            OPEN_PROJECT: { target: "projectDetail", actions: "setProject", internal: false },
            OPEN_ABOUT: "about",
            OPEN_CONTACT: "contact",
            CLOSE: "closing",
          },
        },
        about: {
          on: {
            OPEN_PROJECT: { target: "projectDetail", actions: "setProject" },
            OPEN_CONTACT: "contact",
            CLOSE: "closing",
          },
        },
        contact: {
          on: {
            OPEN_PROJECT: { target: "projectDetail", actions: "setProject" },
            OPEN_ABOUT: "about",
            CLOSE: "closing",
          },
        },
        closing: {
          after: { 360: "idle" },
        },
      },
    },
    {
      actions: {
        setProject: assign({ project: (_ctx, e) => e.project }),
      },
    }
  );
};
