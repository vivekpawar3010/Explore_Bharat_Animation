'use client';

import Navbar from '@/components/Navbar';
import Link from 'next/link';

const PACKAGES = [
  { title: "God's Own Country Safari", region: 'Kerala', days: '5 Days / 4 Nights', price: '₹18,500', per: 'per person', img: 'https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?w=800&q=80', color: 'emerald', tag: 'Visitor', includes: ['Alleppey Houseboat', 'Munnar Tea Gardens', 'Kovalam Beach', 'Wayanad Forest', 'Kathakali Show'], bestFor: 'Families & Couples' },
  { title: 'Royal Desert & Fort Safari', region: 'Rajasthan', days: '7 Days / 6 Nights', price: '₹24,900', per: 'per person', img: 'https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?w=800&q=80', color: 'amber', tag: 'Visitor', includes: ['Jaipur Amber Fort', 'Udaipur Lake Palace', 'Jaisalmer Dunes Camp', 'Camel Safari', 'Folk Dance Evening'], bestFor: 'Heritage & Culture Lovers' },
  { title: 'Wild Bengal Tiger Safari', region: 'Madhya Pradesh', days: '4 Days / 3 Nights', price: '₹16,000', per: 'per person', img: 'https://images.unsplash.com/photo-1534177616072-ef7dc120449d?w=800&q=80', color: 'orange', tag: 'Explorers', includes: ['Kanha Jeep Safari', 'Bandhavgarh Zone', 'Canopy Jungle Lodge', 'Naturalist Guide', 'Night Birding'], bestFor: 'Wildlife Enthusiasts' },
  { title: 'Spiti Cold Desert Expedition', region: 'Himachal Pradesh', days: '8 Days / 7 Nights', price: '₹32,500', per: 'per person', img: 'https://images.unsplash.com/photo-1568849676085-51415703900f?w=800&q=80', color: 'blue', tag: 'Explorers', includes: ['Chandratal Lake Camp', 'Key Monastery Visit', 'Chandrakhani Pass', '4WD Jeep Transfer', 'Stargazing Session'], bestFor: 'Offbeat Adventurers' },
  { title: 'Rann of Kutch White Desert', region: 'Gujarat', days: '3 Days / 2 Nights', price: '₹12,000', per: 'per person', img: 'https://images.unsplash.com/photo-1589308078059-be1415eab4c3?w=800&q=80', color: 'yellow', tag: 'Visitor', includes: ['Full Moon Night Walk', 'Flamingo Bird Safari', 'Mandvi Beach Visit', 'Kutchi Craft Village', 'Folk Music Evening'], bestFor: 'Winter Travelers' },
  { title: 'Meghalaya Root Bridge Trek', region: 'Meghalaya', days: '5 Days / 4 Nights', price: '₹21,500', per: 'per person', img: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=800&q=80', color: 'green', tag: 'Trekkers', includes: ['Double Decker Root Bridge', 'Dawki Crystal River', 'Mawsmai Cave', 'Shillong City Tour', 'Bamboo Bridge Trek'], bestFor: 'Nature & Trek Lovers' },
];

export default function PackagesPage() {
  return (
    <div className="min-h-screen">
      <Navbar active="/packages" />

      {/* Hero */}
      <section className="pt-32 pb-16 border-b border-slate-800"
        style={{ background: 'radial-gradient(circle at 50% 30%, rgba(16,185,129,0.12) 0%, rgba(6,11,24,1) 65%)' }}>
        <div className="max-w-7xl mx-auto px-4 text-center">
          <span className="text-[11px] font-bold text-emerald-400 uppercase tracking-widest bg-emerald-500/10 px-3 py-1 rounded-full border border-emerald-500/30">
            🏰 Curated Tour Packages & Wildlife Safaris
          </span>
          <h1 className="heading-font text-4xl sm:text-6xl font-extrabold text-white mt-4 leading-tight">
            Unforgettable <span className="text-emerald-400">Safar Experiences</span>
          </h1>
          <p className="text-slate-300 text-base max-w-2xl mx-auto mt-3">
            Tailored luxury and heritage circuits across Kerala backwaters, Thar sand dunes, tiger reserves & cold deserts.
          </p>
        </div>
      </section>

      {/* Packages Grid */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {PACKAGES.map((pkg, i) => (
              <div key={i} className="dest-card glass-card rounded-2xl overflow-hidden border border-slate-800 group flex flex-col">
                <div className="relative h-52 overflow-hidden">
                  <img
                    src={pkg.img}
                    alt={pkg.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    onError={e => { e.target.src = 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=600&q=80'; }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent" />
                  <span className={`absolute top-3 left-3 text-[10px] font-bold px-2.5 py-1 rounded-full border bg-${pkg.color}-500/20 text-${pkg.color}-400 border-${pkg.color}-500/40`}>
                    {pkg.tag}
                  </span>
                  <div className="absolute bottom-3 left-3">
                    <span className="text-[11px] font-bold text-orange-400">{pkg.region} • {pkg.days}</span>
                  </div>
                </div>
                <div className="p-5 flex-1 flex flex-col">
                  <h3 className="brand-font text-base font-bold text-white group-hover:text-orange-400 transition-colors mb-1">{pkg.title}</h3>
                  <p className="text-[11px] text-slate-400 mb-3">👥 Best for: <span className="text-slate-200 font-semibold">{pkg.bestFor}</span></p>
                  <div className="mb-4 flex-1">
                    <h4 className="text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-2">Package Includes</h4>
                    <ul className="space-y-1">
                      {pkg.includes.slice(0, 4).map((inc, j) => (
                        <li key={j} className="flex items-center gap-2 text-[11px] text-slate-300">
                          <span className="text-emerald-400">✓</span> {inc}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="pt-4 border-t border-slate-800 flex items-center justify-between">
                    <div>
                      <span className="text-xl font-extrabold text-orange-400">{pkg.price}</span>
                      <span className="text-[10px] text-slate-400 ml-1">{pkg.per}</span>
                    </div>
                    <Link href="/contact" className="text-[11px] font-bold text-slate-950 bg-emerald-500 hover:bg-emerald-600 px-3 py-1.5 rounded-lg transition-colors">
                      Book Package →
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
