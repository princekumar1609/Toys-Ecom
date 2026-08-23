import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Container from '../../components/common/Container';
import Breadcrumb from '../../components/common/Breadcrumb';
import Card from '../../components/common/Card';
import Button from '../../components/common/Button';
import LoadingState from '../../components/common/LoadingState';
import EmptyState from '../../components/common/EmptyState';
import { cartApi } from '../../services/api';
import { useCart } from '../../context/CartContext';

export default function CartPage() {
  const { cartItems, updateQuantity, removeFromCart } = useCart();
  const [couponCode, setCouponCode] = useState('');
  const [appliedCoupon, setAppliedCoupon] = useState(null);
  const [validationResult, setValidationResult] = useState(null);

  const [isLoading, setIsLoading] = useState(true);
  const [couponError, setCouponError] = useState('');

  useEffect(() => {
    async function validateCartServer() {
      if (cartItems.length === 0) {
        setValidationResult(null);
        setIsLoading(false);
        return;
      }

      setIsLoading(true);
      try {
        const payload = cartItems.map((i) => ({ productId: i.productId, quantity: i.quantity }));
        const res = await cartApi.validateCart(payload, appliedCoupon ? appliedCoupon.code : null);
        if (res.success) {
          setValidationResult(res.data);
        }
      } catch (err) {
        console.error('[Cart Validate Error]', err.message);
      } finally {
        setIsLoading(false);
      }
    }
    validateCartServer();
  }, [cartItems, appliedCoupon]);

  const handleUpdateQuantity = (productId, newQty) => {
    if (newQty < 1) return;
    updateQuantity(productId, newQty);
  };

  const handleRemoveItem = (productId) => {
    removeFromCart(productId);
  };

  const handleApplyCoupon = async (e) => {
    e.preventDefault();
    setCouponError('');
    if (!couponCode.trim()) return;

    try {
      const res = await cartApi.validateCoupon(couponCode, validationResult ? validationResult.subtotal : 0);
      if (res.success) {
        setAppliedCoupon(res.data);
      }
    } catch (err) {
      setCouponError(err.message || 'Invalid coupon code');
    }
  };

  if (isLoading && cartItems.length > 0) {
    return <LoadingState message="Verifying database prices & stock..." className="py-20" />;
  }

  return (
    <div className="py-6 space-y-6">
      <Container>
        <Breadcrumb items={[{ label: 'Shopping Cart' }]} />

        <h1 className="text-2xl sm:text-3xl font-extrabold font-display text-gray-900 mb-6">
          Your Shopping Cart 🛒
        </h1>

        {cartItems.length > 0 && validationResult ? (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* ITEMS LIST */}
            <div className="lg:col-span-2 space-y-4">
              {validationResult.items.map((item, idx) => (
                <Card key={idx} className="p-4 border border-gray-200 shadow-xs flex items-center justify-between gap-4">
                  <div className="flex items-center gap-4 min-w-0">
                    <img
                      src={item.product.thumbnailUrl}
                      alt={item.product.name}
                      className="w-16 h-16 object-cover rounded-xl border flex-shrink-0"
                    />
                    <div className="min-w-0">
                      <h4 className="font-bold text-gray-900 text-sm truncate">{item.product.name}</h4>
                      <p className="text-xs text-gray-400">SKU: {item.product.sku}</p>
                      <span className="font-extrabold text-amber-600 text-sm block mt-0.5">₹{item.unitPrice}</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-4">
                    <div className="flex items-center border rounded-lg bg-gray-50">
                      <button
                        onClick={() => handleUpdateQuantity(item.product._id, item.quantity - 1)}
                        className="px-2 py-1 text-xs font-bold text-gray-600"
                      >
                        -
                      </button>
                      <span className="px-3 py-1 text-xs font-bold">{item.quantity}</span>
                      <button
                        onClick={() => handleUpdateQuantity(item.product._id, item.quantity + 1)}
                        className="px-2 py-1 text-xs font-bold text-gray-600"
                      >
                        +
                      </button>
                    </div>

                    <button
                      onClick={() => handleRemoveItem(item.product._id)}
                      className="text-rose-500 hover:text-rose-700 text-xs font-bold"
                    >
                      Remove
                    </button>
                  </div>
                </Card>
              ))}
            </div>

            {/* ORDER SUMMARY */}
            <Card className="p-6 border border-gray-200 shadow-sm bg-white rounded-3xl h-fit space-y-6">
              <h3 className="font-bold font-display text-gray-900 border-b pb-3">Order Summary</h3>

              {/* Promo Coupon Form */}
              <form onSubmit={handleApplyCoupon} className="space-y-2">
                <label className="text-xs font-bold text-gray-700 uppercase">Promo Code</label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    placeholder="e.g. SUMMER30"
                    value={couponCode}
                    onChange={(e) => setCouponCode(e.target.value)}
                    className="flex-1 px-3 py-1.5 text-xs bg-gray-50 border rounded-lg uppercase"
                  />
                  <Button type="submit" variant="outline" size="sm">Apply</Button>
                </div>
                {couponError && <p className="text-[11px] text-red-500">{couponError}</p>}
                {appliedCoupon && <p className="text-[11px] text-emerald-600 font-bold">✨ Applied {appliedCoupon.code}!</p>}
              </form>

              {/* Totals */}
              <div className="space-y-2 text-xs text-gray-600 border-t pt-3">
                <div className="flex justify-between"><span>Subtotal</span><span>₹{validationResult.subtotal}</span></div>
                <div className="flex justify-between text-emerald-600"><span>Discount</span><span>-₹{validationResult.discount}</span></div>
                <div className="flex justify-between"><span>Shipping Fee</span><span>{validationResult.shippingFee === 0 ? 'FREE' : `₹${validationResult.shippingFee}`}</span></div>
                <div className="flex justify-between font-extrabold text-base text-gray-900 pt-2 border-t"><span>Grand Total</span><span>₹{validationResult.grandTotal}</span></div>
              </div>

              <Link to="/checkout" className="block">
                <Button variant="primary" size="lg" className="w-full">
                  Proceed To Checkout →
                </Button>
              </Link>
            </Card>
          </div>
        ) : (
          <EmptyState
            icon="🛒"
            title="Your Cart is Empty"
            description="Looks like you haven't added any toys to your cart yet."
            actionLabel="Explore Toys Catalog Now"
            onAction={() => window.location.href = '/shop'}
          />
        )}
      </Container>
    </div>
  );
}
