import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Card from '../../components/common/Card';
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
    return <LoadingState message="Loading business performance analytics..." className="py-20" />;
  }

  const totalRevenue = orders.reduce((sum, o) => sum + (o.grandTotal || 0), 0);
  const pendingCount = orders.filter((o) => o.orderStatus === 'Pending').length;
  const lowStockItems = products.filter((p) => p.stock < 10);

  const metrics = [
    { title: 'Total Revenue', value: `₹${totalRevenue}`, change: 'Live DB', icon: '💰', color: 'bg-emerald-50 text-emerald-700 border-emerald-200' },
    { title: 'Total Orders', value: `${orders.length}`, change: 'Total Placed', icon: '📦', color: 'bg-indigo-50 text-indigo-700 border-indigo-200' },
    { title: 'Active Products', value: `${products.length}`, change: 'In Catalog', icon: '🎁', color: 'bg-amber-50 text-amber-700 border-amber-200' },
    { title: 'Registered Customers', value: `${customersCount}`, change: 'Active Accounts', icon: '👥', color: 'bg-blue-50 text-blue-700 border-blue-200' },
    { title: 'Pending Orders', value: `${pendingCount}`, change: 'Requires Action', icon: '⏳', color: 'bg-rose-50 text-rose-700 border-rose-200' },
    { title: 'Low Stock Alerts', value: `${lowStockItems.length}`, change: '< 10 units left', icon: '⚠️', color: 'bg-orange-50 text-orange-700 border-orange-200' },
  ];

  return (
    <div className="space-y-8">
      {/* DASHBOARD HEADER & QUICK ACTIONS */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-gray-900 font-display">
            Business Dashboard 📊
          </h1>
          <p className="text-xs text-gray-500 mt-1">Real-time REST API e-commerce performance indicators &amp; inventory alerts.</p>
        </div>

        <div className="flex items-center gap-3">
          <Link to="/admin/products">
            <Button variant="primary" size="sm">
              + Add Product
            </Button>
          </Link>
          <Link to="/admin/orders">
            <Button variant="outline" size="sm">
              View All Orders
            </Button>
          </Link>
        </div>
      </div>

      {/* KPI METRICS GRID */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
        {metrics.map((m, idx) => (
          <Card key={idx} className={`p-4 border ${m.color} shadow-xs space-y-2`}>
            <div className="flex items-center justify-between">
              <span className="text-2xl">{m.icon}</span>
              <span className="text-[10px] font-extrabold uppercase px-2 py-0.5 rounded-full bg-white/80 border border-current">
                {m.change}
              </span>
            </div>
            <div>
              <span className="text-xs text-gray-500 font-medium block">{m.title}</span>
              <span className="text-xl font-extrabold text-gray-900 font-display block">{m.value}</span>
            </div>
          </Card>
        ))}
      </div>

      {/* TWO COLUMN GRID: RECENT ORDERS STREAM & LOW STOCK ALERTS */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Orders Stream Table */}
        <Card className="lg:col-span-2 p-6 border border-gray-200 shadow-xs space-y-4">
          <div className="flex items-center justify-between border-b border-gray-100 pb-3">
            <h3 className="font-bold text-gray-900 text-base">Recent Live Orders Stream</h3>
            <Link to="/admin/orders" className="text-xs font-semibold text-amber-600 hover:underline">
              View All Orders →
            </Link>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-gray-50 border-b border-gray-200 text-gray-500 font-semibold uppercase">
                <tr>
                  <th className="py-2.5 px-3">Order ID</th>
                  <th className="py-2.5 px-3">Customer</th>
                  <th className="py-2.5 px-3">Total</th>
                  <th className="py-2.5 px-3">Status</th>
                  <th className="py-2.5 px-3">Date</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 text-gray-700">
                {orders.map((ord) => (
                  <tr key={ord._id} className="hover:bg-gray-50">
                    <td className="py-3 px-3 font-bold font-mono text-gray-900">#{ord.orderNumber}</td>
                    <td className="py-3 px-3 font-medium">{ord.customer?.name || 'Customer'}</td>
                    <td className="py-3 px-3 font-bold text-gray-900">₹{ord.grandTotal}</td>
                    <td className="py-3 px-3"><StatusBadge status={ord.orderStatus} /></td>
                    <td className="py-3 px-3 text-gray-400 text-[11px]">{new Date(ord.createdAt).toLocaleDateString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>

        {/* Low Stock Alerts */}
        <Card className="p-6 border border-gray-200 shadow-xs space-y-4">
          <div className="flex items-center justify-between border-b border-gray-100 pb-3">
            <h3 className="font-bold text-gray-900 text-base flex items-center gap-1.5">
              <span>⚠️ Low Stock Alerts</span>
            </h3>
            <span className="text-xs text-rose-600 font-bold bg-rose-50 px-2 py-0.5 rounded">Restock Urgently</span>
          </div>

          <div className="space-y-3">
            {lowStockItems.slice(0, 4).map((item) => (
              <div key={item._id} className="p-3 bg-gray-50 rounded-xl border border-gray-200 flex items-center justify-between gap-3 text-xs">
                <div className="flex items-center gap-2.5 min-w-0">
                  <img src={item.thumbnailUrl} alt={item.name} className="w-10 h-10 object-cover rounded-lg border flex-shrink-0" />
                  <div className="min-w-0">
                    <h4 className="font-semibold text-gray-900 truncate">{item.name}</h4>
                    <span className="text-rose-600 font-bold block">Only {item.stock} left</span>
                  </div>
                </div>
                <Link to="/admin/products">
                  <Button variant="outline" size="sm" className="text-[10px] px-2 py-1">
                    Restock
                  </Button>
                </Link>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}
