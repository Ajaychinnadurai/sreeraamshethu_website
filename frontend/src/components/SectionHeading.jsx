import Reveal from "./Reveal";

export default function SectionHeading({ eyebrow, title, sub, align = "left", light = false }) {
  return (
    <div className={`section-head section-head--${align} ${light ? "section-head--light" : ""}`}>
      {eyebrow && (
        <Reveal>
          <span className="eyebrow">{eyebrow}</span>
        </Reveal>
      )}
      <Reveal delay={0.1}>
        <h2 className="display section-head__title">{title}</h2>
      </Reveal>
      {sub && (
        <Reveal delay={0.2}>
          <p className="section-head__sub muted">{sub}</p>
        </Reveal>
      )}
    </div>
  );
}