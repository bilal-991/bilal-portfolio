"use client";
import { useEffect, useRef, useState, type ReactNode } from "react";
import { profile, projects, stack } from "@/lib/data";

const routes = [
  { id: "top", m: "GET", p: "/bilal" },
  { id: "work", m: "GET", p: "/projects" },
  { id: "flows", m: "GET", p: "/systems" },
  { id: "stack", m: "GET", p: "/stack" },
  { id: "log", m: "GET", p: "/history" },
  { id: "more", m: "GET", p: "/more" },
  { id: "contact", m: "POST", p: "/hire-me" },
];

type Line = { k: "in" | "out"; t: string };

function answer(raw: string): string {
  const q = raw.trim().toLowerCase();
  if (!q) return "";
  if (q === "help" || q === "?") return "try: whoami · projects · stack · contact · hire · fetch pending invoices · create customer · clear";
  if (q.includes("who")) return `${profile.name}. Full-stack dev. PHP & Laravel at the core, plus Flutter, Next.js, React and Angular. Builds APIs, real-time systems and AI agents.`;
  if (q.includes("project") || q.includes("work")) return projects.map((p, i) => `${i + 1}. ${p.name}`).join("\n");
  if (q.includes("stack") || q.includes("skill")) return stack.map((s) => `${s.g}: ${s.items.slice(0, 4).join(", ")}`).join("\n");
  if (q.includes("pending invoice")) return JSON.stringify({ tool: "invoices.list", filter: { status: "pending" }, count: 3, note: "this is how the POS assistant I built on the Anthropic API behaves" }, null, 1);
  if (q.includes("create") && q.includes("customer")) return JSON.stringify({ tool: "customers.create", status: 201, note: "plain language in, Laravel action out" }, null, 1);
  if (q.includes("contact") || q.includes("email") || q.includes("phone")) return `${profile.email}\n${profile.phone}`;
  if (q.includes("hire") || q.includes("available")) return `Open to work. Email ${profile.email} and you'll get a reply.`;
  if (q.includes("sudo")) return "nice try. permission denied.";
  return `404: no route for "${raw}". type help.`;
}

export default function Shell({ children }: { children: ReactNode }) {
  const [active, setActive] = useState("top");
  const [open, setOpen] = useState(false);
  const [val, setVal] = useState("");
  const [lines, setLines] = useState<Line[]>([{ k: "out", t: "console ready. type help." }]);
  const inputRef = useRef<HTMLInputElement>(null);
  const bodyRef = useRef<HTMLDivElement>(null);
  const glow = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const move = (e: PointerEvent) => {
      glow.current?.style.setProperty("--x", e.clientX + "px");
      glow.current?.style.setProperty("--y", e.clientY + "px");
    };
    const key = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") { e.preventDefault(); setOpen((o) => !o); }
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("pointermove", move);
    window.addEventListener("keydown", key);
    return () => { window.removeEventListener("pointermove", move); window.removeEventListener("keydown", key); };
  }, []);

  useEffect(() => {
    const io = new IntersectionObserver(
      (es) => es.forEach((e) => e.isIntersecting && setActive(e.target.id)),
      { rootMargin: "-40% 0px -55% 0px" }
    );
    routes.forEach((r) => { const el = document.getElementById(r.id); if (el) io.observe(el); });
    return () => io.disconnect();
  }, []);

  useEffect(() => { if (open) setTimeout(() => inputRef.current?.focus(), 30); }, [open]);
  useEffect(() => { bodyRef.current?.scrollTo({ top: 1e6 }); }, [lines]);

  const run = (e: React.FormEvent) => {
    e.preventDefault();
    const q = val.trim();
    if (!q) return;
    setVal("");
    if (q === "clear") return setLines([]);
    setLines((l) => [...l, { k: "in", t: q }, { k: "out", t: answer(q) }]);
  };

  return (
    <>
      <div className="grain" aria-hidden />
      <div className="glow" ref={glow} aria-hidden />
      <aside className="rail">
        <a href="#top" className="brand"><span className="dot" />bilal<span className="dim">.dev</span></a>
        <nav>
          {routes.map((r) => (
            <a key={r.id} href={`#${r.id}`} className={active === r.id ? "on" : ""}>
              <i className={r.m === "POST" ? "post" : ""}>{r.m}</i>
              <span>{r.p}</span>
            </a>
          ))}
        </nav>
        <button className="kbtn" onClick={() => setOpen(true)}>
          <span>console</span><kbd>⌘K</kbd>
        </button>
        <div className="uptime"><span className="pulse" /> 200 OK · available</div>
      </aside>

      <button className="mtop" onClick={() => setOpen(true)} aria-label="Open console">&gt;_</button>
      <main>{children}</main>

      {open && (
        <div className="overlay" onClick={() => setOpen(false)}>
          <div className="term" onClick={(e) => e.stopPropagation()}>
            <div className="term-h"><span>bilal@api ~ console</span><button onClick={() => setOpen(false)}>esc</button></div>
            <div className="term-b" ref={bodyRef}>
              {lines.map((l, i) => (<pre key={i} className={l.k}>{l.k === "in" ? "› " : ""}{l.t}</pre>))}
            </div>
            <form onSubmit={run} className="term-i">
              <span>›</span>
              <input ref={inputRef} value={val} onChange={(e) => setVal(e.target.value)} placeholder="ask me anything: projects, stack, hire…" spellCheck={false} />
            </form>
          </div>
        </div>
      )}
    </>
  );
}
