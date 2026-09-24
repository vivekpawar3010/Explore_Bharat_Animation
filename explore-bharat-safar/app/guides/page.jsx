'use client';

import Navbar from '@/components/Navbar';

const GUIDES = [
  { category: 'Himalayan Trekking', color: 'orange', articles: [
    { title: '10 Tips for High Altitude Acclimatization', desc: 'Prevent AMS above 10,000 ft in Ladakh and Himachal. Learn the climb-high sleep-low protocol.', readTime: '8 min read', emoji: '🏔️' },
    { title: 'Best Himalayan Treks by Season', desc: 'Complete seasonal calendar — which trek to do in summer, monsoon, autumn and winter.', readTime: '12 min read', emoji: '📅' },
    { title: 'Essential Gear Checklist for Snow Treks', desc: 'Layering system, waterproof boots, microspikes, and sleeping bag temperature ratings.', readTime: '10 min read', emoji: '🎒' },
  ]},
  { category: 'Wildlife & Safari', color: 'emerald', articles: [
    { title: 'India\'s Best National Parks — Zone-by-Zone Guide', desc: 'Complete breakdown of buffer, core, and night safari zones for all major reserves.', readTime: '15 min read', emoji: '🐅' },
    { title: 'Tiger Safari Photography Tips', desc: 'Camera settings, lens choice, golden hour shooting and vehicle positioning for wildlife shots.', readTime: '11 min read', emoji: '📷' },
    { title: 'Booking Safari Jeeps — Dos and Don\'ts', desc: 'How to avoid touts, choose certified naturalist guides, and get the best safari permit zone.', readTime: '7 min read', emoji: '🚙' },
  ]},
  { category: 'Eco & Responsible Travel', color: 'blue', articles: [
    { title: 'Leave No Trace in Indian Wilderness', desc: 'Zero-plastic trekking, protecting alpine flora, waste disposal and campfire ethics.', readTime: '9 min read', emoji: '🌱' },
    { title: 'Supporting Local Communities on Your Safar', desc: 'How to choose authentic homestays, buy local crafts fairly, and contribute to village economies.', readTime: '6 min read', emoji: '🤝' },
    { title: 'Monsoon Trekking Safety Guide', desc: 'Trail conditions, leech protection, river crossing risks, and gear waterproofing for rainy season.', readTime: '10 min read', emoji: '🌧️' },
  ]},
];

export default function GuidesPage() {
  return (
    <div className="min-h-screen">
      <Navbar active="/guides" />

      {/* Hero */}
      <section className="pt-32 pb-16 border-b border-slate-800"
        style={{ background: 'radial-gradient(circle at 50% 30%, rgba(234,179,8,0.10) 0%, rgba(6,11,24,1) 65%)' }}>
        <div className="max-w-7xl mx-auto px-4 text-center">
          <span className="text-[11px] font-bold text-amber-400 uppercase tracking-widest bg-amber-500/10 px-3 py-1 rounded-full border border-amber-500/30">
            📚 Explorer Knowledge & Safety Handbook
          </span>
          <h1 className="heading-font text-4xl sm:text-6xl font-extrabold text-white mt-4 leading-tight">
            Safar Travel <span className="text-amber-400">Guides & Tips</span>
          </h1>
          <p className="text-slate-300 text-base max-w-2xl mx-auto mt-3">
            Expert advice on acclimatization, gear packing, eco-trekking ethics, wildlife safety, and seasonal travel windows.
          </p>
        </div>
      </section>

      {/* Guide Sections */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 space-y-14">
          {GUIDES.map(({ category, color, articles }) => (
            <div key={category}>
              <div className="flex items-center gap-3 mb-7">
                <div className={`w-1 h-8 rounded-full bg-${color}-500`} />
                <h2 className={`brand-font text-xl font-extrabold text-${color}-400`}>{category}</h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {articles.map((art, i) => (
                  <div key={i} className={`dest-card glass-card rounded-2xl p-6 border border-${color}-500/15 hover:border-${color}-500/40 group cursor-pointer`}>
                    <span className="text-3xl mb-4 block">{art.emoji}</span>
                    <h3 className="brand-font text-base font-bold text-white group-hover:text-orange-400 transition-colors mb-2">
                      {art.title}
                    </h3>
                    <p className="text-xs text-slate-300 leading-relaxed mb-4">{art.desc}</p>
                    <div className="flex items-center justify-between pt-4 border-t border-slate-800">
                      <span className={`text-[11px] text-${color}-400 font-semibold`}>{art.readTime}</span>
                      <button className="text-[11px] font-bold text-slate-300 hover:text-orange-400 transition-colors">
                        Read Guide →
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
