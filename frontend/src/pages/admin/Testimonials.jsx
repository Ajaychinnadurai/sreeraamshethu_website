import { useEffect, useState } from "react";
import { User, ImageIcon, Trash2 } from "lucide-react";
import Seo from "../../components/Seo";
import { api, mediaUrl } from "../../services/api";

const empty = {
  client_name: "",
  project_type: "",
  location: "Rameshwaram, Tamil Nadu",
  review: "",
  rating: 5,
  is_published: true,
};

export default function AdminTestimonials() {
  const [items, setItems] = useState([]);
  const [form, setForm] = useState(empty);
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [saving, setSaving] = useState(false);
  const [msg, setMsg] = useState(null);

  const load = () =>
    api
      .get("/testimonials/")
      .then((res) => {
        const d = Array.isArray(res.data) ? res.data : res.data.results || [];
        setItems(d);
      })
      .catch(() => setMsg({ text: "Failed to load testimonials.", ok: false }));

  useEffect(() => {
    load();
  }, []);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const save = async (e) => {
    e.preventDefault();
    if (!form.client_name.trim()) return setMsg({ text: "Please enter client name.", ok: false });
    if (!form.review.trim()) return setMsg({ text: "Please enter review text.", ok: false });

    setSaving(true);
    setMsg(null);
    try {
      const formData = new FormData();
      formData.append("client_name", form.client_name);
      formData.append("project_type", form.project_type);
      formData.append("location", form.location);
      formData.append("review", form.review);
      formData.append("rating", Number(form.rating) || 5);
      formData.append("is_published", form.is_published);

      if (imageFile) {
        formData.append("profile_image", imageFile);
      }

      await api.post("/testimonials/", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      setMsg({ text: "Testimonial added with image successfully.", ok: true });
      setForm(empty);
      setImageFile(null);
      setImagePreview(null);
      load();
    } catch {
      setMsg({ text: "Failed to add testimonial.", ok: false });
    } finally {
      setSaving(false);
    }
  };

  const del = async (id) => {
    if (!window.confirm("Delete this testimonial?")) return;
    try {
      await api.delete(`/testimonials/${id}/`);
      setMsg({ text: "Deleted successfully.", ok: true });
      load();
    } catch {
      setMsg({ text: "Delete failed.", ok: false });
    }
  };

  return (
    <>
      <Seo title="Manage Testimonials | Admin" noindex />
      <div className="dash-pad">
        <header className="dash-head">
          <div>
            <h1 className="dash-title">Client Testimonials</h1>
            <p className="muted">{items.length} testimonial(s) published.</p>
          </div>
        </header>

        {msg && <div className={`form-note ${msg.ok ? "form-note--ok" : "form-note--err"}`}>{msg.text}</div>}

        <div className="dash-cols">
          <section className="dash-card list">
            {items.length === 0 && <p className="muted">No testimonials yet.</p>}
            {items.map((t) => (
              <div key={t.id} className="row-item" style={{ alignItems: "flex-start", gap: "1rem" }}>
                {t.profile_image ? (
                  <img
                    src={mediaUrl(t.profile_image)}
                    alt={t.client_name}
                    style={{ width: "42px", height: "42px", borderRadius: "50%", objectFit: "cover", flexShrink: 0 }}
                  />
                ) : (
                  <div style={{ width: "42px", height: "42px", borderRadius: "50%", background: "var(--sand)", display: "grid", placeItems: "center", flexShrink: 0 }}>
                    <User size={20} className="muted" />
                  </div>
                )}
                <div style={{ flex: 1 }}>
                  <strong>{t.client_name}</strong>
                  <div className="muted" style={{ fontSize: "0.82rem", margin: "0.2rem 0" }}>
                    {"★".repeat(t.rating)} · {t.project_type || "Client"}
                  </div>
                  <p className="enquiry-desc" style={{ fontSize: "0.88rem", lineHeight: "1.5" }}>{t.review}</p>
                </div>
                <button className="btn btn--outline" onClick={() => del(t.id)} style={{ padding: "0.35rem 0.7rem" }}>
                  Delete
                </button>
              </div>
            ))}
          </section>

          <section className="dash-card">
            <h2 className="dash-card__title">Add New Testimonial</h2>
            <form onSubmit={save} className="admin-form">
              <div className="field">
                <label>Client Name</label>
                <input
                  className="focus-ring"
                  value={form.client_name}
                  onChange={(e) => setForm({ ...form, client_name: e.target.value })}
                  placeholder="e.g. Ramesh Kumar"
                  required
                />
              </div>

              <div className="field">
                <label>Client Profile Photo (Optional)</label>
                {imagePreview && (
                  <div style={{ marginBottom: "0.5rem" }}>
                    <img src={imagePreview} alt="Preview" style={{ width: "60px", height: "60px", borderRadius: "50%", objectFit: "cover" }} />
                  </div>
                )}
                <input type="file" accept="image/*" className="focus-ring" onChange={handleImageChange} />
              </div>

              <div className="field">
                <label>Project Type / Role</label>
                <input
                  className="focus-ring"
                  value={form.project_type}
                  onChange={(e) => setForm({ ...form, project_type: e.target.value })}
                  placeholder="e.g. Luxury Villa Construction"
                />
              </div>

              <div className="field">
                <label>Review / Testimonial</label>
                <textarea
                  className="focus-ring"
                  rows={4}
                  value={form.review}
                  onChange={(e) => setForm({ ...form, review: e.target.value })}
                  placeholder="Write client testimonial review..."
                  required
                />
              </div>

              <div className="form-row">
                <div className="field">
                  <label>Rating (1-5)</label>
                  <input
                    type="number"
                    min={1}
                    max={5}
                    className="focus-ring"
                    value={form.rating}
                    onChange={(e) => setForm({ ...form, rating: e.target.value })}
                  />
                </div>
              </div>

              <button className="btn btn--solid" type="submit" disabled={saving}>
                {saving ? "Uploading & Adding..." : "Add Testimonial"}
              </button>
            </form>
          </section>
        </div>
      </div>
    </>
  );
}