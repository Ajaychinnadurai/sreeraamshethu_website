import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const DEFAULT_TITLE =
  "Civil Contractor & Interior Designer in Rameswaram | Sree Raam Shethu Constructions";

const DEFAULT_DESCRIPTION =
  "Sree Raam Shethu Constructions & Interiors — trusted civil construction company and interior designers in Rameswaram, Tamil Nadu. House construction, building repair, renovation, waterproofing, interior design and turnkey projects. Call +91 95666 15030.";

/**
 * Ensures a <meta> element exists with the given attribute/name and sets its content.
 * Creates the element and appends to <head> if not found.
 */
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

/**
 * Seo component — manages all per-page SEO tags:
 *   - document.title
 *   - meta description
 *   - Open Graph (og:title, og:description, og:url, og:type, og:image, og:locale)
 *   - Twitter card
 *   - canonical link
 *   - robots (noindex when required)
 *   - JSON-LD structured data (supports single schema object OR array of schemas)
 *
 * @param {string}        title       - Page title (50–65 chars recommended)
 * @param {string}        description - Meta description (120–158 chars recommended)
 * @param {string}        image       - Absolute URL for og:image
 * @param {string}        canonical   - Canonical URL (falls back to current URL)
 * @param {object|array}  jsonLd      - Structured data — single schema or array
 * @param {boolean}       noindex     - Set true to add robots noindex,nofollow
 */
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

  // Stable key for jsonLd to prevent unnecessary effect re-runs
  const jsonLdKey = jsonLd ? JSON.stringify(jsonLd) : null;

  useEffect(() => {
    const t = title || DEFAULT_TITLE;
    const ogImage = image || `${window.location.origin}/logo.png`;

    // Title
    document.title = t;

    // Meta description
    ensureMeta("name", "description", description);

    // Open Graph
    ensureMeta("property", "og:title", t);
    ensureMeta("property", "og:description", description);
    ensureMeta("property", "og:url", url);
    ensureMeta("property", "og:type", "website");
    ensureMeta("property", "og:image", ogImage);
    ensureMeta("property", "og:image:width", "1200");
    ensureMeta("property", "og:image:height", "630");

    // Twitter card
    ensureMeta("name", "twitter:card", "summary_large_image");
    ensureMeta("name", "twitter:title", t);
    ensureMeta("name", "twitter:description", description);
    ensureMeta("name", "twitter:image", ogImage);

    // Canonical link
    let canonicalEl = document.querySelector('link[rel="canonical"]');
    if (!canonicalEl) {
      canonicalEl = document.createElement("link");
      canonicalEl.setAttribute("rel", "canonical");
      document.head.appendChild(canonicalEl);
    }
    canonicalEl.setAttribute("href", url);

    // Robots — noindex pages get noindex,nofollow; otherwise remove any existing robots meta
    if (noindex) {
      ensureMeta("name", "robots", "noindex, nofollow");
    } else {
      document.querySelectorAll('meta[name="robots"]').forEach((el) => el.remove());
    }

    // JSON-LD structured data
    // Remove existing injected JSON-LD scripts
    document.querySelectorAll('script[data-sr-jsonld]').forEach((el) => el.remove());

    if (jsonLdKey) {
      const schemas = Array.isArray(jsonLd) ? jsonLd : [jsonLd];
      schemas.forEach((schema, i) => {
        const script = document.createElement("script");
        script.type = "application/ld+json";
        script.setAttribute("data-sr-jsonld", String(i));
        script.textContent = JSON.stringify(schema);
        document.head.appendChild(script);
      });
    }
  }, [title, description, image, url, jsonLdKey, noindex]);

  return null;
}