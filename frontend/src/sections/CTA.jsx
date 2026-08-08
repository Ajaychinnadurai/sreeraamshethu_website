import Reveal from "../components/Reveal";
import Button from "../components/Button";

export default function CTA() {
  return (
    <section className="cta">
      <div className="cta__grid" aria-hidden="true" />
      <div className="container cta__inner">
        <Reveal>
          <h2 className="display cta__title">
            Ready to build <span className="accent">your next space?</span>
          </h2>
        </Reveal>
        <Reveal delay={0.12}>
          <p className="cta__desc">
            Tell us what you're planning. We'll help turn the idea into a space built to last.
          </p>
        </Reveal>
        <Reveal delay={0.2} className="cta__actions">
          <Button to="/contact" className="cta__btn-primary">
            Start a Project
          </Button>
          <Button href="tel:+919566615030" variant="outline" className="cta__btn-secondary">
            Call Us
          </Button>
        </Reveal>
        <Reveal delay={0.28}>
          <span className="cta__loc">RAMESHWARAM · TAMIL NADU</span>
        </Reveal>
      </div>
    </section>
  );
}