# Complete Build Prompt — Construction & Interior Design Platform

Use this as a full specification to build the site. It covers the public marketing website, authentication, the client portal, and the admin panel — frontend and backend.

---

## 1. Project Overview

Build a full-stack web application for a company that provides **both construction and interior design services**, combined under one roof. The site has two audiences:

1. **Public visitors** → should convert into leads (inquiries).
2. **Two logged-in roles** → **Client** (customers with an active or past project) and **Admin** (the company, managing everything).

**Design bar:** Apple.com-level — minimal, confident, huge whitespace, real project photography as the hero (never stock photos or decorative icons doing the talking), one accent color, restrained motion, obsessively consistent spacing and typography. No generic "corporate template" look — no carousel sliders stuffed with icons, no clipart, no lorem-ipsum-shaped copy.

**Non-negotiable content rule:** every piece of content — company name, services, project case studies, team bios, testimonials, pricing bands, addresses, phone numbers — must be **real and original**, supplied by the business owner. Do not invent fake client names, fake testimonials, fake project photos, or duplicate/boilerplate service descriptions copied from competitor sites. If real content isn't available yet for a section, mark it clearly as a placeholder to be replaced (e.g. `[INSERT REAL PROJECT PHOTOS — MIN 5 PER CATEGORY]`) rather than filling it with generic filler text.

---

## 2. Brand & Design System

- **Palette:** one neutral base (warm off-white `#FAFAF8` or deep charcoal `#1A1A1A` for dark sections) + exactly one accent color (e.g. terracotta, deep forest green, or brass/gold) used only for CTAs and key highlights. No rainbow of "category colors."
- **Typography:** one high-contrast display typeface for headlines (e.g. a serif or a bold grotesk like Söhne/General Sans), one clean sans for body (e.g. Inter). Large type sizes, generous line-height, no more than 2 font families total.
- **Spacing:** section padding minimum 96–140px on desktop, 48–64px on mobile. Never crowd elements — whitespace is a design decision, not empty space to fill.
- **Imagery:** full-bleed, high-resolution, color-graded consistently across all photos. No mixed photo styles/qualities on the same page.
- **Motion:** subtle scroll-reveal and hover states only. No spinning icons, no auto-playing carousels, no bounce animations.
- **Icons:** minimal, single-weight, used sparingly — never as a substitute for real content.

---

## 3. Public Website — Pages & Requirements

| Page | Purpose | Key requirements |
|---|---|---|
| **Home** | Convert visitors into leads | Full-bleed hero with real best project photo, one-line positioning statement, 3–4 scroll sections (differentiator, featured project, process teaser), persistent "Start a Project" CTA |
| **Projects (Portfolio)** | Build trust through real work | Filterable grid: Residential / Commercial / Interior-only / Full build. Every project must be a real completed project. |
| **Project Detail** | Convert on proof | Before/during/after real photos, real narrative (scope, honest timeline, honest budget band if the business is comfortable sharing), CTA to start a similar project |
| **Services → Construction** | Explain the offer | Address real client concerns (accountability, timelines, quality control) — not a generic bullet list |
| **Services → Interior Design** | Explain the offer | Same — real process, real materials/vendors used if relevant |
| **Process** | Reduce inquiry friction | Visual 4–5 step real process: Consultation → Design → Build → Handoff, with realistic timeframes |
| **About** | Credibility | Real team photos and bios, real credentials/licenses, real years-in-business, real company story |
| **Contact / Start a Project** | Lead capture | Short form: name, phone, email, project type, budget band (dropdown, not free text), timeline. Also show phone/WhatsApp click-to-contact and a real business address with map |

---

## 4. Authentication & Roles

Build a **proper, secure login/signup system** — the standard pattern used by professional SaaS products:

- **Signup:** email + password (min 8 chars, complexity check) OR OAuth (Google) as an option. Email verification required before full access.
- **Login:** email/password with "Forgot password" flow (secure token-based reset via email, expiring link).
- **Password storage:** hashed with bcrypt or argon2 — never plaintext, never reversible encryption.
- **Sessions:** JWT access token (short-lived, ~15 min) + refresh token (httpOnly, secure cookie, longer-lived) — not tokens stored in localStorage.
- **Rate limiting** on login/signup endpoints to prevent brute force.
- **Role field** on the user record: `client` or `admin`. Role determines which dashboard the user is routed to after login and which API routes they can access.
- **Route protection:** every client-portal and admin-panel route must verify the JWT server-side and check the role — never rely on hiding UI elements client-side alone.
- **Account states:** support email-verified/unverified, active/suspended (so admin can disable a client account if needed).

---

## 5. Client Portal (after client login)

The client role gets a dashboard covering **all of the following**:

