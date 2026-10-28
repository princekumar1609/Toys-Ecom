# Toys Ecom — Antigravity Master Development Plan

## Purpose

This README is the MASTER DEVELOPMENT INSTRUCTION for the Toys Ecom project.

The complete UI/UX design has already been created in Stitch.

The application must be implemented using:

* HTML
* CSS
* JavaScript
* React
* Tailwind CSS
* Node.js
* Express.js
* MongoDB
* Mongoose

This project will be developed step-by-step using Antigravity.

---

# 🚨 IMPORTANT — READ THIS FIRST

You are working as a Senior Full-Stack Developer.

DO NOT implement the entire application at once.

This project is intentionally divided into small development steps.

You MUST:

1. Read this README.
2. Identify the current step.
3. Read the relevant project documentation.
4. Complete ONLY the current step.
5. Test the current step.
6. Fix all errors.
7. Update `docs/PROGRESS.md`.
8. Stop.
9. Wait for the user to request the next step.

DO NOT automatically continue to the next step.

---

# Technology Rules

## Frontend

Use only:

* HTML
* CSS
* JavaScript
* React
* Tailwind CSS

## Backend

Use:

* Node.js
* Express.js

## Database

Use:

* MongoDB
* Mongoose

## Do NOT introduce

* TypeScript
* Next.js
* Vue
* Angular
* Redux
* Firebase
* Supabase
* Prisma
* Other frameworks

unless the user explicitly requests them.

---

# Project

Toys Ecom is a modern toy e-commerce application.

There are two separate panels:

## Customer Panel

Public e-commerce website where customers can:

* Browse toys
* Search products
* Filter products
* View product details
* Register
* Login
* Add products to cart
* Checkout
* Place orders
* View orders
* Track orders
* Contact the business

## Admin Panel

Business management dashboard where administrators can:

* Login
* Manage products
* Manage orders
* Manage customers
* Block/unblock customers
* Manage contact messages
* View dashboard statistics

---

# Stitch Design Rule

The Stitch design is the SOURCE OF TRUTH for the UI.

Do NOT redesign approved screens.

When implementing a screen, match:

* Layout
* Colors
* Typography
* Font sizes
* Spacing
* Padding
* Margins
* Border radius
* Shadows
* Buttons
* Inputs
* Cards
* Tables
* Modals
* Icons
* Images
* Navigation
* Responsive behavior

Use Tailwind CSS.

If something is unclear, inspect the Stitch design before inventing a new UI.

---

# Development Order

The project must be implemented in this exact order.

```text
STEP 1
Project Documentation + Agent Setup

        ↓

STEP 2
Project Foundation

        ↓

STEP 3
Design System + Shared Components

        ↓

STEP 4
Customer Header + Footer + Layout

        ↓

STEP 5
Customer Home Page

        ↓

STEP 6
Customer Shop Page

        ↓

STEP 7
Product Details Page

        ↓

STEP 8
Login + Register + Authentication UI

        ↓

STEP 9
Cart UI

        ↓

STEP 10
Checkout UI

        ↓

STEP 11
Customer Orders UI

        ↓

STEP 12
About + Contact UI

        ↓

STEP 13
Admin Layout + Login

        ↓

STEP 14
Admin Dashboard

        ↓

STEP 15
Admin Product Management UI

        ↓

STEP 16
Admin Order Management UI

        ↓

STEP 17
Admin Customer Management UI

        ↓

STEP 18
Admin Contact Messages UI

        ↓

STEP 19
Database Models

        ↓

STEP 20
Authentication Backend

        ↓

STEP 21
Category + Product Backend

        ↓

STEP 22
Customer Backend

        ↓

STEP 23
Cart Backend

        ↓

STEP 24
Order Backend

        ↓

STEP 25
Contact Message Backend

        ↓

STEP 26
Connect Customer UI to APIs

        ↓

STEP 27
Connect Admin UI to APIs

        ↓

STEP 28
Validation + Error Handling

        ↓

STEP 29
Security Review

        ↓

STEP 30
Responsive + Stitch Visual Review

        ↓

STEP 31
Complete Testing

        ↓

STEP 32
Production Preparation
```

