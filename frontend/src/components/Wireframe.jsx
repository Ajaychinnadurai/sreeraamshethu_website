import { useEffect, useRef } from "react";

/**
 * Lightweight interactive 3D-style architectural wireframe using CSS 3D
 * transforms (no WebGL) for performance and mobile fallback.
 * Rotates toward cursor.
 */
export default function Wireframe({ className = "" }) {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(pointer: coarse)").matches) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let raf;
    const target = { x: 0, y: 0 };
    const current = { x: -14, y: 16 };

    const onMove = (e) => {
      const rect = el.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      target.y = ((e.clientX - cx) / rect.width) * 24;
      target.x = -((e.clientY - cy) / rect.height) * 24;
    };

    const loop = () => {
      current.x += (target.x - current.x) * 0.05;
      current.y += (target.y - current.y) * 0.05;
      el.style.transform = `rotateX(${current.x}deg) rotateY(${current.y}deg)`;
      raf = requestAnimationFrame(loop);
    };

    window.addEventListener("mousemove", onMove);
    raf = requestAnimationFrame(loop);
    return () => {
      window.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div className="wire-ui" aria-hidden="true">
      <div className="wire-scene" ref={ref}>
        <svg viewBox="0 0 400 320" className="wire-svg">
          <g fill="none" stroke="#C6A56A" strokeWidth="1">
            <polygon points="80,240 200,150 320,240" />
            <polygon points="120,220 200,170 280,220" />
            <path d="M120 220 L120 260 L200 260 L200 220" />
            <path d="M280 220 L280 260 L200 260 L200 220" />
            <line x1="200" y1="150" x2="200" y2="260" />
            <line x1="120" y1="240" x2="120" y2="280" />
            <line x1="200" y1="260" x2="200" y2="300" />
            <line x1="280" y1="240" x2="280" y2="280" />
          </g>
          <g stroke="#3a3f41" strokeWidth="0.6">
            <line x1="0" y1="40" x2="400" y2="40" />
            <line x1="0" y1="80" x2="400" y2="80" />
            <line x1="0" y1="120" x2="400" y2="120" />
            <line x1="0" y1="160" x2="400" y2="160" />
            <line x1="0" y1="200" x2="400" y2="200" />
            <line x1="40" y1="0" x2="40" y2="320" />
            <line x1="80" y1="0" x2="80" y2="320" />
            <line x1="120" y1="0" x2="120" y2="320" />
            <line x1="160" y1="0" x2="160" y2="320" />
            <line x1="240" y1="0" x2="240" y2="320" />
            <line x1="280" y1="0" x2="280" y2="320" />
            <line x1="320" y1="0" x2="320" y2="320" />
            <line x1="360" y1="0" x2="360" y2="320" />
          </g>
        </svg>
      </div>
      <div className="wire-ui__dim" />
    </div>
  );
}