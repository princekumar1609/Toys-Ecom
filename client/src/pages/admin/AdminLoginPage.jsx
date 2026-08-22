import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Card from '../../components/common/Card';
import Input from '../../components/common/Input';
import Button from '../../components/common/Button';
import { useAuth } from '../../context/AuthContext';

export default function AdminLoginPage() {
  const navigate = useNavigate();
  const { adminLogin } = useAuth();

  const [email, setEmail] = useState('admin@toynest.com');
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
    <div className="min-h-screen bg-gray-900 flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-md space-y-6">
        {/* Header Logo */}
        <div className="text-center space-y-2">
          <div className="w-16 h-16 bg-amber-500 text-white rounded-2xl flex items-center justify-center text-3xl mx-auto shadow-lg">
            🧸
          </div>
          <h1 className="text-2xl font-extrabold font-display text-white tracking-tight">
            Toy<span className="text-amber-400">Nest</span> Admin Portal
          </h1>
          <p className="text-xs text-gray-400">
            Authorized Business Management Access Only
          </p>
        </div>

        {/* Login Card */}
        <Card className="p-8 bg-white border border-gray-800 rounded-3xl shadow-2xl space-y-6">
          <div className="border-b border-gray-100 pb-3 flex items-center justify-between">
            <h2 className="text-lg font-bold text-gray-900">Administrator Sign In</h2>
            <span className="text-[10px] font-bold text-amber-800 bg-amber-100 px-2 py-0.5 rounded">
              REST API SECURE
            </span>
          </div>

          {errorMessage && (
            <div className="p-3 bg-red-50 border border-red-200 text-red-700 text-xs rounded-xl font-medium">
              ⚠️ {errorMessage}
            </div>
          )}

          <form onSubmit={handleAdminLogin} className="space-y-4">
            <Input
              label="Admin Email"
              type="email"
              placeholder="admin@toynest.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />

            <div className="space-y-1">
              <label className="text-sm font-medium text-gray-700">Password</label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-3.5 py-2 text-sm bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 pr-10"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 text-xs hover:text-gray-600"
                >
                  {showPassword ? 'Hide' : 'Show'}
                </button>
              </div>
            </div>

            <Button type="submit" variant="primary" size="lg" className="w-full mt-2 shadow-md" isLoading={isLoading}>
              Authenticate &amp; Open Dashboard →
            </Button>
          </form>

          <div className="pt-2 text-center border-t border-gray-100">
            <Link to="/" className="text-xs font-semibold text-gray-500 hover:text-amber-600">
              ← Return to Public Customer Store
            </Link>
          </div>
        </Card>
      </div>
    </div>
  );
}
