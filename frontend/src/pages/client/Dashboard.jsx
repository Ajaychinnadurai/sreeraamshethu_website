import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Building2, Calendar, FileText, CheckCircle2, Clock, Phone } from "lucide-react";
import Seo from "../../components/Seo";
import { api, mediaUrl } from "../../services/api";

function ProgressBar({ pct }) {
  const value = Math.max(0, Math.min(100, Number(pct) || 0));
  return (
    <div className="progress">
      <div className="progress__bar">
        <span style={{ width: `${value}%` }} />
      </div>
      <div className="progress__info">
        <span className="progress__num">{value}% Completed</span>
        <span className="progress__pct-label muted">Overall Construction Progress</span>
      </div>
    </div>
  );
}

const DEFAULT_CLIENT_DATA = {
  user: { full_name: "Ravi Kumar", username: "client" },
  projects: [
    {
      project: {
        id: 1,
        title: "The Coastal Residence",
        category: "Residential",
        location: "Rameswaram, Tamil Nadu",
        status: "In Progress",
        completion_percentage: 85,
        current_phase: "Interior Woodwork & Detailing",
      },
      milestones: [
        { id: 1, title: "Site Assessment & Layout", completed: true },
        { id: 2, title: "Foundation & RCC Framing", completed: true },
        { id: 3, title: "Brickwork & Plastering", completed: true },
        { id: 4, title: "Interior Finishing & Electricals", completed: false },
      ],
      updates: [
        { id: 1, title: "Custom Teak Doors Installed", body: "Teak door frames and warm LED ceiling light fixtures completed.", created_at: "2026-08-01" },
      ],
      documents: [
        { id: 1, title: "Architectural Blueprint", doc_type: "PDF", url: "#" },
      ],
    },
  ],
  appointments: [
    { id: 1, date: "2026-08-15", time_slot: "11:00 AM", purpose: "Site Inspection & Finish Review", status: "Approved" },
  ],
};

