import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Seo from "../components/Seo";
import Reveal from "../components/Reveal";
import { api, mediaUrl } from "../services/api";
import { breadcrumbSchema, SITE_URL } from "../utils/seo";
import { ARCHITECTURAL_PROJECTS } from "../data/projectsData";

const CATEGORIES = ["All", "Residential", "Commercial", "Interiors", "Renovation"];

export default function Projects() {
  const [projects, setProjects] = useState(ARCHITECTURAL_PROJECTS);
  const [loading, setLoading] = useState(true);
  const [cat, setCat] = useState("All");

  useEffect(() => {
    setLoading(true);
    let active = true;
    api
      .get("/projects/", { params: cat === "All" ? {} : { category: cat } })
      .then((res) => {
        const data = Array.isArray(res.data) ? res.data : res.data.results || [];
        if (!active) return;
        if (data.length > 0) {
          const formatted = data.map((item, idx) => ({
            id: item.id,
            slug: item.slug || `proj-${item.id}`,
            num: idx + 1 < 10 ? `0${idx + 1}` : `${idx + 1}`,
            title: item.title,
            category: item.category || "Architecture",
            location: item.location || "Rameswaram, Tamil Nadu",
            year: item.year || "2025",
            image: item.cover_url ? mediaUrl(item.cover_url) : ARCHITECTURAL_PROJECTS[idx % ARCHITECTURAL_PROJECTS.length].image,
            description: item.summary || item.description || ARCHITECTURAL_PROJECTS[idx % ARCHITECTURAL_PROJECTS.length].description,
          }));
          setProjects(formatted);
        } else {
          setProjects(
            cat === "All"
              ? ARCHITECTURAL_PROJECTS
              : ARCHITECTURAL_PROJECTS.filter((p) => p.category.toLowerCase() === cat.toLowerCase())
          );
        }
      })
      .catch(() => {
        if (active) {
          setProjects(
            cat === "All"
              ? ARCHITECTURAL_PROJECTS
              : ARCHITECTURAL_PROJECTS.filter((p) => p.category.toLowerCase() === cat.toLowerCase())
          );
        }
      })
      .finally(() => active && setLoading(false));

    return () => {
      active = false;
    };
  }, [cat]);

  const filtered = cat === "All" 
    ? projects 
    : projects.filter((p) => p.category.toLowerCase() === cat.toLowerCase());

  return (
    <>
      <Seo
        title="Architectural Projects | Sree Raam Shethu Constructions & Interiors, Rameshwaram"
        description="Explore luxury residential, commercial, interior and renovation projects by Sree Raam Shethu Constructions & Interiors in Rameshwaram, Tamil Nadu."
        canonical={`${SITE_URL}/projects`}
        jsonLd={breadcrumbSchema([{ name: "Home", path: "/" }, { name: "Projects", path: "/projects" }])}
      />

      {/* Page Hero */}
      <section className="page-hero">
        <div className="container page-hero__inner">
          <Reveal>
            <div className="page-hero__eyebrow-wrap">
              <span className="page-hero__eyebrow-line" />
              <span className="eyebrow">ARCHITECTURAL PORTFOLIO</span>
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <h1 className="display page-hero__title">
              Selected projects, <span className="accent">crafted in Rameshwaram.</span>
            </h1>
          </Reveal>
        </div>
      </section>

      {/* Projects Gallery Section */}
      <section className="section proj-gallery-section">
        <div className="container">
          {/* Category Filter Bar */}
          <div className="proj-gallery__filter-bar" role="tablist" aria-label="Filter projects by category">
            {CATEGORIES.map((c) => {
              const isActive = cat === c;
              return (
                <button
                  key={c}
                  role="tab"
                  aria-selected={isActive}
                  className={`proj-gallery__filter-chip ${isActive ? "is-active" : ""}`}
                  onClick={() => setCat(c)}
                >
                  {c}
                </button>
              );
            })}
          </div>

          {/* Projects Grid */}
          {loading ? (
            <div className="proj-gallery__grid">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div key={i} className="proj-gallery__skeleton-card" />
              ))}
            </div>
          ) : filtered.length === 0 ? (
            <div className="proj-gallery__empty">
              <p>No projects found in this category.</p>
            </div>
          ) : (
            <div className="proj-gallery__grid">
              {filtered.map((p, i) => (
                <Reveal key={p.id || i} delay={i * 0.05}>
                  <Link to={`/projects/${p.slug}`} className="proj-gallery__card">
                    <div className="proj-gallery__img-wrap">
                      <img src={p.image} alt={p.title} loading="lazy" className="proj-gallery__img" />
                      <div className="proj-gallery__overlay" />
                      <span className="proj-gallery__cat-badge">{p.category}</span>
                    </div>

                    <div className="proj-gallery__info">
                      <h3 className="proj-gallery__title">{p.title}</h3>
                      <p className="proj-gallery__meta">
                        {p.location} · {p.year || "2025"}
                      </p>
                      <span className="proj-gallery__cta">
                        <span>VIEW PROJECT</span>
                        <svg
                          width="16"
                          height="16"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <line x1="5" y1="12" x2="19" y2="12" />
                          <polyline points="12 5 19 12 12 19" />
                        </svg>
                      </span>
                    </div>
                  </Link>
                </Reveal>
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
}