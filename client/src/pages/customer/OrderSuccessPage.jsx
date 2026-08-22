import React from 'react';
import { Link } from 'react-router-dom';
import Container from '../../components/common/Container';
import Card from '../../components/common/Card';
import Button from '../../components/common/Button';
import Badge from '../../components/common/Badge';

export default function OrderSuccessPage() {
  const orderNumber = 'TN-2026-8942';

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
              <span className="text-gray-500 block text-xs">Estimated Delivery</span>
              <strong className="text-amber-900 font-bold">Thursday, Aug 21, 2026</strong>
            </div>
            <Badge variant="amber">2-3 Days Express</Badge>
          </div>

          {/* Order Details Summary */}
          <div className="bg-gray-50 p-6 rounded-2xl border border-gray-100 text-left space-y-3 text-xs text-gray-600">
            <h3 className="font-bold text-gray-900 text-sm border-b pb-2">Order Information Summary</h3>
            <div className="grid grid-cols-2 gap-2">
              <div>
                <span className="text-gray-400 block">Payment Method</span>
                <strong className="text-gray-800">Cash On Delivery (COD)</strong>
              </div>
              <div>
                <span className="text-gray-400 block">Shipping Address</span>
                <strong className="text-gray-800">Flat 402, MG Road, Bengaluru</strong>
              </div>
              <div>
                <span className="text-gray-400 block">Contact Phone</span>
                <strong className="text-gray-800">+91 98765 43210</strong>
              </div>
              <div>
                <span className="text-gray-400 block">Grand Total Paid</span>
                <strong className="text-amber-600 font-bold text-sm">₹4,197</strong>
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