---

# STEP 1 — Create Project Documentation

## Goal

Before writing application code, create all project documentation and Antigravity instructions.

### Prompt

```text
Start STEP 1 only.

Do not build application features yet.

First inspect the repository.

Create the following structure:

.agents/
├── rules/
│   └── project-rules.md
│
└── workflows/
    ├── implement-page.md
    ├── implement-api.md
    ├── verify-feature.md
    └── stitch-review.md

docs/
├── PROJECT.md
├── ARCHITECTURE.md
├── DESIGN.md
├── DATABASE.md
├── API.md
├── PROGRESS.md
└── TASKS.md

The purpose of these files is to make the project easy for an AI coding agent to understand and maintain.

PROJECT.md:
Document the complete Toys Ecom requirements.

ARCHITECTURE.md:
Document frontend and backend architecture.

DESIGN.md:
Document Stitch design rules and visual implementation rules.

DATABASE.md:
Document planned MongoDB/Mongoose models.

API.md:
Document planned REST API structure.

PROGRESS.md:
Track completed and pending development steps.

TASKS.md:
Track detailed current tasks.

project-rules.md:
Contain permanent coding rules.

Workflows:
Create reusable instructions for:
- Implementing a page
- Implementing an API feature
- Verifying a feature
- Comparing implementation with Stitch

Use JavaScript only.

Use React + Tailwind CSS.

Use Node.js + Express.js + MongoDB.

Do not introduce TypeScript or other frameworks.

Do not modify application functionality yet.

After creating all documentation:

1. Verify every file exists.
2. Check that the documentation is internally consistent.
3. Set STEP 1 as completed in PROGRESS.md.
4. Set STEP 2 as the next step.

STOP after STEP 1.
Do not start STEP 2 automatically.
```

---

# STEP 2 — Project Foundation

### Prompt

```text
Start STEP 2 only.

Read:

- README.md
- docs/PROJECT.md
- docs/ARCHITECTURE.md
- docs/DESIGN.md
- docs/PROGRESS.md
- .agents/rules/project-rules.md

Create the application foundation.

Frontend:

client/

Use:

- React
- JavaScript
- Tailwind CSS
- React Router

Backend:

server/

Use:

- Node.js
- Express.js
- MongoDB
- Mongoose

Create the frontend and backend structure defined in ARCHITECTURE.md.

Configure MongoDB using environment variables.

Create:

GET /api/health

Create basic frontend routing.

Create:

UserLayout
AdminLayout

Create placeholder routes for the planned customer and admin pages.

Do NOT implement business functionality yet.

Do NOT implement authentication yet.

Do NOT implement products yet.

Do NOT implement orders yet.

Verify:

- Frontend starts
- Backend starts
- MongoDB connects
- /api/health works
- No browser console errors
- No terminal errors

Update PROGRESS.md.

STOP after STEP 2.
```

---

# STEP 3 — Design System + Shared Components

### Prompt

```text
Start STEP 3 only.

Read:

- README.md
- docs/PROJECT.md
- docs/DESIGN.md
- docs/PROGRESS.md

Inspect the Stitch designs.

Create the reusable Toys Ecom design system.

Implement reusable components for:

- Buttons
- Inputs
- Select
- Modal
- Card
- Badge
- StatusBadge
- Container
- LoadingState
- EmptyState
- ErrorState
- Breadcrumb
- Pagination
- ConfirmationModal

Use Tailwind CSS.

Do not create unnecessary abstractions.

Match Stitch exactly.

Do not implement complete pages yet.

Test all reusable components.

Update PROGRESS.md.

STOP after STEP 3.
```

---

