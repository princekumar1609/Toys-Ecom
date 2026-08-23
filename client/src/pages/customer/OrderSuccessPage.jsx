import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import Container from '../../components/common/Container';
import Card from '../../components/common/Card';
import Button from '../../components/common/Button';
import Badge from '../../components/common/Badge';

export default function OrderSuccessPage() {
  const location = useLocation();
  const order = location.state?.order;

  const orderNumber = order?.orderNumber || 'TN-2026';
  const grandTotal = order?.grandTotal || 0;
  const shippingAddress = order?.shippingAddress;

  const renderPaymentMethodLabel = () => {
    if (!order) return 'Cash On Delivery (COD)';
    if (order.paymentMethod === 'UPI') {
      return `📱 UPI (${order.paymentDetails?.upiId || 'Instant Payment'})`;
    }
    if (order.paymentMethod === 'CARD') {
      return `💳 Credit/Debit Card (${order.paymentDetails?.cardNumberMasked || 'Card'})`;
    }
    return '💵 Cash On Delivery (COD)';
  };

  const addressText = shippingAddress
    ? `${shippingAddress.street}, ${shippingAddress.city}, ${shippingAddress.state} ${shippingAddress.postalCode}`
    : 'Provided Shipping Address';

  return (
    <div className="py-12 space-y-6">
      <Container maxWidth="max-w-2xl">
        <Card className="p-8 sm:p-12 border border-gray-200 shadow-lg text-center bg-white rounded-3xl space-y-6">
          {/* Animated Celebration Icon */}
          <div className="w-20 h-20 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center text-4xl mx-auto shadow-sm animate-bounce">
            ✓
          </div>

          <div className="space-y-2">
            <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full uppercase tracking-wider">
              Order Confirmed 🎉
            </span>
            <h1 className="text-3xl sm:text-4xl font-extrabold font-display text-gray-900">
              Thank You For Your Order!
            </h1>
            <p className="text-sm text-gray-600 max-w-md mx-auto">
              Your order <strong className="text-gray-900 font-mono">#{orderNumber}</strong> has been successfully placed. We're packing your toys with care!
            </p>
          </div>

          {/* Delivery Estimate Banner */}
          <div className="bg-amber-50 border border-amber-200 rounded-2xl p-4 text-left flex items-center justify-between text-xs sm:text-sm">
            <div>
              <span className="text-gray-500 block text-xs">Estimated Express Delivery</span>
              <strong className="text-amber-900 font-bold">2-3 Business Days</strong>
            </div>
            <Badge variant="amber">2-3 Days Express</Badge>
          </div>

          {/* Order Details Summary */}
          <div className="bg-gray-50 p-6 rounded-2xl border border-gray-100 text-left space-y-3 text-xs text-gray-600">
            <h3 className="font-bold text-gray-900 text-sm border-b pb-2">Order Information Summary</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <span className="text-gray-400 block">Payment Method</span>
                <strong className="text-gray-800">{renderPaymentMethodLabel()}</strong>
              </div>
              <div>
                <span className="text-gray-400 block">Shipping Address</span>
                <strong className="text-gray-800">{addressText}</strong>
              </div>
              <div>
                <span className="text-gray-400 block">Contact Phone</span>
                <strong className="text-gray-800">{shippingAddress?.phone || 'Provided Phone Number'}</strong>
              </div>
              <div>
                <span className="text-gray-400 block">Grand Total</span>
                <strong className="text-amber-600 font-bold text-sm">₹{grandTotal}</strong>
              </div>
            </div>
          </div>

          {/* Navigation CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
            <Link to="/orders" className="w-full sm:w-auto">
              <Button variant="primary" size="md" className="w-full sm:w-auto">
                📦 Track Order Status
              </Button>
            </Link>
            <Link to="/shop" className="w-full sm:w-auto">
              <Button variant="outline" size="md" className="w-full sm:w-auto">
                🧸 Continue Shopping
              </Button>
            </Link>
          </div>
        </Card>
      </Container>
    </div>
  );
}
