import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Button from '../../components/common/Button';
import StatusBadge from '../../components/common/StatusBadge';
import LoadingState from '../../components/common/LoadingState';
import { orderApi, productApi, userApi } from '../../services/api';

export default function AdminDashboardPage() {
  const [orders, setOrders] = useState([]);
  const [products, setProducts] = useState([]);
  const [customersCount, setCustomersCount] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function loadDashboardMetrics() {
      try {
        const [ordRes, prodRes, custRes] = await Promise.all([
          orderApi.getAllOrders({ limit: 5 }),
          productApi.getProducts({ limit: 100 }),
          userApi.getAllCustomers({ limit: 1 }),
        ]);

        if (ordRes.success) setOrders(ordRes.data);
        if (prodRes.success) setProducts(prodRes.data);
        if (custRes.success) setCustomersCount(custRes.total);
      } catch (err) {
        console.error('[Admin Dashboard Metrics Error]', err.message);
      } finally {
        setIsLoading(false);
      }
    }
    loadDashboardMetrics();
  }, []);

  if (isLoading) {
    return <LoadingState text="Loading analytics..." className="py-24" />;
  }

  const totalRevenue = orders.reduce((sum, o) => sum + (o.grandTotal || 0), 0);
  const pendingCount = orders.filter((o) => o.orderStatus === 'Pending').length;
  const lowStockItems = products.filter((p) => p.stock < 10);

  const metrics = [
    { title: 'Total Revenue', value: `₹${totalRevenue}`, note: 'Live Inflow' },
    { title: 'Total Orders', value: `${orders.length}`, note: 'Fulfilled & Active' },
    { title: 'Catalog Items', value: `${products.length}`, note: 'Active SKUs' },
    { title: 'Registered Clients', value: `${customersCount}`, note: 'Customer Base' },
    { title: 'Pending Shipments', value: `${pendingCount}`, note: 'Requires Action' },
    { title: 'Low Stock Alerts', value: `${lowStockItems.length}`, note: '< 10 units left' },
  ];

  return (
    <div className="space-y-8">
      {/* DASHBOARD HEADER */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b border-[#E8E4DC]">
        <div>
          <span className="text-[10px] uppercase tracking-widest font-semibold text-[#77766F] block mb-1">
            Performance &amp; Inventory
          </span>
          <h1 className="text-2xl sm:text-3xl font-display font-medium text-[#292A26]">
            Storefront Analytics &amp; Operations
          </h1>
        </div>

        <div className="flex items-center gap-3">
          <Link to="/admin/products">
            <Button variant="primary" size="sm">
              + New Product
            </Button>
          </Link>
          <Link to="/admin/orders">
            <Button variant="outline" size="sm">
              All Orders
            </Button>
          </Link>
        </div>
      </div>

      {/* KPI METRICS GRID */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
        {metrics.map((m, idx) => (
          <div key={idx} className="p-5 bg-white border border-[#E8E4DC] rounded-lg space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-[10px] uppercase tracking-wider font-semibold text-[#77766F]">
                {m.title}
              </span>
            </div>
            <div>
              <span className="text-2xl font-display font-medium text-[#292A26] block">
                {m.value}
              </span>
              <span className="text-[11px] text-[#A8B5A0] font-medium block mt-0.5">
                {m.note}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* TWO COLUMN GRID: RECENT ORDERS STREAM & LOW STOCK ALERTS */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Orders Stream Table */}
        <div className="lg:col-span-2 p-6 bg-white border border-[#E8E4DC] rounded-lg space-y-4">
          <div className="flex items-center justify-between border-b border-[#E8E4DC] pb-3">
            <h3 className="font-display font-medium text-lg text-[#292A26]">Recent Orders Stream</h3>
            <Link to="/admin/orders" className="text-xs uppercase tracking-wider font-semibold text-[#292A26] hover:text-[#C98268]">
              View All Orders →
            </Link>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-[#FAF8F3] border-b border-[#E8E4DC] text-[#77766F] font-medium uppercase tracking-wider text-[11px]">
                <tr>
                  <th className="py-3 px-3">Order ID</th>
                  <th className="py-3 px-3">Customer</th>
                  <th className="py-3 px-3">Amount</th>
                  <th className="py-3 px-3">Status</th>
                  <th className="py-3 px-3">Date</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#E8E4DC] text-[#292A26]">
                {orders.map((ord) => (
                  <tr key={ord._id} className="hover:bg-[#FAF8F3] transition-colors">
                    <td className="py-3 px-3 font-mono font-medium">#{ord.orderNumber}</td>
                    <td className="py-3 px-3">{ord.customer?.name || 'Customer'}</td>
                    <td className="py-3 px-3 font-semibold">₹{ord.grandTotal}</td>
                    <td className="py-3 px-3"><StatusBadge status={ord.orderStatus} /></td>
                    <td className="py-3 px-3 text-[#77766F] text-[11px]">{new Date(ord.createdAt).toLocaleDateString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Low Stock Alerts */}
        <div className="p-6 bg-white border border-[#E8E4DC] rounded-lg space-y-4">
          <div className="flex items-center justify-between border-b border-[#E8E4DC] pb-3">
            <h3 className="font-display font-medium text-lg text-[#292A26]">Inventory Alerts</h3>
            <span className="text-[10px] uppercase tracking-wider font-semibold text-[#A35338] bg-[#C98268]/15 px-2 py-0.5 rounded-sm">
              Restock Priority
            </span>
          </div>

          <div className="space-y-3">
            {lowStockItems.slice(0, 4).map((item) => (
              <div key={item._id} className="p-3 bg-[#FAF8F3] rounded-md border border-[#E8E4DC] flex items-center justify-between gap-3 text-xs">
                <div className="flex items-center gap-2.5 min-w-0">
                  <img src={item.thumbnailUrl} alt={item.name} className="w-10 h-10 object-cover rounded-sm bg-white border border-[#E8E4DC] flex-shrink-0" />
                  <div className="min-w-0">
                    <h4 className="font-medium text-[#292A26] truncate">{item.name}</h4>
                    <span className="text-[#C98268] text-[11px] font-semibold block">{item.stock} left in stock</span>
                  </div>
                </div>
                <Link to="/admin/products">
                  <Button variant="outline" size="sm" className="text-[10px] px-2 py-1">
                    Manage
                  </Button>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
