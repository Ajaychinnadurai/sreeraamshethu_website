import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import Reveal from "../components/Reveal";
import { ARCHITECTURAL_PROJECTS } from "../data/projectsData";
import { api, mediaUrl } from "../services/api";

const CATEGORIES = ["ALL", "INTERIORS", "RESIDENTIAL", "COMMERCIAL"];

export function SectionHeader() {
  return (
    <div className="proj-showcase__header">
      <div className="proj-showcase__header-title">
        <div className="proj-showcase__eyebrow-wrap">
          <span className="proj-showcase__eyebrow-line" />
          <span className="proj-showcase__eyebrow">SELECTED WORK</span>
        </div>
        <h2 className="proj-showcase__heading">Featured projects</h2>
      </div>

      <Link to="/projects" className="proj-showcase__header-link">
        <span>VIEW ALL PROJECTS</span>
        <svg
          width="18"
          height="18"
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
      </Link>
    </div>
  );
}

export function ProjectFilters({ activeFilter, onSelectFilter }) {
  return (
    <div className="proj-showcase__filters" role="tablist" aria-label="Project categories">
      {CATEGORIES.map((cat) => {
        const isActive = activeFilter === cat;
        return (
          <button
            key={cat}
            role="tab"
            aria-selected={isActive}
            onClick={() => onSelectFilter(cat)}
            className={`proj-showcase__filter-btn ${isActive ? "is-active" : ""}`}
          >
            <span>{cat}</span>
            {isActive && <span className="proj-showcase__filter-line" />}
          </button>
        );
      })}
    </div>
  );
}

