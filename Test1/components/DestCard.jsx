'use client';

import Link from 'next/link';
import { CATEGORY_COLORS } from '@/lib/statesData';

export default function DestCard({ place, stateName }) {
  const colors = CATEGORY_COLORS[place.category] || CATEGORY_COLORS['Visitor'];

  return (
    <div className="dest-card glass-card rounded-2xl overflow-hidden flex flex-col border border-slate-800/80 group">
      {/* Image */}
      <div className="relative h-52 overflow-hidden">
        <img
          src={place.img}
          alt={place.name}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
          onError={e => { e.target.src = 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=600&q=80'; }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent opacity-80" />
        <span className={`absolute top-3 left-3 text-[11px] font-bold px-2.5 py-1 rounded-full ${colors.bg} ${colors.text} ${colors.border}`}>
          {place.category}
        </span>
        {stateName && (
          <span className="absolute bottom-3 right-3 bg-slate-900/80 backdrop-blur-sm text-orange-400 text-[10px] px-2 py-1 rounded-lg border border-orange-500/30 font-semibold">
            📍 {stateName}
          </span>
        )}
      </div>

      {/* Content */}
      <div className="p-5 flex-1 flex flex-col justify-between">
        <div>
          <div className="flex items-center justify-between text-[11px] text-slate-400 mb-2">
            <span className="text-emerald-400 font-semibold">🗓️ {place.season}</span>
            <span className="text-slate-300 font-medium">⚡ {place.difficulty}</span>
          </div>
          <h3 className="brand-font text-base font-bold text-white group-hover:text-orange-400 transition-colors mb-2">
            {place.name}
          </h3>
          <p className="text-xs text-slate-300 line-clamp-2 leading-relaxed">{place.desc}</p>
        </div>
        <div className="mt-4 pt-4 border-t border-slate-800 flex items-center justify-between">
          <span className="text-[11px] font-semibold text-orange-400/90">{place.tag}</span>
          <Link
            href="/contact"
            className="text-[11px] font-bold text-white bg-gradient-to-r from-orange-500 to-amber-600 hover:from-orange-600 hover:to-amber-700 px-3 py-1.5 rounded-lg shadow transition-all"
          >
            Plan Safar →
          </Link>
        </div>
      </div>
    </div>
  );
}
