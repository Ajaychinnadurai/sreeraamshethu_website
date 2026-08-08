import { useState } from "react";
import Seo from "../components/Seo";
import Reveal from "../components/Reveal";
import { api } from "../services/api";
import { breadcrumbSchema, localBusinessSchema, SITE_URL } from "../utils/seo";

const PROJECT_TYPES = ["Residential", "Commercial", "Interior", "Renovation", "Turnkey"];
const BUDGETS = ["Under ₹25L", "₹25L – ₹50L", "₹50L – ₹1 Cr", "₹1 Cr – ₹2 Cr", "Above ₹2 Cr"];

const initial = {
  full_name: "",
  phone: "",
  email: "",
  project_type: "Residential",
  location: "Rameshwaram",
  budget: "",
  project_description: "",
};

export default function Contact() {
  const [form, setForm] = useState(initial);
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));

  const validate = () => {
    const e = {};
    if (!form.full_name.trim()) e.full_name = "Name is required.";
    if (!/^[0-9+\-\s]{7,}$/.test(form.phone.trim())) e.phone = "Enter a valid phone number.";
    if (form.email && !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(form.email)) e.email = "Enter a valid email.";
    if (!form.project_description.trim()) e.project_description = "Tell us briefly about your project.";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const submit = async (e) => {
    e.preventDefault();
    if (!validate()) return;
    setSubmitting(true);
    setStatus(null);
    try {
      await api.post("/inquiries/create/", form);
      setStatus("sent");
      setForm(initial);
    } catch (err) {
      setStatus("error");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      <Seo
        title="Contact Sree Raam Shethu Constructions & Interiors | Rameshwaram"
        description="Get in touch with Sree Raam Shethu Constructions & Interiors in Rameshwaram, Tamil Nadu. Request a construction or interior quotation for residential, commercial, renovation and turnkey projects."
        canonical={`${SITE_URL}/contact`}
        jsonLd={[breadcrumbSchema([{ name: "Home", path: "/" }, { name: "Contact", path: "/contact" }]), localBusinessSchema()]}
      />
      <section className="page-hero">
        <div className="container page-hero__inner">
          <Reveal><span className="eyebrow">Contact</span></Reveal>
          <Reveal delay={0.1}>
            <h1 className="display page-hero__title">Let's plan your <span className="accent">next build.</span></h1>
          </Reveal>
        </div>
      </section>

      <section className="section contact-page">
        <div className="container contact-grid">
          <div className="contact-info">
            <Reveal>
              <h2 className="pd-h">Office</h2>
              <div className="contact-line"><span className="muted">Location</span><strong>Rameshwaram, Tamil Nadu, India</strong></div>
              <div className="contact-line"><span className="muted">Phone</span><a className="focus-ring" href="tel:+919566615030">+91 95666 15030</a></div>
              <div className="contact-line"><span className="muted">Email</span><a className="focus-ring" href="mailto:hello@sreeraamshethu.com">hello@sreeraamshethu.com</a></div>
              <h2 className="pd-h">Working hours</h2>
              <div className="contact-line"><span className="muted">Mon – Sat</span><strong>9:00 AM – 7:00 PM</strong></div>
              <div className="contact-line"><span className="muted">Sunday</span><strong>By appointment</strong></div>
            </Reveal>
            <Reveal delay={0.1}>
              <div className="map-frame">
                <iframe
                  title="Sree Raam Shethu Constructions & Interiors — Rameshwaram"
                  src="https://www.google.com/maps/embed?pb=Rameswaram"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
            </Reveal>
          </div>

          <div className="contact-form">
            <Reveal>
              <h2 className="pd-h">Send a project enquiry</h2>
            </Reveal>
            {status === "sent" && (
              <div className="form-note form-note--ok" role="status">Thank you! Your enquiry has been received. We'll get back to you shortly.</div>
            )}
            {status === "error" && (
              <div className="form-note form-note--err" role="alert">Something went wrong. Please try again or call us directly.</div>
            )}
            <form noValidate onSubmit={submit}>
              <div className="form-row">
                <div className="field">
                  <label htmlFor="full_name">Full Name</label>
                  <input id="full_name" className="focus-ring" value={form.full_name} onChange={set("full_name")} placeholder="Your name" />
                  {errors.full_name && <span className="field-err">{errors.full_name}</span>}
                </div>
                <div className="field">
                  <label htmlFor="phone">Phone Number</label>
                  <input id="phone" className="focus-ring" value={form.phone} onChange={set("phone")} placeholder="+91 ..." />
                  {errors.phone && <span className="field-err">{errors.phone}</span>}
                </div>
              </div>
              <div className="form-row">
                <div className="field">
                  <label htmlFor="email">Email</label>
                  <input id="email" type="email" className="focus-ring" value={form.email} onChange={set("email")} placeholder="you@example.com" />
                  {errors.email && <span className="field-err">{errors.email}</span>}
                </div>
                <div className="field">
                  <label htmlFor="project_type">Project Type</label>
                  <select id="project_type" className="focus-ring" value={form.project_type} onChange={set("project_type")}>
                    {PROJECT_TYPES.map((t) => <option key={t} value={t}>{t}</option>)}
                  </select>
                </div>
              </div>
              <div className="form-row">
                <div className="field">
                  <label htmlFor="location">Location</label>
                  <input id="location" className="focus-ring" value={form.location} onChange={set("location")} placeholder="Where is the project?" />
                </div>
                <div className="field">
                  <label htmlFor="budget">Estimated Budget</label>
                  <select id="budget" className="focus-ring" value={form.budget} onChange={set("budget")}>
                    <option value="">Select budget</option>
                    {BUDGETS.map((b) => <option key={b} value={b}>{b}</option>)}
                  </select>
                </div>
              </div>
              <div className="field">
                <label htmlFor="project_description">Project Description</label>
                <textarea id="project_description" rows={5} className="focus-ring" value={form.project_description} onChange={set("project_description")} placeholder="Tell us about your project..." />
                {errors.project_description && <span className="field-err">{errors.project_description}</span>}
              </div>
              <button type="submit" className="btn btn--solid focus-ring" disabled={submitting}>
                {submitting ? "Sending..." : "Send Project Enquiry"}
              </button>
            </form>
          </div>
        </div>
      </section>
    </>
  );
}