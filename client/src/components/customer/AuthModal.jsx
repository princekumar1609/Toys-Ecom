import React, { useState } from 'react';
import Modal from '../common/Modal';
import Input from '../common/Input';
import Button from '../common/Button';

export default function AuthModal({ isOpen, onClose, initialTab = 'login' }) {
  const [activeTab, setActiveTab] = useState(initialTab); // 'login', 'register', 'forgot'
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  // Form Field States
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');

  const [regName, setRegName] = useState('');
  const [regEmail, setRegEmail] = useState('');
  const [regPhone, setRegPhone] = useState('');
  const [regPassword, setRegPassword] = useState('');
  const [regConfirmPassword, setRegConfirmPassword] = useState('');

  const [forgotEmail, setForgotEmail] = useState('');

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    setErrorMessage('');
    if (!loginEmail || !loginPassword) {
      setErrorMessage('Please enter both email and password.');
      return;
    }
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setSuccessMessage('Successfully signed in! (UI Simulation)');
      setTimeout(() => {
        setSuccessMessage('');
        onClose();
      }, 1500);
    }, 1000);
  };

  const handleRegisterSubmit = (e) => {
    e.preventDefault();
    setErrorMessage('');
    if (regPassword !== regConfirmPassword) {
      setErrorMessage('Passwords do not match.');
      return;
    }
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setSuccessMessage('Account created successfully! (UI Simulation)');
      setTimeout(() => {
        setSuccessMessage('');
        setActiveTab('login');
      }, 1500);
    }, 1000);
  };

  const handleForgotSubmit = (e) => {
    e.preventDefault();
    setErrorMessage('');
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setSuccessMessage(`Password reset link sent to ${forgotEmail}`);
    }, 1000);
  };

  if (!isOpen) return null;

  return (
    <Modal isOpen={isOpen} onClose={onClose} maxWidth="max-w-md">
      <div className="space-y-6">
        {/* Header Tabs */}
        <div className="text-center space-y-2">
          <div className="text-4xl">🧸</div>
          <h2 className="text-2xl font-bold font-display text-gray-900">
            {activeTab === 'login' && 'Welcome Back to ToyNest'}
            {activeTab === 'register' && 'Create Your ToyNest Account'}
            {activeTab === 'forgot' && 'Reset Your Password'}
          </h2>
          <p className="text-xs text-gray-500">
            {activeTab === 'login' && 'Sign in to access your orders and wishlist.'}
            {activeTab === 'register' && 'Join thousands of happy parents and toy lovers.'}
            {activeTab === 'forgot' && 'Enter your registered email to receive a reset link.'}
          </p>
        </div>

        {/* Tab Switcher Buttons */}
        {activeTab !== 'forgot' && (
          <div className="flex border-b border-gray-200">
            <button
              type="button"
              onClick={() => { setActiveTab('login'); setErrorMessage(''); setSuccessMessage(''); }}
              className={`flex-1 pb-2.5 font-bold text-xs uppercase tracking-wider text-center border-b-2 transition-all ${
                activeTab === 'login' ? 'border-amber-500 text-amber-600' : 'border-transparent text-gray-400 hover:text-gray-600'
              }`}
            >
              Sign In
            </button>
            <button
              type="button"
              onClick={() => { setActiveTab('register'); setErrorMessage(''); setSuccessMessage(''); }}
              className={`flex-1 pb-2.5 font-bold text-xs uppercase tracking-wider text-center border-b-2 transition-all ${
                activeTab === 'register' ? 'border-amber-500 text-amber-600' : 'border-transparent text-gray-400 hover:text-gray-600'
              }`}
            >
              Register
            </button>
          </div>
        )}

        {/* Alert Banners */}
        {errorMessage && (
          <div className="p-3 bg-red-50 border border-red-200 text-red-700 text-xs rounded-lg font-medium">
            ⚠️ {errorMessage}
          </div>
        )}
        {successMessage && (
          <div className="p-3 bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs rounded-lg font-semibold text-center">
            ✨ {successMessage}
          </div>
        )}

        {/* TAB 1: SIGN IN FORM */}
        {activeTab === 'login' && (
          <form onSubmit={handleLoginSubmit} className="space-y-4">
            <Input
              label="Email Address"
              type="email"
              placeholder="name@example.com"
              value={loginEmail}
              onChange={(e) => setLoginEmail(e.target.value)}
              required
            />

            <div className="space-y-1">
              <div className="flex justify-between items-center">
                <label className="text-sm font-medium text-gray-700">Password</label>
                <button
                  type="button"
                  onClick={() => { setActiveTab('forgot'); setErrorMessage(''); setSuccessMessage(''); }}
                  className="text-xs font-semibold text-amber-600 hover:underline"
                >
                  Forgot Password?
                </button>
              </div>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  placeholder="••••••••"
                  value={loginPassword}
                  onChange={(e) => setLoginPassword(e.target.value)}
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

            <Button type="submit" variant="primary" className="w-full" isLoading={isLoading}>
              Sign In To Account
            </Button>
          </form>
        )}

        {/* TAB 2: REGISTER FORM */}
        {activeTab === 'register' && (
          <form onSubmit={handleRegisterSubmit} className="space-y-3">
            <Input
              label="Full Name"
              placeholder="John Doe"
              value={regName}
              onChange={(e) => setRegName(e.target.value)}
              required
            />
            <Input
              label="Email Address"
              type="email"
              placeholder="name@example.com"
              value={regEmail}
              onChange={(e) => setRegEmail(e.target.value)}
              required
            />
            <Input
              label="Phone Number"
              type="tel"
              placeholder="+91 98765 43210"
              value={regPhone}
              onChange={(e) => setRegPhone(e.target.value)}
            />
            <Input
              label="Password"
              type={showPassword ? 'text' : 'password'}
              placeholder="At least 6 characters"
              value={regPassword}
              onChange={(e) => setRegPassword(e.target.value)}
              required
            />
            <Input
              label="Confirm Password"
              type={showPassword ? 'text' : 'password'}
              placeholder="Repeat password"
              value={regConfirmPassword}
              onChange={(e) => setRegConfirmPassword(e.target.value)}
              required
            />

            <Button type="submit" variant="primary" className="w-full mt-2" isLoading={isLoading}>
              Create New Account
            </Button>
          </form>
        )}

        {/* TAB 3: FORGOT PASSWORD FORM */}
        {activeTab === 'forgot' && (
          <form onSubmit={handleForgotSubmit} className="space-y-4">
            <Input
              label="Registered Email Address"
              type="email"
              placeholder="name@example.com"
              value={forgotEmail}
              onChange={(e) => setForgotEmail(e.target.value)}
              required
            />
            <Button type="submit" variant="primary" className="w-full" isLoading={isLoading}>
              Send Reset Link
            </Button>
            <button
              type="button"
              onClick={() => { setActiveTab('login'); setErrorMessage(''); setSuccessMessage(''); }}
              className="w-full text-center text-xs font-semibold text-gray-500 hover:text-amber-600"
            >
              ← Back to Sign In
            </button>
          </form>
        )}
      </div>
    </Modal>
  );
}
