# copilot-instruction.md

This document is written for you to use with GitHub Copilot in VS Code (Copilot Chat and Copilot Suggestions). It explains how to get started, how to prompt Copilot to generate parts of the project, and gives safe, repeatable prompts to speed development. It also includes a 20-hour sprint plan and checklist so you can ship a clean hackathon MVP.

---

## Project quick reminder
Name: GHaaS (Directory + Citizen Services Hub)
Goal: Allow citizens to find government offices, follow procedures, submit complaints with evidence, and track tenders. Mobile first. Bilingual (Nepali/English). Low-bandwidth friendly.

Core MVP: Office directory, one service flow with auto-fill PDF export, complaint ticketing with image upload and public tracking ID, one tender listing with subscription mock.

Tech stack (recommended):
- Frontend: Next.js (React) with i18n
- Backend: Node.js + Express or serverless functions
- Database: PostgreSQL (Supabase recommended for speed)
- Storage: Supabase Storage or Firebase Storage
- Maps: Leaflet
- Auth: Supabase Auth (email + phone OTP)
- PDF generation: pdf-lib or server-side templates (Handlebars + wkhtmltopdf alternative)
- Notifications: Twilio (mock in hackathon)


---

## How to use GitHub Copilot effectively in VS Code

### 1. Use Copilot Chat for architectural and scaffold asks
Open Copilot Chat and ask high-level questions. Good first prompts:
- "Create a Next.js 14 project scaffold for a civic services directory. Include pages: /, /office/[id], /service/[id], /complaint, /tenders. Use TypeScript and React."
- "Generate a minimal Express API with endpoints for offices, services, complaints, and tenders. Use TypeScript and PostgreSQL. Show db schema and sample queries."

Ask Copilot Chat to output file structure and `package.json` scripts first. Then ask for one file at a time.

### 2. Use inline Copilot suggestions for component code
For UI components, highlight a comment describing the component and press the Copilot suggestion key. Example comment:

```tsx
// Component: OfficeCard
// Props: {id: string, name: string, address: string, phone: string, tags: string[]}
// Should show call and directions buttons and adapt to mobile
```

Copilot will provide a suggested implementation. Accept or iterate by adding more constraints.

### 3. Use Copilot for tests and API contract examples
Ask Copilot to generate Jest tests or Playwright scenarios. Example prompt:

"Generate Jest + Supertest tests for POST /api/complaints. Validate file upload, geolocation, required fields, and response format."

### 4. Use Copilot to write commit messages and PR descriptions
Copy your diff and ask Copilot Chat: "Write a concise commit message for these changes and a PR description with summary, change list, and testing steps." This speeds up clear commits.

### 5. Use specific, short prompts for faster, more accurate code
Prefer short explicit prompts rather than broad ones. Instead of "create office API" say exactly what you want:

"Create GET /api/offices?page=1&limit=10 that returns paginated offices with fields id, name, phone, address, lat, lng, services[]. Use pg and express."


---

## Copilot-ready prompts you can paste (copy-paste)

### Scaffolding
```
Create a Next.js 14 project scaffold in TypeScript for a civic directory. Include pages: /, /office/[id], /service/[id], /complaint, /tenders. Add Tailwind CSS, i18n support, and a basic layout component with header and footer. Output only file contents as code blocks for each file.
```

### API backend scaffold
```
Generate an Express TypeScript backend with these endpoints:
GET /api/offices
GET /api/offices/:id
POST /api/complaints
GET /api/complaints/:id
GET /api/tenders
Include data validation using zod, and a simple Postgres client using pg. Provide db schema SQL for tables: offices, services, complaints, tenders, users.
```

### Database schema
```
Write SQL for Postgres to create the following tables: offices, services, tenders, complaints, users. Include useful indexes for geo queries (PostGIS optional), and constraints. Output as a single SQL script.
```

### PDF auto-fill
```
Create a server-side endpoint POST /api/generate-pdf that accepts user profile data and service id, merges with a Handlebars template to produce a downloadable PDF. Use pdf-lib or puppeteer. Include TypeScript types.
```

### Complaint ticketing
```
Implement POST /api/complaints to accept multipart/form-data: {title, description, office_id, lat, lng, files[]}. Store files to Supabase Storage. Generate unique ticket id (CIV-YYYYMMDD-XXXX) and return ticket URL. Include server-side validation and tests.
```

