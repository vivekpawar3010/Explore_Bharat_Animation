'use client';

import { useState } from 'react';
import Navbar from '@/components/Navbar';
import DestCard from '@/components/DestCard';
import { STATES_DATA } from '@/lib/statesData';

const STATES = [
  { code: 'ALL', label: 'All India' },
  { code: 'IN-JK', label: 'J&K & Ladakh' },
  { code: 'IN-HP', label: 'Himachal Pradesh' },
  { code: 'IN-UT', label: 'Uttarakhand' },
  { code: 'IN-RJ', label: 'Rajasthan' },
  { code: 'IN-MH', label: 'Maharashtra' },
  { code: 'IN-KL', label: 'Kerala' },
  { code: 'IN-SK', label: 'Sikkim' },
  { code: 'IN-ML', label: 'Meghalaya' },
  { code: 'IN-KA', label: 'Karnataka' },
  { code: 'IN-GA', label: 'Goa' },
  { code: 'IN-GJ', label: 'Gujarat' },
  { code: 'IN-MP', label: 'Madhya Pradesh' },
  { code: 'IN-WB', label: 'West Bengal' },
  { code: 'IN-TN', label: 'Tamil Nadu' },
  { code: 'IN-AR', label: 'Arunachal & Assam' },
];

function getPlaces(stateCode) {
  if (stateCode === 'ALL') {
    return Object.entries(STATES_DATA).flatMap(([code, s]) =>
      s.places.map(p => ({ ...p, stateName: s.name }))
    );
  }
  const s = STATES_DATA[stateCode];
  if (!s) return [];
  return s.places.map(p => ({ ...p, stateName: s.name }));
}

export default function DestinationsPage() {
  const [activeState, setActiveState] = useState('ALL');

  const places = getPlaces(activeState);

  return (
    <div className="min-h-screen">
      <Navbar active="/destinations" />

      {/* Hero */}
      <section className="pt-32 pb-14 border-b border-slate-800"
        style={{ background: 'radial-gradient(circle at 50% 30%, rgba(15,118,110,0.15) 0%, rgba(6,11,24,1) 65%)' }}>
        <div className="max-w-7xl mx-auto px-4 text-center">
          <span className="text-[11px] font-bold text-orange-400 uppercase tracking-widest bg-orange-500/10 px-3 py-1 rounded-full border border-orange-500/20">
            All-India Destination Directory
          </span>
          <h1 className="heading-font text-4xl sm:text-5xl font-extrabold text-white mt-3">
            Discover Every Corner of <span className="text-orange-400">Bharat</span>
          </h1>
          <p className="text-slate-300 text-sm max-w-xl mx-auto mt-2">
            From Himalayan cold deserts to tropical backwaters, ancient ruins & coastal rainforests.
          </p>
        </div>
      </section>

      {/* State Filter Tabs */}
      <section className="py-8 border-b border-slate-800 bg-slate-950/80 sticky top-20 z-30">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex gap-2 flex-wrap">
            {STATES.map(s => (
              <button
                key={s.code}
                onClick={() => setActiveState(s.code)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                  activeState === s.code ? 'tab-active' : 'tab-inactive hover:text-white'
                }`}
              >
                {s.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Destinations Grid */}
      <section className="py-14">
        <div className="max-w-7xl mx-auto px-4">
          {places.length === 0 ? (
            <p className="text-center text-slate-400 py-20">No destinations found for this region.</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
              {places.map((place, i) => (
                <DestCard key={i} place={place} stateName={place.stateName} />
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
