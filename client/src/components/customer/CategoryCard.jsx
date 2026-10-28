import React from 'react';
import { Link } from 'react-router-dom';
import Card from '../common/Card';

export default function CategoryCard({ category }) {
  const fallbackImage = 'https://images.unsplash.com/photo-1587654780291-39c9404d746b?w=400&auto=format&fit=crop&q=80';
  const displayImage = category.imageUrl || fallbackImage;

  return (
    <Link to={`/shop?category=${category.slug}`} className="block h-full group">
      <Card hoverEffect className="h-full border border-[#E8E4DC] p-3 sm:p-4 flex flex-col items-center text-center bg-white rounded-lg transition-all duration-300">
        {/* Category Image Display */}
        <div className="w-full aspect-square rounded-md overflow-hidden mb-3 bg-[#FAF8F3] border border-[#E8E4DC] relative flex items-center justify-center">
          <img
            src={displayImage}
            alt={category.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = fallbackImage;
            }}
            loading="lazy"
          />
        </div>

        {/* Category Name & Info */}
        <h3 className="font-medium text-[#292A26] text-xs sm:text-sm tracking-wide mb-1 group-hover:text-[#C98268] transition-colors line-clamp-1">
          {category.name}
        </h3>

        {category.description && (
          <p className="text-[11px] text-[#77766F] line-clamp-1 mb-2 font-normal">
            {category.description}
          </p>
        )}

        <span className="text-[10px] uppercase tracking-wider font-semibold text-[#292A26] flex items-center gap-1 opacity-70 group-hover:opacity-100 group-hover:text-[#C98268] transition-all mt-auto pt-1">
          View Collection →
        </span>
      </Card>
    </Link>
  );
}
