'use client';

import { useState, useCallback } from 'react';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import DestCard from '@/components/DestCard';
import { STATES_DATA } from '@/lib/statesData';

const IndiaMap = dynamic(() => import('@/components/IndiaMap'), {
  ssr: false,
  loading: () => (
    <div className="flex flex-col items-center justify-center h-96 gap-3 text-slate-400">
      <svg className="w-10 h-10 animate-spin text-orange-500" fill="none" viewBox="0 0 24 24">
        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"/>
      </svg>
      <span className="text-sm animate-pulse">Loading India Map…</span>
    </div>
  ),
});

// Flatten all places across all states
function getAllPlaces(filterCat = 'ALL') {
  const all = [];
  Object.entries(STATES_DATA).forEach(([, state]) => {
    state.places.forEach(p => all.push({ ...p, stateName: state.name }));
  });
  return filterCat === 'ALL' ? all : all.filter(p => p.category === filterCat);
}

const TABS = [
  { key: 'ALL',      label: '🌏 All Safars' },
  { key: 'Trekkers', label: '🧗 Trekkers' },
  { key: 'Explorers',label: '🗺️ Explorers' },
  { key: 'Visitor',  label: '🏰 Visitors' },
];

const DEFAULT_INSPECTOR = STATES_DATA['IN-HP'];

const categoryStyle = {
  Trekkers: { dot: 'bg-red-500',     text: 'text-red-400',     border: 'border-red-500/30',     bg: 'bg-red-500/15' },
  Explorers:{ dot: 'bg-blue-500',    text: 'text-blue-400',    border: 'border-blue-500/30',    bg: 'bg-blue-500/15' },
  Visitor:  { dot: 'bg-emerald-500', text: 'text-emerald-400', border: 'border-emerald-500/30', bg: 'bg-emerald-500/15' },
};

