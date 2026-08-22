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
      className={`bg-white rounded-xl overflow-hidden transition-all duration-200 ${
        bordered ? 'border border-gray-200' : ''
      } ${
        hoverEffect ? 'hover:shadow-md hover:-translate-y-0.5 cursor-pointer' : 'shadow-sm'
      } ${className}`}
      {...props}
    >
      {children}
    </div>
  );
}

Card.Header = function CardHeader({ children, className = '' }) {
  return <div className={`px-6 py-4 border-b border-gray-100 ${className}`}>{children}</div>;
};

Card.Body = function CardBody({ children, className = '' }) {
  return <div className={`p-6 ${className}`}>{children}</div>;
};

Card.Footer = function CardFooter({ children, className = '' }) {
  return <div className={`px-6 py-3 bg-gray-50 border-t border-gray-100 ${className}`}>{children}</div>;
};
