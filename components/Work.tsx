"use client";
import { useState } from "react";
import { projects } from "@/lib/data";

export default function Work() {
  const [open, setOpen] = useState<string | null>("meetings");
  return (
    <ul className="work">
      {projects.map((p, i) => {
        const on = open === p.id;
        return (
          <li key={p.id} className={on ? "on" : ""}>
            <button className="row" onClick={() => setOpen(on ? null : p.id)} aria-expanded={on}>
              <span className="idx">{String(i + 1).padStart(2, "0")}</span>
              <span className="nm">{p.name}</span>
              <span className="tg">{p.tag}</span>
              <span className="plus" aria-hidden>{on ? "−" : "+"}</span>
            </button>
            <div className="panel" style={{ gridTemplateRows: on ? "1fr" : "0fr" }}>
              <div className="inner">
                <div className="cols">
                  <div>
                    <p className="sum">{p.summary}</p>
                    <div className="chips">{p.stack.map((s) => <span key={s}>{s}</span>)}</div>
                    <div className="meta"><span className="live">● {p.status}</span>{p.link && <span>{p.link}</span>}</div>
                  </div>
                  <ul className="pts">{p.points.map((x) => <li key={x}>{x}</li>)}</ul>
                </div>
              </div>
            </div>
          </li>
        );
      })}
    </ul>
  );
}
