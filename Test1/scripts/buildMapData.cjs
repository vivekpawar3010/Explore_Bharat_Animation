const fs = require('fs');
const d3Geo = require('d3-geo');

const rawStates = JSON.parse(fs.readFileSync('public/india-states-clean.geojson'));
const cleanBorder = JSON.parse(fs.readFileSync('public/india-border-clean.geojson'));

const proj = d3Geo.geoMercator().center([82.5, 22]).scale(1000).translate([300, 340]);
const pathGen = d3Geo.geoPath().projection(proj);

function fixWinding(feature) {
  function fixRing(ring) {
    const f = { type: 'Feature', geometry: { type: 'Polygon', coordinates: [ring] } };
    if (d3Geo.geoArea(f) > 2 * Math.PI) return ring.slice().reverse();
    return ring;
  }
  const geom = feature.geometry;
  if (geom.type === 'Polygon') geom.coordinates = geom.coordinates.map(fixRing);
  else if (geom.type === 'MultiPolygon') geom.coordinates = geom.coordinates.map(poly => poly.map(fixRing));
}

function getSqSegDist(p, p1, p2) {
  let x = p1[0], y = p1[1], dx = p2[0]-x, dy = p2[1]-y;
  if (dx !== 0 || dy !== 0) {
    const t = ((p[0]-x)*dx + (p[1]-y)*dy) / (dx*dx+dy*dy);
    if (t > 1) { x = p2[0]; y = p2[1]; } else if (t > 0) { x += dx*t; y += dy*t; }
  }
  dx = p[0]-x; dy = p[1]-y; return dx*dx+dy*dy;
}
function simplifyDP(pts, sqTol) {
  if (pts.length <= 2) return pts;
  let maxD = sqTol, idx = 0;
  for (let i = 1; i < pts.length-1; i++) {
    const d = getSqSegDist(pts[i], pts[0], pts[pts.length-1]);
    if (d > maxD) { idx = i; maxD = d; }
  }
  if (maxD > sqTol) {
    const r1 = simplifyDP(pts.slice(0, idx+1), sqTol);
    const r2 = simplifyDP(pts.slice(idx), sqTol);
    return r1.slice(0, r1.length-1).concat(r2);
  }
  return [pts[0], pts[pts.length-1]];
}
function simplifyRing(r, tol) {
  if (r.length <= 4) return r;
  const s = simplifyDP(r, tol*tol);
  return s.length >= 4 ? s : r;
}
function simplifyGeom(geom, tol) {
  if (geom.type === 'Polygon') geom.coordinates = geom.coordinates.map(r => simplifyRing(r, tol));
  else if (geom.type === 'MultiPolygon') geom.coordinates = geom.coordinates.map(p => p.map(r => simplifyRing(r, tol)));
}

// Border path
const outlinePath = pathGen(cleanBorder.features[0]);
const outlineBounds = pathGen.bounds(cleanBorder.features[0]);

