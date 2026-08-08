import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const DEFAULT_DESCRIPTION =
  "Sree Raam Shethu Constructions & Interiors — builders, construction contractors and interior designers in Rameshwaram, Tamil Nadu. Residential, commercial, renovation and turnkey projects.";

function ensureMeta(attr, name, content) {
  const sel = `meta[${attr}="${name}"]`;
  let el = document.querySelector(sel);
  if (!el) {
    el = document.createElement("meta");
    el.setAttribute(attr, name);
    document.head.appendChild(el);
  }
  el.setAttribute("content", content);
}

export default function Seo({
  title,
  description = DEFAULT_DESCRIPTION,
  image,
  canonical,
  jsonLd,
  noindex = false,
}) {
  const location = useLocation();
  const url = canonical || `${window.location.origin}${location.pathname}`;
  const jsonLdKey = jsonLd ? JSON.stringify(jsonLd) : null;

  useEffect(() => {
    const t = title || "Sree Raam Shethu Constructions & Interiors | Builders & Interior Designers in Rameshwaram";
    document.title = t;
    ensureMeta("name", "description", description);
    ensureMeta("property", "og:title", t);
    ensureMeta("property", "og:description", description);
    ensureMeta("property", "og:url", url);
    ensureMeta("property", "og:type", "website");
    ensureMeta("property", "og:image", image || `${window.location.origin}/favicon.svg`);
    ensureMeta("name", "twitter:card", "summary_large_image");
    ensureMeta("name", "twitter:title", t);
    ensureMeta("name", "twitter:description", description);

    let canonicalEl = document.querySelector('link[rel="canonical"]');
    if (!canonicalEl) {
      canonicalEl = document.createElement("link");
      canonicalEl.setAttribute("rel", "canonical");
      document.head.appendChild(canonicalEl);
    }
    canonicalEl.setAttribute("href", url);

    if (noindex) ensureMeta("name", "robots", "noindex, nofollow");
    else document.querySelectorAll('meta[name="robots"]').forEach((el) => el.remove());

    const existing = document.getElementById("jsonld-root");
    if (existing) existing.remove();
    if (jsonLdKey) {
      const script = document.createElement("script");
      script.type = "application/ld+json";
      script.id = "jsonld-root";
      script.textContent = jsonLdKey;
      document.head.appendChild(script);
    }
  }, [title, description, image, url, jsonLdKey, noindex]);

  return null;
}