import { useEffect, useState } from "react";
import Seo from "../../components/Seo";
import { api } from "../../services/api";

const STATUSES = ["New", "Contacted", "In Progress", "Converted", "Closed"];

export default function AdminInquiries() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [msg, setMsg] = useState(null);

  const load = () => {
    api
      .get("/inquiries/")
      .then((res) => {
        const d = Array.isArray(res.data) ? res.data : res.data.results || [];
        setItems(d);
        setLoading(false);
      })
      .catch(() => {
        setItems([]);
        setLoading(false);
      });
  };

  useEffect(() => {
    load();
  }, []);

  const updateStatus = async (id, status) => {
    try {
      await api.patch(`/inquiries/${id}/`, { status });
      setMsg({ text: "Enquiry status updated.", ok: true });
      load();
    } catch {
      setMsg({ text: "Update failed.", ok: false });
    }
  };

  return (
    <>
      <Seo title="Manage Enquiries | Admin" noindex />
      <div className="dash-pad">
        <header className="dash-head">
          <h1 className="dash-title">Enquiries</h1>
          <p className="muted">{items.length} real enquiry / enquiries in database.</p>
        </header>
        {msg && <div className={`form-note ${msg.ok ? "form-note--ok" : "form-note--err"}`}>{msg.text}</div>}
        {loading && <div className="muted">Loading enquiries from database...</div>}
        <div className="dash-card">
          {items.length === 0 && !loading && <p className="muted">No project enquiries submitted yet.</p>}
          {items.map((q) => (
            <div key={q.id} className="row-item row-item--wrap">
              <div className="enquiry-main">
                <strong>{q.full_name}</strong>
                <div className="muted">{q.project_type} · {q.budget || "No budget"} · {q.location || "Rameswaram"}</div>
                <div className="muted">{q.phone} {q.email && `· ${q.email}`}</div>
                <p className="enquiry-desc">{q.project_description}</p>
              </div>
              <select className="focus-ring" value={q.status} onChange={(e) => updateStatus(q.id, e.target.value)}>
                {STATUSES.map((s) => <option key={s}>{s}</option>)}
              </select>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}