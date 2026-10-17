'use client';

import { useState } from 'react';
import { INDIA_OUTLINE, STATES_MAP } from '@/lib/indiaMapData';
import { STATES_DATA } from '@/lib/statesData';

const GLOW_COLORS = [
  { name: 'Saffron Sovereign', stroke: '#f97316', glow: 'rgba(249, 115, 22, 0.85)', dot: 'bg-orange-500' },
  { name: 'Electric Cyan',     stroke: '#06b6d4', glow: 'rgba(6, 182, 212, 0.85)',   dot: 'bg-cyan-500' },
  { name: 'Emerald Aurora',    stroke: '#10b981', glow: 'rgba(16, 185, 129, 0.85)',  dot: 'bg-emerald-500' },
  { name: 'Solar Gold',        stroke: '#eab308', glow: 'rgba(234, 179, 8, 0.85)',   dot: 'bg-yellow-500' },
  { name: 'Royal Magenta',     stroke: '#ec4899', glow: 'rgba(236, 72, 153, 0.85)',  dot: 'bg-pink-500' },
];

export default function MapCopy1Border({ onStateHover, onStateClick }) {
  const [activeColor, setActiveColor] = useState(GLOW_COLORS[0]);
  const [strokeWidth, setStrokeWidth] = useState(3.5);
  const [pulseSpeed, setPulseSpeed] = useState('normal'); // 'slow' | 'normal' | 'fast' | 'off'
  const [tracerActive, setTracerActive] = useState(true);
  const [hoveredState, setHoveredState] = useState(null);

  const speedDuration = {
    slow: '6s',
    normal: '3.5s',
    fast: '1.8s',
    off: '0s'
  }[pulseSpeed];

  const handleStateEnter = (st) => {
    setHoveredState(st);
    const data = STATES_DATA[st.id] || {
      name: st.name,
      tagline: st.safars,
      type: `${st.region} Region`,
      places: []
    };
    if (onStateHover) onStateHover(data);
  };

  const handleStateLeave = () => {
    setHoveredState(null);
    if (onStateHover) onStateHover(null);
  };

  const handleStateClick = (st) => {
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
      {/* ── TOOLBAR / CONTROLS ── */}
      <div className="flex flex-wrap items-center justify-between gap-3 bg-slate-900/80 p-3 rounded-2xl border border-slate-800">
        <div className="flex items-center gap-2">
          <span className="text-xs font-semibold text-slate-300">Glow Aura:</span>
          <div className="flex items-center gap-1.5">
            {GLOW_COLORS.map(c => (
              <button
                key={c.name}
                onClick={() => setActiveColor(c)}
                title={c.name}
                className={`w-6 h-6 rounded-full transition-transform flex items-center justify-center ${c.dot} ${
                  activeColor.name === c.name ? 'ring-2 ring-white scale-110 shadow-lg' : 'opacity-70 hover:opacity-100'
                }`}
              />
            ))}
          </div>
        </div>

        {/* Stroke width */}
        <div className="flex items-center gap-2">
          <span className="text-xs font-semibold text-slate-300">Border Width:</span>
          <input
            type="range"
            min="1.5"
            max="6"
            step="0.5"
            value={strokeWidth}
            onChange={(e) => setStrokeWidth(parseFloat(e.target.value))}
            className="w-24 accent-orange-500 cursor-pointer"
          />
          <span className="text-xs font-mono text-orange-400 w-6">{strokeWidth}px</span>
        </div>

        {/* Pulse & Tracer Toggles */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => setPulseSpeed(p => (p === 'normal' ? 'fast' : p === 'fast' ? 'slow' : p === 'slow' ? 'off' : 'normal'))}
            className="text-xs px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 font-medium transition-colors"
          >
            💫 Pulse: <span className="text-orange-400 font-bold uppercase">{pulseSpeed}</span>
          </button>
          <button
            onClick={() => setTracerActive(t => !t)}
            className={`text-xs px-2.5 py-1 rounded-lg border font-medium transition-colors ${
              tracerActive
                ? 'bg-orange-500/20 text-orange-400 border-orange-500/40'
                : 'bg-slate-800 text-slate-400 border-slate-700'
            }`}
          >
            ⚡ Laser Tracer: {tracerActive ? 'ON' : 'OFF'}
          </button>
        </div>
      </div>

      {/* ── MAP CONTAINER ── */}
      <div className="relative w-full aspect-[600/680] max-h-[640px] bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 rounded-2xl border border-slate-800/80 overflow-hidden flex items-center justify-center shadow-2xl p-2">
        <svg
          viewBox="40 25 530 605"
          className="w-full h-full select-none"
          style={{ filter: 'drop-shadow(0 15px 30px rgba(0,0,0,0.6))' }}
        >
          <defs>
            {/* Luminous Glow Filter for National Border */}
            <filter id="border-glow-heavy" x="-30%" y="-30%" width="160%" height="160%">
              <feGaussianBlur stdDeviation="6" result="blur1" />
              <feGaussianBlur stdDeviation="14" result="blur2" />
              <feMerge>
                <feMergeNode in="blur2" />
                <feMergeNode in="blur1" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>

            {/* Linear gradient for tracer */}
            <linearGradient id="tracer-grad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#ffffff" stopOpacity="0.9" />
              <stop offset="50%" stopColor={activeColor.stroke} stopOpacity="1" />
              <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
            </linearGradient>

            {/* Custom keyframe styles inside SVG */}
            <style>{`
              @keyframes pulseAura {
                0%, 100% { opacity: 0.75; stroke-width: ${strokeWidth}px; }
                50% { opacity: 1; stroke-width: ${strokeWidth * 1.5}px; }
              }
              @keyframes dashTravel {
                from { stroke-dashoffset: 1400; }
                to { stroke-dashoffset: 0; }
              }
              .border-pulse-anim {
                animation: pulseAura ${speedDuration} ease-in-out infinite;
              }
              .border-tracer-anim {
                animation: dashTravel 8s linear infinite;
              }
            `}</style>
          </defs>

          {/* ── Subdued Interior States ── */}
          <g id="interior-states">
            {STATES_MAP.map((st) => {
              const isHovered = hoveredState?.id === st.id;
              return (
                <path
                  key={st.id}
                  d={st.path}
                  fill={isHovered ? 'rgba(249, 115, 22, 0.25)' : '#0f172a'}
                  stroke={isHovered ? activeColor.stroke : '#1e293b'}
                  strokeWidth={isHovered ? 1.5 : 0.6}
                  strokeLinejoin="round"
                  className="transition-all duration-200 cursor-pointer"
                  onMouseEnter={() => handleStateEnter(st)}
                  onMouseLeave={handleStateLeave}
                  onClick={() => handleStateClick(st)}
                >
                  <title>{st.name}</title>
                </path>
              );
            })}
          </g>

          {/* ── Outer India Boundary Glow Layer 1: Ambient Halo ── */}
          <path
            d={INDIA_OUTLINE.path}
            fill="none"
            stroke={activeColor.stroke}
            strokeWidth={strokeWidth * 2.2}
            strokeOpacity="0.35"
            strokeLinecap="round"
            strokeLinejoin="round"
            filter="url(#border-glow-heavy)"
          />

          {/* ── Outer India Boundary Glow Layer 2: Core Glowing Stroke ── */}
          <path
            d={INDIA_OUTLINE.path}
            fill="none"
            stroke={activeColor.stroke}
            strokeWidth={strokeWidth}
            strokeLinecap="round"
            strokeLinejoin="round"
            className={pulseSpeed !== 'off' ? 'border-pulse-anim' : ''}
            style={{
              filter: `drop-shadow(0 0 ${strokeWidth * 3}px ${activeColor.glow})`,
            }}
          />

          {/* ── Layer 3: Travelling Laser Tracer on Frontier ── */}
          {tracerActive && (
            <path
              d={INDIA_OUTLINE.path}
              fill="none"
              stroke="#ffffff"
              strokeWidth={strokeWidth + 1}
              strokeDasharray="90 320"
              strokeLinecap="round"
              className="border-tracer-anim"
              style={{
                filter: 'drop-shadow(0 0 8px #ffffff)',
              }}
            />
          )}

          {/* ── Hovered State Highlight overlay ── */}
          {hoveredState && (
            <g pointerEvents="none">
              <path
                d={hoveredState.path}
                fill="none"
                stroke={activeColor.stroke}
                strokeWidth={2.5}
                style={{ filter: `drop-shadow(0 0 10px ${activeColor.stroke})` }}
              />
              <circle
                cx={hoveredState.centroid[0]}
                cy={hoveredState.centroid[1]}
                r={4}
                fill={activeColor.stroke}
                stroke="#ffffff"
                strokeWidth={1.5}
              />
              <text
                x={hoveredState.centroid[0]}
                y={hoveredState.centroid[1] - 8}
                textAnchor="middle"
                fill="#ffffff"
                fontSize="10"
                fontWeight="bold"
                style={{ textShadow: '0 2px 4px rgba(0,0,0,0.9)' }}
              >
                {hoveredState.name}
              </text>
            </g>
          )}
        </svg>

        {/* ── STATS BADGES OVERLAY ── */}
        <div className="absolute top-4 left-4 bg-slate-900/90 backdrop-blur-md border border-slate-700/60 rounded-xl px-3 py-2 text-[11px] shadow-lg flex flex-col gap-1">
          <div className="flex items-center gap-1.5 text-orange-400 font-bold uppercase tracking-wider">
            <span className="w-2 h-2 rounded-full animate-ping" style={{ backgroundColor: activeColor.stroke }} />
            National Frontier Border
          </div>
          <div className="text-slate-300 font-medium">
            📏 Total Perimeter: <strong className="text-white font-mono">~22,622 km</strong>
          </div>
          <div className="text-slate-400 text-[10px]">
            ⛰️ Land Border: 15,106 km &nbsp;|&nbsp; 🌊 Coastline: 7,516 km
          </div>
        </div>

        {/* Active Hover Badge */}
        {hoveredState && (
          <div className="absolute bottom-4 right-4 bg-slate-900/95 border border-orange-500/60 rounded-xl px-3 py-2 text-xs shadow-xl pointer-events-none animate-fadeIn">
            <p className="text-orange-400 font-bold">📍 {hoveredState.name}</p>
            <p className="text-[10px] text-slate-300">{hoveredState.safars}</p>
          </div>
        )}
      </div>

      <p className="text-center text-xs text-slate-400">
        💡 <strong>Copy 1</strong> highlights the sovereign outer boundary of India with an animated neon aura & laser tracer.
      </p>
    </div>
  );
}
