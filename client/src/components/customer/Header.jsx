import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Container from '../common/Container';
import MobileNav from './MobileNav';
import AuthModal from '../../pages/customer/AuthModal';
import { useAuth } from '../../context/AuthContext';
import { useCart } from '../../context/CartContext';

export default function Header({ onOpenMobileMenu }) {
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const { user, logout } = useAuth();
  const { cartCount } = useCart();
  const navigate = useNavigate();

  const handleOpenMenu = () => {
    if (onOpenMobileMenu) {
      onOpenMobileMenu();
    } else {
      setIsMobileNavOpen(true);
    }
  };

  return (
    <header className="sticky top-0 z-40 bg-[#FAF8F3]/95 backdrop-blur-md border-b border-[#E8E4DC] transition-all">
      {/* TOP ANNOUNCEMENT BAR */}
      <div className="bg-[#F1EEE7] text-[#292A26] border-b border-[#E8E4DC] text-[11px] font-medium py-2 px-4 text-center tracking-wider uppercase">
        Free Delivery across India on orders over ₹1,999 • Code <span className="font-semibold underline decoration-[#C98268] text-[#C98268]">SUMMER30</span> for 30% OFF
      </div>

      <Container>
        <div className="flex items-center justify-between h-18 sm:h-20 gap-4">
          {/* BRAND LOGO */}
          <Link to="/" className="flex items-center gap-3 group flex-shrink-0">
            <div className="w-8 h-8 rounded-sm bg-[#292A26] text-[#FAF8F3] flex items-center justify-center font-display text-sm font-semibold tracking-tight transition-transform group-hover:scale-105">
              TE
            </div>
            <div className="flex flex-col">
              <span className="font-display font-medium text-xl sm:text-2xl text-[#292A26] leading-none tracking-tight">
                Toys <span className="font-light italic text-[#77766F]">Ecom</span>
              </span>
              <span className="text-[9px] font-medium uppercase tracking-[0.22em] text-[#77766F] leading-none mt-1">
                Conscious Play &amp; Design
              </span>
            </div>
          </Link>

          {/* DESKTOP NAVIGATION LINKS */}
          <nav className="hidden md:flex items-center gap-8 text-xs uppercase tracking-widest font-medium text-[#77766F]">
            <Link to="/" className="hover:text-[#292A26] transition-colors py-1">Home</Link>
            <Link to="/shop" className="hover:text-[#292A26] transition-colors py-1">Shop Toys</Link>
            <Link to="/about" className="hover:text-[#292A26] transition-colors py-1">About</Link>
            <Link to="/contact" className="hover:text-[#292A26] transition-colors py-1">Contact</Link>
          </nav>

          {/* RIGHT ACTION BUTTONS */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Search Link */}
            <Link
              to="/shop"
              className="p-2 text-[#292A26] hover:text-[#45463F] hover:bg-[#F1EEE7] rounded-md transition-colors"
              aria-label="Search Catalog"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-4.35-4.35m1.35-5.65a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </Link>

            {/* Shopping Cart Trigger */}
            <Link
              to="/cart"
              className="relative p-2 text-[#292A26] hover:text-[#45463F] hover:bg-[#F1EEE7] rounded-md transition-all"
              aria-label="Shopping Cart"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
              </svg>
              {cartCount > 0 && (
                <span className="absolute 0 top-0.5 right-0.5 bg-[#292A26] text-white text-[9px] font-semibold w-4 h-4 rounded-full flex items-center justify-center">
                  {cartCount > 99 ? '99+' : cartCount}
                </span>
              )}
            </Link>

            {/* Auth / Account Profile Trigger */}
            {user ? (
              <div className="flex items-center gap-2">
                <Link
                  to="/orders"
                  className="flex items-center gap-2 px-3 py-1.5 rounded-md bg-[#F1EEE7] border border-[#E8E4DC] text-[#292A26] text-xs font-medium hover:bg-[#E8E4DC]/60 transition-colors"
                >
                  <span className="w-5 h-5 rounded-full bg-[#292A26] text-white font-semibold flex items-center justify-center text-[10px]">
                    {user.name ? user.name.charAt(0).toUpperCase() : 'U'}
                  </span>
                  <span className="hidden sm:inline line-clamp-1 max-w-[100px] text-xs">{user.name}</span>
                </Link>
                <button
                  type="button"
                  onClick={logout}
                  className="text-xs uppercase tracking-wider font-medium text-[#77766F] hover:text-[#C98268] px-2 py-1 transition-colors"
                  title="Sign Out"
                >
                  Logout
                </button>
              </div>
            ) : (
              <button
                type="button"
                onClick={() => setIsAuthModalOpen(true)}
                className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-md border border-[#292A26] text-[#292A26] text-xs uppercase tracking-wider font-semibold hover:bg-[#292A26] hover:text-white transition-all cursor-pointer"
              >
                <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
                <span>Sign In</span>
              </button>
            )}

            {/* Mobile Hamburger Toggle */}
            <button
              type="button"
              onClick={handleOpenMenu}
              className="md:hidden p-2 text-[#292A26] hover:bg-[#F1EEE7] rounded-md transition-colors"
              aria-label="Open Navigation Menu"
            >
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 6h16M4 12h16M4 18h16" />
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
