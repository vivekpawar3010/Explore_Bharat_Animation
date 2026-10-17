'use client';

import { useState } from 'react';
import { STATES_MAP } from '@/lib/indiaMapData';
import { STATES_DATA } from '@/lib/statesData';

export default function MapCopy4ExplodedStates({ onStateHover, onStateClick }) {
  const [isExploded, setIsExploded] = useState(true);
  const [enableDrift, setEnableDrift] = useState(true);
  const [hoveredState, setHoveredState] = useState(null);

  const handleEnter = (st) => {
    setHoveredState(st);
    const data = STATES_DATA[st.id] || {
      name: st.name,
      tagline: st.safars,
      type: `${st.region} Region`,
      places: []
    };
    if (onStateHover) onStateHover(data);
  };

  const handleLeave = () => {
    setHoveredState(null);
    if (onStateHover) onStateHover(null);
  };

  const handleClick = (st) => {
    const data = STATES_DATA[st.id] || {
      name: st.name,
      tagline: st.safars,
      type: `${st.region} Region`,
      places: []
    };
    if (onStateClick) onStateClick(data);
  };

  return (
    <div className="flex flex-col gap-4 w-full">
      {/* ── TOOLBAR ── */}
      <div className="flex flex-wrap items-center justify-between gap-3 bg-slate-900/80 p-3.5 rounded-2xl border border-slate-800">
        <div className="flex items-center gap-3">
          <span className="text-xs font-semibold text-slate-300">Animation Mode:</span>
          <button
            onClick={() => setIsExploded(e => !e)}
            className={`text-xs px-3.5 py-1.5 rounded-xl font-bold transition-all flex items-center gap-2 shadow-md ${
              isExploded
                ? 'bg-gradient-to-r from-orange-500 to-amber-500 text-white shadow-orange-500/25'
                : 'bg-emerald-600 hover:bg-emerald-500 text-white shadow-emerald-600/25'
            }`}
          >
            {isExploded ? '💥 Exploded Floating States (Image 2)' : '🧩 Assembled United Map'}
          </button>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setEnableDrift(d => !d)}
            className={`text-xs px-3 py-1.5 rounded-lg border font-semibold transition-colors ${
              enableDrift
                ? 'bg-cyan-500/20 text-cyan-400 border-cyan-500/40'
                : 'bg-slate-800 text-slate-400 border-slate-700'
            }`}
          >
            🌊 Ocean Floating Drift: {enableDrift ? 'ON' : 'OFF'}
          </button>
        </div>
      </div>

      {/* ── CANVAS: VIBRANT OCEAN BACKDROP (IMAGE 2 RECREATION) ── */}
      <div
        className="relative w-full aspect-[600/680] max-h-[640px] rounded-2xl overflow-hidden flex items-center justify-center shadow-2xl p-2 select-none border border-sky-400/30"
        style={{
          background: 'radial-gradient(ellipse at 50% 45%, #38bdf8 0%, #0284c7 60%, #0369a1 100%)',
        }}
      >
        {/* Subtle Water Texture overlay */}
        <div
          className="absolute inset-0 opacity-20 pointer-events-none"
          style={{
            backgroundImage: 'radial-gradient(#ffffff 1px, transparent 1px)',
            backgroundSize: '28px 28px',
          }}
        />

        <svg
          viewBox="30 20 540 610"
          className="w-full h-full"
        >
          <defs>
            {/* Gentle Floating Drift Keyframe animations */}
            <style>{`
              @keyframes floatA {
                0%, 100% { transform: translateY(0px); }
                50% { transform: translateY(-6px); }
              }
              @keyframes floatB {
                0%, 100% { transform: translateY(0px); }
                50% { transform: translateY(5px); }
              }
              @keyframes floatC {
                0%, 100% { transform: translateY(0px); }
                50% { transform: translateY(-4px); }
              }
              .drift-1 { animation: floatA 4.2s ease-in-out infinite; }
              .drift-2 { animation: floatB 5.1s ease-in-out infinite; }
              .drift-3 { animation: floatC 4.7s ease-in-out infinite; }
            `}</style>
          </defs>

          {/* ── Centerpiece: "The Republic Of India" (Image 2 style) ── */}
          <g
            pointerEvents="none"
            className="transition-all duration-700"
            style={{
              opacity: isExploded ? 1 : 0.25,
              transform: isExploded ? 'scale(1)' : 'scale(0.85)',
              transformOrigin: '280px 330px',
            }}
          >
            <circle
              cx="285"
              cy="330"
              r="75"
              fill="rgba(234, 88, 12, 0.45)"
              stroke="rgba(255, 255, 255, 0.3)"
              strokeWidth="2"
              strokeDasharray="6 6"
            />
            <text
              x="285"
              y="322"
              textAnchor="middle"
              fill="#ffffff"
              fontSize="16"
              fontWeight="900"
              fontFamily="system-ui, -apple-system, sans-serif"
              style={{
                filter: 'drop-shadow(0 2px 6px rgba(0,0,0,0.5))',
                letterSpacing: '0.02em',
              }}
            >
              The Republic
            </text>
            <text
              x="285"
              y="346"
              textAnchor="middle"
              fill="#ffffff"
              fontSize="18"
              fontWeight="900"
              fontFamily="system-ui, -apple-system, sans-serif"
              style={{
                filter: 'drop-shadow(0 2px 6px rgba(0,0,0,0.5))',
                letterSpacing: '0.02em',
              }}
            >
              Of India
            </text>
          </g>

          {/* ── Floating Colorful Separated States (Image 2 Style) ── */}
          <g id="exploded-states">
            {STATES_MAP.map((st, idx) => {
              const isHovered = hoveredState?.id === st.id;
              const [dx, dy] = st.explodedOffset;
              const tx = isExploded ? dx : 0;
              const ty = isExploded ? dy : 0;
              const driftClass = enableDrift && isExploded ? (idx % 3 === 0 ? 'drift-1' : idx % 3 === 1 ? 'drift-2' : 'drift-3') : '';

              return (
                <g
                  key={st.id}
                  className={`cursor-pointer transition-all duration-700 ease-out ${driftClass}`}
                  style={{
                    transform: `translate(${tx}px, ${ty}px) ${isHovered ? 'scale(1.12)' : 'scale(1)'}`,
                    transformOrigin: `${st.centroid[0]}px ${st.centroid[1]}px`,
                    filter: isHovered
                      ? 'drop-shadow(0 20px 25px rgba(0,0,0,0.45)) drop-shadow(0 0 14px rgba(255,255,255,0.6))'
                      : 'drop-shadow(0 10px 14px rgba(0,0,0,0.28))',
                  }}
                  onMouseEnter={() => handleEnter(st)}
                  onMouseLeave={handleLeave}
                  onClick={() => handleClick(st)}
                >
                  {/* Floating State Vector Polygon */}
                  <path
                    d={st.path}
                    fill={st.color}
                    stroke={isHovered ? '#ffffff' : 'rgba(255,255,255,0.4)'}
                    strokeWidth={isHovered ? 2.5 : 1}
                    strokeLinejoin="round"
                    strokeLinecap="round"
                    className="transition-colors duration-200"
                  />

                  {/* Image 2 White Label on the State */}
                  <text
                    x={st.centroid[0]}
                    y={st.centroid[1] + 3}
                    textAnchor="middle"
                    fill="#ffffff"
                    fontSize={['IN-DL', 'IN-GA', 'IN-SK', 'IN-TR'].includes(st.id) ? '8' : '10'}
                    fontWeight="800"
                    fontFamily="system-ui, -apple-system, sans-serif"
                    pointerEvents="none"
                    style={{
                      textShadow: '0 1.5px 3px rgba(0,0,0,0.8), 0 0 5px rgba(0,0,0,0.4)',
                    }}
                  >
                    {st.img2Label}
                  </text>
                </g>
              );
            })}
          </g>
        </svg>

        {/* ── TOP BADGE (PRO / WATERMARK ACCENT LIKE IMAGE 2) ── */}
        <div className="absolute top-3 left-3 bg-gradient-to-r from-pink-500 to-rose-500 text-white text-[10px] font-black uppercase px-3 py-1 rounded-full shadow-lg transform -rotate-12">
          PRO Vector
        </div>

        {/* ── HOVERED DETAILS TOAST ── */}
        {hoveredState && (
          <div className="absolute bottom-4 left-4 bg-slate-950/90 text-white border-2 border-white/40 rounded-2xl p-3 shadow-2xl backdrop-blur-md animate-fadeIn max-w-xs pointer-events-none">
            <div className="flex items-center gap-2 mb-1">
              <span className="w-3 h-3 rounded-full shadow" style={{ backgroundColor: hoveredState.color }} />
              <strong className="text-white text-sm font-extrabold">{hoveredState.name}</strong>
              <span className="text-[10px] bg-white/20 text-white px-2 py-0.5 rounded-full font-bold">
                {hoveredState.region}
              </span>
            </div>
            <p className="text-[11px] text-sky-200 font-medium">{hoveredState.safars}</p>
          </div>
        )}
      </div>

      <p className="text-center text-xs text-slate-400">
        💡 <strong>Copy 4</strong> reproduces <em>Image 2</em> with floating puzzle states, azure sea, and smooth <strong>Assemble / Explode</strong> animation.
      </p>
    </div>
  );
}
