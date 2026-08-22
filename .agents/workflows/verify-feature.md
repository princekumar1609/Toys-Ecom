# Workflow: Verify a Feature

This workflow defines the systematic verification protocol required after completing any step or feature.

## Verification Checklist

### 1. File Structure & Existence
- Verify all created or modified files exist at their expected relative paths.
- Ensure no orphaned files or untracked temporary scripts remain.

### 2. Code Quality & Linting
- Check code syntax for syntax errors, broken imports, missing dependencies, or undefined variables.
- Confirm JavaScript standard ES6+ compliance without TypeScript syntax.

### 3. Runtime Verification (Frontend)
- Start client application (`npm run dev` in `client/`).
- Confirm zero terminal compilation errors.
- Confirm zero browser console runtime errors or unhandled exceptions.
- Verify interactive elements (buttons, inputs, dropdowns, modals, forms).

### 4. Runtime Verification (Backend)
- Start server application (`npm start` or `npm run dev` in `server/`).
- Confirm database connection to MongoDB is established successfully.
- Test endpoint health and target API endpoints.
- Confirm error scenarios return appropriate HTTP status codes and JSON payloads.

### 5. Step Boundary & Progress Audit
- Confirm that NO work outside the target step was performed.
- Update `docs/PROGRESS.md` to reflect current step completion status.
- Update `docs/TASKS.md` with detailed task status updates.
