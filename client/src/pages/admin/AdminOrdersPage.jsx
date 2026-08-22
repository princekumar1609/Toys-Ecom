import React, { useState, useEffect } from 'react';
import Card from '../../components/common/Card';
import Button from '../../components/common/Button';
import Input from '../../components/common/Input';
import Select from '../../components/common/Select';
import StatusBadge from '../../components/common/StatusBadge';
import Modal from '../../components/common/Modal';
import Pagination from '../../components/common/Pagination';
import LoadingState from '../../components/common/LoadingState';
import EmptyState from '../../components/common/EmptyState';
import OrderTimeline from '../../components/customer/OrderTimeline';
import { orderApi } from '../../services/api';

export default function AdminOrdersPage() {
  const [orders, setOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('ALL');
  const [paymentFilter, setPaymentFilter] = useState('ALL');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalOrders, setTotalOrders] = useState(0);

  const [selectedOrder, setSelectedOrder] = useState(null);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);

  const [newOrderStatus, setNewOrderStatus] = useState('Pending');
  const [newPaymentStatus, setNewPaymentStatus] = useState('PAID');
  const [statusNote, setStatusNote] = useState('');

  const fetchOrders = async () => {
    setIsLoading(true);
    try {
      const params = {
        page: currentPage,
        limit: 8,
      };
      if (searchTerm) params.search = searchTerm;
      if (statusFilter !== 'ALL') params.status = statusFilter;
      if (paymentFilter !== 'ALL') params.paymentStatus = paymentFilter;

      const res = await orderApi.getAllOrders(params);
      if (res.success) {
        setOrders(res.data);
        setTotalPages(res.pages);
        setTotalOrders(res.total);
      }
    } catch (err) {
      console.error('[Admin Orders Fetch Error]', err.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, [searchTerm, statusFilter, paymentFilter, currentPage]);

  const handleOpenUpdateModal = (order) => {
    setSelectedOrder(order);
    setNewOrderStatus(order.orderStatus);
    setNewPaymentStatus(order.paymentStatus);
    setStatusNote('');
    setIsUpdateModalOpen(true);
  };

  const handleUpdateStatusSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await orderApi.updateOrderStatus(selectedOrder._id, {
        orderStatus: newOrderStatus,
        paymentStatus: newPaymentStatus,
        note: statusNote,
      });
      if (res.success) {
        setIsUpdateModalOpen(false);
        fetchOrders();
      }
    } catch (err) {
      alert(err.message || 'Failed to update order status');
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-gray-900 font-display">
            Order Fulfillment Center 📦
          </h1>
          <p className="text-xs text-gray-500 mt-1">Manage orders, update shipment tracking, and process payments.</p>
        </div>
      </div>

      <Card className="p-4 border border-gray-200 shadow-xs flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex flex-col sm:flex-row items-center gap-3 w-full md:w-auto flex-1">
          <Input
            placeholder="Search Order Number..."
            value={searchTerm}
            onChange={(e) => { setSearchTerm(e.target.value); setCurrentPage(1); }}
            className="w-full sm:w-64"
          />

          <select
            value={statusFilter}
            onChange={(e) => { setStatusFilter(e.target.value); setCurrentPage(1); }}
            className="w-full sm:w-44 text-xs p-2.5 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
          >
            <option value="ALL">All Order Statuses</option>
            <option value="Pending">Pending</option>
            <option value="Confirmed">Confirmed</option>
            <option value="Packed">Packed</option>
            <option value="Shipped">Shipped</option>
            <option value="Delivered">Delivered</option>
            <option value="Cancelled">Cancelled</option>
          </select>
        </div>

        <div className="text-xs text-gray-500 font-medium">
          Showing <strong className="text-gray-900">{totalOrders}</strong> orders
        </div>
      </Card>

      <Card className="border border-gray-200 shadow-xs overflow-hidden">
        {isLoading ? (
          <LoadingState message="Fetching live database orders..." className="py-20" />
        ) : orders.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-gray-50 border-b border-gray-200 text-gray-500 font-bold uppercase tracking-wider">
                <tr>
                  <th className="py-3 px-4">Order ID &amp; Date</th>
                  <th className="py-3 px-4">Customer</th>
                  <th className="py-3 px-4">Total</th>
                  <th className="py-3 px-4">Payment</th>
                  <th className="py-3 px-4">Order Status</th>
                  <th className="py-3 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 text-gray-700">
                {orders.map((ord) => (
                  <tr key={ord._id} className="hover:bg-gray-50 transition-colors">
                    <td className="py-3 px-4 font-bold font-mono text-gray-900">
                      #{ord.orderNumber}
                      <span className="block text-[10px] text-gray-400 font-sans font-normal">{new Date(ord.createdAt).toLocaleDateString()}</span>
                    </td>
                    <td className="py-3 px-4 font-semibold text-gray-900">
                      {ord.customer?.name || 'Customer'}
                    </td>
                    <td className="py-3 px-4 font-bold text-gray-900 text-sm">₹{ord.grandTotal}</td>
                    <td className="py-3 px-4"><StatusBadge status={ord.paymentStatus} /></td>
                    <td className="py-3 px-4"><StatusBadge status={ord.orderStatus} /></td>
                    <td className="py-3 px-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button onClick={() => { setSelectedOrder(ord); setIsDetailsOpen(true); }} className="p-1.5 text-gray-500 hover:text-amber-600 rounded-lg">👁️ Details</button>
                        <button onClick={() => handleOpenUpdateModal(ord)} className="p-1.5 text-amber-700 bg-amber-50 rounded-lg font-bold">⚙️ Update Status</button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <EmptyState title="No Orders Found" description="Try clearing your search query or status filter." />
        )}

        <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={(p) => setCurrentPage(p)} className="m-4" />
      </Card>

      {/* UPDATE STATUS MODAL */}
      {selectedOrder && (
        <Modal isOpen={isUpdateModalOpen} onClose={() => setIsUpdateModalOpen(false)} title={`Update Status — #${selectedOrder.orderNumber}`}>
          <form onSubmit={handleUpdateStatusSubmit} className="space-y-4 text-xs">
            <Select label="Order Fulfillment Status" value={newOrderStatus} onChange={(e) => setNewOrderStatus(e.target.value)} options={['Pending', 'Confirmed', 'Packed', 'Shipped', 'Delivered', 'Cancelled']} />
            <Select label="Payment Status" value={newPaymentStatus} onChange={(e) => setNewPaymentStatus(e.target.value)} options={['PENDING', 'PAID', 'FAILED', 'REFUNDED']} />
            <div className="flex justify-end gap-2 border-t pt-3">
              <Button variant="outline" size="sm" onClick={() => setIsUpdateModalOpen(false)}>Cancel</Button>
              <Button type="submit" variant="primary" size="sm">Save Status Update</Button>
            </div>
          </form>
        </Modal>
      )}

      {/* DETAILS MODAL */}
      {selectedOrder && (
        <Modal isOpen={isDetailsOpen} onClose={() => setIsDetailsOpen(false)} title={`Order Inspection — #${selectedOrder.orderNumber}`}>
          <div className="space-y-4 text-xs">
            <OrderTimeline status={selectedOrder.orderStatus} />
            <div className="bg-gray-50 p-3 rounded-xl border">
              <strong>Customer:</strong> {selectedOrder.customer?.name} ({selectedOrder.customer?.email})
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
}
