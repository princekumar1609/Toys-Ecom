# ToyNest System Architecture (`ARCHITECTURE.md`)

## 1. High-Level Architecture
ToyNest follows a classic decoupled client-server architecture:
- **Client (Frontend)**: Single Page Application (SPA) built using React, JavaScript, React Router, and Tailwind CSS.
- **Server (Backend)**: RESTful API server built using Node.js and Express.js.
- **Database**: Document database powered by MongoDB and managed via Mongoose ORM models.

```text
+-------------------------------------------------------+
|                   ToyNest Client                      |
|           React SPA + Tailwind CSS + Axios            |
+---------------------------+---------------------------+
                            |
                     HTTP / REST API
                            |
+---------------------------v---------------------------+
|                   ToyNest Server                      |
|          Node.js + Express.js Middleware              |
|        Auth (JWT) | Controllers | Routers             |
+---------------------------+---------------------------+
                            |
                     Mongoose ODM
                            |
+---------------------------v---------------------------+
|                   MongoDB Database                    |
|       Users | Products | Categories | Orders          |
+-------------------------------------------------------+
```

---

## 2. Directory Structure

```text
ToyNest/
├── README.md
├── .agents/
│   ├── rules/
│   │   └── project-rules.md
│   └── workflows/
│       ├── implement-page.md
│       ├── implement-api.md
│       ├── verify-feature.md
│       └── stitch-review.md
├── docs/
│   ├── PROJECT.md
│   ├── ARCHITECTURE.md
│   ├── DESIGN.md
│   ├── DATABASE.md
│   ├── API.md
│   ├── PROGRESS.md
│   └── TASKS.md
├── client/                     # React Frontend Application
│   ├── public/
│   │   ├── favicon.ico
│   │   └── index.html
│   └── src/
│       ├── assets/             # Images, icons, static graphic assets
│       ├── components/         # Reusable UI components
│       │   ├── common/         # Button, Input, Modal, Card, Badge, Spinner
│       │   ├── customer/       # Customer-specific components (Header, Footer, ProductCard)
│       │   └── admin/          # Admin-specific components (Sidebar, Topbar, KPI Card)
│       ├── layouts/            # Layout wrappers (UserLayout, AdminLayout)
│       ├── pages/              # Top-level Page views
│       │   ├── customer/       # Home, Shop, ProductDetails, Cart, Checkout, Orders, Contact
│       │   └── admin/          # Dashboard, Products, Orders, Customers, Messages, Login
│       ├── routes/             # React Router route definitions
│       ├── services/           # API integration service modules
│       ├── context/            # Global Auth & Cart Context providers
│       ├── data/               # Mock data for frontend standalone steps
│       ├── App.jsx
│       ├── index.css           # Tailwind directives & global utility overrides
│       └── main.jsx
└── server/                     # Node.js + Express Backend Application
    ├── src/
    │   ├── config/             # DB connection, environment variables
    │   ├── controllers/        # Request handlers & logic
    │   ├── middleware/         # Auth, role check, error handler, validator
    │   ├── models/             # Mongoose schemas (User, Product, Category, Order, Message)
    │   ├── routes/             # Express API routes
    │   ├── utils/              # Token generation, helpers
    │   └── app.js              # Express app instantiation
    ├── index.js                # Server entry point
    ├── .env.example
    └── package.json
```

---

## 3. Frontend Architecture
- **State Management**: Local component state (`useState`) combined with React Context (`AuthContext`, `CartContext`) for cross-cutting state.
- **Routing**: `react-router-dom` v6 with layout routing:
  - `UserLayout`: Wraps all public customer pages with global Header, Navigation, Cart Drawer, and Footer.
  - `AdminLayout`: Wraps all administrative pages with collapsible Sidebar, Topbar, and Admin Navigation.
- **Styling**: Tailwind CSS utility-first approach with custom theme configuration matching Stitch design tokens.

---

## 4. Backend Architecture
- **Pattern**: Layered Controller-Service-Repository architecture.
  - **Routes**: Map HTTP verbs & endpoints to controller functions.
  - **Middleware**: Intercept requests for authentication (JWT decode), authorization check (`req.user.role === 'ADMIN'`), and input validation.
  - **Controllers**: Process inputs, invoke Mongoose queries, construct responses.
  - **Models**: Encapsulate Mongoose schemas, data constraints, pre-save hooks (bcrypt password hashing), and methods.
- **Error Handling**: Global asynchronous error handling middleware returning standardized JSON error payloads.
