import { LayoutGrid, Layers, Armchair, Key, Sparkles } from "lucide-react";
import Seo from "../components/Seo";
import Reveal from "../components/Reveal";
import InteriorsSection from "../sections/InteriorsSection";
import CTA from "../sections/CTA";
import { breadcrumbSchema, SITE_URL } from "../utils/seo";

const OFFERINGS = [
  {
    num: "01",
    icon: LayoutGrid,
    title: "Spatial Planning",
    desc: "Light, flow and layout as the starting point of every interior. We balance volume, proportion, and functional zones.",
  },
  {
    num: "02",
    icon: Layers,
    title: "Material Selection",
    desc: "Stone, timber, metal and textiles chosen specifically to endure coastal humidity while exuding natural luxury.",
  },
  {
    num: "03",
    icon: Armchair,
    title: "Furniture & Lighting",
    desc: "Curated bespoke furniture, custom acoustic paneling, and layered architectural lighting that shape the room's mood.",
  },
  {
    num: "04",
    icon: Key,
    title: "Turnkey Finishing",
    desc: "Complete interior execution — from 3D conceptualization to final structural finishing and styling — carried out by our team.",
  },
];

export default function Interiors() {
  return (
    <>
      <Seo
        title="Interior Design Company in Rameshwaram | Sree Raam Shethu Interiors"
        description="Interior designers in Rameshwaram for living rooms, bedrooms, kitchens and offices. Contemporary home and luxury interiors by Sree Raam Shethu Constructions & Interiors."
        canonical={`${SITE_URL}/interiors`}
        jsonLd={breadcrumbSchema([{ name: "Home", path: "/" }, { name: "Interiors", path: "/interiors" }])}
      />

      {/* Page Hero Header */}
      <section className="page-hero">
        <div className="container page-hero__inner">
          <Reveal>
            <div className="page-hero__eyebrow-wrap">
              <span className="page-hero__eyebrow-line" />
              <span className="eyebrow">INTERIOR ARCHITECTURE</span>
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <h1 className="display page-hero__title">
              Interiors that <span className="accent">feel like you.</span>
            </h1>
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
      
      {/* Bottom CTA */}
      <CTA />
    </>
  );
}