// Metadata mappings
const META = {
  'Rajasthan': { id: 'IN-RJ', img1: 'Rajasthan', img2: 'Rajasthan', color: '#fb7185', cap: 'Jaipur', reg: 'West', exp: [-55, -15], safars: 'Thar Desert Safari, Jaisalmer Forts, Ranthambore Tigers' },
  'Maharashtra': { id: 'IN-MH', img1: 'Maharashtra', img2: 'Maharashtra', color: '#c084fc', cap: 'Mumbai', reg: 'West', exp: [-50, 20], safars: 'Sahyadri Fort Treks, Harishchandragad, Tadoba Tigers' },
  'Gujarat': { id: 'IN-GJ', img1: 'Gujarat', img2: 'Gujarat', color: '#fb923c', cap: 'Gandhinagar', reg: 'West', exp: [-55, 30], safars: 'Rann of Kutch White Desert, Gir Asiatic Lions' },
  'Madhya Pradesh': { id: 'IN-MP', img1: 'Madhya Pradesh', img2: 'Madhya Pardesh', color: '#f59e0b', cap: 'Bhopal', reg: 'Central', exp: [0, -5], safars: 'Kanha & Bandhavgarh Tigers, Khajuraho, Pachmarhi' },
  'Karnataka': { id: 'IN-KA', img1: 'Karnataka', img2: 'Karnataka', color: '#a3e635', cap: 'Bengaluru', reg: 'South', exp: [-40, 50], safars: 'Kudremukh Peak Trek, Hampi UNESCO Ruins, Coorg' },
  'Kerala': { id: 'IN-KL', img1: 'Kerala', img2: 'Kerala', color: '#ef4444', cap: 'Thiruvananthapuram', reg: 'South', exp: [-30, 70], arrow: { from: [140, 555], to: [175, 555] }, safars: 'Alleppey Backwaters, Munnar Shola Clouds, Wayanad Caves' },
  'Tamil Nadu': { id: 'IN-TN', img1: 'Tamil Nadu', img2: 'Tamil Nadu', color: '#84cc16', cap: 'Chennai', reg: 'South', exp: [30, 65], safars: 'Kodaikanal Dolphin Nose, Nilgiri Toy Train, Meenakshi Temple' },
  'Andhra Pradesh': { id: 'IN-AP', img1: 'Andhra Pradesh', img2: 'Andhra Pardesh', color: '#a855f7', cap: 'Amaravati', reg: 'South', exp: [45, 45], safars: 'Araku Valley Coffee Hills, Borra Caves, Tirupati' },
  'Chhattisgarh': { id: 'IN-CG', img1: 'Chhatisgarh', img2: 'Chhattisgarh', color: '#f59e0b', cap: 'Raipur', reg: 'Central', exp: [30, 20], safars: 'Chitrakote Horseshoe Falls, Bastar Tribal Heritage' },
  'Orissa': { id: 'IN-OD', img1: 'Orrisa', img2: 'Orissa', color: '#fbbf24', cap: 'Bhubaneswar', reg: 'East', exp: [50, 15], safars: 'Chilika Lake Dolphins, Konark Sun Temple, Puri Beach' },
  'Bihar': { id: 'IN-BR', img1: 'Bihar', img2: 'Bihar', color: '#fde047', cap: 'Patna', reg: 'East', exp: [35, -40], safars: 'Bodh Gaya Mahabodhi Tree, Nalanda Ancient University' },
  'Jharkhand': { id: 'IN-JH', img1: 'Jharkhand', img2: 'Jharkhand', color: '#f43f5e', cap: 'Ranchi', reg: 'East', exp: [35, -5], safars: 'Hundru Waterfalls, Betla National Park, Parasnath Hills' },
  'West Bengal': { id: 'IN-WB', img1: 'West Bengal', img2: 'West Bengal', color: '#facc15', cap: 'Kolkata', reg: 'East', exp: [45, -10], safars: 'Sandakphu Kanchenjunga View, Sundarbans Delta Tigers' },
  'Uttar Pradesh': { id: 'IN-UP', img1: 'Uttar Pradesh', img2: 'Uttar Pradesh', color: '#c084fc', cap: 'Lucknow', reg: 'North', exp: [-10, -35], safars: 'Varanasi Ghats, Taj Mahal Agra, Dudhwa Forest' },
  'Uttaranchal': { id: 'IN-UT', img1: 'Uttarakhand', img2: 'Uttarakhand', color: '#65a30d', cap: 'Dehradun', reg: 'North', exp: [15, -60], arrow: { from: [275, 175], to: [250, 178] }, safars: 'Kedarkantha Winter Summit, Valley of Flowers, Rishikesh' },
  'Himachal Pradesh': { id: 'IN-HP', img1: 'Himachal Pradesh', img2: 'Himachal Pardesh', color: '#ea580c', cap: 'Shimla', reg: 'North', exp: [-15, -65], arrow: { from: [265, 140], to: [230, 145] }, safars: 'Spiti Valley Cold Desert, Hampta Pass, Triund Ridge' },
  'Jammu and Kashmir': { id: 'IN-JK', img1: 'Jammu and Kashmir', img2: 'Jammu & Kashmir', color: '#e11d48', cap: 'Srinagar', reg: 'North', exp: [0, -75], safars: 'Pangong High Lake, Chadar Frozen River Trek, Gulmarg Ski' },
  'Punjab': { id: 'IN-PB', img1: 'Punjab', img2: 'Punjab', color: '#bef264', cap: 'Chandigarh', reg: 'North', exp: [-45, -50], safars: 'Golden Temple Amritsar, Virasat-e-Khalsa, Harike Wetland' },
  'Haryana': { id: 'IN-HR', img1: 'Haryana', img2: 'Haryana', color: '#f59e0b', cap: 'Chandigarh', reg: 'North', exp: [-30, -40], safars: 'Sultanpur Bird Sanctuary, Morni Hills Trekking' },
  'Delhi': { id: 'IN-DL', img1: 'Delhi', img2: 'Delhi', color: '#38bdf8', cap: 'New Delhi', reg: 'North', exp: [-15, -25], arrow: { from: [225, 212], to: [210, 212] }, safars: 'Qutub Minar, Red Fort, Humayun Tomb Heritage Walk' },
  'Goa': { id: 'IN-GA', img1: 'Goa', img2: 'Goa', color: '#f97316', cap: 'Panaji', reg: 'West', exp: [-55, 40], arrow: { from: [120, 462], to: [148, 462] }, safars: 'Dudhsagar Four-Tier Waterfalls, Palolem Scuba' },
  'Sikkim': { id: 'IN-SK', img1: 'Sikkim', img2: 'Sikkim', color: '#ef4444', cap: 'Gangtok', reg: 'North-East', exp: [40, -55], arrow: { from: [404, 205], to: [404, 222] }, safars: 'Goecha La Kanchenjunga Trek, Gurudongmar 17,800ft Lake' },
  'Assam': { id: 'IN-AS', img1: 'Assam', img2: 'Assam', color: '#c084fc', cap: 'Dispur', reg: 'North-East', exp: [70, -35], safars: 'Kaziranga One-Horned Rhinos, Majuli River Island' },
  'Arunachal Pradesh': { id: 'IN-AR', img1: 'Arunachal Pradesh', img2: 'Arunacha Pardesh', color: '#84cc16', cap: 'Itanagar', reg: 'North-East', exp: [85, -55], safars: 'Tawang High Monastery, Sela Pass, Ziro Valley' },
  'Nagaland': { id: 'IN-NL', img1: 'Nagaland', img2: 'Nagaland', color: '#fb7185', cap: 'Kohima', reg: 'North-East', exp: [90, -25], arrow: { from: [545, 262], to: [515, 262] }, safars: 'Dzukou Valley Flower Trek, Hornbill Festival, Mt. Saramati' },
  'Manipur': { id: 'IN-MN', img1: 'Manipur', img2: 'Manipur', color: '#ea580c', cap: 'Imphal', reg: 'North-East', exp: [85, 5], arrow: { from: [540, 290], to: [510, 290] }, safars: 'Loktak Floating Phumdis Lake, Keibul Lamjao Deer Park' },
  'Meghalaya': { id: 'IN-ML', img1: 'Meghalaya', img2: 'Meghalaya', color: '#86efac', cap: 'Shillong', reg: 'North-East', exp: [60, -15], arrow: { from: [435, 305], to: [448, 280] }, safars: 'Cherrapunji Living Root Bridges, Dawki Glass River' },
  'Mizoram': { id: 'IN-MZ', img1: 'Mizoram', img2: 'Mizoram', color: '#f87171', cap: 'Aizawl', reg: 'North-East', exp: [75, 30], safars: 'Blue Mountain Phawngpui Peak, Vantawng Falls' },
  'Tripura': { id: 'IN-TR', img1: 'Tripura', img2: 'Tripura', color: '#f43f5e', cap: 'Agartala', reg: 'North-East', exp: [65, 25], safars: 'Unakoti Rock Bas-Relief Sculptures, Neermahal Water Palace' },
  'Andaman and Nicobar': { id: 'IN-AN', img1: 'Andaman and Nicobar Island', img2: 'Andaman & Nicobar', color: '#38bdf8', cap: 'Port Blair', reg: 'Islands', exp: [35, 45], safars: 'Havelock Radhanagar Beach, Baratang Limestone Caves' },
  'Lakshadweep': { id: 'IN-LD', img1: 'Lakshadweep', img2: 'Lakshadweep', color: '#38bdf8', cap: 'Kavaratti', reg: 'Islands', exp: [-35, 45], safars: 'Agatti Coral Atoll Scuba, Bangaram Emerald Lagoon' }
};

