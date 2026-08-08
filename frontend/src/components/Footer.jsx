import { Link } from "react-router-dom";

const NAV = [
  { to: "/", label: "Home" },
  { to: "/about", label: "About" },
  { to: "/services", label: "Services" },
  { to: "/projects", label: "Projects" },
  { to: "/interiors", label: "Interiors" },
  { to: "/contact", label: "Contact" },
];

const SERVICES = [
  "Construction",
  "Interior Design",
  "Renovation",
  "Turnkey Projects",
  "Commercial Construction",
];

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container footer__grid">
        <div className="footer__brand">
          <div style={{ display: "flex", alignItems: "center", gap: "0.8rem", marginBottom: "0.8rem" }}>
            <img src="/logo.png" alt="Sree Raam Shethu Logo" className="footer__logo-img" style={{ height: "3rem", width: "auto", borderRadius: "6px" }} />
            <div>
              <div className="footer__logo">SREE RAAM SHETHU</div>
              <p className="footer__sub">CONSTRUCTIONS &amp; INTERIORS</p>
            </div>
          </div>
          <p className="footer__tagline muted">
            Building spaces that define tomorrow — from structural foundations to refined
            interiors in Rameswaram, Tamil Nadu.
          </p>
        </div>

        <nav className="footer__col" aria-label="Footer navigation">
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

        <div className="footer__col">
          <h4 className="footer__head">Services</h4>
          <ul>
            {SERVICES.map((s) => (
              <li key={s}>
                <Link className="footer__link focus-ring" to="/services">
                  {s}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="footer__col">
          <h4 className="footer__head">Office Address</h4>
          <p style={{ fontSize: "0.88rem", lineHeight: "1.5", color: "rgba(255,255,255,0.85)" }}>
            12/15c Thulasi Baba Madam Street,<br />
            Near to Lakshmana Theertham,<br />
            Rameswaram - 623526, Tamil Nadu, India.
          </p>
          <p className="footer__spacer" />
          <p className="muted" style={{ fontSize: "0.88rem", marginTop: "0.4rem" }}>
            Phone: <a href="tel:+919566615030" style={{ color: "inherit", textDecoration: "none" }}>+91 95666 15030</a>
          </p>
          <p className="muted" style={{ fontSize: "0.88rem", marginTop: "0.2rem" }}>
            Email: <a href="mailto:sreeraamconstruction@gmail.com" style={{ color: "inherit", textDecoration: "none" }}>sreeraamconstruction@gmail.com</a>
          </p>
        </div>
      </div>
      <div className="container footer__bottom">
        <span>© 2026 Sree Raam Shethu Constructions &amp; Interiors.</span>
        <span>All Rights Reserved.</span>
      </div>
    </footer>
  );
}