import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Shield, LogIn, LogOut, LayoutDashboard, Menu, X } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
  const { isAuthenticated, isAdmin, user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/');
    setMobileMenuOpen(false);
  };

  const isHome = location.pathname === '/';

  return (
    <nav className="sticky top-0 z-40 bg-slate-950/80 backdrop-blur-md border-b border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3 group">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-600 via-indigo-500 to-emerald-400 p-0.5 shadow-lg shadow-indigo-500/20 group-hover:scale-105 transition-transform">
              <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center">
                <Shield className="w-5 h-5 text-indigo-400 group-hover:text-emerald-400 transition-colors" />
              </div>
            </div>
            <div>
              <span className="text-xl font-bold tracking-tight text-white flex items-center">
                Safe<span className="text-emerald-400">Walk</span>
              </span>
              <span className="block text-[10px] font-medium tracking-widest uppercase text-slate-400 -mt-1">
                Emergency Grid
              </span>
            </div>
          </Link>

          {/* Desktop Nav Links */}
          <div className="hidden md:flex items-center space-x-7 text-sm font-medium">
            {isHome ? (
              <>
                <a href="#problem" className="text-slate-300 hover:text-white transition">The Need</a>
                <a href="#how-it-works" className="text-slate-300 hover:text-white transition">How It Works</a>
                <a href="#discovery" className="text-slate-300 hover:text-white transition">Adaptive Search</a>
                <a href="#benefits" className="text-slate-300 hover:text-white transition">Benefits</a>
                <a href="#app" className="text-slate-300 hover:text-white transition">Android App</a>
              </>
            ) : (
              <Link to="/" className="text-slate-300 hover:text-white transition">Home</Link>
            )}
          </div>

          {/* Action / Auth Buttons */}
          <div className="hidden md:flex items-center space-x-4">
            {isAuthenticated && isAdmin ? (
              <div className="flex items-center space-x-3">
                <Link
                  to="/admin"
                  className={`flex items-center space-x-2 px-3.5 py-2 rounded-xl text-xs font-semibold transition ${
                    location.pathname === '/admin'
                      ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/30'
                      : 'bg-slate-800 text-slate-200 hover:bg-slate-700'
                  }`}
                >
                  <LayoutDashboard className="w-4 h-4" />
                  <span>Admin Dashboard</span>
                </Link>
                <div className="text-right hidden lg:block">
                  <p className="text-xs font-semibold text-white">{user?.name || 'Administrator'}</p>
                  <p className="text-[10px] font-mono text-emerald-400">ROLE_ADMIN</p>
                </div>
                <button
                  onClick={handleLogout}
                  className="p-2 text-slate-400 hover:text-red-400 hover:bg-red-950/30 rounded-xl transition"
                  title="Sign Out"
                >
                  <LogOut className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <Link
                to="/admin/login"
                className="flex items-center space-x-2 px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 hover:text-white text-xs font-semibold rounded-xl border border-slate-700 transition"
              >
                <LogIn className="w-4 h-4 text-indigo-400" />
                <span>Admin Login</span>
              </Link>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-slate-900 border-b border-slate-800 px-4 pt-2 pb-4 space-y-3">
          {isHome ? (
            <>
              <a
                href="#problem"
                onClick={() => setMobileMenuOpen(false)}
                className="block py-2 text-sm text-slate-300 hover:text-white"
              >
                The Need
              </a>
              <a
                href="#how-it-works"
                onClick={() => setMobileMenuOpen(false)}
                className="block py-2 text-sm text-slate-300 hover:text-white"
              >
                How It Works
              </a>
              <a
                href="#discovery"
                onClick={() => setMobileMenuOpen(false)}
                className="block py-2 text-sm text-slate-300 hover:text-white"
              >
                Adaptive Search
              </a>
              <a
                href="#benefits"
                onClick={() => setMobileMenuOpen(false)}
                className="block py-2 text-sm text-slate-300 hover:text-white"
              >
                Safety Benefits
              </a>
              <a
                href="#app"
                onClick={() => setMobileMenuOpen(false)}
                className="block py-2 text-sm text-slate-300 hover:text-white"
              >
                Android App
              </a>
            </>
          ) : (
            <Link
              to="/"
              onClick={() => setMobileMenuOpen(false)}
              className="block py-2 text-sm text-slate-300 hover:text-white"
            >
              Home
            </Link>
          )}

          <div className="pt-2 border-t border-slate-800">
            {isAuthenticated && isAdmin ? (
              <div className="space-y-2">
                <Link
                  to="/admin"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center space-x-2 py-2 text-sm text-indigo-400 font-semibold"
                >
                  <LayoutDashboard className="w-4 h-4" />
                  <span>Admin Dashboard</span>
                </Link>
                <button
                  onClick={handleLogout}
                  className="flex items-center space-x-2 py-2 text-sm text-red-400 w-full text-left"
                >
                  <LogOut className="w-4 h-4" />
                  <span>Sign Out</span>
                </button>
              </div>
            ) : (
              <Link
                to="/admin/login"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center space-x-2 py-2 text-sm text-indigo-400 font-semibold"
              >
                <LogIn className="w-4 h-4" />
                <span>Admin Login</span>
              </Link>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
