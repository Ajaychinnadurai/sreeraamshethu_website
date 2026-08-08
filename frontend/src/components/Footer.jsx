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
            interiors in Rameshwaram, Tamil Nadu.
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
          <h4 className="footer__head">Location</h4>
          <p>Rameshwaram,</p>
          <p>Tamil Nadu, India</p>
          <p className="footer__spacer" />
          <p className="muted">Phone: +91 95666 15030</p>
          <p className="muted">Email: hello@sreeraamshethu.com</p>
        </div>
      </div>
      <div className="container footer__bottom">
        <span>© 2026 Sree Raam Shethu Constructions &amp; Interiors.</span>
        <span>All Rights Reserved.</span>
      </div>
    </footer>
  );
}