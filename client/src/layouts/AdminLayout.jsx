import React, { useState } from 'react';
import { Outlet, Navigate } from 'react-router-dom';
import AdminSidebar from '../components/admin/AdminSidebar';
import AdminTopbar from '../components/admin/AdminTopbar';
import AdminMobileSidebar from '../components/admin/AdminMobileSidebar';
import LoadingState from '../components/common/LoadingState';
import { useAuth } from '../context/AuthContext';

export default function AdminLayout() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { user, isLoading } = useAuth();

  if (isLoading) {
    return <LoadingState message="Verifying administrator authorization..." className="min-h-screen" />;
  }

  // Redirect to Admin Login if not authenticated as an Administrator
  if (!user || user.role !== 'ADMIN') {
    return <Navigate to="/admin/login" replace />;
  }

  return (
    <div className="min-h-screen flex bg-[#FAF8F3] text-[#292A26] font-sans antialiased">
      {/* Desktop Persistent Sidebar */}
      <AdminSidebar className="hidden lg:flex flex-shrink-0" />

      {/* Mobile Slide-over Drawer */}
      <AdminMobileSidebar
        isOpen={mobileMenuOpen}
        onClose={() => setMobileMenuOpen(false)}
      />

      {/* Main Administrative Work Area */}
      <div className="flex-1 flex flex-col min-w-0">
        <AdminTopbar onOpenMobileMenu={() => setMobileMenuOpen(true)} />

        <main className="p-4 sm:p-6 flex-1 overflow-y-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
