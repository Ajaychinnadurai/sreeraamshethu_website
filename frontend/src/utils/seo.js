export const SITE_NAME = "Sree Raam Shethu Constructions & Interiors";
export const SITE_URL = "https://www.sreeraamshethu.com";
export const LOCATION = "Rameshwaram, Tamil Nadu, India";

export function localBusinessSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: SITE_NAME,
    description:
      "Construction company, builders and interior designers in Rameshwaram, Tamil Nadu offering residential, commercial, renovation and turnkey projects.",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Rameshwaram",
      addressRegion: "Tamil Nadu",
      addressCountry: "IN",
    },
    areaServed: ["Rameshwaram", "Ramanathapuram", "Tamil Nadu"],
    url: SITE_URL,
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Construction & Interior Services",
      itemListElement: [
        { "@type": "Offer", itemOffered: { "@type": "Service", name: "Residential Construction" } },
        { "@type": "Offer", itemOffered: { "@type": "Service", name: "Commercial Construction" } },
        { "@type": "Offer", itemOffered: { "@type": "Service", name: "Interior Design" } },
        { "@type": "Offer", itemOffered: { "@type": "Service", name: "Turnkey Projects" } },
        { "@type": "Offer", itemOffered: { "@type": "Service", name: "Renovation" } },
        { "@type": "Offer", itemOffered: { "@type": "Service", name: "Architectural Solutions" } },
      ],
    },
  };
}

export function organizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: SITE_NAME,
    url: SITE_URL,
    address: { "@type": "PostalAddress", addressLocality: "Rameshwaram", addressRegion: "Tamil Nadu", addressCountry: "IN" },
  };
}

export function serviceSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "Construction & Interior Services in Rameshwaram",
    provider: { "@type": "Organization", name: SITE_NAME },
    areaServed: { "@type": "City", name: "Rameshwaram" },
    serviceType: [
      "Construction",
      "Interior Design",
      "Renovation",
      "Turnkey Projects",
      "Architecture",
    ],
  };
}

export function breadcrumbSchema(items) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((it, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: it.name,
      item: `${SITE_URL}${it.path}`,
    })),
  };
}

export function productSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Product",
    name: "Construction & Interior Services, Rameshwaram",
    description:
      "Residential, commercial, interior design, renovation and turnkey construction services in Rameshwaram, Tamil Nadu.",
    brand: { "@type": "Brand", name: SITE_NAME },
  };
}