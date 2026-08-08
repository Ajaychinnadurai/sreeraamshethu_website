import { useCounter } from "../hooks/useCounter";

export default function Counter({ target, suffix = "", decimals = 0, className = "" }) {
  const { ref, value } = useCounter(target, { decimals });
  return (
    <span ref={ref} className={className}>
      {value}
      {suffix}
    </span>
  );
}