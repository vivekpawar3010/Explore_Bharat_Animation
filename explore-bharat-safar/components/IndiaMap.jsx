'use client';

import { useState, useCallback, useEffect, useRef } from 'react';
import { ComposableMap, Geographies, Geography, Marker } from 'react-simple-maps';
import { STATES_DATA } from '@/lib/statesData';

const GEO_URL = '/india-states.geojson';

const NAME_TO_CODE = {
  'Arunachal Pradesh': 'IN-AR',
  'Assam':             'IN-AR',
  'Meghalaya':         'IN-ML',
  'Nagaland':          'IN-AR',
  'Manipur':           'IN-AR',
  'Mizoram':           'IN-AR',
  'Tripura':           'IN-AR',
  'Sikkim':            'IN-SK',
  'West Bengal':       'IN-WB',
  'Bihar':             null,
  'Jharkhand':         null,
  'Odisha':            null,
  'Chhattisgarh':      'IN-MP',
  'Madhya Pradesh':    'IN-MP',
  'Uttar Pradesh':     null,
  'Uttarakhand':       'IN-UT',
  'Himachal Pradesh':  'IN-HP',
  'Jammu & Kashmir':   'IN-JK',
  'Ladakh':            'IN-JK',
  'Punjab':            null,
  'Haryana':           null,
  'Delhi':             null,
  'Rajasthan':         'IN-RJ',
  'Gujarat':           'IN-GJ',
  'Maharashtra':       'IN-MH',
  'Goa':               'IN-GA',
  'Karnataka':         'IN-KA',
  'Andhra Pradesh':    null,
  'Telangana':         null,
  'Tamil Nadu':        'IN-TN',
  'Kerala':            'IN-KL',
};

const PINS = [
  { coords: [76.9, 33.5], label: 'J&K & Ladakh', code: 'IN-JK', color: '#f97316' },
  { coords: [77.4, 31.8], label: 'Himachal',      code: 'IN-HP', color: '#fb923c' },
  { coords: [79.0, 30.2], label: 'Uttarakhand',   code: 'IN-UT', color: '#10b981' },
  { coords: [74.0, 26.0], label: 'Rajasthan',     code: 'IN-RJ', color: '#eab308' },
  { coords: [75.8, 19.5], label: 'Maharashtra',   code: 'IN-MH', color: '#ef4444' },
  { coords: [76.5, 10.8], label: 'Kerala',        code: 'IN-KL', color: '#34d399' },
  { coords: [88.6, 27.4], label: 'Sikkim',        code: 'IN-SK', color: '#60a5fa' },
  { coords: [91.4, 25.6], label: 'Meghalaya',     code: 'IN-ML', color: '#a78bfa' },
  { coords: [72.5, 22.3], label: 'Gujarat',       code: 'IN-GJ', color: '#fbbf24' },
  { coords: [78.0, 23.5], label: 'MP',            code: 'IN-MP', color: '#f97316' },
  { coords: [76.0, 15.3], label: 'Karnataka',     code: 'IN-KA', color: '#22d3ee' },
  { coords: [74.0, 15.3], label: 'Goa',           code: 'IN-GA', color: '#f472b6' },
  { coords: [87.5, 22.8], label: 'W. Bengal',     code: 'IN-WB', color: '#c084fc' },
  { coords: [79.5, 11.5], label: 'Tamil Nadu',    code: 'IN-TN', color: '#fb923c' },
];

const categoryBg = {
  Trekkers: 'bg-red-500',
  Explorers: 'bg-blue-500',
  Visitor: 'bg-emerald-500',
};

