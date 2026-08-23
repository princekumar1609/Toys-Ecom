import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Container from '../common/Container';
import MobileNav from './MobileNav';
import AuthModal from '../../pages/customer/AuthModal';
import { useAuth } from '../../context/AuthContext';
import { useCart } from '../../context/CartContext';

export default function Header() {
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const { user, logout } = useAuth();
  const { cartCount } = useCart();
  const navigate = useNavigate();

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-gray-100 shadow-2xs transition-all">
      {/* TOP ANNOUNCEMENT BAR */}
      <div className="bg-amber-500 text-white text-[11px] font-semibold py-1.5 px-4 text-center tracking-wide">
        🎉 Free Delivery across India on orders over ₹1,999! Use coupon <span className="underline font-bold">SUMMER30</span> for 30% OFF!
      </div>

      <Container>
        <div className="flex items-center justify-between h-16 sm:h-20 gap-4">
          {/* BRAND LOGO */}
          <Link to="/" className="flex items-center gap-2 group flex-shrink-0">
            <div className="w-10 h-10 rounded-2xl bg-amber-500 text-white flex items-center justify-center text-xl font-bold shadow-md group-hover:scale-105 transition-transform">
              🧸
            </div>
            <div className="flex flex-col">
              <span className="font-display font-extrabold text-xl sm:text-2xl text-gray-900 leading-none tracking-tight">
                Toy<span className="text-amber-500">Nest</span>
              </span>
              <span className="text-[9px] font-semibold uppercase tracking-widest text-gray-400 leading-none mt-0.5">
                Joyful Learning &amp; Play
              </span>
            </div>
          </Link>

          {/* DESKTOP NAVIGATION LINKS */}
          <nav className="hidden md:flex items-center gap-8 text-sm font-semibold text-gray-700">
            <Link to="/" className="hover:text-amber-500 transition-colors">Home</Link>
            <Link to="/shop" className="hover:text-amber-500 transition-colors">Shop Toys</Link>
            <Link to="/about" className="hover:text-amber-500 transition-colors">About Us</Link>
            <Link to="/contact" className="hover:text-amber-500 transition-colors">Contact</Link>
          </nav>

          {/* RIGHT ACTION BUTTONS */}
          <div className="flex items-center gap-3 sm:gap-4">
            {/* Shopping Cart Trigger */}
            <Link
              to="/cart"
              className="relative p-2 text-gray-700 hover:text-amber-500 hover:bg-amber-50 rounded-xl transition-all"
              aria-label="Shopping Cart"
            >
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
              </svg>
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-amber-500 text-white text-[10px] font-extrabold w-5 h-5 rounded-full flex items-center justify-center border-2 border-white shadow-xs">
                  {cartCount > 99 ? '99+' : cartCount}
                </span>
              )}
            </Link>

            {/* Auth / Account Profile Trigger */}
            {user ? (
              <div className="flex items-center gap-2">
                <Link
                  to="/orders"
                  className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-amber-50 border border-amber-200 text-amber-900 text-xs font-bold hover:bg-amber-100 transition-colors"
                >
                  <span className="w-6 h-6 rounded-full bg-amber-500 text-white font-bold flex items-center justify-center text-[10px]">
                    {user.name.charAt(0)}
                  </span>
                  <span className="hidden sm:inline line-clamp-1 max-w-[100px]">{user.name}</span>
                </Link>
                <button
                  type="button"
                  onClick={logout}
                  className="text-xs font-semibold text-rose-500 hover:text-rose-700 px-2 py-1"
                  title="Sign Out"
                >
                  Logout
                </button>
              </div>
            ) : (
              <button
                type="button"
                onClick={() => setIsAuthModalOpen(true)}
                className="flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-2 rounded-xl bg-amber-500 text-white text-xs font-bold hover:bg-amber-600 shadow-sm transition-all"
              >
                <span>👤</span>
                <span>Sign In</span>
              </button>
            )}

            {/* Mobile Hamburger Toggle */}
            <button
              type="button"
              onClick={() => setIsMobileNavOpen(true)}
              className="md:hidden p-2 text-gray-700 hover:text-amber-500 rounded-xl hover:bg-gray-100"
              aria-label="Open Navigation Menu"
            >
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </Container>

      {/* MOBILE DRAWER */}
      <MobileNav
        isOpen={isMobileNavOpen}
        onClose={() => setIsMobileNavOpen(false)}
        onOpenAuthModal={() => setIsAuthModalOpen(true)}
      />

      {/* AUTHENTICATION MODAL */}
      <AuthModal isOpen={isAuthModalOpen} onClose={() => setIsAuthModalOpen(false)} />
    </header>
  );
}
