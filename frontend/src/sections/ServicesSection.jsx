import { useState } from "react";
import Reveal from "../components/Reveal";
import Button from "../components/Button";
import SectionHeading from "../components/SectionHeading";

const SERVICES = [
  {
    num: "01",
    title: "Residential Construction",
    desc: "Modern homes, villas and custom residences engineered for durability and comfort.",
  },
  {
    num: "02",
    title: "Commercial Construction",
    desc: "Commercial spaces designed around functionality, efficiency and long-term value.",
  },
  {
    num: "03",
    title: "Interior Design",
    desc: "Contemporary interiors combining material, lighting, furniture and spatial planning.",
  },
  {
    num: "04",
    title: "Turnkey Projects",
    desc: "Complete project execution from concept to handover — one partner, one standard.",
  },
  {
    num: "05",
    title: "Renovation",
    desc: "Transform existing spaces with modern planning and construction expertise.",
  },
  {
    num: "06",
    title: "Architectural Solutions",
    desc: "Planning, design coordination and execution support for complex builds.",
  },
];

export default function Services({ compact = false }) {
  const [active, setActive] = useState(0);
  const list = compact ? SERVICES.slice(0, 3) : SERVICES;

  return (
    <section className={`section services ${compact ? "services--compact" : ""}`}>
      <div className="container">
        <SectionHeading
          eyebrow="What we do"
          title={compact ? "Core services" : "Built on precision"}
          sub="Six disciplines, one standard of engineering and craft."
        />
      </div>

      <div className="container services__list">
        {list.map((s, i) => (
          <Reveal key={s.num} delay={i * 0.05}>
            <article
              className={`service-row ${active === i ? "is-active" : ""}`}
              onMouseEnter={() => setActive(i)}
            >
              <div className="service-row__num">{s.num}</div>
              <h3 className="service-row__title">{s.title}</h3>
              <p className="service-row__desc">{s.desc}</p>
            </article>
          </Reveal>
        ))}
      </div>

      <div className="container services__cta">
        <Button to="/services" variant="outline">
          View all services
        </Button>
      </div>
    </section>
  );
}