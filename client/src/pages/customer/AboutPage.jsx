import React from 'react';
import { Link } from 'react-router-dom';
import Container from '../../components/common/Container';
import Breadcrumb from '../../components/common/Breadcrumb';
import Card from '../../components/common/Card';
import Button from '../../components/common/Button';

export default function AboutPage() {
  return (
    <div className="py-6 space-y-12">
      <Container>
        <Breadcrumb items={[{ label: 'About Us' }]} />

        {/* HERO BANNER */}
        <div className="bg-gradient-to-r from-amber-500 to-amber-600 text-white rounded-3xl p-8 sm:p-12 text-center space-y-4 shadow-md">
          <span className="text-4xl block">🧸</span>
          <h1 className="text-3xl sm:text-5xl font-extrabold font-display">
            Bringing Joy To Every Childhood
          </h1>
          <p className="text-amber-50 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed">
            Founded with a passion for creative play, ToyNest is India’s favorite online store for safe, non-toxic, educational, and fun toys.
          </p>
        </div>

        {/* STATS COUNTERS */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 py-4">
          <Card className="p-6 text-center border border-gray-200">
            <span className="text-3xl font-extrabold text-amber-500 font-display block">50,000+</span>
            <span className="text-xs text-gray-500 font-medium">Happy Children</span>
          </Card>
          <Card className="p-6 text-center border border-gray-200">
            <span className="text-3xl font-extrabold text-indigo-600 font-display block">500+</span>
            <span className="text-xs text-gray-500 font-medium">Curated Toys</span>
          </Card>
          <Card className="p-6 text-center border border-gray-200">
            <span className="text-3xl font-extrabold text-emerald-600 font-display block">100%</span>
            <span className="text-xs text-gray-500 font-medium">Non-Toxic Safe</span>
          </Card>
          <Card className="p-6 text-center border border-gray-200">
            <span className="text-3xl font-extrabold text-rose-500 font-display block">4.9 ★</span>
            <span className="text-xs text-gray-500 font-medium">Customer Rating</span>
          </Card>
        </div>

        {/* OUR CORE VALUES */}
        <div className="space-y-6">
          <div className="text-center max-w-xl mx-auto">
            <h2 className="text-2xl sm:text-3xl font-bold font-display text-gray-900">
              Our Core Principles 🛡️
            </h2>
            <p className="text-xs text-gray-500 mt-1">What makes ToyNest the trusted choice for parents.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="p-6 border border-gray-200 space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-amber-100 text-amber-600 flex items-center justify-center text-2xl font-bold">
                🧪
              </div>
              <h3 className="font-bold text-gray-900 text-base">Uncompromising Safety</h3>
              <p className="text-xs text-gray-600 leading-relaxed">
                Every single toy in our catalog undergoes rigorous quality and safety inspections to ensure 100% BPA-free and non-toxic materials.
              </p>
            </Card>

            <Card className="p-6 border border-gray-200 space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-indigo-100 text-indigo-600 flex items-center justify-center text-2xl font-bold">
                🧩
              </div>
              <h3 className="font-bold text-gray-900 text-base">Educational STEM Value</h3>
              <p className="text-xs text-gray-600 leading-relaxed">
                We select toys that foster problem-solving, fine motor skills, spatial reasoning, and creative storytelling for growing minds.
              </p>
            </Card>

            <Card className="p-6 border border-gray-200 space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-rose-100 text-rose-600 flex items-center justify-center text-2xl font-bold">
                ❤️
              </div>
              <h3 className="font-bold text-gray-900 text-base">Smile Guarantee</h3>
              <p className="text-xs text-gray-600 leading-relaxed">
                If a toy doesn’t bring a bright smile to your child’s face, our 30-day easy return policy has you completely covered.
              </p>
            </Card>
          </div>
        </div>

        {/* CTA CALLOUT */}
        <div className="bg-gray-900 text-white rounded-3xl p-8 text-center space-y-4">
          <h3 className="text-2xl font-bold font-display">Ready To Explore Our Toy Store?</h3>
          <p className="text-xs text-gray-400 max-w-md mx-auto">
            Discover action figures, lego building sets, wooden puzzles, and soft plushies today.
          </p>
          <Link to="/shop">
            <Button variant="primary" size="md">
              Browse Toys Catalog Now →
            </Button>
          </Link>
        </div>
      </Container>
    </div>
  );
}
