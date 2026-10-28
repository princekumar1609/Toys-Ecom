import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Modal from '../common/Modal';
import Input from '../common/Input';
import Button from '../common/Button';
import { useAuth } from '../../context/AuthContext';

export default function AuthModal({ isOpen, onClose, initialTab = 'login' }) {
  const navigate = useNavigate();
  const { login, register } = useAuth();
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

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage('');
    if (!loginEmail || !loginPassword) {
      setErrorMessage('Please enter both email and password.');
      return;
    }
    setIsLoading(true);
    try {
      const res = await login(loginEmail, loginPassword);
      onClose();
      if (res?.data?.role === 'ADMIN') {
        navigate('/admin/dashboard');
      }
    } catch (err) {
      setErrorMessage(err.message || 'Authentication failed.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleRegisterSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage('');
    if (regPassword !== regConfirmPassword) {
      setErrorMessage('Passwords do not match.');
      return;
    }
    setIsLoading(true);
    try {
      await register(regName, regEmail, regPassword, regPhone);
      setSuccessMessage('Account created successfully!');
      setTimeout(() => {
        setSuccessMessage('');
        onClose();
      }, 1000);
    } catch (err) {
      setErrorMessage(err.message || 'Registration failed.');
    } finally {
      setIsLoading(false);
    }
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
        {/* Header Branding */}
        <div className="text-center space-y-2">
          <div className="w-10 h-10 rounded-sm bg-[#292A26] text-[#FAF8F3] flex items-center justify-center font-display text-base font-semibold mx-auto">
            TE
          </div>
          <h2 className="text-2xl font-display font-medium text-[#292A26]">
            {activeTab === 'login' && 'Welcome to Toys Ecom'}
            {activeTab === 'register' && 'Create Your Account'}
            {activeTab === 'forgot' && 'Reset Your Password'}
          </h2>
          <p className="text-xs text-[#77766F] leading-relaxed">
            {activeTab === 'login' && 'Sign in to access your orders and saved collections.'}
            {activeTab === 'register' && 'Join our conscious parenting and play community.'}
            {activeTab === 'forgot' && 'Enter your registered email to receive a recovery link.'}
          </p>
        </div>

        {/* Tab Switcher Buttons */}
        {activeTab !== 'forgot' && (
          <div className="flex border-b border-[#E8E4DC]">
            <button
              type="button"
              onClick={() => { setActiveTab('login'); setErrorMessage(''); setSuccessMessage(''); }}
              className={`flex-1 pb-2.5 font-medium text-xs uppercase tracking-wider text-center border-b-2 transition-all cursor-pointer ${
                activeTab === 'login' ? 'border-[#292A26] text-[#292A26]' : 'border-transparent text-[#77766F] hover:text-[#292A26]'
              }`}
            >
              Sign In
            </button>
            <button
              type="button"
              onClick={() => { setActiveTab('register'); setErrorMessage(''); setSuccessMessage(''); }}
              className={`flex-1 pb-2.5 font-medium text-xs uppercase tracking-wider text-center border-b-2 transition-all cursor-pointer ${
                activeTab === 'register' ? 'border-[#292A26] text-[#292A26]' : 'border-transparent text-[#77766F] hover:text-[#292A26]'
              }`}
            >
              Create Account
            </button>
          </div>
        )}

        {/* Alert Banners */}
        {errorMessage && (
          <div className="p-3 bg-[#C98268]/10 border border-[#C98268]/30 text-[#A35338] text-xs rounded-md font-medium">
            {errorMessage}
          </div>
        )}
        {successMessage && (
          <div className="p-3 bg-[#A8B5A0]/20 border border-[#A8B5A0]/40 text-[#3B5135] text-xs rounded-md font-medium text-center">
            {successMessage}
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

            <div className="space-y-1.5">
              <div className="flex justify-between items-center">
                <label className="text-xs font-medium text-[#292A26]">Password</label>
                <button
                  type="button"
                  onClick={() => { setActiveTab('forgot'); setErrorMessage(''); setSuccessMessage(''); }}
                  className="text-xs text-[#77766F] hover:text-[#292A26] transition-colors"
                >
                  Forgot password?
                </button>
              </div>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  placeholder="••••••••"
                  value={loginPassword}
                  onChange={(e) => setLoginPassword(e.target.value)}
                  className="w-full px-3.5 py-2.5 text-sm bg-white border border-[#E8E4DC] rounded-md text-[#292A26] placeholder:text-[#77766F]/60 focus:outline-none focus:border-[#292A26] focus:ring-1 focus:ring-[#292A26] pr-10"
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

            <Button type="submit" variant="primary" size="md" className="w-full mt-2" isLoading={isLoading}>
              Sign In To Account
            </Button>
          </form>
        )}

        {/* TAB 2: REGISTER FORM */}
        {activeTab === 'register' && (
          <form onSubmit={handleRegisterSubmit} className="space-y-3.5">
            <Input
              label="Full Name"
              placeholder="E.g. Sophia Lindqvist"
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

            <Button type="submit" variant="primary" size="md" className="w-full mt-2" isLoading={isLoading}>
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
            <Button type="submit" variant="primary" size="md" className="w-full" isLoading={isLoading}>
              Send Reset Link
            </Button>
            <button
              type="button"
              onClick={() => { setActiveTab('login'); setErrorMessage(''); setSuccessMessage(''); }}
              className="w-full text-center text-xs text-[#77766F] hover:text-[#292A26] transition-colors"
            >
              ← Back to Sign In
            </button>
          </form>
        )}
      </div>
    </Modal>
  );
}
