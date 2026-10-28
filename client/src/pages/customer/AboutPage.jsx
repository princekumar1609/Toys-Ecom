import React from 'react';
import { Link } from 'react-router-dom';
import Container from '../../components/common/Container';
import Breadcrumb from '../../components/common/Breadcrumb';
import Button from '../../components/common/Button';

export default function AboutPage() {
  return (
    <div className="py-8 space-y-16">
      <Container className="space-y-16">
        <Breadcrumb items={[{ label: 'Our Philosophy' }]} />

        {/* HERO EDITORIAL BANNER */}
        <div className="bg-[#F1EEE7] border border-[#E8E4DC] rounded-lg p-8 sm:p-14 lg:p-18 text-center space-y-4">
          <span className="text-[10px] uppercase tracking-[0.25em] font-semibold text-[#77766F] block">
            Our Story &amp; Philosophy
          </span>
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-display font-light text-[#292A26] max-w-3xl mx-auto leading-tight">
            Conscious Play Designed For <span className="font-normal italic">Modern Childhood</span>
          </h1>
          <p className="text-xs sm:text-sm md:text-base text-[#77766F] max-w-2xl mx-auto leading-relaxed font-normal">
            Founded with an appreciation for Scandinavian design and mindful parenting, Toys Ecom offers toys that inspire tactile exploration, spatial creativity, and calm environments.
          </p>
        </div>

        {/* METRICS STRIP */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          <div className="p-6 sm:p-8 text-center bg-white border border-[#E8E4DC] rounded-lg space-y-1">
            <span className="text-3xl sm:text-4xl font-display font-medium text-[#292A26] block">50,000+</span>
            <span className="text-xs uppercase tracking-wider text-[#77766F] font-medium">Families Delighted</span>
          </div>
          <div className="p-6 sm:p-8 text-center bg-white border border-[#E8E4DC] rounded-lg space-y-1">
            <span className="text-3xl sm:text-4xl font-display font-medium text-[#292A26] block">500+</span>
            <span className="text-xs uppercase tracking-wider text-[#77766F] font-medium">Curated Essentials</span>
          </div>
          <div className="p-6 sm:p-8 text-center bg-white border border-[#E8E4DC] rounded-lg space-y-1">
            <span className="text-3xl sm:text-4xl font-display font-medium text-[#292A26] block">100%</span>
            <span className="text-xs uppercase tracking-wider text-[#77766F] font-medium">Non-Toxic &amp; BPA-Free</span>
          </div>
          <div className="p-6 sm:p-8 text-center bg-white border border-[#E8E4DC] rounded-lg space-y-1">
            <span className="text-3xl sm:text-4xl font-display font-medium text-[#292A26] block">4.9 ★</span>
            <span className="text-xs uppercase tracking-wider text-[#77766F] font-medium">Customer Satisfaction</span>
          </div>
        </div>

        {/* CORE VALUES */}
        <div className="space-y-8">
          <div className="text-center max-w-xl mx-auto space-y-2">
            <span className="text-[10px] uppercase tracking-widest font-semibold text-[#77766F] block">
              Ethos
            </span>
            <h2 className="text-2xl sm:text-3xl font-display font-medium text-[#292A26]">
              Principles Guiding Our Collection
            </h2>
            <p className="text-xs text-[#77766F]">What distinguishes Toys Ecom in conscious children's living.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 sm:p-8 bg-white border border-[#E8E4DC] rounded-lg space-y-3">
              <span className="text-xs font-mono uppercase tracking-wider text-[#A8B5A0] block font-semibold">
                01 / Safety First
              </span>
              <h3 className="font-display font-medium text-lg text-[#292A26]">Uncompromising Standards</h3>
              <p className="text-xs text-[#77766F] leading-relaxed">
                Every toy undergoes comprehensive testing to verify zero toxins, safe natural water-based stains, and smooth, splinter-free finishes.
              </p>
            </div>

            <div className="p-6 sm:p-8 bg-white border border-[#E8E4DC] rounded-lg space-y-3">
              <span className="text-xs font-mono uppercase tracking-wider text-[#A8B5A0] block font-semibold">
                02 / Cognitive Play
              </span>
              <h3 className="font-display font-medium text-lg text-[#292A26]">Thoughtful STEM Foundation</h3>
              <p className="text-xs text-[#77766F] leading-relaxed">
                We design and curate objects that invite open-ended inquiry, tactile problem-solving, architectural curiosity, and storytelling.
              </p>
            </div>

            <div className="p-6 sm:p-8 bg-white border border-[#E8E4DC] rounded-lg space-y-3">
              <span className="text-xs font-mono uppercase tracking-wider text-[#A8B5A0] block font-semibold">
                03 / Assurance
              </span>
              <h3 className="font-display font-medium text-lg text-[#292A26]">Mindful Experience</h3>
              <p className="text-xs text-[#77766F] leading-relaxed">
                If an item does not seamlessly fit into your home or your child’s development, our 30-day gentle return service guarantees peace of mind.
              </p>
            </div>
          </div>
        </div>

        {/* CTA CALLOUT */}
        <div className="bg-[#FAF8F3] border border-[#E8E4DC] rounded-lg p-8 sm:p-14 text-center space-y-4">
          <h3 className="text-2xl sm:text-3xl font-display font-medium text-[#292A26]">
            Ready To Explore Our Curated Catalog?
          </h3>
          <p className="text-xs sm:text-sm text-[#77766F] max-w-md mx-auto leading-relaxed">
            Discover architectural sets, STEM puzzles, wooden figurines, and soft companions.
          </p>
          <div className="pt-3 flex justify-center">
            <Link to="/shop">
              <Button variant="primary" size="lg">
                Explore Full Catalog →
              </Button>
            </Link>
          </div>
        </div>
      </Container>
    </div>
  );
}
