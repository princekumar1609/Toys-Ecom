# Toys Ecom — Permanent Coding Rules & Agent Directives

## 1. Core Technology Stack
- **Frontend**: HTML5, Vanilla CSS / Tailwind CSS, JavaScript (ES6+), React 18+, React Router v6+.
- **Backend**: Node.js, Express.js.
- **Database**: MongoDB, Mongoose ORM.
- **Prohibited Tech**: Do NOT introduce TypeScript, Next.js, Vue, Angular, Redux, Zustand, Firebase, Supabase, Prisma, GraphQL, or any unapproved third-party frameworks unless explicitly instructed by the user.

## 2. Design System & UI Truth (Stitch Compliance)
- The Stitch UI/UX design is the **absolute source of truth**.
- NEVER redesign approved UI screens, layouts, typography, color schemes, spacing, or component compositions.
- All styling must be achieved using Tailwind CSS utility classes adhering to the token definitions in `docs/DESIGN.md`.
- Mobile, tablet, and desktop responsiveness must be preserved on all screens.

## 3. Architecture & Modular Structure
- Frontend components reside in `client/src/components/`, pages in `client/src/pages/`, layouts in `client/src/layouts/`, and services in `client/src/services/`.
- Backend controllers reside in `server/src/controllers/`, models in `server/src/models/`, routes in `server/src/routes/`, middleware in `server/src/middleware/`, and configs in `server/src/config/`.
- Maintain strict separation of concerns between presentation, business logic, data access, and routing.

## 4. Controlled Step-by-Step Execution
- Execute **ONLY ONE STEP** at a time as specified in `README.md`.
- Never skip steps or implement multiple steps together.
- Always perform comprehensive verification (lint checks, build, server start, endpoint response) before declaring a step completed.
- Update `docs/PROGRESS.md` and `docs/TASKS.md` after completing each step.
- STOP immediately after completing the assigned step and report back to the user.

## 5. Security & Error Handling
- Never hardcode secrets, credentials, or API keys in source files; use `.env` configuration files.
- Passwords must be hashed using bcrypt before persisting to MongoDB.
- Protect endpoints with JWT authentication and role-based authorization (`CUSTOMER` vs `ADMIN`).
- Blocked customers (`ACTIVE` vs `BLOCKED`) must be prevented from placing orders or modifying cart state.
- Return structured JSON responses with meaningful HTTP status codes and user-friendly error messages without exposing internal stack traces.
