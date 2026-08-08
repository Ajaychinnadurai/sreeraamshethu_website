import { Outlet, NavLink, useNavigate } from "react-router-dom";
import { LayoutDashboard, LogOut, ArrowLeft } from "lucide-react";
import { useAuth } from "../context/AuthContext";
import Navbar from "../components/Navbar";

export default function ClientLayout() {
  const { user, logout } = useAuth();
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
            <span>Client Portal</span>
          </div>
        </div>

        <nav className="dash__nav">
          <NavLink to="/client/" end className={({ isActive }) => `dash__link focus-ring ${isActive ? "is-active" : ""}`}>
            <LayoutDashboard size={16} /> Dashboard
          </NavLink>
        </nav>

        <div className="dash__sidefoot">
          <div className="dash__user">
            <strong>{user?.full_name || user?.username}</strong>
            <span className="dash__user-email">{user?.email}</span>
          </div>
          <button className="dash__logout focus-ring" onClick={handleLogout}>
            <LogOut size={16} /> Logout
          </button>
        </div>
      </aside>
      <main className="dash__main">
        <Outlet />
      </main>
    </div>
  );
}