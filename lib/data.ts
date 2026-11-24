export const profile = {
  name: "Muhammad Bilal",
  role: "Full-Stack Developer",
  email: "bilalfiaz747@gmail.com",
  phone: "+92 304 0100105",
  phoneHref: "+923040100105",
};

export type Project = {
  id: string;
  name: string;
  tag: string;
  stack: string[];
  summary: string;
  points: string[];
  link?: string;
  status: string;
};

export const projects: Project[] = [
  {
    id: "meetings",
    name: "Live Meetings Platform",
    tag: "Zoom-style video meetings",
    stack: ["Laravel", "Blade", "LiveKit", "Telnyx", "AWS S3"],
    summary: "A Zoom-style meeting platform, designed and shipped end to end. Live in production.",
    status: "LIVE",
    points: [
      "Real-time audio/video and screen sharing on LiveKit, Laravel backend, Blade frontend.",
      "Host and participant controls: mute, unmute, remove participants, raise hand.",
      "Recording tied to a calendar. Every meeting saved as MP4 video and MP3 audio.",
      "PDFs and notes attached to a calendar entry or a specific meeting.",
      "Telnyx dial-in: join a live meeting by phone, with no internet needed.",
    ],
  },
  {
    id: "pos",
    name: "POS & Business Management",
    tag: "AI assistant + WooCommerce sync",
    stack: ["Laravel", "Blade", "Vite", "Tailwind", "WooCommerce", "Anthropic API"],
    summary: "Replaced an Australian client's outdated system with a platform built around how they actually operate.",
    status: "SHIPPED",
    points: [
      "Inventory, invoices, customers, orders, a POS screen, reports and user roles.",
      "AI assistant on the Anthropic API: plain-language commands like \"fetch all pending invoices\" or \"create a new customer\".",
      "Scheduled two-way WooCommerce sync keeps panel, store and stock consistent.",
      "Delivered to strong positive feedback from the client.",
    ],
  },
  {
    id: "agents",
    name: "Tenant Chat & Voice Agents",
    tag: "Every enquiry answered, on every channel",
    stack: ["n8n", "Retell", "Anthropic API", "Laravel API", "Meta Business", "WhatsApp"],
    summary: "A property-rental business was losing leads to slow replies. Now every channel answers instantly.",
    status: "LIVE",
    points: [
      "Instagram, Facebook and WhatsApp feed into n8n through Meta Business.",
      "AI agents answer from live panel data (rooms, properties) fetched through the Laravel API.",
      "Customer details captured in-chat, each lead handed to the client on WhatsApp.",
      "A Retell voice agent answers inbound calls and creates leads with no staff involved.",
    ],
  },
  {
    id: "synchub",
    name: "Sync-Hub",
    tag: "SKU in, complete WooCommerce listing out",
    stack: ["Laravel", "Anthropic API", "Web Scraping", "WooCommerce"],
    summary: "Automates product listing. The client enters a SKU and gets complete product details.",
    status: "SHIPPED",
    points: [
      "Nightly scraper service refreshes supplier data, exposed to Sync-Hub through an API.",
      "Anthropic API searches competitor sites from a URL, extracts details and prices, fills gaps.",
      "Review workflow: check, edit, then publish to WooCommerce in one step.",
      "Replaced a fully manual, check-every-competitor-by-hand process.",
    ],
  },
  {
    id: "driver",
    name: "Driver App for POS",
    tag: "Load assignment to proof of delivery",
    stack: ["Flutter", "Laravel", "Pusher"],
    summary: "The client had no delivery app. Built the mobile app and the API from scratch.",
    status: "SHIPPED",
    points: [
      "Admins assign loads from the POS panel. Drivers are notified instantly.",
      "Load slip in-app, so drivers check everything before leaving.",
      "Live driver tracking with Pusher, shown on the panel in real time.",
      "Proof of delivery: photo plus customer signature, panel notified on completion.",
    ],
  },
  {
    id: "shareroute",
    name: "ShareRoute",
    tag: "Carpooling & parcel platform",
    stack: ["Laravel", "Flutter", "PostgreSQL", "Google Maps", "Pusher"],
    summary: "Final year project, designed and built end to end.",
    status: "WEB LIVE",
    link: "shareroute.composerforce.me",
    points: [
      "Drivers publish routes on Google Maps, riders find rides along the path.",
      "Women-only rides, matched only with women's profiles.",
      "OTP verification at ride start and parcel handover.",
      "Parcels on existing trips, with in-app negotiation before handover.",
      "Pusher powers ride requests, chat, live location and status updates.",
    ],
  },
];

