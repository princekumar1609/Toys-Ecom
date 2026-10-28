import React, { useState, useEffect } from 'react';
import Container from '../../components/common/Container';
import Breadcrumb from '../../components/common/Breadcrumb';
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
      return `UPI (${order.paymentDetails?.upiId || 'Instant'})`;
    }
    if (order.paymentMethod === 'CARD') {
      return `Card (${order.paymentDetails?.cardNumberMasked || 'Debit/Credit'})`;
    }
    return 'Cash on Delivery (COD)';
  };

  const handleOpenDetails = (order) => {
    setSelectedOrder(order);
    setIsModalOpen(true);
  };

  if (isLoading) {
    return <LoadingState text="Fetching order history..." className="py-24" />;
  }

  return (
    <div className="py-8 space-y-8">
      <Container>
        <Breadcrumb items={[{ label: 'Orders & Tracking' }]} />

        {/* HEADER */}
        <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4 pb-4 border-b border-[#E8E4DC]">
          <div>
            <span className="text-[10px] uppercase tracking-widest font-semibold text-[#77766F] block mb-1">
              Account Overview
            </span>
            <h1 className="text-3xl sm:text-4xl font-display font-medium text-[#292A26]">
              Order History &amp; Tracking
            </h1>
            <p className="text-xs text-[#77766F] mt-1">
              Review active shipments, courier progress, and past receipts.
            </p>
          </div>

          <div className="flex items-center gap-2 self-start sm:self-end">
            <label htmlFor="status-filter" className="text-xs uppercase tracking-wider text-[#77766F] font-medium whitespace-nowrap">
              Filter:
            </label>
            <select
              id="status-filter"
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="text-xs font-medium py-2 px-3 bg-white border border-[#E8E4DC] rounded-md text-[#292A26] focus:outline-none focus:border-[#292A26] cursor-pointer"
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
              <div
                key={order._id}
                className="p-5 sm:p-6 bg-white border border-[#E8E4DC] rounded-lg space-y-4 hover:border-[#77766F]/60 transition-colors"
              >
                <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#E8E4DC] pb-3">
                  <div className="flex items-center gap-3">
                    <span className="font-semibold text-xs sm:text-sm text-[#292A26] font-mono">
                      #{order.orderNumber}
                    </span>
                    <span className="text-xs text-[#77766F]">
                      {new Date(order.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="text-[11px] font-medium text-[#77766F] bg-[#FAF8F3] border border-[#E8E4DC] px-2.5 py-0.5 rounded-sm">
                      {formatPaymentMethod(order)}
                    </span>
                    <StatusBadge status={order.paymentStatus} />
                    <StatusBadge status={order.orderStatus} />
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="flex items-center gap-3 overflow-x-auto py-1">
                    {order.items.map((item, idx) => (
                      <div key={idx} className="flex items-center gap-2.5 flex-shrink-0">
                        <img
                          src={item.imageUrl || item.product?.thumbnailUrl}
                          alt={item.name}
                          className="w-12 h-12 object-cover rounded-md bg-[#FAF8F3] border border-[#E8E4DC]"
                        />
                        <div className="text-xs">
                          <span className="font-medium text-[#292A26] block line-clamp-1 max-w-[160px]">
                            {item.name}
                          </span>
                          <span className="text-[#77766F]">Qty: {item.quantity}</span>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="flex items-center justify-between sm:justify-end gap-5 border-t sm:border-t-0 border-[#E8E4DC] pt-3 sm:pt-0">
                    <div className="text-right">
                      <span className="text-[10px] uppercase tracking-wider text-[#77766F] block">Total</span>
                      <strong className="text-base font-semibold text-[#292A26]">₹{order.grandTotal}</strong>
                    </div>

                    <Button variant="secondary" size="sm" onClick={() => handleOpenDetails(order)}>
                      Order Details →
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <EmptyState
            title="No Orders Located"
            description="You do not have any orders currently matching this status selection."
            actionLabel="Discover Catalog"
            onAction={() => window.location.href = '/shop'}
          />
        )}

        {/* ORDER DETAILS MODAL */}
        {selectedOrder && (
          <Modal
            isOpen={isModalOpen}
            onClose={() => setIsModalOpen(false)}
            title={`Order Overview — #${selectedOrder.orderNumber}`}
            maxWidth="max-w-2xl"
          >
            <div className="space-y-6">
              <div className="flex flex-wrap items-center justify-between bg-[#FAF8F3] p-4 rounded-md border border-[#E8E4DC] gap-3">
                <div className="space-y-0.5">
                  <span className="text-[11px] uppercase tracking-wider text-[#77766F] block">Ordered On</span>
                  <span className="text-xs font-semibold text-[#292A26]">
                    {new Date(selectedOrder.createdAt).toLocaleString()}
                  </span>
                  <span className="text-[11px] text-[#77766F] block">
                    Payment Method: {formatPaymentMethod(selectedOrder)}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <StatusBadge status={selectedOrder.paymentStatus} />
                  <StatusBadge status={selectedOrder.orderStatus} />
                </div>
              </div>

              <div className="space-y-2">
                <h4 className="text-[11px] uppercase tracking-wider font-semibold text-[#292A26]">
                  Shipment Milestone Progress
                </h4>
                <OrderTimeline status={selectedOrder.orderStatus} />
              </div>

              {['Pending', 'Confirmed'].includes(selectedOrder.orderStatus) && (
                <div className="p-3 bg-[#FAF8F3] border border-[#E8E4DC] rounded-md flex items-center justify-between gap-3">
                  <span className="text-xs text-[#77766F]">
                    Need adjustments? You can cancel before courier dispatch.
                  </span>
                  <Button variant="danger" size="sm" onClick={() => handleCancelOrder(selectedOrder._id)}>
                    Cancel Order
                  </Button>
                </div>
              )}

              <div className="border-t border-[#E8E4DC] pt-3 text-xs space-y-2 text-[#77766F]">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="font-medium text-[#292A26]">₹{selectedOrder.subtotal}</span>
                </div>
                {selectedOrder.discount > 0 && (
                  <div className="flex justify-between text-[#A35338]">
                    <span>Discount</span>
                    <span className="font-medium">-₹{selectedOrder.discount}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span>Shipping</span>
                  <span className="font-medium text-[#292A26]">
                    {selectedOrder.shippingFee === 0 ? 'Complimentary' : `₹${selectedOrder.shippingFee}`}
                  </span>
                </div>
                <div className="flex justify-between text-base font-semibold text-[#292A26] pt-2 border-t border-[#E8E4DC]">
                  <span>Total Paid</span>
                  <span>₹{selectedOrder.grandTotal}</span>
                </div>
              </div>
            </div>
          </Modal>
        )}
      </Container>
    </div>
  );
}
