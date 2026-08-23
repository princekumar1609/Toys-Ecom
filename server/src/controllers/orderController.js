const Order = require('../models/Order');
const Product = require('../models/Product');
const User = require('../models/User');

// Helper to generate unique order number TN-YYYY-XXXX
const generateOrderNumber = () => {
  const year = new Date().getFullYear();
  const randomNum = Math.floor(1000 + Math.random() * 9000);
  return `TN-${year}-${randomNum}`;
};

// @desc    Create new order & auto-decrement inventory stock
// @route   POST /api/orders
// @access  Private
const createOrder = async (req, res, next) => {
  try {
    const { items, shippingAddress, paymentMethod, paymentDetails, couponCode } = req.body;

    if (req.user.status === 'BLOCKED') {
      return res.status(403).json({
        success: false,
        message: 'Account is blocked. You are not allowed to place orders.'
      });
    }

    if (!items || !Array.isArray(items) || items.length === 0) {
      return res.status(400).json({ success: false, message: 'No order items provided' });
    }

    if (!shippingAddress || !shippingAddress.fullName || !shippingAddress.phone || !shippingAddress.street || !shippingAddress.city || !shippingAddress.postalCode) {
      return res.status(400).json({ success: false, message: 'Please provide complete shipping address' });
    }

    const orderItems = [];
    let subtotal = 0;

    // Verify stock & calculate server-side prices
    for (const item of items) {
      const product = await Product.findById(item.productId);

      if (!product || product.status !== 'ACTIVE') {
        return res.status(400).json({
          success: false,
          message: `Product ${item.name || item.productId} is no longer available`
        });
      }

      if (product.stock < item.quantity) {
        return res.status(400).json({
          success: false,
          message: `Insufficient stock for "${product.name}". Available: ${product.stock}, requested: ${item.quantity}`
        });
      }

      const unitPrice = product.discountPrice > 0 ? product.discountPrice : product.price;
      subtotal += unitPrice * item.quantity;

      orderItems.push({
        product: product._id,
        name: product.name,
        sku: product.sku,
        price: unitPrice,
        quantity: item.quantity,
        imageUrl: product.thumbnailUrl
      });
    }

    // Coupon discount logic
    let discount = 0;
    if (couponCode && couponCode.toUpperCase() === 'SUMMER30') {
      discount = Math.round((subtotal * 30) / 100);
    }

    // Shipping fee
    let shippingFee = subtotal >= 1999 || (couponCode && couponCode.toUpperCase() === 'TOYNESTFREE') ? 0 : 99;
    const grandTotal = Math.max(0, subtotal - discount + shippingFee);

    // Initial Payment status
    const method = (paymentMethod || 'COD').toUpperCase();
    const paymentStatus = method === 'COD' ? 'PENDING' : 'PAID';

    // Auto-decrement inventory stock in database
    for (const item of orderItems) {
      await Product.findByIdAndUpdate(item.product, {
        $inc: { stock: -item.quantity }
      });
    }

    const order = await Order.create({
      orderNumber: generateOrderNumber(),
      customer: req.user._id,
      items: orderItems,
      shippingAddress,
      paymentMethod: method,
      paymentDetails: {
        upiId: paymentDetails?.upiId || '',
        cardNumberMasked: paymentDetails?.cardNumberMasked || '',
        cardExpiry: paymentDetails?.cardExpiry || '',
      },
      paymentStatus,
      orderStatus: 'Pending',
      subtotal,
      discount,
      shippingFee,
      grandTotal,
      statusHistory: [
        {
          status: 'Pending',
          timestamp: new Date(),
          note: 'Order placed by customer'
        }
      ]
    });

    res.status(201).json({
      success: true,
      message: 'Order placed successfully',
      data: order
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get logged in customer's orders
// @route   GET /api/orders/myorders
// @access  Private
const getMyOrders = async (req, res, next) => {
  try {
    const orders = await Order.find({ customer: req.user._id })
      .populate('items.product', 'name thumbnailUrl')
      .sort({ createdAt: -1 });

    res.json({
      success: true,
      count: orders.length,
      data: orders
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get order details by ID
// @route   GET /api/orders/:id
// @access  Private
const getOrderById = async (req, res, next) => {
  try {
    const order = await Order.findById(req.params.id)
      .populate('customer', 'name email phone')
      .populate('items.product', 'name thumbnailUrl category');

    if (!order) {
      return res.status(404).json({ success: false, message: 'Order not found' });
    }

    // Ensure customer owns order OR is admin
    if (order.customer._id.toString() !== req.user._id.toString() && req.user.role !== 'ADMIN') {
      return res.status(403).json({ success: false, message: 'Not authorized to view this order' });
    }

    res.json({
      success: true,
      data: order
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Cancel order & auto-increment inventory stock
// @route   PUT /api/orders/:id/cancel
// @access  Private
const cancelOrder = async (req, res, next) => {
  try {
    const order = await Order.findById(req.params.id);
    if (!order) {
      return res.status(404).json({ success: false, message: 'Order not found' });
    }

    if (order.customer.toString() !== req.user._id.toString() && req.user.role !== 'ADMIN') {
      return res.status(403).json({ success: false, message: 'Not authorized to cancel this order' });
    }

    if (['Shipped', 'Delivered', 'Cancelled', 'Returned'].includes(order.orderStatus)) {
      return res.status(400).json({
        success: false,
        message: `Cannot cancel order in ${order.orderStatus} state`
      });
    }

    order.orderStatus = 'Cancelled';
    if (order.paymentStatus === 'PAID') {
      order.paymentStatus = 'REFUNDED';
    }

    order.statusHistory.push({
      status: 'Cancelled',
      timestamp: new Date(),
      note: 'Order cancelled by customer'
    });

    // Auto-increment inventory stock back into DB
    for (const item of order.items) {
      await Product.findByIdAndUpdate(item.product, {
        $inc: { stock: item.quantity }
      });
    }

    const updatedOrder = await order.save();

    res.json({
      success: true,
      message: 'Order cancelled successfully and stock restored',
      data: updatedOrder
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get all orders (Admin)
// @route   GET /api/orders
// @access  Private/Admin
const getAllOrders = async (req, res, next) => {
  try {
    const { status, paymentStatus, search, page = 1, limit = 10 } = req.query;
    const query = {};

    if (status && status !== 'ALL') {
      query.orderStatus = status;
    }

    if (paymentStatus && paymentStatus !== 'ALL') {
      query.paymentStatus = paymentStatus;
    }

    if (search) {
      query.$or = [
        { orderNumber: { $regex: search, $options: 'i' } }
      ];
    }

    const pageNum = Math.max(1, parseInt(page, 10));
    const limitNum = Math.max(1, parseInt(limit, 10));
    const skip = (pageNum - 1) * limitNum;

    const total = await Order.countDocuments(query);
    const orders = await Order.find(query)
      .populate('customer', 'name email phone')
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limitNum);

    res.json({
      success: true,
      count: orders.length,
      total,
      page: pageNum,
      pages: Math.ceil(total / limitNum),
      data: orders
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Update order status & payment status (Admin)
// @route   PUT /api/orders/:id/status
// @access  Private/Admin
const updateOrderStatus = async (req, res, next) => {
  try {
    const { orderStatus, paymentStatus, note } = req.body;
    const order = await Order.findById(req.params.id);

    if (!order) {
      return res.status(404).json({ success: false, message: 'Order not found' });
    }

    if (orderStatus) order.orderStatus = orderStatus;
    if (paymentStatus) order.paymentStatus = paymentStatus;

    order.statusHistory.push({
      status: orderStatus || order.orderStatus,
      timestamp: new Date(),
      note: note || `Status updated to ${orderStatus || order.orderStatus} by admin`
    });

    const updatedOrder = await order.save();

    res.json({
      success: true,
      message: 'Order status updated successfully',
      data: updatedOrder
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createOrder,
  getMyOrders,
  getOrderById,
  cancelOrder,
  getAllOrders,
  updateOrderStatus
};
