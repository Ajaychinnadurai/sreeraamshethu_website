import Seo from "../components/Seo";
import Reveal from "../components/Reveal";
import ProcessSection from "../sections/ProcessSection";
import CTA from "../sections/CTA";
import { breadcrumbSchema, SITE_URL } from "../utils/seo";

const PRINCIPLES = [
  "One accountable project manager.",
  "Regular progress reports and site photos.",
  "Milestone-based payment schedules.",
  "Documented quality checks at every stage.",
];

export default function Process() {
  return (
    <>
      <Seo
        title="Our Construction Process | Sree Raam Shethu Constructions, Rameshwaram"
        description="A transparent six-stage construction process — discovery, planning, design, execution, finishing and handover — from Sree Raam Shethu Constructions & Interiors."
        canonical={`${SITE_URL}/process`}
        jsonLd={breadcrumbSchema([{ name: "Home", path: "/" }, { name: "Process", path: "/process" }])}
      />
      <section className="page-hero">
        <div className="container page-hero__inner">
          <Reveal><span className="eyebrow">Process</span></Reveal>
          <Reveal delay={0.1}>
            <h1 className="display page-hero__title">From first sketch to <span className="accent">final handover.</span></h1>
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