### Mock SMS/IVR
```
Create a notification module that can send SMS via Twilio. Also create a mock provider that logs messages to DB and prints to console. Export a function notifyUser(phone, message) that chooses provider based on env.
```

### Map integration
```
Create a reusable React component <OfficeMap pins=[{id,name,lat,lng}] /> using Leaflet. Include cluster support and click handler that opens office card side panel.
```

### i18n support
```
Add next-i18next configuration for English and Nepali. Show an example page that switches languages and loads translations from /locales.
```

### Unit and integration tests
```
Add Jest + ts-jest for backend tests and Playwright for E2E. Provide one Jest test for POST /api/complaints and one Playwright script for submitting a complaint via the web form.
```


---

## Best practices for Copilot collaboration
- Narrow prompts. The more specific you are, the better suggestions you get.
- Iterate. Accept suggestions then refine in small steps.
- Security sanity-check. Always review generated code for injection, auth, and data leakage.
- Add types. TypeScript reduces hallucinations and guides Copilot.
- Use test-first prompts. Ask Copilot to generate tests alongside features.
- Store prompt history. Keep a local file of prompts that worked well for future sprints.


---

## 20-hour hackathon sprint plan (timeboxed)
This is a pragmatic plan to deliver the MVP in ~20 hours. Adjust team size and roles accordingly.

Pre-hackathon (1-2 hours)
- Setup repo and basic CI. Create GitHub repo and add basic README. Create branch main and dev.
- Create environment scaffolding and .env.example
- Install Copilot extension and confirm Copilot Chat works.

Day 1 - Hours 0 to 4 (Planning + Scaffold)
- Finalize MVP scope: directory, one service flow, complaint submission, one tender listing.
- Run Copilot to scaffold Next.js app and Express API. Commit initial scaffold.
- Create database schema and deploy a Supabase project or local Postgres.

Day 1 - Hours 4 to 10 (Core features)
- Implement offices list + details page with mock data. (Frontend)
- Implement GET /api/offices and DB queries. (Backend)
- Implement complaint form UI with file upload and basic validation.
- Implement POST /api/complaints endpoint and file storage to Supabase/Fake.

Day 1 - Hours 10 to 14 (Integration + PDF)
- Implement auto-fill PDF export for a single service flow.
- Wire up unique ticket generation and status page for complaints.
- Add i18n toggle for Nepali/English and simple translations.

Day 1 - Hours 14 to 18 (Polish + Demo features)
- Implement map with office pins and office profile.
- Add admin panel mock to view complaints and change status.
- Add tender listing page and subscription mock.

Day 1 - Hours 18 to 20 (Testing + Presentation)
- Run smoke tests and E2E flow.
- Prepare 3 minute demo script and a short slide or README with impact metrics.
- Deploy preview to Vercel / Render and capture screenshots.


---

## Useful repo files to create immediately
- .github/ISSUE_TEMPLATE/bug.md
- .github/PULL_REQUEST_TEMPLATE.md
- .github/workflows/ci.yml (simple lint and tests)
- .env.example
- scripts/dev.sh to run frontend + backend concurrently


---

## Example commit message style
Use conventional commits for clarity and Copilot-friendly diffs. Examples:
- feat(offices): add paginated offices endpoint
- fix(complaints): validate file upload size
- chore(ci): add lint step


---

## Quick troubleshooting prompts for Copilot Chat
- "Why is my /api/complaints endpoint returning 500 when uploading a file? Here is the server error: [paste error]."
- "I need a Next.js getServerSideProps example that fetches office data from /api/offices and passes it to page props."


---

## Security & privacy checklist (copy to repo as SECURITY.md)
- Validate and sanitize all file uploads. Limit file types and sizes.
- Require phone verification for complaint submissions.
- Log minimal PII. Encrypt stored sensitive data at rest if possible.
- Maintain data retention and deletion policy. Include opt-out in UI.


---

# README.md

Below is a ready-to-use README you can copy into the repo root. It covers setup, development, architecture, and contribution notes.


# GHaaS - Directory and Citizen Services Hub

A mobile-first, bilingual platform that helps citizens find government offices, follow procedures, submit complaints with evidence, and track tenders. Built to be low-bandwidth friendly and easy to pilot at municipal level in Nepal.


