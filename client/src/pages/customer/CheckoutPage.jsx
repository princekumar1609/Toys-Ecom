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
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [postalCode, setPostalCode] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('COD');

  // Specific Payment Method Details
  const [upiId, setUpiId] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [cardExpiry, setCardExpiry] = useState('');
  const [cardCvv, setCardCvv] = useState('');

  const [validationResult, setValidationResult] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [errors, setErrors] = useState({});

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

  const handlePhoneChange = (e) => {
    const val = e.target.value.replace(/\D/g, '').slice(0, 10);
    setPhone(val);
    if (errors.phone) setErrors((prev) => ({ ...prev, phone: null }));
  };

  const handlePostalCodeChange = (e) => {
    const val = e.target.value.replace(/\D/g, '').slice(0, 6);
    setPostalCode(val);
    if (errors.postalCode) setErrors((prev) => ({ ...prev, postalCode: null }));
  };

  const handleCardNumberChange = (e) => {
    const raw = e.target.value.replace(/\D/g, '').slice(0, 16);
    const formatted = raw.replace(/(.{4})/g, '$1 ').trim();
    setCardNumber(formatted);
    if (errors.cardNumber) setErrors((prev) => ({ ...prev, cardNumber: null }));
  };

  const handleCardExpiryChange = (e) => {
    let raw = e.target.value.replace(/\D/g, '').slice(0, 4);
    if (raw.length >= 3) {
      raw = `${raw.slice(0, 2)}/${raw.slice(2)}`;
    }
    setCardExpiry(raw);
    if (errors.cardExpiry) setErrors((prev) => ({ ...prev, cardExpiry: null }));
  };

  const handleCardCvvChange = (e) => {
    const val = e.target.value.replace(/\D/g, '').slice(0, 4);
    setCardCvv(val);
    if (errors.cardCvv) setErrors((prev) => ({ ...prev, cardCvv: null }));
  };

  const handlePlaceOrder = async (e) => {
    e.preventDefault();
    setErrorMessage('');
    setErrors({});

    if (!user) {
      setErrorMessage('Please sign in before placing an order.');
      return;
    }

    const newErrors = {};

    if (!fullName.trim() || fullName.trim().length < 2) {
      newErrors.fullName = 'Please enter your full name (at least 2 characters).';
    }

    if (!phone.trim() || !/^[6-9]\d{9}$/.test(phone.trim())) {
      newErrors.phone = 'Please enter a valid 10-digit mobile number starting with 6, 7, 8, or 9.';
    }

    if (!street.trim() || street.trim().length < 5) {
      newErrors.street = 'Please enter a complete street address (flat, building, street name).';
    }

    if (!city.trim()) {
      newErrors.city = 'Please enter your City.';
    }

    if (!state.trim()) {
      newErrors.state = 'Please enter your State.';
    }

    if (!postalCode.trim() || !/^\d{6}$/.test(postalCode.trim())) {
      newErrors.postalCode = 'Please enter a valid 6-digit PIN code.';
    }

    if (paymentMethod === 'UPI') {
      const upiRegex = /^[a-zA-Z0-9.\-_]{2,256}@[a-zA-Z]{2,64}$/;
      if (!upiId.trim() || !upiRegex.test(upiId.trim())) {
        newErrors.upiId = 'Please enter a valid UPI ID (e.g. username@upi or 9876543210@paytm).';
      }
    }

    if (paymentMethod === 'CARD') {
      const cleanCard = cardNumber.replace(/\s+/g, '');
      if (!cleanCard || !/^\d{15,19}$/.test(cleanCard)) {
        newErrors.cardNumber = 'Please enter a valid 16-digit card number.';
      }
      if (!cardExpiry.trim() || !/^(0[1-9]|1[0-2])\/\d{2}$/.test(cardExpiry.trim())) {
        newErrors.cardExpiry = 'Please enter a valid Expiry Date in MM/YY format.';
      }
      if (!cardCvv.trim() || !/^\d{3,4}$/.test(cardCvv.trim())) {
        newErrors.cardCvv = 'Please enter a valid 3 or 4-digit CVV security code.';
      }
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      setErrorMessage('Please fix the highlighted errors below before placing your order.');
      return;
    }

    setIsLoading(true);
    try {
      const orderPayload = {
        items: cartItems.map((i) => ({ productId: i.productId, quantity: i.quantity })),
        shippingAddress: {
          fullName: fullName.trim(),
          phone: phone.trim(),
          street: street.trim(),
          city: city.trim(),
          state: state.trim(),
          postalCode: postalCode.trim(),
          country: 'India',
        },
        paymentMethod,
        paymentDetails: {
          upiId: paymentMethod === 'UPI' ? upiId.trim() : '',
          cardNumberMasked: paymentMethod === 'CARD' ? `**** **** **** ${cardNumber.replace(/\s+/g, '').slice(-4)}` : '',
          cardExpiry: paymentMethod === 'CARD' ? cardExpiry.trim() : '',
        },
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
          <div className="p-4 bg-red-50 border border-red-200 text-red-700 text-xs rounded-xl font-bold mb-4 animate-shake">
            ⚠️ {errorMessage}
          </div>
        )}

        <form onSubmit={handlePlaceOrder} className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* ADDRESS & PAYMENT FORM */}
          <div className="lg:col-span-2 space-y-6">
            <Card className="p-6 border border-gray-200 shadow-xs space-y-4">
              <h3 className="font-bold text-gray-900 text-base border-b pb-2">1. Shipping Address</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Input
                  label="Full Name"
                  placeholder="Full name"
                  value={fullName}
                  onChange={(e) => {
                    setFullName(e.target.value);
                    if (errors.fullName) setErrors((prev) => ({ ...prev, fullName: null }));
                  }}
                  error={errors.fullName}
                  required
                />
                <Input
                  label="Phone Number"
                  placeholder="10-digit mobile number"
                  value={phone}
                  onChange={handlePhoneChange}
                  error={errors.phone}
                  required
                />
              </div>
              <Input
                label="Street Address"
                placeholder="Flat / Building / Street"
                value={street}
                onChange={(e) => {
                  setStreet(e.target.value);
                  if (errors.street) setErrors((prev) => ({ ...prev, street: null }));
                }}
                error={errors.street}
                required
              />
              <div className="grid grid-cols-3 gap-3">
                <Input
                  label="City"
                  placeholder="City"
                  value={city}
                  onChange={(e) => {
                    setCity(e.target.value);
                    if (errors.city) setErrors((prev) => ({ ...prev, city: null }));
                  }}
                  error={errors.city}
                  required
                />
                <Input
                  label="State"
                  placeholder="State"
                  value={state}
                  onChange={(e) => {
                    setState(e.target.value);
                    if (errors.state) setErrors((prev) => ({ ...prev, state: null }));
                  }}
                  error={errors.state}
                  required
                />
                <Input
                  label="PIN Code"
                  placeholder="PIN Code"
                  value={postalCode}
                  onChange={handlePostalCodeChange}
                  error={errors.postalCode}
                  required
                />
              </div>
            </Card>

            <Card className="p-6 border border-gray-200 shadow-xs space-y-4">
              <h3 className="font-bold text-gray-900 text-base border-b pb-2">2. Select Payment Method</h3>
              <div className="space-y-3 text-xs">
                {/* COD Option */}
                <label className={`flex flex-col p-3 border rounded-xl cursor-pointer transition-all ${paymentMethod === 'COD' ? 'border-amber-500 bg-amber-50/40 ring-2 ring-amber-200' : 'hover:bg-gray-50'}`}>
                  <div className="flex items-center gap-3">
                    <input type="radio" name="payment" value="COD" checked={paymentMethod === 'COD'} onChange={() => { setPaymentMethod('COD'); setErrors({}); }} />
                    <span className="font-bold text-gray-900">💵 Cash on Delivery (COD)</span>
                  </div>
                  {paymentMethod === 'COD' && (
                    <p className="text-[11px] text-gray-500 mt-2 ml-6">Pay via Cash, Card, or UPI QR scanner upon delivery.</p>
                  )}
                </label>

                {/* UPI Option */}
                <label className={`flex flex-col p-3 border rounded-xl cursor-pointer transition-all ${paymentMethod === 'UPI' ? 'border-amber-500 bg-amber-50/40 ring-2 ring-amber-200' : 'hover:bg-gray-50'}`}>
                  <div className="flex items-center gap-3">
                    <input type="radio" name="payment" value="UPI" checked={paymentMethod === 'UPI'} onChange={() => { setPaymentMethod('UPI'); setErrors({}); }} />
                    <span className="font-bold text-gray-900">📱 UPI Instant Payment (GPay, PhonePe, Paytm, BHIM)</span>
                  </div>
                  {paymentMethod === 'UPI' && (
                    <div className="mt-3 ml-6 space-y-2 bg-white p-3 rounded-xl border border-amber-200" onClick={(e) => e.stopPropagation()}>
                      <Input
                        label="Enter your UPI ID (VPA)"
                        placeholder="e.g. username@upi or 9876543210@paytm"
                        value={upiId}
                        onChange={(e) => {
                          setUpiId(e.target.value);
                          if (errors.upiId) setErrors((prev) => ({ ...prev, upiId: null }));
                        }}
                        error={errors.upiId}
                        required
                      />
                      <span className="text-[10px] text-gray-400 block">A payment request will be sent to your UPI app.</span>
                    </div>
                  )}
                </label>

                {/* CARD Option */}
                <label className={`flex flex-col p-3 border rounded-xl cursor-pointer transition-all ${paymentMethod === 'CARD' ? 'border-amber-500 bg-amber-50/40 ring-2 ring-amber-200' : 'hover:bg-gray-50'}`}>
                  <div className="flex items-center gap-3">
                    <input type="radio" name="payment" value="CARD" checked={paymentMethod === 'CARD'} onChange={() => { setPaymentMethod('CARD'); setErrors({}); }} />
                    <span className="font-bold text-gray-900">💳 Credit / Debit Card (Visa, MasterCard, RuPay)</span>
                  </div>
                  {paymentMethod === 'CARD' && (
                    <div className="mt-3 ml-6 space-y-3 bg-white p-3 rounded-xl border border-amber-200" onClick={(e) => e.stopPropagation()}>
                      <Input
                        label="Card Number"
                        placeholder="1234 5678 9012 3456"
                        maxLength={19}
                        value={cardNumber}
                        onChange={handleCardNumberChange}
                        error={errors.cardNumber}
                        required
                      />
                      <div className="grid grid-cols-2 gap-3">
                        <Input
                          label="Expiry Date"
                          placeholder="MM/YY"
                          maxLength={5}
                          value={cardExpiry}
                          onChange={handleCardExpiryChange}
                          error={errors.cardExpiry}
                          required
                        />
                        <Input
                          label="CVV"
                          placeholder="123"
                          type="password"
                          maxLength={4}
                          value={cardCvv}
                          onChange={handleCardCvvChange}
                          error={errors.cardCvv}
                          required
                        />
                      </div>
                    </div>
                  )}
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
