import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Container from '../../components/common/Container';
import Breadcrumb from '../../components/common/Breadcrumb';
import Card from '../../components/common/Card';
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
    <div className="py-6 space-y-6">
      <Container maxWidth="max-w-md">
        <Breadcrumb items={[{ label: mode === 'login' ? 'Sign In' : 'Create Account' }]} />

        <Card className="p-8 border border-gray-200 shadow-lg bg-white rounded-3xl space-y-6 mt-4">
          <div className="text-center space-y-1">
            <div className="w-12 h-12 bg-amber-500 text-white rounded-2xl flex items-center justify-center text-2xl mx-auto shadow-md">
              🧸
            </div>
            <h1 className="text-2xl font-extrabold font-display text-gray-900">
              {mode === 'login' ? 'Welcome Back!' : 'Join ToyNest Family'}
            </h1>
            <p className="text-xs text-gray-500">
              {mode === 'login' ? 'Sign in to access saved cart & track orders' : 'Create an account for fast checkout & exclusive offers'}
            </p>
          </div>

          {errorMessage && (
            <div className="p-3 bg-red-50 border border-red-200 text-red-700 text-xs rounded-xl font-medium">
              ⚠️ {errorMessage}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            {mode === 'register' && (
              <Input label="Full Name" placeholder="John Doe" value={name} onChange={(e) => setName(e.target.value)} required />
            )}

            <Input label="Email Address" type="email" placeholder="name@example.com" value={email} onChange={(e) => setEmail(e.target.value)} required />

            <Input label="Password" type="password" placeholder="••••••••" value={password} onChange={(e) => setPassword(e.target.value)} required />

            {mode === 'register' && (
              <Input label="Phone Number" type="tel" placeholder="+91 98765 43210" value={phone} onChange={(e) => setPhone(e.target.value)} />
            )}

            <Button type="submit" variant="primary" size="lg" className="w-full mt-2" isLoading={isLoading}>
              {mode === 'login' ? 'Sign In Now →' : 'Create Customer Account →'}
            </Button>
          </form>

          <div className="pt-3 text-center border-t border-gray-100 text-xs">
            {mode === 'login' ? (
              <p className="text-gray-500">
                Don't have an account yet?{' '}
                <button onClick={() => { setMode('register'); setErrorMessage(''); }} className="font-bold text-amber-600 hover:underline">
                  Create Account
                </button>
              </p>
            ) : (
              <p className="text-gray-500">
                Already registered?{' '}
                <button onClick={() => { setMode('login'); setErrorMessage(''); }} className="font-bold text-amber-600 hover:underline">
                  Sign In Here
                </button>
              </p>
            )}
          </div>
        </Card>
      </Container>
    </div>
  );
}
