# GHaaS — Conceptual Hackathon MVP

**Short description**
GHaaS is a concept for a bilingual, mobile-first directory and citizen services hub for municipalities in Nepal. It helps citizens find government offices, learn how to complete common services, submit complaints with evidence, and view basic tender information. This repository contains a hackathon-level conceptual prototype, not a production system.

**Important note**
This project is meant for demonstration and prototyping only. Several integrations are intentionally mocked or simulated to keep the scope suitable for a 20 hour hackathon. Treat this as a proof of concept you can iterate on after the event.

---

## What you will find here
- A clear MVP definition that a small team can build and demo in a short timeframe.
- Mocked backend and frontend scaffolding suggestions and example SQL to populate the database with sample data.
- Notes on what to mock and what to implement for a convincing end-to-end demo.
- A short demo script tailored for hackathon judging.

---

## MVP features (hackathon scope)
- Office directory with basic contact info and geo location.
- One service page that explains procedure, documents required, and an auto-fill PDF export using a stored user profile.
- Complaint submission form that accepts images and returns a unique ticket ID. Admin panel to change ticket status is simulated.
 - Complaint submission form that accepts images and returns a unique ticket ID. Admin panel to change ticket status is simulated.
- One tender listing and a subscription mock to show alert functionality.
- Bilingual UI toggle: English and Nepali sample translations.

### Implemented in this repo
- Frontend (Next.js app router) with pages: `/offices`, `/office/[id]`, `/service/[id]`, `/complaint`, `/complaint/status/[ticketId]`, `/tenders`, `/tenders/[id]`
- Map on the home page using Leaflet with low-bandwidth toggle to skip map tiles
- Simple i18n toggle in the header (EN/NE) with example translations for nav labels
- Admin edit page at `/admin/edit/[id]` for offices; uses PUT `/api/offices/:id` with `x-api-key`
- Admin complaint status page at `/admin/complaints/[ticketId]` to update complaint status with `x-admin-key`
- Backend (Express + TypeScript) routes: offices, services, generate-pdf, complaints (multipart), tenders
- Basic PWA files: `public/manifest.json` and `public/sw.js` (cache-first for a few routes)

## Out of scope for the hackathon (to mock)
- Real SMS or IVR delivery. Use a console log or email mock instead.
- Real payment processing and official document submission. Use downloadable PDFs or simulated endpoints.
- Full authentication hardening and role-based access control. Basic auth or simulated admin login is enough for demo.
- Legal acceptance of generated PDFs by government departments. Clearly state that generated PDFs are pre-filled templates.

---

## Tech stack (recommended for prototype)
- Frontend: Next.js, React, TypeScript, Tailwind CSS
- Backend: Node.js, Express, TypeScript
- Database: PostgreSQL (Supabase recommended for quick hosting)
- Storage: Supabase Storage or S3-compatible local emulator
- Maps: Leaflet
- PDF generation: pdf-lib or server-side templating with Puppeteer

---

## Project structure (suggested)
```
/ (repo root)
  /apps
    /web        # Next.js frontend
    /api        # Express backend or serverless functions
  /migrations   # SQL migrations and sample data
  /scripts      # helper scripts to run local dev
  README.md
  copilot-instruction.md
  .env.example
```

---

## Quick start (mocked local demo)
These instructions are for a local, mocked demo that is easy to run during a hackathon.

1. Clone the repo
```bash
git clone git@github.com:your-org/civic-connect.git
cd civic-connect
```

2. Install dependencies (pnpm recommended)
```bash
pnpm install
```

3. Prepare the database
- Option A: Use Supabase and import `migrations/init.sql` sample data.
- Option B: Run a local Postgres and apply `/migrations/init.sql`.

4. Create `.env` from `.env.example` and set values. Use safe dummy keys for mocked providers.

5. Run backend and frontend
```bash
# backend
cd apps/api
pnpm dev

# frontend
cd ../web
pnpm dev
```

### Using npm (Windows-friendly)
If pnpm isn’t installed, you can use npm:
```bash
# backend
cd apps/api
npm install
npm run dev

# frontend
cd ../web
npm install
npm run dev
```

6. Open the frontend at http://localhost:3000 and follow the demo script below.

