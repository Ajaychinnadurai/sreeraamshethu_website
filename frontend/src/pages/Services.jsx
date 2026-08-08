import Seo from "../components/Seo";
import Reveal from "../components/Reveal";
import ServicesSection from "../sections/ServicesSection";
import CTA from "../sections/CTA";
import { breadcrumbSchema, serviceSchema, SITE_URL } from "../utils/seo";

const DETAILS = [
  {
    id: "homebuilding",
    name: "Home Builders in Rameshwaram",
    copy: "Custom homes and villas engineered for the coastal climate — foundations, framing, services and finishes delivered as one reliable build.",
  },
  {
    id: "interiors",
    name: "Interior Designers in Rameshwaram",
    copy: "Turnkey interiors across living, bedroom, kitchen and office — material, light, furniture and spatial planning unified in one vision.",
  },
  {
    id: "renovation",
    name: "Renovation Contractors in Rameshwaram",
    copy: "Structural and cosmetic renovation that respects the existing fabric while adding modern performance and comfort.",
  },
  {
    id: "commercial",
    name: "Commercial Construction in Rameshwaram",
    copy: "Commercial spaces built around function, efficiency and long-term value — from layout to handover.",
  },
  {
    id: "turnkey",
    name: "Turnkey Construction in Rameshwaram",
    copy: "One accountable partner from concept and design to construction, finishing and final handover.",
  },
  {
    id: "architecture",
    name: "Architecture & Coordination",
    copy: "Planning, design coordination and execution support that turns requirements into buildable, buildable structures.",
  },
];

export default function Services() {
  return (
    <>
      <Seo
        title="Construction & Interior Services in Rameshwaram | Sree Raam Shethu"
        description="Explore construction services, interior design, renovation and turnkey projects in Rameshwaram, Tamil Nadu. Residential and commercial builders with precision execution."
        canonical={`${SITE_URL}/services`}
        jsonLd={[breadcrumbSchema([{ name: "Home", path: "/" }, { name: "Services", path: "/services" }]), serviceSchema()]}
      />
      <section className="page-hero">
        <div className="container page-hero__inner">
          <Reveal><span className="eyebrow">Services</span></Reveal>
          <Reveal delay={0.1}>
            <h1 className="display page-hero__title">Everything your <span className="accent">build needs.</span></h1>
          </Reveal>
        </div>
      </section>

      <ServicesSection />

      <section className="section detail-cards">
        <div className="container">
          <Reveal className="detail-cards__grid">
            {DETAILS.map((d, i) => (
              <article key={d.id} className="detail-card">
                <span className="detail-card__idx">0{i + 1}</span>
                <h3>{d.name}</h3>
                <p className="muted">{d.copy}</p>
              </article>
            ))}
          </Reveal>
        </div>
      </section>

      <CTA />
    </>
  );
}