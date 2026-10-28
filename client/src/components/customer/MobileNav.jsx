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
    { label: 'Shop Toys Catalog', path: '/shop' },
    { label: 'My Orders', path: '/orders' },
    { label: 'About Us', path: '/about' },
    { label: 'Contact Support', path: '/contact' },
    { label: 'Admin Management', path: '/admin' },
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
      <div className="fixed inset-0 bg-[#292A26]/40 backdrop-blur-xs" onClick={onClose} />

      {/* Slide-over Drawer */}
      <div className="fixed inset-y-0 right-0 w-full max-w-xs bg-[#FAF8F3] border-l border-[#E8E4DC] shadow-2xl flex flex-col z-50 transform transition-transform">
        <div className="p-5 border-b border-[#E8E4DC] flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-6 h-6 rounded-sm bg-[#292A26] text-[#FAF8F3] flex items-center justify-center font-display text-xs font-semibold">
              TE
            </div>
            <span className="font-display font-medium text-lg text-[#292A26]">Toys Ecom</span>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-md text-[#77766F] hover:text-[#292A26] hover:bg-[#F1EEE7]"
            aria-label="Close menu"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Mobile Search */}
        <div className="p-4 border-b border-[#E8E4DC] bg-white">
          <form onSubmit={handleSearchSubmit}>
            <input
              type="text"
              placeholder="Search toys catalog..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-3.5 py-2 text-xs bg-[#FAF8F3] border border-[#E8E4DC] rounded-md text-[#292A26] placeholder:text-[#77766F]/60 focus:outline-none focus:border-[#292A26] focus:bg-white"
            />
          </form>
        </div>

        {/* Nav Links */}
        <nav className="flex-1 py-4 px-3 overflow-y-auto space-y-1">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              onClick={onClose}
              className="block px-3.5 py-2.5 rounded-md text-xs uppercase tracking-wider font-medium text-[#77766F] hover:text-[#292A26] hover:bg-[#F1EEE7] transition-colors"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Bottom Actions */}
        <div className="p-4 border-t border-[#E8E4DC] bg-white space-y-2">
          {user ? (
            <div className="space-y-2">
              <div className="p-2.5 bg-[#FAF8F3] border border-[#E8E4DC] rounded-md text-xs text-[#292A26] text-center font-medium">
                Signed in as: <span className="font-semibold">{user.name}</span>
              </div>
              <Button
                variant="outline"
                size="sm"
                className="w-full text-[#C98268] border-[#C98268]/40 hover:bg-[#C98268]/10"
                onClick={() => { logout(); onClose(); }}
              >
                Sign Out
              </Button>
            </div>
          ) : (
            <Button
              variant="primary"
              size="md"
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
