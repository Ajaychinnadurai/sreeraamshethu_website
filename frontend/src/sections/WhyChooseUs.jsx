import SectionHeading from "../components/SectionHeading";
import Reveal from "../components/Reveal";

const FEATURES = [
  { name: "Precision", desc: "Attention to detail at every stage." },
  { name: "Transparency", desc: "Clear communication and project visibility." },
  { name: "Quality", desc: "Reliable materials and professional execution." },
  { name: "Craftsmanship", desc: "Design and construction with attention to detail." },
  { name: "Local Expertise", desc: "Understanding Tamil Nadu's environment, materials and needs." },
  { name: "Client-First", desc: "Your vision remains at the centre of every decision." },
];

export default function WhyChooseUs() {
  return (
    <section className="section why">
      <div className="container why__grid">
        <SectionHeading eyebrow="Why choose us" title="Engineering that earns trust" />
        <div className="why__list">
          {FEATURES.map((f, i) => (
            <Reveal key={f.name} delay={i * 0.05} className="why__item">
              <span className="why__item-idx">0{i + 1}</span>
              <div>
                <h3>{f.name}</h3>
                <p className="muted">{f.desc}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}