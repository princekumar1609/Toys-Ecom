const mongoose = require('mongoose');

const orderItemSchema = new mongoose.Schema(
  {
    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Product',
      required: true
    },
    name: { type: String, required: true }, // Snapshot of product name
    sku: { type: String, required: true },  // Snapshot of SKU
    price: { type: Number, required: true }, // Snapshot of price at order time
    quantity: { type: Number, required: true, min: 1 },
    imageUrl: { type: String }
  },
  { _id: false }
);

const statusHistorySchema = new mongoose.Schema(
  {
    status: { type: String, required: true },
    timestamp: { type: Date, default: Date.now },
    note: { type: String, default: '' }
  },
  { _id: false }
);

const orderSchema = new mongoose.Schema(
  {
    orderNumber: {
      type: String,
      required: true,
      unique: true,
      index: true
    },
    customer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      index: true
    },
    items: [orderItemSchema],
    shippingAddress: {
      fullName: { type: String, required: true },
      phone: { type: String, required: true },
      street: { type: String, required: true },
      city: { type: String, required: true },
      state: { type: String, required: true },
      postalCode: { type: String, required: true },
      country: { type: String, default: 'India' }
    },
    paymentMethod: {
      type: String,
      enum: ['COD', 'CARD', 'UPI'],
      default: 'COD'
    },
    paymentDetails: {
      upiId: { type: String, default: '' },
      cardNumberMasked: { type: String, default: '' },
      cardExpiry: { type: String, default: '' }
    },
    paymentStatus: {
      type: String,
      enum: ['PENDING', 'PAID', 'FAILED', 'REFUNDED'],
      default: 'PENDING'
    },
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
    statusHistory: [statusHistorySchema]
  },
  {
    timestamps: true
  }
);

const Order = mongoose.model('Order', orderSchema);
module.exports = Order;
