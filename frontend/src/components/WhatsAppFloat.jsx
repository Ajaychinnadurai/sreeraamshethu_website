import { useSiteConfig } from "../hooks/useSiteConfig";
import { MessageCircle } from "lucide-react";

/**
 * Floating WhatsApp CTA button.
 *
 * SEO & accessibility notes:
 * - aria-label is descriptive and includes the service + location context
 *   so screen readers and assistive tech know what this link does
 * - rel="noreferrer" on external link prevents referrer leakage
 * - The pre-filled WhatsApp message includes location for better lead quality
 */
export default function WhatsAppFloat() {
  const config = useSiteConfig();
  const number = config?.whatsapp || "919566615030";
  const msg =
    "Hello, I am interested in a construction or interior project in Rameswaram, Tamil Nadu. I would like to discuss my requirements and get a free estimate from Sree Raam Shethu Constructions & Interiors.";
  const href = `https://wa.me/${number.replace(/\D/g, "")}?text=${encodeURIComponent(msg)}`;

  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      className="whatsapp-float focus-ring"
      aria-label="Chat on WhatsApp with Sree Raam Shethu Constructions — Civil Contractor in Rameswaram"
      title="Chat on WhatsApp — Sree Raam Shethu Constructions & Interiors, Rameswaram"
    >
      <MessageCircle size={22} aria-hidden="true" />
    </a>
  );
}