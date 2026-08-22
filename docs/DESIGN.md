# ToyNest Design System & Stitch Guidelines (`DESIGN.md`)

## 1. Design Philosophy & Source of Truth
The Stitch design system is the **absolute reference** for ToyNest. The UI must invoke a joyful, vibrant, yet clean and modern e-commerce experience tailored to toy shoppers while providing a sleek, highly functional administrative dashboard.

---

## 2. Color Palette & Tokens

### Primary & Accent Colors
- **Brand Primary**: Amber / Warm Yellow (`#F59E0B` / `bg-amber-500`, `text-amber-500`, `hover:bg-amber-600`)
- **Brand Secondary**: Playful Indigo / Soft Purple (`#6366F1` / `bg-indigo-600`, `text-indigo-600`)
- **Accent Coral / Pink**: (`#F43F5E` / `bg-rose-500` - badge, sale highlights)
- **Background Light**: (`#F9FAFB` / `bg-gray-50`)
- **Card / Surface**: Pure White (`#FFFFFF` / `bg-white`)
- **Text Dark Primary**: (`#111827` / `text-gray-900`)
- **Text Muted**: (`#6B7280` / `text-gray-500`)

### Status Colors
- **Success (Active / Delivered)**: Emerald (`bg-emerald-100`, `text-emerald-800`, `border-emerald-200`)
- **Warning (Pending / Low Stock)**: Amber (`bg-amber-100`, `text-amber-800`, `border-amber-200`)
- **Info (Confirmed / Shipped / Packed)**: Blue / Indigo (`bg-indigo-100`, `text-indigo-800`, `border-indigo-200`)
- **Danger (Blocked / Cancelled / Out of Stock)**: Red (`bg-red-100`, `text-red-800`, `border-red-200`)

---

## 3. Typography Rules
- **Primary Font**: `Inter`, sans-serif (Clean UI typography).
- **Display Font**: `Outfit` or `Fredoka`, sans-serif (Warm display headings for banners).
- **Scale**:
  - `text-xs`: Labels, status tags (12px)
  - `text-sm`: Body secondary, table text (14px)
  - `text-base`: Body primary, input text (16px)
  - `text-lg`: Card titles, subheaders (18px)
  - `text-xl`: Section headers (20px)
  - `text-2xl` to `text-4xl`: Page headers, hero headlines (24px - 36px)

---

## 4. Spacing, Elevation & Radii
- **Border Radius**:
  - Badges & Buttons: `rounded-lg` (8px) or `rounded-full` (pills)
  - Cards & Modals: `rounded-xl` (12px) or `rounded-2xl` (16px)
- **Shadows**:
  - Default Cards: `shadow-sm hover:shadow-md transition-shadow duration-200`
  - Floating Panels / Modals / Drawers: `shadow-xl`
- **Padding & Margins**:
  - Container padding: `px-4 sm:px-6 lg:px-8`
  - Section spacing: `py-8 md:py-12`

---

## 5. Component Guidelines

### Buttons
- **Primary Button**: `bg-amber-500 hover:bg-amber-600 text-white font-medium px-4 py-2 rounded-lg transition-colors shadow-sm`
- **Secondary Button**: `bg-indigo-600 hover:bg-indigo-700 text-white font-medium px-4 py-2 rounded-lg transition-colors shadow-sm`
- **Outline Button**: `border border-gray-300 text-gray-700 hover:bg-gray-50 font-medium px-4 py-2 rounded-lg transition-colors`
- **Icon Button**: `p-2 text-gray-500 hover:text-gray-900 rounded-full hover:bg-gray-100 transition-colors`

### Inputs & Forms
- **Text Input**: `w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent text-sm`
- **Select Dropdown**: Matching text input styling with custom dropdown arrow.

### Cards
- **Product Card**: White background, rounded-xl, subtle border (`border border-gray-100`), overflow-hidden, image aspect-square container, price tag highlight, add-to-cart button trigger.

---

## 6. Responsive Breakpoints
- **Mobile**: `<640px` (Single column layout, bottom drawer navigation, hamburger menu)
- **Tablet**: `640px - 1024px` (2-column grids, collapsible sidebar)
- **Desktop**: `>1024px` (4-column product grids, persistent admin sidebar, expanded topbar search)
