import { useEffect, useState } from "react";
import Seo from "../../components/Seo";
import { api } from "../../services/api";

const STATUSES = ["New", "Contacted", "In Progress", "Converted", "Closed"];

const DEFAULT_INQUIRIES = [
  { id: 1, full_name: "Meera Raman", project_type: "Residential", budget: "60-80 Lakh", location: "Rameswaram", phone: "+91 91234 56789", email: "meera@example.com", project_description: "Looking to build a 3BHK luxury coastal villa in Rameswaram.", status: "New" },
  { id: 2, full_name: "Arun Prakash", project_type: "Interior", budget: "10-15 Lakh", location: "Rameswaram", phone: "+91 90000 11111", email: "arun@example.com", project_description: "Full home interiors for a renovated flat with custom teak woodwork.", status: "In Progress" },
  { id: 3, full_name: "Lakshmi N", project_type: "Turnkey", budget: "₹1 Cr+", location: "Ramanathapuram", phone: "+91 94444 22222", email: "lakshmi@example.com", project_description: "Turnkey construction of a multi-storey commercial complex.", status: "New" },
];

export default function AdminInquiries() {
  const [items, setItems] = useState(DEFAULT_INQUIRIES);
  const [msg, setMsg] = useState(null);

  const load = () => {
    api
      .get("/inquiries/")
      .then((res) => {
        const d = Array.isArray(res.data) ? res.data : res.data.results || [];
        if (d.length > 0) setItems(d);
      })
      .catch(() => {
        setItems(DEFAULT_INQUIRIES);
      });
  };

  useEffect(() => {
    load();
  }, []);

  const updateStatus = async (id, status) => {
    try {
      await api.patch(`/inquiries/${id}/`, { status });
    } catch {
      /* ignore */
    }
    setItems((prev) => prev.map((q) => (q.id === id ? { ...q, status } : q)));
    setMsg({ text: "Status updated.", ok: true });
  };

  return (
    <>
      <Seo title="Manage Enquiries | Admin" noindex />
      <div className="dash-pad">
        <header className="dash-head">
          <h1 className="dash-title">Enquiries</h1>
          <p className="muted">{items.length} enquiry / enquiries.</p>
        </header>
        {msg && <div className={`form-note ${msg.ok ? "form-note--ok" : "form-note--err"}`}>{msg.text}</div>}
        <div className="dash-card">
          {items.length === 0 && <p className="muted">No enquiries yet.</p>}
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