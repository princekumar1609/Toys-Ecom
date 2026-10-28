import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Modal from '../../components/common/Modal';
import Input from '../../components/common/Input';
import Button from '../../components/common/Button';
import { useAuth } from '../../context/AuthContext';

export default function AuthModal({ isOpen, onClose }) {
  const navigate = useNavigate();
  const { login, register } = useAuth();
  const [mode, setMode] = useState('login'); // 'login' or 'register'
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phone, setPhone] = useState('');

  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const resetForm = () => {
    setName('');
    setEmail('');
    setPassword('');
    setPhone('');
    setErrorMessage('');
  };

  const handleSwitchMode = (newMode) => {
    resetForm();
    setMode(newMode);
  };

  const handleClose = () => {
    resetForm();
    onClose();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage('');
    setIsLoading(true);

    try {
      if (mode === 'login') {
        const res = await login(email, password);
        handleClose();
        if (res?.data?.role === 'ADMIN') {
          navigate('/admin/dashboard');
        }
      } else {
        await register(name, email, password, phone);
        handleClose();
      }
    } catch (err) {
      setErrorMessage(err.message || 'Authentication failed. Please check your details.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={handleClose}
      title={mode === 'login' ? 'Customer Sign In' : 'Create Account'}
      maxWidth="max-w-md"
    >
      <div className="space-y-4">
        {errorMessage && (
          <div className="p-3 bg-[#C98268]/10 border border-[#C98268]/30 text-[#A35338] text-xs rounded-md font-medium">
            {errorMessage}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-3.5">
          {mode === 'register' && (
            <Input
              label="Full Name"
              placeholder="John Doe"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          )}

          <Input
            label="Email Address"
            type="email"
            placeholder="name@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <Input
            label="Password"
            type="password"
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          {mode === 'register' && (
            <Input
              label="Phone Number"
              type="tel"
              placeholder="+91 98765 43210"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
          )}

          <Button type="submit" variant="primary" size="md" className="w-full mt-2" isLoading={isLoading}>
            {mode === 'login' ? 'Sign In Now' : 'Create Customer Account'}
          </Button>
        </form>

        <div className="text-center pt-3 border-t border-[#E8E4DC] text-xs">
          {mode === 'login' ? (
            <p className="text-[#77766F]">
              New to Toys Ecom?{' '}
              <button
                type="button"
                onClick={() => handleSwitchMode('register')}
                className="text-[#292A26] font-semibold hover:text-[#C98268] transition-colors ml-1"
              >
                Create Account →
              </button>
            </p>
          ) : (
            <p className="text-[#77766F]">
              Already have an account?{' '}
              <button
                type="button"
                onClick={() => handleSwitchMode('login')}
                className="text-[#292A26] font-semibold hover:text-[#C98268] transition-colors ml-1"
              >
                Sign In Here →
              </button>
            </p>
          )}
        </div>
      </div>
    </Modal>
  );
}
