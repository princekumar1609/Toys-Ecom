import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Container from '../common/Container';

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
    <footer className="bg-gray-900 text-gray-300 border-t border-gray-800 pt-12 pb-8 mt-16">
      <Container>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 pb-12 border-b border-gray-800">
          {/* Brand Info */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-2">
              <span className="text-3xl">🧸</span>
              <span className="text-2xl font-bold font-display text-white tracking-tight">
                Toy<span className="text-amber-400">Nest</span>
              </span>
            </div>
            <p className="text-sm text-gray-400 max-w-sm leading-relaxed">
              ToyNest is your premier destination for safe, creative, educational, and fun toys for kids of all ages. Bringing joy to every childhood memory.
            </p>
            <div className="flex items-center gap-3 pt-2 text-gray-400">
              <span className="text-xs bg-gray-800 px-3 py-1 rounded-full border border-gray-700">🔒 100% Secure Checkout</span>
              <span className="text-xs bg-gray-800 px-3 py-1 rounded-full border border-gray-700">🚚 Express Shipping</span>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">Quick Navigation</h4>
            <ul className="space-y-2.5 text-sm">
              <li><Link to="/" className="hover:text-amber-400 transition-colors">Home</Link></li>
              <li><Link to="/shop" className="hover:text-amber-400 transition-colors">All Toys</Link></li>
              <li><Link to="/about" className="hover:text-amber-400 transition-colors">About ToyNest</Link></li>
              <li><Link to="/contact" className="hover:text-amber-400 transition-colors">Customer Support</Link></li>
              <li><Link to="/orders" className="hover:text-amber-400 transition-colors">Track Orders</Link></li>
            </ul>
          </div>

          {/* Toy Categories */}
          <div>
            <h4 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">Popular Categories</h4>
            <ul className="space-y-2.5 text-sm text-gray-400">
              <li><Link to="/shop?category=action-figures" className="hover:text-amber-400 transition-colors">Action Figures</Link></li>
              <li><Link to="/shop?category=building-sets" className="hover:text-amber-400 transition-colors">Lego & Building Sets</Link></li>
              <li><Link to="/shop?category=puzzles" className="hover:text-amber-400 transition-colors">Educational Puzzles</Link></li>
              <li><Link to="/shop?category=dolls" className="hover:text-amber-400 transition-colors">Dolls & Plushies</Link></li>
              <li><Link to="/shop?category=outdoor" className="hover:text-amber-400 transition-colors">Outdoor Play</Link></li>
            </ul>
          </div>

          {/* Newsletter Signup */}
          <div>
            <h4 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">Stay In The Loop</h4>
            <p className="text-xs text-gray-400 mb-3">
              Subscribe to get exclusive discount offers and new toy release updates.
            </p>
            <form onSubmit={handleSubscribe} className="space-y-2">
              <input
                type="email"
                placeholder="Enter your email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-3.5 py-2 text-xs bg-gray-800 border border-gray-700 text-white rounded-lg focus:outline-none focus:border-amber-400"
              />
              <button
                type="submit"
                className="w-full py-2 bg-amber-500 hover:bg-amber-600 text-white text-xs font-semibold rounded-lg transition-colors"
              >
                Subscribe Now
              </button>
              {subscribed && (
                <p className="text-xs text-emerald-400 font-medium">✨ Thank you for subscribing!</p>
              )}
            </form>
          </div>
        </div>

        {/* Bottom Copyright & Payment Methods */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-gray-500">
          <p>© {new Date().getFullYear()} ToyNest E-Commerce Platform. Built with React & Tailwind CSS.</p>
          <div className="flex items-center gap-3">
            <span className="px-2 py-0.5 bg-gray-800 border border-gray-700 rounded text-gray-300 font-bold text-[10px]">VISA</span>
            <span className="px-2 py-0.5 bg-gray-800 border border-gray-700 rounded text-gray-300 font-bold text-[10px]">MASTERCARD</span>
            <span className="px-2 py-0.5 bg-gray-800 border border-gray-700 rounded text-gray-300 font-bold text-[10px]">UPI</span>
            <span className="px-2 py-0.5 bg-gray-800 border border-gray-700 rounded text-gray-300 font-bold text-[10px]">COD</span>
          </div>
        </div>
      </Container>
    </footer>
  );
}
