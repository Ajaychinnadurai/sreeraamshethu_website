import { useState, useEffect, useRef } from "react";
import SectionHeading from "../components/SectionHeading";
import Reveal from "../components/Reveal";
import Button from "../components/Button";
import { api, mediaUrl } from "../services/api";

const INITIAL_PROJECTS = [
  {
    id: "m-1",
    title: "Serene Villa Interiors",
    category: "Living Room",
    location: "Rameshwaram · 2025",
    image: "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "m-2",
    title: "The Coastal Residence",
    category: "Master Bedroom",
    location: "Rameshwaram · 2025",
    image: "https://images.unsplash.com/photo-1616594039964-ae9021a400a0?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "m-3",
    title: "Contemporary Modular Kitchen",
    category: "Modular Kitchen",
    location: "Rameshwaram · 2024",
    image: "https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "m-4",
    title: "Executive Office Suite",
    category: "Commercial Office",
    location: "Rameshwaram · 2025",
    image: "https://images.unsplash.com/photo-1524758631624-e2822e304c36?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "m-5",
    title: "Royal Heritage Villa",
    category: "Luxury Interiors",
    location: "Rameshwaram · 2025",
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "m-6",
    title: "Minimalist Studio Suite",
    category: "Modern Decor",
    location: "Rameshwaram · 2024",
    image: "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=800&q=80",
  },
];

export default function InteriorsSection({ isHome = false }) {
  const [projects, setProjects] = useState(INITIAL_PROJECTS);
  const marqueeRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

  // Fetch real interior projects from API if available
  useEffect(() => {
    let active = true;
    api
      .get("/projects/")
      .then((res) => {
        const data = Array.isArray(res.data) ? res.data : res.data.results || [];
        const interiors = data.filter(
          (p) => p.category?.toLowerCase() === "interiors" || p.category?.toLowerCase() === "interior"
        );
        if (active && interiors.length > 0) {
          const apiProjects = interiors.map((item, idx) => ({
            id: `api-${item.id || idx}`,
            title: item.title,
            category: item.category || "Interiors",
            location: `${item.location || "Rameshwaram"} · ${item.year || "2025"}`,
            image: item.cover_url ? mediaUrl(item.cover_url) : INITIAL_PROJECTS[idx % INITIAL_PROJECTS.length].image,
          }));
          if (apiProjects.length < 6) {
            setProjects([...apiProjects, ...INITIAL_PROJECTS.slice(apiProjects.length)]);
          } else {
            setProjects(apiProjects);
          }
        }
      })
      .catch(() => {});
    return () => {
      active = false;
    };
  }, []);

  // Mouse drag handlers for desktop interaction
  const handleMouseDown = (e) => {
    if (!marqueeRef.current) return;
    setIsDragging(true);
    setStartX(e.pageX - marqueeRef.current.offsetLeft);
    setScrollLeft(marqueeRef.current.scrollLeft);
  };

  const handleMouseLeaveOrUp = () => {
    setIsDragging(false);
  };

  const handleMouseMove = (e) => {
    if (!isDragging || !marqueeRef.current) return;
    e.preventDefault();
    const x = e.pageX - marqueeRef.current.offsetLeft;
    const walk = (x - startX) * 1.5;
    marqueeRef.current.scrollLeft = scrollLeft - walk;
  };

  // Quadruple track to guarantee 100% infinite coverage with zero empty gap
  const quadTrack = [...projects, ...projects, ...projects, ...projects];

  return (
    <section className={`section interiors-marquee-section ${isHome ? "interiors--home-dark" : ""}`}>
      <div className="container interiors__head">
        <SectionHeading
          eyebrow="Architectural Showcase"
          title={<>Bespoke Interiors <span className="accent">&amp; Craftsmanship</span></>}
        />
        <Reveal delay={0.15}>
          <Button to="/interiors" variant="outline">Explore Interiors</Button>
        </Reveal>
      </div>

      {/* Infinite Seamless Marquee Container */}
      <div
        className="marquee-container"
        ref={marqueeRef}
        onMouseDown={handleMouseDown}
        onMouseLeave={handleMouseLeaveOrUp}
        onMouseUp={handleMouseLeaveOrUp}
        onMouseMove={handleMouseMove}
      >
        <div className={`marquee-track ${isDragging ? "is-dragging" : ""}`}>
          {quadTrack.map((item, idx) => (
            <div key={`${item.id}-${idx}`} className="marquee-card">
              <div className="marquee-card__img-wrap">
                <img
                  src={item.image}
                  alt={item.title}
                  loading="lazy"
                  className="marquee-card__img"
                />
                <div className="marquee-card__overlay" />
                <span className="marquee-card__badge">{item.category}</span>
              </div>

              <div className="marquee-card__info">
                <h3 className="marquee-card__title">{item.title}</h3>
                <p className="marquee-card__loc">{item.location}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}