export function ActiveProject({ project, totalCount, onNext, onPrev }) {
  const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const cardRef = useRef(null);

  const handleMouseMove = (e) => {
    if (!cardRef.current || window.innerWidth <= 768) return;
    const rect = cardRef.current.getBoundingClientRect();
    setCursorPos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  if (!project) return null;

  return (
    <div
      ref={cardRef}
      className="active-proj-card"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onMouseMove={handleMouseMove}
    >
      {/* Floating Cursor Control */}
      {isHovered && (
        <div
          className="active-proj-card__cursor"
          style={{
            transform: `translate3d(${cursorPos.x - 30}px, ${cursorPos.y - 30}px, 0)`,
          }}
        >
          <span className="cursor-arrow">↗</span>
          <span className="cursor-text">VIEW</span>
        </div>
      )}

      {/* Main Architectural Image Container */}
      <Link to={`/projects/${project.slug}`} className="active-proj-card__img-wrap">
        <img
          key={project.id}
          src={project.image}
          alt={project.title}
          loading="lazy"
          className="active-proj-card__img"
        />
        <div className="active-proj-card__overlay" />
        <span className="active-proj-card__cat-badge">{project.category}</span>
      </Link>

      {/* Project Meta Information */}
      <div className="active-proj-card__info">
        <div className="active-proj-card__counter">
          <span className="counter-current">{project.num || "01"}</span>
          <span className="counter-sep">/</span>
          <span className="counter-total">
            {totalCount < 10 ? `0${totalCount}` : totalCount}
          </span>
        </div>

        <h3 className="active-proj-card__title">
          <Link to={`/projects/${project.slug}`}>{project.title}</Link>
        </h3>

        <p className="active-proj-card__meta">
          {project.location} · {project.year}
        </p>

        <p className="active-proj-card__desc">{project.description}</p>

        <Link to={`/projects/${project.slug}`} className="active-proj-card__cta">
          <span>VIEW PROJECT</span>
          <span className="cta-line" />
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
        </Link>
      </div>
    </div>
  );
}

export function ProjectPreview({ projects, activeIndex, onSelectProject }) {
  return (
    <div className="proj-showcase__preview-list">
      {projects.map((p, idx) => {
        if (idx === activeIndex) return null;
        return (
          <div
            key={p.id}
            onClick={() => onSelectProject(idx)}
            className="preview-proj-card"
          >
            <div className="preview-proj-card__img-wrap">
              <img src={p.image} alt={p.title} loading="lazy" />
              <div className="preview-proj-card__overlay" />
              <span className="preview-proj-card__num">{p.num}</span>
            </div>
            <div className="preview-proj-card__info">
              <span className="preview-proj-card__cat">{p.category}</span>
              <h4 className="preview-proj-card__title">{p.title}</h4>
              <p className="preview-proj-card__loc">{p.year}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export function ProjectNavigation({ onPrev, onNext, isFirst, isLast }) {
  return (
    <div className="proj-showcase__nav">
      <button
        onClick={onPrev}
        disabled={isFirst}
        className="nav-arrow nav-arrow--prev"
        aria-label="Previous project"
      >
        <svg
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        >
          <polyline points="15 18 9 12 15 6" />
        </svg>
      </button>

      <button
        onClick={onNext}
        disabled={isLast}
        className="nav-arrow nav-arrow--next"
        aria-label="Next project"
      >
        <svg
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        >
          <polyline points="9 18 15 12 9 6" />
        </svg>
      </button>
    </div>
  );
}

export function ProjectProgress({ activeIndex, totalCount }) {
  const progressPercent = ((activeIndex + 1) / totalCount) * 100;

  return (
    <div className="proj-showcase__progress">
      <span className="progress-num">
        {activeIndex + 1 < 10 ? `0${activeIndex + 1}` : activeIndex + 1}
      </span>
      <div className="progress-bar-track">
        <div
          className="progress-bar-fill"
          style={{ width: `${progressPercent}%` }}
        />
      </div>
      <span className="progress-num">
        {totalCount < 10 ? `0${totalCount}` : totalCount}
      </span>
    </div>
  );
}

export function ViewAllProjects() {
  return (
    <div className="proj-showcase__bottom-cta">
      <Link to="/projects" className="bottom-cta-btn">
        <span>EXPLORE ALL ARCHITECTURAL PROJECTS</span>
        <svg
          width="18"
          height="18"
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
      </Link>
    </div>
  );
}

export default function FeaturedProjects() {
  const [projectsList, setProjectsList] = useState(ARCHITECTURAL_PROJECTS);
  const [activeFilter, setActiveFilter] = useState("ALL");
  const [activeIdx, setActiveIdx] = useState(0);
  const showcaseRef = useRef(null);

  // Sync real API projects if available
  useEffect(() => {
    let active = true;
    api
      .get("/projects/")
      .then((res) => {
        const data = Array.isArray(res.data) ? res.data : res.data.results || [];
        const featured = data.filter((p) => p.featured);
        if (active && featured.length > 0) {
          const formatted = featured.map((item, idx) => ({
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
          setProjectsList(formatted);
        }
      })
      .catch(() => {});
    return () => {
      active = false;
    };
  }, []);

  // Filter project list based on category tab
  const filteredProjects = projectsList.filter((p) => {
    if (activeFilter === "ALL") return true;
    return p.category?.toUpperCase() === activeFilter;
  });

  const displayProjects = filteredProjects.length > 0 ? filteredProjects : projectsList;
  const currentActiveProject = displayProjects[activeIdx] || displayProjects[0];

  const handleNext = () => {
    setActiveIdx((prev) => (prev + 1) % displayProjects.length);
  };

  const handlePrev = () => {
    setActiveIdx((prev) => (prev - 1 + displayProjects.length) % displayProjects.length);
  };

  const handleFilterChange = (category) => {
    setActiveFilter(category);
    setActiveIdx(0);
  };

  // Keyboard left/right navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!showcaseRef.current) return;
      const rect = showcaseRef.current.getBoundingClientRect();
      const inView = rect.top < window.innerHeight && rect.bottom > 0;
      if (!inView) return;

      if (e.key === "ArrowRight") handleNext();
      if (e.key === "ArrowLeft") handlePrev();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [displayProjects.length]);

  return (
    <section className="section proj-showcase-section" ref={showcaseRef}>
      {/* Background Architectural Grid Lines */}
      <div className="proj-showcase__blueprint-lines" aria-hidden="true">
        <div className="line-horizontal" />
        <div className="line-vertical" />
        <span className="blueprint-tag">PROJECT PORTFOLIO // SREE RAAM SHETHU</span>
      </div>

      <div className="container proj-showcase__container">
        <Reveal delay={0.05}>
          <SectionHeader />
        </Reveal>

        <Reveal delay={0.1}>
          <ProjectFilters
            activeFilter={activeFilter}
            onSelectFilter={handleFilterChange}
          />
        </Reveal>

        {/* Main Cinematic Showcase */}
        <Reveal delay={0.15}>
          <div className="proj-showcase__layout">
            <ActiveProject
              project={currentActiveProject}
              totalCount={displayProjects.length}
              onNext={handleNext}
              onPrev={handlePrev}
            />

            <div className="proj-showcase__sidebar">
              <ProjectPreview
                projects={displayProjects}
                activeIndex={activeIdx}
                onSelectProject={setActiveIdx}
              />
              <ProjectNavigation
                onPrev={handlePrev}
                onNext={handleNext}
                isFirst={activeIdx === 0}
                isLast={activeIdx === displayProjects.length - 1}
              />
            </div>
          </div>
        </Reveal>

        {/* Editorial Progress Bar */}
        <Reveal delay={0.2}>
          <ProjectProgress
            activeIndex={activeIdx}
            totalCount={displayProjects.length}
          />
        </Reveal>

        {/* Bottom View All Link */}
        <Reveal delay={0.25}>
          <ViewAllProjects />
        </Reveal>
      </div>
    </section>
  );
}