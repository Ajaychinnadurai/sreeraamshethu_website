import { useSiteConfig } from "../hooks/useSiteConfig";
import { MessageCircle } from "lucide-react";

/**
 * Floating WhatsApp CTA. Uses configurable phone number from backend config.
 */
export default function WhatsAppFloat() {
  const config = useSiteConfig();
  const number = config?.whatsapp || "+919000000000";
  const msg =
    "Hello, I am interested in a construction/interior project in Rameshwaram. I would like to discuss my requirements.";
  const href = `https://wa.me/${number.replace(/\D/g, "")}?text=${encodeURIComponent(msg)}`;

  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      className="whatsapp-float focus-ring"
      aria-label="Chat on WhatsApp"
    >
      <MessageCircle size={22} aria-hidden="true" />
    </a>
  );
}