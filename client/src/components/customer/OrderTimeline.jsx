import React from 'react';

export default function OrderTimeline({ status = 'Pending' }) {
  const steps = [
    { key: 'Pending', label: 'Order Placed', icon: '📝' },
    { key: 'Confirmed', label: 'Confirmed', icon: '✅' },
    { key: 'Packed', label: 'Packed', icon: '📦' },
    { key: 'Shipped', label: 'Shipped', icon: '🚚' },
    { key: 'Delivered', label: 'Delivered', icon: '🎉' },
  ];

  const statusOrder = ['Pending', 'Confirmed', 'Packed', 'Shipped', 'Delivered'];
  const currentIndex = statusOrder.indexOf(status);

  const isCancelled = status === 'Cancelled';
  const isReturned = status === 'Returned';

  if (isCancelled || isReturned) {
    return (
      <div className="p-4 bg-red-50 border border-red-200 rounded-xl text-center text-red-700 text-xs font-semibold">
        {isCancelled ? '❌ Order Cancelled' : '🔄 Order Returned & Refunded'}
      </div>
    );
  }

  return (
    <div className="w-full py-4">
      <div className="flex items-center justify-between relative">
        {/* Progress Line */}
        <div className="absolute top-1/2 left-0 right-0 h-1 bg-gray-200 -translate-y-1/2 z-0" />
        <div
          className="absolute top-1/2 left-0 h-1 bg-amber-500 -translate-y-1/2 z-0 transition-all duration-500"
          style={{ width: `${(Math.max(0, currentIndex) / (steps.length - 1)) * 100}%` }}
        />

        {/* Milestones */}
        {steps.map((step, idx) => {
          const isCompleted = idx <= currentIndex;
          const isCurrent = idx === currentIndex;

          return (
            <div key={step.key} className="relative z-10 flex flex-col items-center group">
              <div
                className={`w-9 h-9 rounded-full flex items-center justify-center text-xs font-bold transition-all shadow-xs ${
                  isCurrent
                    ? 'bg-amber-500 text-white ring-4 ring-amber-100 scale-110'
                    : isCompleted
                    ? 'bg-amber-500 text-white'
                    : 'bg-white border-2 border-gray-300 text-gray-400'
                }`}
              >
                {step.icon}
              </div>
              <span className={`text-[11px] font-semibold mt-2 text-center whitespace-nowrap ${
                isCurrent ? 'text-amber-600' : isCompleted ? 'text-gray-900' : 'text-gray-400'
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
