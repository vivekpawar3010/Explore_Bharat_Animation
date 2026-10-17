'use client';

import { useState } from 'react';
import { STATES_MAP } from '@/lib/indiaMapData';
import { STATES_DATA } from '@/lib/statesData';

// Image 1 exact typographic placements & leader arrows
const ARROW_ANNOTATIONS = [
  { id: 'IN-HP', label: 'Himachal Pradesh', textPos: [290, 142], arrowStart: [290, 140], arrowEnd: [235, 145] },
  { id: 'IN-UT', label: 'Uttarakhand',      textPos: [295, 182], arrowStart: [290, 180], arrowEnd: [255, 180] },
  { id: 'IN-DL', label: 'Delhi',            textPos: [230, 212], arrowStart: [228, 212], arrowEnd: [212, 212] },
  { id: 'IN-GA', label: 'Goa',              textPos: [100, 462], arrowStart: [115, 462], arrowEnd: [148, 462] },
  { id: 'IN-KL', label: 'Kerala',           textPos: [135, 555], arrowStart: [150, 555], arrowEnd: [180, 552] },
  { id: 'IN-SK', label: 'Sikkim',           textPos: [404, 202], arrowStart: [404, 206], arrowEnd: [404, 222] },
  { id: 'IN-ML', label: 'Meghalaya',        textPos: [435, 305], arrowStart: [445, 300], arrowEnd: [450, 280] },
  { id: 'IN-NL', label: 'Nagaland',         textPos: [560, 262], arrowStart: [555, 262], arrowEnd: [520, 262] },
  { id: 'IN-MN', label: 'Manipur',          textPos: [555, 292], arrowStart: [550, 290], arrowEnd: [512, 290] },
];

