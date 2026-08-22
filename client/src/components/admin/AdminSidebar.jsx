import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';

export default function AdminSidebar({ className = '' }) {
  const location = useLocation();
  const navigate = useNavigate();

  const navItems = [
    { label: 'Dashboard', path: '/admin/dashboard', icon: '📊' },
    { label: 'Products', path: '/admin/products', icon: '🎁' },
    { label: 'Orders', path: '/admin/orders', icon: '📦' },
    { label: 'Customers', path: '/admin/customers', icon: '👥' },
    { label: 'Messages', path: '/admin/messages', icon: '💬' },
  ];

  const handleLogout = () => {
    navigate('/admin/login');
  };

  return (
    <aside className={`w-64 bg-gray-900 text-white flex flex-col min-h-screen border-r border-gray-800 ${className}`}>
      {/* Brand Header */}
      <div className="h-16 flex items-center px-6 border-b border-gray-800 text-xl font-bold font-display text-amber-400 gap-2">
        <span>🧸</span>
        <span>ToyNest Admin</span>
      </div>

      {/* Main Navigation Items */}
      <nav className="flex-1 py-6 px-4 space-y-1.5 overflow-y-auto">
        <span className="text-[10px] font-bold text-gray-500 uppercase tracking-wider px-3 mb-2 block">
          Management Portal
        </span>
        {navItems.map((item) => {
          const isActive = location.pathname.startsWith(item.path);
          return (
            <Link
              key={item.path}
              to={item.path}
              className={`flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-medium transition-all ${
                isActive
                  ? 'bg-amber-500 text-white font-semibold shadow-sm'
                  : 'text-gray-400 hover:bg-gray-800 hover:text-white'
              }`}
            >
              <span className="text-base">{item.icon}</span>
              <span>{item.label}</span>
            </Link>
          );
        })}
      </nav>

      {/* Footer & Return Link */}
      <div className="p-4 border-t border-gray-800 space-y-2">
        <Link
          to="/"
          className="flex items-center gap-2 px-3 py-2 text-xs text-gray-400 hover:text-amber-400 rounded-lg hover:bg-gray-800 transition-colors"
        >
          <span>←</span> Return to Main Store
        </Link>
        <button
          type="button"
          onClick={handleLogout}
          className="w-full flex items-center gap-2 px-3 py-2 text-xs font-semibold text-rose-400 hover:text-rose-300 rounded-lg hover:bg-rose-950/30 transition-colors"
        >
          <span>🚪</span> Sign Out Admin
        </button>
      </div>
    </aside>
  );
}
