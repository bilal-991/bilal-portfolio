"use client";
import { useEffect, useRef, useState, type ReactNode } from "react";
import { linkify } from "./linkify";

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

function local(raw: string): string | null {
  const q = raw.trim().toLowerCase();
  if (q === "help" || q === "?") return "ask me anything about Bilal in plain English: projects, skills, experience, hiring, his CV.\nor try: fetch pending invoices · create customer · clear";
  if (q.includes("pending invoice")) return JSON.stringify({ tool: "invoices.list", filter: { status: "pending" }, count: 3, note: "this is how the POS assistant I built on the Anthropic API behaves" }, null, 1);
  if (q.includes("create") && q.includes("customer")) return JSON.stringify({ tool: "customers.create", status: 201, note: "plain language in, Laravel action out" }, null, 1);
  if (q.includes("sudo")) return "nice try. permission denied.";
  return null;
}

export default function Shell({ children }: { children: ReactNode }) {
  const [active, setActive] = useState("top");
  const [open, setOpen] = useState(false);
  const [val, setVal] = useState("");
  const [lines, setLines] = useState<Line[]>([{ k: "out", t: "console ready. ask me anything about Bilal, or type help." }]);
  const [busy, setBusy] = useState(false);
  const abort = useRef<AbortController | null>(null);
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
  useEffect(() => { bodyRef.current?.scrollTo({ top: 1e6, behavior: "smooth" }); }, [lines]);
  useEffect(() => () => abort.current?.abort(), []);

  const patch = (t: string) => setLines((l) => { const c = l.slice(); c[c.length - 1] = { k: "out", t }; return c; });

  const run = async (e: React.FormEvent) => {
    e.preventDefault();
    const q = val.trim();
    if (!q || busy) return;
    setVal("");
    if (q === "clear") return setLines([]);
    const quick = local(q);
    if (quick !== null) return setLines((l) => [...l, { k: "in", t: q }, { k: "out", t: quick }]);

    const history = [...lines.filter((l) => l.t && !l.t.startsWith("console ready")), { k: "in" as const, t: q }]
      .filter((l) => !l.t.startsWith("{") && !l.t.startsWith("ask me anything"))
      .map((l) => ({ role: l.k === "in" ? "user" : "assistant", content: l.t }));
    setLines((l) => [...l, { k: "in", t: q }, { k: "out", t: "" }]);
    setBusy(true);
    const ac = new AbortController();
    abort.current = ac;
    try {
      const res = await fetch("/api/chat", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ messages: history }), signal: ac.signal });
      if (!res.ok || !res.body) throw new Error();
      const reader = res.body.getReader();
      const dec = new TextDecoder();
      let acc = "";
      for (;;) {
        const { done, value } = await reader.read();
        if (done) break;
        acc += dec.decode(value, { stream: true });
        patch(acc);
      }
      if (!acc.trim()) throw new Error();
    } catch (err) {
      if ((err as Error)?.name !== "AbortError") patch("connection dropped. try again, or email bilalfiaz747@gmail.com");
    } finally {
      setBusy(false);
      setTimeout(() => inputRef.current?.focus(), 0);
    }
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
              {lines.map((l, i) => (
                <pre key={i} className={l.k}>
                  {l.k === "in" ? "› " + l.t : l.t ? linkify(l.t, () => setOpen(false)) : <span className="cb-typing"><i /><i /><i /></span>}
                </pre>
              ))}
            </div>
            <form onSubmit={run} className="term-i">
              <span>›</span>
              <input ref={inputRef} value={val} onChange={(e) => setVal(e.target.value)} placeholder={busy ? "thinking…" : "ask me anything: what can you do for me?"} disabled={busy} spellCheck={false} />
            </form>
          </div>
        </div>
      )}
    </>
  );
}
