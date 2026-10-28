import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import Container from '../../components/common/Container';
import Button from '../../components/common/Button';

export default function OrderSuccessPage() {
  const location = useLocation();
  const order = location.state?.order;

  const orderNumber = order?.orderNumber || 'TE-2026';
  const grandTotal = order?.grandTotal || 0;
  const shippingAddress = order?.shippingAddress;

  const renderPaymentMethodLabel = () => {
    if (!order) return 'Cash On Delivery (COD)';
    if (order.paymentMethod === 'UPI') {
      return `UPI (${order.paymentDetails?.upiId || 'Instant'})`;
    }
    if (order.paymentMethod === 'CARD') {
      return `Credit/Debit Card (${order.paymentDetails?.cardNumberMasked || 'Card'})`;
    }
    return 'Cash On Delivery (COD)';
  };

  const addressText = shippingAddress
    ? `${shippingAddress.street}, ${shippingAddress.city}, ${shippingAddress.state} ${shippingAddress.postalCode}`
    : 'Provided Shipping Address';

  return (
    <div className="py-12 sm:py-16 space-y-6">
      <Container maxWidth="max-w-xl">
        <div className="p-8 sm:p-12 border border-[#E8E4DC] text-center bg-white rounded-lg space-y-6">
          {/* Subtle Confirmation Icon */}
          <div className="w-14 h-14 bg-[#A8B5A0]/20 border border-[#A8B5A0]/40 text-[#3B5135] rounded-full flex items-center justify-center text-xl mx-auto">
            ✓
          </div>

          <div className="space-y-2">
            <span className="text-[10px] uppercase tracking-widest font-semibold text-[#A8B5A0] bg-[#A8B5A0]/15 px-3 py-1 rounded-sm border border-[#A8B5A0]/30 inline-block">
              Order Confirmed
            </span>
            <h1 className="text-3xl sm:text-4xl font-display font-light text-[#292A26]">
              Thank You For Your Order
            </h1>
            <p className="text-xs sm:text-sm text-[#77766F] max-w-md mx-auto leading-relaxed">
              Your order <strong className="text-[#292A26] font-mono font-medium">#{orderNumber}</strong> has been received and is being prepared with thoughtful attention.
            </p>
          </div>

          {/* Delivery Estimate Banner */}
          <div className="bg-[#FAF8F3] border border-[#E8E4DC] rounded-md p-4 text-left flex items-center justify-between text-xs">
            <div>
              <span className="text-[#77766F] block text-[11px] uppercase tracking-wider">Estimated Delivery Window</span>
              <strong className="text-[#292A26] font-medium text-sm">2–3 Business Days</strong>
            </div>
            <span className="text-[10px] uppercase tracking-wider font-semibold bg-white border border-[#E8E4DC] px-2.5 py-1 rounded-sm text-[#292A26]">
              Express Dispatch
            </span>
          </div>

          {/* Order Details Summary */}
          <div className="bg-[#FAF8F3] p-6 rounded-md border border-[#E8E4DC] text-left space-y-4 text-xs text-[#77766F]">
            <h3 className="font-medium text-[#292A26] text-xs uppercase tracking-wider border-b border-[#E8E4DC] pb-2">
              Order Receipt Overview
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <span className="text-[10px] uppercase tracking-wider text-[#77766F] block">Payment Method</span>
                <strong className="text-[#292A26] font-medium block mt-0.5">{renderPaymentMethodLabel()}</strong>
              </div>
              <div>
                <span className="text-[10px] uppercase tracking-wider text-[#77766F] block">Destination</span>
                <strong className="text-[#292A26] font-medium block mt-0.5">{addressText}</strong>
              </div>
              <div>
                <span className="text-[10px] uppercase tracking-wider text-[#77766F] block">Contact Number</span>
                <strong className="text-[#292A26] font-medium block mt-0.5">{shippingAddress?.phone || 'Provided Number'}</strong>
              </div>
              <div>
                <span className="text-[10px] uppercase tracking-wider text-[#77766F] block">Total Amount</span>
                <strong className="text-[#292A26] font-semibold text-sm block mt-0.5">₹{grandTotal}</strong>
              </div>
            </div>
          </div>

          {/* Navigation CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
            <Link to="/orders" className="w-full sm:w-auto">
              <Button variant="primary" size="md" className="w-full sm:w-auto">
                Track Shipment Status →
              </Button>
            </Link>
            <Link to="/shop" className="w-full sm:w-auto">
              <Button variant="secondary" size="md" className="w-full sm:w-auto">
                Continue Shopping
              </Button>
            </Link>
          </div>
        </div>
      </Container>
    </div>
  );
}