# STEP 4 — Customer Layout

### Prompt

```text
Start STEP 4 only.

Implement the customer website shared layout.

Read:

- docs/PROJECT.mdm
- docs/DESIGN.md
- docs/ARCHITECTURE.md

Implement:

- UserLayout
- Header
- Navigation
- Search UI
- Cart indicator
- Login/Register trigger
- Mobile navigation
- Footer

Use the approved Stitch design.

Make desktop, tablet and mobile versions.

Do not implement product APIs.

Do not implement authentication logic.

Do not implement checkout.

Only implement the shared customer layout.

Test it on all customer routes.

Update PROGRESS.md.

STOP after STEP 4.
```

---

# STEP 5 — Customer Home Page

### Prompt

```text
Start STEP 5 only.

Implement the Customer Home Page using the Stitch design.

Use temporary local JavaScript data where necessary.

Implement:

- Hero
- Categories
- Featured Products
- Best Sellers
- New Arrivals
- Promotional section
- Why Shop With Us
- Testimonials
- Newsletter
- Footer

Create reusable ProductCard and CategoryCard components.

Do not create backend APIs.

Do not implement real authentication.

Do not implement cart functionality yet.

Compare the implementation with Stitch.

Check desktop, tablet and mobile.

Update PROGRESS.md.

STOP after STEP 5.
```

---

# STEP 6 — Shop Page

### Prompt

```text
Start STEP 6 only.

Implement the Customer Shop page using the Stitch design.

Implement:

- Breadcrumb
- Search
- Product count
- Category filter
- Price filter
- Age filter
- Brand filter
- Rating filter
- Availability filter
- Sort
- Product grid
- Pagination
- Mobile filters

Use temporary local data.

Make the UI responsive.

Do not implement real product API yet.

Do not implement cart functionality yet.

Compare with Stitch.

Update PROGRESS.md.

STOP after STEP 6.
```

---

# STEP 7 — Product Details

### Prompt

```text
Start STEP 7 only.

Implement the Product Details page from Stitch.

Implement:

- Product gallery
- Main image
- Thumbnail images
- Product name
- Rating
- SKU
- Price
- Discount
- Stock
- Quantity selector
- Add to Cart UI
- Buy Now UI
- Wishlist UI
- Description
- Specifications
- Safety information
- Delivery information
- Return information
- Reviews UI
- Related products

Use temporary data.

Do not implement real cart or API functionality yet.

Compare with Stitch.

Update PROGRESS.md.

STOP after STEP 7.
```

---

# STEP 8 — Authentication UI

### Prompt

```text
Start STEP 8 only.

Implement customer authentication UI according to Stitch.

Create:

- Login modal
- Register modal
- Forgot Password modal
- Reset Password UI

Implement:

- Form fields
- Password visibility
- Validation UI
- Error UI
- Loading UI
- Switching between Login and Register

Do not connect to backend yet.

Do not implement JWT yet.

Do not implement real authentication.

Use JavaScript and React.

Update PROGRESS.md.

STOP after STEP 8.
```

---

# STEP 9 — Cart UI

### Prompt

```text
Start STEP 9 only.

Implement the Cart page using Stitch.

Implement:

- Cart items
- Product image
- Product name
- Price
- Quantity controls
- Remove
- Subtotal
- Discount
- Shipping
- Grand total
- Coupon UI
- Continue Shopping
- Proceed to Checkout

Implement empty cart state.

Use temporary local data.

Do not implement backend cart APIs yet.

Update PROGRESS.md.

STOP after STEP 9.
```

---

# STEP 10 — Checkout UI

### Prompt

```text
Start STEP 10 only.

Implement Checkout using Stitch.

Implement:

- Customer information
- Address
- Saved address UI
- Payment method selection
- COD
- Online payment placeholder
- Order summary
- Total
- Place Order button

Also implement:

Order Success page.

Do not connect real payment gateway.

Do not create order API yet.

Update PROGRESS.md.

STOP after STEP 10.
```

