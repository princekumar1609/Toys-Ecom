# Workflow: Implement a Page

This workflow guides the AI agent through implementing a frontend page matching the approved Stitch design for ToyNest.

## Prerequisites
1. Read `README.md`, `docs/PROJECT.md`, `docs/DESIGN.md`, and `docs/ARCHITECTURE.md`.
2. Inspect the approved Stitch UI spec / screenshot for the target page.
3. Identify required sub-components, layout hierarchy, and state requirements.

## Implementation Steps
1. **Component Blueprinting**:
   - Determine if existing design system components (`client/src/components/common/`) can be reused (e.g., Button, Input, Card, Modal, Badge).
   - If missing, create reusable components before assembling the page.

2. **Page Assembly (`client/src/pages/`)**:
   - Create or update the target page component using JavaScript (React JSX).
   - Use Tailwind CSS utility classes strictly following token mappings in `docs/DESIGN.md`.
   - Ensure semantic HTML structure (`<main>`, `<header>`, `<section>`, `<article>`, `<footer>`).

3. **State & Mock Data Integration**:
   - In UI-only steps (Steps 4–18), use local state (`useState`) and structured mock data objects (`client/src/data/`).
   - Include empty states, loading skeletons/spinners, and error banners.

4. **Responsive Layout Check**:
   - Verify layout adaptability across Mobile (<640px), Tablet (640px–1024px), and Desktop (>1024px).

5. **Routing Setup**:
   - Register route in `client/src/routes/` under the appropriate layout (`UserLayout` or `AdminLayout`).

## Verification
- Run `npm run dev` in `client/` to verify zero console errors or warnings.
- Perform visual comparison against Stitch design rules.
