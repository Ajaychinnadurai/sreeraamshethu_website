import { useEffect, useState } from "react";
import SectionHeading from "../components/SectionHeading";
import Reveal from "../components/Reveal";
import { api, mediaUrl } from "../services/api";

export default function Testimonials() {
  const [items, setItems] = useState([]);
  const [idx, setIdx] = useState(0);

  useEffect(() => {
    let active = true;
    api
      .get("/testimonials/")
      .then((res) => setItems(Array.isArray(res.data) ? res.data : res.data.results || []))
      .catch(() => setItems([]));
    return () => {
      active = false;
    };
  }, []);

  useEffect(() => {
    if (items.length < 2) return;
    const t = setInterval(() => setIdx((i) => (i + 1) % items.length), 6500);
    return () => clearInterval(t);
  }, [items.length]);

  const cur = items[idx];

  return (
    <section className="section testimonials">
      <div className="container">
        <SectionHeading eyebrow="Client voices" title="What clients say" />
        {cur ? (
          <Reveal className="testimonial" key={cur.id}>
            <blockquote className="testimonial__quote">“{cur.review}”</blockquote>
            <div className="testimonial__meta">
              {cur.image_url && (
                <img className="testimonial__avatar" src={mediaUrl(cur.image_url)} alt={cur.client_name} loading="lazy" />
              )}
              <div>
                <div className="testimonial__name">{cur.client_name}</div>
                <div className="muted">
                  {cur.project_type} · {cur.location}
                </div>
                <div className="testimonial__stars" aria-label={`${cur.rating} star rating`}>
                  {"★".repeat(cur.rating)}
                </div>
              </div>
            </div>
          </Reveal>
        ) : (
          <p className="muted">No testimonials yet.</p>
        )}
        <div className="testimonial__nav">
          {items.map((t, i) => (
            <button
              key={t.id}
              className={`test-dot ${i === idx ? "is-active" : ""}`}
              onClick={() => setIdx(i)}
              aria-label={`Show testimonial ${i + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}