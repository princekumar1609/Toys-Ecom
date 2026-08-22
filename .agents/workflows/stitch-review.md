# Workflow: Stitch UI Visual Review

This workflow outlines the comparison process for ensuring implemented frontend components match the approved Stitch design.

## Purpose
The Stitch design system and screen compositions serve as the single source of truth for the ToyNest visual interface.

## Review Steps

### 1. Structural Comparison
- Compare DOM hierarchy and component layout against Stitch wireframes/mocks.
- Verify container max-widths, grid columns, flex alignment, and element order.

### 2. Design Token Comparison
- **Color Palette**: Verify background colors, text colors, border colors, accent primary/secondary colors.
- **Typography**: Check font family (Inter/Outfit default), font sizes (`text-xs` to `text-4xl`), line heights, and font weights.
- **Spacing & Alignment**: Check padding (`p-4`, `p-6`), margins (`mb-4`, `space-y-6`), and gaps (`gap-4`, `gap-6`).
- **Borders & Elevation**: Check border radii (`rounded-lg`, `rounded-xl`, `rounded-full`) and box shadows (`shadow-sm`, `shadow-md`, `shadow-lg`).

### 3. State & Interactive Element Audit
- Confirm default, hover, active, focus, disabled, loading, and empty states match specified Stitch behaviors.
- Ensure transitions (`transition-all duration-200`) provide smooth visual micro-interactions.

### 4. Multi-Breakpoint Verification
- Inspect screen layout at standard breakpoints:
  - **Mobile**: `<640px` (sm)
  - **Tablet**: `640px - 1024px` (md/lg)
  - **Desktop**: `>1024px` (xl/2xl)

### 5. Resolution of Discrepancies
- Adjust Tailwind utility classes to eliminate visual deviations.
- Do NOT redesign or introduce new visual styling variations not found in the Stitch specification.
