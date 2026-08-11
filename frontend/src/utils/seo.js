// ============================================================
// SEO Utilities — Sree Raam Shethu Constructions & Interiors
// Rameswaram, Ramanathapuram District, Tamil Nadu, India
// ============================================================

export const SITE_NAME = "Sree Raam Shethu Constructions & Interiors";
export const SITE_URL = "https://sreeraamshethu.com";
export const PHONE = "+919566615030";
export const EMAIL = "sreeraamconstruction@gmail.com";
export const WHATSAPP = "919566615030";
export const LOCATION = "12/15c Thulasi Baba Madam Street, Near to Lakshmana Theertham, Rameswaram - 623526, Tamil Nadu, India.";

// All areas legitimately served by the business
export const AREA_SERVED = [
  "Rameswaram",
  "Rameshwaram",
  "Ramanathapuram",
  "Pamban",
  "Mandapam",
  "Thiruvadanai",
  "Arichalmunai",
  "Tamil Nadu",
];

// ──────────────────────────────────────────────────────────
// LocalBusiness Schema — core schema for local SEO
// ──────────────────────────────────────────────────────────
export function localBusinessSchema() {
  return {
    "@context": "https://schema.org",
    "@type": ["LocalBusiness", "HomeAndConstructionBusiness"],
    "@id": `${SITE_URL}/#localbusiness`,
    name: SITE_NAME,
    alternateName: "Sree Raam Shethu Constructions",
    description:
      "Civil construction company, builders and interior designers in Rameswaram, Tamil Nadu offering residential construction, commercial construction, building repair, renovation, waterproofing, RCC works, interior design, modular kitchen, and turnkey projects.",
    telephone: PHONE,
    email: EMAIL,
    url: SITE_URL,
    logo: `${SITE_URL}/logo.png`,
    image: `${SITE_URL}/logo.png`,
    priceRange: "₹₹–₹₹₹",
    currenciesAccepted: "INR",
    paymentAccepted: "Cash, Bank Transfer, UPI",
    address: {
      "@type": "PostalAddress",
      streetAddress: "12/15c Thulasi Baba Madam Street, Near to Lakshmana Theertham",
      addressLocality: "Rameswaram",
      addressRegion: "Tamil Nadu",
      postalCode: "623526",
      addressCountry: "IN",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: 9.288,
      longitude: 79.3,
    },
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
        opens: "09:00",
        closes: "19:00",
      },
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: "Sunday",
        opens: "00:00",
        closes: "00:00",
        description: "By appointment only",
      },
    ],
    areaServed: AREA_SERVED.map((area) => ({ "@type": "City", name: area })),
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Civil Construction & Interior Services",
      itemListElement: [
        { "@type": "Offer", itemOffered: { "@type": "Service", name: "Residential House Construction", areaServed: "Rameswaram, Tamil Nadu" } },
        { "@type": "Offer", itemOffered: { "@type": "Service", name: "Commercial Construction", areaServed: "Rameswaram, Tamil Nadu" } },
        { "@type": "Offer", itemOffered: { "@type": "Service", name: "Building Repair & Renovation", areaServed: "Rameswaram, Tamil Nadu" } },
        { "@type": "Offer", itemOffered: { "@type": "Service", name: "Waterproofing", areaServed: "Rameswaram, Tamil Nadu" } },
        { "@type": "Offer", itemOffered: { "@type": "Service", name: "Interior Design & Execution", areaServed: "Rameswaram, Tamil Nadu" } },
        { "@type": "Offer", itemOffered: { "@type": "Service", name: "Modular Kitchen", areaServed: "Rameswaram, Tamil Nadu" } },
        { "@type": "Offer", itemOffered: { "@type": "Service", name: "Turnkey Construction Projects", areaServed: "Rameswaram, Tamil Nadu" } },
        { "@type": "Offer", itemOffered: { "@type": "Service", name: "RCC & Concrete Works", areaServed: "Rameswaram, Tamil Nadu" } },
        { "@type": "Offer", itemOffered: { "@type": "Service", name: "Roofing & Terrace Works", areaServed: "Rameswaram, Tamil Nadu" } },
        { "@type": "Offer", itemOffered: { "@type": "Service", name: "Flooring & Tiling", areaServed: "Rameswaram, Tamil Nadu" } },
      ],
    },
    sameAs: [
      `https://wa.me/${WHATSAPP}`,
    ],
  };
}

// ──────────────────────────────────────────────────────────
// Organization Schema
// ──────────────────────────────────────────────────────────
export function organizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": `${SITE_URL}/#organization`,
    name: SITE_NAME,
    url: SITE_URL,
    logo: {
      "@type": "ImageObject",
      url: `${SITE_URL}/logo.png`,
      width: 200,
      height: 200,
    },
    telephone: PHONE,
    email: EMAIL,
    address: {
      "@type": "PostalAddress",
      streetAddress: "12/15c Thulasi Baba Madam Street, Near to Lakshmana Theertham",
      addressLocality: "Rameswaram",
      addressRegion: "Tamil Nadu",
      postalCode: "623526",
      addressCountry: "IN",
    },
    founder: {
      "@type": "Person",
      name: "S.M. Sethu Pandian",
      jobTitle: "Managing Partner & Civil Engineer",
      hasCredential: {
        "@type": "EducationalOccupationalCredential",
        credentialCategory: "degree",
        name: "B.E. Civil Engineering",
      },
    },
    areaServed: AREA_SERVED,
  };
}

