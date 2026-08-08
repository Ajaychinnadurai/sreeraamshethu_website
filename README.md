# Sree Raam Shethu Constructions & Interiors

A production-ready full-stack construction + interior-design platform for
**Sree Raam Shethu Constructions & Interiors**, Rameshwaram, Tamil Nadu.

- **Frontend:** React + Vite, React Router, Framer Motion, Lucide icons
- **Backend:** Django + Django REST Framework, JWT auth, PostgreSQL
- **Roles:** `ADMIN` and `CLIENT`, with protected routes and APIs

---

## Structure

```text
en/
├── frontend/          React single-page app
│   ├── src/pages/     public + dashboard pages
│   ├── src/sections/  home page sections
│   ├── src/components/ shared UI + animation primitives
│   ├── src/services/  axios API layer
│   └── src/context/   AuthContext
└── backend/           Django REST API
    ├── config/        project settings / urls
    ├── accounts/      custom User, ClientProfile, auth (register/login/me)
    ├── projects/      Project, images, milestones, updates, documents
    ├── inquiries/     public enquiry form + admin management
    ├── appointments/  client bookings + admin approval
    ├── testimonials/  published reviews + admin management
    └── dashboard/     aggregated client & admin dashboards, sitemap, robots
```

---

## 2. Backend setup

```bash
cd backend
python -m venv .venv
.venv\Scripts\activate          # Windows
pip install -r requirements.txt

# PostgreSQL (default). For quick local run without Postgres, set a SQLite URL:
copy .env.example .env          # then edit .env

python manage.py migrate
python manage.py seed_demo      # demo admin/client + projects + content
python manage.py runserver      # http://127.0.0.1:8000
```

Demo credentials (from `seed_demo`):
- Admin: `admin` / `admin@123456`
- Client: `client` / `client@123456`

`config/base.py` reads `backend/.env`. Set `DATABASE_URL=postgres://...` for
PostgreSQL in production, plus `SECRET_KEY`, `DEBUG=False`, `ALLOWED_HOSTS`,
`CORS_ALLOWED_ORIGINS`, `WHATSAPP_NUMBER`, `CONTACT_PHONE`, `CONTACT_EMAIL`,
`GA_MEASUREMENT_ID`, `GTM_ID`.

---

## 3. Frontend setup

```bash
cd frontend
npm install
npm run dev              # http://localhost:5173 (proxies /api + /media to :8000)
npm run build            # production build → frontend/dist
npm run preview
```

Set `VITE_API_BASE` in the Vite proxy style for dev (default `/api`) and
`VITE_API_ORIGIN` for absolute media URLs in production. See `.env.example`.

---

## 4. Key API routes

| Method | Path | Access |
| --- | --- | --- |
| POST | `/api/auth/login/` | public |
| POST | `/api/auth/register/` | public |
| GET/PATCH | `/api/auth/me/` | auth |
| GET | `/api/projects/` | public (is_public only) |
| GET | `/api/projects/<slug>/` | public |
| CRUD | `/api/projects/admin/projects/` | ADMIN |
| POST | `/api/inquiries/create/` | public |
| CRUD | `/api/inquiries/` | ADMIN |
| GET | `/api/testimonials/` | public (published) |
| CRUD | `/api/testimonials/` | ADMIN |
| GET | `/api/dashboard/client/` | CLIENT |
| GET | `/api/dashboard/admin/` | ADMIN |
| GET | `/api/dashboard/config/` | public |
| GET | `/api/dashboard/sitemap.xml/`, `/api/dashboard/robots.txt/` | public |

---

## 5. Frontend routes

- `/` Home
- `/about`, `/services`, `/projects`, `/projects/:slug`, `/interiors`, `/process`
- `/contact` enquiry form
- `/client/login`, `/admin/login`
- `/client/` client dashboard (protected)
- `/admin/`, `/admin/projects`, `/admin/clients`, `/admin/inquiries`,
  `/admin/appointments`, `/admin/testimonials` (protected, ADMIN)

---

## 6. SEO

- Per-page meta titles/descriptions, canonical URLs, Open Graph + Twitter cards
- JSON-LD: LocalBusiness, Organization, Service, Breadcrumb schemas
- `robots.txt` and `sitemap.xml` served by the backend at
  `/api/dashboard/robots.txt/` and `/api/dashboard/sitemap.xml/`
- Local keywords (builders in Rameshwaram, etc.) written naturally in copy,
  never stuffed.

---

## 7. Production checklist

1. `backend/.env` → `DEBUG=False`, real `SECRET_KEY`, PostgreSQL `DATABASE_URL`.
2. `collectstatic`, serve media, point `CORS_ALLOWED_ORIGINS` at the frontend host.
3. Set `VITE_API_ORIGIN`/`VITE_API_BASE`, run `npm run build`, host `frontend/dist`.
4. Add GA4 / GTM IDs via `GA_MEASUREMENT_ID` / `GTM_ID` (picked up by `/api/dashboard/config/`).
5. Set real `WHATSAPP_NUMBER`, `CONTACT_PHONE`, `CONTACT_EMAIL`.