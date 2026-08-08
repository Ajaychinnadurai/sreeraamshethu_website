import { useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { Home, Building2, Paintbrush, Layers, UserCheck, LogIn } from "lucide-react";
import { useAuth } from "../context/AuthContext";
import Button from "./Button";

const LINKS = [
  { to: "/", label: "Home" },
  { to: "/about", label: "About" },
  { to: "/services", label: "Services" },
  { to: "/projects", label: "Projects" },
  { to: "/interiors", label: "Interiors" },
  { to: "/process", label: "Process" },
  { to: "/contact", label: "Contact" },
];

export default function Navbar({ hideDesktop = false }) {
  const { user, openAuthModal } = useAuth();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    if (hideDesktop) return;
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [hideDesktop]);

  const portalPath = user?.role === "ADMIN" || user?.is_staff ? "/admin/" : "/client/";

  const mobileNav = [
    { to: "/", label: "Home", icon: Home },
    { to: "/projects", label: "Projects", icon: Building2 },
    { to: "/interiors", label: "Interiors", icon: Paintbrush },
    { to: "/services", label: "Services", icon: Layers },
    user
      ? { to: portalPath, label: "Portal", icon: UserCheck }
      : { action: () => openAuthModal("login"), label: "Login", icon: LogIn },
  ];

  return (
    <>
      {/* Top Header Navigation */}
      {!hideDesktop && (
        <header className={`nav ${scrolled ? "is-scrolled" : ""}`}>
          <div className="nav__inner container">
            <Link to="/" className="nav__brand focus-ring" aria-label="Sree Raam Shethu home">
              <img src="/logo.png" alt="Sree Raam Shethu Logo" className="nav__brand-img" />
              <span className="nav__brand-text">
                <span className="nav__brand-name">Sree Raam Shethu</span>
                <span className="nav__brand-sub">Constructions &amp; Interiors</span>
              </span>
            </Link>

            {/* Desktop Links */}
            <nav className="nav__links" aria-label="Primary">
              {LINKS.map((l) => (
                <NavLink
                  key={l.to}
                  to={l.to}
                  end={l.to === "/"}
                  className={({ isActive }) => `nav__link focus-ring ${isActive ? "is-active" : ""}`}
                >
                  {l.label}
                </NavLink>
              ))}
            </nav>

            {/* Header Action Buttons */}
            <div className="nav__actions">
              {user ? (
                <Link
                  to={portalPath}
                  className="nav__avatar-badge focus-ring"
                  title={user.full_name || user.username}
                  aria-label="Open Workspace Portal"
                >
                  {(user.full_name || user.username || "U").charAt(0).toUpperCase()}
                </Link>
              ) : (
                <>
                  <button
                    type="button"
                    onClick={() => openAuthModal("login")}
                    className="nav__login-btn focus-ring"
                  >
                    Sign In
                  </button>
                  <Button to="/contact" variant="solid" className="nav__cta">
                    Get Quote
                  </Button>
                </>
              )}
            </div>
          </div>
        </header>
      )}

      {/* Mobile Easy Bottom Navigation Dock */}
      <nav className="mobile-bottom-nav" aria-label="Mobile Navigation">
        <div className="mobile-bottom-nav__inner">
          {mobileNav.map((item, idx) => {
            const Icon = item.icon;
            if (item.action) {
              return (
                <button
                  key={idx}
                  type="button"
                  onClick={item.action}
                  className="mobile-bottom-nav__item focus-ring"
                  style={{ background: "none", border: 0, padding: 0 }}
                >
                  <Icon className="mobile-bottom-nav__icon" size={20} />
                  <span className="mobile-bottom-nav__label">{item.label}</span>
                </button>
              );
            }
            return (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.to === "/"}
                className={({ isActive }) =>
                  `mobile-bottom-nav__item ${isActive ? "is-active" : ""}`
                }
              >
                <Icon className="mobile-bottom-nav__icon" size={20} />
                <span className="mobile-bottom-nav__label">{item.label}</span>
              </NavLink>
            );
          })}
        </div>
      </nav>
    </>
  );
}