export default function MapCopy2StateBorders({ onStateHover, onStateClick }) {
  const [theme, setTheme] = useState('paper'); // 'paper' (exact Image 1) | 'blueprint' | 'dark'
  const [showArrows, setShowArrows] = useState(true);
  const [showLabels, setShowLabels] = useState(true);
  const [hoveredState, setHoveredState] = useState(null);

  const themeConfig = {
    paper: {
      bg: 'bg-white',
      border: 'border-slate-300',
      stateFill: '#ffffff',
      stateStroke: '#000000',
      strokeWidth: 1.2,
      hoverFill: '#f1f5f9',
      hoverStroke: '#ea580c',
      textColor: '#000000',
      subTextColor: '#475569',
      arrowColor: '#000000',
    },
    blueprint: {
      bg: 'bg-[#0f2444]',
      border: 'border-blue-800',
      stateFill: '#0e1f38',
      stateStroke: '#60a5fa',
      strokeWidth: 1.2,
      hoverFill: '#1e3a6a',
      hoverStroke: '#38bdf8',
      textColor: '#e0f2fe',
      subTextColor: '#93c5fd',
      arrowColor: '#60a5fa',
    },
    dark: {
      bg: 'bg-slate-950',
      border: 'border-slate-800',
      stateFill: '#090d16',
      stateStroke: '#94a3b8',
      strokeWidth: 1.2,
      hoverFill: '#1e293b',
      hoverStroke: '#f97316',
      textColor: '#f8fafc',
      subTextColor: '#94a3b8',
      arrowColor: '#cbd5e1',
    }
  }[theme];

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
      <div className="flex flex-wrap items-center justify-between gap-3 bg-slate-900/80 p-3 rounded-2xl border border-slate-800">
        {/* Style Preset Selector */}
        <div className="flex items-center gap-2">
          <span className="text-xs font-semibold text-slate-300">Style:</span>
          <div className="inline-flex rounded-lg bg-slate-800 p-1 border border-slate-700">
            <button
              onClick={() => setTheme('paper')}
              className={`text-xs px-2.5 py-1 rounded-md font-semibold transition-all ${
                theme === 'paper' ? 'bg-white text-slate-950 shadow' : 'text-slate-400 hover:text-white'
              }`}
            >
              📄 Image 1 Black &amp; White
            </button>
            <button
              onClick={() => setTheme('blueprint')}
              className={`text-xs px-2.5 py-1 rounded-md font-semibold transition-all ${
                theme === 'blueprint' ? 'bg-blue-600 text-white shadow' : 'text-slate-400 hover:text-white'
              }`}
            >
              📐 Blueprint Navy
            </button>
            <button
              onClick={() => setTheme('dark')}
              className={`text-xs px-2.5 py-1 rounded-md font-semibold transition-all ${
                theme === 'dark' ? 'bg-slate-700 text-white shadow' : 'text-slate-400 hover:text-white'
              }`}
            >
              🌑 Obsidian Night
            </button>
          </div>
        </div>

        {/* Visibility Toggles */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => setShowLabels(v => !v)}
            className={`text-xs px-2.5 py-1 rounded-lg border font-medium transition-colors ${
              showLabels
                ? 'bg-orange-500/20 text-orange-400 border-orange-500/40'
                : 'bg-slate-800 text-slate-400 border-slate-700'
            }`}
          >
            🏷️ Labels: {showLabels ? 'Visible' : 'Hidden'}
          </button>
          <button
            onClick={() => setShowArrows(v => !v)}
            className={`text-xs px-2.5 py-1 rounded-lg border font-medium transition-colors ${
              showArrows
                ? 'bg-orange-500/20 text-orange-400 border-orange-500/40'
                : 'bg-slate-800 text-slate-400 border-slate-700'
            }`}
          >
            ↗️ Leader Arrows: {showArrows ? 'ON' : 'OFF'}
          </button>
        </div>
      </div>

      {/* ── MAP CANVAS (IMAGE 1 RECREATION) ── */}
      <div className={`relative w-full aspect-[600/680] max-h-[640px] ${themeConfig.bg} rounded-2xl border ${themeConfig.border} overflow-hidden flex items-center justify-center shadow-2xl p-2 transition-colors duration-300`}>
        <svg
          viewBox="40 25 530 605"
          className="w-full h-full select-none"
        >
          <defs>
            {/* Arrow marker for leader lines */}
            <marker
              id="arrow-marker"
              viewBox="0 0 10 10"
              refX="6"
              refY="5"
              markerWidth="5"
              markerHeight="5"
              orient="auto-start-reverse"
            >
              <path d="M 0 1 L 8 5 L 0 9 z" fill={themeConfig.arrowColor} />
            </marker>
          </defs>

          {/* ── State Polygons & Boundaries ── */}
          <g id="state-polygons">
            {STATES_MAP.map((st) => {
              const isHovered = hoveredState?.id === st.id;
              return (
                <path
                  key={st.id}
                  d={st.path}
                  fill={isHovered ? themeConfig.hoverFill : themeConfig.stateFill}
                  stroke={isHovered ? themeConfig.hoverStroke : themeConfig.stateStroke}
                  strokeWidth={isHovered ? 2.4 : themeConfig.strokeWidth}
                  strokeLinejoin="round"
                  strokeLinecap="round"
                  className="transition-all duration-150 cursor-pointer"
                  onMouseEnter={() => handleEnter(st)}
                  onMouseLeave={handleLeave}
                  onClick={() => handleClick(st)}
                />
              );
            })}
          </g>

          {/* ── Text Labels for States (matching Image 1 placements) ── */}
          {showLabels && (
            <g id="state-labels" pointerEvents="none">
              {STATES_MAP.map((st) => {
                // Don't render interior label if it has an arrow annotation
                const hasArrow = ARROW_ANNOTATIONS.find(a => a.id === st.id);
                if (hasArrow && showArrows) return null;

                const [cx, cy] = st.centroid;
                const isHovered = hoveredState?.id === st.id;

                // Adjust font size based on state size
                const isSmall = ['IN-DL', 'IN-GA', 'IN-SK', 'IN-TR', 'IN-ML', 'IN-NL', 'IN-MN', 'IN-MZ'].includes(st.id);
                const fontSize = isSmall ? 8.5 : 10.5;

                return (
                  <text
                    key={st.id}
                    x={cx}
                    y={cy + 3}
                    textAnchor="middle"
                    fill={isHovered ? themeConfig.hoverStroke : themeConfig.textColor}
                    fontSize={fontSize}
                    fontWeight={isHovered ? '800' : '600'}
                    fontFamily="system-ui, -apple-system, sans-serif"
                    className="transition-all duration-150"
                  >
                    {st.img1Label}
                  </text>
                );
              })}

              {/* Andaman and Nicobar Island & Lakshadweep Island Labels (Image 1 style) */}
              <text
                x="470"
                y="585"
                textAnchor="middle"
                fill={themeConfig.textColor}
                fontSize="11"
                fontWeight="700"
                fontFamily="system-ui, -apple-system, sans-serif"
              >
                Andaman and Nicobar Island
              </text>
              <text
                x="115"
                y="595"
                textAnchor="middle"
                fill={themeConfig.textColor}
                fontSize="11"
                fontWeight="700"
                fontFamily="system-ui, -apple-system, sans-serif"
              >
                Lakshadweep
              </text>
            </g>
          )}

          {/* ── Leader Arrows (matching Image 1 leader lines) ── */}
          {showArrows && showLabels && (
            <g id="leader-arrows" pointerEvents="none">
              {ARROW_ANNOTATIONS.map((ann) => {
                const isHovered = hoveredState?.id === ann.id;
                const strokeCol = isHovered ? themeConfig.hoverStroke : themeConfig.arrowColor;
                const textCol = isHovered ? themeConfig.hoverStroke : themeConfig.textColor;

                return (
                  <g key={ann.id}>
                    {/* Leader Line with Arrowhead */}
                    <line
                      x1={ann.arrowStart[0]}
                      y1={ann.arrowStart[1]}
                      x2={ann.arrowEnd[0]}
                      y2={ann.arrowEnd[1]}
                      stroke={strokeCol}
                      strokeWidth="1.2"
                      markerEnd="url(#arrow-marker)"
                    />
                    {/* Text Label at arrow origin */}
                    <text
                      x={ann.textPos[0]}
                      y={ann.textPos[1] + 3}
                      textAnchor={ann.textPos[0] > ann.arrowEnd[0] ? 'start' : 'end'}
                      fill={textCol}
                      fontSize="9.5"
                      fontWeight={isHovered ? '800' : '600'}
                      fontFamily="system-ui, -apple-system, sans-serif"
                    >
                      {ann.label}
                    </text>
                  </g>
                );
              })}
            </g>
          )}
        </svg>

        {/* ── HOVERED STATE DOSSIER OVERLAY ── */}
        {hoveredState && (
          <div className="absolute top-4 left-4 bg-slate-900/95 text-white border border-orange-500/60 rounded-xl px-3.5 py-2.5 text-xs shadow-2xl pointer-events-none animate-fadeIn">
            <div className="flex items-center gap-2 mb-1">
              <span className="w-2 h-2 rounded-full bg-orange-500 animate-pulse" />
              <strong className="text-orange-400 font-bold">{hoveredState.name}</strong>
              <span className="text-[10px] bg-slate-800 text-slate-300 px-1.5 py-0.5 rounded">
                Cap: {hoveredState.capital}
              </span>
            </div>
            <p className="text-[11px] text-slate-300 max-w-xs">{hoveredState.safars}</p>
          </div>
        )}
      </div>

      <p className="text-center text-xs text-slate-400">
        💡 <strong>Copy 2</strong> faithfully reflects <em>Image 1</em>: clean state boundaries, exact typography, and leader arrows.
      </p>
    </div>
  );
}
