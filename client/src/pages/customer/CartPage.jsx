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
    return <LoadingState text="Reviewing bag items & stock..." className="py-24" />;
  }

  return (
    <div className="py-8 space-y-8">
      <Container>
        <Breadcrumb items={[{ label: 'Shopping Bag' }]} />

        {/* HEADER */}
        <div className="pb-4 border-b border-[#E8E4DC] mb-6">
          <span className="text-[10px] uppercase tracking-widest font-semibold text-[#77766F] block mb-1">
            Review Selection
          </span>
          <h1 className="text-3xl sm:text-4xl font-display font-medium text-[#292A26]">
            Your Shopping Bag
          </h1>
        </div>

        {cartItems.length > 0 && validationResult ? (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10">
            {/* ITEMS LIST (8 cols on laptop/desktop) */}
            <div className="lg:col-span-8 space-y-4">
              {validationResult.items.map((item, idx) => (
                <div
                  key={idx}
                  className="p-4 sm:p-5 bg-white border border-[#E8E4DC] rounded-lg flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 transition-all"
                >
                  <div className="flex items-center gap-4 min-w-0">
                    <img
                      src={item.product.thumbnailUrl}
                      alt={item.product.name}
                      className="w-18 h-18 object-cover rounded-md bg-[#FAF8F3] border border-[#E8E4DC] flex-shrink-0"
                    />
                    <div className="min-w-0 space-y-0.5">
                      <h4 className="font-medium text-[#292A26] text-sm truncate">{item.product.name}</h4>
                      <p className="text-[11px] uppercase tracking-wider text-[#77766F]">
                        SKU: {item.product.sku}
                      </p>
                      <span className="font-semibold text-[#292A26] text-sm block pt-1">
                        ₹{item.unitPrice}
                      </span>
                    </div>
                  </div>

                  {/* Quantity Stepper & Remove Action */}
                  <div className="flex items-center justify-between sm:justify-end w-full sm:w-auto gap-4 pt-2 sm:pt-0 border-t sm:border-t-0 border-[#E8E4DC]/60">
                    <div className="flex items-center border border-[#E8E4DC] rounded-md bg-[#FAF8F3]">
                      <button
                        type="button"
                        onClick={() => handleUpdateQuantity(item.product._id, item.quantity - 1)}
                        className="w-7 h-7 flex items-center justify-center text-xs font-semibold text-[#292A26] hover:bg-[#E8E4DC]/50 cursor-pointer"
                        aria-label="Decrease quantity"
                      >
                        −
                      </button>
                      <span className="px-3 text-xs font-semibold text-[#292A26]">{item.quantity}</span>
                      <button
                        type="button"
                        onClick={() => handleUpdateQuantity(item.product._id, item.quantity + 1)}
                        className="w-7 h-7 flex items-center justify-center text-xs font-semibold text-[#292A26] hover:bg-[#E8E4DC]/50 cursor-pointer"
                        aria-label="Increase quantity"
                      >
                        +
                      </button>
                    </div>

                    <button
                      type="button"
                      onClick={() => handleRemoveItem(item.product._id)}
                      className="text-xs uppercase tracking-wider font-medium text-[#77766F] hover:text-[#C98268] transition-colors cursor-pointer"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* ORDER SUMMARY (4 cols on laptop/desktop) */}
            <div className="lg:col-span-4">
              <div className="p-6 bg-white border border-[#E8E4DC] rounded-lg space-y-6 sticky top-28">
                <div className="border-b border-[#E8E4DC] pb-3">
                  <span className="text-[10px] uppercase tracking-widest font-semibold text-[#77766F] block mb-0.5">
                    Order Details
                  </span>
                  <h3 className="font-display font-medium text-xl text-[#292A26]">
                    Order Summary
                  </h3>
                </div>

                {/* Promo Coupon Form */}
                <form onSubmit={handleApplyCoupon} className="space-y-2">
                  <label className="text-[11px] uppercase tracking-wider font-semibold text-[#292A26] block">
                    Promo / Gift Code
                  </label>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      placeholder="E.g. SUMMER30"
                      value={couponCode}
                      onChange={(e) => setCouponCode(e.target.value)}
                      className="flex-1 px-3 py-2 text-xs bg-[#FAF8F3] border border-[#E8E4DC] rounded-md uppercase font-mono text-[#292A26] focus:outline-none focus:border-[#292A26] focus:bg-white"
                    />
                    <Button type="submit" variant="secondary" size="sm" className="whitespace-nowrap">
                      Apply
                    </Button>
                  </div>
                  {couponError && <p className="text-[11px] text-[#C98268]">{couponError}</p>}
                  {appliedCoupon && (
                    <p className="text-[11px] text-[#3B5135] font-medium">
                      ✓ Coupon {appliedCoupon.code} applied successfully!
                    </p>
                  )}
                </form>

                {/* Line Items */}
                <div className="space-y-2.5 text-xs text-[#77766F] border-t border-[#E8E4DC] pt-4">
                  <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span className="font-medium text-[#292A26]">₹{validationResult.subtotal}</span>
                  </div>
                  {validationResult.discount > 0 && (
                    <div className="flex justify-between text-[#A35338]">
                      <span>Privilege Discount</span>
                      <span className="font-medium">-₹{validationResult.discount}</span>
                    </div>
                  )}
                  <div className="flex justify-between">
                    <span>Shipping</span>
                    <span className="font-medium text-[#292A26]">
                      {validationResult.shippingFee === 0 ? 'Complimentary' : `₹${validationResult.shippingFee}`}
                    </span>
                  </div>
                  <div className="flex justify-between text-base font-semibold text-[#292A26] pt-3 border-t border-[#E8E4DC]">
                    <span>Total Due</span>
                    <span>₹{validationResult.grandTotal}</span>
                  </div>
                  <p className="text-[10px] text-[#77766F] text-right">Includes applicable GST</p>
                </div>

                <Link to="/checkout" className="block pt-2">
                  <Button variant="primary" size="lg" className="w-full">
                    Proceed To Checkout →
                  </Button>
                </Link>

                <div className="text-center pt-2">
                  <Link to="/shop" className="text-xs uppercase tracking-wider text-[#77766F] hover:text-[#292A26] transition-colors">
                    ← Continue Browsing
                  </Link>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <EmptyState
            title="Your Shopping Bag Is Empty"
            description="Explore our thoughtfully designed toys, STEM puzzles, and open-ended play materials."
            actionLabel="Discover Catalog"
            onAction={() => window.location.href = '/shop'}
          />
        )}
      </Container>
    </div>
  );
}
