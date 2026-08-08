import { useEffect, useRef, useState } from "react";

/**
 * Custom cursor with mix-blend for desktop only.
 * Respects reduced motion and touch devices.
 */
export default function CustomCursor({ active = true }) {
  const [pos, setPos] = useState({ x: -100, y: -100 });
  const [dot, setDot] = useState({ x: -100, y: -100 });
  const [hover, setHover] = useState(false);
  const posRef = useRef({ x: -100, y: -100 });

  useEffect(() => {
    if (!active) return;
    const fine = window.matchMedia("(pointer: fine)").matches;
    if (!fine) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let raf;
    const move = (e) => {
      posRef.current = { x: e.clientX, y: e.clientY };
      setPos(posRef.current);
    };
    const rafLoop = () => {
      setDot((p) => {
        const target = posRef.current;
        return {
          x: p.x + (target.x - p.x) * 0.2,
          y: p.y + (target.y - p.y) * 0.2,
        };
      });
      raf = requestAnimationFrame(rafLoop);
    };

    const onOver = (e) => {
      if (e.target.closest("a,button,[data-cursor]")) setHover(true);
    };
    const onOut = (e) => {
      if (e.target.closest("a,button,[data-cursor]")) setHover(false);
    };

    window.addEventListener("mousemove", move);
    document.addEventListener("mouseover", onOver);
    document.addEventListener("mouseout", onOut);
    raf = requestAnimationFrame(rafLoop);
    document.body.classList.add("has-custom-cursor");

    return () => {
      window.removeEventListener("mousemove", move);
      document.removeEventListener("mouseover", onOver);
      document.removeEventListener("mouseout", onOut);
      cancelAnimationFrame(raf);
      document.body.classList.remove("has-custom-cursor");
    };
  }, [active]);

  if (!active) return null;

  return (
    <>
      <div className="cursor-dot" style={{ transform: `translate3d(${dot.x}px, ${dot.y}px, 0)` }} />
      <div className={`cursor-ring ${hover ? "is-hover" : ""}`} style={{ transform: `translate3d(${pos.x}px, ${pos.y}px, 0)` }} />
    </>
  );
}