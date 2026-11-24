"use client";
import { useState } from "react";
import { flows } from "@/lib/data";

export default function Flows() {
  const [id, setId] = useState(flows[0].id);
  const f = flows.find((x) => x.id === id)!;
  return (
    <div className="flows">
      <div className="tabs" role="tablist">
        {flows.map((x) => (
          <button key={x.id} role="tab" aria-selected={x.id === id} className={x.id === id ? "on" : ""} onClick={() => setId(x.id)}>{x.label}</button>
        ))}
      </div>
      <div className="diagram" key={f.id}>
        {f.cols.map((col, ci) => (
          <div className="seg" key={ci}>
            <div className="col">
              {col.map((n, ni) => (<div className="node" style={{ animationDelay: `${ci * 90 + ni * 50}ms` }} key={n}>{n}</div>))}
            </div>
            {ci < f.cols.length - 1 && <div className="wire" style={{ animationDelay: `${ci * 380}ms` }}><span /></div>}
          </div>
        ))}
      </div>
      <p className="fnote">↳ {f.note}</p>
    </div>
  );
}
