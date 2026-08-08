export const SITE_NAME = "Sree Raam Shethu Constructions & Interiors";
export const SITE_URL = "https://frontend-seven-jade-63.vercel.app";
export const LOCATION = "12/15c Thulasi Baba Madam Street, Near to Lakshmana Theertham, Rameswaram - 623526, Tamil Nadu, India.";

export function localBusinessSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: SITE_NAME,
    description:
      "Civil construction company, builders and interior designers in Rameswaram, Tamil Nadu offering residential, commercial, renovation and turnkey projects.",
    telephone: "+919566615030",
    email: "sreeraamconstruction@gmail.com",
    address: {
      "@type": "PostalAddress",
      streetAddress: "12/15c Thulasi Baba Madam Street, Near to Lakshmana Theertham",
      addressLocality: "Rameswaram",
      postalCode: "623526",
      addressRegion: "Tamil Nadu",
      addressCountry: "IN",
    },
    areaServed: ["Rameswaram", "Ramanathapuram", "Pamban", "Tamil Nadu"],
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
    telephone: "+919566615030",
    email: "sreeraamconstruction@gmail.com",
    address: {
      "@type": "PostalAddress",
      streetAddress: "12/15c Thulasi Baba Madam Street, Near to Lakshmana Theertham",
      addressLocality: "Rameswaram",
      postalCode: "623526",
      addressRegion: "Tamil Nadu",
      addressCountry: "IN",
    },
  };
}

export function serviceSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "Construction & Interior Services in Rameswaram",
    provider: { "@type": "Organization", name: SITE_NAME },
    areaServed: { "@type": "City", name: "Rameswaram" },
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
    name: "Construction & Interior Services, Rameswaram",
    description:
      "Residential, commercial, interior design, renovation and turnkey construction services in Rameswaram, Tamil Nadu.",
    brand: { "@type": "Brand", name: SITE_NAME },
  };
}