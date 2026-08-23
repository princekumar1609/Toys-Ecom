import React from 'react';
import { Link } from 'react-router-dom';
import Card from '../common/Card';

export default function CategoryCard({ category }) {
  const fallbackImage = 'https://images.unsplash.com/photo-1587654780291-39c9404d746b?w=400&auto=format&fit=crop&q=80';
  const displayImage = category.imageUrl || fallbackImage;

  return (
    <Link to={`/shop?category=${category.slug}`} className="block h-full">
      <Card hoverEffect className="h-full border border-gray-100 p-4 group flex flex-col items-center text-center bg-white rounded-2xl">
        {/* Category Image Display */}
        <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl overflow-hidden mb-3 bg-amber-50 border border-amber-100/60 shadow-xs relative group-hover:scale-105 group-hover:shadow-md transition-all duration-300 flex items-center justify-center">
          <img
            src={displayImage}
            alt={category.name}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = fallbackImage;
            }}
          />
        </div>

        {/* Category Name & Info */}
        <h3 className="font-bold text-gray-900 text-sm mb-1 group-hover:text-amber-600 transition-colors line-clamp-1">
          {category.name}
        </h3>

        {category.description && (
          <p className="text-[11px] text-gray-500 line-clamp-1 mb-2">
            {category.description}
          </p>
        )}

        <span className="text-xs font-semibold text-amber-600 flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity mt-auto">
          Explore Toys →
        </span>
      </Card>
    </Link>
  );
}
