'use client';

import { useState } from 'react';
import Navbar from '@/components/Navbar';

export default function ContactPage() {
  const [toast, setToast] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    e.target.reset();
    setToast(true);
    setTimeout(() => setToast(false), 4000);
  };

  return (
    <div className="min-h-screen">
      <Navbar active="/contact" />

      {/* Hero */}
      <section className="pt-32 pb-16 border-b border-slate-800"
        style={{ background: 'radial-gradient(circle at 50% 30%, rgba(249,115,22,0.12) 0%, rgba(6,11,24,1) 65%)' }}>
        <div className="max-w-7xl mx-auto px-4 text-center">
          <span className="text-[11px] font-bold text-orange-400 uppercase tracking-widest bg-orange-500/10 px-3 py-1 rounded-full border border-orange-500/30">
            📞 We Are Here To Help
          </span>
          <h1 className="heading-font text-4xl sm:text-5xl font-extrabold text-white mt-4">
            Get In Touch With <span className="text-orange-400">Safar Experts</span>
          </h1>
          <p className="text-slate-300 text-sm max-w-xl mx-auto mt-3">
            Questions about trek difficulties, custom family packages, or weather windows? Our experts are available 24/7.
          </p>
        </div>
      </section>

      {/* Content */}
      <section className="py-16">
        <div className="max-w-6xl mx-auto px-4 grid grid-cols-1 lg:grid-cols-5 gap-12">

          {/* Info (2 cols) */}
          <div className="lg:col-span-2 space-y-6">
            <div>
              <h2 className="brand-font text-2xl font-extrabold text-white mb-2">Explore Bharat Safar Support</h2>
              <p className="text-sm text-slate-300 leading-relaxed">
                Our experienced trekkers and travel consultants guide your journey from planning to summit.
              </p>
            </div>

            <div className="glass-card p-6 rounded-2xl border border-slate-800 space-y-5">
              {[
                { icon: '📍', title: 'Headquarters', detail: 'Safar House, Mall Road, Manali, Himachal Pradesh 175131' },
                { icon: '📞', title: 'Helpline & WhatsApp', detail: '+91 98765 43210\n+91 91234 56789' },
                { icon: '✉️', title: 'Email Address', detail: 'support@explorebharatsafar.com' },
                { icon: '🕐', title: 'Working Hours', detail: 'Mon – Sat: 9 AM to 8 PM IST\nSundari Emergency Line: Always On' },
              ].map(({ icon, title, detail }) => (
                <div key={title} className="flex items-start gap-4">
                  <span className="text-2xl mt-0.5">{icon}</span>
                  <div>
                    <h5 className="text-sm font-bold text-white mb-0.5">{title}</h5>
                    <p className="text-xs text-slate-400 whitespace-pre-line">{detail}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Quick Category Enquiry Buttons */}
            <div>
              <h4 className="text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-3">Quick Enquiry By Type</h4>
              <div className="flex flex-wrap gap-2">
                {['Trek Booking', 'Custom Package', 'Group Safar', 'Corporate Retreat', 'School / College Trip'].map(type => (
                  <button key={type} className="text-[11px] font-semibold text-slate-300 hover:text-orange-400 hover:border-orange-400/40 border border-slate-700 px-3 py-1.5 rounded-xl transition-colors">
                    {type}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Form (3 cols) */}
          <div className="lg:col-span-3">
            <div className="glass-card p-8 rounded-3xl border border-orange-500/25 shadow-2xl">
              <h3 className="brand-font text-xl font-extrabold text-white mb-6">Send Us a Message</h3>
              <form onSubmit={handleSubmit} className="space-y-4 text-xs">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block font-bold text-slate-300 mb-1.5">First Name *</label>
                    <input type="text" required placeholder="Aarav" className="w-full bg-slate-900 border border-slate-700 text-white rounded-xl px-3 py-2.5 focus:border-orange-500 focus:outline-none" />
                  </div>
                  <div>
                    <label className="block font-bold text-slate-300 mb-1.5">Last Name</label>
                    <input type="text" placeholder="Verma" className="w-full bg-slate-900 border border-slate-700 text-white rounded-xl px-3 py-2.5 focus:border-orange-500 focus:outline-none" />
                  </div>
                </div>
                <div>
                  <label className="block font-bold text-slate-300 mb-1.5">Email Address *</label>
                  <input type="email" required placeholder="aarav@email.com" className="w-full bg-slate-900 border border-slate-700 text-white rounded-xl px-3 py-2.5 focus:border-orange-500 focus:outline-none" />
                </div>
                <div>
                  <label className="block font-bold text-slate-300 mb-1.5">Phone / WhatsApp *</label>
                  <input type="tel" required placeholder="+91 98765 43210" className="w-full bg-slate-900 border border-slate-700 text-white rounded-xl px-3 py-2.5 focus:border-orange-500 focus:outline-none" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block font-bold text-slate-300 mb-1.5">No. of Travelers</label>
                    <input type="number" min="1" defaultValue="2" className="w-full bg-slate-900 border border-slate-700 text-white rounded-xl px-3 py-2.5 focus:border-orange-500 focus:outline-none" />
                  </div>
                  <div>
                    <label className="block font-bold text-slate-300 mb-1.5">Preferred Travel Date</label>
                    <input type="date" className="w-full bg-slate-900 border border-slate-700 text-white rounded-xl px-3 py-2.5 focus:border-orange-500 focus:outline-none" />
                  </div>
                </div>
                <div>
                  <label className="block font-bold text-slate-300 mb-1.5">Enquiry Type</label>
                  <select className="w-full bg-slate-900 border border-slate-700 text-white rounded-xl px-3 py-2.5 focus:border-orange-500 focus:outline-none">
                    {['Trek Booking', 'Custom Safar Package', 'Group / School Trip', 'Corporate Retreat', 'General Inquiry'].map(o => <option key={o}>{o}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block font-bold text-slate-300 mb-1.5">Your Message / Requirements</label>
                  <textarea rows={4} placeholder="Tell us your trek experience level, destination preferences, budget range, or any special requirements…" className="w-full bg-slate-900 border border-slate-700 text-white rounded-xl px-3 py-2.5 focus:border-orange-500 focus:outline-none" />
                </div>
                <button type="submit" className="w-full bg-gradient-to-r from-orange-500 to-amber-600 hover:from-orange-600 hover:to-amber-700 text-slate-950 font-extrabold text-sm py-3 rounded-xl shadow-lg transition-all flex items-center justify-center gap-2">
                  🚀 Send Safar Inquiry
                </button>
                <p className="text-center text-[10px] text-slate-500">
                  We respond within 2 hours on business days. Your details are safe with us.
                </p>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Toast */}
      <div className={`fixed bottom-6 right-6 z-50 transition-all duration-300 ${toast ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'}`}>
        <div className="bg-slate-900 border border-emerald-500/50 shadow-2xl rounded-2xl p-4 flex items-center gap-3">
          <span className="w-8 h-8 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold text-sm">✓</span>
          <div>
            <h5 className="text-xs font-bold text-white">Message Sent Successfully!</h5>
            <p className="text-[11px] text-slate-400">Our Safar expert will contact you within 2 hours.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
