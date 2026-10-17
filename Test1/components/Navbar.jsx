'use client';

import Link from 'next/link';
import { useState } from 'react';

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/destinations', label: 'Destinations' },
  { href: '/treks', label: 'Treks & Trails', badge: 'HOT' },
  { href: '/packages', label: 'Tour Packages' },
  { href: '/guides', label: 'Travel Guides' },
  { href: '/contact', label: 'Contact' },
];

export default function Navbar({ active = '/' }) {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 bg-slate-950/85 backdrop-blur-xl border-b border-white/[0.07]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-20">

          {/* Brand */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-11 h-11 rounded-xl bg-gradient-to-tr from-orange-500 via-amber-500 to-emerald-500 p-0.5 shadow-lg shadow-orange-500/20 group-hover:scale-105 transition-transform">
              <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center">
                <svg className="w-5 h-5 text-orange-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
                </svg>
              </div>
            </div>
            <div>
              <span className="brand-font font-extrabold text-xl text-transparent bg-clip-text bg-gradient-to-r from-white via-orange-200 to-orange-400 tracking-wide">
                Explore Bharat Safar
              </span>
              <span className="block text-[10px] text-emerald-400 font-semibold tracking-widest uppercase -mt-0.5">
                Explorers • Visitors • Trekkers
              </span>
            </div>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-7 text-sm font-semibold">
            {navLinks.map(link => (
              <Link
                key={link.href}
                href={link.href}
                className={`flex items-center gap-1.5 transition-colors ${
                  active === link.href
                    ? 'text-orange-400 border-b-2 border-orange-400 pb-0.5'
                    : 'text-slate-300 hover:text-orange-400'
                }`}
              >
                {link.label}
                {link.badge && (
                  <span className="text-[10px] font-extrabold bg-red-500/20 text-red-400 border border-red-500/30 px-1.5 py-0.5 rounded">
                    {link.badge}
                  </span>
                )}
              </Link>
            ))}
          </nav>

          {/* CTA */}
          <Link
            href="/contact"
            className="hidden sm:flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-orange-500 to-amber-600 hover:from-orange-600 hover:to-amber-700 text-slate-950 font-extrabold text-xs rounded-xl shadow-lg hover:shadow-orange-500/30 transition-all"
          >
            ⚡ Plan My Safar
          </Link>

          {/* Mobile hamburger */}
          <button
            onClick={() => setMenuOpen(true)}
            className="md:hidden p-2 text-slate-300 hover:text-orange-400"
            aria-label="Open menu"
          >
            <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </header>

      {/* Mobile drawer */}
      {menuOpen && (
        <div className="fixed inset-0 z-[60] bg-slate-950/96 backdrop-blur-xl flex flex-col p-6">
          <div className="flex items-center justify-between mb-10">
            <span className="brand-font font-extrabold text-xl text-orange-400">Explore Bharat Safar</span>
            <button onClick={() => setMenuOpen(false)} className="p-2 text-slate-400 hover:text-white">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          <nav className="flex flex-col gap-7 text-xl font-bold">
            {navLinks.map(link => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className={active === link.href ? 'text-orange-400' : 'text-slate-200 hover:text-orange-400'}
              >
                {link.label}
              </Link>
            ))}
          </nav>
          <div className="mt-auto pt-6 border-t border-slate-800">
            <Link href="/contact" className="block w-full text-center py-4 bg-gradient-to-r from-orange-500 to-amber-600 text-slate-950 font-extrabold rounded-2xl shadow-lg">
              Plan My Safar Now
            </Link>
          </div>
        </div>
      )}
    </>
  );
}
