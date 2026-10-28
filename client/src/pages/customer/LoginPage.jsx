import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Container from '../../components/common/Container';
import Breadcrumb from '../../components/common/Breadcrumb';
import Input from '../../components/common/Input';
import Button from '../../components/common/Button';
import { useAuth } from '../../context/AuthContext';

export default function LoginPage() {
  const navigate = useNavigate();
  const { user, login, register } = useAuth();

  const [mode, setMode] = useState('login'); // 'login' or 'register'
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phone, setPhone] = useState('');

  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    if (user) {
      if (user.role === 'ADMIN') {
        navigate('/admin/dashboard', { replace: true });
      } else {
        navigate('/', { replace: true });
      }
    }
  }, [user, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage('');
    setIsLoading(true);

    try {
      if (mode === 'login') {
        const res = await login(email, password);
        if (res?.data?.role === 'ADMIN') {
          navigate('/admin/dashboard');
        } else {
          navigate('/');
        }
      } else {
        await register(name, email, password, phone);
        navigate('/');
      }
    } catch (err) {
      setErrorMessage(err.message || 'Authentication failed. Please check your credentials.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="py-12 sm:py-16 space-y-6">
      <Container maxWidth="max-w-md">
        <Breadcrumb items={[{ label: mode === 'login' ? 'Sign In' : 'Register' }]} />

        <div className="p-8 sm:p-10 border border-[#E8E4DC] bg-white rounded-lg space-y-6 mt-4">
          <div className="text-center space-y-2">
            <div className="w-10 h-10 bg-[#292A26] text-[#FAF8F3] rounded-sm flex items-center justify-center font-display text-base font-semibold mx-auto">
              TE
            </div>
            <h1 className="text-2xl sm:text-3xl font-display font-medium text-[#292A26]">
              {mode === 'login' ? 'Welcome Back' : 'Create An Account'}
            </h1>
            <p className="text-xs text-[#77766F] leading-relaxed">
              {mode === 'login'
                ? 'Sign in to access saved collections and shipment tracking.'
                : 'Join our community for thoughtful play and bespoke privileges.'}
            </p>
          </div>

          {errorMessage && (
            <div className="p-3 bg-[#C98268]/15 border border-[#C98268]/30 text-[#A35338] text-xs rounded-md font-medium">
              {errorMessage}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            {mode === 'register' && (
              <Input
                label="Full Name"
                placeholder="E.g. Olivia Martin"
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
                label="Mobile Phone"
                type="tel"
                placeholder="+91 98765 43210"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
            )}

            <Button type="submit" variant="primary" size="lg" className="w-full mt-2 py-3" isLoading={isLoading}>
              {mode === 'login' ? 'Sign In Now →' : 'Complete Registration →'}
            </Button>
          </form>

          <div className="pt-4 text-center border-t border-[#E8E4DC] text-xs">
            {mode === 'login' ? (
              <p className="text-[#77766F]">
                New to Toys Ecom?{' '}
                <button
                  type="button"
                  onClick={() => { setMode('register'); setErrorMessage(''); }}
                  className="font-medium text-[#292A26] hover:text-[#C98268] transition-colors ml-1 cursor-pointer"
                >
                  Create Account
                </button>
              </p>
            ) : (
              <p className="text-[#77766F]">
                Already registered?{' '}
                <button
                  type="button"
                  onClick={() => { setMode('login'); setErrorMessage(''); }}
                  className="font-medium text-[#292A26] hover:text-[#C98268] transition-colors ml-1 cursor-pointer"
                >
                  Sign In Here
                </button>
              </p>
            )}
          </div>
        </div>
      </Container>
    </div>
  );
}