// ──────────────────────────────────────────────────────────
// WebSite Schema — enables sitelinks search in Google SERP
// ──────────────────────────────────────────────────────────
export function websiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${SITE_URL}/#website`,
    url: SITE_URL,
    name: SITE_NAME,
    description:
      "Civil construction company and interior designers in Rameswaram, Tamil Nadu.",
    publisher: { "@id": `${SITE_URL}/#organization` },
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: `${SITE_URL}/projects?q={search_term_string}`,
      },
      "query-input": "required name=search_term_string",
    },
  };
}

// ──────────────────────────────────────────────────────────
// Service Schema — expanded with area and type detail
// ──────────────────────────────────────────────────────────
export function serviceSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "Civil Construction & Interior Services in Rameswaram",
    description:
      "Complete civil construction services including residential construction, commercial construction, building repair, building renovation, waterproofing, RCC works, interior design, modular kitchen, flooring, painting, plumbing, electrical, and turnkey projects in Rameswaram and Ramanathapuram district, Tamil Nadu.",
    provider: {
      "@type": "Organization",
      "@id": `${SITE_URL}/#organization`,
      name: SITE_NAME,
    },
    serviceType: [
      "Civil Construction",
      "Residential Construction",
      "Commercial Construction",
      "Building Repair",
      "Building Renovation",
      "Structural Repair",
      "Waterproofing",
      "RCC Works",
      "Roofing",
      "Flooring & Tiling",
      "Painting",
      "Plumbing",
      "Electrical Works",
      "Interior Design",
      "Modular Kitchen",
      "Bathroom Renovation",
      "False Ceiling",
      "Turnkey Projects",
    ],
    areaServed: AREA_SERVED.map((a) => ({ "@type": "City", name: a })),
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Construction Services",
    },
  };
}

// ──────────────────────────────────────────────────────────
// BreadcrumbList Schema
// ──────────────────────────────────────────────────────────
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

// ──────────────────────────────────────────────────────────
// FAQPage Schema — pass array of { question, answer }
// ──────────────────────────────────────────────────────────
export function faqSchema(items) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };
}

// ──────────────────────────────────────────────────────────
// HowTo Schema — pass array of step strings
// ──────────────────────────────────────────────────────────
export function howToSchema(steps) {
  return {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name: "How We Execute a Construction Project in Rameswaram",
    description:
      "The six-stage construction process followed by Sree Raam Shethu Constructions & Interiors from initial consultation to final handover.",
    step: steps.map((s, i) => ({
      "@type": "HowToStep",
      position: i + 1,
      name: s.name,
      text: s.description,
    })),
    tool: [
      { "@type": "HowToTool", name: "Civil Engineering Expertise" },
      { "@type": "HowToTool", name: "Quality Construction Materials" },
    ],
    supply: [
      { "@type": "HowToSupply", name: "Anti-corrosive concrete mix" },
      { "@type": "HowToSupply", name: "Coastal-grade reinforcement steel" },
    ],
  };
}

// ──────────────────────────────────────────────────────────
// Person Schema — for S.M. Sethu Pandian
// ──────────────────────────────────────────────────────────
export function personSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "S.M. Sethu Pandian",
    jobTitle: "Managing Partner & Civil Engineer",
    worksFor: {
      "@type": "Organization",
      "@id": `${SITE_URL}/#organization`,
      name: SITE_NAME,
    },
    hasCredential: {
      "@type": "EducationalOccupationalCredential",
      credentialCategory: "degree",
      name: "B.E. Civil Engineering",
    },
    knowsAbout: [
      "Civil Engineering",
      "Structural Engineering",
      "Building Construction",
      "Interior Design",
      "Renovation",
      "Coastal Construction",
    ],
    address: {
      "@type": "PostalAddress",
      addressLocality: "Rameswaram",
      addressRegion: "Tamil Nadu",
      addressCountry: "IN",
    },
  };
}

// ──────────────────────────────────────────────────────────
// ItemList Schema — for project listing pages
// ──────────────────────────────────────────────────────────
export function projectListSchema(projects) {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Construction Projects by Sree Raam Shethu in Rameswaram",
    description:
      "Residential, commercial, interior and renovation projects completed by Sree Raam Shethu Constructions & Interiors in Rameswaram, Tamil Nadu.",
    numberOfItems: projects.length,
    itemListElement: projects.map((p, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: p.title,
      url: `${SITE_URL}/projects/${p.slug}`,
      description: p.description,
    })),
  };
}