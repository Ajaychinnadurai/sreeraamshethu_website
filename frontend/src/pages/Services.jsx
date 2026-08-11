import Seo from "../components/Seo";
import Reveal from "../components/Reveal";
import ServicesSection from "../sections/ServicesSection";
import CTA from "../sections/CTA";
import { Link } from "react-router-dom";
import { breadcrumbSchema, serviceSchema, faqSchema, SITE_URL } from "../utils/seo";

/** All services offered — expanded to match full service list */
const DETAILS = [
  {
    id: "house-construction",
    name: "House Construction in Rameswaram",
    copy: "Custom homes, villas and residences engineered for the coastal climate — from foundation and RCC structure to plastering, painting, flooring and complete finishing.",
  },
  {
    id: "commercial-construction",
    name: "Commercial Construction in Rameswaram",
    copy: "Commercial spaces built around function, efficiency and long-term value — shops, lodges, offices and institutional buildings delivered from layout to handover.",
  },
  {
    id: "building-repair",
    name: "Building Repair & Renovation in Rameswaram",
    copy: "Wall crack repairs, concrete restoration, plaster damage, structural deterioration, leakage fixes, terrace and roofing repairs — done systematically with quality materials.",
  },
  {
    id: "waterproofing",
    name: "Waterproofing Contractor in Rameswaram",
    copy: "Terrace waterproofing, basement waterproofing, bathroom waterproofing and exterior wall waterproofing using proven materials suited to Rameswaram's coastal humidity.",
  },
  {
    id: "rcc-concrete",
    name: "RCC & Concrete Works",
    copy: "Reinforced concrete construction with anti-corrosive mixes, quality steel, load-bearing pillars and slabs — engineered for coastal durability and structural integrity.",
  },
  {
    id: "roofing",
    name: "Roofing & Terrace Works in Rameswaram",
    copy: "Flat slab roofing, sloped tile roofing, terrace waterproofing, parapet walls and terrace garden preparation using materials proven against salt-air weathering.",
  },
  {
    id: "flooring-tiling",
    name: "Flooring & Tiling Contractor in Rameswaram",
    copy: "Vitrified tile, ceramic tile, granite, marble and anti-skid flooring laid with precision alignment, proper adhesives and waterproof joints for lasting performance.",
  },
  {
    id: "painting",
    name: "Painting Contractor in Rameswaram",
    copy: "Interior and exterior painting using premium weather-proof, anti-fungal and high-sheen paints — proper surface preparation and priming for long-lasting finish.",
  },
  {
    id: "plumbing",
    name: "Plumbing Works",
    copy: "Complete plumbing installation, overhead tank connections, bathroom fittings, drainage systems and water-efficient fixture selection for new and existing buildings.",
  },
  {
    id: "electrical",
    name: "Electrical Works",
    copy: "Safe and code-compliant electrical wiring, DB board installation, switch/socket, lighting and solar-ready electrical layouts for residential and commercial buildings.",
  },
  {
    id: "interior-design",
    name: "Interior Design & Execution in Rameswaram",
    copy: "Turnkey interiors across living room, bedroom, kitchen and office — material, lighting, furniture and spatial planning unified in one cohesive design and executed by our team.",
  },
  {
    id: "modular-kitchen",
    name: "Modular Kitchen in Rameswaram",
    copy: "Custom modular kitchen design with moisture-resistant carcass, shutters, hardware and countertops — planned around your cooking workflow and kitchen dimensions.",
  },
  {
    id: "bathroom-renovation",
    name: "Bathroom Renovation in Rameswaram",
    copy: "Complete bathroom renovation including waterproofing, tiling, sanitary fixtures, shower cubicle, anti-skid flooring and modern fittings.",
  },
  {
    id: "false-ceiling",
    name: "False Ceiling Works",
    copy: "Gypsum board false ceiling, PVC ceiling, wooden finish false ceiling and integrated LED lighting for a clean, modern and polished interior look.",
  },
  {
    id: "compound-wall",
    name: "Compound Wall & Fabrication",
    copy: "Compound wall construction, boundary wall, MS gate fabrication, staircase railings and structural steel fabrication using quality materials and welding.",
  },
  {
    id: "turnkey",
    name: "Turnkey Construction Projects in Rameswaram",
    copy: "One accountable partner from concept, design and approvals through construction, finishing and final handover — including all civil, interior and services work.",
  },
];

