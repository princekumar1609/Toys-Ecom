import React, { createContext, useContext, useState, useEffect } from 'react';
import { authApi } from '../services/api';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('toysecom_token') || localStorage.getItem('toynest_token') || null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function loadUser() {
      if (token) {
        try {
          const res = await authApi.getMe();
          setUser(res.data);
        } catch (err) {
          console.error('[Auth Restore Error]', err.message);
          logout();
        }
      }
      setIsLoading(false);
    }
    loadUser();
  }, [token]);

  const login = async (email, password) => {
    const res = await authApi.login(email, password);
    const { token: newToken, ...userData } = res.data;
    localStorage.setItem('toysecom_token', newToken);
    setToken(newToken);
    setUser(userData);
    return res;
  };

  const adminLogin = async (email, password) => {
    const res = await authApi.adminLogin(email, password);
    const { token: newToken, ...userData } = res.data;
    localStorage.setItem('toysecom_token', newToken);
    setToken(newToken);
    setUser(userData);
    return res;
  };

  const register = async (name, email, password, phone) => {
    const res = await authApi.register(name, email, password, phone);
    const { token: newToken, ...userData } = res.data;
    localStorage.setItem('toysecom_token', newToken);
    setToken(newToken);
    setUser(userData);
    return res;
  };

  const logout = () => {
    localStorage.removeItem('toysecom_token');
    localStorage.removeItem('toynest_token');
    setToken(null);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, token, isLoading, login, adminLogin, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
