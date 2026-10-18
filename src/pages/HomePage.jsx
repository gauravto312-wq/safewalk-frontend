import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  ShieldCheck,
  AlertCircle,
  Smartphone,
  CheckCircle2,
  ArrowRight,
  Clock,
  Compass,
  Bell,
  HeartHandshake,
  Navigation,
  UserCheck,
  ShieldAlert,
  Share2,
} from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const HomePage = () => {
  // Interactive state for the 6-stage emergency flow
  const [activeStage, setActiveStage] = useState(1);

  // Interactive state for the Hero Visual simulation
  const [heroStep, setHeroStep] = useState(1); // 1: SOS, 2: 2km Radius, 3: Accepted

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col selection:bg-teal-500 selection:text-slate-950">
      <Navbar />

      {/* ─────────────────────────────────────────────────────────────
          1. HERO SECTION — Immediate Understanding
          ───────────────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden pt-16 pb-20 md:pt-24 md:pb-32 border-b border-slate-800/80">
        {/* Soft background ambient glows */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[650px] h-[380px] bg-teal-500/10 rounded-full blur-[140px] pointer-events-none"></div>
        <div className="absolute top-1/3 right-1/4 w-[420px] h-[280px] bg-indigo-600/10 rounded-full blur-[120px] pointer-events-none"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">

            {/* Left Column: Mission & Plain-English Story */}
            <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
              <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-slate-900/90 border border-teal-500/30 text-xs font-medium text-teal-300 shadow-sm">
                <span className="flex h-2 w-2 relative">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-teal-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-teal-400"></span>
                </span>
                <span>Personal Safety & Proximity Response Network</span>
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-[1.12]">
                When Every Second Matters,{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-400 via-teal-300 to-indigo-300">
                  Help Should Be Closer.
                </span>
              </h1>

              <p className="text-base sm:text-lg text-slate-300 max-w-2xl mx-auto lg:mx-0 leading-relaxed font-normal">
                SafeWalk helps people request emergency assistance, alert relevant trusted contacts, and connect with eligible nearby responders through a coordinated, location-aware safety network.
              </p>

              {/* Call-to-action buttons */}
              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
                <a
                  href="#how-it-works"
                  className="w-full sm:w-auto inline-flex items-center justify-center px-6 py-3.5 rounded-xl bg-teal-500 hover:bg-teal-400 text-slate-950 font-bold text-sm shadow-xl shadow-teal-500/20 transition hover:-translate-y-0.5 cursor-pointer"
                >
                  <Navigation className="w-4 h-4 mr-2" />
                  <span>How SafeWalk Works</span>
                </a>

                <a
                  href="#app"
                  className="w-full sm:w-auto inline-flex items-center justify-center px-6 py-3.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-200 hover:text-white font-semibold text-sm border border-slate-700/80 transition hover:-translate-y-0.5 cursor-pointer"
                >
                  <Smartphone className="w-4 h-4 mr-2 text-teal-400" />
                  <span>Explore the SafeWalk App</span>
                </a>
              </div>

              {/* 4 Trust Highlights */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-6 border-t border-slate-800/80">
                <div className="text-left p-2.5 rounded-lg bg-slate-900/40 border border-slate-800/60">
                  <div className="text-xs font-semibold text-white">One-Touch SOS</div>
                  <div className="text-[11px] text-slate-400 mt-0.5">Instant trigger on Android</div>
                </div>
                <div className="text-left p-2.5 rounded-lg bg-slate-900/40 border border-slate-800/60">
                  <div className="text-xs font-semibold text-white">~2 km Proximity</div>
                  <div className="text-[11px] text-slate-400 mt-0.5">Focused local discovery</div>
                </div>
                <div className="text-left p-2.5 rounded-lg bg-slate-900/40 border border-slate-800/60">
                  <div className="text-xs font-semibold text-white">Verified Police</div>
                  <div className="text-[11px] text-slate-400 mt-0.5">Badge-audited responders</div>
                </div>
                <div className="text-left p-2.5 rounded-lg bg-slate-900/40 border border-slate-800/60">
                  <div className="text-xs font-semibold text-white">Adaptive Refresh</div>
                  <div className="text-[11px] text-slate-400 mt-0.5">~15s movement updates</div>
                </div>
              </div>
            </div>

            {/* Right Column: Hero Visual Animated Illustration */}
            <div className="lg:col-span-5 relative">
              <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-6 shadow-2xl backdrop-blur-md relative overflow-hidden">

                {/* Visual Header / State Control */}
                <div className="flex items-center justify-between pb-4 border-b border-slate-800">
                  <div>
                    <span className="text-xs font-bold text-white tracking-wide uppercase">Emergency Radius Simulation</span>
                    <p className="text-[11px] text-slate-400">Interactive product workflow</p>
                  </div>
                  <div className="flex items-center space-x-1.5 bg-slate-950 p-1 rounded-lg border border-slate-800 text-[11px]">
                    <button
                      onClick={() => setHeroStep(1)}
                      className={`px-2.5 py-1 rounded font-medium transition ${heroStep === 1 ? 'bg-red-500 text-white font-bold' : 'text-slate-400 hover:text-white'}`}
                    >
                      1. SOS
                    </button>
                    <button
                      onClick={() => setHeroStep(2)}
                      className={`px-2.5 py-1 rounded font-medium transition ${heroStep === 2 ? 'bg-teal-500 text-slate-950 font-bold' : 'text-slate-400 hover:text-white'}`}
                    >
                      2. ~2km Radius
                    </button>
                    <button
                      onClick={() => setHeroStep(3)}
                      className={`px-2.5 py-1 rounded font-medium transition ${heroStep === 3 ? 'bg-indigo-600 text-white font-bold' : 'text-slate-400 hover:text-white'}`}
                    >
                      3. En Route
                    </button>
                  </div>
                </div>

                {/* Tactical Map Grid Canvas */}
                <div className="relative h-72 sm:h-80 w-full mt-4 bg-slate-950 rounded-2xl border border-slate-800/80 overflow-hidden flex items-center justify-center">

                  {/* Subtle Grid Map Streets */}
                  <svg className="absolute inset-0 w-full h-full stroke-slate-800/40" width="100%" height="100%">
                    <defs>
                      <pattern id="street-grid" width="40" height="40" patternUnits="userSpaceOnUse">
                        <path d="M 40 0 L 0 0 0 40" fill="none" strokeWidth="1" />
                      </pattern>
                    </defs>
                    <rect width="100%" height="100%" fill="url(#street-grid)" />
                    {/* Simulated diagonal avenues */}
                    <line x1="0" y1="60" x2="350" y2="350" stroke="#1e293b" strokeWidth="2" />
                    <line x1="80" y1="0" x2="380" y2="280" stroke="#1e293b" strokeWidth="1.5" />
                    <line x1="0" y1="200" x2="320" y2="0" stroke="#1e293b" strokeWidth="2" />
                  </svg>

                  {/* ~2 km Radius Circles (Only when step >= 2) */}
                  {heroStep >= 2 && (
                    <>
                      <div className="absolute w-64 h-64 rounded-full border border-teal-500/25 bg-teal-500/5 animate-pulse"></div>
                      <div className="absolute w-44 h-44 rounded-full border border-dashed border-teal-400/35"></div>
                      <span className="absolute top-4 right-5 text-[10px] font-mono text-teal-400 bg-teal-950/60 px-2 py-0.5 rounded border border-teal-800/50">
                        SEARCH BOUNDARY ~2.0 KM
                      </span>
                    </>
                  )}

                  {/* Radar Wave Pulse in Hero */}
                  {heroStep >= 1 && (
                    <div className="absolute w-28 h-28 rounded-full border border-red-500/30 animate-ping pointer-events-none"></div>
                  )}

                  {/* Center: Requester in Distress */}
                  <div className="relative z-20 flex flex-col items-center">
                    <div className="relative">
                      <div className="w-12 h-12 rounded-full bg-red-600/30 border-2 border-red-500 flex items-center justify-center text-white shadow-lg shadow-red-500/40 animate-bounce">
                        <AlertCircle className="w-6 h-6 text-white" />
                      </div>
                      <span className="absolute -top-1 -right-1 w-3.5 h-3.5 rounded-full bg-red-500 animate-ping"></span>
                    </div>
                    <div className="mt-2 px-2.5 py-0.5 rounded-md bg-slate-900/90 border border-slate-700 text-[10px] font-bold text-white shadow">
                      You (Requester)
                    </div>
                  </div>

                  {/* Nearby Verified Police Marker (Officer Vikram) */}
                  {heroStep >= 2 && (
                    <div className={`absolute top-10 right-12 z-20 transition-all duration-700 ${heroStep === 3 ? 'translate-x-[-40px] translate-y-[35px]' : ''}`}>
                      <div className="flex items-center space-x-1.5 p-1.5 rounded-xl bg-slate-900 border border-emerald-500/60 shadow-lg">
                        <div className="w-7 h-7 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
                          <ShieldCheck className="w-4 h-4" />
                        </div>
                        <div className="pr-1 text-left">
                          <p className="text-[10px] font-bold text-white leading-tight">Officer Vikram</p>
                          <p className="text-[9px] text-emerald-400 font-mono">0.6 km • Verified Police</p>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Nearby Medical Responder Marker */}
                  {heroStep >= 2 && (
                    <div className="absolute bottom-8 left-10 z-20">
                      <div className="flex items-center space-x-1.5 p-1.5 rounded-xl bg-slate-900 border border-slate-700/80 shadow-lg">
                        <div className="w-7 h-7 rounded-lg bg-indigo-500/20 text-indigo-300 flex items-center justify-center text-xs font-bold">
                          🚑
                        </div>
                        <div className="pr-1 text-left">
                          <p className="text-[10px] font-bold text-white leading-tight">City Medical Care</p>
                          <p className="text-[9px] text-slate-400 font-mono">1.2 km • Hospital</p>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Dynamic travel line when responder accepted (HeroStep === 3) */}
                  {heroStep === 3 && (
                    <svg className="absolute inset-0 w-full h-full pointer-events-none z-10">
                      <line
                        x1="220"
                        y1="100"
                        x2="175"
                        y2="150"
                        stroke="#10b981"
                        strokeWidth="3"
                        strokeDasharray="6 4"
                        className="animate-dash"
                      />
                    </svg>
                  )}
                </div>

                {/* Floating Bottom Status Pill */}
                <div className="mt-4 p-3 bg-slate-950/80 border border-slate-800 rounded-xl flex items-center justify-between text-xs">
                  <div className="flex items-center space-x-2">
                    <span className={`w-2.5 h-2.5 rounded-full ${heroStep === 1 ? 'bg-red-500' : heroStep === 2 ? 'bg-teal-400' : 'bg-emerald-400'} animate-pulse`}></span>
                    <span className="text-slate-300 font-medium">
                      {heroStep === 1 && 'SOS Broadcast Active • Alerting Emergency Network'}
                      {heroStep === 2 && 'Searching ~2 km Radius for Verified Authorities & Contacts'}
                      {heroStep === 3 && 'Request Accepted by Officer Vikram • En Route to Your Coordinates'}
                    </span>
                  </div>
                  <button
                    onClick={() => setHeroStep((prev) => (prev % 3) + 1)}
                    className="text-teal-400 hover:text-teal-300 font-semibold text-[11px] underline ml-2 shrink-0 cursor-pointer"
                  >
                    Next Stage →
                  </button>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>


      {/* ─────────────────────────────────────────────────────────────
          2. SECTION — THE REAL PROBLEMS SAFEWALK ADDRESSES
          ───────────────────────────────────────────────────────────── */}
      <section id="problem" className="py-20 bg-slate-950 border-b border-slate-800/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-xs font-bold uppercase tracking-widest text-teal-400 mb-2">The Real-World Need</h2>
            <h3 className="text-3xl sm:text-4xl font-extrabold text-white">When Emergencies Strike, Minutes Count</h3>
            <p className="text-slate-400 mt-4 text-base leading-relaxed">
              In high-stress situations, standard communications break down. SafeWalk is built around the three everyday barriers people face when trying to reach safety.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

            {/* Problem 1: Getting Help Quickly */}
            <div className="p-7 rounded-2xl bg-slate-900/60 border border-slate-800/80 hover:border-slate-700 transition space-y-4">
              <div className="w-12 h-12 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400">
                <Clock className="w-6 h-6" />
              </div>
              <h4 className="text-lg font-bold text-white">Getting Help Quickly</h4>
              <p className="text-sm text-slate-300 leading-relaxed">
                During acute distress, explaining your location verbally over a voice call is difficult, confusing, and consumes precious time. SafeWalk immediately communicates your coordinates with one tap, so nearby help knows where to find you.
              </p>
              <div className="pt-2 text-xs text-amber-400/90 font-medium flex items-center">
                <span>Direct location-based alert</span>
              </div>
            </div>

            {/* Problem 2: Knowing Whom to Trust */}
            <div className="p-7 rounded-2xl bg-slate-900/60 border border-slate-800/80 hover:border-slate-700 transition space-y-4">
              <div className="w-12 h-12 rounded-xl bg-teal-500/10 border border-teal-500/20 flex items-center justify-center text-teal-400">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <h4 className="text-lg font-bold text-white">Knowing Whom to Trust</h4>
              <p className="text-sm text-slate-300 leading-relaxed">
                In vulnerable moments, you cannot rely on unvetted crowd accounts. SafeWalk enforces strict departmental credential reviews for police officers and medical personnel before granting responder dispatch privileges.
              </p>
              <div className="pt-2 text-xs text-teal-400/90 font-medium flex items-center">
                <span>Verified departmental credentials</span>
              </div>
            </div>

            {/* Problem 3: Keeping Up When You Move */}
            <div className="p-7 rounded-2xl bg-slate-900/60 border border-slate-800/80 hover:border-slate-700 transition space-y-4">
              <div className="w-12 h-12 rounded-xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400">
                <Compass className="w-6 h-6" />
              </div>
              <h4 className="text-lg font-bold text-white">Keeping Up When You Move</h4>
              <p className="text-sm text-slate-300 leading-relaxed">
                Emergencies are rarely static. If you walk, flee, or seek shelter, a single outdated location ping leaves responders heading in the wrong direction. SafeWalk periodically refreshes nearby discovery as you move.
              </p>
              <div className="pt-2 text-xs text-indigo-400/90 font-medium flex items-center">
                <span>Periodic location-aware search</span>
              </div>
            </div>

          </div>
        </div>
      </section>


      {/* ─────────────────────────────────────────────────────────────
          3. SECTION — HOW SAFEWALK HELPS IN AN EMERGENCY (6 STAGES)
          ───────────────────────────────────────────────────────────── */}
      <section id="how-it-works" className="py-20 bg-slate-900/40 border-b border-slate-800/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-14">
            <h2 className="text-xs font-bold uppercase tracking-widest text-teal-400 mb-2">The Emergency Journey</h2>
            <h3 className="text-3xl sm:text-4xl font-extrabold text-white">How SafeWalk Helps in an Emergency</h3>
            <p className="text-slate-400 mt-4 text-base leading-relaxed">
              Explore the six clear stages of an active emergency, from the first touch of the SOS button to safe conclusion and mutual confirmation.
            </p>
          </div>

          {/* Stepper Navigation (Desktop + Mobile) */}
          <div className="flex flex-wrap items-center justify-center gap-2 mb-10">
            {[
              { num: 1, title: '1. Request Help' },
              { num: 2, title: '2. ~2 km Radius Search' },
              { num: 3, title: '3. Verified Authorities' },
              { num: 4, title: '4. Alert Network' },
              { num: 5, title: '5. Responder Accepts' },
              { num: 6, title: '6. Safe Resolution' },
            ].map((st) => (
              <button
                key={st.num}
                onClick={() => setActiveStage(st.num)}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition flex items-center space-x-2 cursor-pointer ${
                  activeStage === st.num
                    ? 'bg-teal-500 text-slate-950 shadow-lg shadow-teal-500/20'
                    : 'bg-slate-900 text-slate-300 hover:text-white border border-slate-800'
                }`}
              >
                <span>{st.title}</span>
              </button>
            ))}
          </div>

          {/* Interactive Card Presentation of Current Stage */}
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-10 shadow-2xl">

            {/* STAGE 1 */}
            {activeStage === 1 && (
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center animate-fade-in">
                <div className="lg:col-span-6 space-y-4">
                  <span className="px-3 py-1 rounded-full text-xs font-bold bg-red-500/20 text-red-300 border border-red-500/30">
                    STAGE 01 • INITIATION
                  </span>
                  <h4 className="text-2xl sm:text-3xl font-extrabold text-white">A Person Requests Immediate Help</h4>
                  <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
                    When you find yourself in danger, open SafeWalk on your Android device and press the SOS button.
                  </p>
                  <p className="text-slate-400 text-xs sm:text-sm leading-relaxed">
                    The app captures your high-accuracy GPS coordinates and instantly submits the emergency signal. No dialing numbers, navigating complicated menus, or speaking under duress is necessary.
                  </p>
                  <div className="p-3.5 bg-slate-950 rounded-xl border border-slate-800 text-xs text-slate-300 space-y-1">
                    <div className="flex items-center text-teal-400 font-semibold">
                      <CheckCircle2 className="w-4 h-4 mr-2" /> Live coordinates packaged with one press
                    </div>
                    <div className="text-slate-400 text-[11px] pl-6">
                      Emergency status transitions to ACTIVE across the safety network.
                    </div>
                  </div>
                </div>

                <div className="lg:col-span-6 flex justify-center">
                  <div className="w-64 sm:w-72 p-5 bg-slate-950 rounded-3xl border-2 border-red-500/40 shadow-2xl flex flex-col items-center text-center space-y-4">
                    <span className="text-[10px] uppercase font-mono tracking-widest text-red-400 font-bold">Emergency Signal</span>
                    <div className="w-28 h-28 rounded-full bg-red-600/20 border-4 border-red-500 flex items-center justify-center animate-pulse shadow-lg shadow-red-500/30">
                      <AlertCircle className="w-14 h-14 text-red-500" />
                    </div>
                    <div>
                      <p className="text-base font-bold text-white">EMERGENCY TRIGGERED</p>
                      <p className="text-xs text-slate-400 mt-1">Live coordinates dispatched</p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* STAGE 2 */}
            {activeStage === 2 && (
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center animate-fade-in">
                <div className="lg:col-span-6 space-y-4">
                  <span className="px-3 py-1 rounded-full text-xs font-bold bg-teal-500/20 text-teal-300 border border-teal-500/30">
                    STAGE 02 • PROXIMITY SEARCH
                  </span>
                  <h4 className="text-2xl sm:text-3xl font-extrabold text-white">Search Around the Person (~2 km Radius)</h4>
                  <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
                    SafeWalk focuses search around your current supported location to find eligible responders close enough to make a difference.
                  </p>
                  <p className="text-slate-400 text-xs sm:text-sm leading-relaxed">
                    The search radius is calibrated to approximately <strong>2.0 kilometres</strong>. This represents a realistic spatial boundary designed to locate nearby active responders in your immediate neighborhood.
                  </p>
                  <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 text-xs text-slate-400 space-y-1">
                    <p className="text-teal-400 font-medium">Important Context:</p>
                    <p className="text-[11px] leading-relaxed">
                      The circular perimeter represents a geographical distance boundary based on available location data, not an exact travel-time guarantee.
                    </p>
                  </div>
                </div>

                <div className="lg:col-span-6 flex justify-center">
                  <div className="w-72 h-72 rounded-full border-2 border-teal-500/40 bg-slate-950 relative flex items-center justify-center shadow-xl">
                    <div className="w-48 h-48 rounded-full border border-dashed border-teal-400/30 flex items-center justify-center">
                      <div className="w-6 h-6 rounded-full bg-red-500 animate-ping"></div>
                    </div>
                    <div className="absolute top-4 font-mono text-[11px] text-teal-400 bg-slate-900 px-2 py-0.5 rounded border border-teal-800">
                      Search Perimeter: ~2.0 km
                    </div>
                    <div className="absolute bottom-6 text-[10px] text-slate-400 text-center px-4">
                      Locating verified officers & eligible responders
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* STAGE 3 */}
            {activeStage === 3 && (
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center animate-fade-in">
                <div className="lg:col-span-6 space-y-4">
                  <span className="px-3 py-1 rounded-full text-xs font-bold bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
                    STAGE 03 • STRICT ELIGIBILITY
                  </span>
                  <h4 className="text-2xl sm:text-3xl font-extrabold text-white">Find Verified Responders</h4>
                  <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
                    Not just anyone can accept an official emergency dispatch. SafeWalk distinguishes between verified authorities and unverified accounts.
                  </p>
                  <p className="text-slate-400 text-xs sm:text-sm leading-relaxed">
                    Police officers and medical responders undergo human review of official ID cards, badge numbers, and departmental credentials. Unverified accounts cannot accept official dispatches.
                  </p>
                  <div className="grid grid-cols-2 gap-3 pt-2">
                    <div className="p-3 bg-slate-950 rounded-xl border border-emerald-500/40 text-xs">
                      <div className="text-emerald-400 font-bold flex items-center"><ShieldCheck className="w-4 h-4 mr-1.5" /> Verified Police</div>
                      <div className="text-[11px] text-slate-400 mt-1">Eligible for turn-by-turn dispatch</div>
                    </div>
                    <div className="p-3 bg-slate-950 rounded-xl border border-red-500/30 text-xs">
                      <div className="text-red-400 font-bold flex items-center"><ShieldAlert className="w-4 h-4 mr-1.5" /> Unverified Users</div>
                      <div className="text-[11px] text-slate-400 mt-1">Blocked from dispatch actions</div>
                    </div>
                  </div>
                </div>

                <div className="lg:col-span-6 flex justify-center">
                  <div className="w-full max-w-sm p-5 bg-slate-950 rounded-2xl border border-slate-800 space-y-3">
                    <div className="p-3 bg-slate-900 rounded-xl border border-emerald-500/50 flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className="w-9 h-9 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold">
                          PO
                        </div>
                        <div>
                          <p className="text-xs font-bold text-white">Inspector Vikram Singh</p>
                          <p className="text-[10px] text-slate-400">Badge #DL-9041 • State Police</p>
                        </div>
                      </div>
                      <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                        ELIGIBLE
                      </span>
                    </div>

                    <div className="p-3 bg-slate-900/60 rounded-xl border border-slate-800 flex items-center justify-between opacity-60">
                      <div className="flex items-center space-x-3">
                        <div className="w-9 h-9 rounded-lg bg-slate-800 text-slate-400 flex items-center justify-center font-bold">
                          ?
                        </div>
                        <div>
                          <p className="text-xs font-bold text-white">Unverified Account</p>
                          <p className="text-[10px] text-slate-500">Pending Credential Audit</p>
                        </div>
                      </div>
                      <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-slate-800 text-slate-400">
                        INELIGIBLE
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* STAGE 4 */}
            {activeStage === 4 && (
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center animate-fade-in">
                <div className="lg:col-span-6 space-y-4">
                  <span className="px-3 py-1 rounded-full text-xs font-bold bg-amber-500/20 text-amber-300 border border-amber-500/30">
                    STAGE 04 • NOTIFICATION NETWORK
                  </span>
                  <h4 className="text-2xl sm:text-3xl font-extrabold text-white">Alert the Safety Network</h4>
                  <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
                    When an emergency is active, SafeWalk sends targeted alerts across distinct safety channels.
                  </p>
                  <div className="space-y-3 pt-1">
                    <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 text-xs">
                      <div className="font-semibold text-white flex items-center"><Bell className="w-4 h-4 mr-2 text-teal-400" /> 1. Eligible Nearby Responders</div>
                      <p className="text-slate-400 text-[11px] mt-0.5">Receive high-priority emergency notifications with distance and heading.</p>
                    </div>
                    <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 text-xs">
                      <div className="font-semibold text-white flex items-center"><HeartHandshake className="w-4 h-4 mr-2 text-amber-400" /> 2. Personal Emergency Contacts</div>
                      <p className="text-slate-400 text-[11px] mt-0.5">Designated friends and family receive immediate notifications that you triggered SOS.</p>
                    </div>
                    <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 text-xs">
                      <div className="font-semibold text-white flex items-center"><UserCheck className="w-4 h-4 mr-2 text-indigo-400" /> 3. Nearby Community Users</div>
                      <p className="text-slate-400 text-[11px] mt-0.5">Notified where supported by application permissions and proximity.</p>
                    </div>
                  </div>
                </div>

                <div className="lg:col-span-6 flex justify-center">
                  <div className="w-full max-w-sm space-y-2.5">
                    <div className="p-3.5 bg-slate-950 rounded-xl border border-amber-500/40 shadow-lg flex items-center space-x-3">
                      <div className="w-8 h-8 rounded-lg bg-amber-500/20 text-amber-400 flex items-center justify-center shrink-0">
                        <Bell className="w-4 h-4" />
                      </div>
                      <div className="text-xs">
                        <p className="font-bold text-white">Officer Vikram Notified</p>
                        <p className="text-[11px] text-slate-400">Emergency signal 0.6 km away</p>
                      </div>
                    </div>

                    <div className="p-3.5 bg-slate-950 rounded-xl border border-teal-500/40 shadow-lg flex items-center space-x-3">
                      <div className="w-8 h-8 rounded-lg bg-teal-500/20 text-teal-400 flex items-center justify-center shrink-0">
                        <Share2 className="w-4 h-4" />
                      </div>
                      <div className="text-xs">
                        <p className="font-bold text-white">Emergency Contacts Alerted</p>
                        <p className="text-[11px] text-slate-400">Mom & Rohit received distress ping</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* STAGE 5 */}
            {activeStage === 5 && (
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center animate-fade-in">
                <div className="lg:col-span-6 space-y-4">
                  <span className="px-3 py-1 rounded-full text-xs font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                    STAGE 05 • DISPATCH ACCEPTANCE
                  </span>
                  <h4 className="text-2xl sm:text-3xl font-extrabold text-white">A Responder Accepts the Request</h4>
                  <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
                    When an eligible verified responder reviews the incident and accepts, the emergency transitions to <strong>ACCEPTED</strong> status.
                  </p>
                  <p className="text-slate-400 text-xs sm:text-sm leading-relaxed">
                    Your Android screen immediately reflects the assigned responder's details, official badge, and distance so you know who is approaching.
                  </p>
                  <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 text-xs text-slate-400">
                    <p className="text-amber-400 font-semibold mb-1">Realistic Assurance:</p>
                    <p className="text-[11px]">
                      Response depends on responder availability and acceptance. SafeWalk provides the coordinating bridge; it does not replace calling 112 in life-threatening scenarios.
                    </p>
                  </div>
                </div>

                <div className="lg:col-span-6 flex justify-center">
                  <div className="w-full max-w-sm p-6 bg-slate-950 rounded-2xl border border-emerald-500/50 shadow-2xl text-center space-y-3">
                    <div className="w-12 h-12 rounded-full bg-emerald-500/20 text-emerald-400 mx-auto flex items-center justify-center">
                      <CheckCircle2 className="w-7 h-7" />
                    </div>
                    <h5 className="text-base font-bold text-white">Request Accepted</h5>
                    <p className="text-xs text-slate-300">
                      Inspector Vikram Singh accepted your SOS and is proceeding to your location.
                    </p>
                    <div className="pt-2 flex justify-center space-x-2 text-[11px] font-mono text-emerald-400">
                      <span className="px-2.5 py-1 bg-emerald-950/60 rounded border border-emerald-800">DISTANCE: ~600m</span>
                      <span className="px-2.5 py-1 bg-emerald-950/60 rounded border border-emerald-800">STATUS: EN ROUTE</span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* STAGE 6 */}
            {activeStage === 6 && (
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center animate-fade-in">
                <div className="lg:col-span-6 space-y-4">
                  <span className="px-3 py-1 rounded-full text-xs font-bold bg-cyan-500/20 text-cyan-300 border border-cyan-500/30">
                    STAGE 06 • MUTUAL RESOLUTION
                  </span>
                  <h4 className="text-2xl sm:text-3xl font-extrabold text-white">Safe Arrival and Mutual Confirmation</h4>
                  <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
                    Once the responder arrives and safety is restored, the emergency lifecycle reaches its conclusion.
                  </p>
                  <p className="text-slate-400 text-xs sm:text-sm leading-relaxed">
                    To prevent accidental cancellations or false conclusions, SafeWalk supports mutual confirmation: both the requester and the responder verify that the situation has safely resolved.
                  </p>
                  <div className="p-3.5 bg-slate-950 rounded-xl border border-slate-800 text-xs text-slate-300 space-y-1">
                    <div className="flex items-center text-cyan-400 font-semibold">
                      <CheckCircle2 className="w-4 h-4 mr-2" /> Permanent Audit Trail
                    </div>
                    <div className="text-slate-400 text-[11px] pl-6">
                      Timestamps, accepted responder IDs, and resolution confirmations are archived for safety accountability.
                    </div>
                  </div>
                </div>

                <div className="lg:col-span-6 flex justify-center">
                  <div className="w-full max-w-sm p-6 bg-slate-950 rounded-2xl border border-cyan-500/40 shadow-2xl text-center space-y-3">
                    <div className="w-12 h-12 rounded-full bg-cyan-500/20 text-cyan-400 mx-auto flex items-center justify-center">
                      <HeartHandshake className="w-7 h-7" />
                    </div>
                    <h5 className="text-base font-bold text-white">Incident Safely Resolved</h5>
                    <p className="text-xs text-slate-300">
                      Requester and Responder confirmed safe resolution. Emergency contacts receive confirmation that you are safe.
                    </p>
                    <div className="pt-2 text-[11px] font-mono text-cyan-400">
                      STATUS: RESOLVED • AUDIT VERIFIED
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Stepper Footer Controls */}
            <div className="mt-8 pt-6 border-t border-slate-800 flex items-center justify-between text-xs text-slate-400">
              <button
                disabled={activeStage === 1}
                onClick={() => setActiveStage((p) => Math.max(1, p - 1))}
                className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 disabled:opacity-30 disabled:cursor-not-allowed text-white cursor-pointer"
              >
                ← Previous Stage
              </button>
              <span className="font-mono text-slate-500">Stage {activeStage} of 6</span>
              <button
                disabled={activeStage === 6}
                onClick={() => setActiveStage((p) => Math.min(6, p + 1))}
                className="px-3 py-1.5 rounded-lg bg-teal-500 hover:bg-teal-400 disabled:opacity-30 disabled:cursor-not-allowed text-slate-950 font-bold cursor-pointer"
              >
                Next Stage →
              </button>
            </div>

          </div>
        </div>
      </section>


      {/* ─────────────────────────────────────────────────────────────
          4. SECTION — A SEARCH THAT KEEPS UP AS YOU MOVE (15-Second Refresh)
          ───────────────────────────────────────────────────────────── */}
      <section id="discovery" className="py-20 bg-slate-950 border-b border-slate-800/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">

            {/* Left: Product Explanation */}
            <div className="lg:col-span-6 space-y-6 text-center lg:text-left">
              <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-indigo-950/60 border border-indigo-800/60 text-xs text-indigo-300 font-medium">
                <Compass className="w-3.5 h-3.5" />
                <span>Adaptive Proximity Updates</span>
              </div>

              <h3 className="text-3xl sm:text-4xl font-extrabold text-white leading-tight">
                A Search That Keeps Up as You Move
              </h3>

              <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
                During an active emergency, people rarely stay in one spot. You may move toward a safe location, seek shelter inside an open store, or flee an immediate danger.
              </p>

              <p className="text-slate-400 text-xs sm:text-sm leading-relaxed">
                SafeWalk periodically refreshes nearby-responder discovery—<strong>approximately every 15 seconds</strong>—so the system can account for changing location information. As your phone shares updated coordinates, the search circle shifts along with you, continuously identifying the closest help along your route.
              </p>

              <div className="p-4 bg-slate-900 rounded-2xl border border-slate-800 space-y-2 text-xs">
                <div className="flex items-center space-x-2 text-teal-400 font-bold">
                  <span className="w-2 h-2 rounded-full bg-teal-400 animate-ping"></span>
                  <span>Periodic Refresh · Approximately Every 15 Seconds</span>
                </div>
                <p className="text-slate-400 text-[11px] leading-relaxed">
                  Conceptual product illustration. Actual location update frequency and GPS precision depend on device capabilities, physical surroundings, and network availability.
                </p>
              </div>
            </div>

            {/* Right: Dynamic Visual Movement Animation */}
            <div className="lg:col-span-6">
              <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-2xl relative overflow-hidden">
                <div className="flex items-center justify-between pb-4 border-b border-slate-800 text-xs">
                  <span className="font-bold text-white uppercase tracking-wider">Dynamic Re-Centering</span>
                  <span className="font-mono text-teal-400 bg-teal-950/60 px-2 py-0.5 rounded border border-teal-800/50">
                    ~15s CHECK INTERVAL
                  </span>
                </div>

                {/* Animated Movement Diagram */}
                <div className="relative h-64 sm:h-72 w-full mt-4 bg-slate-950 rounded-2xl border border-slate-800 flex items-center justify-center overflow-hidden">

                  {/* Waypoint A (Old Location) */}
                  <div className="absolute top-12 left-12 flex flex-col items-center opacity-60">
                    <div className="w-8 h-8 rounded-full bg-slate-800 border border-slate-600 flex items-center justify-center text-slate-400 text-[10px] font-bold">
                      A
                    </div>
                    <span className="text-[10px] text-slate-400 mt-1">Initial SOS (00:00)</span>
                    {/* Faded radius circle */}
                    <div className="absolute -inset-10 rounded-full border border-dashed border-slate-700/50 pointer-events-none"></div>
                  </div>

                  {/* Travel Path Line */}
                  <svg className="absolute inset-0 w-full h-full pointer-events-none">
                    <path
                      d="M 80 80 Q 150 140 240 180"
                      fill="none"
                      stroke="#2dd4bf"
                      strokeWidth="2.5"
                      strokeDasharray="6 4"
                      className="animate-dash"
                    />
                  </svg>

                  {/* Waypoint B (Updated Location after ~15s) */}
                  <div className="absolute bottom-12 right-16 flex flex-col items-center z-10">
                    <div className="relative">
                      <div className="w-10 h-10 rounded-full bg-teal-500/20 border-2 border-teal-400 flex items-center justify-center text-teal-300 text-xs font-bold shadow-lg shadow-teal-500/30">
                        B
                      </div>
                      <span className="absolute -top-1 -right-1 w-3 h-3 rounded-full bg-teal-400 animate-ping"></span>
                    </div>
                    <span className="text-[10px] font-bold text-white mt-1">Refreshed Position (~00:15)</span>
                    <span className="text-[9px] text-teal-400 font-mono">Radius Re-Centered (~2 km)</span>

                    {/* Freshly re-centered radius */}
                    <div className="absolute -inset-14 rounded-full border border-teal-500/30 bg-teal-500/5 pointer-events-none"></div>
                  </div>

                  {/* Newly Discovered Officer Near Waypoint B */}
                  <div className="absolute bottom-6 left-28 p-2 rounded-xl bg-slate-900 border border-emerald-500/50 shadow text-[10px]">
                    <div className="flex items-center space-x-1.5 text-white font-bold">
                      <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                      <span>Officer Rajiv Discovered Near B</span>
                    </div>
                    <p className="text-[9px] text-slate-400 font-mono">350m from updated coordinates</p>
                  </div>
                </div>

                <div className="mt-4 flex items-center justify-between text-xs text-slate-400 pt-2">
                  <span>Continuous protection as position changes</span>
                  <span className="text-teal-400 font-medium">Automatic boundary adaptation</span>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>


      {/* ─────────────────────────────────────────────────────────────
          5. SECTION — WHY PEOPLE CAN BENEFIT FROM SAFEWALK (4 Core Benefits)
          ───────────────────────────────────────────────────────────── */}
      <section id="benefits" className="py-20 bg-slate-900/30 border-b border-slate-800/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-xs font-bold uppercase tracking-widest text-teal-400 mb-2">Real User Benefits</h2>
            <h3 className="text-3xl sm:text-4xl font-extrabold text-white">Why Use SafeWalk During an Emergency</h3>
            <p className="text-slate-400 mt-4 text-base leading-relaxed">
              Designed around ordinary people in stressful situations. Simple, reliable, and grounded in real-world protection.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">

            {/* Benefit 1 */}
            <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800/80 hover:border-slate-700 transition flex flex-col justify-between">
              <div className="space-y-3">
                <div className="w-10 h-10 rounded-xl bg-red-500/10 border border-red-500/20 flex items-center justify-center text-red-400">
                  <AlertCircle className="w-5 h-5" />
                </div>
                <h4 className="text-base font-bold text-white">Clear SOS Workflow</h4>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Initiate the supported emergency sequence with a simple button press. Eliminates confusion and lets you focus on reaching physical safety.
                </p>
              </div>
            </div>

            {/* Benefit 2 */}
            <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800/80 hover:border-slate-700 transition flex flex-col justify-between">
              <div className="space-y-3">
                <div className="w-10 h-10 rounded-xl bg-teal-500/10 border border-teal-500/20 flex items-center justify-center text-teal-400">
                  <Compass className="w-5 h-5" />
                </div>
                <h4 className="text-base font-bold text-white">Proximity-Focused Discovery</h4>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Searches around your available coordinates within an approximately 2 km radius for eligible, badge-verified responders who are physically near.
                </p>
              </div>
            </div>

            {/* Benefit 3 */}
            <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800/80 hover:border-slate-700 transition flex flex-col justify-between">
              <div className="space-y-3">
                <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400">
                  <HeartHandshake className="w-5 h-5" />
                </div>
                <h4 className="text-base font-bold text-white">Guardians Kept Informed</h4>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Designated emergency contacts are automatically notified through existing notification flows, keeping your trusted circle aware of your status.
                </p>
              </div>
            </div>

            {/* Benefit 4 */}
            <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800/80 hover:border-slate-700 transition flex flex-col justify-between">
              <div className="space-y-3">
                <div className="w-10 h-10 rounded-xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400">
                  <Navigation className="w-5 h-5" />
                </div>
                <h4 className="text-base font-bold text-white">Location-Aware Guidance</h4>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Periodic discovery checks (~15s) help the network adapt as you move, keeping assistance oriented toward your latest supported position.
                </p>
              </div>
            </div>

          </div>
        </div>
      </section>


      {/* ─────────────────────────────────────────────────────────────
          6. SECTION — APP SHOWCASE AND FINAL CALL TO ACTION
          ───────────────────────────────────────────────────────────── */}
      <section id="app" className="py-20 bg-slate-950 border-b border-slate-800/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-br from-slate-900 via-slate-900 to-slate-950 border border-slate-800 rounded-3xl p-8 sm:p-14 shadow-2xl relative overflow-hidden">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">

              {/* Left Column: Native Android App Features */}
              <div className="lg:col-span-7 space-y-6">
                <span className="px-3 py-1 bg-teal-500/20 border border-teal-500/30 text-teal-300 rounded-full text-xs font-semibold">
                  Android Safety Companion
                </span>

                <h3 className="text-3xl sm:text-4xl font-extrabold text-white">
                  Safety Support, Right on Your Phone.
                </h3>

                <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
                  The SafeWalk Android app is designed for rapid emergency engagement. With a focused panic trigger, continuous location support during active emergencies, and direct contact notifications, you carry a safety grid wherever you walk.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 text-xs text-slate-300 pt-2">
                  <div className="flex items-center space-x-2.5">
                    <CheckCircle2 className="w-4 h-4 text-teal-400 shrink-0" />
                    <span>Instant panic SOS trigger</span>
                  </div>
                  <div className="flex items-center space-x-2.5">
                    <CheckCircle2 className="w-4 h-4 text-teal-400 shrink-0" />
                    <span>Continuous emergency location sync</span>
                  </div>
                  <div className="flex items-center space-x-2.5">
                    <CheckCircle2 className="w-4 h-4 text-teal-400 shrink-0" />
                    <span>Designated emergency contact alerts</span>
                  </div>
                  <div className="flex items-center space-x-2.5">
                    <CheckCircle2 className="w-4 h-4 text-teal-400 shrink-0" />
                    <span>Officer verification & document resubmission</span>
                  </div>
                </div>

                <div className="pt-4 flex flex-wrap gap-4 items-center">
                  <a
                    href="#how-it-works"
                    className="inline-flex items-center px-6 py-3 rounded-xl bg-teal-500 hover:bg-teal-400 text-slate-950 font-bold text-xs shadow-lg shadow-teal-500/20 transition cursor-pointer"
                  >
                    <span>Learn How SafeWalk Protects</span>
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </a>

                  <Link
                    to="/admin/login"
                    className="inline-flex items-center px-5 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-semibold text-xs border border-slate-700 transition"
                  >
                    <ShieldCheck className="w-4 h-4 mr-2 text-teal-400" />
                    <span>Law Enforcement Admin Access</span>
                  </Link>
                </div>
              </div>

              {/* Right Column: Original Phone Mockup Illustrating SafeWalk UI */}
              <div className="lg:col-span-5 flex justify-center">
                <div className="w-64 sm:w-72 bg-slate-950 rounded-[38px] p-3.5 border-4 border-slate-800 shadow-2xl relative">

                  {/* Speaker Ear Piece & Camera */}
                  <div className="w-20 h-4 bg-slate-900 rounded-full mx-auto mb-3 flex items-center justify-center">
                    <div className="w-2.5 h-2.5 rounded-full bg-slate-950"></div>
                  </div>

                  {/* Phone Screen Mockup Content */}
                  <div className="bg-slate-900 rounded-[28px] p-4 text-center space-y-4 border border-slate-800/80">
                    <div className="flex items-center justify-between text-[10px] text-slate-400 border-b border-slate-800 pb-2">
                      <span className="font-bold text-white">SafeWalk Guard</span>
                      <span className="text-emerald-400 font-mono">GPS ACTIVE</span>
                    </div>

                    {/* Prominent SOS Button Inside Phone */}
                    <div className="py-2">
                      <div className="w-28 h-28 mx-auto rounded-full bg-red-600/25 border-4 border-red-500 flex flex-col items-center justify-center shadow-lg shadow-red-600/40 animate-pulse">
                        <AlertCircle className="w-8 h-8 text-red-500 mb-0.5" />
                        <span className="text-white font-extrabold text-sm tracking-wider">SOS</span>
                        <span className="text-[8px] text-red-200">HOLD TO ALERT</span>
                      </div>
                    </div>

                    {/* Proximity Radius Summary */}
                    <div className="p-2.5 bg-slate-950 rounded-xl border border-slate-800 text-[10px] text-left space-y-1">
                      <div className="flex justify-between text-slate-400">
                        <span>Search Radius:</span>
                        <span className="text-teal-400 font-bold font-mono">~2.0 KM</span>
                      </div>
                      <div className="flex justify-between text-slate-400">
                        <span>Periodic Check:</span>
                        <span className="text-slate-300 font-mono">~15 SECONDS</span>
                      </div>
                    </div>

                    {/* Contact status card */}
                    <div className="p-2.5 bg-slate-950 rounded-xl border border-slate-800 text-[10px] flex items-center space-x-2 text-left">
                      <div className="w-6 h-6 rounded-md bg-teal-500/20 text-teal-400 flex items-center justify-center shrink-0">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                      </div>
                      <div>
                        <p className="font-bold text-white leading-tight">3 Contacts Linked</p>
                        <p className="text-[9px] text-slate-400">Ready for instant dispatch</p>
                      </div>
                    </div>
                  </div>

                  {/* Home Bar Indicator */}
                  <div className="w-24 h-1 bg-slate-800 rounded-full mx-auto mt-3"></div>
                </div>
              </div>

            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default HomePage;
