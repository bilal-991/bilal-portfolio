"use client";
import { useEffect, useRef, useState } from "react";

const LINK = /(\/Muhammad_Bilal_CV\.pdf|[\w.+-]+@[\w-]+(?:\.[\w-]+)+|\+\d[\d ]{8,}\d|(?:[a-z0-9-]+\.)+(?:pk|me|com|org|dev|io)\b(?:\/[^\s,;)]*)?|#(?:work|flows|stack|log|more|contact)\b)/gi;

function linkify(text: string, close: () => void) {
  return text.split(LINK).map((part, i) => {
    if (i % 2 === 0) return part;
    if (part.startsWith("/Muhammad")) return <a key={i} className="cb-a cb-dl" href={part} download="Muhammad_Bilal_CV.pdf">Download CV ↓</a>;
    if (part.startsWith("#")) return <a key={i} className="cb-a" href={part} onClick={close}>{part === "#contact" ? "contact" : part.slice(1)} ↗</a>;
    if (part.includes("@")) return <a key={i} className="cb-a" href={`mailto:${part}`}>{part}</a>;
    if (part.startsWith("+")) return <a key={i} className="cb-a" href={`https://wa.me/${part.replace(/\D/g, "")}`} target="_blank" rel="noreferrer">{part}</a>;
    return <a key={i} className="cb-a" href={`https://${part}`} target="_blank" rel="noreferrer">{part} ↗</a>;
  });
}

type Msg = { role: "user" | "assistant"; content: string };

const hello: Msg = {
  role: "assistant",
  content: "Hi, I'm Bilal's assistant. Ask me about his projects, skills, experience, or how to hire him.",
};
const suggestions = ["What has Bilal built?", "What's his tech stack?", "Does he build AI agents?", "How can I hire him?"];

export default function Chatbot() {
  const [open, setOpen] = useState(false);
  const [msgs, setMsgs] = useState<Msg[]>([hello]);
  const [val, setVal] = useState("");
  const [busy, setBusy] = useState(false);
  const bodyRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const abort = useRef<AbortController | null>(null);

  useEffect(() => { bodyRef.current?.scrollTo({ top: 1e6, behavior: "smooth" }); }, [msgs, open]);
  useEffect(() => { if (open) setTimeout(() => inputRef.current?.focus(), 80); }, [open]);
  useEffect(() => {
    const k = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", k);
    return () => window.removeEventListener("keydown", k);
  }, []);
  useEffect(() => () => abort.current?.abort(), []);

  const send = async (text: string) => {
    const q = text.trim();
    if (!q || busy) return;
    setVal("");
    const history: Msg[] = [...msgs, { role: "user", content: q }];
    setMsgs([...history, { role: "assistant", content: "" }]);
    setBusy(true);
    const ac = new AbortController();
    abort.current = ac;
    const patch = (content: string) =>
      setMsgs((m) => { const c = m.slice(); c[c.length - 1] = { role: "assistant", content }; return c; });
    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: history.filter((m) => m !== hello) }),
        signal: ac.signal,
      });
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
    } catch (e) {
      if ((e as Error)?.name !== "AbortError") patch("Sorry, I couldn't reach the assistant. You can email bilalfiaz747@gmail.com directly.");
    } finally {
      setBusy(false);
    }
  };

  const showChips = msgs.length === 1;

  return (
    <>
      <button className={`cb-fab ${open ? "x" : ""}`} onClick={() => setOpen((o) => !o)} aria-label={open ? "Close chat" : "Chat with Bilal's assistant"} aria-expanded={open}>
        <span className="cb-ping" aria-hidden />
        {open ? "✕" : <><span className="cb-ic" aria-hidden>✦</span><span className="cb-lbl">Ask about Bilal</span></>}
      </button>

      <div className={`cb ${open ? "open" : ""}`} role="dialog" aria-label="Chat with Bilal's assistant" aria-hidden={!open}>
        <div className="cb-h">
          <span className="cb-av">B</span>
          <div>
            <b>Bilal's assistant</b>
            <small><i /> online · knows everything about Bilal</small>
          </div>
          <button onClick={() => setOpen(false)} aria-label="Close chat">esc</button>
        </div>

        <div className="cb-b" ref={bodyRef} aria-live="polite">
          {msgs.map((m, i) => (
            <div key={i} className={`cb-m ${m.role}`}>
              {m.content ? (m.role === "assistant" ? linkify(m.content, () => setOpen(false)) : m.content) : <span className="cb-typing"><i /><i /><i /></span>}
            </div>
          ))}
          {showChips && (
            <div className="cb-chips">
              {suggestions.map((s) => <button key={s} onClick={() => send(s)}>{s}</button>)}
            </div>
          )}
        </div>

        <form className="cb-i" onSubmit={(e) => { e.preventDefault(); send(val); }}>
          <input ref={inputRef} value={val} onChange={(e) => setVal(e.target.value)} placeholder="Ask about Bilal…" maxLength={500} disabled={busy} />
          <button type="submit" disabled={busy || !val.trim()} aria-label="Send">↑</button>
        </form>
        <p className="cb-f">AI answers about Bilal only · may make mistakes</p>
      </div>
    </>
  );
}
