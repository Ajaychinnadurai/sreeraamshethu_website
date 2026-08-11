import { LayoutGrid, Layers, Armchair, Key, Sparkles, ChefHat, Bath, Layers3 } from "lucide-react";
import Seo from "../components/Seo";
import Reveal from "../components/Reveal";
import InteriorsSection from "../sections/InteriorsSection";
import CTA from "../sections/CTA";
import { breadcrumbSchema, faqSchema, SITE_URL } from "../utils/seo";

const OFFERINGS = [
  {
    num: "01",
    icon: LayoutGrid,
    title: "Spatial Planning & Layout",
    desc: "Light, flow and layout as the starting point of every interior. We balance volume, proportion, and functional zones for comfortable daily living.",
  },
  {
    num: "02",
    icon: Layers,
    title: "Material Selection",
    desc: "Stone, timber, metal and textiles chosen specifically to endure coastal humidity while exuding natural luxury and long-term durability.",
  },
  {
    num: "03",
    icon: Armchair,
    title: "Furniture & Lighting Design",
    desc: "Curated bespoke furniture, custom acoustic paneling, and layered architectural lighting that shape the room's mood and function.",
  },
  {
    num: "04",
    icon: Key,
    title: "Turnkey Interior Finishing",
    desc: "Complete interior execution — from 3D conceptualization to final structural finishing and styling — carried out by our experienced team.",
  },
  {
    num: "05",
    icon: ChefHat,
    title: "Modular Kitchen Design",
    desc: "Custom modular kitchen with moisture-resistant carcass, shutters, countertops and hardware — planned around your cooking workflow.",
  },
  {
    num: "06",
    icon: Bath,
    title: "Bathroom Renovation",
    desc: "Complete bathroom renovation including waterproofing, tiling, anti-skid flooring, modern sanitary fixtures and shower fittings.",
  },
  {
    num: "07",
    icon: Layers3,
    title: "False Ceiling & Lighting",
    desc: "Gypsum board, PVC and wooden false ceilings with integrated LED lighting for a refined, modern interior look and feel.",
  },
];

const INTERIOR_FAQ = [
  {
    question: "How much does interior design cost in Rameswaram?",
    answer:
      "Interior design and execution cost depends on the area, finishes and scope. Basic interior work starts from ₹800–₹1,200 per sq.ft. Premium turnkey interiors range from ₹1,500–₹2,500+ per sq.ft. Contact us for a free estimate.",
  },
  {
    question: "Do you design and execute modular kitchens in Rameswaram?",
    answer:
      "Yes. We design and execute custom modular kitchens with moisture-resistant materials suited to Rameswaram's humidity. We plan the layout, select materials, and complete the installation as part of our interior services.",
  },
  {
    question: "Can you handle complete home interior work in Rameswaram?",
    answer:
      "Yes. We provide turnkey home interior services covering false ceiling, flooring, painting, modular kitchen, bathroom renovation, furniture coordination and electrical — entirely executed by our team from design to handover.",
  },
  {
    question: "Do you provide 3D interior design before execution?",
    answer:
      "Yes. We provide 3D design conceptualization so you can visualize the finished space before construction begins. This helps finalize materials, layout and finishes with confidence.",
  },
];

export default function Interiors() {
  return (
    <>
      <Seo
        title="Interior Design & Decoration Services in Rameswaram | Sree Raam Shethu Interiors"
        description="Interior design and execution in Rameswaram, Tamil Nadu — false ceiling, modular kitchen, bathroom renovation, flooring, painting, furniture and complete home interiors by Sree Raam Shethu Constructions & Interiors."
        canonical={`${SITE_URL}/interiors`}
        jsonLd={[
          breadcrumbSchema([{ name: "Home", path: "/" }, { name: "Interiors", path: "/interiors" }]),
          faqSchema(INTERIOR_FAQ),
        ]}
      />

      {/* Page Hero Header */}
      <section className="page-hero">
        <div className="container page-hero__inner">
          <Reveal>
            <div className="page-hero__eyebrow-wrap">
              <span className="page-hero__eyebrow-line" />
              <span className="eyebrow">Interior Design & Decoration</span>
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            {/*
             * H1 now contains service keyword + location.
             * Previous: "Interiors that feel like you." — no keyword, no location.
             */}
            <h1 className="display page-hero__title">
              Interior Design Services in{" "}
              <span className="accent">Rameswaram</span>
            </h1>
          </Reveal>
          <Reveal delay={0.18}>
            <p className="page-hero__desc">
              Turnkey home interiors — false ceiling, modular kitchen, bathroom renovation,
              flooring, painting, furniture and complete interior execution in Rameswaram,
              Tamil Nadu.
            </p>
          </Reveal>
        </div>
      </section>

      {/* Design Philosophy Manifesto & Offerings Grid */}
      <section className="section interior-philosophy-section">
        <div className="container">
          {/* Header Manifesto Block */}
          <div className="interior-manifesto">
            <Reveal className="interior-manifesto__left">
              <span className="interior-manifesto__tag">DESIGN PHILOSOPHY</span>
              <h2 className="display interior-manifesto__title">
                A room should <br />hold a life.
              </h2>
            </Reveal>

            <Reveal delay={0.12} className="interior-manifesto__right">
              <p className="interior-manifesto__desc">
                We design interiors that balance material, light and function. Every room is
                planned around how it will actually be lived in — then finished with considered detail
                and master craftsmanship.
              </p>
              <div className="interior-manifesto__badges">
                <span className="manifesto-badge">
                  <Sparkles size={14} className="badge-icon" /> Spatial Fluidity
                </span>
                <span className="manifesto-badge">
                  <Sparkles size={14} className="badge-icon" /> Coastal Durability
                </span>
                <span className="manifesto-badge">
                  <Sparkles size={14} className="badge-icon" /> Turnkey Precision
                </span>
              </div>
            </Reveal>
          </div>

          {/* 4 Architectural Offerings Cards */}
          <div className="interior-offerings__grid">
            {OFFERINGS.map((item, idx) => {
              const IconComp = item.icon;
              return (
                <Reveal key={item.num} delay={idx * 0.08}>
                  <div className="interior-offer-card">
                    <div className="interior-offer-card__head">
                      <span className="interior-offer-card__num">{item.num}</span>
                      <div className="interior-offer-card__icon-wrap">
                        <IconComp size={22} />
                      </div>
                    </div>
                    <h3 className="interior-offer-card__title">{item.title}</h3>
                    <p className="interior-offer-card__desc">{item.desc}</p>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* Infinite Horizontal Image Marquee */}
      <InteriorsSection />

      {/* FAQ Section — matches FAQPage schema in JSON-LD */}
      <section className="section" aria-labelledby="interiors-faq-heading">
        <div className="container">
          <Reveal>
            <span className="eyebrow">Common Questions</span>
            <h2 id="interiors-faq-heading" className="display" style={{ marginTop: "0.8rem", marginBottom: "2.5rem" }}>
              Interior Design — Frequently Asked Questions
            </h2>
          </Reveal>
          <div className="faq-list">
            {INTERIOR_FAQ.map((item, i) => (
              <Reveal key={i} delay={i * 0.05} className="faq-item">
                <h3 className="faq-item__q">{item.question}</h3>
                <p className="faq-item__a">{item.answer}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <CTA />
    </>
  );
}