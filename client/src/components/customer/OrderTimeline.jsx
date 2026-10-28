import React from 'react';

export default function OrderTimeline({ status = 'Pending' }) {
  const steps = [
    { key: 'Pending', label: 'Order Placed' },
    { key: 'Confirmed', label: 'Confirmed' },
    { key: 'Packed', label: 'Packed' },
    { key: 'Shipped', label: 'Shipped' },
    { key: 'Delivered', label: 'Delivered' },
  ];

  const statusOrder = ['Pending', 'Confirmed', 'Packed', 'Shipped', 'Delivered'];
  const currentIndex = statusOrder.indexOf(status);

  const isCancelled = status === 'Cancelled';
  const isReturned = status === 'Returned';

  if (isCancelled || isReturned) {
    return (
      <div className="p-3 bg-[#C98268]/10 border border-[#C98268]/30 rounded-md text-center text-[#A35338] text-xs font-medium">
        {isCancelled ? 'Order Cancelled' : 'Order Returned & Refund Processed'}
      </div>
    );
  }

  return (
    <div className="w-full py-4">
      <div className="flex items-center justify-between relative">
        {/* Progress Line */}
        <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-[#E8E4DC] -translate-y-1/2 z-0" />
        <div
          className="absolute top-1/2 left-0 h-0.5 bg-[#292A26] -translate-y-1/2 z-0 transition-all duration-500"
          style={{ width: `${(Math.max(0, currentIndex) / (steps.length - 1)) * 100}%` }}
        />

        {/* Milestones */}
        {steps.map((step, idx) => {
          const isCompleted = idx <= currentIndex;
          const isCurrent = idx === currentIndex;

          return (
            <div key={step.key} className="relative z-10 flex flex-col items-center group">
              <div
                className={`w-7 h-7 rounded-full flex items-center justify-center text-[10px] font-semibold transition-all ${
                  isCurrent
                    ? 'bg-[#292A26] text-white ring-2 ring-[#E8E4DC]'
                    : isCompleted
                    ? 'bg-[#A8B5A0] text-white'
                    : 'bg-white border border-[#E8E4DC] text-[#77766F]'
                }`}
              >
                {isCompleted ? '✓' : idx + 1}
              </div>
              <span className={`text-[10px] uppercase tracking-wider font-medium mt-2 text-center whitespace-nowrap ${
                isCurrent ? 'text-[#292A26] font-semibold' : isCompleted ? 'text-[#292A26]' : 'text-[#77766F]'
              }`}>
                {step.label}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
