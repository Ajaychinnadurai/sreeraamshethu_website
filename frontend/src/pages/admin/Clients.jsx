import { useEffect, useState } from "react";
import Seo from "../../components/Seo";
import { api } from "../../services/api";

export default function AdminClients() {
  const [clients, setClients] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;
    api
      .get("/dashboard/admin/clients/")
      .then((res) => {
        if (active) {
          const data = Array.isArray(res.data) ? res.data : res.data.results || [];
          setClients(data);
          setLoading(false);
        }
      })
      .catch(() => {
        if (active) {
          setClients([]);
          setLoading(false);
        }
      });
    return () => {
      active = false;
    };
  }, []);

  return (
    <>
      <Seo title="Manage Clients | Admin" noindex />
      <div className="dash-pad">
        <header className="dash-head">
          <h1 className="dash-title">Clients</h1>
          <p className="muted">{clients.length} real registered client(s) in database.</p>
        </header>
        {loading && <div className="muted">Loading clients from database...</div>}
        <div className="dash-card">
          {clients.length === 0 && !loading && <p className="muted">No client accounts registered in database yet.</p>}
          {clients.map((c) => (
            <div key={c.id} className="row-item">
              <div>
                <strong>{c.full_name || c.username}</strong>
                <div className="muted">{c.email} · {c.phone || "—"}</div>
                <div className="muted">Projects: {c.has_projects ? "Yes" : "None"}</div>
              </div>
              <span className={`status-chip ${c.active ? "status-chip--approved" : ""}`}>{c.active ? "Active" : "Inactive"}</span>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}