import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Folder, Users, Inbox, Calendar, MessageSquare, FileText, Plus } from "lucide-react";
import Seo from "../../components/Seo";
import { api } from "../../services/api";

const STAT_CARDS = [
  { key: "projects", label: "Active Projects", icon: Folder, color: "gold" },
  { key: "clients", label: "Registered Clients", icon: Users, color: "blue" },
  { key: "inquiries", label: "Total Enquiries", icon: Inbox, color: "purple" },
  { key: "new_inquiries", label: "New Enquiries", icon: Inbox, color: "amber" },
  { key: "appointments", label: "Appointments", icon: Calendar, color: "green" },
  { key: "pending_appointments", label: "Pending Appts", icon: Calendar, color: "orange" },
  { key: "testimonials", label: "Testimonials", icon: MessageSquare, color: "teal" },
  { key: "documents", label: "Uploaded Docs", icon: FileText, color: "gray" },
];

export default function AdminDashboard() {
  const [data, setData] = useState(null);
  const [err, setErr] = useState("");

  useEffect(() => {
    let active = true;
    api
      .get("/dashboard/admin/")
      .then((res) => active && setData(res.data))
      .catch(() => active && setErr("Failed to load admin data."));
    return () => {
      active = false;
    };
  }, []);

  if (err) return <div className="dash-pad form-note form-note--err">{err}</div>;
  if (!data) return <div className="dash-pad muted">Loading dashboard...</div>;
  const c = data.counts || {};

  return (
    <>
      <Seo title="Admin Dashboard | Sree Raam Shethu" noindex />
      <div className="dash-pad">
        {/* Admin Header Bar */}
        <header className="admin-hero-card">
          <div>
            <span className="admin-hero-card__badge">ADMINISTRATION</span>
            <h1 className="admin-hero-card__title">Executive Dashboard</h1>
            <p className="admin-hero-card__sub muted">
              Real-time metric monitoring across active builds, client accounts, site enquiries and appointments.
            </p>
          </div>
          <div className="admin-hero-card__actions">
            <Link to="/admin/projects" className="btn btn--solid btn--sm">
              <Plus size={14} /> New Project
            </Link>
            <Link to="/admin/inquiries" className="btn btn--outline btn--sm">
              View Enquiries
            </Link>
          </div>
        </header>

        {/* KPI Stat Cards Grid */}
        <div className="stat-grid admin-stats">
          {STAT_CARDS.map((card) => {
            const Icon = card.icon;
            return (
              <div key={card.key} className={`stat-card stat-card--${card.color}`}>
                <div className="stat-card__head">
                  <span className="stat-card__icon"><Icon size={18} /></span>
                  <span className="stat-card__num">{c[card.key] ?? 0}</span>
                </div>
                <div className="stat-card__label muted">{card.label}</div>
              </div>
            );
          })}
        </div>

        {/* Recent Enquiries & Appointments Split View */}
        <div className="dash-cols">
          <section className="dash-card">
            <div className="dash-card__head">
              <h2 className="dash-card__title">Recent Enquiries</h2>
              <Link to="/admin/inquiries" className="btn btn--ghost btn--sm">Manage</Link>
            </div>
            {data.recent_inquiries?.length === 0 && <p className="muted">No enquiries logged.</p>}
            <div className="admin-list">
              {data.recent_inquiries?.map((i) => (
                <div key={i.id} className="row-item">
                  <div>
                    <strong>{i.full_name}</strong>
                    <div className="muted">{i.project_type} · {i.phone}</div>
                  </div>
                  <span className={`status-chip status-chip--${(i.status || "new").toLowerCase().replace(/\s+/g, "-")}`}>
                    {i.status}
                  </span>
                </div>
              ))}
            </div>
          </section>

          <section className="dash-card">
            <div className="dash-card__head">
              <h2 className="dash-card__title">Recent Appointments</h2>
              <Link to="/admin/appointments" className="btn btn--ghost btn--sm">Manage</Link>
            </div>
            {data.recent_appointments?.length === 0 && <p className="muted">No upcoming appointments.</p>}
            <div className="admin-list">
              {data.recent_appointments?.map((a) => (
                <div key={a.id} className="row-item">
                  <div>
                    <strong>{a.full_name || a.client_name || `Booking #${a.id}`}</strong>
                    <div className="muted">{a.date} · {a.time_slot}</div>
                  </div>
                  <span className={`status-chip status-chip--${(a.status || "pending").toLowerCase()}`}>
                    {a.status}
                  </span>
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>
    </>
  );
}