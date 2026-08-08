import { useEffect, useState } from "react";
import Seo from "../../components/Seo";
import { api } from "../../services/api";

export default function AdminClients() {
  const [clients, setClients] = useState([]);
  const [err, setErr] = useState("");

  useEffect(() => {
    let active = true;
    api
      .get("/dashboard/admin/clients/")
      .then((res) => active && setClients(res.data))
      .catch(() => active && setErr("Failed to load clients."));
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
          <p className="muted">{clients.length} registered client(s).</p>
        </header>
        {err && <div className="form-note form-note--err">{err}</div>}
        <div className="dash-card">
          {clients.length === 0 && <p className="muted">No clients registered yet.</p>}
          {clients.map((c) => (
            <div key={c.id} className="row-item">
              <div>
                <strong>{c.full_name}</strong>
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