---

# STEP 11 — Customer Orders UI

### Prompt

```text
Start STEP 11 only.

Implement:

- My Orders
- Order Details
- Order Status Timeline

Statuses:

Pending
Confirmed
Packed
Shipped
Delivered
Cancelled
Returned

Use temporary data.

Create reusable order components.

Do not connect APIs yet.

Compare against Stitch.

Update PROGRESS.md.

STOP after STEP 11.
```

---

# STEP 12 — About + Contact

### Prompt

```text
Start STEP 12 only.

Implement:

About Us
Contact Us

Contact form fields:

- Name
- Email
- Phone
- Subject
- Message

Implement validation UI.

Do not connect the contact form to backend yet.

Use Stitch as the source of truth.

Update PROGRESS.md.

STOP after STEP 12.
```

---

# STEP 13 — Admin Layout + Login

### Prompt

```text
Start STEP 13 only.

Implement the Admin Panel UI.

Create:

- AdminLayout
- Sidebar
- Topbar
- Mobile sidebar
- Admin Login page

Admin navigation:

Dashboard
Products
Orders
Customers
Contact Messages
Settings
Logout

Use Stitch.

Do not implement real admin authentication yet.

Do not implement backend APIs.

Update PROGRESS.md.

STOP after STEP 13.
```

---

# STEP 14 — Admin Dashboard

### Prompt

```text
Start STEP 14 only.

Implement Admin Dashboard from Stitch.

Create:

- Total Sales
- Total Orders
- Total Products
- Total Customers
- Pending Orders
- Low Stock Products
- Sales chart
- Orders chart
- Category sales
- Recent orders
- Recent customers
- Low stock products
- Quick actions

Use temporary data.

Do not implement APIs yet.

Update PROGRESS.md.

STOP after STEP 14.
```

---

# STEP 15 — Admin Products

### Prompt

```text
Start STEP 15 only.

Implement the complete Admin Product UI.

Pages:

Product List
Add Product
Edit Product
Product Details

Implement:

- Search
- Filters
- Pagination
- Product table
- Add product form
- Edit product form
- Delete confirmation
- Stock status
- Product status

Product fields:

- Name
- SKU
- Category
- Brand
- Price
- Discount price
- Stock
- Minimum stock
- Age group
- Description
- Specifications
- Images
- Status

Use temporary data.

Do not implement backend APIs yet.

Update PROGRESS.md.

STOP after STEP 15.
```

---

# STEP 16 — Admin Orders

### Prompt

```text
Start STEP 16 only.

Implement Admin Order Management UI.

Pages:

Orders
Order Details

Implement:

- Search
- Filters
- Date filter
- Status filter
- Payment filter
- Order table
- Order details
- Customer details
- Product details
- Price breakdown
- Payment details
- Order timeline
- Status update modal

Do not connect backend yet.

Update PROGRESS.md.

STOP after STEP 16.
```

---

# STEP 17 — Admin Customers

### Prompt

```text
Start STEP 17 only.

Implement:

Customer List
Customer Details

Customer list:

- Name
- Email
- Phone
- Total orders
- Total spending
- Registration date
- Status
- Actions

Customer details:

- Profile
- Statistics
- Order history
- Block customer
- Unblock customer

Implement confirmation modals.

Do not connect APIs yet.

Update PROGRESS.md.

STOP after STEP 17.
```

---

# STEP 18 — Admin Contact Messages

### Prompt

```text
Start STEP 18 only.

Implement:

Contact Messages
Message Details

Implement:

- Message table
- Search
- Filters
- Status
- Message details
- Mark as read
- Reply UI
- Close message

Statuses:

New
Read
Replied
Closed

Do not connect backend yet.

Update PROGRESS.md.

STOP after STEP 18.
```

---

# STEP 19 — Database Models

### Prompt