/** FAQ items — based on real customer questions for this location */
const FAQ_ITEMS = [
  {
    question: "How much does house construction cost in Rameswaram?",
    answer:
      "House construction cost in Rameswaram varies depending on the built-up area, number of floors, materials selected, and finishing level. Typically basic construction starts from ₹1,800–₹2,200 per sq.ft and premium construction ranges from ₹2,500–₹3,500 per sq.ft. Contact us for a detailed site-specific estimate.",
  },
  {
    question: "How long does house construction take in Rameswaram?",
    answer:
      "A standard residential house of 1,000–1,500 sq.ft typically takes 6–10 months from foundation to finishing. Timeline depends on floor count, design complexity, and material availability. We provide a milestone-based schedule before work begins.",
  },
  {
    question: "Do you provide building repair and renovation services in Rameswaram?",
    answer:
      "Yes. We provide comprehensive building repair including wall crack repairs, concrete restoration, plaster repairs, waterproofing, roofing repairs, and full renovation works across Rameswaram and Ramanathapuram district.",
  },
  {
    question: "Do you provide waterproofing services in Rameswaram?",
    answer:
      "Yes. We provide terrace waterproofing, bathroom waterproofing, basement waterproofing and exterior wall treatment. Given Rameswaram's coastal and humid climate, we use marine-grade waterproofing materials with proven long-term performance.",
  },
  {
    question: "Do you handle complete interior design and execution in Rameswaram?",
    answer:
      "Yes. We offer turnkey interior services including false ceiling, flooring, painting, modular kitchen, bathroom renovation, furniture coordination, lighting and electrical — all executed by our team from design to handover.",
  },
  {
    question: "Can I request a free site inspection and project estimate?",
    answer:
      "Yes. We offer a free site visit and initial consultation for residential and commercial projects in Rameswaram, Ramanathapuram, Pamban and nearby areas. Contact us at +91 95666 15030 or fill our enquiry form.",
  },
  {
    question: "Do you serve areas outside Rameswaram?",
    answer:
      "Yes. We serve Rameswaram, Ramanathapuram, Pamban, Mandapam, Thiruvadanai, and surrounding areas in Ramanathapuram district, Tamil Nadu.",
  },
];

export default function Services() {
  return (
    <>
      <Seo
        title="Construction & Civil Services in Rameswaram | Sree Raam Shethu Constructions"
        description="Complete civil construction services in Rameswaram, Tamil Nadu — house construction, building repair, renovation, waterproofing, interior design, modular kitchen, flooring, painting, RCC works and turnkey projects. Call +91 95666 15030."
        canonical={`${SITE_URL}/services`}
        jsonLd={[
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Services", path: "/services" },
          ]),
          serviceSchema(),
          faqSchema(FAQ_ITEMS),
        ]}
      />

      {/* Page Hero */}
      <section className="page-hero">
        <div className="container page-hero__inner">
          <Reveal>
            <span className="eyebrow">Our Services</span>
          </Reveal>
          <Reveal delay={0.1}>
            {/*
             * H1 — contains primary service keyword + location.
             * Previous H1 was "Everything your build needs." — no location, no keyword.
             */}
            <h1 className="display page-hero__title">
              Construction &amp; Interior Services in{" "}
              <span className="accent">Rameswaram</span>
            </h1>
          </Reveal>
          <Reveal delay={0.18}>
            <p className="page-hero__desc">
              Civil construction, building repair, renovation, waterproofing,
              interior design &amp; turnkey projects — by S.M. Sethu Pandian B.E. (Civil)
              and team, Rameswaram, Tamil Nadu.
            </p>
          </Reveal>
        </div>
      </section>

      {/* Core services component */}
      <ServicesSection />

      {/* Expanded service detail cards */}
      <section className="section detail-cards" aria-label="Complete list of construction services">
        <div className="container">
          <Reveal>
            <h2 className="display" style={{ marginBottom: "0.5rem" }}>
              All Services We Provide
            </h2>
            <p className="muted" style={{ marginBottom: "2.5rem" }}>
              From foundation to finishing — every construction and interior need under one roof in Rameswaram.
            </p>
          </Reveal>
          <Reveal className="detail-cards__grid">
            {DETAILS.map((d, i) => (
              <article key={d.id} id={d.id} className="detail-card">
                <span className="detail-card__idx">{String(i + 1).padStart(2, "0")}</span>
                <h3>{d.name}</h3>
                <p className="muted">{d.copy}</p>
              </article>
            ))}
          </Reveal>
        </div>
      </section>

      {/* Areas We Serve */}
      <section className="section band band--light" aria-labelledby="areas-heading">
        <div className="container">
          <Reveal>
            <h2 id="areas-heading" className="display" style={{ marginBottom: "1rem" }}>
              Areas We Serve
            </h2>
            <p className="muted" style={{ marginBottom: "2rem" }}>
              We provide civil construction, renovation and interior services across Rameswaram and Ramanathapuram district.
            </p>
          </Reveal>
          <Reveal>
            <div className="areas-grid">
              {[
                "Rameswaram",
                "Ramanathapuram",
                "Pamban",
                "Mandapam",
                "Thiruvadanai",
                "Arichalmunai",
              ].map((area) => (
                <div key={area} className="area-chip">
                  <span className="area-chip__dot" aria-hidden="true">●</span>
                  <span>{area}</span>
                </div>
              ))}
            </div>
          </Reveal>
          <Reveal delay={0.12}>
            <p className="muted" style={{ marginTop: "1.5rem", fontSize: "0.92rem" }}>
              Need construction or renovation services in another location in Tamil Nadu?{" "}
              <Link to="/contact" className="accent-link">
                Contact us to discuss your project
              </Link>
              .
            </p>
          </Reveal>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="section" aria-labelledby="faq-heading">
        <div className="container">
          <Reveal>
            <span className="eyebrow">Common Questions</span>
            <h2 id="faq-heading" className="display" style={{ marginTop: "0.8rem", marginBottom: "2.5rem" }}>
              Frequently Asked Questions
            </h2>
          </Reveal>
          <div className="faq-list">
            {FAQ_ITEMS.map((item, i) => (
              <Reveal key={i} delay={i * 0.05} className="faq-item">
                <h3 className="faq-item__q">{item.question}</h3>
                <p className="faq-item__a">{item.answer}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <CTA />
    </>
  );
}