import { useEffect, useState } from "react";
import Seo from "../../components/Seo";
import { api } from "../../services/api";

const STATUSES = ["Pending", "Approved", "Rescheduled", "Cancelled", "Completed"];

export default function AdminAppointments() {
  const [items, setItems] = useState([]);
  const [msg, setMsg] = useState(null);

  const load = () =>
    api.get("/appointments/").then((res) => {
      const d = Array.isArray(res.data) ? res.data : res.data.results || [];
      setItems(d);
    });

  useEffect(() => {
    load();
  }, []);

  const setStatus = async (id, status) => {
    try {
      await api.patch(`/appointments/${id}/`, { status });
      setMsg({ text: "Updated.", ok: true });
      load();
    } catch {
      setMsg({ text: "Update failed.", ok: false });
    }
  };

  return (
    <>
      <Seo title="Manage Appointments | Admin" noindex />
      <div className="dash-pad">
        <header className="dash-head">
          <h1 className="dash-title">Appointments</h1>
          <p className="muted">Approve, reschedule or cancel bookings.</p>
        </header>
        {msg && <div className={`form-note ${msg.ok ? "form-note--ok" : "form-note--err"}`}>{msg.text}</div>}
        <div className="dash-card">
          {items.length === 0 && <p className="muted">No appointments.</p>}
          {items.map((a) => (
            <div key={a.id} className="row-item row-item--wrap">
              <div>
                <strong>{a.full_name || a.client_name || a.id}</strong>
                <div className="muted">{a.date} · {a.time_slot} · {a.purpose || "Meeting"}</div>
                {a.notes && <p className="enquiry-desc">{a.notes}</p>}
              </div>
              <select className="focus-ring" value={a.status} onChange={(e) => setStatus(a.id, e.target.value)}>
                {STATUSES.map((s) => <option key={s}>{s}</option>)}
              </select>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}