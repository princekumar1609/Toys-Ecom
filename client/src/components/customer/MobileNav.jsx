import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Button from '../common/Button';
import { useAuth } from '../../context/AuthContext';

export default function MobileNav({ isOpen, onClose, onOpenAuthModal }) {
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const navLinks = [
    { label: 'Home', path: '/' },
    { label: 'Shop Catalog', path: '/shop' },
    { label: 'My Orders', path: '/orders' },
    { label: 'About Us', path: '/about' },
    { label: 'Contact Support', path: '/contact' },
    { label: 'Admin Dashboard', path: '/admin' },
  ];

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/shop?search=${encodeURIComponent(searchQuery.trim())}`);
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 lg:hidden">
      {/* Backdrop */}
      <div className="fixed inset-0 bg-black/50 backdrop-blur-xs" onClick={onClose} />

      {/* Slide-over Drawer */}
      <div className="fixed inset-y-0 right-0 w-full max-w-xs bg-white shadow-2xl flex flex-col z-50 transform transition-transform">
        <div className="p-4 border-b border-gray-100 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-2xl">🧸</span>
            <span className="font-bold text-gray-900 font-display">ToyNest Menu</span>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full text-gray-400 hover:bg-gray-100 hover:text-gray-600"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Mobile Search */}
        <div className="p-4 border-b border-gray-100">
          <form onSubmit={handleSearchSubmit}>
            <input
              type="text"
              placeholder="Search toys..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-3.5 py-2 text-sm bg-gray-100 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
            />
          </form>
        </div>

        {/* Nav Links */}
        <nav className="flex-1 py-4 px-2 overflow-y-auto space-y-1">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              onClick={onClose}
              className="block px-4 py-2.5 rounded-lg text-sm font-medium text-gray-700 hover:bg-amber-50 hover:text-amber-600 transition-colors"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Bottom Actions */}
        <div className="p-4 border-t border-gray-100 space-y-2">
          {user ? (
            <div className="space-y-2">
              <div className="p-2 bg-amber-50 rounded-xl text-xs font-bold text-gray-900 text-center">
                Signed in as: {user.name}
              </div>
              <Button
                variant="outline"
                className="w-full text-rose-500 hover:bg-rose-50 border-rose-200"
                onClick={() => { logout(); onClose(); }}
              >
                Sign Out
              </Button>
            </div>
          ) : (
            <Button
              variant="primary"
              className="w-full"
              onClick={() => {
                onClose();
                if (onOpenAuthModal) onOpenAuthModal();
              }}
            >
              Customer Sign In / Register
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
