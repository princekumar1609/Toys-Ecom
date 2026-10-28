# Toys Ecom REST API Blueprint (`API.md`)

## 1. Overview & General Standards
All API endpoints are hosted under `/api`. All request and response bodies use JSON encoding.

- **Base URL**: `http://localhost:5000/api`
- **Authentication**: HTTP Header `Authorization: Bearer <JWT_TOKEN>`

### Standard Response Envelope
```json
{
  "success": true,
  "message": "Operation response message",
  "data": { ... }
}
```

---

## 2. Authentication API (`/api/auth`)
| Method | Endpoint | Access | Description |
| :--- | :--- | :--- | :--- |
| `POST` | `/api/auth/register` | Public | Register new customer account |
| `POST` | `/api/auth/login` | Public | Customer login (returns JWT token + user profile) |
| `POST` | `/api/auth/admin/login` | Public | Admin login (validates `ADMIN` role) |
| `GET` | `/api/auth/me` | Protected | Fetch current logged-in user profile |

---

## 3. Product & Category API (`/api/categories`, `/api/products`)
| Method | Endpoint | Access | Description |
| :--- | :--- | :--- | :--- |
| `GET` | `/api/categories` | Public | Fetch all active categories |
| `POST` | `/api/categories` | Admin | Create category |
| `PUT` | `/api/categories/:id` | Admin | Update category |
| `DELETE` | `/api/categories/:id` | Admin | Delete category |
| `GET` | `/api/products` | Public | Fetch products with search, category, brand, age, price filters & pagination |
| `GET` | `/api/products/:idOrSlug` | Public | Fetch product details by ID or slug |
| `POST` | `/api/products` | Admin | Create product |
| `PUT` | `/api/products/:id` | Admin | Update product |
| `DELETE` | `/api/products/:id` | Admin | Delete product |

---

## 4. User & Customer API (`/api/users`)
| Method | Endpoint | Access | Description |
| :--- | :--- | :--- | :--- |
| `GET` | `/api/users/profile` | Protected | Get customer profile & saved addresses |
| `PUT` | `/api/users/profile` | Protected | Update profile (name, email, phone) |
| `POST` | `/api/users/addresses` | Protected | Add new shipping address |
| `PUT` | `/api/users/addresses/:addressId` | Protected | Update existing shipping address |
| `DELETE` | `/api/users/addresses/:addressId` | Protected | Delete shipping address |
| `GET` | `/api/users` | Admin | List all registered customers with search & status filter |
| `GET` | `/api/users/:id` | Admin | Get single customer details |
| `PUT` | `/api/users/:id/status` | Admin | Block or unblock customer (`ACTIVE` / `BLOCKED`) |

---

## 5. Cart API (`/api/cart`)
| Method | Endpoint | Access | Description |
| :--- | :--- | :--- | :--- |
| `POST` | `/api/cart/validate` | Public | Validate cart items, verify database prices & stock, calculate totals |
| `POST` | `/api/cart/coupon` | Public | Validate promo coupon codes (`SUMMER30`, `TOYSECOMFREE`, `TOYNESTFREE`) |

---

## 6. Order API (`/api/orders`)
| Method | Endpoint | Access | Description |
| :--- | :--- | :--- | :--- |
| `POST` | `/api/orders` | Protected | Create order from cart (verifies stock & auto-decrements DB stock) |
| `GET` | `/api/orders/myorders` | Protected | Get logged-in customer's order history |
| `GET` | `/api/orders/:id` | Protected | Get specific order details & status history |
| `PUT` | `/api/orders/:id/cancel` | Protected | Cancel pending order (auto-increments DB stock back) |
| `GET` | `/api/orders` | Admin | List all orders with filters (status, payment, search) |
| `PUT` | `/api/orders/:id/status` | Admin | Update order fulfillment status & payment status |

---

## 7. Contact Message API (`/api/contact`)
| Method | Endpoint | Access | Description |
| :--- | :--- | :--- | :--- |
| `POST` | `/api/contact` | Public | Submit customer support message |
| `GET` | `/api/contact` | Admin | List contact messages with status filter (`NEW`, `READ`, `REPLIED`, `CLOSED`) |
| `GET` | `/api/contact/:id` | Admin | Get contact message details (auto marks as READ) |
| `PUT` | `/api/contact/:id/reply` | Admin | Save admin reply email response & update status to REPLIED |
| `PUT` | `/api/contact/:id/status` | Admin | Update message status |
| `DELETE` | `/api/contact/:id` | Admin | Delete support message |