const statesList = [];
rawStates.features.forEach(f => {
  const rawName = f.properties.NAME_1;
  const meta = META[rawName];
  if (!meta) return;

  simplifyGeom(f.geometry, 0.015);
  fixWinding(f);

  const path = pathGen(f);
  if (!path || path.length < 10) return;

  const bounds = pathGen.bounds(f);
  const centroid = pathGen.centroid(f);
  const minX = Math.round(bounds[0][0]);
  const minY = Math.round(bounds[0][1]);
  const maxX = Math.round(bounds[1][0]);
  const maxY = Math.round(bounds[1][1]);
  const w = Math.max(maxX - minX, 10);
  const h = Math.max(maxY - minY, 10);

  statesList.push({
    id: meta.id,
    name: meta.img1 === 'Orrisa' ? 'Odisha' : (meta.img1 === 'Chhatisgarh' ? 'Chhattisgarh' : (meta.img1 === 'Uttaranchal' ? 'Uttarakhand' : meta.img1)),
    img1Label: meta.img1,
    img2Label: meta.img2,
    color: meta.color,
    capital: meta.cap,
    region: meta.reg,
    safars: meta.safars,
    arrow: meta.arrow || null,
    explodedOffset: meta.exp,
    centroid: [Math.round(centroid[0]), Math.round(centroid[1])],
    bbox: [minX, minY, w, h],
    path: path
  });
});

console.log('Processed states count:', statesList.length);

const outContent = `// Precomputed high-performance India Map Data
// Contains National Outline and 31 States / UTs with SVG paths, Image 1 & 2 alignments

export const INDIA_OUTLINE = {
  path: ${JSON.stringify(outlinePath)},
  bounds: ${JSON.stringify(outlineBounds)},
};

export const STATES_MAP = ${JSON.stringify(statesList, null, 2)};
`;

fs.writeFileSync('lib/indiaMapData.js', outContent);
console.log('Saved lib/indiaMapData.js successfully! File size:', (fs.statSync('lib/indiaMapData.js').size / 1024).toFixed(1), 'KB');
