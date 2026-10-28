import React from 'react';

export default function StatusBadge({ status, className = '' }) {
  const statusMap = {
    // Order Statuses
    Pending: { label: 'Pending', bg: 'bg-[#F1EEE7]', text: 'text-[#292A26]', border: 'border-[#E8E4DC]' },
    Confirmed: { label: 'Confirmed', bg: 'bg-[#292A26]/8', text: 'text-[#292A26]', border: 'border-[#292A26]/20' },
    Packed: { label: 'Packed', bg: 'bg-[#F1EEE7]', text: 'text-[#45463F]', border: 'border-[#E8E4DC]' },
    Shipped: { label: 'Shipped', bg: 'bg-[#A8B5A0]/20', text: 'text-[#3B5135]', border: 'border-[#A8B5A0]/40' },
    Delivered: { label: 'Delivered', bg: 'bg-[#A8B5A0]/25', text: 'text-[#2E4229]', border: 'border-[#A8B5A0]/50' },
    Cancelled: { label: 'Cancelled', bg: 'bg-[#C98268]/15', text: 'text-[#A35338]', border: 'border-[#C98268]/30' },
    Returned: { label: 'Returned', bg: 'bg-[#C98268]/15', text: 'text-[#A35338]', border: 'border-[#C98268]/30' },

    // Account & Generic Statuses
    ACTIVE: { label: 'Active', bg: 'bg-[#A8B5A0]/25', text: 'text-[#2E4229]', border: 'border-[#A8B5A0]/50' },
    BLOCKED: { label: 'Blocked', bg: 'bg-[#C98268]/15', text: 'text-[#A35338]', border: 'border-[#C98268]/30' },
    INACTIVE: { label: 'Inactive', bg: 'bg-[#F1EEE7]', text: 'text-[#77766F]', border: 'border-[#E8E4DC]' },

    // Payment Statuses
    PAID: { label: 'Paid', bg: 'bg-[#A8B5A0]/25', text: 'text-[#2E4229]', border: 'border-[#A8B5A0]/50' },
    UNPAID: { label: 'Unpaid', bg: 'bg-[#F1EEE7]', text: 'text-[#292A26]', border: 'border-[#E8E4DC]' },
    FAILED: { label: 'Failed', bg: 'bg-[#C98268]/15', text: 'text-[#A35338]', border: 'border-[#C98268]/30' },

    // Message Statuses
    NEW: { label: 'New', bg: 'bg-[#C98268]/15', text: 'text-[#A35338]', border: 'border-[#C98268]/30' },
    READ: { label: 'Read', bg: 'bg-[#F1EEE7]', text: 'text-[#77766F]', border: 'border-[#E8E4DC]' },
    REPLIED: { label: 'Replied', bg: 'bg-[#A8B5A0]/25', text: 'text-[#2E4229]', border: 'border-[#A8B5A0]/50' },
    CLOSED: { label: 'Closed', bg: 'bg-[#F1EEE7]', text: 'text-[#77766F]', border: 'border-[#E8E4DC]' },
  };

  const style = statusMap[status] || {
    label: status || 'Unknown',
    bg: 'bg-[#F1EEE7]',
    text: 'text-[#77766F]',
    border: 'border-[#E8E4DC]',
  };

  return (
    <span
      className={`inline-flex items-center px-2.5 py-0.5 rounded-sm text-[10px] tracking-wider uppercase font-semibold border ${style.bg} ${style.text} ${style.border} ${className}`}
    >
      <span className="w-1.5 h-1.5 rounded-full bg-current mr-1.5 opacity-70" />
      {style.label}
    </span>
  );
}
