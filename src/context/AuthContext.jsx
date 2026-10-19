import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { authApi } from '../api/auth';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(() => sessionStorage.getItem('safewalk_token') || localStorage.getItem('safewalk_token') || null);
  const [user, setUser] = useState(() => {
    const saved = sessionStorage.getItem('safewalk_user') || localStorage.getItem('safewalk_user');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {
        return null;
      }
    }
    return null;
  });
  const [loading, setLoading] = useState(true);

  const clearAuth = useCallback(() => {
    sessionStorage.removeItem('safewalk_token');
    sessionStorage.removeItem('safewalk_user');
    localStorage.removeItem('safewalk_token');
    localStorage.removeItem('safewalk_user');
    setToken(null);
    setUser(null);
  }, []);

  const fetchProfile = useCallback(async () => {
    try {
      const res = await authApi.getProfile();
      if (res && res.success && res.data) {
        setUser(res.data);
        sessionStorage.setItem('safewalk_user', JSON.stringify(res.data));
      }
    } catch (err) {
      console.warn('Failed to fetch profile with stored token:', err);
      clearAuth();
    } finally {
      setLoading(false);
    }
  }, [clearAuth]);

  useEffect(() => {
    if (token) {
      fetchProfile();
    } else {
      setLoading(false);
    }
  }, [token, fetchProfile]);

  const login = async (credentials) => {
    setLoading(true);
    try {
      const res = await authApi.login(credentials);
      if (!res.success || !res.data || !res.data.token) {
        throw new Error(res.message || 'Login failed');
      }

      const receivedToken = res.data.token;
      sessionStorage.setItem('safewalk_token', receivedToken);
      setToken(receivedToken);

      // Fetch profile to verify role and details
      const profileRes = await authApi.getProfile();
      const userData = profileRes.data;
      setUser(userData);
      sessionStorage.setItem('safewalk_user', JSON.stringify(userData));

      return { success: true, user: userData };
    } catch (err) {
      clearAuth();
      const message = err.response?.data?.message || err.message || 'Login failed';
      throw new Error(message);
    } finally {
      setLoading(false);
    }
  };

  const isAdmin = user && (user.role === 'ADMIN' || user.role === 'ROLE_ADMIN');

  return (
    <AuthContext.Provider
      value={{
        token,
        user,
        loading,
        isAuthenticated: !!token && !!user,
        isAdmin,
        login,
        logout: clearAuth,
        refreshProfile: fetchProfile,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
