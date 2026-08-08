import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import Reveal from "../components/Reveal";

export const PROCESS_STEPS = [
  {
    num: "01",
    phase: "PHASE 01",
    title: "Discovery",
    desc: "Understanding your requirements, budget and vision.",
    detail: "Site Evaluation · Vision Alignment · Budgeting",
  },
  {
    num: "02",
    phase: "PHASE 02",
    title: "Planning",
    desc: "Developing concepts, layouts and execution plans.",
    detail: "Spatial Layouts · Feasibility · Timeline Mapping",
  },
  {
    num: "03",
    phase: "PHASE 03",
    title: "Design",
    desc: "Architecture, interiors, materials and visual direction.",
    detail: "3D Rendering · Material Palette · Structural Blueprints",
  },
  {
    num: "04",
    phase: "PHASE 04",
    title: "Execution",
    desc: "Construction and project management.",
    detail: "On-site Construction · Quality Control · Safety Audits",
  },
  {
    num: "05",
    phase: "PHASE 05",
    title: "Finishing",
    desc: "Quality checks, detailing and final finishing.",
    detail: "Bespoke Joinery · Surface Detailing · Lighting Setup",
  },
  {
    num: "06",
    phase: "PHASE 06",
    title: "Handover",
    desc: "Delivering your completed space.",
    detail: "Final Walkthrough · Key Handover · Post-occupancy Care",
  },
];

export function ProcessHeader() {
  return (
    <div className="process__header">
      <div className="process__meta-row">
        <div className="process__eyebrow-wrap">
          <span className="process__eyebrow-line" />
          <span className="process__eyebrow">HOW WE WORK</span>
        </div>
        <span className="process__tech-tag">ARCHITECTURAL WORKFLOW // SCALE 1:50</span>
      </div>
      <h2 className="process__title">Our process</h2>
      <div className="process__header-divider" />
    </div>
  );
}

export function ProcessProgress({ progressPercent = 0, isMobile = false }) {
  return (
    <div className={`process__progress-bar ${isMobile ? "is-mobile" : "is-desktop"}`}>
      <div className="process__progress-track" />
      <div
        className="process__progress-fill"
        style={
          isMobile
            ? { height: `${Math.min(100, Math.max(0, progressPercent))}%` }
            : { width: `${Math.min(100, Math.max(0, progressPercent))}%` }
        }
      />
    </div>
  );
}

export function ProcessStep({
  step,
  index,
  isActive,
  onActivate,
  isMobile = false,
  registerRef,
}) {
  return (
    <div
      ref={(el) => registerRef && registerRef(el, index)}
      data-index={index}
      tabIndex={0}
      role="button"
      aria-pressed={isActive}
      onClick={() => onActivate(index)}
      onMouseEnter={() => !isMobile && onActivate(index)}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onActivate(index);
        }
      }}
      className={`process-step ${isActive ? "is-active" : "is-inactive"} ${
        isMobile ? "process-step--mobile" : ""
      }`}
    >
      <div className="process-step__dot-wrap">
        <span className="process-step__ring" />
        <span className="process-step__dot" />
      </div>

      <div className="process-step__card">
        <div className="process-step__num-row">
          <span className="process-step__num">{step.num}</span>
          <span className="process-step__accent-line" />
          <span className="process-step__phase-tag">{step.phase}</span>
        </div>

        <h3 className="process-step__title">{step.title}</h3>
        <p className="process-step__desc">{step.desc}</p>

        <div className="process-step__detail-tag">
          <span>{step.detail}</span>
        </div>
      </div>
    </div>
  );
}