1. **Project status & timeline** — visual progress tracker (e.g. Consultation → Design Approved → Construction → Interior Fit-out → Handoff) tied to their actual project, updated by admin.
2. **Documents** — view and download real documents tied to their project: quotes, contracts, invoices, design mockups/renders. Secure file storage, access limited to that client's own files only.
3. **Inquiry/project submission & tracking** — a client can submit a new inquiry (for an additional project) and see its status (New → Reviewed → Quoted → Converted).
4. **Profile** — update contact details, change password.
5. **Messages/updates** (recommended addition) — a simple update log/notes thread from admin so the client isn't just staring at a static status bar (e.g. "Site inspection completed 12 Aug" posted by admin, visible to the client).

---

## 6. Admin Panel (after admin login)

Full admin — the admin role manages **everything**:

1. **Leads/Inquiries** — table of all public-site and client-submitted inquiries, with status pipeline (New → Contacted → Quoted → Won/Lost), filter/sort, and notes per lead.
2. **Projects** — create a project from a won lead, assign status/timeline stages, update progress (which reflects live in the client's portal), upload documents (quotes, contracts, invoices) tied to that project/client.
3. **Portfolio/content management** — add, edit, remove projects shown on the public Projects page (title, category, photos, description, real completion date) without needing a developer — a lightweight CMS panel.
4. **Client accounts** — view all client accounts, see which project(s) each is tied to, suspend/reactivate accounts, manually create a client account (e.g. after a phone-based sale) and send them an invite email to set their password.
5. **Dashboard overview** — at-a-glance metrics: new leads this week, active projects, conversion rate lead→won.

---

## 7. Technical Stack (recommended)

- **Frontend:** React (Next.js recommended for SEO on the public pages + easy routing between public/portal/admin sections). Tailwind CSS for the design system, kept disciplined to the palette/type rules in Section 2.
- **Backend:** Node.js + Express (or Next.js API routes / Nest.js), REST or tRPC.
- **Database:** PostgreSQL (relational fits leads → projects → documents → clients well). Prisma or Drizzle as ORM.
- **File storage:** S3-compatible storage (AWS S3 / Cloudflare R2) for project photos and client documents — never store large files directly in the database.
- **Auth:** either hand-rolled JWT (per Section 4) or a managed auth provider (Clerk, Auth0, Supabase Auth) if you want to move faster and offload security hardening.
- **Email:** transactional email service (Resend, SendGrid, Postmark) for verification, password reset, and lead notification emails.
- **Hosting:** Vercel (frontend/Next.js) + a managed Postgres (Supabase, Neon, RDS).

---

## 8. Database Schema (core tables)

```
users (id, name, email, password_hash, role[client|admin], email_verified, status, created_at)
leads (id, name, phone, email, project_type, budget_band, timeline, message, status, source, created_at)
projects (id, client_id → users.id, lead_id → leads.id, title, category, status_stage, start_date, target_end_date, created_at)
project_updates (id, project_id, note, created_by → users.id, created_at)
documents (id, project_id, uploaded_by, file_url, doc_type[quote|contract|invoice|render], created_at)
portfolio_items (id, title, category, description, cover_image_url, gallery_urls[], completed_date, is_published)
```

---

## 9. Responsiveness & Device Support

- **Mobile-first build**, tested at minimum: 375px (small phone), 768px (tablet), 1024px, 1440px, 1920px (desktop).
- Navigation collapses to a clean full-screen mobile menu (not a cramped hamburger dropdown).
- All forms, tables (in admin), and document viewers must be fully usable on mobile — admin will likely check leads from a phone.
- Touch targets minimum 44x44px on mobile.
- Images served responsively (srcset / Next.js Image component) — never ship desktop-sized images to mobile.

---

## 10. Security & Non-Functional Requirements

- HTTPS everywhere, secure headers (CSP, HSTS).
- Input validation and sanitization on every form (client + server side).
- File upload validation (type/size limits) on document uploads.
- Role-based access control enforced on every API route, not just in the UI.
- Audit log on admin actions that affect client data (status changes, document uploads) — good practice for a business handling client contracts/invoices.
- Page load performance: target Lighthouse score 90+ on the public site (this affects both UX and lead conversion).
- Basic on-page SEO: meta titles/descriptions per page, structured data for local business, sitemap.xml.

---

## 11. Real Content Checklist (fill before launch — do not launch with placeholders)

- [ ] Real company name, logo, and legal business details
- [ ] Real brand colors (or approve the recommended palette)
- [ ] Minimum 5 real completed projects with professional photos per category
- [ ] Real team bios and photos
- [ ] Real licenses/certifications, years in business
- [ ] Real service area, address, phone, WhatsApp number
- [ ] Real, honest process timeline (not aspirational)
- [ ] Real testimonials with client permission (name + project, not anonymous "Client, Chennai")

---

## 12. Deliverables

1. Public marketing site (all pages in Section 3), fully responsive
2. Auth system (signup, login, verification, password reset)
3. Client portal (Section 5)
4. Admin panel (Section 6)
5. Database + backend API per Sections 7–8
6. Deployment to production hosting with real domain + SSL
