/* Phoenix Pulsar — project data model
   status: live | beta | shipped | dev | funding | concept            */

window.PP_STATUS = {
  live:    { label: "LIVE",            dot: "#1f8a5b", note: "In production" },
  beta:    { label: "BETA",            dot: "#2a6fdb", note: "Public beta" },
  shipped: { label: "SHIPPED",         dot: "var(--ink)", note: "Complete / open source" },
  dev:     { label: "IN DEV",          dot: "#d99000", note: "Active development" },
  funding: { label: "SEEKING FUNDING", dot: "#e8541e", note: "Open to backing" },
  concept: { label: "CONCEPT",         dot: "#9a9a9a", note: "Early concept" },
};

window.PP_TAGLINES = [
  "I build, for an interestingly complex world.",
  "Compiling order out of chaos — one protocol at a time.",
  "Solving cool problems with sharp software.",
  "Field notes from the edge of the network.",
];

/* roadmap milestone state: done | active | planned | funded
   funded = unlocked only if the project gets backing (highlighted for funding stage) */
window.PP_PROJECTS = [
  {
    id: "askpdf",
    name: "AskPDF AI",
    status: "live",
    glyph: "?pdf",
    year: "2025",
    url: "https://askpdfai.com/",
    summary: "Chat with any PDF — right inside Telegram.",
    blurb:
      "Send a PDF straight into Telegram and the bot reads, indexes and lets you interrogate it in plain language. No commands, no syntax. Credits are bought in-chat with TON, so there's near-zero friction between question and answer.",
    tech: ["Telegram Bot API", "RAG / embeddings", "Vector search", "TON payments", "PostgreSQL", "Ruby / Sinatra", "OpenAI API", "Railway", "TypeScript"],
    highlights: [
      "Upload any PDF — indexed and queryable in seconds.",
      "Natural-language Q&A, no commands to memorise.",
      "Pay with TON inside the Telegram experience.",
    ],
    roadmap: [
      { label: "Ingestion + indexing pipeline", state: "done" },
      { label: "Plain-language Q&A", state: "done" },
      { label: "TON in-chat payments", state: "done" },
    ],
  },
  {
    id: "ordo",
    name: "Ordo One",
    status: "live",
    glyph: "0x",
    year: "2024",
    url: "https://ordo-one-app.web.app/",
    summary: "Client-side encryption — secure your data with ease.",
    blurb:
      "A zero-trust encryption playground. Files you upload are converted into secure byte arrays with the Web Crypto API and can only be decrypted with your password — nothing readable ever leaves your device. Built with no framework: modern JS, GSAP, Firebase and an installable PWA shell.",
    tech: ["Web Crypto API", "GSAP", "Firebase", "PWA", "SCSS"],
    highlights: [
      "Browser-native Web Crypto — keys never leave your device.",
      "Password-locked byte arrays, fully client-side.",
      "Installable PWA, animated with GSAP timelines.",
    ],
    roadmap: [
      { label: "Web Crypto encrypt / decrypt", state: "done" },
      { label: "PWA + offline shell", state: "done" },
    ],
  },
  {
    id: "near-starter",
    name: "NEAR Login Starter",
    status: "live",
    glyph: "Ⓝ",
    year: "2023",
    url: "https://github.com/phoenixpulsar/near-wallet-login-starter",
    summary: "The smallest possible NEAR wallet login.",
    blurb:
      "A streamlined NEAR login template — the official tutorial stripped down to just the core login logic. An ideal starting point for any dApp that needs wallet auth, and the foundation a handful of my other sample projects are built on.",
    tech: ["NEAR Protocol", "near-api-js", "JavaScript"],
    highlights: [
      "Just the login logic — nothing to delete.",
      "A clean foundation for dApp sample projects.",
      "Open source on GitHub.",
    ],
    roadmap: [
      { label: "Core wallet login", state: "done" },
      { label: "Documented + open-sourced", state: "done" },
      { label: "Maintained as projects evolve", state: "active" },
    ],
  },
  {
    id: "transformtext",
    name: "TransformText",
    status: "beta",
    glyph: "↹",
    year: "2025",
    url: null,
    summary: "An inline Telegram bot that reshapes text anywhere you type.",
    blurb:
      "Summon it inline in any Telegram chat to transform text on the fly — case, formatting, encoding, cleanup and more — without leaving the conversation. The plumbing works; funding turns a sharp utility into a polished product with a transform marketplace.",
    tech: ["Telegram inline bot", "Ruby"],
    highlights: [
      "Inline — works in any chat, no app switching.",
      "A growing library of text transforms.",
      "Built to extend with community transforms.",
    ],
    roadmap: [
      { label: "Inline bot core + transforms", state: "done" },
      { label: "Investigate response performance", state: "active" },
      { label: "More transform options for users", state: "planned" },
      { label: "Link login and payment for credits", state: "planned" },
    ],
  },
  {
    id: "swimlane",
    name: "Swimlane",
    status: "dev",
    glyph: "≋",
    year: "2026",
    url: null,
    summary: "Airbnb for swimming lanes.",
    blurb:
      "A two-sided marketplace that lets pool owners list open lanes and swimmers book them by the hour. Solves a genuinely annoying real-world scheduling problem — finding water to swim in — with a clean booking flow.",
    tech: ["Marketplace", "Booking + payments", "Maps", "Web"],
    highlights: [
      "List an open lane in under a minute.",
      "Book water near you, by the hour.",
      "Trust, reviews and scheduling built in.",
    ],
    roadmap: [
      { label: "UX / UIX flow", state: "active" },
      { label: "Get prototype live on web", state: "active" },
      { label: "Integrate auth", state: "planned" },
      { label: "Add database", state: "planned" },
      { label: "User feedback", state: "planned" },
    ],
  },
  {
    id: "timeliner",
    name: "Timeliner",
    status: "dev",
    glyph: "├─",
    year: "2026",
    url: "https://timeline4projects.com/",
    summary: "The easiest project tracker ever.",
    blurb:
      "Project tracking stripped to its essence — a timeline you can actually keep up to date. No ceremony, no fifty fields per task. Just a fast, legible view of what's happening and what's next. (It's quietly powering the roadmaps on this very site.)",
    tech: ["Web app", "Timeline UI", "Local-first"],
    highlights: [
      "Zero-ceremony task entry.",
      "A timeline that stays honest.",
      "Fast, legible, keyboard-first.",
    ],
    roadmap: [
      { label: "UX / UIX flow", state: "active" },
      { label: "Get prototype live on web", state: "active" },
      { label: "Integrate auth", state: "planned" },
      { label: "Add database", state: "planned" },
      { label: "User feedback", state: "planned" },
    ],
  },
  {
    id: "finaltapwins",
    name: "FinalTapWins",
    status: "dev",
    glyph: "⊙",
    year: "2025",
    url: null,
    summary: "A last-tap-wins game, native to Telegram.",
    blurb:
      "A last-tap-wins game native to Telegram. The core game loop and basic UI/UX are done — currently working through the business logic for payment flows. Looking for collaboration to add smart contracts to manage payment flows. Pending soft beta release, production release, and marketing.",
    tech: ["Telegram Mini App", "Real-time", "Smart contracts", "Game economy"],
    highlights: [
      "One-tap loop, instantly understandable.",
      "Native to Telegram — zero install.",
      "Designed to spread chat-to-chat.",
    ],
    roadmap: [
      { label: "Core game loop", state: "done" },
      { label: "Basic UI/UX", state: "done" },
      { label: "Business logic for payment flows", state: "active" },
      { label: "Smart contract integration for payments", state: "planned" },
      { label: "Soft beta release", state: "planned" },
      { label: "Production release", state: "planned" },
      { label: "Marketing", state: "planned" },
    ],
  },
  {
    id: "missedcall",
    name: "Missed Called Money",
    status: "concept",
    glyph: "☎",
    year: "2026",
    url: null,
    summary: "Turn missed calls into booked revenue.",
    blurb:
      "An AI assistant for small businesses that catches the calls they can't answer — texting back, qualifying, and booking the appointment automatically. Every missed call is leaked revenue; this closes the gap while the owner is busy doing the actual work.",
    tech: ["AI assistant", "Voice + SMS", "Scheduling"],
    highlights: [
      "Auto-responds to missed calls instantly.",
      "Qualifies and books straight into the calendar.",
      "Recovers revenue that quietly walks away.",
    ],
    roadmap: [
      { label: "Concept + customer discovery", state: "active" },
      { label: "Missed-call → SMS prototype", state: "planned" },
      { label: "Calendar booking integration", state: "planned" },
    ],
  },
  {
    id: "tellmeday",
    name: "Tell Me About Your Day",
    status: "funding",
    glyph: "◠",
    year: "2026",
    url: null,
    summary: "An AI companion for the commute home.",
    blurb:
      "A voice assistant you talk to on the way back from work — it listens, reflects, and helps you decompress and close out the day. The conversational prototype is the heart of it; funding builds the memory, the voice and the daily ritual around it.",
    tech: ["Conversational AI", "Voice", "Mobile"],
    highlights: [
      "Natural voice conversation, hands-free.",
      "Reflects with you to close out the day.",
      "Remembers context across your week.",
    ],
    roadmap: [
      { label: "Conversational prototype", state: "done" },
      { label: "Persistent memory", state: "funded" },
      { label: "Natural voice + personas", state: "funded" },
      { label: "Daily ritual + mobile app", state: "funded" },
    ],
  },
];
