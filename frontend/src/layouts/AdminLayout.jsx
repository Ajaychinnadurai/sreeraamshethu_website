import { Outlet, NavLink, useNavigate } from "react-router-dom";
import {
  LayoutDashboard, Folder, Users, Inbox, Calendar,
  MessageSquare, ArrowLeft, LogOut,
} from "lucide-react";
import { useAuth } from "../context/AuthContext";
import Navbar from "../components/Navbar";

const LINKS = [
  { to: "/admin/", label: "Dashboard", icon: LayoutDashboard, end: true },
  { to: "/admin/projects", label: "Projects", icon: Folder },
  { to: "/admin/clients", label: "Clients", icon: Users },
  { to: "/admin/inquiries", label: "Enquiries", icon: Inbox },
  { to: "/admin/appointments", label: "Appointments", icon: Calendar },
  { to: "/admin/testimonials", label: "Testimonials", icon: MessageSquare },
];

export default function AdminLayout() {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <div className="dash">
      <Navbar />
      <aside className="dash__side">
        <div className="dash__top">
          <NavLink to="/" className="dash__back focus-ring">
            <ArrowLeft size={16} /> Back to site
          </NavLink>
          <div className="dash__brand" style={{ display: "flex", alignItems: "center", gap: "0.6rem" }}>
            <img src="/logo.png" alt="Logo" className="dash__logo-img" style={{ height: "2.2rem", width: "auto", borderRadius: "4px" }} />
            <span>Admin</span>
          </div>
          <div className="dash__sidefoot">
            <button className="dash__logout focus-ring" onClick={handleLogout}>
              <LogOut size={16} /> <span>Logout</span>
            </button>
          </div>
        </div>

        <nav className="dash__nav">
          {LINKS.map((l) => (
            <NavLink
              key={l.to}
              to={l.to}
              end={l.end}
              className={({ isActive }) => `dash__link focus-ring ${isActive ? "is-active" : ""}`}
            >
              <l.icon size={18} /> <span>{l.label}</span>
            </NavLink>
          ))}
        </nav>
      </aside>

      <main className="dash__main">
        <Outlet />
      </main>
    </div>
  );
}