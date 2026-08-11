import Seo from "../components/Seo";
import Reveal from "../components/Reveal";
import ProcessSection from "../sections/ProcessSection";
import CTA from "../sections/CTA";
import { breadcrumbSchema, howToSchema, SITE_URL } from "../utils/seo";

const PRINCIPLES = [
  "One accountable project manager for your build.",
  "Regular progress reports, site photos and milestone updates.",
  "Milestone-based payment schedules — transparent and agreed upfront.",
  "Documented quality checks at every construction stage.",
];

const PROCESS_STEPS = [
  { name: "Discovery & Consultation", description: "Free site visit and initial consultation to understand your requirements, plot conditions, budget and timeline. We assess the site, local regulations and feasibility before providing an estimate." },
  { name: "Detailed Planning & Design", description: "Working drawings, structural design, floor plans and material specifications are prepared. For interior projects, 3D design concepts are created for visualization and approval." },
  { name: "Material Selection & Procurement", description: "We source quality materials — anti-corrosive concrete mix, coastal-grade steel, tiles, joinery and finishes — from trusted suppliers at competitive rates." },
  { name: "Civil Construction & Execution", description: "Foundation, RCC structure, masonry, plastering, roofing and civil works are executed by our experienced team with documented quality checks at each milestone." },
  { name: "Interior & Finishing Works", description: "Flooring, tiling, painting, false ceiling, modular kitchen, bathroom renovation, electrical, plumbing and all finishing works are completed to agreed specifications." },
  { name: "Handover & Post-completion Support", description: "Final inspection, walkthrough, snagging and formal handover. We provide post-completion support for any rectification or maintenance needs." },
];

export default function Process() {
  return (
    <>
      <Seo
        title="Our Construction Process in Rameswaram | Sree Raam Shethu Constructions"
        description="A transparent six-stage construction process — discovery, planning, design, execution, finishing and handover — followed by Sree Raam Shethu Constructions & Interiors for every residential and commercial project in Rameswaram, Tamil Nadu."
        canonical={`${SITE_URL}/process`}
        jsonLd={[
          breadcrumbSchema([{ name: "Home", path: "/" }, { name: "Process", path: "/process" }]),
          howToSchema(PROCESS_STEPS),
        ]}
      />
      <section className="page-hero">
        <div className="container page-hero__inner">
          <Reveal><span className="eyebrow">How We Work</span></Reveal>
          <Reveal delay={0.1}>
            {/*
             * H1 now contains "construction process" + location.
             * Previous: "From first sketch to final handover." — no keyword signal.
             */}
            <h1 className="display page-hero__title">
              Our Construction Process in{" "}
              <span className="accent">Rameswaram</span>
            </h1>
          </Reveal>
          <Reveal delay={0.18}>
            <p className="page-hero__desc">
              A six-stage process from first consultation to final handover — transparent,
              milestone-based and fully accountable.
            </p>
          </Reveal>
        </div>
      </section>

      <ProcessSection />

      <section className="section">
        <div className="container principles">
          <Reveal className="principles__title">
            <h2 className="display">How we keep it <span className="accent">predictable.</span></h2>
          </Reveal>
          <ul className="principles__list">
            {PRINCIPLES.map((p, i) => (
              <Reveal key={p} delay={i * 0.06} as="li">
                <span className="principles__idx">0{i + 1}</span>
                <span>{p}</span>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      <CTA />
    </>
  );
}