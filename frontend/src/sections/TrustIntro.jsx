import Reveal from "../components/Reveal";
import { Target, Eye, ShieldCheck, Award, Phone } from "lucide-react";

export default function TrustIntro() {
  return (
    <section className="section trust">
      <div className="container trust__container">
        {/* Eyebrow */}
        <Reveal className="trust__header">
          <span className="trust__eyebrow">ABOUT SREE RAAM SHETHU</span>
          <h2 className="trust__title">Civil Contracting &amp; Interior Decorators</h2>
          <p className="trust__subtitle">
            Led by <strong>S.M. Sethu Pandian B.E. (Civil)</strong>, we coordinate premium house builds, lodge constructions, commercial civil projects, and turnkey interior decoration across Rameswaram, Pamban, and nearby districts.
          </p>
        </Reveal>

        {/* 3 Pillars Cards Grid */}
        <div className="trust__pillars">
          <Reveal delay={0.1} className="trust-card">
            <div className="trust-card__icon-wrap">
              <Target className="trust-card__icon" size={24} />
            </div>
            <h3 className="trust-card__title">OUR MISSION</h3>
            <p className="trust-card__text">
              To deliver safe, modern, and legally compliant civil structures—including family houses and commercial tourist lodges—with careful engineering precision.
            </p>
          </Reveal>

          <Reveal delay={0.18} className="trust-card">
            <div className="trust-card__icon-wrap">
              <Eye className="trust-card__icon" size={24} />
            </div>
            <h3 className="trust-card__title">OUR VISION</h3>
            <p className="trust-card__text">
              To be the most trusted local civil contracting partner in Rameswaram, recognized for durable coastal materials and exceptional interior decoration.
            </p>
          </Reveal>

          <Reveal delay={0.26} className="trust-card">
            <div className="trust-card__icon-wrap">
              <ShieldCheck className="trust-card__icon" size={24} />
            </div>
            <h3 className="trust-card__title">CIVIL QUALITY POLICY</h3>
            <p className="trust-card__text">
              Utilizing premium anti-corrosive concrete mixes, solid load-bearing pillars, eco-friendly red clay tiles, and high-standard interior cabinetry.
            </p>
          </Reveal>
        </div>

        {/* Bottom Contact Banner Bar */}
        <Reveal delay={0.32} className="trust-banner">
          <div className="trust-banner__left">
            <div className="trust-banner__badge">
              <Award size={24} />
            </div>
            <div className="trust-banner__info">
              <h4 className="trust-banner__name">S.M. Sethu Pandian B.E. (Civil)</h4>
              <p className="trust-banner__sub">Managing Partner &amp; Civil Lead · Direct Consultation</p>
            </div>
          </div>
          <a href="tel:+919566615030" className="trust-banner__btn">
            <Phone size={16} /> CALL +91 95666 15030
          </a>
        </Reveal>
      </div>
    </section>
  );
}