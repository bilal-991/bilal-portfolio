import Shell from "@/components/Shell";
import Hero from "@/components/Hero";
import Work from "@/components/Work";
import Flows from "@/components/Flows";
import Reveal from "@/components/Reveal";
import Chatbot from "@/components/Chatbot";
import { log, marquee, other, profile, stack } from "@/lib/data";

function Head({ n, route, title }: { n: string; route: string; title: React.ReactNode }) {
  return (
    <Reveal>
      <header className="sh">
        <span className="rt">{n} · <b>{route}</b></span>
        <h2>{title}</h2>
      </header>
    </Reveal>
  );
}

export default function Page() {
  const loop = [...marquee, ...marquee];
  return (
    <Shell>
      <Chatbot />
      <Hero />

      <div className="marquee" aria-hidden>
        <div className="track">{loop.map((m, i) => <span key={i}>{m}<i>✦</i></span>)}</div>
      </div>

      <section id="work" className="sec">
        <Head n="01" route="GET /projects" title={<>Things that are <em>live</em>, not just demos.</>} />
        <Reveal><Work /></Reveal>
      </section>

      <section id="flows" className="sec">
        <Head n="02" route="GET /systems" title={<>How the pieces <em>talk</em>.</>} />
        <Reveal><Flows /></Reveal>
      </section>

      <section id="stack" className="sec">
        <Head n="03" route="GET /stack" title={<>Tools I <em>reach for</em>.</>} />
        <div className="stack">
          {stack.map((s, i) => (
            <Reveal key={s.g} delay={i * 60}>
              <div className="sg">
                <h3>{s.g}</h3>
                <div className="chips">{s.items.map((x) => <span key={x}>{x}</span>)}</div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <section id="log" className="sec">
        <Head n="04" route="GET /history" title={<>The <em>commit log</em>.</>} />
        <ol className="gl">
          {log.map((l) => (
            <Reveal key={l.hash}>
              <li>
                <div className="gh"><code>{l.hash}</code><span>{l.date}</span></div>
                <h3>{l.title}</h3>
                <p className="org">{l.org}</p>
                <ul>{l.points.map((p) => <li key={p}>{p}</li>)}</ul>
              </li>
            </Reveal>
          ))}
        </ol>
      </section>

      <section id="more" className="sec">
        <Head n="05" route="GET /more" title={<>Also <em>shipped</em>.</>} />
        <div className="more">
          {other.map((o, i) => (
            <Reveal key={o.n} delay={(i % 4) * 60}>
              <div className="card">
                <h3>{o.n}</h3>
                <p>{o.d}</p>
                {o.l && <a href={`https://${o.l}`} target="_blank" rel="noreferrer">{o.l} ↗</a>}
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <section id="contact" className="sec contact">
        <Head n="06" route="POST /hire-me" title={<>Got a product that <em>needs to hold up</em>?</>} />
        <Reveal>
          <a className="mail" href={`mailto:${profile.email}`}>{profile.email}</a>
          <div className="reqbody">
            <pre>{`POST /hire-me
{
  "from": "you",
  "message": "let's build something"
}`}</pre>
            <div className="contacts">
              <a className="btn solid" href={`mailto:${profile.email}`}>Send the request →</a>
              <a className="btn" href="/Muhammad_Bilal_CV.pdf" download="Muhammad_Bilal_CV.pdf">Download CV ↓</a>
              <a className="btn wa" href={`https://wa.me/${profile.phoneHref.replace("+", "")}`} target="_blank" rel="noreferrer"><span className="wdot" />WhatsApp me</a>
            </div>
          </div>
        </Reveal>
        <footer>© 2026 Muhammad Bilal · built with Next.js</footer>
      </section>
    </Shell>
  );
}
