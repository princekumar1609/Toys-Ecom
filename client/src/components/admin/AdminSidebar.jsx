import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';

export default function AdminSidebar({ className = '', onClose }) {
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
    <aside className={`w-64 bg-[#292A26] text-white flex flex-col min-h-screen border-r border-[#3C3D37] ${className}`}>
      {/* Brand Header */}
      <div className="h-20 flex items-center px-6 border-b border-[#3C3D37] gap-3">
        <div className="w-8 h-8 rounded-sm bg-[#FAF8F3] text-[#292A26] flex items-center justify-center font-display text-sm font-semibold">
          TE
        </div>
        <div>
          <span className="font-display font-medium text-lg text-white block leading-tight">Toys Ecom</span>
          <span className="text-[9px] uppercase tracking-widest text-[#A8B5A0] block">Admin Portal</span>
        </div>
      </div>

      {/* Main Navigation Items */}
      <nav className="flex-1 py-6 px-4 space-y-1.5 overflow-y-auto">
        <span className="text-[10px] font-semibold text-[#77766F] uppercase tracking-wider px-3 mb-2 block">
          Management
        </span>
        {navItems.map((item) => {
          const isActive = location.pathname.startsWith(item.path);
          return (
            <Link
              key={item.path}
              to={item.path}
              onClick={onClose}
              className={`flex items-center gap-3 px-3.5 py-2.5 rounded-md text-xs uppercase tracking-wider font-medium transition-all ${
                isActive
                  ? 'bg-[#FAF8F3] text-[#292A26] font-semibold'
                  : 'text-[#E8E4DC] hover:bg-[#3C3D37] hover:text-white'
              }`}
            >
              <span className="text-base">{item.icon}</span>
              <span>{item.label}</span>
            </Link>
          );
        })}
      </nav>

      {/* Footer & Return Link */}
      <div className="p-4 border-t border-[#3C3D37] space-y-2">
        <Link
          to="/"
          className="flex items-center gap-2 px-3 py-2 text-xs text-[#E8E4DC] hover:text-white rounded-md hover:bg-[#3C3D37] transition-colors"
        >
          <span>←</span> Storefront View
        </Link>
        <button
          type="button"
          onClick={handleLogout}
          className="w-full flex items-center gap-2 px-3 py-2 text-xs uppercase tracking-wider font-semibold text-[#C98268] hover:text-[#E4AEA0] rounded-md hover:bg-[#3C3D37] transition-colors cursor-pointer"
        >
          <span>🚪</span> Sign Out Admin
        </button>
      </div>
    </aside>
  );
}