```text
Start STEP 19 only.

Read:

- docs/PROJECT.md
- docs/DATABASE.md
- docs/ARCHITECTURE.md

Create Mongoose models for:

User
Product
Category
Order
ContactMessage

Use the database structure documented in DATABASE.md.

Create proper:

- Schema
- Validation
- References
- Defaults
- Timestamps
- Enums where appropriate

Do not create unnecessary models.

Do not create APIs yet.

Verify MongoDB connection.

Update DATABASE.md if implementation differs from the planned schema.

Update PROGRESS.md.

STOP after STEP 19.
```

---

# STEP 20 — Authentication Backend

### Prompt

```text
Start STEP 20 only.

Implement backend authentication.

Customer:

- Register
- Login
- Logout
- Authentication middleware

Admin:

- Admin login
- Admin authorization

Implement secure password hashing.

Implement authentication tokens.

Implement protected routes.

Roles:

CUSTOMER
ADMIN

Statuses:

ACTIVE
BLOCKED

Blocked customers must not be allowed to place orders.

Never expose password information.

Validate all authentication input.

Test:

- Valid registration
- Duplicate email
- Invalid login
- Valid login
- Protected route
- Admin authorization
- Blocked customer

Update API.md.

Update PROGRESS.md.

STOP after STEP 20.
```

---

# STEP 21 — Product Backend

### Prompt

```text
Start STEP 21 only.

Implement Category and Product APIs.

Create:

GET categories
POST category
PUT category
DELETE category

GET products
GET product by ID
POST product
PUT product
DELETE product

Implement:

- Search
- Category filtering
- Price filtering
- Stock filtering
- Pagination
- Sorting

Admin-only operations must require ADMIN authorization.

Validate all product input.

Update API.md.

Update PROGRESS.md.

STOP after STEP 21.
```

---

# STEP 22 — Customer Backend

### Prompt

```text
Start STEP 22 only.

Implement customer APIs.

Customer can:

- Get own profile
- Update own profile
- Get own order history

Admin can:

- Get customers
- Search customers
- Filter customers
- Get customer details
- Block customer
- Unblock customer

Customers must not access other customers' private information.

Admin endpoints require ADMIN authorization.

Update API.md.

Update PROGRESS.md.

STOP after STEP 22.
```

---

# STEP 23 — Cart

### Prompt

```text
Start STEP 23 only.

Implement cart functionality.

Customers can:

- Add product
- Update quantity
- Remove product
- View cart
- Clear cart

Validate:

- Product exists
- Product is active
- Product has sufficient stock
- Quantity is valid

Do not allow blocked customers to use checkout functionality.

Connect the cart UI to the backend.

Test the complete cart flow.

Update PROGRESS.md.

STOP after STEP 23.
```

---

# STEP 24 — Orders

### Prompt

```text
Start STEP 24 only.

Implement order functionality.

Customer:

- Create order
- View own orders
- View own order details

Admin:

- View all orders
- Search orders
- Filter orders
- View order details
- Update order status

Order statuses:

Pending
Confirmed
Packed
Shipped
Delivered
Cancelled
Returned

Payment statuses:

Pending
Paid
Failed
Refunded

When creating an order, store product name and price snapshots.

Do not rely on the current product price for old orders.

Validate stock before creating an order.

Update API.md.

Update PROGRESS.md.

STOP after STEP 24.
```

---

# STEP 25 — Contact Backend

### Prompt

```text
Start STEP 25 only.

Implement ContactMessage backend.

Customer:

POST /api/contact

Admin:

GET messages
GET message
UPDATE message status

Statuses:

New
Read
Replied
Closed

Connect Contact Us form to backend.

Connect Admin Contact Messages to backend.

Validate all inputs.

Update API.md.

Update PROGRESS.md.

STOP after STEP 25.
```

---

# STEP 26 — Connect Customer UI

### Prompt

