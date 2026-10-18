import React from 'react';
import { Shield } from 'lucide-react';

const CURRENT_YEAR = new Date().getFullYear();

const Footer = () => {
  return (
    <footer className="bg-slate-950 border-t border-slate-800/80 text-slate-400 text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex flex-col md:flex-row items-start justify-between gap-10 mb-10">
          {/* Brand Col */}
          <div className="space-y-3 max-w-md">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 rounded-lg bg-indigo-600/20 border border-indigo-500/30 flex items-center justify-center">
                <Shield className="w-4 h-4 text-emerald-400" />
              </div>
              <span className="text-base font-bold text-white tracking-tight">SafeWalk</span>
            </div>
            <p className="text-slate-400 leading-relaxed">
              Ultra-reliable personal safety and rapid emergency dispatch grid. Connecting citizens, verified law enforcement, and medical responders in real time.
            </p>
            <div className="inline-flex items-center space-x-2 px-3 py-1 bg-emerald-950/40 border border-emerald-800/50 rounded-full text-[11px] text-emerald-400">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              <span>Grid Status: Active & Operational</span>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-3">
            <h4 className="text-xs font-semibold text-white uppercase tracking-wider">Platform</h4>
            <ul className="space-y-2 text-slate-400">
              <li><a href="#how-it-works" className="hover:text-slate-200 transition">How SafeWalk Works</a></li>
              <li><a href="#problem" className="hover:text-slate-200 transition">The Need</a></li>
              <li><a href="#discovery" className="hover:text-slate-200 transition">Adaptive Search</a></li>
              <li><a href="#benefits" className="hover:text-slate-200 transition">Safety Benefits</a></li>
              <li><a href="#app" className="hover:text-slate-200 transition">Android App</a></li>
              <li><a href="/admin/login" className="hover:text-slate-200 transition">Law Enforcement Admin Portal</a></li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 border-t border-slate-900 flex flex-col sm:flex-row items-center justify-between text-slate-500">
          <p>© {CURRENT_YEAR} SafeWalk Emergency Network. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
