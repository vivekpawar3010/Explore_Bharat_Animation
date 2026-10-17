'use client';

import Link from 'next/link';

const footerLinks = {
  Navigation: [
    { label: 'Home', href: '/' },
    { label: 'Destinations', href: '/destinations' },
    { label: 'Treks & Trails', href: '/treks' },
    { label: 'Tour Packages', href: '/packages' },
    { label: 'Travel Guides', href: '/guides' },
    { label: 'Contact Us', href: '/contact' },
  ],
  'Top Safars': [
    { label: 'Himachal Pradesh', href: '/destinations' },
    { label: 'Uttarakhand Treks', href: '/treks' },
    { label: 'Ladakh & JK', href: '/destinations' },
    { label: 'Kerala Backwaters', href: '/packages' },
    { label: 'Meghalaya Clouds', href: '/destinations' },
    { label: 'Rajasthan Desert', href: '/packages' },
  ],
};

export default function Footer() {
  return (
    <footer className="bg-[#040810] text-slate-400 pt-16 pb-10 border-t border-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 mb-12">

          {/* Brand col (2) */}
          <div className="lg:col-span-2">
            <Link href="/" className="flex items-center gap-3 mb-5">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-orange-500 to-amber-500 p-0.5">
                <div className="w-full h-full bg-[#040810] rounded-[10px] flex items-center justify-center">
                  <svg className="w-5 h-5 text-orange-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
                  </svg>
                </div>
              </div>
              <span className="brand-font font-extrabold text-xl text-white">Explore Bharat Safar</span>
            </Link>
            <p className="text-xs text-slate-500 leading-relaxed mb-6 max-w-sm">
              Dedicated to connecting explorers, visitors, and trekkers with India's most awe-inspiring landscapes — Himalayan passes, ancient forts, coastal trails, and wildlife sanctuaries.
            </p>
            <div className="flex items-center gap-5 text-sm">
              <a href="#" className="hover:text-orange-400 transition-colors">Instagram</a>
              <a href="#" className="hover:text-orange-400 transition-colors">YouTube</a>
              <a href="#" className="hover:text-orange-400 transition-colors">Twitter</a>
            </div>
          </div>

          {/* Link columns */}
          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-4 pb-2 border-b border-slate-800">
                {title}
              </h4>
              <ul className="space-y-2.5 text-xs">
                {links.map(link => (
                  <li key={link.label}>
                    <Link href={link.href} className="hover:text-orange-400 transition-colors">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* Newsletter */}
          <div>
            <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-4 pb-2 border-b border-slate-800">
              Safar Newsletter
            </h4>
            <p className="text-xs text-slate-500 mb-3">Get seasonal trek alerts & exclusive travel guides.</p>
            <form className="space-y-2" onSubmit={e => e.preventDefault()}>
              <input
                type="email"
                placeholder="your@email.com"
                className="w-full bg-slate-900 border border-slate-800 text-white rounded-xl px-3 py-2 text-xs focus:border-orange-500 focus:outline-none"
              />
              <button
                type="submit"
                className="w-full bg-orange-500 hover:bg-orange-600 text-slate-950 font-bold text-xs py-2 rounded-xl transition-colors"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>

        <div className="pt-8 border-t border-slate-900 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>© {new Date().getFullYear()} Explore Bharat Safar. All rights reserved.</p>
          <p className="flex items-center gap-1">
            Made with <span className="text-red-500 mx-1">❤️</span> for Indian Explorers, Visitors & Trekkers
          </p>
        </div>
      </div>
    </footer>
  );
}
