import { useEffect, useRef, useState } from "react";

export default function Reveal({
  children,
  delay = 0,
  y = 40,
  className = "",
  as = "div",
  once = true,
}) {
  const Tag = as;
  const ref = useRef(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (typeof IntersectionObserver === "undefined") {
      setShown(true);
      return;
    }
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShown(true);
          if (once) io.disconnect();
        } else if (!once) {
          setShown(false);
        }
      },
      { threshold: 0.12, rootMargin: "-32px 0px 0px 0px" }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [once]);

  const reduce =
    typeof window !== "undefined" &&
    window.matchMedia &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  const base = shown
    ? { opacity: 1, transform: "translateY(0px)" }
    : { opacity: 0, transform: `translateY(${y}px)` };

  return (
    <Tag
      ref={ref}
      className={className}
      style={{
        ...base,
        transition: reduce
          ? "none"
          : `opacity 0.9s cubic-bezier(0.16, 1, 0.3, 1) ${delay}s, transform 0.9s cubic-bezier(0.16, 1, 0.3, 1) ${delay}s`,
        willChange: "opacity, transform",
      }}
    >
      {children}
    </Tag>
  );
}