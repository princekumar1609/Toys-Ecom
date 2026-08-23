import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Container from '../../components/common/Container';
import Breadcrumb from '../../components/common/Breadcrumb';
import Card from '../../components/common/Card';
import Input from '../../components/common/Input';
import Button from '../../components/common/Button';
import { orderApi, cartApi } from '../../services/api';
import { useAuth } from '../../context/AuthContext';
import { useCart } from '../../context/CartContext';

export default function CheckoutPage() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { cartItems, clearCart } = useCart();

  const [fullName, setFullName] = useState(user?.name || '');
  const [phone, setPhone] = useState(user?.phone || '');
  const [street, setStreet] = useState('');
  const [city, setCity] = useState('Bengaluru');
  const [state, setState] = useState('Karnataka');
  const [postalCode, setPostalCode] = useState('560001');
  const [paymentMethod, setPaymentMethod] = useState('COD');

  const [validationResult, setValidationResult] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    async function loadCartSummary() {
      if (cartItems.length > 0) {
        try {
          const payload = cartItems.map((i) => ({ productId: i.productId, quantity: i.quantity }));
          const res = await cartApi.validateCart(payload);
          if (res.success) setValidationResult(res.data);
        } catch (err) {
          console.error('[Checkout Validate Error]', err.message);
        }
      }
    }
    loadCartSummary();
  }, [cartItems]);

  const handlePlaceOrder = async (e) => {
    e.preventDefault();
    setErrorMessage('');

    if (!user) {
      setErrorMessage('Please sign in before placing an order.');
      return;
    }

    if (!fullName || !phone || !street || !city || !postalCode) {
      setErrorMessage('Please complete all shipping address fields.');
      return;
    }

    setIsLoading(true);
    try {
      const orderPayload = {
        items: cartItems.map((i) => ({ productId: i.productId, quantity: i.quantity })),
        shippingAddress: {
          fullName,
          phone,
          street,
          city,
          state,
          postalCode,
          country: 'India',
        },
        paymentMethod,
      };

      const res = await orderApi.createOrder(orderPayload);
      if (res.success) {
        clearCart();
        navigate('/order-success', { state: { order: res.data } });
      }
    } catch (err) {
      setErrorMessage(err.message || 'Failed to place order. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="py-6 space-y-6">
      <Container>
        <Breadcrumb items={[{ label: 'Cart', link: '/cart' }, { label: 'Checkout' }]} />

        <h1 className="text-2xl sm:text-3xl font-extrabold font-display text-gray-900 mb-6">
          Shipping &amp; Checkout 🚚
        </h1>

        {errorMessage && (
          <div className="p-4 bg-red-50 border border-red-200 text-red-700 text-xs rounded-xl font-bold mb-4">
            ⚠️ {errorMessage}
          </div>
        )}

        <form onSubmit={handlePlaceOrder} className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* ADDRESS & PAYMENT FORM */}
          <div className="lg:col-span-2 space-y-6">
            <Card className="p-6 border border-gray-200 shadow-xs space-y-4">
              <h3 className="font-bold text-gray-900 text-base border-b pb-2">1. Shipping Address</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Input label="Full Name" value={fullName} onChange={(e) => setFullName(e.target.value)} required />
                <Input label="Phone Number" value={phone} onChange={(e) => setPhone(e.target.value)} required />
              </div>
              <Input label="Street Address" placeholder="Flat / Building / Street" value={street} onChange={(e) => setStreet(e.target.value)} required />
              <div className="grid grid-cols-3 gap-3">
                <Input label="City" value={city} onChange={(e) => setCity(e.target.value)} required />
                <Input label="State" value={state} onChange={(e) => setState(e.target.value)} required />
                <Input label="PIN Code" value={postalCode} onChange={(e) => setPostalCode(e.target.value)} required />
              </div>
            </Card>

            <Card className="p-6 border border-gray-200 shadow-xs space-y-4">
              <h3 className="font-bold text-gray-900 text-base border-b pb-2">2. Select Payment Method</h3>
              <div className="space-y-3 text-xs">
                <label className="flex items-center gap-3 p-3 border rounded-xl cursor-pointer hover:bg-amber-50/50">
                  <input type="radio" name="payment" value="COD" checked={paymentMethod === 'COD'} onChange={() => setPaymentMethod('COD')} />
                  <span className="font-bold">💵 Cash on Delivery (COD)</span>
                </label>
                <label className="flex items-center gap-3 p-3 border rounded-xl cursor-pointer hover:bg-amber-50/50">
                  <input type="radio" name="payment" value="UPI" checked={paymentMethod === 'UPI'} onChange={() => setPaymentMethod('UPI')} />
                  <span className="font-bold">📱 UPI Instant Payment</span>
                </label>
                <label className="flex items-center gap-3 p-3 border rounded-xl cursor-pointer hover:bg-amber-50/50">
                  <input type="radio" name="payment" value="CARD" checked={paymentMethod === 'CARD'} onChange={() => setPaymentMethod('CARD')} />
                  <span className="font-bold">💳 Credit / Debit Card</span>
                </label>
              </div>
            </Card>
          </div>

          {/* SUMMARY SIDEBAR */}
          <Card className="p-6 border border-gray-200 shadow-xs bg-white rounded-3xl h-fit space-y-4">
            <h3 className="font-bold font-display text-gray-900 border-b pb-2">Order Review</h3>

            {validationResult && (
              <div className="space-y-2 text-xs text-gray-600 border-b pb-3">
                <div className="flex justify-between"><span>Subtotal</span><span>₹{validationResult.subtotal}</span></div>
                <div className="flex justify-between text-emerald-600"><span>Discount</span><span>-₹{validationResult.discount}</span></div>
                <div className="flex justify-between font-bold text-sm text-gray-900 pt-2 border-t"><span>Total Payable</span><span>₹{validationResult.grandTotal}</span></div>
              </div>
            )}

            <Button type="submit" variant="primary" size="lg" className="w-full" isLoading={isLoading}>
              Place Order Now →
            </Button>
          </Card>
        </form>
      </Container>
    </div>
  );
}
