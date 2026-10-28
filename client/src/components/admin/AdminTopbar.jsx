import React from 'react';
import { Link } from 'react-router-dom';

export default function AdminTopbar({ onOpenMobileMenu }) {
  return (
    <header className="h-18 bg-white border-b border-[#E8E4DC] px-4 sm:px-6 flex items-center justify-between sticky top-0 z-30">
      <div className="flex items-center gap-4">
        {/* Mobile Sidebar Toggle Button */}
        <button
          type="button"
          onClick={onOpenMobileMenu}
          className="lg:hidden p-2 text-[#292A26] hover:bg-[#F1EEE7] rounded-md transition-colors"
          aria-label="Open sidebar"
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>

        {/* Global Admin Search Bar */}
        <div className="relative hidden sm:block w-64 md:w-80">
          <input
            type="text"
            placeholder="Search products, orders, customers..."
            className="w-full pl-9 pr-4 py-2 text-xs bg-[#FAF8F3] border border-[#E8E4DC] rounded-md text-[#292A26] placeholder:text-[#77766F]/60 focus:bg-white focus:outline-none focus:border-[#292A26] transition-all"
          />
          <svg className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-[#77766F]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>
      </div>

      {/* Right User Badge & Store Link */}
      <div className="flex items-center gap-4">
        <Link
          to="/"
          className="text-xs uppercase tracking-wider font-semibold text-[#77766F] hover:text-[#292A26] transition-colors hidden sm:block"
        >
          Live Storefront ↗
        </Link>

        <div className="flex items-center gap-3 border-l border-[#E8E4DC] pl-4">
          <div className="w-8 h-8 rounded-sm bg-[#292A26] text-white font-medium text-xs flex items-center justify-center">
            AD
          </div>
          <div className="hidden sm:block text-left">
            <span className="font-semibold text-[#292A26] text-xs block">Admin Manager</span>
            <span className="text-[10px] text-[#77766F] block font-mono">admin@toysecom.com</span>
          </div>
        </div>
      </div>
    </header>
  );
}
