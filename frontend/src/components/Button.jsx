import { Link } from "react-router-dom";
import { useMagnetic } from "../hooks/useMagnetic";

/**
 * Premium button with variant support. Renders Link or button.
 */
export default function Button({
  children,
  to,
  href,
  onClick,
  variant = "solid",
  type = "button",
  className = "",
}) {
  const { ref, style, onMove, onLeave } = useMagnetic({ strength: 0.18 });
  const classes = [
    "btn",
    `btn--${variant}`,
    "focus-ring",
    className,
  ].join(" ");

  const content = (
    <span className="btn__inner">
      <span>{children}</span>
    </span>
  );

  const props = {
    className: classes,
    style,
    onMouseMove: onMove,
    onMouseLeave: onLeave,
  };

  if (to) {
    return (
      <Link to={to} {...props}>
        {content}
      </Link>
    );
  }
  if (href) {
    return (
      <a href={href} target={href.startsWith("http") ? "_blank" : undefined} rel="noreferrer" {...props}>
        {content}
      </a>
    );
  }
  return (
    <button type={type} onClick={onClick} {...props}>
      {content}
    </button>
  );
}