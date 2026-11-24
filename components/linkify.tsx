const LINK = /(\/Muhammad_Bilal_CV\.pdf|[\w.+-]+@[\w-]+(?:\.[\w-]+)+|\+\d[\d ]{8,}\d|(?:[a-z0-9-]+\.)+(?:pk|me|com|org|dev|io)\b(?:\/[^\s,;)]*)?|#(?:work|flows|stack|log|more|contact)\b)/gi;

export function linkify(text: string, close: () => void) {
  return text.split(LINK).map((part, i) => {
    if (i % 2 === 0) return part;
    if (part.startsWith("/Muhammad")) return <a key={i} className="cb-a cb-dl" href={part} download="Muhammad_Bilal_CV.pdf">Download CV ↓</a>;
    if (part.startsWith("#")) return <a key={i} className="cb-a" href={part} onClick={close}>{part === "#contact" ? "contact" : part.slice(1)} ↗</a>;
    if (part.includes("@")) return <a key={i} className="cb-a" href={`mailto:${part}`}>{part}</a>;
    if (part.startsWith("+")) return <a key={i} className="cb-a" href={`https://wa.me/${part.replace(/\D/g, "")}`} target="_blank" rel="noreferrer">{part}</a>;
    return <a key={i} className="cb-a" href={`https://${part}`} target="_blank" rel="noreferrer">{part} ↗</a>;
  });
}
