import React from 'react';
import AdminSidebar from './AdminSidebar';

export default function AdminMobileSidebar({ isOpen, onClose }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 lg:hidden">
      {/* Backdrop */}
      <div className="fixed inset-0 bg-black/50 backdrop-blur-xs" onClick={onClose} />

      {/* Slide-over Drawer */}
      <div className="fixed inset-y-0 left-0 w-64 bg-gray-900 shadow-2xl z-50">
        <AdminSidebar />
      </div>
    </div>
  );
}
