const Product = require('../models/Product');

// Promo Coupons database configuration
const VALID_COUPONS = {
  SUMMER30: { type: 'PERCENT', value: 30, description: '30% off subtotal' },
  TOYNESTFREE: { type: 'FREE_SHIPPING', value: 0, description: 'Free shipping on order' }
};

// @desc    Validate cart items, verify prices & stock from DB, and calculate totals
// @route   POST /api/cart/validate
// @access  Public
const validateCart = async (req, res, next) => {
  try {
    const { items, couponCode } = req.body;

    if (!items || !Array.isArray(items) || items.length === 0) {
      return res.status(400).json({
        success: false,
        message: 'Cart items array is required'
      });
    }

    const validatedItems = [];
    let subtotal = 0;
    let hasStockIssues = false;

    for (const item of items) {
      const product = await Product.findById(item.productId);

      if (!product || product.status !== 'ACTIVE') {
        validatedItems.push({
          productId: item.productId,
          valid: false,
          error: 'Product no longer available'
        });
        hasStockIssues = true;
        continue;
      }

      const qty = Math.max(1, parseInt(item.quantity, 10));
      const isStockAvailable = product.stock >= qty;

      if (!isStockAvailable) {
        hasStockIssues = true;
      }

      // Server-side authoritative price (ignore client input price)
      const unitPrice = product.discountPrice > 0 ? product.discountPrice : product.price;
      const itemSubtotal = unitPrice * qty;
      subtotal += itemSubtotal;

      validatedItems.push({
        product: {
          _id: product._id,
          name: product.name,
          sku: product.sku,
          thumbnailUrl: product.thumbnailUrl,
          brand: product.brand,
          stock: product.stock
        },
        quantity: qty,
        unitPrice,
        originalPrice: product.price,
        itemSubtotal,
        isStockAvailable,
        availableStock: product.stock
      });
    }

    // Coupon calculation
    let discount = 0;
    let appliedCoupon = null;

    if (couponCode) {
      const codeUpper = couponCode.toUpperCase();
      const coupon = VALID_COUPONS[codeUpper];
      if (coupon) {
        appliedCoupon = { code: codeUpper, ...coupon };
        if (coupon.type === 'PERCENT') {
          discount = Math.round((subtotal * coupon.value) / 100);
        }
      }
    }

    // Shipping fee calculation (Free if subtotal >= 1999 or TOYNESTFREE coupon)
    let shippingFee = subtotal >= 1999 ? 0 : 99;
    if (appliedCoupon && appliedCoupon.type === 'FREE_SHIPPING') {
      shippingFee = 0;
    }

    const grandTotal = Math.max(0, subtotal - discount + shippingFee);

    res.json({
      success: true,
      data: {
        items: validatedItems,
        subtotal,
        discount,
        shippingFee,
        grandTotal,
        appliedCoupon,
        hasStockIssues
      }
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Validate coupon code
// @route   POST /api/cart/coupon
// @access  Public
const validateCoupon = async (req, res, next) => {
  try {
    const { code, subtotal = 0 } = req.body;

    if (!code) {
      return res.status(400).json({ success: false, message: 'Coupon code is required' });
    }

    const codeUpper = code.toUpperCase();
    const coupon = VALID_COUPONS[codeUpper];

    if (!coupon) {
      return res.status(404).json({
        success: false,
        message: 'Invalid coupon code. Try SUMMER30 or TOYNESTFREE.'
      });
    }

    let discount = 0;
    if (coupon.type === 'PERCENT') {
      discount = Math.round((Number(subtotal) * coupon.value) / 100);
    }

    res.json({
      success: true,
      message: 'Coupon code applied successfully',
      data: {
        code: codeUpper,
        type: coupon.type,
        value: coupon.value,
        discount,
        description: coupon.description
      }
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  validateCart,
  validateCoupon
};
