import React from 'react';

export default function StatusBadge({ status, className = '' }) {
  const statusMap = {
    // Order Statuses
    Pending: { label: 'Pending', bg: 'bg-amber-100', text: 'text-amber-800', border: 'border-amber-200' },
    Confirmed: { label: 'Confirmed', bg: 'bg-blue-100', text: 'text-blue-800', border: 'border-blue-200' },
    Packed: { label: 'Packed', bg: 'bg-indigo-100', text: 'text-indigo-800', border: 'border-indigo-200' },
    Shipped: { label: 'Shipped', bg: 'bg-purple-100', text: 'text-purple-800', border: 'border-purple-200' },
    Delivered: { label: 'Delivered', bg: 'bg-emerald-100', text: 'text-emerald-800', border: 'border-emerald-200' },
    Cancelled: { label: 'Cancelled', bg: 'bg-red-100', text: 'text-red-800', border: 'border-red-200' },
    Returned: { label: 'Returned', bg: 'bg-orange-100', text: 'text-orange-800', border: 'border-orange-200' },

    // Account & Generic Statuses
    ACTIVE: { label: 'Active', bg: 'bg-emerald-100', text: 'text-emerald-800', border: 'border-emerald-200' },
    BLOCKED: { label: 'Blocked', bg: 'bg-red-100', text: 'text-red-800', border: 'border-red-200' },
    INACTIVE: { label: 'Inactive', bg: 'bg-gray-100', text: 'text-gray-800', border: 'border-gray-200' },

    // Payment Statuses
    PAID: { label: 'Paid', bg: 'bg-emerald-100', text: 'text-emerald-800', border: 'border-emerald-200' },
    UNPAID: { label: 'Unpaid', bg: 'bg-amber-100', text: 'text-amber-800', border: 'border-amber-200' },
    FAILED: { label: 'Failed', bg: 'bg-red-100', text: 'text-red-800', border: 'border-red-200' },

    // Message Statuses
    NEW: { label: 'New', bg: 'bg-rose-100', text: 'text-rose-800', border: 'border-rose-200' },
    READ: { label: 'Read', bg: 'bg-blue-100', text: 'text-blue-800', border: 'border-blue-200' },
    REPLIED: { label: 'Replied', bg: 'bg-emerald-100', text: 'text-emerald-800', border: 'border-emerald-200' },
    CLOSED: { label: 'Closed', bg: 'bg-gray-100', text: 'text-gray-800', border: 'border-gray-200' },
  };

  const style = statusMap[status] || {
    label: status || 'Unknown',
    bg: 'bg-gray-100',
    text: 'text-gray-800',
    border: 'border-gray-200',
  };

  return (
    <span
      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold border ${style.bg} ${style.text} ${style.border} ${className}`}
    >
      <span className="w-1.5 h-1.5 rounded-full bg-current mr-1.5 opacity-75" />
      {style.label}
    </span>
  );
}
