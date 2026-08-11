import Seo from "../components/Seo";
import Reveal from "../components/Reveal";
import SectionHeading from "../components/SectionHeading";
import Counter from "../components/Counter";
import TrustIntro from "../sections/TrustIntro";
import CTA from "../sections/CTA";
import { localBusinessSchema, breadcrumbSchema, organizationSchema, personSchema, SITE_URL } from "../utils/seo";

const VALUES = [
  "Integrity in every contract.",
  "Engineering before aesthetics.",
  "Transparency from day one.",
  "Craftsmanship in every joint.",
];

export default function About() {
  return (
    <>
      <Seo
        title="About Sree Raam Shethu Constructions & Interiors | Civil Contractor in Rameswaram"
        description="Sree Raam Shethu Constructions & Interiors is a civil construction company in Rameswaram, Tamil Nadu led by S.M. Sethu Pandian B.E. (Civil). Residential construction, commercial construction, renovation and turnkey interior projects."
        canonical={`${SITE_URL}/about`}
        jsonLd={[
          breadcrumbSchema([{ name: "Home", path: "/" }, { name: "About", path: "/about" }]),
          organizationSchema(),
          personSchema(),
        ]}
      />
      <section className="page-hero">
        <div className="container page-hero__inner">
          <Reveal><span className="eyebrow">About Us</span></Reveal>
          <Reveal delay={0.1}>
            {/*
             * H1 now includes "Civil Construction Company" + location.
             * Previous H1 had no service keyword.
             */}
            <h1 className="display page-hero__title">
              Civil Construction in Rameswaram,{" "}
              <span className="accent">built for generations.</span>
            </h1>
          </Reveal>
          <Reveal delay={0.18}>
            <p className="page-hero__desc">
              Sree Raam Shethu Constructions &amp; Interiors — a civil engineering
              and interior company rooted in Rameswaram, delivering quality construction
              across Ramanathapuram district, Tamil Nadu.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="section">
        <div className="container about__story">
          <div className="about__lead">
            <Reveal>
              <h2 className="display">Engineering + character, under one roof.</h2>
            </Reveal>
          </div>
          <div className="about__body">
            <Reveal delay={0.1}>
              <p>
                Sree Raam Shethu Constructions &amp; Interiors brings together structural
                engineering, architecture coordination and refined interior design. Based in
                Rameshwaram, we serve residential, commercial and renovation clients across
                Tamil Nadu.
              </p>
              <p className="muted">
                We treat buildings as systems — where structure, service and finish work
                together so a space performs as beautifully as it looks, and lasts.
              </p>
            </Reveal>
          </div>
        </div>
        <div className="container about__values">
          {VALUES.map((v, i) => (
            <Reveal key={v} delay={i * 0.06} className="about__value">
              <span className="about__value-idx">0{i + 1}</span>
              <p>{v}</p>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="section band band--light">
        <div className="container band__grid">
          <h2 className="display">Numbers that mean trust</h2>
          <div className="band__stats">
            {[
              { v: 10, s: "+", l: "Years" },
              { v: 50, s: "+", l: "Projects" },
              { v: 100, s: "%", l: "Client focus" },
            ].map((x) => (
              <div key={x.l} className="band__stat">
                <div className="band__num">
                  <Counter target={x.v} suffix={x.s} />
                </div>
                <div className="band__label">{x.l}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <TrustIntro />
      <CTA />
    </>
  );
}