```text
Start STEP 26 only.

Connect the customer frontend to the implemented APIs.

Replace temporary mock data with real API data.

Connect:

- Authentication
- Products
- Categories
- Search
- Filters
- Product Details
- Cart
- Checkout
- Orders
- Contact

Use the existing frontend service structure.

Do not redesign the UI.

Keep Stitch design unchanged.

Implement loading states.

Implement error states.

Implement empty states.

Test complete customer flow:

Register
→ Login
→ Browse
→ Product Details
→ Add Cart
→ Checkout
→ Place Order
→ View Order

Update PROGRESS.md.

STOP after STEP 26.
```

---

# STEP 27 — Connect Admin UI

### Prompt

```text
Start STEP 27 only.

Connect Admin frontend to backend APIs.

Connect:

- Admin Login
- Dashboard
- Products
- Add Product
- Edit Product
- Delete Product
- Orders
- Order Details
- Status Updates
- Customers
- Block/Unblock
- Contact Messages

Replace all mock data.

Do not redesign the UI.

Verify admin authorization.

Test every admin operation.

Update PROGRESS.md.

STOP after STEP 27.
```

---

# STEP 28 — Validation + Error Handling

### Prompt

```text
Start STEP 28 only.

Review the entire application for validation and error handling.

Frontend:

- Required fields
- Invalid email
- Invalid phone
- Invalid price
- Invalid quantity
- Empty forms
- API errors
- Loading states
- Empty states

Backend:

- Request validation
- Invalid IDs
- Missing fields
- Duplicate data
- Unauthorized requests
- Forbidden requests
- Missing resources
- Database errors

Create consistent error responses.

Do not expose internal server errors to customers.

Test all major failure cases.

Update PROGRESS.md.

STOP after STEP 28.
```

---

# STEP 29 — Security Review

### Prompt

```text
Start STEP 29 only.

Perform a security review.

Check:

- Password hashing
- Authentication
- Authorization
- Admin authorization
- Blocked customer protection
- Environment variables
- Database credentials
- API secrets
- Input validation
- MongoDB injection risks
- Unauthorized APIs
- Customer data access
- Admin-only endpoints
- Sensitive response data

Do not introduce unnecessary security packages.

Fix identified security issues.

Do not change the approved UI.

Update PROGRESS.md.

STOP after STEP 29.
```

---

# STEP 30 — Stitch Visual Review

### Prompt

```text
Start STEP 30 only.

Perform a complete visual comparison between the implemented application and the approved Stitch designs.

Review every customer page.

Review every admin page.

Check:

- Layout
- Spacing
- Typography
- Colors
- Buttons
- Cards
- Tables
- Forms
- Modals
- Images
- Icons
- Border radius
- Shadows
- Responsive behavior

Do not redesign.

Only fix differences between the implementation and approved Stitch design.

Test:

Desktop
Tablet
Mobile

Update PROGRESS.md.

STOP after STEP 30.
```

---

# STEP 31 — Complete Testing

### Prompt

```text
Start STEP 31 only.

Perform complete end-to-end testing.

Customer flow:

Register
Login
Browse products
Search
Filter
View product
Add cart
Update quantity
Remove item
Checkout
Place order
View orders
View order details
Contact Us

Admin flow:

Admin login
Dashboard
Product CRUD
Order management
Order status update
Customer management
Block customer
Unblock customer
Contact messages

Also test:

- Invalid login
- Blocked customer
- Unauthorized admin access
- Empty cart
- Out of stock
- Invalid product
- Invalid order
- API failure
- Database failure

Fix all discovered bugs.

Do not add new features.

Update PROGRESS.md.

STOP after STEP 31.
```

---

# STEP 32 — Production Preparation

### Prompt

