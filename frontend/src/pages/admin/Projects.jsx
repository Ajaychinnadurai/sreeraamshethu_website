import { useEffect, useState } from "react";
import { Upload, Image as ImageIcon, Trash2 } from "lucide-react";
import Seo from "../../components/Seo";
import { api, mediaUrl } from "../../services/api";

const empty = {
  title: "",
  slug: "",
  category: "Residential",
  location: "Rameshwaram, Tamil Nadu",
  year: new Date().getFullYear(),
  short_description: "",
  overview: "",
  design_concept: "",
  materials: "",
  status: "Planning",
  completion_percentage: 0,
  current_phase: "",
  featured: false,
  is_public: true,
};

export default function AdminProjects() {
  const [projects, setProjects] = useState([]);
  const [selected, setSelected] = useState(null);
  const [form, setForm] = useState(empty);
  const [coverFile, setCoverFile] = useState(null);
  const [coverPreview, setCoverPreview] = useState(null);
  const [heroFile, setHeroFile] = useState(null);
  const [heroPreview, setHeroPreview] = useState(null);
  const [saving, setSaving] = useState(false);
  const [msg, setMsg] = useState("");

  const load = () => {
    api.get("/projects/admin/projects/").then((res) => {
      const d = Array.isArray(res.data) ? res.data : res.data.results || [];
      setProjects(d);
    });
  };

  useEffect(load, []);

  const edit = (p) => {
    setSelected(p);
    setForm({
      title: p.title || "",
      slug: p.slug || "",
      category: p.category || "Residential",
      location: p.location || "Rameshwaram, Tamil Nadu",
      year: p.year || new Date().getFullYear(),
      short_description: p.short_description || "",
      overview: p.overview || "",
      design_concept: p.design_concept || "",
      materials: p.materials || "",
      status: p.status || "Planning",
      completion_percentage: p.completion_percentage || 0,
      current_phase: p.current_phase || "",
      featured: p.featured || false,
      is_public: p.is_public !== false,
    });
    setCoverFile(null);
    setCoverPreview(p.cover_image ? mediaUrl(p.cover_image) : null);
    setHeroFile(null);
    setHeroPreview(p.hero_image ? mediaUrl(p.hero_image) : null);
    setMsg("");
  };

  const create = () => {
    setSelected({ id: null });
    setForm(empty);
    setCoverFile(null);
    setCoverPreview(null);
    setHeroFile(null);
    setHeroPreview(null);
    setMsg("");
  };

  const handleCoverChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setCoverFile(file);
      setCoverPreview(URL.createObjectURL(file));
    }
  };

  const handleHeroChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setHeroFile(file);
      setHeroPreview(URL.createObjectURL(file));
    }
  };

  const save = async (e) => {
    e.preventDefault();
    setSaving(true);
    setMsg("");
    try {
      const formData = new FormData();
      Object.keys(form).forEach((key) => {
        formData.append(key, form[key]);
      });
      formData.set("year", Number(form.year) || new Date().getFullYear());
      formData.set("completion_percentage", Number(form.completion_percentage) || 0);

      if (coverFile) {
        formData.append("cover_image", coverFile);
      }
      if (heroFile) {
        formData.append("hero_image", heroFile);
      }

      let res;
      if (selected.id) {
        res = await api.patch(`/projects/admin/projects/${selected.id}/`, formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        setSelected(res.data);
      } else {
        res = await api.post("/projects/admin/projects/", formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        setSelected(res.data);
      }
      setMsg("Saved project and uploaded images successfully.");
      load();
    } catch (err) {
      setMsg("Save failed: " + (err.response?.data?.detail || "Validation error"));
    } finally {
      setSaving(false);
    }
  };

  const del = async (id) => {
    if (!window.confirm("Delete this project?")) return;
    try {
      await api.delete(`/projects/admin/projects/${id}/`);
      setSelected(null);
      load();
    } catch {
      setMsg("Delete failed.");
    }
  };

  return (
    <>
      <Seo title="Manage Projects | Admin" noindex />
      <div className="dash-pad">
        <header className="dash-head">
          <div>
            <h1 className="dash-title">Projects Catalogue</h1>
            <p className="muted">{projects.length} project(s) in database.</p>
          </div>
          <button className="btn btn--solid" onClick={create}>+ New project</button>
        </header>

        <div className="dash-cols admin-projects">
          <section className="dash-card admin-projects__list">
            {projects.map((p) => (
              <button
                key={p.id}
                className={`row-item focus-ring ${selected?.id === p.id ? "is-active" : ""}`}
                onClick={() => edit(p)}
              >
                <div style={{ display: "flex", alignItems: "center", gap: "0.8rem" }}>
                  {p.cover_image ? (
                    <img
                      src={mediaUrl(p.cover_image)}
                      alt={p.title}
                      style={{ width: "36px", height: "36px", borderRadius: "6px", objectFit: "cover" }}
                    />
                  ) : (
                    <div style={{ width: "36px", height: "36px", borderRadius: "6px", background: "var(--sand)", display: "grid", placeItems: "center" }}>
                      <ImageIcon size={18} className="muted" />
                    </div>
                  )}
                  <span>{p.title}</span>
                </div>
                <span className="muted">{p.category}</span>
              </button>
            ))}
          </section>

          <section className="dash-card">
            <h2 className="dash-card__title">
              {selected ? (selected.id ? "Edit project" : "New project") : "Select a project"}
            </h2>
            {msg && <div className={`form-note ${msg.startsWith("Saved") ? "form-note--ok" : "form-note--err"}`}>{msg}</div>}
            {selected && (
              <form onSubmit={save} className="admin-form">
                <div className="form-row">
                  <div className="field">
                    <label>Title</label>
                    <input className="focus-ring" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} required />
                  </div>
                  <div className="field">
                    <label>Slug</label>
                    <input className="focus-ring" value={form.slug} onChange={(e) => setForm({ ...form, slug: e.target.value })} required />
                  </div>
                </div>

                {/* File Upload Fields */}
                <div className="form-row">
                  <div className="field">
                    <label>Cover Image (Card Thumbnail)</label>
                    {coverPreview && (
                      <div style={{ marginBottom: "0.5rem" }}>
                        <img src={coverPreview} alt="Cover Preview" style={{ width: "100%", maxHeight: "140px", objectFit: "cover", borderRadius: "6px" }} />
                      </div>
                    )}
                    <input type="file" accept="image/*" className="focus-ring" onChange={handleCoverChange} />
                  </div>
                  <div className="field">
                    <label>Hero Image (Header Showcase)</label>
                    {heroPreview && (
                      <div style={{ marginBottom: "0.5rem" }}>
                        <img src={heroPreview} alt="Hero Preview" style={{ width: "100%", maxHeight: "140px", objectFit: "cover", borderRadius: "6px" }} />
                      </div>
                    )}
                    <input type="file" accept="image/*" className="focus-ring" onChange={handleHeroChange} />
                  </div>
                </div>

                <div className="form-row">
                  <div className="field">
                    <label>Category</label>
                    <select className="focus-ring" value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })}>
                      {["Residential", "Commercial", "Interiors", "Renovation"].map((x) => (
                        <option key={x}>{x}</option>
                      ))}
                    </select>
                  </div>
                  <div className="field">
                    <label>Status</label>
                    <select className="focus-ring" value={form.status} onChange={(e) => setForm({ ...form, status: e.target.value })}>
                      {["Planning", "In Progress", "Completed"].map((x) => (
                        <option key={x}>{x}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="form-row">
                  <div className="field">
                    <label>Location</label>
                    <input className="focus-ring" value={form.location} onChange={(e) => setForm({ ...form, location: e.target.value })} />
                  </div>
                  <div className="field">
                    <label>Year</label>
                    <input type="number" className="focus-ring" value={form.year} onChange={(e) => setForm({ ...form, year: e.target.value })} />
                  </div>
                </div>

                <div className="field">
                  <label>Short Description</label>
                  <textarea className="focus-ring" rows={2} value={form.short_description} onChange={(e) => setForm({ ...form, short_description: e.target.value })} />
                </div>
                <div className="field">
                  <label>Overview</label>
                  <textarea className="focus-ring" rows={3} value={form.overview} onChange={(e) => setForm({ ...form, overview: e.target.value })} />
                </div>
                <div className="field">
                  <label>Design Concept</label>
                  <textarea className="focus-ring" rows={3} value={form.design_concept} onChange={(e) => setForm({ ...form, design_concept: e.target.value })} />
                </div>
                <div className="field">
                  <label>Materials</label>
                  <textarea className="focus-ring" rows={2} value={form.materials} onChange={(e) => setForm({ ...form, materials: e.target.value })} />
                </div>

                <div className="form-row">
                  <div className="field">
                    <label>Completion %</label>
                    <input type="number" min={0} max={100} className="focus-ring" value={form.completion_percentage} onChange={(e) => setForm({ ...form, completion_percentage: e.target.value })} />
                  </div>
                  <div className="field">
                    <label>Current Phase</label>
                    <input className="focus-ring" value={form.current_phase} onChange={(e) => setForm({ ...form, current_phase: e.target.value })} />
                  </div>
                </div>

                <div className="form-check">
                  <label>
                    <input type="checkbox" checked={form.featured} onChange={(e) => setForm({ ...form, featured: e.target.checked })} /> Featured
                  </label>
                  <label>
                    <input type="checkbox" checked={form.is_public} onChange={(e) => setForm({ ...form, is_public: e.target.checked })} /> Public
                  </label>
                </div>

                <div className="admin-form__actions">
                  <button type="submit" className="btn btn--solid" disabled={saving}>
                    {saving ? "Saving & Uploading..." : "Save Project"}
                  </button>
                  {selected.id && (
                    <button type="button" className="btn btn--outline" onClick={() => del(selected.id)}>
                      Delete
                    </button>
                  )}
                </div>
              </form>
            )}
          </section>
        </div>
      </div>
    </>
  );
}