export default function IndiaMap({ onStateHover, onStateClick }) {
  const [hoveredKey, setHoveredKey]   = useState(null);
  const [hoveredGeos, setHoveredGeos] = useState(null); // store full geo list
  const [mouse, setMouse]             = useState({ x: 0, y: 0 });
  const [tooltip, setTooltip]         = useState(null);
  const mapRef                        = useRef(null);

  useEffect(() => {
    const onMove = (e) => setMouse({ x: e.clientX, y: e.clientY });
    window.addEventListener('mousemove', onMove);
    return () => window.removeEventListener('mousemove', onMove);
  }, []);

  const getName = (geo) => geo.properties.st_nm || '';

  const handleEnter = useCallback((geo) => {
    const name = getName(geo);
    const code = NAME_TO_CODE[name];
    const data = code ? STATES_DATA[code] : null;
    setHoveredKey(geo.rsmKey);
    const tip = data
      ? { ...data }
      : { name, tagline: 'Regional culture & natural beauty', places: [] };
    setTooltip(tip);
    if (onStateHover) onStateHover(data || tip);
  }, [onStateHover]);

  const handleLeave = useCallback(() => {
    setHoveredKey(null);
    setTooltip(null);
    if (onStateHover) onStateHover(null);
  }, [onStateHover]);

  const handleClick = useCallback((geo) => {
    const name = getName(geo);
    const code = NAME_TO_CODE[name];
    const data = code ? STATES_DATA[code] : null;
    if (data && onStateClick) onStateClick(data);
  }, [onStateClick]);

  // Style for normal (non-hovered) states
  const normalStyle = (hasData) => ({
    default: {
      fill:        hasData ? '#1d4ed8' : '#1e3a5f',
      stroke:      '#475569',
      strokeWidth: 0.7,
      outline:     'none',
    },
    hover:   { outline: 'none' },
    pressed: { outline: 'none' },
  });

  // Style for the hovered state — glowing lift effect
  const hoveredStyle = {
    default: {
      fill:        '#f97316',
      stroke:      '#fdba74',
      strokeWidth: 2,
      outline:     'none',
      filter:      'drop-shadow(0 0 6px #f9731699) drop-shadow(0 0 16px #f9731666) drop-shadow(0 0 30px #f9731633)',
    },
    hover: {
      fill:        '#f97316',
      stroke:      '#fdba74',
      strokeWidth: 2,
      outline:     'none',
      filter:      'drop-shadow(0 0 6px #f9731699) drop-shadow(0 0 16px #f9731666) drop-shadow(0 0 30px #f9731633)',
    },
    pressed: { outline: 'none' },
  };

  return (
    <div ref={mapRef} className="relative w-full select-none">

      {/* ── FLOATING CURSOR TOOLTIP ── */}
      {tooltip && (
        <div
          className="fixed pointer-events-none z-[9999]"
          style={{
            left:      mouse.x,
            top:       mouse.y,
            transform: 'translate(-50%, -115%)',
            width:     '252px',
          }}
        >
          <div className="bg-slate-900/98 border-2 border-orange-500/70 rounded-2xl overflow-hidden shadow-2xl"
            style={{ boxShadow: '0 0 24px rgba(249,115,22,0.3), 0 20px 40px rgba(0,0,0,0.8)' }}>
            {tooltip.places?.[0] && (
              <div className="relative h-24">
                <img
                  src={tooltip.places[0].img}
                  alt=""
                  className="w-full h-full object-cover"
                  onError={e => { e.target.src = 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=400&q=60'; }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900 to-transparent" />
                <span className={`absolute top-2 left-2 text-[10px] font-extrabold text-white px-2 py-0.5 rounded-full ${categoryBg[tooltip.places[0].category] || 'bg-slate-600'}`}>
                  {tooltip.places[0].category}
                </span>
              </div>
            )}
            <div className="p-2.5 space-y-0.5">
              <p className="brand-font font-extrabold text-sm text-orange-400 truncate">📍 {tooltip.name}</p>
              <p className="text-[10px] text-slate-400 italic truncate">{tooltip.tagline}</p>
              {tooltip.places?.[0] && (
                <p className="text-[11px] font-semibold text-slate-200 truncate pt-0.5">{tooltip.places[0].name}</p>
              )}
              <p className="text-[10px] text-slate-500 pt-1 border-t border-slate-800">
                👉 See details in panel →
              </p>
            </div>
          </div>
        </div>
      )}

      {/* ── MAP ── */}
      <ComposableMap
        projection="geoMercator"
        projectionConfig={{ center: [82.5, 23], scale: 1000 }}
        width={600}
        height={680}
        style={{ width: '100%', height: 'auto', display: 'block' }}
      >
        {/* SVG Defs for glow filter */}
        <defs>
          <filter id="glow-filter" x="-30%" y="-30%" width="160%" height="160%">
            <feGaussianBlur in="SourceGraphic" stdDeviation="4" result="blur1" />
            <feGaussianBlur in="SourceGraphic" stdDeviation="8" result="blur2" />
            <feMerge>
              <feMergeNode in="blur2" />
              <feMergeNode in="blur1" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        <Geographies geography={GEO_URL}>
          {({ geographies }) => {
            const hovGeo = geographies.find(g => g.rsmKey === hoveredKey);
            const restGeos = geographies.filter(g => g.rsmKey !== hoveredKey);

            return (
              <>
                {/* ── All non-hovered states (rendered below) ── */}
                {restGeos.map(geo => {
                  const name    = getName(geo);
                  const code    = NAME_TO_CODE[name];
                  const hasData = Boolean(code && STATES_DATA[code]);
                  return (
                    <Geography
                      key={geo.rsmKey}
                      geography={geo}
                      onMouseEnter={() => handleEnter(geo)}
                      onMouseLeave={handleLeave}
                      onClick={() => handleClick(geo)}
                      style={normalStyle(hasData)}
                    />
                  );
                })}

                {/* ── Hovered state rendered LAST (on top) with glow ── */}
                {hovGeo && (
                  <Geography
                    key={hovGeo.rsmKey + '-hov'}
                    geography={hovGeo}
                    onMouseLeave={handleLeave}
                    onClick={() => handleClick(hovGeo)}
                    style={hoveredStyle}
                  />
                )}
              </>
            );
          }}
        </Geographies>

        {/* ── ANIMATED LOCATION PINS ── */}
        {PINS.map(({ coords, label, code, color }) => (
          <Marker
            key={label}
            coordinates={coords}
            onClick={() => {
              const d = STATES_DATA[code];
              if (d && onStateClick) onStateClick(d);
            }}
            style={{ cursor: 'pointer' }}
          >
            <circle fill={color} opacity={0} r={4}>
              <animate attributeName="r"       from="4"  to="18" dur="2.2s" repeatCount="indefinite" />
              <animate attributeName="opacity" from="0.6" to="0"  dur="2.2s" repeatCount="indefinite" />
            </circle>
            <circle r={4.5} fill={color} stroke="#0f172a" strokeWidth={1.5} />
          </Marker>
        ))}
      </ComposableMap>

      {/* ── LEGEND ── */}
      <div className="absolute bottom-2 left-2 bg-slate-950/90 border border-slate-700/50 rounded-xl px-3 py-2 text-[10px] space-y-1.5">
        {[
          { bg: '#1d4ed8', label: 'Featured State' },
          { bg: '#1e3a5f', label: 'Other Region' },
          { bg: '#f97316', label: 'Hovered (Glowing)' },
        ].map(({ bg, label }) => (
          <div key={label} className="flex items-center gap-2">
            <span className="w-3 h-2.5 rounded-sm flex-shrink-0 border border-slate-600" style={{ background: bg }} />
            <span className="text-slate-400">{label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