```text
Start STEP 32 only.

Prepare Toys Ecom for production.

Review:

Frontend
Backend
MongoDB
Environment variables
Authentication
Security
Error handling
API configuration
Build configuration
Responsive design

Remove:

- Debug code
- Unused imports
- Unused components
- Temporary mock data
- Test credentials
- Hardcoded secrets
- Unnecessary console logs

Verify production build.

Verify environment configuration.

Verify API URLs.

Verify MongoDB configuration.

Do not deploy anything unless explicitly requested.

Create a production readiness checklist.

Update PROGRESS.md.

STOP after STEP 32.
```

---

# How to Use This README

## First time

Give Antigravity this file:

```text
README.md
```

Then tell it:

```text
Read README.md.

Start STEP 1 only.

Do not continue to STEP 2 automatically.
```

Antigravity will create:

```text
.agents/
docs/
```

and all required Markdown files.

---

# After STEP 1

You don't need to paste the next huge prompt again.

Simply say:

```text
Read README.md and the project documentation.

Start STEP 2 only.
```

After that:

```text
Read README.md and project documentation.

Start STEP 3 only.
```

Then:

```text
Start STEP 4 only.
```

And so on.

---

# Important Rule for Every Step

At the end of every step, Antigravity must update:

```text
docs/PROGRESS.md
```

Example:

```text
STEP 1 — COMPLETED

STEP 2 — IN PROGRESS

STEP 3 — NOT STARTED
```

This prevents the agent from losing track of the project.

---

# If Something Goes Wrong

Do NOT immediately move to the next step.

Tell Antigravity:

```text
Do not continue to the next step.

Debug the current step.

Read the relevant project documentation.

Identify the root cause.

Fix the issue.

Run the required tests again.

Only after the current step is working, update PROGRESS.md.
```

---

# If You Want To Go Back

Example:

```text
The Shop page has a responsive issue.

Do not start a new feature.

Read docs/DESIGN.md and the Shop page implementation.

Compare it against the Stitch design.

Fix only the Shop page responsive issue.

Test desktop, tablet and mobile.

Do not modify unrelated pages.
```

---

# If You Stop Working For Several Days

When returning to the project, say:

```text
Read README.md.

Read:

docs/PROJECT.md
docs/ARCHITECTURE.md
docs/DESIGN.md
docs/PROGRESS.md
docs/TASKS.md

Inspect the current project state.

Tell me:

1. Current completed step
2. Current incomplete tasks
3. Current errors if any
4. What the next step should be

Do not modify code yet.
```

This lets Antigravity understand the project before making changes.

---

# Final Development Rule

NEVER ask Antigravity:

> "Build the entire Toys Ecom website."

Instead use:

> "Start STEP 6 only."

Then:

> "Verify STEP 6."

Then:

> "Start STEP 7 only."

This keeps the AI agent controlled, predictable and easier to debug.

---

# Final Project Structure

The finished repository should look approximately like:

```text
ToysEcom/
│
├── README.md
│
├── .agents/
│   ├── rules/
│   │   └── project-rules.md
│   │
│   └── workflows/
│       ├── implement-page.md
│       ├── implement-api.md
│       ├── verify-feature.md
│       └── stitch-review.md
│
├── docs/
│   ├── PROJECT.md
│   ├── ARCHITECTURE.md
│   ├── DESIGN.md
│   ├── DATABASE.md
│   ├── API.md
│   ├── PROGRESS.md
│   └── TASKS.md
│
├── client/
│   ├── public/
│   └── src/
│
└── server/
    └── src/
```

---

# Golden Rule

The repository documentation is the project's memory.

The README is the roadmap.

`PROJECT.md` is the requirement.

`ARCHITECTURE.md` is the technical structure.

`DESIGN.md` is the Stitch design rule.

`DATABASE.md` is the database plan.

`API.md` is the API contract.

`PROGRESS.md` is the current development state.

`TASKS.md` is the current work queue.

`.agents/rules/` contains permanent coding rules.

`.agents/workflows/` contains reusable development processes.

Antigravity should read these files before making significant changes.
