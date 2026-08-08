import { useRef, useState } from "react";

/**
 * Magnetic effect that pulls an element toward the cursor.
 * Returns props to spread onto the element.
 */
export function useMagnetic({ strength = 0.3 } = {}) {
  const ref = useRef(null);
  const [transform, setTransform] = useState("translate(0px, 0px)");

  const onMove = (e) => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const rect = el.getBoundingClientRect();
    const relX = e.clientX - (rect.left + rect.width / 2);
    const relY = e.clientY - (rect.top + rect.height / 2);
    setTransform(`translate(${relX * strength}px, ${relY * strength}px)`);
  };

  const onLeave = () => setTransform("translate(0px, 0px)");

  return { ref, style: { transform }, onMove, onLeave };
}