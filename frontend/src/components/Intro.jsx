import { useEffect, useState } from "react";

const RUN = 2400;
const FADE = 600;

export default function Intro({ onDone }) {
  const [stage, setStage] = useState("run");

  useEffect(() => {
    const reduce =
      window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) {
      setStage("gone");
      onDone?.();
      return;
    }
    const t1 = setTimeout(() => setStage("fade"), RUN);
    const t2 = setTimeout(() => {
      setStage("gone");
      onDone?.();
    }, RUN + FADE);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, [onDone]);

  if (stage === "gone") return null;

  return (
    <div
      className={`intro-overlay ${stage === "fade" ? "intro-overlay--fade" : ""}`}
      role="status"
      aria-label="Sree Raam Shethu Logo Reveal"
    >
      <div className="intro-reveal__grid" aria-hidden="true" />
      <div className="intro-reveal__content">
        {/* Animated Brand Logo Container */}
        <div className="intro-reveal__logo-wrap">
          <img
            src="/logo.png"
            alt="Sree Raam Shethu Logo"
            className="intro-reveal__logo"
          />
        </div>

        {/* Brand Name & Subtitle Reveal */}
        <div className="intro-reveal__text">
          <h1 className="intro-reveal__name">SREE RAAM SHETHU</h1>
          <div className="intro-reveal__sub-wrap">
            <span className="intro-reveal__line" />
            <span className="intro-reveal__sub">CONSTRUCTIONS &amp; INTERIORS</span>
            <span className="intro-reveal__line" />
          </div>
        </div>

        {/* Gold Architectural Progress Line */}
        <div className="intro-reveal__progress">
          <div className="intro-reveal__bar" />
        </div>
      </div>
    </div>
  );
}