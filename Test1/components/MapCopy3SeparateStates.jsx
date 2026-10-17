'use client';

import { useState, useMemo } from 'react';
import { STATES_MAP } from '@/lib/indiaMapData';
import { STATES_DATA } from '@/lib/statesData';

const REGIONS = ['ALL', 'North', 'South', 'West', 'East', 'Central', 'North-East', 'Islands'];

export default function MapCopy3SeparateStates({ onStateHover, onStateClick }) {
  const [selectedStateId, setSelectedStateId] = useState('IN-HP'); // Default Himachal Pradesh
  const [regionFilter, setRegionFilter] = useState('ALL');
  const [searchQuery, setSearchQuery] = useState('');
  const [viewMode, setViewMode] = useState('spotlight'); // 'spotlight' | 'shelf'
  const [tilt, setTilt] = useState({ x: 0, y: 0 });

  // Currently focused state
  const currentState = useMemo(() => {
    return STATES_MAP.find(s => s.id === selectedStateId) || STATES_MAP[0];
  }, [selectedStateId]);

  const currentData = useMemo(() => {
    return STATES_DATA[currentState?.id] || {
      name: currentState?.name,
      tagline: currentState?.safars,
      type: `${currentState?.region} Territory`,
      places: []
    };
  }, [currentState]);

  // Filtered states for the responsive shelf
  const filteredStates = useMemo(() => {
    return STATES_MAP.filter(s => {
      const matchesRegion = regionFilter === 'ALL' || s.region === regionFilter;
      const matchesSearch = s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                            s.capital.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesRegion && matchesSearch;
    });
  }, [regionFilter, searchQuery]);

  const selectState = (st) => {
    setSelectedStateId(st.id);
    const data = STATES_DATA[st.id] || {
      name: st.name,
      tagline: st.safars,
      type: `${st.region} Region`,
      places: []
    };
    if (onStateHover) onStateHover(data);
    if (onStateClick) onStateClick(data);
  };

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 16;
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * -16;
    setTilt({ x, y });
  };

  const handleMouseLeave = () => {
    setTilt({ x: 0, y: 0 });
  };

  // Safe padding for standalone SVG viewBox
  const [bx, by, bw, bh] = currentState.bbox;
  const pad = Math.max(bw, bh) * 0.18;
  const vbX = bx - pad;
  const vbY = by - pad;
  const vbW = bw + pad * 2;
  const vbH = bh + pad * 2;

  return (
    <div className="flex flex-col gap-4 w-full">
      {/* ── CONTROLS & SEARCH BAR ── */}
      <div className="flex flex-wrap items-center justify-between gap-3 bg-slate-900/80 p-3.5 rounded-2xl border border-slate-800">
        {/* View Mode Toggle */}
        <div className="flex items-center gap-2">
          <div className="inline-flex rounded-lg bg-slate-800 p-1 border border-slate-700">
            <button
              onClick={() => setViewMode('spotlight')}
              className={`text-xs px-3 py-1 rounded-md font-semibold transition-all ${
                viewMode === 'spotlight' ? 'bg-orange-500 text-white shadow' : 'text-slate-400 hover:text-white'
              }`}
            >
              🔍 Spotlight Single State
            </button>
            <button
              onClick={() => setViewMode('shelf')}
              className={`text-xs px-3 py-1 rounded-md font-semibold transition-all ${
                viewMode === 'shelf' ? 'bg-orange-500 text-white shadow' : 'text-slate-400 hover:text-white'
              }`}
            >
              📚 Responsive States Shelf ({STATES_MAP.length})
            </button>
          </div>
        </div>

        {/* Region Pills */}
        <div className="flex items-center gap-1 overflow-x-auto py-0.5 custom-scrollbar">
          {REGIONS.map(reg => (
            <button
              key={reg}
              onClick={() => setRegionFilter(reg)}
              className={`text-[11px] px-2.5 py-1 rounded-full font-medium transition-colors ${
                regionFilter === reg
                  ? 'bg-orange-500/20 text-orange-400 border border-orange-500/50'
                  : 'bg-slate-800/80 text-slate-400 hover:text-slate-200 border border-transparent'
              }`}
            >
              {reg}
            </button>
          ))}
        </div>

        {/* Search input */}
        <div className="relative w-44">
          <input
            type="text"
            placeholder="Search state..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full text-xs bg-slate-950 border border-slate-700 rounded-lg px-2.5 py-1 text-slate-200 placeholder-slate-500 focus:outline-none focus:border-orange-500"
          />
        </div>
      </div>

      {/* ── MODE 1: SPOTLIGHT ISOLATED STATE VIEW ── */}
      {viewMode === 'spotlight' && (
        <div className="grid grid-cols-1 md:grid-cols-12 gap-5 items-stretch bg-slate-950 rounded-2xl border border-slate-800 p-4 sm:p-6 shadow-2xl">
          {/* Isolated SVG Map Viewer (7 cols) */}
          <div
            className="md:col-span-7 relative bg-gradient-to-b from-slate-900 to-slate-950 rounded-xl border border-slate-800/80 overflow-hidden flex flex-col items-center justify-center p-6 min-h-[360px]"
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            style={{
              perspective: '800px',
            }}
          >
            {/* Background Grid Accent */}
            <div
              className="absolute inset-0 opacity-15 pointer-events-none"
              style={{
                backgroundImage: 'radial-gradient(circle, #f97316 1px, transparent 1px)',
                backgroundSize: '24px 24px',
              }}
            />

            {/* Standalone SVG scaled to this state's bounding box */}
            <div
              className="w-full max-w-[340px] aspect-square flex items-center justify-center transition-transform duration-200 ease-out"
              style={{
                transform: `rotateX(${tilt.y}deg) rotateY(${tilt.x}deg) scale(1.02)`,
              }}
            >
              <svg
                viewBox={`${vbX} ${vbY} ${vbW} ${vbH}`}
                className="w-full h-full drop-shadow-[0_20px_35px_rgba(249,115,22,0.35)]"
              >
                <defs>
                  <linearGradient id="state-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#f97316" />
                    <stop offset="100%" stopColor="#ea580c" />
                  </linearGradient>
                </defs>

                {/* State Silhouette */}
                <path
                  d={currentState.path}
                  fill="url(#state-gradient)"
                  stroke="#fdba74"
                  strokeWidth={Math.max(1.2, Math.max(bw, bh) * 0.012)}
                  strokeLinejoin="round"
                  strokeLinecap="round"
                  className="animate-pulse"
                  style={{ animationDuration: '4s' }}
                />

                {/* Capital City Pin Marker */}
                <circle
                  cx={currentState.centroid[0]}
                  cy={currentState.centroid[1]}
                  r={Math.max(3, Math.max(bw, bh) * 0.03)}
                  fill="#ffffff"
                  stroke="#0f172a"
                  strokeWidth={Math.max(1, Math.max(bw, bh) * 0.01)}
                />
              </svg>
            </div>

            {/* Floating state badge */}
            <div className="absolute bottom-3 left-3 bg-slate-900/90 border border-slate-700/60 rounded-xl px-3 py-1.5 backdrop-blur-md">
              <span className="text-[10px] text-slate-400 font-semibold block uppercase">Capital</span>
              <span className="text-xs text-orange-400 font-extrabold">🏛️ {currentState.capital}</span>
            </div>

            <div className="absolute top-3 right-3 bg-orange-500/15 border border-orange-500/30 rounded-lg px-2.5 py-1 text-[11px] font-bold text-orange-400">
              {currentState.region} Zone
            </div>
          </div>

          {/* State Dossier & Safars Panel (5 cols) */}
          <div className="md:col-span-5 flex flex-col justify-between gap-4">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-[10px] font-extrabold uppercase tracking-wider text-emerald-400 bg-emerald-500/15 px-2 py-0.5 rounded-full border border-emerald-500/30">
                  Individual State Profile
                </span>
                <span className="text-xs text-slate-400 font-mono">Code: {currentState.id}</span>
              </div>

              <h3 className="heading-font text-2xl sm:text-3xl font-extrabold text-white mb-1">
                {currentState.name}
              </h3>
              <p className="text-xs text-orange-400 font-semibold mb-3">
                {currentData.tagline}
              </p>

              {/* State Highlights */}
              <div className="bg-slate-900/80 rounded-xl p-3 border border-slate-800 text-xs space-y-2 mb-3">
                <div className="flex justify-between border-b border-slate-800/80 pb-1.5">
                  <span className="text-slate-400">Terrain / Focus:</span>
                  <strong className="text-slate-200">{currentData.type}</strong>
                </div>
                <div className="flex justify-between border-b border-slate-800/80 pb-1.5">
                  <span className="text-slate-400">Safars &amp; Treks:</span>
                  <strong className="text-orange-400 text-right max-w-[180px] truncate">{currentState.safars}</strong>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Regional Identity:</span>
                  <strong className="text-slate-200">{currentState.region} India</strong>
                </div>
              </div>

              {/* Top Safar Cards for this State */}
              <div className="space-y-2 max-h-[160px] overflow-y-auto custom-scrollbar pr-1">
                {(currentData.places || []).slice(0, 2).map((place, idx) => (
                  <div key={idx} className="flex gap-2.5 p-2 rounded-lg bg-slate-900 border border-slate-800 hover:border-orange-500/40 transition-colors">
                    <img
                      src={place.img}
                      alt={place.name}
                      className="w-12 h-12 rounded object-cover flex-shrink-0"
                      onError={e => { e.target.src = 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=400&q=60'; }}
                    />
                    <div className="overflow-hidden flex-1 min-w-0">
                      <h5 className="text-[11px] font-bold text-white truncate">{place.name}</h5>
                      <span className="text-[9px] text-orange-400 font-semibold">{place.category} • {place.difficulty}</span>
                      <p className="text-[10px] text-slate-400 truncate mt-0.5">{place.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick State Switcher Slider */}
            <div>
              <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1">
                Select Any State to Isolate:
              </label>
              <select
                value={selectedStateId}
                onChange={(e) => {
                  const st = STATES_MAP.find(s => s.id === e.target.value);
                  if (st) selectState(st);
                }}
                className="w-full text-xs bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-white font-medium focus:outline-none focus:border-orange-500"
              >
                {STATES_MAP.map(s => (
                  <option key={s.id} value={s.id}>
                    {s.name} ({s.capital})
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
      )}

      {/* ── MODE 2: RESPONSIVE SHELF (ALL 31 STATES INDIVIDUALLY) ── */}
      {viewMode === 'shelf' && (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 max-h-[580px] overflow-y-auto p-2 custom-scrollbar">
          {filteredStates.map((st) => {
            const isSelected = st.id === selectedStateId;
            const [x, y, w, h] = st.bbox;
            const p = Math.max(w, h) * 0.2;
            const miniVb = `${x - p} ${y - p} ${w + p * 2} ${h + p * 2}`;

            return (
              <div
                key={st.id}
                onClick={() => selectState(st)}
                className={`group cursor-pointer rounded-xl p-3 border transition-all duration-200 flex flex-col items-center justify-between gap-2 ${
                  isSelected
                    ? 'bg-orange-500/15 border-orange-500 shadow-lg shadow-orange-500/20 scale-[1.02]'
                    : 'bg-slate-900/80 border-slate-800 hover:border-slate-700 hover:bg-slate-850'
                }`}
              >
                {/* Standalone State Miniature Map */}
                <div className="w-full aspect-[4/3] flex items-center justify-center overflow-hidden">
                  <svg
                    viewBox={miniVb}
                    className="w-full h-full max-h-24 transition-transform duration-300 group-hover:scale-115"
                  >
                    <path
                      d={st.path}
                      fill={isSelected ? '#f97316' : '#334155'}
                      stroke={isSelected ? '#fdba74' : '#64748b'}
                      strokeWidth={Math.max(1, Math.max(w, h) * 0.02)}
                      strokeLinejoin="round"
                      className="group-hover:fill-orange-500 group-hover:stroke-orange-300 transition-colors"
                    />
                    <circle
                      cx={st.centroid[0]}
                      cy={st.centroid[1]}
                      r={Math.max(2.5, Math.max(w, h) * 0.04)}
                      fill="#ffffff"
                    />
                  </svg>
                </div>

                {/* State Card Info */}
                <div className="w-full text-center">
                  <h4 className="text-xs font-bold text-slate-100 group-hover:text-orange-400 truncate">
                    {st.name}
                  </h4>
                  <p className="text-[10px] text-slate-400 truncate">🏛️ {st.capital}</p>
                </div>
              </div>
            );
          })}
        </div>
      )}

      <p className="text-center text-xs text-slate-400">
        💡 <strong>Copy 3</strong> isolates each state into its own standalone responsive vector with dynamic bounding box framing & 3D tilt.
      </p>
    </div>
  );
}
