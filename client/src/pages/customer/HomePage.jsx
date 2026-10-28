import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Container from '../../components/common/Container';
import ProductCard from '../../components/customer/ProductCard';
import CategoryCard from '../../components/customer/CategoryCard';
import Button from '../../components/common/Button';
import LoadingState from '../../components/common/LoadingState';
import { categoryApi, productApi } from '../../services/api';
import { MOCK_TESTIMONIALS } from '../../data/mockData';

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
    return <LoadingState text="Curating collection..." className="py-24" />;
  }

  return (
    <div className="space-y-16 sm:space-y-24 py-8">
      {/* HERO SECTION — LUXURY EDITORIAL COMPOSITION */}
      <Container>
        <div className="relative rounded-lg bg-[#F1EEE7] border border-[#E8E4DC] overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-12 items-center">
            {/* Left Content Column */}
            <div className="p-8 sm:p-12 lg:p-16 lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-sm bg-white/80 border border-[#E8E4DC] text-[10px] sm:text-[11px] font-semibold uppercase tracking-[0.2em] text-[#77766F]">
                <span>Conscious Childhood</span>
                <span className="w-1 h-1 rounded-full bg-[#A8B5A0]" />
                <span className="text-[#292A26]">Scandinavian Inspired</span>
              </div>

              <h1 className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-light text-[#292A26] leading-[1.1] tracking-tight">
                Spark Pure Joy &amp; Wonder In <span className="italic font-normal">Everyday Play</span>
              </h1>

              <p className="text-xs sm:text-sm md:text-base text-[#77766F] max-w-xl font-normal leading-relaxed">
                Explore safety-certified STEM kits, architectural wooden blocks, plush companions, and creative puzzles designed with calm aesthetics for curious growing minds.
              </p>

              <div className="pt-2 flex flex-wrap items-center gap-3 sm:gap-4">
                <Link to="/shop">
                  <Button variant="primary" size="lg">
                    Explore Catalog →
                  </Button>
                </Link>
                <Link to="/about">
                  <Button variant="secondary" size="lg">
                    Our Philosophy
                  </Button>
                </Link>
              </div>

              {/* Editorial trust markers */}
              <div className="pt-6 border-t border-[#E8E4DC] flex flex-wrap items-center gap-6 text-[11px] uppercase tracking-wider text-[#77766F] font-medium">
                <span className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#A8B5A0]" /> 100% Non-Toxic
                </span>
                <span className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#A8B5A0]" /> Express 3-Day Dispatch
                </span>
                <span className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#A8B5A0]" /> Certified Child Safe
                </span>
              </div>
            </div>

            {/* Right Editorial Visual Column */}
            <div className="lg:col-span-5 h-72 sm:h-96 lg:h-full relative overflow-hidden bg-[#FAF8F3] border-t lg:border-t-0 lg:border-l border-[#E8E4DC]">
              <img
                src="https://images.unsplash.com/photo-1585366119957-e9730b6d0f60?w=1000&auto=format&fit=crop&q=80"
                alt="Minimalist wooden toys collection"
                className="w-full h-full object-cover object-center"
              />
              <div className="absolute bottom-4 right-4 bg-white/95 backdrop-blur-xs px-3.5 py-2 rounded-sm border border-[#E8E4DC] text-right">
                <span className="block text-[9px] uppercase tracking-widest text-[#77766F]">Featured Concept</span>
                <span className="block text-xs font-medium text-[#292A26]">Architectural Blocks Series</span>
              </div>
            </div>
          </div>
        </div>
      </Container>

      {/* VALUE HIGHLIGHTS / BENEFITS STRIP */}
      <Container>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 py-6 border-y border-[#E8E4DC]">
          <div className="space-y-1">
            <span className="text-[10px] uppercase tracking-widest text-[#A8B5A0] font-semibold block">01 / Safety</span>
            <h4 className="text-xs sm:text-sm font-medium text-[#292A26]">BPA-Free Materials</h4>
            <p className="text-[11px] text-[#77766F] leading-relaxed">Lab tested and rigorously certified for infant safety.</p>
          </div>
          <div className="space-y-1">
            <span className="text-[10px] uppercase tracking-widest text-[#A8B5A0] font-semibold block">02 / Design</span>
            <h4 className="text-xs sm:text-sm font-medium text-[#292A26]">Calm Aesthetic</h4>
            <p className="text-[11px] text-[#77766F] leading-relaxed">Scandinavian tones that blend naturally into any home.</p>
          </div>
          <div className="space-y-1">
            <span className="text-[10px] uppercase tracking-widest text-[#A8B5A0] font-semibold block">03 / STEM</span>
            <h4 className="text-xs sm:text-sm font-medium text-[#292A26]">Open-Ended Learning</h4>
            <p className="text-[11px] text-[#77766F] leading-relaxed">Fosters spatial reasoning, tactile curiosity, and motor skills.</p>
          </div>
          <div className="space-y-1">
            <span className="text-[10px] uppercase tracking-widest text-[#A8B5A0] font-semibold block">04 / Delivery</span>
            <h4 className="text-xs sm:text-sm font-medium text-[#292A26]">Eco Friendly Packaging</h4>
            <p className="text-[11px] text-[#77766F] leading-relaxed">Delivered responsibly with plastic-neutral packaging.</p>
          </div>
        </div>
      </Container>

      {/* SHOP BY CATEGORY SECTION */}
      <Container>
        <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-3 mb-8 pb-4 border-b border-[#E8E4DC]">
          <div>
            <span className="text-[10px] uppercase tracking-widest font-semibold text-[#77766F] block mb-1">
              Curated Worlds
            </span>
            <h2 className="text-2xl sm:text-3xl font-display font-medium text-[#292A26]">
              Shop By Category
            </h2>
          </div>
          <Link
            to="/shop"
            className="text-xs uppercase tracking-wider font-semibold text-[#292A26] hover:text-[#C98268] transition-colors flex items-center gap-1"
          >
            All Categories →
          </Link>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 sm:gap-5">
          {categories.slice(0, 6).map((cat) => (
            <CategoryCard key={cat._id} category={cat} />
          ))}
        </div>
      </Container>

      {/* FEATURED TOYS SECTION */}
      <Container>
        <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-3 mb-8 pb-4 border-b border-[#E8E4DC]">
          <div>
            <span className="text-[10px] uppercase tracking-widest font-semibold text-[#77766F] block mb-1">
              Handpicked Essentials
            </span>
            <h2 className="text-2xl sm:text-3xl font-display font-medium text-[#292A26]">
              Featured Collection
            </h2>
          </div>
          <Link
            to="/shop"
            className="text-xs uppercase tracking-wider font-semibold text-[#292A26] hover:text-[#C98268] transition-colors flex items-center gap-1"
          >
            Browse Full Catalog →
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {featuredProducts.map((p) => (
            <ProductCard key={p._id} product={p} />
          ))}
        </div>
      </Container>

      {/* EDITORIAL PROMO BANNER */}
      <Container>
        <div className="bg-[#FAF8F3] border border-[#E8E4DC] rounded-lg p-8 sm:p-12 lg:p-14 flex flex-col md:flex-row items-start md:items-center justify-between gap-8 relative overflow-hidden">
          <div className="space-y-3 max-w-xl z-10">
            <span className="text-[10px] uppercase tracking-widest font-semibold text-[#C98268] bg-[#C98268]/10 px-2.5 py-1 rounded-sm border border-[#C98268]/20 inline-block">
              Welcome Privilege
            </span>
            <h3 className="text-2xl sm:text-3xl lg:text-4xl font-display font-light text-[#292A26] leading-tight">
              Enjoy <span className="font-normal italic">30% Off</span> On Your First Order
            </h3>
            <p className="text-xs sm:text-sm text-[#77766F] leading-relaxed">
              Experience the distinction of conscious play. Use coupon code{' '}
              <span className="font-semibold text-[#292A26] tracking-wider bg-white px-2 py-0.5 border border-[#E8E4DC] rounded-sm font-mono">
                SUMMER30
              </span>{' '}
              at checkout.
            </p>
          </div>
          <div className="z-10 flex-shrink-0">
            <Link to="/shop">
              <Button variant="primary" size="lg" className="whitespace-nowrap">
                Shop The Offer →
              </Button>
            </Link>
          </div>
        </div>
      </Container>

      {/* BEST SELLERS SECTION */}
      {bestSellers.length > 0 && (
        <Container>
          <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-3 mb-8 pb-4 border-b border-[#E8E4DC]">
            <div>
              <span className="text-[10px] uppercase tracking-widest font-semibold text-[#77766F] block mb-1">
                Parent Favorites
              </span>
              <h2 className="text-2xl sm:text-3xl font-display font-medium text-[#292A26]">
                Most Loved By Families
              </h2>
            </div>
            <Link
              to="/shop"
              className="text-xs uppercase tracking-wider font-semibold text-[#292A26] hover:text-[#C98268] transition-colors flex items-center gap-1"
            >
              View All Best Sellers →
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {bestSellers.map((p) => (
              <ProductCard key={p._id} product={p} />
            ))}
          </div>
        </Container>
      )}

      {/* TESTIMONIALS STRIP */}
      {MOCK_TESTIMONIALS && MOCK_TESTIMONIALS.length > 0 && (
        <Container>
          <div className="text-center max-w-xl mx-auto mb-10 space-y-2">
            <span className="text-[10px] uppercase tracking-widest font-semibold text-[#77766F]">
              Community Voices
            </span>
            <h2 className="text-2xl sm:text-3xl font-display font-medium text-[#292A26]">
              Trusted By Mindful Parents
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {MOCK_TESTIMONIALS.map((t) => (
              <div
                key={t.id}
                className="bg-white border border-[#E8E4DC] p-6 sm:p-7 rounded-lg space-y-4 flex flex-col justify-between"
              >
                <div className="space-y-3">
                  <div className="flex items-center text-[#C98268] text-xs">
                    {'★'.repeat(t.rating || 5)}
                  </div>
                  <p className="text-xs sm:text-sm text-[#292A26] leading-relaxed italic font-light">
                    &ldquo;{t.comment}&rdquo;
                  </p>
                </div>

                <div className="pt-4 border-t border-[#E8E4DC] flex items-center justify-between text-xs">
                  <div>
                    <span className="font-medium text-[#292A26] block">{t.name}</span>
                    <span className="text-[11px] text-[#77766F] block">{t.role}</span>
                  </div>
                  <span className="text-xl opacity-80">{t.avatar}</span>
                </div>
              </div>
            ))}
          </div>
        </Container>
      )}
    </div>
  );
}
