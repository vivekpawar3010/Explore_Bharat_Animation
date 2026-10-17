'use client';

import Navbar from '@/components/Navbar';
import Link from 'next/link';

const TREKS = [
  {
    name: 'Kedarkantha Snow Peak Trek',
    state: 'Uttarakhand',
    elevation: '12,500 ft',
    days: '6 Days',
    difficulty: 'Moderate',
    season: 'Dec – Apr',
    img: 'https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?w=800&q=80',
    desc: 'Iconic winter summit with 360° views of Swargarohini, Bandarpunch & Kedarnath. Pine forests blanketed in pristine snow.',
    highlights: ['Dense pine & oak forests', 'Panoramic summit views', 'Campsite at 10,000 ft', 'Snow camping experience'],
  },
  {
    name: 'Goecha La — Kanchenjunga View',
    state: 'Sikkim',
    elevation: '16,200 ft',
    days: '10 Days',
    difficulty: 'Hard',
    season: 'Apr–May / Oct–Nov',
    img: 'https://images.unsplash.com/photo-1589182373726-e4f658ab50f0?w=800&q=80',
    desc: 'The closest point to Mt. Kanchenjunga (3rd highest peak in the world). Through rhododendron forests & glacial moraines.',
    highlights: ['View of 4 Himalayan giants', 'Rhododendron forests in bloom', 'Pristine glacial lakes', 'Buddhist monasteries en route'],
  },
  {
    name: 'Harishchandragad — Konkan Kada',
    state: 'Maharashtra',
    elevation: '4,670 ft',
    days: '2 Days',
    difficulty: 'Hard',
    season: 'Oct – Feb',
    img: 'https://images.unsplash.com/photo-1627894099516-7281c3e06822?w=800&q=80',
    desc: "Maharashtra's most dramatic trek — featuring the famous overhanging Konkan Kada cliff and ancient Kedareshwar cave temple.",
    highlights: ['Vertical cliff overhang', 'Ancient Hemadpanthi temple', 'Monsoon waterfall views', 'Night sky stargazing'],
  },
  {
    name: 'Valley of Flowers — Uttarakhand',
    state: 'Uttarakhand',
    elevation: '11,300 ft',
    days: '5 Days',
    difficulty: 'Moderate',
    season: 'Jul – Sep',
    img: 'https://images.unsplash.com/photo-1588668214407-6ea9a6d8c272?w=800&q=80',
    desc: 'UNESCO World Heritage site carpeted with 500+ species of rare Himalayan wildflowers. Combined with Hemkund Sahib pilgrim lake.',
    highlights: ['UNESCO biosphere reserve', '500+ endemic flower species', 'Hemkund Sahib Gurudwara', 'Snow-fed glacial streams'],
  },
  {
    name: 'Sandakphu — Sleeping Buddha Trek',
    state: 'West Bengal',
    elevation: '11,929 ft',
    days: '7 Days',
    difficulty: 'Hard',
    season: 'Oct – May',
    img: 'https://images.unsplash.com/photo-1589182373726-e4f658ab50f0?w=800&q=80',
    desc: 'The only place on Earth to see Everest, Kanchenjunga, Lhotse & Makalu all at once — the legendary Sleeping Buddha silhouette.',
    highlights: ['4 Himalayan giants visible', 'Rhododendron trails', 'Nepal border ridge walk', 'Sunrise over Kanchenjunga'],
  },
  {
    name: 'Spiti — Pin Parvati Pass Trek',
    state: 'Himachal Pradesh',
    elevation: '17,500 ft',
    days: '11 Days',
    difficulty: 'Extreme',
    season: 'Jul – Aug',
    img: 'https://images.unsplash.com/photo-1568849676085-51415703900f?w=800&q=80',
    desc: 'Legendary Himalayan crossing from the lush Parvati Valley over a glaciated high pass into the stark cold desert of Spiti.',
    highlights: ['Extreme high-altitude pass', 'Glacier crossings', 'Cold desert landscapes', 'Ancient Spiti monasteries'],
  },
];

const difficultyColor = (d) => {
  if (d === 'Easy') return 'text-emerald-400 bg-emerald-500/15 border-emerald-500/30';
  if (d === 'Moderate') return 'text-amber-400 bg-amber-500/15 border-amber-500/30';
  if (d === 'Hard') return 'text-red-400 bg-red-500/15 border-red-500/30';
  return 'text-purple-400 bg-purple-500/15 border-purple-500/30';
};

