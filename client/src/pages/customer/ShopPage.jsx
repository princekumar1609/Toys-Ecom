import React, { useState, useEffect } from 'react';
import Container from '../../components/common/Container';
import Breadcrumb from '../../components/common/Breadcrumb';
import ProductCard from '../../components/customer/ProductCard';
import Pagination from '../../components/common/Pagination';
import LoadingState from '../../components/common/LoadingState';
import EmptyState from '../../components/common/EmptyState';
import Button from '../../components/common/Button';
import { productApi, categoryApi } from '../../services/api';

export default function ShopPage() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // Filters & Pagination State
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedAge, setSelectedAge] = useState('all');
  const [sortOption, setSortOption] = useState('newest');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalProducts, setTotalProducts] = useState(0);

  useEffect(() => {
    async function loadCategories() {
      try {
        const res = await categoryApi.getCategories();
        if (res.success) setCategories(res.data);
      } catch (err) {
        console.error('[Categories Load Error]', err.message);
      }
    }
    loadCategories();
  }, []);

  useEffect(() => {
    async function fetchProducts() {
      setIsLoading(true);
      try {
        const params = {
          page: currentPage,
          limit: 12,
          sort: sortOption,
        };
        if (searchTerm) params.search = searchTerm;
        if (selectedCategory !== 'all') params.category = selectedCategory;
        if (selectedAge !== 'all') params.ageGroup = selectedAge;

        const res = await productApi.getProducts(params);
        if (res.success) {
          setProducts(res.data);
          setTotalPages(res.pages);
          setTotalProducts(res.total);
        }
      } catch (err) {
        console.error('[Products Fetch Error]', err.message);
      } finally {
        setIsLoading(false);
      }
    }
    fetchProducts();
  }, [searchTerm, selectedCategory, selectedAge, sortOption, currentPage]);

  const handleResetFilters = () => {
    setSearchTerm('');
    setSelectedCategory('all');
    setSelectedAge('all');
    setSortOption('newest');
    setCurrentPage(1);
  };

  const hasActiveFilters = searchTerm || selectedCategory !== 'all' || selectedAge !== 'all';

  return (
    <div className="py-8 space-y-8">
      <Container>
        <Breadcrumb items={[{ label: 'Catalog' }]} />

        {/* PAGE HEADER */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-6 border-b border-[#E8E4DC]">
          <div className="space-y-1">
            <span className="text-[10px] uppercase tracking-widest font-semibold text-[#77766F] block">
              Curated Catalog
            </span>
            <h1 className="text-3xl sm:text-4xl font-display font-medium text-[#292A26]">
              All Toys &amp; Games
            </h1>
            <p className="text-xs text-[#77766F]">
              Showing {totalProducts} consciously designed toys verified for safety and learning.
            </p>
          </div>

          {/* SORTING SELECT */}
          <div className="flex items-center gap-2 self-start md:self-end">
            <label htmlFor="sort-select" className="text-xs uppercase tracking-wider text-[#77766F] font-medium whitespace-nowrap">
              Sort:
            </label>
            <select
              id="sort-select"
              value={sortOption}
              onChange={(e) => setSortOption(e.target.value)}
              className="text-xs font-medium py-2 px-3 bg-white border border-[#E8E4DC] rounded-md text-[#292A26] focus:outline-none focus:border-[#292A26] transition-colors cursor-pointer"
            >
              <option value="newest">Newest Arrivals</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
              <option value="rating">Highest Rated</option>
            </select>
          </div>
        </div>

        {/* MINIMAL FILTER CONTROLS TOOLBAR */}
        <div className="p-4 sm:p-5 bg-white border border-[#E8E4DC] rounded-lg space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4 items-center">
            {/* Search Input */}
            <div className="relative sm:col-span-1 lg:col-span-2">
              <input
                type="text"
                placeholder="Search by toy name, brand, or SKU..."
                value={searchTerm}
                onChange={(e) => { setSearchTerm(e.target.value); setCurrentPage(1); }}
                className="w-full pl-9 pr-4 py-2.5 text-xs bg-[#FAF8F3] border border-[#E8E4DC] rounded-md text-[#292A26] placeholder:text-[#77766F]/60 focus:outline-none focus:border-[#292A26] focus:bg-white transition-all"
              />
              <svg className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-[#77766F]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-4.35-4.35m1.35-5.65a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>

            {/* Category Filter */}
            <div>
              <select
                value={selectedCategory}
                onChange={(e) => { setSelectedCategory(e.target.value); setCurrentPage(1); }}
                className="w-full py-2.5 px-3 text-xs bg-[#FAF8F3] border border-[#E8E4DC] rounded-md text-[#292A26] focus:outline-none focus:border-[#292A26] focus:bg-white transition-all cursor-pointer"
              >
                <option value="all">All Categories</option>
                {categories.map((c) => (
                  <option key={c._id} value={c.slug}>{c.name}</option>
                ))}
              </select>
            </div>

            {/* Age Filter */}
            <div>
              <select
                value={selectedAge}
                onChange={(e) => { setSelectedAge(e.target.value); setCurrentPage(1); }}
                className="w-full py-2.5 px-3 text-xs bg-[#FAF8F3] border border-[#E8E4DC] rounded-md text-[#292A26] focus:outline-none focus:border-[#292A26] focus:bg-white transition-all cursor-pointer"
              >
                <option value="all">All Age Groups</option>
                <option value="0-2 Years">0-2 Years (Infant)</option>
                <option value="3-5 Years">3-5 Years (Toddler)</option>
                <option value="6-8 Years">6-8 Years (Primary)</option>
                <option value="9-12 Years">9-12 Years (Junior)</option>
              </select>
            </div>
          </div>

          {/* Active Filter Chips */}
          {hasActiveFilters && (
            <div className="flex flex-wrap items-center justify-between gap-2 pt-3 border-t border-[#E8E4DC] text-xs">
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-[11px] text-[#77766F] uppercase tracking-wider font-medium">Active:</span>
                {searchTerm && (
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-[#F1EEE7] border border-[#E8E4DC] rounded-sm text-[11px] text-[#292A26]">
                    Keyword: &ldquo;{searchTerm}&rdquo;
                    <button onClick={() => setSearchTerm('')} className="text-[#77766F] hover:text-[#292A26] cursor-pointer">×</button>
                  </span>
                )}
                {selectedCategory !== 'all' && (
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-[#F1EEE7] border border-[#E8E4DC] rounded-sm text-[11px] text-[#292A26]">
                    Category: {categories.find((c) => c.slug === selectedCategory)?.name || selectedCategory}
                    <button onClick={() => setSelectedCategory('all')} className="text-[#77766F] hover:text-[#292A26] cursor-pointer">×</button>
                  </span>
                )}
                {selectedAge !== 'all' && (
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-[#F1EEE7] border border-[#E8E4DC] rounded-sm text-[11px] text-[#292A26]">
                    Age: {selectedAge}
                    <button onClick={() => setSelectedAge('all')} className="text-[#77766F] hover:text-[#292A26] cursor-pointer">×</button>
                  </span>
                )}
              </div>
              <button
                onClick={handleResetFilters}
                className="text-xs uppercase tracking-wider text-[#C98268] hover:underline font-medium cursor-pointer"
              >
                Reset Filters
              </button>
            </div>
          )}
        </div>

        {/* PRODUCT GRID */}
        {isLoading ? (
          <LoadingState text="Loading toys collection..." className="py-24" />
        ) : products.length > 0 ? (
          <div className="space-y-10">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {products.map((p) => (
                <ProductCard key={p._id} product={p} />
              ))}
            </div>

            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={(page) => setCurrentPage(page)}
            />
          </div>
        ) : (
          <EmptyState
            title="No Toys Match Your Selection"
            description="We could not find any products with your current search query and filters. Try adjusting or resetting them."
            actionLabel="Reset All Filters"
            onAction={handleResetFilters}
          />
        )}
      </Container>
    </div>
  );
}
