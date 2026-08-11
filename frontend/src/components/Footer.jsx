import { Link } from "react-router-dom";

const NAV = [
  { to: "/", label: "Home" },
  { to: "/about", label: "About" },
  { to: "/services", label: "Services" },
  { to: "/projects", label: "Projects" },
  { to: "/interiors", label: "Interiors" },
  { to: "/process", label: "Process" },
  { to: "/contact", label: "Contact" },
];

/** Services linked to their in-page anchors for specificity */
const SERVICES = [
  { label: "House Construction", to: "/services#house-construction" },
  { label: "Building Repair & Renovation", to: "/services#building-repair" },
  { label: "Waterproofing", to: "/services#waterproofing" },
  { label: "Interior Design", to: "/services#interior-design" },
  { label: "Modular Kitchen", to: "/services#modular-kitchen" },
  { label: "Commercial Construction", to: "/services#commercial-construction" },
  { label: "Turnkey Projects", to: "/services#turnkey" },
  { label: "RCC & Concrete Works", to: "/services#rcc-concrete" },
];

/** Genuine service areas for local SEO signal */
const AREAS = [
  "Rameswaram",
  "Ramanathapuram",
  "Pamban",
  "Mandapam",
  "Thiruvadanai",
  "Arichalmunai",
];

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container footer__grid">
        {/* Brand */}
        <div className="footer__brand">
          <div style={{ display: "flex", alignItems: "center", gap: "0.8rem", marginBottom: "0.8rem" }}>
            <img src="/logo.png" alt="Sree Raam Shethu Constructions & Interiors Logo" className="footer__logo-img" style={{ height: "3rem", width: "auto", borderRadius: "6px" }} />
            <div>
              <div className="footer__logo">SREE RAAM SHETHU</div>
              <p className="footer__sub">CONSTRUCTIONS &amp; INTERIORS</p>
            </div>
          </div>
          <p className="footer__tagline muted">
            Civil contractor, builders and interior designers in Rameswaram,
            Tamil Nadu — delivering residential construction, commercial projects,
            building repair, renovation and interior design.
          </p>
        </div>

        {/* Navigation */}
        <nav className="footer__col" aria-label="Footer site navigation">
          <h4 className="footer__head">Navigation</h4>
          <ul>
            {NAV.map((n) => (
              <li key={n.to}>
                <Link className="footer__link focus-ring" to={n.to}>
                  {n.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* Services — specific anchor links for better internal linking */}
        <nav className="footer__col" aria-label="Construction services links">
          <h4 className="footer__head">Services</h4>
          <ul>
            {SERVICES.map((s) => (
              <li key={s.label}>
                <Link className="footer__link focus-ring" to={s.to}>
                  {s.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* Contact + Service Areas */}
        <div className="footer__col">
          <h4 className="footer__head">Office Address</h4>
          <address style={{ fontStyle: "normal", fontSize: "0.88rem", lineHeight: "1.6", color: "rgba(255,255,255,0.85)" }}>
            12/15c Thulasi Baba Madam Street,<br />
            Near to Lakshmana Theertham,<br />
            Rameswaram - 623526, Tamil Nadu, India.
          </address>
          <p className="muted" style={{ fontSize: "0.88rem", marginTop: "0.6rem" }}>
            Phone:{" "}
            <a href="tel:+919566615030" style={{ color: "inherit", textDecoration: "underline" }}>
              +91 95666 15030
            </a>
          </p>
          <p className="muted" style={{ fontSize: "0.88rem", marginTop: "0.2rem" }}>
            Email:{" "}
            <a href="mailto:sreeraamconstruction@gmail.com" style={{ color: "inherit", textDecoration: "underline" }}>
              sreeraamconstruction@gmail.com
            </a>
          </p>

          <h4 className="footer__head" style={{ marginTop: "1.4rem" }}>Areas We Serve</h4>
          <ul aria-label="Service areas">
            {AREAS.map((area) => (
              <li key={area} style={{ fontSize: "0.85rem", color: "rgba(255,255,255,0.7)", lineHeight: "1.8" }}>
                {area}
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="container footer__bottom">
        <span>© 2026 Sree Raam Shethu Constructions &amp; Interiors.</span>
        <span>All Rights Reserved. Rameswaram, Tamil Nadu.</span>
      </div>
    </footer>
  );
}