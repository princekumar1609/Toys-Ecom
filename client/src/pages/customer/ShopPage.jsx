import React, { useState, useEffect } from 'react';
import Container from '../../components/common/Container';
import Breadcrumb from '../../components/common/Breadcrumb';
import ProductCard from '../../components/customer/ProductCard';
import Pagination from '../../components/common/Pagination';
import LoadingState from '../../components/common/LoadingState';
import EmptyState from '../../components/common/EmptyState';
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
          limit: 8,
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

  return (
    <div className="py-6 space-y-6">
      <Container>
        <Breadcrumb items={[{ label: 'Shop Catalog' }]} />

        {/* PAGE TITLE */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-extrabold font-display text-gray-900">
              Explore Toys Catalog 🎁
            </h1>
            <p className="text-xs text-gray-500 mt-1">Showing {totalProducts} toys verified for child safety.</p>
          </div>

          <div className="flex items-center gap-3">
            <select
              value={sortOption}
              onChange={(e) => setSortOption(e.target.value)}
              className="text-xs font-semibold p-2.5 bg-white border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500"
            >
              <option value="newest">Sort By: Newest Arrivals</option>
              <option value="price-asc">Sort By: Price (Low to High)</option>
              <option value="price-desc">Sort By: Price (High to Low)</option>
              <option value="rating">Sort By: Highest Rated</option>
            </select>
          </div>
        </div>

        {/* SEARCH & FILTERS TOOLBAR */}
        <div className="p-4 bg-white border border-gray-200 rounded-2xl shadow-xs space-y-4 mb-6">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <input
              type="text"
              placeholder="Search by toy name, SKU, or brand..."
              value={searchTerm}
              onChange={(e) => { setSearchTerm(e.target.value); setCurrentPage(1); }}
              className="px-3.5 py-2 text-xs bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-amber-500"
            />

            <select
              value={selectedCategory}
              onChange={(e) => { setSelectedCategory(e.target.value); setCurrentPage(1); }}
              className="px-3.5 py-2 text-xs bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-amber-500"
            >
              <option value="all">All Categories</option>
              {categories.map((c) => (
                <option key={c._id} value={c.slug}>{c.name}</option>
              ))}
            </select>

            <select
              value={selectedAge}
              onChange={(e) => { setSelectedAge(e.target.value); setCurrentPage(1); }}
              className="px-3.5 py-2 text-xs bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-amber-500"
            >
              <option value="all">All Age Groups</option>
              <option value="0-2 Years">0-2 Years</option>
              <option value="3-5 Years">3-5 Years</option>
              <option value="6-8 Years">6-8 Years</option>
              <option value="9-12 Years">9-12 Years</option>
            </select>
          </div>
        </div>

        {/* PRODUCT GRID */}
        {isLoading ? (
          <LoadingState message="Fetching live catalog..." className="py-20" />
        ) : products.length > 0 ? (
          <div className="space-y-6">
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
            title="No Toys Found"
            description="We couldn't find any toys matching your active search query or filters."
            actionLabel="Clear All Filters"
            onAction={handleResetFilters}
          />
        )}
      </Container>
    </div>
  );
}