## Quick demo
- Office directory with contact, address, office hours
- Service pages with step-by-step procedure and auto-fill PDF export
- Complaint submission with photo evidence and ticket tracking
- Tender listing with subscription mock


## Tech stack
- Frontend: Next.js 14, React, TypeScript, Tailwind CSS
- Backend: Node.js, Express (or serverless), TypeScript
- Database: PostgreSQL (Supabase recommended)
- Storage: Supabase Storage or Firebase Storage
- Maps: Leaflet
- Authentication: Supabase Auth
- PDF generation: pdf-lib or server-side rendering


## Repo structure (recommended)
```
/ (repo root)
  /apps
    /web (Next.js frontend)
    /api (Express backend or serverless functions)
  /packages
    /shared (types, utils)
  /migrations (sql)
  /scripts (dev scripts)
  README.md
  copilot-instruction.md
  .env.example
```


## Local setup (example)
1. Clone
```bash
git clone git@github.com:your-org/civic-connect.git
cd civic-connect
```
2. Install
```bash
# frontend
cd apps/web
pnpm install

# backend
cd ../../apps/api
pnpm install
```
3. Configure environment
Create `.env` from `.env.example` and set credentials. Example `.env.example`:
```
# Backend
DATABASE_URL=postgresql://user:pass@localhost:5432/civic
SUPABASE_URL=https://xyz.supabase.co
SUPABASE_KEY=public-anon-key
JWT_SECRET=your_jwt_secret
TWILIO_SID=your_sid
TWILIO_TOKEN=your_token
STORAGE_BUCKET=complaints
```

4. Run development
```bash
# in repo root
pnpm dev
# or run frontend and backend separately
cd apps/web && pnpm dev
cd apps/api && pnpm dev
```


## Database: sample SQL (save as /migrations/init.sql)
```sql
CREATE TABLE users (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text,
  phone text,
  email text,
  created_at timestamptz DEFAULT now()
);

CREATE TABLE offices (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  phone text,
  address text,
  lat double precision,
  lng double precision,
  website text,
  hours text,
  created_at timestamptz DEFAULT now()
);

CREATE TABLE services (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  office_id uuid REFERENCES offices(id) ON DELETE CASCADE,
  title text NOT NULL,
  description text,
  documents jsonb,
  fee numeric,
  estimated_time text
);

CREATE TABLE complaints (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  ticket_id text UNIQUE,
  user_id uuid REFERENCES users(id),
  office_id uuid REFERENCES offices(id),
  title text,
  description text,
  status text DEFAULT 'received',
  evidence jsonb,
  location jsonb,
  created_at timestamptz DEFAULT now()
);

CREATE TABLE tenders (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  office_id uuid REFERENCES offices(id),
  title text,
  description text,
  estimated_budget numeric,
  published_at timestamptz,
  deadline timestamptz
);
```


## API endpoints (MVP)
- GET /api/offices?page=1&limit=10
- GET /api/offices/:id
- GET /api/services/:id
- POST /api/complaints (multipart/form-data)
- GET /api/complaints/:ticketId
- GET /api/tenders
- POST /api/tenders/subscribe
- POST /api/generate-pdf


## Environment variables
See `.env.example` above. Keep secrets out of source control.


## Deployment
- Frontend: Vercel (Next.js) or Netlify
- Backend: Render, Railway, or serverless on Vercel functions
- Database: Supabase or managed Postgres
- Storage: Supabase Storage or S3-compatible bucket


## Contribution guide
- Branching: use feature/ descriptive names, open PRs to dev, use conventional commit messages
- PR template should include: summary, testing steps, screenshots, checklist
- Run tests locally before opening PR


## 20-hour hackathon checklist (copy to project board)
- [ ] Repo scaffolded and CI basic checks
- [ ] Database initialized with sample data
- [ ] Offices list + detail page
- [ ] Complaint form with upload
- [ ] Backend endpoints wired and tested
- [ ] PDF generate for service
- [ ] Admin mock to change complaint status
- [ ] Map with office pins
- [ ] Deploy preview and demo script


## Contact
Project owner: Aashirwad Pandey


---

End of document. If you want, I can now generate a starter repository with the scaffolded files in the exact structure above and push it to a GitHub repo using a series of code blocks or create downloadable zip. Let me know which you prefer and I will proceed.