export default function TreksPage() {
  return (
    <div className="min-h-screen">
      <Navbar active="/treks" />

      {/* Hero */}
      <section className="pt-32 pb-16 border-b border-slate-800"
        style={{ background: 'radial-gradient(circle at 50% 30%, rgba(239,68,68,0.12) 0%, rgba(6,11,24,1) 65%)' }}>
        <div className="max-w-7xl mx-auto px-4 text-center">
          <span className="text-[11px] font-bold text-red-400 uppercase tracking-widest bg-red-500/10 px-3 py-1 rounded-full border border-red-500/30">
            🧗‍♂️ For Mountain & Wilderness Trekkers
          </span>
          <h1 className="heading-font text-4xl sm:text-6xl font-extrabold text-white mt-4 leading-tight">
            Conquer India's Most{' '}
            <span className="text-red-400">Thrilling Peaks</span>
          </h1>
          <p className="text-slate-300 text-base max-w-2xl mx-auto mt-3">
            From frozen Zanskar rivers to high-altitude Himalayan summits, monsoon Sahyadri forts & flower-carpeted valleys.
          </p>
          <div className="flex items-center justify-center gap-6 mt-6 text-xs text-slate-400">
            <span className="flex items-center gap-2"><span className={`px-2 py-0.5 rounded border text-[10px] font-bold ${difficultyColor('Easy')}`}>Easy</span> Beginners</span>
            <span className="flex items-center gap-2"><span className={`px-2 py-0.5 rounded border text-[10px] font-bold ${difficultyColor('Moderate')}`}>Moderate</span> Experienced</span>
            <span className="flex items-center gap-2"><span className={`px-2 py-0.5 rounded border text-[10px] font-bold ${difficultyColor('Hard')}`}>Hard</span> Advanced</span>
            <span className="flex items-center gap-2"><span className={`px-2 py-0.5 rounded border text-[10px] font-bold ${difficultyColor('Extreme')}`}>Extreme</span> Experts Only</span>
          </div>
        </div>
      </section>

      {/* Trek Cards */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {TREKS.map((trek, i) => (
              <div key={i} className="dest-card glass-card rounded-2xl overflow-hidden border border-slate-800 group flex flex-col">
                <div className="relative h-56 overflow-hidden">
                  <img
                    src={trek.img}
                    alt={trek.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    onError={e => { e.target.src = 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=600&q=80'; }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent opacity-90" />
                  <div className="absolute top-3 left-3 flex items-center gap-2">
                    <span className={`text-[10px] font-extrabold px-2 py-0.5 rounded border ${difficultyColor(trek.difficulty)}`}>
                      {trek.difficulty}
                    </span>
                    <span className="text-[10px] font-bold bg-slate-900/80 text-white px-2 py-0.5 rounded border border-slate-700/60">
                      {trek.elevation}
                    </span>
                  </div>
                  <div className="absolute bottom-3 left-3 right-3">
                    <span className="text-[11px] text-orange-400 font-bold">{trek.state} • {trek.days}</span>
                  </div>
                </div>
                <div className="p-5 flex-1 flex flex-col">
                  <h3 className="brand-font text-base font-bold text-white group-hover:text-orange-400 transition-colors mb-2">
                    {trek.name}
                  </h3>
                  <p className="text-xs text-slate-300 leading-relaxed mb-4 flex-1">{trek.desc}</p>
                  <div className="mb-4">
                    <h4 className="text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-2">Highlights</h4>
                    <ul className="space-y-1">
                      {trek.highlights.slice(0, 3).map((h, j) => (
                        <li key={j} className="flex items-center gap-2 text-[11px] text-slate-300">
                          <span className="text-orange-400">✦</span> {h}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="pt-4 border-t border-slate-800 flex items-center justify-between">
                    <span className="text-[11px] text-emerald-400 font-semibold">🗓️ {trek.season}</span>
                    <Link href="/contact" className="text-[11px] font-bold text-slate-950 bg-red-500 hover:bg-red-600 px-3 py-1.5 rounded-lg transition-colors">
                      Book Trek →
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
