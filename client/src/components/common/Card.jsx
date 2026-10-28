import React from 'react';

export default function Card({
  children,
  className = '',
  hoverEffect = false,
  bordered = true,
  onClick,
  ...props
}) {
  return (
    <div
      onClick={onClick}
      className={`bg-white rounded-lg overflow-hidden transition-all duration-200 ${
        bordered ? 'border border-[#E8E4DC]' : ''
      } ${
        hoverEffect ? 'hover:border-[#77766F]/50 hover:shadow-xs cursor-pointer' : ''
      } ${className}`}
      {...props}
    >
      {children}
    </div>
  );
}

Card.Header = function CardHeader({ children, className = '' }) {
  return <div className={`px-6 py-4 border-b border-[#E8E4DC] ${className}`}>{children}</div>;
};

Card.Body = function CardBody({ children, className = '' }) {
  return <div className={`p-6 ${className}`}>{children}</div>;
};

Card.Footer = function CardFooter({ children, className = '' }) {
  return <div className={`px-6 py-3 bg-[#F1EEE7]/40 border-t border-[#E8E4DC] ${className}`}>{children}</div>;
};
