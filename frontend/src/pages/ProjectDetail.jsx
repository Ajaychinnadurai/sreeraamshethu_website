import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import {
  ArrowLeft, Calendar, MapPin, Building2, CheckCircle2,
  Maximize2, X, ChevronLeft, ChevronRight,
  Sparkles, ArrowRight
} from "lucide-react";
import Seo from "../components/Seo";
import Reveal from "../components/Reveal";
import Button from "../components/Button";
import { api, mediaUrl } from "../services/api";
import { breadcrumbSchema, SITE_URL } from "../utils/seo";
import { ARCHITECTURAL_PROJECTS } from "../data/projectsData";

export default function ProjectDetail() {
  const { slug } = useParams();
  const [p, setP] = useState(null);
  const [related, setRelated] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeImgIdx, setActiveImgIdx] = useState(null);

  useEffect(() => {
    let active = true;
    setLoading(true);

    // Helper to find local fallback matching slug
    const localMatch = ARCHITECTURAL_PROJECTS.find((x) => x.slug === slug) || ARCHITECTURAL_PROJECTS[0];

    api
      .get(`/projects/${slug}/`)
      .then((res) => {
        if (!active) return;
        const data = res.data;
        setP({
          ...localMatch,
          ...data,
          title: data.title || localMatch.title,
          category: data.category || localMatch.category,
          location: data.location || localMatch.location,
          year: data.year || localMatch.year,
          overview: data.overview || localMatch.overview,
          design_concept: data.design_concept || localMatch.design_concept,
          materials: data.materials || localMatch.materials,
          area_sqft: data.area_sqft || localMatch.area_sqft,
          status: data.status || localMatch.status,
          images: data.images && data.images.length > 0 ? data.images : localMatch.images,
        });

        // Fetch related projects
        api
          .get("/projects/")
          .then((r) => {
            const all = Array.isArray(r.data) ? r.data : r.data.results || [];
            const rel = all.filter((x) => x.slug !== slug).slice(0, 3);
            if (active) setRelated(rel.length > 0 ? rel : ARCHITECTURAL_PROJECTS.filter((x) => x.slug !== slug));
          })
          .catch(() => {
            if (active) setRelated(ARCHITECTURAL_PROJECTS.filter((x) => x.slug !== slug));
          });
      })
      .catch(() => {
        if (!active) return;
        setP(localMatch);
        setRelated(ARCHITECTURAL_PROJECTS.filter((x) => x.slug !== slug));
      })
      .finally(() => active && setLoading(false));

    return () => {
      active = false;
    };
  }, [slug]);

  if (loading) {
    return (
      <div className="page-loader" style={{ minHeight: "60vh", display: "grid", placeItems: "center" }}>
        <div className="pd-loading-spinner">
          <span className="pd-spinner-text">SREE RAAM SHETHU</span>
        </div>
      </div>
    );
  }

  if (!p) {
    return (
      <section className="page-hero">
        <div className="container page-hero__inner">
          <h1 className="display">Project not found.</h1>
          <Link to="/projects" className="btn btn--solid" style={{ marginTop: "1rem" }}>
            Back to All Projects
          </Link>
        </div>
      </section>
    );
  }

  const hero = p.hero_url || p.cover_url || p.image;
  const galleryImages = p.images && p.images.length > 0 ? p.images : [];

  return (
    <>
      <Seo
        title={`${p.title} | Architectural Showcase | Sree Raam Shethu`}
        description={p.short_description || p.overview || p.description}
        image={hero ? mediaUrl(hero) : undefined}
        canonical={`${SITE_URL}/projects/${p.slug}`}
        jsonLd={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Projects", path: "/projects" },
          { name: p.title, path: `/projects/${p.slug}` },
        ])}
      />

      <article className="project-detail pd-enhanced">
        {/* Architectural Breadcrumbs */}
        <div className="container pd-breadcrumbs-wrap">
          <Link to="/projects" className="pd-back-btn">
            <ArrowLeft size={16} /> BACK TO PORTFOLIO
          </Link>
          <div className="pd-breadcrumbs">
            <Link to="/">Home</Link>
            <span className="sep">/</span>
            <Link to="/projects">Projects</Link>
            <span className="sep">/</span>
            <span className="current">{p.title}</span>
          </div>
        </div>

        {/* Hero Header */}
        <header className="pd-hero container">
          <div className="pd-hero__header">
            <div className="pd-hero__badges">
              <span className="pd-badge pd-badge--cat">{p.category}</span>
              <span className={`pd-badge ${p.status === "Completed" ? "pd-badge--completed" : "pd-badge--progress"}`}>
                <CheckCircle2 size={13} /> {p.status || "Completed"}
              </span>
            </div>

            <h1 className="display pd-hero__title">{p.title}</h1>
            <p className="pd-hero__desc">{p.short_description || p.description}</p>

            <div className="pd-hero__meta-bar">
              <div className="pd-meta-item">
                <MapPin size={16} className="pd-meta-icon" />
                <span>{p.location || "Rameswaram, Tamil Nadu"}</span>
              </div>
              <div className="pd-meta-item">
                <Calendar size={16} className="pd-meta-icon" />
                <span>Year: {p.year || "2025"}</span>
              </div>
              {p.area_sqft && (
                <div className="pd-meta-item">
                  <Building2 size={16} className="pd-meta-icon" />
                  <span>{Number(p.area_sqft).toLocaleString("en-IN")} sq.ft</span>
                </div>
              )}
            </div>
          </div>

          {hero && (
            <div className="pd-hero__media-card">
              <img src={mediaUrl(hero)} alt={p.title} className="pd-hero__img" />
              <div className="pd-hero__media-overlay" />
            </div>
          )}
        </header>

        {/* Body Grid Section */}
        <section className="section pd-body">
          <div className="container pd-grid">
            {/* Left Specifications Card */}
            <aside className="pd-facts-card">
              <h3 className="pd-facts-title">Project Specifications</h3>

              <div className="pd-fact">
                <span className="pd-fact-label">Category</span>
                <strong className="pd-fact-val">{p.category}</strong>
              </div>

              <div className="pd-fact">
                <span className="pd-fact-label">Location</span>
                <strong className="pd-fact-val">{p.location}</strong>
              </div>

              <div className="pd-fact">
                <span className="pd-fact-label">Year Completed</span>
                <strong className="pd-fact-val">{p.year || "2025"}</strong>
              </div>

              {p.area_sqft && (
                <div className="pd-fact">
                  <span className="pd-fact-label">Total Area</span>
                  <strong className="pd-fact-val">{Number(p.area_sqft).toLocaleString("en-IN")} sq.ft</strong>
                </div>
              )}

              {p.duration_months && (
                <div className="pd-fact">
                  <span className="pd-fact-label">Execution Duration</span>
                  <strong className="pd-fact-val">{p.duration_months} Months</strong>
                </div>
              )}

              <div className="pd-fact">
                <span className="pd-fact-label">Execution Status</span>
                <strong className="pd-fact-val">{p.status || "Completed"}</strong>
              </div>

              {p.completion_percentage !== undefined && (
                <div className="pd-fact pd-fact--progress">
                  <div className="pd-fact-label-row">
                    <span>Completion</span>
                    <strong>{p.completion_percentage}%</strong>
                  </div>
                  <div className="pd-progress-track">
                    <div className="pd-progress-fill" style={{ width: `${p.completion_percentage}%` }} />
                  </div>
                </div>
              )}

              {p.scope && (
                <div className="pd-fact">
                  <span className="pd-fact-label">Scope of Work</span>
                  <p className="pd-fact-text">{p.scope}</p>
                </div>
              )}

              <div className="pd-facts-cta">
                <p className="muted-text">
                  Require architectural planning, interior styling, or turnkey construction for a similar project?
                </p>
                <Button to="/contact" variant="solid" className="pd-facts-btn">
                  Enquire for Similar Project
                </Button>
              </div>
            </aside>

            {/* Right Main Editorial Story */}
            <div className="pd-copy">
              {p.overview && (
                <Reveal className="pd-section-block">
                  <h2 className="pd-h">Project Overview</h2>
                  <p className="pd-p">{p.overview}</p>
                </Reveal>
              )}

              {p.design_concept && (
                <Reveal className="pd-section-block">
                  <h2 className="pd-h">Design &amp; Architecture Concept</h2>
                  <p className="pd-p">{p.design_concept}</p>
                </Reveal>
              )}

              {p.materials && (
                <Reveal className="pd-section-block">
                  <h2 className="pd-h">Materials &amp; Quality Craftsmanship</h2>
                  <p className="pd-p">{p.materials}</p>
                </Reveal>
              )}

              <Reveal className="pd-section-block pd-highlights-box">
                <h3>
                  <Sparkles size={18} className="pd-icon-accent" /> Key Features &amp; Execution Highlights
                </h3>
                <ul className="pd-highlights-list">
                  <li>Custom spatial layout optimization designed for acoustics, natural light, and ventilation.</li>
                  <li>Engineered with weather-sealed joinery and high-durability coastal materials.</li>
                  <li>Turnkey execution by Sree Raam Shethu site engineers and master craftsmen.</li>
                </ul>
              </Reveal>
            </div>
          </div>
        </section>

        {/* Gallery Showcase */}
        {galleryImages.length > 0 && (
          <section className="section pd-gallery-sec">
            <div className="container">
              <Reveal>
                <div className="pd-gallery-head">
                  <h2 className="pd-h">Project Gallery</h2>
                  <p className="muted">Click any image to expand full-screen view</p>
                </div>
              </Reveal>

              <div className="pd-gallery-grid">
                {galleryImages.map((img, i) => (
                  <Reveal key={img.id || i} delay={i * 0.05} className="pd-gallery-item">
                    <button
                      type="button"
                      className="pd-gallery-btn"
                      onClick={() => setActiveImgIdx(i)}
                    >
                      <img src={mediaUrl(img.url || img.image || img)} alt={img.alt || p.title} loading="lazy" />
                      <div className="pd-gallery-zoom-badge">
                        <Maximize2 size={16} />
                        <span>EXPAND</span>
                      </div>
                    </button>
                  </Reveal>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Interactive Lightbox Modal */}
        {activeImgIdx !== null && galleryImages[activeImgIdx] && (
          <div className="pd-lightbox-overlay" onClick={() => setActiveImgIdx(null)}>
            <div className="pd-lightbox-content" onClick={(e) => e.stopPropagation()}>
              <button className="pd-lightbox-close" onClick={() => setActiveImgIdx(null)}>
                <X size={24} />
              </button>

              <img
                src={mediaUrl(galleryImages[activeImgIdx].url || galleryImages[activeImgIdx].image || galleryImages[activeImgIdx])}
                alt={galleryImages[activeImgIdx].alt || p.title}
                className="pd-lightbox-img"
              />

              {galleryImages.length > 1 && (
                <>
                  <button
                    className="pd-lightbox-arrow pd-lightbox-arrow--prev"
                    onClick={() => setActiveImgIdx((activeImgIdx - 1 + galleryImages.length) % galleryImages.length)}
                  >
                    <ChevronLeft size={28} />
                  </button>
                  <button
                    className="pd-lightbox-arrow pd-lightbox-arrow--next"
                    onClick={() => setActiveImgIdx((activeImgIdx + 1) % galleryImages.length)}
                  >
                    <ChevronRight size={28} />
                  </button>
                </>
              )}
            </div>
          </div>
        )}

        {/* Related Architectural Projects */}
        {related.length > 0 && (
          <section className="section pd-related">
            <div className="container">
              <Reveal>
                <div className="pd-related-head">
                  <h2 className="pd-h">Explore Similar Projects</h2>
                </div>
              </Reveal>
              <div className="proj-gallery__grid">
                {related.map((r, i) => (
                  <Reveal key={r.id || i} delay={i * 0.08}>
                    <Link to={`/projects/${r.slug}`} className="proj-gallery__card">
                      <div className="proj-gallery__img-wrap">
                        <img src={mediaUrl(r.cover_url || r.image)} alt={r.title} loading="lazy" className="proj-gallery__img" />
                        <span className="proj-gallery__cat-badge">{r.category}</span>
                      </div>
                      <div className="proj-gallery__info">
                        <h3 className="proj-gallery__title">{r.title}</h3>
                        <span className="proj-gallery__cta">
                          <span>VIEW PROJECT</span>
                          <ArrowRight size={14} />
                        </span>
                      </div>
                    </Link>
                  </Reveal>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Bottom CTA Banner */}
        <section className="pd-cta-banner">
          <div className="container pd-cta-banner__inner">
            <Reveal>
              <span className="eyebrow" style={{ color: "#D99A16" }}>READY TO BUILD YOUR VISION?</span>
              <h2 className="display" style={{ marginTop: "0.5rem" }}>Have a similar construction or interior project?</h2>
              <p className="muted" style={{ maxWidth: "36rem", margin: "0.8rem auto 1.8rem" }}>
                Consult with Sree Raam Shethu experts for turnkey architectural planning, coastal engineering, and custom interior execution in Rameshwaram.
              </p>
            </Reveal>
            <Reveal delay={0.1}>
              <Button to="/contact" variant="solid" className="pd-cta-btn">
                Schedule Project Consultation
              </Button>
            </Reveal>
          </div>
        </section>
      </article>
    </>
  );
}