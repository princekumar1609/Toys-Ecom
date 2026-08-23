import React, { useState, useEffect } from 'react';
import Container from '../../components/common/Container';
import Breadcrumb from '../../components/common/Breadcrumb';
import Card from '../../components/common/Card';
import StatusBadge from '../../components/common/StatusBadge';
import Modal from '../../components/common/Modal';
import Button from '../../components/common/Button';
import OrderTimeline from '../../components/customer/OrderTimeline';
import LoadingState from '../../components/common/LoadingState';
import EmptyState from '../../components/common/EmptyState';
import { orderApi } from '../../services/api';

export default function OrdersPage() {
  const [orders, setOrders] = useState([]);
  const [selectedStatus, setSelectedStatus] = useState('ALL');
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function loadMyOrders() {
      setIsLoading(true);
      try {
        const res = await orderApi.getMyOrders();
        if (res.success) {
          setOrders(res.data);
        }
      } catch (err) {
        console.error('[My Orders Fetch Error]', err.message);
      } finally {
        setIsLoading(false);
      }
    }
    loadMyOrders();
  }, []);

  const handleCancelOrder = async (orderId) => {
    try {
      const res = await orderApi.cancelOrder(orderId);
      if (res.success) {
        setOrders((prev) => prev.map((o) => (o._id === orderId ? res.data : o)));
        if (selectedOrder && selectedOrder._id === orderId) {
          setSelectedOrder(res.data);
        }
      }
    } catch (err) {
      alert(err.message || 'Failed to cancel order.');
    }
  };

  const filteredOrders = orders.filter((order) => {
    if (selectedStatus === 'ALL') return true;
    return order.orderStatus === selectedStatus;
  });

  const formatPaymentMethod = (order) => {
    if (order.paymentMethod === 'UPI') {
      return `📱 UPI (${order.paymentDetails?.upiId || 'Instant'})`;
    }
    if (order.paymentMethod === 'CARD') {
      return `💳 Card (${order.paymentDetails?.cardNumberMasked || 'Credit/Debit'})`;
    }
    return '💵 Cash on Delivery (COD)';
  };

  const handleOpenDetails = (order) => {
    setSelectedOrder(order);
    setIsModalOpen(true);
  };

  if (isLoading) {
    return <LoadingState message="Loading your order history..." className="py-20" />;
  }

  return (
    <div className="py-6 space-y-6">
      <Container>
        <Breadcrumb items={[{ label: 'My Orders' }]} />

        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
          <div>
            <h1 className="text-2xl sm:text-3xl font-extrabold font-display text-gray-900">
              My Orders &amp; Shipment Tracking 📦
            </h1>
            <p className="text-xs text-gray-500 mt-1">Track active orders and review past purchase invoices.</p>
          </div>

          <div className="flex items-center gap-2">
            <label className="text-xs font-semibold text-gray-500 whitespace-nowrap">Filter Status:</label>
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="text-xs px-3 py-2 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
            >
              <option value="ALL">All Statuses ({orders.length})</option>
              <option value="Pending">Pending</option>
              <option value="Confirmed">Confirmed</option>
              <option value="Packed">Packed</option>
              <option value="Shipped">Shipped</option>
              <option value="Delivered">Delivered</option>
              <option value="Cancelled">Cancelled</option>
            </select>
          </div>
        </div>

        {/* ORDERS LIST */}
        {filteredOrders.length > 0 ? (
          <div className="space-y-4">
            {filteredOrders.map((order) => (
              <Card key={order._id} className="p-6 border border-gray-200 shadow-xs space-y-4 hover:border-amber-300 transition-colors">
                <div className="flex flex-wrap items-center justify-between gap-3 border-b border-gray-100 pb-3">
                  <div className="flex items-center gap-3">
                    <span className="font-bold text-gray-900 text-sm font-mono">#{order.orderNumber}</span>
                    <span className="text-xs text-gray-400">Date: {new Date(order.createdAt).toLocaleDateString()}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-semibold text-gray-600 bg-gray-100 px-2 py-0.5 rounded-md">
                      {formatPaymentMethod(order)}
                    </span>
                    <StatusBadge status={order.paymentStatus} />
                    <StatusBadge status={order.orderStatus} />
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="flex items-center gap-3 overflow-x-auto py-1">
                    {order.items.map((item, idx) => (
                      <div key={idx} className="flex items-center gap-2 flex-shrink-0">
                        <img
                          src={item.imageUrl || item.product?.thumbnailUrl}
                          alt={item.name}
                          className="w-12 h-12 object-cover rounded-lg border"
                        />
                        <div className="text-xs">
                          <span className="font-semibold text-gray-800 block line-clamp-1 max-w-[150px]">{item.name}</span>
                          <span className="text-gray-400">Qty: {item.quantity}</span>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="flex items-center justify-between sm:justify-end gap-4 border-t sm:border-t-0 border-gray-100 pt-3 sm:pt-0">
                    <div className="text-right">
                      <span className="text-[10px] text-gray-400 block">Grand Total</span>
                      <strong className="text-base font-bold text-gray-900">₹{order.grandTotal}</strong>
                    </div>

                    <Button variant="outline" size="sm" onClick={() => handleOpenDetails(order)}>
                      View Order Details →
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        ) : (
          <EmptyState
            icon="📦"
            title="No Orders Found"
            description="You haven't placed any orders matching this status filter."
            actionLabel="Explore Toys Catalog"
            onAction={() => window.location.href = '/shop'}
          />
        )}

        {/* ORDER DETAILS MODAL */}
        {selectedOrder && (
          <Modal
            isOpen={isModalOpen}
            onClose={() => setIsModalOpen(false)}
            title={`Order Details — #${selectedOrder.orderNumber}`}
            maxWidth="max-w-2xl"
          >
            <div className="space-y-6">
              <div className="flex flex-wrap items-center justify-between bg-gray-50 p-4 rounded-xl border gap-2">
                <div>
                  <span className="text-xs text-gray-500 block">Placed On</span>
                  <strong className="text-sm text-gray-900">{new Date(selectedOrder.createdAt).toLocaleString()}</strong>
                  <span className="text-xs text-amber-700 font-semibold block mt-1">Payment Method: {formatPaymentMethod(selectedOrder)}</span>
                </div>
                <div className="flex items-center gap-2">
                  <StatusBadge status={selectedOrder.paymentStatus} />
                  <StatusBadge status={selectedOrder.orderStatus} />
                </div>
              </div>

              <div className="space-y-2">
                <h4 className="text-xs font-bold text-gray-700 uppercase tracking-wider">Shipment Milestone Progress</h4>
                <OrderTimeline status={selectedOrder.orderStatus} />
              </div>

              {['Pending', 'Confirmed'].includes(selectedOrder.orderStatus) && (
                <div className="p-3 bg-amber-50 border border-amber-200 rounded-xl flex items-center justify-between">
                  <span className="text-xs text-amber-900 font-semibold">Changed your mind? You can cancel before dispatch.</span>
                  <Button variant="danger" size="sm" onClick={() => handleCancelOrder(selectedOrder._id)}>
                    Cancel Order
                  </Button>
                </div>
              )}

              <div className="border-t pt-3 text-xs space-y-1 text-gray-600">
                <div className="flex justify-between"><span>Subtotal</span><span>₹{selectedOrder.subtotal}</span></div>
                <div className="flex justify-between text-emerald-600"><span>Discount</span><span>-₹{selectedOrder.discount}</span></div>
                <div className="flex justify-between"><span>Shipping</span><span>{selectedOrder.shippingFee === 0 ? 'FREE' : `₹${selectedOrder.shippingFee}`}</span></div>
                <div className="flex justify-between font-bold text-sm text-gray-900 pt-2 border-t"><span>Total</span><span>₹{selectedOrder.grandTotal}</span></div>
              </div>
            </div>
          </Modal>
        )}
      </Container>
    </div>
  );
}