export const flows = [
  {
    id: "agents",
    label: "Chat & voice agents",
    cols: [
      ["Instagram", "Facebook", "WhatsApp", "Phone call"],
      ["Meta Business", "Retell"],
      ["n8n workflow"],
      ["Claude (Anthropic)"],
      ["Laravel API", "Live panel data"],
      ["Lead → WhatsApp"],
    ],
    note: "Message in, answer from live data, lead out. Seconds, not days.",
  },
  {
    id: "meet",
    label: "Meetings & dial-in",
    cols: [
      ["Browser", "Phone dial-in"],
      ["Telnyx"],
      ["LiveKit room"],
      ["Laravel", "Pusher"],
      ["AWS S3", "Calendar"],
      ["MP4 + MP3"],
    ],
    note: "Join from a laptop or a landline. Every call lands as a recording.",
  },
  {
    id: "sync",
    label: "POS ↔ WooCommerce",
    cols: [
      ["POS panel", "Supplier site"],
      ["Scheduler", "Nightly scraper"],
      ["Laravel"],
      ["Claude (Anthropic)"],
      ["WooCommerce"],
      ["Panel, store, stock in sync"],
    ],
    note: "Push products out, pull updates back, stay consistent.",
  },
];

export const stack = [
  { g: "Core", items: ["PHP (Core & OOP)", "Laravel", "REST APIs", "MVC"] },
  { g: "AI & Automation", items: ["Anthropic API", "n8n", "Retell", "AI chat agents", "Web scraping"] },
  { g: "AI-assisted build", items: ["Claude Code", "Codex", "Cursor"] },
  { g: "Frontend & apps", items: ["Blade", "Vite", "Tailwind", "JavaScript", "Flutter", "Next.js", "React", "Angular"] },
  { g: "Data & cloud", items: ["MySQL", "PostgreSQL", "AWS S3"] },
  { g: "Integrations", items: ["LiveKit", "Telnyx", "WooCommerce", "Stripe", "Google Maps", "Pusher", "WebSockets", "Telegram Bot", "Meta Business"] },
  { g: "Tools", items: ["Git", "GitHub", "Composer", "Postman", "VS Code"] },
];

export const log = [
  {
    hash: "a4f9c21",
    date: "Dec 2024 → now",
    title: "Full-Stack Developer, PHP & Laravel",
    org: "Client products",
    points: [
      "Lead development for client products: APIs for web panels, mobile apps and ecommerce stores.",
      "Built a POS platform, WooCommerce sync tools, CRMs, a LiveKit meeting platform and AI agents.",
      "Real-time with WebSockets and Pusher, file storage on AWS S3.",
      "Optimised MySQL queries and added caching for performance and scale.",
    ],
  },
  {
    hash: "7be03d8",
    date: "Oct → Dec 2024",
    title: "Web Development Intern",
    org: "Client websites",
    points: [
      "Client websites in HTML, CSS, JavaScript and jQuery.",
      "Laravel backend and API work under senior guidance, with Git and code reviews.",
    ],
  },
  {
    hash: "1c88e5a",
    date: "Graduated",
    title: "BS Information Technology",
    org: "Government College University Faisalabad",
    points: ["Final year project: ShareRoute."],
  },
];

export const other = [
  { n: "HN Fabrics", d: "React + Laravel. Complete site, front and back.", l: "hnfabrics.pk" },
  { n: "Gaming Website", d: "Next.js. Browse and play games with multiplayer, live chat and rooms.", l: "games.composerforce.me" },
  { n: "GCUF Portal LitUp", d: "Browser extension that swaps the university portal for a modern UI.", l: "gcuf-portal-litup.composerforce.me" },
  { n: "JB Order Placement", d: "Stripe self-checkout for store screens. Scan, bill, pay by card, go.", l: "" },
  { n: "Telegram CRM", d: "Laravel + Angular admin for Telegram bot chats and driver assignment.", l: "" },
  { n: "Hunt CRM", d: "Laravel lead-management CRM.", l: "" },
  { n: "Shareout", d: "App + backend.", l: "" },
  { n: "Review system · B2B · Holiday Game", d: "Smaller builds.", l: "" },
];

export const marquee = ["LiveKit", "Telnyx", "Anthropic", "n8n", "Retell", "Laravel", "WooCommerce", "Pusher", "Stripe", "Flutter", "Meta Business", "PostgreSQL", "AWS S3", "WebSockets"];