export default function Dashboard() {
  const [data, setData] = useState(DEFAULT_CLIENT_DATA);

  useEffect(() => {
    let active = true;
    api
      .get("/dashboard/client/")
      .then((res) => {
        if (active && res.data) setData(res.data);
      })
      .catch(() => {
        if (active) setData(DEFAULT_CLIENT_DATA);
      });
    return () => {
      active = false;
    };
  }, []);

  const user = data.user || DEFAULT_CLIENT_DATA.user;
  const projects = data.projects || DEFAULT_CLIENT_DATA.projects;
  const appointments = data.appointments || DEFAULT_CLIENT_DATA.appointments;

  const totalProgress = projects.reduce((sum, pr) => sum + (Number(pr.project?.completion_percentage) || 0), 0);
  const avgProgress = projects.length ? Math.round(totalProgress / projects.length) : 0;
  const totalDocs = projects.reduce((sum, pr) => sum + (pr.documents?.length || 0), 0);

  return (
    <>
      <Seo title="Client Portal | Sree Raam Shethu" noindex />
      <div className="dash-pad">
        {/* Welcome Hero Card */}
        <header className="client-hero-card">
          <div className="client-hero-card__main">
            <div className="client-avatar">
              {(user.full_name || user.username || "C").charAt(0).toUpperCase()}
            </div>
            <div>
              <span className="client-hero-card__badge">CLIENT PORTAL</span>
              <h1 className="client-hero-card__title">Welcome back, {user.full_name || user.username}</h1>
              <p className="client-hero-card__sub muted">
                Track your construction progress, site updates, architectural blueprints and appointments.
              </p>
            </div>
          </div>
          <div className="client-hero-card__actions">
            <Link to="/contact" className="btn btn--solid btn--sm">
              <Phone size={14} /> Contact Team
            </Link>
          </div>
        </header>

        {/* Quick Stats Grid */}
        <div className="stat-grid client-stats">
          <div className="stat-card">
            <div className="stat-card__icon"><Building2 size={20} /></div>
            <div className="stat-card__num">{projects.length}</div>
            <div className="stat-card__label muted">Active Projects</div>
          </div>
          <div className="stat-card">
            <div className="stat-card__icon"><Clock size={20} /></div>
            <div className="stat-card__num">{avgProgress}%</div>
            <div className="stat-card__label muted">Avg Progress</div>
          </div>
          <div className="stat-card">
            <div className="stat-card__icon"><Calendar size={20} /></div>
            <div className="stat-card__num">{appointments.length}</div>
            <div className="stat-card__label muted">Appointments</div>
          </div>
          <div className="stat-card">
            <div className="stat-card__icon"><FileText size={20} /></div>
            <div className="stat-card__num">{totalDocs}</div>
            <div className="stat-card__label muted">Documents</div>
          </div>
        </div>

        {/* Active Projects List */}
        <div className="dash-stack">
          {projects.map((pr) => {
            const p = pr.project;
            return (
              <section key={p.id} className="dash-card project-portal-card">
                <div className="dash-card__head">
                  <div>
                    <span className="eyebrow">{p.category}</span>
                    <h2 className="dash-card__title">{p.title}</h2>
                    <p className="muted">{p.location}</p>
                  </div>
                  <span className={`status-chip status-chip--${p.status.toLowerCase().replace(/\s+/g, "-")}`}>
                    {p.status}
                  </span>
                </div>

                <div className="dash-progress-block">
                  <h3 className="pd-h">Construction Progress</h3>
                  <ProgressBar pct={p.completion_percentage} />
                  <p className="muted current-phase-text">
                    Current Phase: <strong className="accent">{p.current_phase || "Planning & Preparation"}</strong>
                  </p>
                </div>

                {pr.milestones?.length > 0 && (
                  <div className="milestones-block">
                    <h3 className="pd-h">Project Milestones</h3>
                    <div className="milestones">
                      {pr.milestones.map((m) => (
                        <div key={m.id} className={`milestone ${m.completed ? "is-done" : ""}`}>
                          <span className="milestone__mark">
                            {m.completed ? <CheckCircle2 size={18} /> : <Clock size={18} />}
                          </span>
                          <span className="milestone__title">{m.title}</span>
                          {m.due_date && <span className="milestone__date muted">{m.due_date}</span>}
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                <div className="dash-sec">
                  <h3 className="pd-h">Recent Site Updates</h3>
                  {(!pr.updates || pr.updates.length === 0) && <p className="muted">No site updates logged yet.</p>}
                  {pr.updates?.map((u) => (
                    <div key={u.id} className="update-card">
                      {u.image && <img className="update-card__img" src={mediaUrl(u.image)} alt={u.title} loading="lazy" />}
                      <div className="update-card__content">
                        <strong>{u.title}</strong>
                        <p className="muted">{u.body}</p>
                        <span className="update-card__date muted">
                          {u.created_at ? new Date(u.created_at).toLocaleDateString("en-IN", { month: "short", day: "numeric", year: "numeric" }) : ""}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="dash-sec">
                  <h3 className="pd-h">Project Documents &amp; Blueprints</h3>
                  {(!pr.documents || pr.documents.length === 0) && <p className="muted">No documents uploaded yet.</p>}
                  <div className="doc-grid">
                    {pr.documents?.map((d) => (
                      <a key={d.id} className="doc-card focus-ring" href={mediaUrl(d.url)} target="_blank" rel="noreferrer">
                        <div className="doc-card__type"><FileText size={18} /> {d.doc_type}</div>
                        <div className="doc-card__title">{d.title}</div>
                        <span className="doc-card__link">Download</span>
                      </a>
                    ))}
                  </div>
                </div>
              </section>
            );
          })}
        </div>

        {/* Appointments Section */}
        <div className="dash-card dash-appts">
          <div className="dash-card__head">
            <h2 className="dash-card__title">Upcoming Appointments</h2>
            <Link to="/contact" className="btn btn--outline btn--sm">Book New</Link>
          </div>
          {appointments.length === 0 && <p className="muted">No upcoming site or consultation appointments.</p>}
          <div className="appt-list">
            {appointments.map((a) => (
              <div key={a.id} className="appt-card">
                <div className="appt-card__date">
                  <Calendar size={18} />
                  <span>{a.date} · {a.time_slot}</span>
                </div>
                <div className="appt-card__purpose">
                  <strong>{a.purpose || "Consultation"}</strong>
                  {a.notes && <p className="muted">{a.notes}</p>}
                </div>
                <span className={`status-chip status-chip--${a.status.toLowerCase()}`}>{a.status}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}