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
      setErrorMessage('Please sign in or register before completing your order.');
      return;
    }

    const newErrors = {};

    if (!fullName.trim() || fullName.trim().length < 2) {
      newErrors.fullName = 'Please enter your full name (at least 2 characters).';
    }

    if (!phone.trim() || !/^[6-9]\d{9}$/.test(phone.trim())) {
      newErrors.phone = 'Please enter a valid 10-digit mobile number.';
    }

    if (!street.trim() || street.trim().length < 5) {
      newErrors.street = 'Please provide complete street address with building & street name.';
    }

    if (!city.trim()) {
      newErrors.city = 'Please enter your City.';
    }

    if (!state.trim()) {
      newErrors.state = 'Please enter your State.';
    }

    if (!postalCode.trim() || !/^\d{6}$/.test(postalCode.trim())) {
      newErrors.postalCode = 'Please enter a valid 6-digit postal PIN code.';
    }

    if (paymentMethod === 'UPI') {
      const upiRegex = /^[a-zA-Z0-9.\-_]{2,256}@[a-zA-Z]{2,64}$/;
      if (!upiId.trim() || !upiRegex.test(upiId.trim())) {
        newErrors.upiId = 'Please enter a valid UPI VPA ID (e.g. username@okhdfcbank).';
      }
    }

    if (paymentMethod === 'CARD') {
      const cleanCard = cardNumber.replace(/\s+/g, '');
      if (!cleanCard || !/^\d{15,19}$/.test(cleanCard)) {
        newErrors.cardNumber = 'Please enter a valid 16-digit card number.';
      }
      if (!cardExpiry.trim() || !/^(0[1-9]|1[0-2])\/\d{2}$/.test(cardExpiry.trim())) {
        newErrors.cardExpiry = 'Please enter a valid expiry date (MM/YY).';
      }
      if (!cardCvv.trim() || !/^\d{3,4}$/.test(cardCvv.trim())) {
        newErrors.cardCvv = 'Please enter a valid CVV security code.';
      }
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      setErrorMessage('Please review the highlighted address or payment details.');
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
      setErrorMessage(err.message || 'Failed to place order. Please verify your details.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="py-8 space-y-8">
      <Container>
        <Breadcrumb items={[{ label: 'Shopping Bag', path: '/cart' }, { label: 'Checkout' }]} />

        {/* HEADER */}
        <div className="pb-4 border-b border-[#E8E4DC] mb-6">
          <span className="text-[10px] uppercase tracking-widest font-semibold text-[#77766F] block mb-1">
            Secure Process
          </span>
          <h1 className="text-3xl sm:text-4xl font-display font-medium text-[#292A26]">
            Shipping &amp; Order Finalization
          </h1>
        </div>

        {errorMessage && (
          <div className="p-4 bg-[#C98268]/15 border border-[#C98268]/30 text-[#A35338] text-xs rounded-md font-medium mb-6">
            {errorMessage}
          </div>
        )}

        <form onSubmit={handlePlaceOrder} className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10">
          {/* ADDRESS & PAYMENT SECTIONS (8 cols on laptop/desktop) */}
          <div className="lg:col-span-8 space-y-6">
            {/* Section 1: Delivery Details */}
            <div className="p-6 sm:p-8 bg-white border border-[#E8E4DC] rounded-lg space-y-5">
              <div className="border-b border-[#E8E4DC] pb-3">
                <span className="text-[10px] uppercase tracking-widest font-semibold text-[#77766F] block">
                  Step 01
                </span>
                <h3 className="font-display font-medium text-lg text-[#292A26]">
                  Shipping Address
                </h3>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Input
                  label="Full Recipient Name"
                  placeholder="E.g. Eleanor Vance"
                  value={fullName}
                  onChange={(e) => {
                    setFullName(e.target.value);
                    if (errors.fullName) setErrors((prev) => ({ ...prev, fullName: null }));
                  }}
                  error={errors.fullName}
                  required
                />
                <Input
                  label="Contact Phone Number"
                  placeholder="10-digit mobile number"
                  value={phone}
                  onChange={handlePhoneChange}
                  error={errors.phone}
                  required
                />
              </div>

              <Input
                label="Street &amp; Building Address"
                placeholder="Flat / Floor / Residence / Road name"
                value={street}
                onChange={(e) => {
                  setStreet(e.target.value);
                  if (errors.street) setErrors((prev) => ({ ...prev, street: null }));
                }}
                error={errors.street}
                required
              />

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
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
                  label="State / Province"
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
                  label="Postal PIN Code"
                  placeholder="6-digit code"
                  value={postalCode}
                  onChange={handlePostalCodeChange}
                  error={errors.postalCode}
                  required
                />
              </div>
            </div>

            {/* Section 2: Payment Method */}
            <div className="p-6 sm:p-8 bg-white border border-[#E8E4DC] rounded-lg space-y-5">
              <div className="border-b border-[#E8E4DC] pb-3">
                <span className="text-[10px] uppercase tracking-widest font-semibold text-[#77766F] block">
                  Step 02
                </span>
                <h3 className="font-display font-medium text-lg text-[#292A26]">
                  Select Payment Method
                </h3>
              </div>

              <div className="space-y-3">
                {/* Cash on Delivery */}
                <label className={`flex flex-col p-4 border rounded-md cursor-pointer transition-all ${
                  paymentMethod === 'COD'
                    ? 'border-[#292A26] bg-[#FAF8F3] text-[#292A26]'
                    : 'border-[#E8E4DC] hover:border-[#77766F]/60'
                }`}>
                  <div className="flex items-center gap-3">
                    <input
                      type="radio"
                      name="payment"
                      value="COD"
                      checked={paymentMethod === 'COD'}
                      onChange={() => { setPaymentMethod('COD'); setErrors({}); }}
                      className="accent-[#292A26]"
                    />
                    <span className="font-medium text-xs sm:text-sm">Cash on Delivery (COD)</span>
                  </div>
                  {paymentMethod === 'COD' && (
                    <p className="text-[11px] text-[#77766F] mt-2 ml-6">
                      Settle securely at your doorstep via Cash, UPI QR code, or Card.
                    </p>
                  )}
                </label>

                {/* UPI Instant */}
                <label className={`flex flex-col p-4 border rounded-md cursor-pointer transition-all ${
                  paymentMethod === 'UPI'
                    ? 'border-[#292A26] bg-[#FAF8F3] text-[#292A26]'
                    : 'border-[#E8E4DC] hover:border-[#77766F]/60'
                }`}>
                  <div className="flex items-center gap-3">
                    <input
                      type="radio"
                      name="payment"
                      value="UPI"
                      checked={paymentMethod === 'UPI'}
                      onChange={() => { setPaymentMethod('UPI'); setErrors({}); }}
                      className="accent-[#292A26]"
                    />
                    <span className="font-medium text-xs sm:text-sm">UPI Instant Transfer (GPay / PhonePe / Paytm / BHIM)</span>
                  </div>
                  {paymentMethod === 'UPI' && (
                    <div className="mt-3 ml-6 space-y-2 bg-white p-4 rounded-md border border-[#E8E4DC]" onClick={(e) => e.stopPropagation()}>
                      <Input
                        label="UPI VPA Handle"
                        placeholder="E.g. yourname@okhdfcbank"
                        value={upiId}
                        onChange={(e) => {
                          setUpiId(e.target.value);
                          if (errors.upiId) setErrors((prev) => ({ ...prev, upiId: null }));
                        }}
                        error={errors.upiId}
                        required
                      />
                      <span className="text-[11px] text-[#77766F] block">
                        A verification collect mandate will be forwarded to your UPI application.
                      </span>
                    </div>
                  )}
                </label>

                {/* Credit / Debit Card */}
                <label className={`flex flex-col p-4 border rounded-md cursor-pointer transition-all ${
                  paymentMethod === 'CARD'
                    ? 'border-[#292A26] bg-[#FAF8F3] text-[#292A26]'
                    : 'border-[#E8E4DC] hover:border-[#77766F]/60'
                }`}>
                  <div className="flex items-center gap-3">
                    <input
                      type="radio"
                      name="payment"
                      value="CARD"
                      checked={paymentMethod === 'CARD'}
                      onChange={() => { setPaymentMethod('CARD'); setErrors({}); }}
                      className="accent-[#292A26]"
                    />
                    <span className="font-medium text-xs sm:text-sm">Credit or Debit Card (Visa, MasterCard, RuPay)</span>
                  </div>
                  {paymentMethod === 'CARD' && (
                    <div className="mt-3 ml-6 space-y-3 bg-white p-4 rounded-md border border-[#E8E4DC]" onClick={(e) => e.stopPropagation()}>
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
            </div>
          </div>

          {/* SUMMARY SIDEBAR (4 cols on laptop/desktop) */}
          <div className="lg:col-span-4">
            <div className="p-6 bg-white border border-[#E8E4DC] rounded-lg space-y-5 sticky top-28">
              <div className="border-b border-[#E8E4DC] pb-3">
                <span className="text-[10px] uppercase tracking-widest font-semibold text-[#77766F] block mb-0.5">
                  Summary
                </span>
                <h3 className="font-display font-medium text-xl text-[#292A26]">
                  Order Review
                </h3>
              </div>

              {validationResult && (
                <div className="space-y-3 text-xs text-[#77766F] border-b border-[#E8E4DC] pb-4">
                  <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span className="font-medium text-[#292A26]">₹{validationResult.subtotal}</span>
                  </div>
                  {validationResult.discount > 0 && (
                    <div className="flex justify-between text-[#A35338]">
                      <span>Discount</span>
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
                    <span>Total Payable</span>
                    <span>₹{validationResult.grandTotal}</span>
                  </div>
                </div>
              )}

              <Button
                type="submit"
                variant="primary"
                size="lg"
                className="w-full py-3"
                isLoading={isLoading}
              >
                Place Order &amp; Confirm →
              </Button>

              <div className="text-[11px] text-[#77766F] text-center space-y-1 pt-1">
                <p>🔒 256-bit SSL encrypted transaction</p>
                <p>Guaranteed 100% authentic merchandise</p>
              </div>
            </div>
          </div>
        </form>
      </Container>
    </div>
  );
}
