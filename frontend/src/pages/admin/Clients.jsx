import { useEffect, useState } from "react";
import Seo from "../../components/Seo";
import { api } from "../../services/api";

const DEFAULT_CLIENTS = [
  { id: 1, full_name: "Ravi Kumar", email: "client@example.com", phone: "+91 99999 99999", has_projects: true, active: true },
  { id: 2, full_name: "Ashok Meena", email: "ashok@example.com", phone: "+91 98888 88888", has_projects: true, active: true },
  { id: 3, full_name: "Meera Raman", email: "meera@example.com", phone: "+91 91234 56789", has_projects: false, active: true },
];

export default function AdminClients() {
  const [clients, setClients] = useState(DEFAULT_CLIENTS);

  useEffect(() => {
    let active = true;
    api
      .get("/dashboard/admin/clients/")
      .then((res) => {
        if (active && Array.isArray(res.data) && res.data.length > 0) {
          setClients(res.data);
        }
      })
      .catch(() => {
        if (active) setClients(DEFAULT_CLIENTS);
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
          <p className="muted">{clients.length} registered client(s).</p>
        </header>
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