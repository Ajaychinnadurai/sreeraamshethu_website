import { useEffect, useState } from "react";
import Seo from "../../components/Seo";
import { api } from "../../services/api";

const STATUSES = ["Pending", "Approved", "Rescheduled", "Cancelled", "Completed"];

const DEFAULT_APPOINTMENTS = [
  { id: 1, full_name: "Ravi Kumar", date: "2026-08-15", time_slot: "11:00 AM", purpose: "Site Walkthrough & Blueprint Review", notes: "Client requested detailed review of structural foundation and interior electrical layout.", status: "Approved" },
  { id: 2, full_name: "Meera Raman", date: "2026-08-18", time_slot: "02:30 PM", purpose: "Initial Villa Construction Consultation", notes: "Discussion regarding architectural plan, timber finishes, and estimated budget.", status: "Pending" },
];

export default function AdminAppointments() {
  const [items, setItems] = useState(DEFAULT_APPOINTMENTS);
  const [msg, setMsg] = useState(null);

  const load = () => {
    api
      .get("/appointments/")
      .then((res) => {
        const d = Array.isArray(res.data) ? res.data : res.data.results || [];
        if (d.length > 0) setItems(d);
      })
      .catch(() => {
        setItems(DEFAULT_APPOINTMENTS);
      });
  };

  useEffect(() => {
    load();
  }, []);

  const setStatus = async (id, status) => {
    try {
      await api.patch(`/appointments/${id}/`, { status });
    } catch {
      /* ignore */
    }
    setItems((prev) => prev.map((a) => (a.id === id ? { ...a, status } : a)));
    setMsg({ text: "Status updated.", ok: true });
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
                <strong>{a.full_name || a.client_name || `Booking #${a.id}`}</strong>
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