export default function HomePage() {
  const [tab,            setTab]            = useState('ALL');
  const [inspector,      setInspector]      = useState(DEFAULT_INSPECTOR);
  const [stateFilter,    setStateFilter]    = useState(null);   // for grid below
  const [safarModal,     setSafarModal]     = useState(false);
  const [toast,          setToast]          = useState(false);
  const [inspectorAnim,  setInspectorAnim]  = useState(false);  // flash on change

  // Called when user HOVERS a state — update the inspector panel only
  const handleHover = useCallback((data) => {
    if (data) {
      setInspector(data);
      setInspectorAnim(true);
      setTimeout(() => setInspectorAnim(false), 300);
    }
  }, []);

  // Called when user CLICKS a state — filter the grid below (no scroll)
  const handleClick = useCallback((data) => {
    if (data) {
      setStateFilter(data);
      setTab('ALL');
    }
  }, []);

  const clearFilter = () => setStateFilter(null);

  const gridPlaces = stateFilter
    ? stateFilter.places.map(p => ({ ...p, stateName: stateFilter.name }))
    : getAllPlaces(tab);

  const handleSafarSubmit = (e) => {
    e.preventDefault();
    setSafarModal(false);
    setToast(true);
    setTimeout(() => setToast(false), 4000);
  };

  return (
    <div className="min-h-screen">
      <Navbar active="/" />

      {/* ══════════════ HERO + MAP SECTION ══════════════ */}
      <section
        className="relative pt-28 pb-16 border-b border-slate-800/60 overflow-hidden"
        style={{ background: 'radial-gradient(ellipse at 50% 20%, rgba(15,118,110,0.18) 0%, rgba(6,11,24,0.98) 70%)' }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          {/* Title */}
          <div className="text-center max-w-3xl mx-auto mb-10">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-orange-500/10 border border-orange-500/30 text-orange-400 text-xs font-bold uppercase tracking-wider mb-4">
              <span className="w-2 h-2 rounded-full bg-orange-500 animate-ping" />
              Interactive India Exploration Map
            </div>
            <h1 className="heading-font text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white leading-tight">
              Discover India&apos;s{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 via-amber-400 to-emerald-400">
                Majestic Safars
              </span>
            </h1>
            <p className="mt-4 text-sm sm:text-base text-slate-300 leading-relaxed">
              Built for <strong className="text-orange-400">Explorers, Visitors &amp; Trekkers</strong>.{' '}
              <strong className="text-white">Hover</strong> over any state to reveal destinations in the panel.{' '}
              <strong className="text-white">Click</strong> to filter the safar grid below.
            </p>
          </div>

          {/* ── MAP + INSPECTOR ── */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">

            {/* MAP — 7 cols */}
            <div className="lg:col-span-7 glass-card rounded-3xl p-3 sm:p-5 border border-slate-700/50 shadow-2xl overflow-hidden">
              <div className="flex items-center justify-between mb-3 pb-3 border-b border-slate-800/60">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-orange-500 animate-pulse" />
                  <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                    Hover a state — inspector updates instantly
                  </span>
                </div>
                <span className="text-[11px] text-orange-400 font-semibold bg-orange-500/10 px-2 py-1 rounded-md border border-orange-500/20">
                  🖱️ Glow Active
                </span>
              </div>

              <IndiaMap onStateHover={handleHover} onStateClick={handleClick} />

              <p className="mt-2 text-center text-[11px] text-slate-500">
                💡 <strong className="text-orange-400">Hover</strong> → side panel updates &nbsp;|&nbsp;
                <strong className="text-orange-400">Click</strong> → filter safar grid below
              </p>
            </div>

            {/* INSPECTOR — 5 cols, sticky */}
            <div className="lg:col-span-5 lg:sticky lg:top-24 flex flex-col gap-4">

              {/* State Info Card */}
              <div
                className={`glass-card rounded-3xl border overflow-hidden transition-all duration-300 ${
                  inspectorAnim
                    ? 'border-orange-500/80 shadow-lg shadow-orange-500/20'
                    : 'border-orange-500/25'
                }`}
              >
                {/* Header bar */}
                <div className="px-5 pt-5 pb-3 border-b border-slate-800/60 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className={`w-2 h-2 rounded-full ${inspectorAnim ? 'bg-orange-500 animate-ping' : 'bg-emerald-500'}`} />
                    <span className="text-[11px] font-bold text-emerald-400 uppercase tracking-wider">Live Inspector</span>
                  </div>
                  <span className="text-[10px] text-slate-500">Hover map to update</span>
                </div>

                <div className="p-5">
                  <h2 className="brand-font text-xl font-extrabold text-white mb-0.5 transition-all duration-200">
                    {inspector?.name || 'Himachal Pradesh'}
                  </h2>
                  <p className="text-sm text-orange-400 font-semibold mb-2">{inspector?.tagline}</p>
                  <span className="text-[11px] text-slate-300 bg-slate-800/80 border border-slate-700 px-3 py-1 rounded-lg inline-block mb-4">
                    {inspector?.type}
                  </span>

                  {/* Places in inspector */}
                  <h4 className="text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-2.5">
                    Top Safars from this State
                  </h4>

                  <div className="space-y-2.5 max-h-[340px] overflow-y-auto pr-1 custom-scrollbar">
                    {(inspector?.places || []).map((place, i) => {
                      const cs = categoryStyle[place.category] || categoryStyle['Visitor'];
                      return (
                        <div
                          key={i}
                          className="flex gap-3 p-2.5 rounded-xl bg-slate-800/50 border border-slate-700/40 hover:border-orange-500/40 transition-colors group"
                        >
                          <div className="relative flex-shrink-0">
                            <img
                              src={place.img}
                              alt={place.name}
                              className="w-16 h-16 rounded-lg object-cover"
                              onError={e => { e.target.src = 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=400&q=60'; }}
                            />
                            <span className={`absolute -top-1 -right-1 w-4 h-4 rounded-full border-2 border-slate-900 ${cs.dot}`} />
                          </div>
                          <div className="overflow-hidden flex-1 min-w-0">
                            <div className="flex items-center gap-1.5 mb-0.5 flex-wrap">
                              <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded ${cs.bg} ${cs.text} ${cs.border} border`}>
                                {place.category}
                              </span>
                              <span className="text-[10px] text-slate-500">⚡ {place.difficulty}</span>
                            </div>
                            <h5 className="text-xs font-bold text-slate-100 truncate group-hover:text-orange-400 transition-colors">
                              {place.name}
                            </h5>
                            <p className="text-[11px] text-slate-400 truncate">{place.tag}</p>
                            <p className="text-[10px] text-emerald-400 font-medium mt-0.5">🗓️ {place.season}</p>
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  <div className="mt-4 pt-3 border-t border-slate-800 flex items-center justify-between">
                    <button
                      onClick={() => handleClick(inspector)}
                      className="text-[11px] font-bold text-slate-950 bg-orange-500 hover:bg-orange-600 px-3 py-1.5 rounded-lg transition-colors"
                    >
                      Filter Grid →
                    </button>
                    <button onClick={() => setSafarModal(true)} className="text-[11px] font-bold text-orange-400 hover:text-orange-300">
                      Plan Itinerary →
                    </button>
                  </div>
                </div>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-3">
                {[
                  ['120+', 'Trek Routes',    'text-orange-400'],
                  ['28',   'States',         'text-emerald-400'],
                  ['50K+', 'Happy Trekkers', 'text-amber-400'],
                ].map(([val, label, cls]) => (
                  <div key={label} className="glass-card p-3 rounded-2xl text-center border border-slate-800">
                    <span className={`block text-xl font-extrabold ${cls}`}>{val}</span>
                    <span className="text-[10px] text-slate-400">{label}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════ FOR WHOM ══════════════ */}
      <section className="py-20 border-b border-slate-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <span className="text-[11px] font-bold text-orange-400 uppercase tracking-widest bg-orange-500/10 px-3 py-1 rounded-full border border-orange-500/20">
              Built For Every Traveler
            </span>
            <h2 className="heading-font text-3xl sm:text-4xl font-extrabold text-white mt-3">
              For <span className="text-red-400">Trekkers</span>,{' '}
              <span className="text-blue-400">Explorers</span> &amp;{' '}
              <span className="text-emerald-400">Visitors</span>
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { emoji: '🧗‍♂️', title: 'For Trekkers',  color: 'red',     sub: 'High Altitudes · Ridge Walks · Snow Summits',  desc: "Himalayan winter summits, monsoon Sahyadri forts, and frozen river gorges with certified trek leaders.", link: '/treks', cta: 'View All Treks' },
              { emoji: '🗺️',  title: 'For Explorers', color: 'blue',    sub: 'Offbeat · Cold Deserts · Living Root Bridges',  desc: "Meghalaya root bridges, Spiti monasteries, Thar night camps — all far off the tourist radar.",           link: '/destinations', cta: 'Explore Offbeat' },
              { emoji: '🏰',  title: 'For Visitors',  color: 'emerald', sub: 'Heritage · Backwaters · Wildlife Safaris',       desc: "Kerala houseboats, Rajasthan forts, Asiatic lion safaris, and curated family vacation packages.",        link: '/packages', cta: 'Browse Packages' },
            ].map(({ emoji, title, color, sub, desc, link, cta }) => (
              <div key={title} className={`glass-card rounded-3xl p-8 border border-${color}-500/20 hover:border-${color}-500/50 transition-all group`}>
                <div className={`w-14 h-14 rounded-2xl bg-${color}-500/10 border border-${color}-500/30 flex items-center justify-center text-2xl mb-5 group-hover:scale-110 transition-transform`}>{emoji}</div>
                <h3 className="brand-font text-xl font-bold text-white mb-1">{title}</h3>
                <p className={`text-[11px] font-bold text-${color}-400 mb-3`}>{sub}</p>
                <p className="text-xs text-slate-300 leading-relaxed mb-5">{desc}</p>
                <Link href={link} className={`text-xs font-extrabold text-${color}-400 hover:text-${color}-300`}>{cta} →</Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════ SAFAR GRID ══════════════ */}
      <section id="featured-destinations" className="py-20 bg-slate-900/40 border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-5">
            <div>
              <span className="text-[11px] font-bold text-orange-400 uppercase tracking-widest">Handpicked Journeys</span>
              <h2 className="heading-font text-3xl sm:text-4xl font-extrabold text-white mt-1">
                {stateFilter ? `Safars in ${stateFilter.name}` : 'Top Bharat Safars & Expeditions'}
              </h2>
            </div>
            {stateFilter ? (
              <button onClick={clearFilter} className="text-xs font-bold px-4 py-2 rounded-xl bg-slate-800 text-slate-300 hover:bg-orange-500 hover:text-slate-950 border border-slate-700 transition-all">
                ✕ Clear Filter — Show All
              </button>
            ) : (
              <div className="flex flex-wrap gap-2 p-1.5 bg-slate-950/80 rounded-2xl border border-slate-800">
                {TABS.map(({ key, label }) => (
                  <button
                    key={key}
                    onClick={() => setTab(key)}
                    className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${tab === key ? 'tab-active' : 'tab-inactive hover:text-white'}`}
                  >
                    {label}
                  </button>
                ))}
              </div>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
            {gridPlaces.map((place, i) => (
              <DestCard key={i} place={place} stateName={place.stateName} />
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════ QUICK SAFAR FINDER ══════════════ */}
      <section className="py-16 border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="glass-card rounded-3xl p-8 border border-orange-500/25 shadow-2xl">
            <div className="text-center max-w-xl mx-auto mb-8">
              <h3 className="brand-font text-2xl font-extrabold text-white">Quick Safar Finder</h3>
              <p className="text-xs text-slate-400 mt-1">Search 200+ curated routes across India in seconds</p>
            </div>
            <form onSubmit={handleSafarSubmit} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {[
                { label: 'Target Region', opts: ['North Himalayas (HP, J&K, UT)', 'Western Ghats (MH, KA, GA)', 'Southern Trails (KL, TN)', 'North East (ML, SK, AR)', 'Desert & Wildlife (RJ, MP, GJ)'] },
                { label: 'Traveler Type', opts: ['High Altitude Trekker', 'Offbeat Explorer', 'Heritage & Nature Visitor', 'Weekend Seeker'] },
                { label: 'Best Month',    opts: ['Oct–Dec (Winter Treks)', 'Jan–Mar (Snow & Desert)', 'Apr–Jun (Summer Valleys)', 'Jul–Sep (Monsoon Safaris)'] },
              ].map(({ label, opts }) => (
                <div key={label}>
                  <label className="block text-[11px] font-bold text-slate-300 mb-1.5 uppercase">{label}</label>
                  <select className="w-full bg-slate-900 border border-slate-700 text-white rounded-xl px-3 py-2.5 text-xs focus:border-orange-500 focus:outline-none">
                    {opts.map(o => <option key={o}>{o}</option>)}
                  </select>
                </div>
              ))}
              <div className="flex items-end">
                <button type="submit" className="w-full bg-gradient-to-r from-orange-500 to-amber-600 hover:from-orange-600 hover:to-amber-700 text-slate-950 font-extrabold text-xs py-3 rounded-xl shadow-lg transition-all">
                  🔍 Find My Safar
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>

      {/* ══════════════ TESTIMONIALS ══════════════ */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <span className="text-[11px] font-bold text-emerald-400 uppercase tracking-widest">Real Stories</span>
            <h2 className="heading-font text-3xl sm:text-4xl font-extrabold text-white mt-2">Voices from the Trails</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { initials: 'AV', name: 'Aarav Verma',  role: 'High Altitude Trekker', color: 'orange',  quote: 'The glowing state hover on the India map is stunning! Just hovering over Uttarakhand instantly showed Kedarkantha conditions and trek difficulty in the side panel.' },
              { initials: 'PS', name: 'Priya Sharma', role: 'Nature Explorer',        color: 'emerald', quote: 'Discovering Meghalaya root bridges was effortless — I hovered the state, saw the places on the right, and planned without ever scrolling away from the map!' },
              { initials: 'RM', name: 'Rohan Mehta',  role: 'Heritage Visitor',       color: 'blue',    quote: 'The side inspector panel is brilliant. Hovering each state gives instant destination previews — no page jumping, everything visible at once.' },
            ].map(({ initials, name, role, color, quote }) => (
              <div key={name} className="glass-card p-6 rounded-2xl border border-slate-800 flex flex-col gap-4">
                <div className="flex gap-0.5 text-amber-400 text-sm">★★★★★</div>
                <p className="text-xs text-slate-300 leading-relaxed italic flex-1">&ldquo;{quote}&rdquo;</p>
                <div className="flex items-center gap-3 pt-3 border-t border-slate-800">
                  <div className={`w-10 h-10 rounded-full bg-${color}-500/20 text-${color}-400 font-bold flex items-center justify-center text-sm border border-${color}-500/30`}>
                    {initials}
                  </div>
                  <div>
                    <h5 className="text-xs font-bold text-white">{name}</h5>
                    <span className="text-[10px] text-slate-400">{role}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════ SAFAR MODAL ══════════════ */}
      {safarModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/85 backdrop-blur-md flex items-center justify-center p-4">
          <div className="glass-card rounded-3xl p-6 sm:p-8 max-w-lg w-full border border-orange-500/40 shadow-2xl relative">
            <button onClick={() => setSafarModal(false)} className="absolute top-4 right-4 text-slate-400 hover:text-white text-xl">✕</button>
            <div className="text-center mb-6">
              <span className="text-[11px] font-bold text-orange-400 uppercase tracking-widest">Custom Expedition Plan</span>
              <h3 className="brand-font text-xl font-extrabold text-white mt-1">Plan My Safar</h3>
            </div>
            <form onSubmit={handleSafarSubmit} className="space-y-4 text-xs">
              <div>
                <label className="block font-bold text-slate-300 mb-1">Full Name</label>
                <input type="text" required placeholder="Your name" className="w-full bg-slate-900 border border-slate-700 text-white rounded-xl px-3 py-2.5 focus:border-orange-500 focus:outline-none" />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-300 mb-1">Email</label>
                  <input type="email" required placeholder="email@example.com" className="w-full bg-slate-900 border border-slate-700 text-white rounded-xl px-3 py-2.5 focus:border-orange-500 focus:outline-none" />
                </div>
                <div>
                  <label className="block font-bold text-slate-300 mb-1">Phone</label>
                  <input type="tel" required placeholder="+91 98765 43210" className="w-full bg-slate-900 border border-slate-700 text-white rounded-xl px-3 py-2.5 focus:border-orange-500 focus:outline-none" />
                </div>
              </div>
              <div>
                <label className="block font-bold text-slate-300 mb-1">Message</label>
                <textarea rows={3} placeholder="Your preferences…" className="w-full bg-slate-900 border border-slate-700 text-white rounded-xl px-3 py-2.5 focus:border-orange-500 focus:outline-none" />
              </div>
              <button type="submit" className="w-full bg-gradient-to-r from-orange-500 to-amber-600 text-slate-950 font-extrabold text-sm py-3 rounded-xl shadow-lg">
                🚀 Request Safar Itinerary
              </button>
            </form>
          </div>
        </div>
      )}

      {/* ══════════════ TOAST ══════════════ */}
      <div className={`fixed bottom-6 right-6 z-50 transition-all duration-300 ${toast ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'}`}>
        <div className="bg-slate-900 border border-emerald-500/50 shadow-2xl rounded-2xl p-4 flex items-center gap-3">
          <span className="w-8 h-8 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold">✓</span>
          <div>
            <h5 className="text-xs font-bold text-white">Request Received!</h5>
            <p className="text-[11px] text-slate-400">Our Safar expert will reach out within 2 hours.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
