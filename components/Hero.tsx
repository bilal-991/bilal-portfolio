"use client";
import { useEffect, useState } from "react";

const body = [
  `{`,
  `  "name": "Muhammad Bilal",`,
  `  "role": "Full-Stack Developer",`,
  `  "stack": ["PHP", "Laravel", "LiveKit"],`,
  `  "ai": ["Anthropic API", "n8n", "Retell"],`,
  `  "focus": ["APIs", "real-time", "AI agents"],`,
  `  "shipped": ["meetings", "driver-app", "shareroute"],`,
  `  "status": "open_to_work"`,
  `}`,
];

export default function Hero() {
  const [n, setN] = useState(0);
  const [ms, setMs] = useState<number | null>(null);
  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) { setN(body.length); setMs(42); return; }
    const t0 = setTimeout(() => {
      let i = 0;
      const id = setInterval(() => { i++; setN(i); if (i >= body.length) { clearInterval(id); setMs(42); } }, 170);
    }, 700);
    return () => clearTimeout(t0);
  }, []);

  return (
    <section id="top" className="hero">
      <div className="req">
        <span className="m">GET</span> <span>/api/v1/bilal</span>
        <span className={`stat ${ms ? "ok" : ""}`}>{ms ? `200 OK · ${ms}ms` : "pending…"}</span>
      </div>
      <h1>
        <span className="l1">I build the</span>
        <span className="l2">software <em>your</em></span>
        <span className="l3">product <u>stands on.</u></span>
      </h1>
      <div className="hero-grid">
        <p className="lede">
          Full-stack developer shipping Laravel APIs, web and mobile apps, real-time video, and AI agents that answer customers
          while the team sleeps. I use AI tools to move fast, and keep the architecture in my own hands.
        </p>
        <div className="resp" aria-label="Profile as JSON response">
          <div className="resp-h"><i /><i /><i /><span>response.json</span></div>
          <pre>
            {body.slice(0, n).map((l, i) => (
              <div key={i} className="ln"><b>{String(i + 1).padStart(2, "0")}</b>{colorize(l)}</div>
            ))}
            {n < body.length && <span className="caret" />}
          </pre>
        </div>
      </div>
      <div className="cta">
        <a className="btn solid" href="#contact">Hire me →</a>
        <a className="btn" href="#work">See the work</a>
        <a className="btn" href="/Muhammad_Bilal_CV.pdf" download="Muhammad_Bilal_CV.pdf">Download CV ↓</a>
        <span className="hint">psst, press <kbd>⌘K</kbd> and talk to the console</span>
      </div>
    </section>
  );
}

function colorize(s: string) {
  const parts = s.split(/("[^"]*")/g);
  return (
    <>
      {parts.map((p, i) =>
        p.startsWith('"') ? <span key={i} className={parts[i + 1]?.startsWith(":") ? "k" : "s"}>{p}</span> : <span key={i}>{p.replace(/(\d+)/g, "$1")}</span>
      )}
    </>
  );
}