---

## Deployment (quick start)

### API (Render or Railway)
- Root: `apps/api`
- Build: `npm install && npm run build`
- Start: `npm start`
- Env: `PORT`, `ADMIN_API_KEY`, `NOTIFICATION_PROVIDER=mock`, `STORAGE_PROVIDER=local` (others optional)

### Web (Vercel)
- Root: `apps/web`
- Env: `NEXT_PUBLIC_API_BASE_URL` set to your deployed API URL
- Use default Next.js build settings

Post-deploy checks: open API `/api/health` and frontend routes `/`, `/offices`, `/complaint`, `/tenders`, `/admin/*`.

---

## Demo script (3 minute flow for judges)
1. Landing page and problem statement. Show the directory and explain the inclusion goals.
2. Search for a nearby office and open the office profile.
3. Open a service page, demonstrate the pre-filled form from a saved user profile, and export the pre-filled PDF.
4. Submit a complaint with an image and show the ticket ID and status page.
5. Show the admin view (mock) and change the ticket status to resolved. Show the public ticket status update.
6. Open the tender listing and subscribe (mock) to alerts.

Keep the demo human. Tell a short story about a citizen who needs to get a license or raise a sanitation issue and follow the platform end to end.

---

## API endpoints (MVP)
- GET /api/offices?page=1&limit=10
- GET /api/offices/:id
- GET /api/services/:id
- POST /api/complaints (multipart/form-data) - mocked storage
- GET /api/complaints/:ticketId
- GET /api/tenders
- POST /api/tenders/subscribe
- POST /api/generate-pdf
 - PUT /api/offices/:id (admin, requires header `x-api-key`)
 - PUT /api/complaints/:ticketId/status (admin, requires header `x-admin-key`)

When demonstrating, explain which endpoints are mocked and which are functional.

---

## Environment variables (.env.example)
```
DATABASE_URL=postgresql://user:pass@localhost:5432/civic
SUPABASE_URL=https://xyz.supabase.co
SUPABASE_KEY=public-anon-key
JWT_SECRET=your_jwt_secret
NOTIFICATION_PROVIDER=mock   # set to 'mock' for hackathon demo
STORAGE_PROVIDER=local       # or 'supabase'
ADMIN_API_KEY=change-me-strong
NEXT_PUBLIC_API_BASE_URL=http://localhost:3001
```

---

## HTTP demo (VS Code REST Client)
Use `scripts/requests.http` to exercise the API quickly.

Steps:
- Install the "REST Client" extension in VS Code.
- Open `scripts/requests.http`.
- Replace placeholders like `{{id}}`, `{{ticket}}`, and `{{tid}}` with real values from previous responses.
- Click "Send Request" above each block to run it against your local API.

This is handy during the demo to show the endpoints without switching tools.

---

## Sample data
Add a small set of sample offices and services in `/migrations/sample_data.sql`. Include a few towns and one municipal office with one service and one tender entry. Judges appreciate relatable, local examples.

---

## How to explain mocks vs real features to judges
Be transparent. Say the feature is mocked, explain how it would be integrated in production, name the provider or protocol (for example Twilio or Gov API), and show a diagram or short note on next steps. Judges value honesty and a clear path to production.

---

## Hackathon deliverables checklist
- [ ] Working frontend with directory and service page
- [ ] Complaint flow with image upload and ticketing UI
- [ ] Admin mock for ticket resolution
- [ ] Tender listing with subscription mock
- [ ] PDF auto-fill demo for one service
- [ ] Short demo script and slides

---

## Contribution guide
- Use feature branches and open a PR to `dev` branch
- Keep changes small and test the end-to-end flow before merging
- Commit messages should be clear. Example: `feat(offices): add sample offices seed` or `fix(api): validate complaint file size`

---

## License
This project is released under the MIT license. Use it freely for hackathon entries and prototypes. If you later intend to productize it, please consider the legal and privacy implications and get appropriate agreements with municipal partners.

---

## Contact
Project lead: Aashirwad Pandey
Email: add-your-email@example.com


Good luck with the hackathon. If you want I can now scaffold starter files for the frontend and backend or generate a zip you can drop into VS Code.

