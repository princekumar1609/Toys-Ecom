# ToyNest Database Schema Specification (`DATABASE.md`)

## 1. Overview
ToyNest uses MongoDB as its primary document store, managed through Mongoose ORM models in Node.js.

---

## 2. Collections & Schemas

### 2.1 User Model (`users`)
Stores user accounts for both Customers and Admin users.

```javascript
{
  name: { type: String, required: true, trim: true },
  email: { type: String, required: true, unique: true, lowercase: true, trim: true, index: true },
  password: { type: String, required: true, select: false },
  phone: { type: String, trim: true, default: '' },
  role: { type: String, enum: ['CUSTOMER', 'ADMIN'], default: 'CUSTOMER', index: true },
  status: { type: String, enum: ['ACTIVE', 'BLOCKED'], default: 'ACTIVE', index: true },
  avatarUrl: { type: String, default: '' },
  addresses: [{
    label: { type: String, default: 'Home' },
    fullName: { type: String, required: true },
    phone: { type: String, required: true },
    street: { type: String, required: true },
    city: { type: String, required: true },
    state: { type: String, required: true },
    postalCode: { type: String, required: true },
    country: { type: String, default: 'India' },
    isDefault: { type: Boolean, default: false }
  }],
  timestamps: true // createdAt, updatedAt
}
```

---

### 2.2 Category Model (`categories`)
Classifies toys into navigable categories.

```javascript
{
  name: { type: String, required: true, unique: true, trim: true },
  slug: { type: String, required: true, unique: true, lowercase: true },
  description: { type: String, default: '' },
  imageUrl: { type: String, default: '' },
  isActive: { type: Boolean, default: true },
  displayOrder: { type: Number, default: 0 },
  timestamps: true
}
```

---

### 2.3 Product Model (`products`)
Stores toy inventory details.

```javascript
{
  name: { type: String, required: true, trim: true, index: true },
  slug: { type: String, required: true, unique: true, lowercase: true },
  sku: { type: String, required: true, unique: true, uppercase: true },
  category: { type: mongoose.Schema.Types.ObjectId, ref: 'Category', required: true, index: true },
  brand: { type: String, required: true, trim: true, index: true },
  price: { type: Number, required: true, min: 0 },
  discountPrice: { type: Number, default: 0, min: 0 },
  stock: { type: Number, required: true, min: 0, default: 0 },
  minStockAlert: { type: Number, default: 5 },
  ageGroup: { type: String, enum: ['0-2 Years', '3-5 Years', '6-8 Years', '9-12 Years', '12+ Years'], required: true },
  description: { type: String, required: true },
  specifications: [{ key: String, value: String }],
  safetyInfo: { type: String, default: 'Non-toxic, child-safe material.' },
  images: [{ type: String }],
  thumbnailUrl: { type: String, required: true },
  rating: { type: Number, default: 0, min: 0, max: 5 },
  numReviews: { type: Number, default: 0 },
  isFeatured: { type: Boolean, default: false },
  isBestSeller: { type: Boolean, default: false },
  isNewArrival: { type: Boolean, default: true },
  status: { type: String, enum: ['ACTIVE', 'INACTIVE'], default: 'ACTIVE', index: true },
  timestamps: true
}
```

---

### 2.4 Order Model (`orders`)
Stores customer orders with price and product snapshots.

```javascript
{
  orderNumber: { type: String, required: true, unique: true, index: true },
  customer: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, index: true },
  items: [{
    product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
    name: { type: String, required: true }, // Snapshot of product name
    sku: { type: String, required: true },  // Snapshot of SKU
    price: { type: Number, required: true }, // Snapshot of sale price at order time
    quantity: { type: Number, required: true, min: 1 },
    imageUrl: { type: String }
  }],
  shippingAddress: {
    fullName: { type: String, required: true },
    phone: { type: String, required: true },
    street: { type: String, required: true },
    city: { type: String, required: true },
    state: { type: String, required: true },
    postalCode: { type: String, required: true },
    country: { type: String, default: 'India' }
  },
  paymentMethod: { type: String, enum: ['COD', 'CARD', 'UPI'], default: 'COD' },
  paymentStatus: { type: String, enum: ['PENDING', 'PAID', 'FAILED', 'REFUNDED'], default: 'PENDING' },
  orderStatus: { 
    type: String, 
    enum: ['Pending', 'Confirmed', 'Packed', 'Shipped', 'Delivered', 'Cancelled', 'Returned'], 
    default: 'Pending',
    index: true 
  },
  subtotal: { type: Number, required: true },
  discount: { type: Number, default: 0 },
  shippingFee: { type: Number, default: 0 },
  grandTotal: { type: Number, required: true },
  statusHistory: [{
    status: String,
    timestamp: { type: Date, default: Date.now },
    note: String
  }],
  timestamps: true
}
```

---

### 2.5 ContactMessage Model (`contactmessages`)
Stores customer support and contact inquiries.

```javascript
{
  name: { type: String, required: true, trim: true },
  email: { type: String, required: true, lowercase: true, trim: true },
  phone: { type: String, trim: true, default: '' },
  subject: { type: String, required: true, trim: true },
  message: { type: String, required: true },
  status: { type: String, enum: ['NEW', 'READ', 'REPLIED', 'CLOSED'], default: 'NEW', index: true },
  adminReply: { type: String, default: '' },
  repliedAt: { type: Date },
  timestamps: true
}
```
