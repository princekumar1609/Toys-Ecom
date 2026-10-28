import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Container from '../common/Container';
import Button from '../common/Button';

export default function Footer() {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email.trim()) {
      setSubscribed(true);
      setEmail('');
      setTimeout(() => setSubscribed(false), 4000);
    }
  };

  return (
    <footer className="bg-[#F1EEE7] text-[#77766F] border-t border-[#E8E4DC] pt-16 pb-12 mt-20 transition-all">
      <Container>
        {/* TOP BRAND & VALUE PROPOSITION */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-14 border-b border-[#E8E4DC]">
          {/* Brand Info */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-sm bg-[#292A26] text-[#FAF8F3] flex items-center justify-center font-display text-sm font-semibold tracking-tight">
                TE
              </div>
              <span className="font-display font-medium text-2xl text-[#292A26] tracking-tight">
                Toys <span className="font-light italic text-[#77766F]">Ecom</span>
              </span>
            </div>
            <p className="text-xs text-[#77766F] max-w-sm leading-relaxed">
              Curated for conscious play and intentional childhood memories. Mindfully crafted, sustainably sourced, and 100% safety certified for growing minds.
            </p>
            <div className="flex flex-wrap items-center gap-3 pt-2 text-[#292A26]">
              <span className="text-[11px] uppercase tracking-wider font-medium bg-white px-3 py-1 rounded-sm border border-[#E8E4DC]">
                Non-Toxic Certified
              </span>
              <span className="text-[11px] uppercase tracking-wider font-medium bg-white px-3 py-1 rounded-sm border border-[#E8E4DC]">
                Express Delivery
              </span>
              <span className="text-[11px] uppercase tracking-wider font-medium bg-white px-3 py-1 rounded-sm border border-[#E8E4DC]">
                30-Day Returns
              </span>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-xs font-semibold text-[#292A26] uppercase tracking-widest mb-4">
              Explore
            </h4>
            <ul className="space-y-2.5 text-xs tracking-wide">
              <li><Link to="/" className="hover:text-[#292A26] transition-colors">Home Storefront</Link></li>
              <li><Link to="/shop" className="hover:text-[#292A26] transition-colors">Complete Catalog</Link></li>
              <li><Link to="/about" className="hover:text-[#292A26] transition-colors">Our Philosophy</Link></li>
              <li><Link to="/contact" className="hover:text-[#292A26] transition-colors">Customer Care</Link></li>
              <li><Link to="/orders" className="hover:text-[#292A26] transition-colors">Order Tracking</Link></li>
            </ul>
          </div>

          {/* Toy Categories */}
          <div>
            <h4 className="text-xs font-semibold text-[#292A26] uppercase tracking-widest mb-4">
              Collections
            </h4>
            <ul className="space-y-2.5 text-xs tracking-wide">
              <li><Link to="/shop?category=building-sets" className="hover:text-[#292A26] transition-colors">Building &amp; Architecture</Link></li>
              <li><Link to="/shop?category=puzzles" className="hover:text-[#292A26] transition-colors">STEM &amp; Puzzles</Link></li>
              <li><Link to="/shop?category=action-figures" className="hover:text-[#292A26] transition-colors">Action &amp; Figures</Link></li>
              <li><Link to="/shop?category=dolls" className="hover:text-[#292A26] transition-colors">Plush &amp; Companions</Link></li>
              <li><Link to="/shop?category=outdoor" className="hover:text-[#292A26] transition-colors">Outdoor Play</Link></li>
            </ul>
          </div>

          {/* Newsletter Signup */}
          <div>
            <h4 className="text-xs font-semibold text-[#292A26] uppercase tracking-widest mb-4">
              Newsletter
            </h4>
            <p className="text-xs text-[#77766F] mb-3 leading-relaxed">
              Receive thoughtful stories, new arrival previews, and exclusive offers.
            </p>
            <form onSubmit={handleSubscribe} className="space-y-2">
              <input
                type="email"
                placeholder="Your email address"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-3.5 py-2 text-xs bg-white border border-[#E8E4DC] text-[#292A26] placeholder:text-[#77766F]/60 rounded-md focus:outline-none focus:border-[#292A26]"
              />
              <Button
                type="submit"
                variant="primary"
                size="sm"
                className="w-full text-xs uppercase tracking-wider py-2"
              >
                Join Our Journal
              </Button>
              {subscribed && (
                <p className="text-xs text-[#54684E] font-medium pt-1">
                  Thank you for joining our community.
                </p>
              )}
            </form>
          </div>
        </div>

        {/* BOTTOM COPYRIGHT & PAYMENT METHODS */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#77766F]">
          <p>© {new Date().getFullYear()} Toys Ecom. All rights reserved. Designed for mindful parenting.</p>
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-1 bg-white border border-[#E8E4DC] rounded-sm text-[#292A26] text-[10px] font-medium">VISA</span>
            <span className="px-2.5 py-1 bg-white border border-[#E8E4DC] rounded-sm text-[#292A26] text-[10px] font-medium">MASTERCARD</span>
            <span className="px-2.5 py-1 bg-white border border-[#E8E4DC] rounded-sm text-[#292A26] text-[10px] font-medium">UPI</span>
            <span className="px-2.5 py-1 bg-white border border-[#E8E4DC] rounded-sm text-[#292A26] text-[10px] font-medium">COD</span>
          </div>
        </div>
      </Container>
    </footer>
  );
}
