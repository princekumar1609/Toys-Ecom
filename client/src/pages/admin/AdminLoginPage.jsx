import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Card from '../../components/common/Card';
import Input from '../../components/common/Input';
import Button from '../../components/common/Button';
import { useAuth } from '../../context/AuthContext';

export default function AdminLoginPage() {
  const navigate = useNavigate();
  const { adminLogin } = useAuth();

  const [email, setEmail] = useState('admin@toysecom.com');
  const [password, setPassword] = useState('admin123456');
  const [showPassword, setShowPassword] = useState(false);

  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleAdminLogin = async (e) => {
    e.preventDefault();
    setErrorMessage('');

    if (!email || !password) {
      setErrorMessage('Please provide both admin email and password.');
      return;
    }

    setIsLoading(true);
    try {
      await adminLogin(email, password);
      navigate('/admin/dashboard');
    } catch (err) {
      setErrorMessage(err.message || 'Admin authentication failed. Invalid credentials or insufficient permissions.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#292A26] flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-md space-y-6">
        {/* Header Logo */}
        <div className="text-center space-y-3">
          <div className="w-12 h-12 bg-[#FAF8F3] text-[#292A26] rounded-sm flex items-center justify-center font-display text-lg font-semibold mx-auto">
            TE
          </div>
          <div>
            <h1 className="text-2xl font-display font-medium text-white tracking-tight">
              Toys Ecom Management
            </h1>
            <p className="text-xs text-[#A8B5A0] mt-0.5 uppercase tracking-wider font-mono">
              Authorized Business Portal
            </p>
          </div>
        </div>

        {/* Login Card */}
        <div className="p-8 bg-white border border-[#E8E4DC] rounded-lg shadow-xl space-y-6">
          <div className="border-b border-[#E8E4DC] pb-3 flex items-center justify-between">
            <h2 className="text-sm uppercase tracking-wider font-semibold text-[#292A26]">Administrator Sign In</h2>
            <span className="text-[10px] font-semibold text-[#292A26] bg-[#FAF8F3] border border-[#E8E4DC] px-2 py-0.5 rounded-sm">
              TLS SECURED
            </span>
          </div>

          {errorMessage && (
            <div className="p-3 bg-[#C98268]/15 border border-[#C98268]/30 text-[#A35338] text-xs rounded-md font-medium">
              {errorMessage}
            </div>
          )}

          <form onSubmit={handleAdminLogin} className="space-y-4">
            <Input
              label="Admin Email"
              type="email"
              placeholder="admin@toysecom.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />

            <div className="space-y-1.5">
              <label className="text-xs font-medium text-[#292A26]">Password</label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-3.5 py-2.5 text-sm bg-white border border-[#E8E4DC] rounded-md text-[#292A26] focus:outline-none focus:border-[#292A26] focus:ring-1 focus:ring-[#292A26] pr-12"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-[#77766F] text-xs hover:text-[#292A26]"
                >
                  {showPassword ? 'Hide' : 'Show'}
                </button>
              </div>
            </div>

            <Button type="submit" variant="primary" size="lg" className="w-full mt-2 py-3" isLoading={isLoading}>
              Authenticate &amp; Open Dashboard →
            </Button>
          </form>

          <div className="pt-2 text-center border-t border-[#E8E4DC]">
            <Link to="/" className="text-xs text-[#77766F] hover:text-[#292A26] transition-colors">
              ← Return to Public Customer Store
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
