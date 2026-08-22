import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Container from '../../components/common/Container';
import ProductCard from '../../components/customer/ProductCard';
import CategoryCard from '../../components/customer/CategoryCard';
import Button from '../../components/common/Button';
import LoadingState from '../../components/common/LoadingState';
import { categoryApi, productApi } from '../../services/api';

export default function HomePage() {
  const [categories, setCategories] = useState([]);
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [bestSellers, setBestSellers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function loadHomeData() {
      try {
        const [catRes, prodRes] = await Promise.all([
          categoryApi.getCategories(),
          productApi.getProducts({ limit: 8 }),
        ]);

        if (catRes.success) setCategories(catRes.data);
        if (prodRes.success) {
          setFeaturedProducts(prodRes.data.slice(0, 4));
          setBestSellers(prodRes.data.slice(4, 8));
        }
      } catch (err) {
        console.error('[Home Page Load Error]', err.message);
      } finally {
        setIsLoading(false);
      }
    }
    loadHomeData();
  }, []);

  if (isLoading) {
    return <LoadingState message="Loading ToyNest featured collections..." className="py-20" />;
  }

  return (
    <div className="space-y-12 py-6">
      {/* HERO BANNER SECTION */}
      <Container>
        <div className="relative rounded-3xl bg-gradient-to-r from-amber-500 via-amber-400 to-amber-600 p-8 sm:p-14 text-white overflow-hidden shadow-lg">
          <div className="relative z-10 max-w-xl space-y-4">
            <span className="inline-block px-3 py-1 bg-white/20 backdrop-blur-md rounded-full text-xs font-bold uppercase tracking-wider text-amber-900">
              ✨ Premium Educational &amp; Fun Toys
            </span>
            <h1 className="text-3xl sm:text-5xl font-extrabold font-display leading-tight tracking-tight">
              Spark Pure Joy &amp; Wonder In Everyday Play
            </h1>
            <p className="text-amber-50 text-xs sm:text-base leading-relaxed">
              Explore 100% non-toxic, safety-certified STEM toys, Lego building kits, plushies, and puzzles designed for growing minds.
            </p>
            <div className="pt-2 flex flex-wrap items-center gap-3">
              <Link to="/shop">
                <Button variant="secondary" size="lg" className="shadow-md">
                  Explore Full Catalog →
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </Container>

      {/* SHOP BY CATEGORY SECTION */}
      <Container>
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl font-extrabold font-display text-gray-900">
              Shop By Category 🧩
            </h2>
            <p className="text-xs text-gray-500 mt-1">Curated collections tailored for every age and interest.</p>
          </div>
          <Link to="/shop" className="text-xs font-bold text-amber-600 hover:underline">
            View All Categories →
          </Link>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
          {categories.slice(0, 6).map((cat) => (
            <CategoryCard key={cat._id} category={cat} />
          ))}
        </div>
      </Container>

      {/* FEATURED TOYS SECTION */}
      <Container>
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl font-extrabold font-display text-gray-900">
              Featured Toys 🌟
            </h2>
            <p className="text-xs text-gray-500 mt-1">Handpicked favorites loved by kids and parents.</p>
          </div>
          <Link to="/shop" className="text-xs font-bold text-amber-600 hover:underline">
            Browse All Toys →
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {featuredProducts.map((p) => (
            <ProductCard key={p._id} product={p} />
          ))}
        </div>
      </Container>

      {/* PROMO BANNER */}
      <Container>
        <div className="bg-gray-900 text-white rounded-3xl p-8 sm:p-10 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="space-y-2 text-center sm:text-left">
            <span className="text-amber-400 font-bold text-xs uppercase tracking-wider">Limited Offer</span>
            <h3 className="text-2xl font-bold font-display">Save 30% Extra On Your First Purchase</h3>
            <p className="text-xs text-gray-400">Use promo code <span className="text-white font-bold font-mono">SUMMER30</span> at checkout.</p>
          </div>
          <Link to="/shop">
            <Button variant="primary" size="md">
              Shop Now &amp; Save →
            </Button>
          </Link>
        </div>
      </Container>
    </div>
  );
}
