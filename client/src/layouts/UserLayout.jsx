import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Header from '../components/customer/Header';
import MobileNav from '../components/customer/MobileNav';
import Footer from '../components/customer/Footer';

export default function UserLayout() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [cartCount, setCartCount] = useState(2); // Initial mock cart counter

  return (
    <div className="min-h-screen flex flex-col bg-gray-50 text-gray-900 font-sans">
      {/* Global Customer Header */}
      <Header
        onOpenMobileMenu={() => setMobileMenuOpen(true)}
        cartCount={cartCount}
      />

      {/* Slide-over Mobile Navigation Drawer */}
      <MobileNav
        isOpen={mobileMenuOpen}
        onClose={() => setMobileMenuOpen(false)}
      />

      {/* Route Outlet Content */}
      <main className="flex-grow">
        <Outlet context={{ cartCount, setCartCount }} />
      </main>

      {/* Global Customer Footer */}
      <Footer />
    </div>
  );
}
