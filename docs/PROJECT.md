# Toys Ecom — Master Requirements (`PROJECT.md`)

## 1. Project Overview
Toys Ecom is a modern, full-featured e-commerce platform dedicated to toy retail. It comprises two distinct user experiences:
1. **Customer Panel**: A responsive public e-commerce web application for browsing toys, searching, filtering, managing user accounts, managing shopping carts, placing orders, tracking order statuses, and contacting customer support.
2. **Admin Panel**: A secure management portal for business administrators to oversee products, categories, orders, customers, contact messages, and sales metrics.

---

## 2. Customer Panel Scope & Requirements

### 2.1 Public Pages & Navigation
- **Home Page**: Hero banner, category highlights, featured products, best sellers, new arrivals, promotional sections, trust/value proposition badges ("Why Shop With Us"), customer testimonials, newsletter subscription, and global footer.
- **Shop Page**: Complete catalog listing with multi-attribute filtering (category, price range, age group, brand, rating, availability status), search input, sorting (price low-high, high-low, newest, popularity), grid/list views, and pagination.
- **Product Details Page**: High-resolution image gallery (main + thumbnail selector), SKU, pricing with discount calculations, stock indicators, age appropriateness tag, quantity selector, "Add to Cart", "Buy Now", description tabs, specifications, safety information, shipping details, customer reviews, and related products.
- **About Us & Contact Us**: Brand story, team/values presentation, interactive contact form (Name, Email, Phone, Subject, Message) with real-time validation and submission feedback.

### 2.2 Customer Account & Order Management
- **Authentication**: Modal-based Login, Registration, Forgot Password, and Reset Password UI.
- **Cart & Checkout**: Interactive cart drawer/page with live quantity adjustments, promo code input, order summary calculations (subtotal, discount, shipping fee, tax, total), multi-step checkout (shipping address selection, payment method selection - Cash on Delivery / Card placeholder), and order confirmation page.
- **My Orders & Tracking**: Customer order history dashboard displaying order list, status badges (Pending, Confirmed, Packed, Shipped, Delivered, Cancelled, Returned), order timeline visualizer, item breakdown, and invoice view.

---

## 3. Admin Panel Scope & Requirements

### 3.1 Administration & Dashboard
- **Admin Authentication**: Dedicated admin login portal with role validation (`ADMIN`).
- **Dashboard Overview**: Key performance indicator (KPI) cards (Total Sales, Total Orders, Total Products, Active Customers, Pending Orders, Low Stock Alerts), sales & revenue trends chart, category breakdown chart, recent order stream, and quick action shortcuts.

### 3.2 Management Modules
- **Product Management**: Full CRUD interface for products including image upload references, SKU generation, pricing, discount management, stock tracking, low stock threshold alerts, age category assignment, and product status toggling (`ACTIVE` / `INACTIVE`).
- **Order Management**: Comprehensive order processing table with date/status/payment filtering, detailed order inspection, status update modal (transitioning orders through Pending → Confirmed → Packed → Shipped → Delivered / Cancelled / Returned), and payment status management.
- **Customer Management**: Customer directory listing total orders, total spend, registration date, account status (`ACTIVE` / `BLOCKED`), detailed profile modal, and account block/unblock actions.
- **Contact Message Management**: Inbox view for customer inquiries with filter options (New, Read, Replied, Closed), detail modal, status toggling, and reply UI.

---

## 4. Technical Rules & Constraints
- **Allowed Frontend Stack**: HTML, Vanilla CSS / Tailwind CSS, JavaScript (ES6+), React 18, React Router v6.
- **Allowed Backend Stack**: Node.js, Express.js, MongoDB, Mongoose ORM.
- **Prohibited Stack**: TypeScript, Next.js, Vue, Angular, Redux, Zustand, Firebase, Supabase, Prisma.
- **Design Truth**: All UI components and screen layouts must strictly mirror approved Stitch designs.