export function ProcessTimeline({
  steps = PROCESS_STEPS,
  activeIdx,
  onSelectStep,
  progressPercent,
  registerRef,
}) {
  return (
    <div className="process__timeline-wrapper">
      {/* Desktop Horizontal Connected Timeline */}
      <div className="process__timeline-desktop">
        <ProcessProgress progressPercent={progressPercent} isMobile={false} />
        <div className="process__timeline-grid">
          {steps.map((step, idx) => (
            <ProcessStep
              key={step.num}
              step={step}
              index={idx}
              isActive={idx === activeIdx}
              onActivate={onSelectStep}
              isMobile={false}
            />
          ))}
        </div>
      </div>

      {/* Mobile Vertical Connected Timeline */}
      <div className="process__timeline-mobile">
        <ProcessProgress progressPercent={progressPercent} isMobile={true} />
        <div className="process__timeline-vertical-list">
          {steps.map((step, idx) => (
            <ProcessStep
              key={`m-${step.num}`}
              step={step}
              index={idx}
              isActive={idx === activeIdx}
              onActivate={onSelectStep}
              isMobile={true}
              registerRef={registerRef}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export function ProcessCTA() {
  return (
    <div className="process__cta-wrap">
      <Link to="/process" className="process__cta-btn">
        <span>SEE THE FULL PROCESS</span>
        <svg
          className="process__cta-arrow"
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <line x1="5" y1="12" x2="19" y2="12" />
          <polyline points="12 5 19 12 12 19" />
        </svg>
      </Link>
    </div>
  );
}

export default function ProcessSection() {
  const [activeIdx, setActiveIdx] = useState(0);
  const [progressPercent, setProgressPercent] = useState(0);
  const sectionRef = useRef(null);
  const mobileStepRefs = useRef([]);

  const registerMobileRef = (el, index) => {
    if (el) mobileStepRefs.current[index] = el;
  };

  // Mobile Viewport Scroll Trigger Observer
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const idx = Number(entry.target.getAttribute("data-index"));
            if (!isNaN(idx)) {
              setActiveIdx(idx);
              setProgressPercent(((idx + 1) / 6) * 100);
            }
          }
        });
      },
      {
        root: null,
        rootMargin: "-25% 0px -40% 0px", // Triggers as step enters middle focus zone on mobile
        threshold: 0.2,
      }
    );

    mobileStepRefs.current.forEach((el) => {
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  // Desktop Viewport Overall Scroll Progress
  useEffect(() => {
    const handleScroll = () => {
      if (window.innerWidth <= 980 || !sectionRef.current) return;
      const rect = sectionRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;

      if (rect.top <= windowHeight && rect.bottom >= 0) {
        const totalHeight = rect.height;
        const currentScroll = windowHeight - rect.top;
        const ratio = Math.max(0, Math.min(1, currentScroll / (totalHeight + windowHeight * 0.3)));
        const pct = ratio * 100;
        setProgressPercent(pct);
        const step = Math.min(5, Math.floor(ratio * 6));
        setActiveIdx(step);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleSelectStep = (index) => {
    setActiveIdx(index);
    setProgressPercent(((index + 1) / 6) * 100);
  };

  return (
    <section className="section process-section" ref={sectionRef}>
      {/* Subtle Architectural Blueprint Background Pattern */}
      <div className="process__blueprint-bg" aria-hidden="true">
        <div className="process__grid-pattern" />
        <div className="process__marker marker-tl">+ 01</div>
        <div className="process__marker marker-tr">+ 06</div>
        <div className="process__marker marker-bl">ARCHITECTURAL TIMELINE</div>
        <div className="process__marker marker-br">SREE RAAM SHETHU</div>
        <div className="process__tech-line line-h" />
        <div className="process__tech-line line-v" />
      </div>

      <div className="container process__container">
        <Reveal delay={0.05}>
          <ProcessHeader />
        </Reveal>

        <Reveal delay={0.15}>
          <ProcessTimeline
            steps={PROCESS_STEPS}
            activeIdx={activeIdx}
            onSelectStep={handleSelectStep}
            progressPercent={progressPercent}
            registerRef={registerMobileRef}
          />
        </Reveal>

        <Reveal delay={0.25}>
          <ProcessCTA />
        </Reveal>
      </div>
    </section>
  );
}