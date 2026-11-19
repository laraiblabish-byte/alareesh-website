import { Link } from 'react-router-dom';
import { ShieldCheck, CheckCircle2, Award, ArrowRight, Phone } from 'lucide-react';
import { COMPANY_INFO } from '../data/companyData';
import Reveal from './Reveal';

export default function AboutSection({ onOpenQuote }) {
  const highlights = [
    {
      title: "Dubai Municipality Licensed & Insured",
      desc: "Class-1 demolition licenses with comprehensive third-party liability insurance. 100% legal compliance with zero owner exposure."
    },
    {
      title: "Modern In-House Fleet",
      desc: "50+ heavy excavators, rock breakers, crushing plants, and 32m³ tipper trucks. No middleman delays or rental markups."
    },
    {
      title: "Zero Incident Safety Record",
      desc: "Stringent adherence to UAE OSHAD and Dubai Civil Defence safety rules. Full daily vibration and dust monitoring on every site."
    },
    {
      title: "Transparent Fixed Pricing",
      desc: "Detailed written proposals covering permits, labor, machinery, dumping tariffs, and complete site handover documentation."
    }
  ];

  return (
    <section id="about" className="py-20 bg-white relative overflow-hidden">
      {/* Background patterns */}
      <div className="absolute inset-0 bg-grid-pattern opacity-40 pointer-events-none" />
      <div className="absolute right-0 top-1/3 w-80 h-80 bg-sky-500/5 rounded-full blur-[120px] pointer-events-none animate-pulse-glow" />
      <div className="absolute left-0 bottom-10 w-80 h-80 bg-red-500/5 rounded-full blur-[120px] pointer-events-none animate-pulse-glow" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Column: Image Collage / Visual Proof with Logo Theme */}
          <div className="lg:col-span-6 relative">
            <Reveal animation="fade-right">
              <div className="relative mx-auto max-w-lg lg:max-w-none">
                {/* Main Image */}
                <div className="relative rounded-2xl overflow-hidden border border-slate-200 shadow-xl group">
                  <img
                    src="https://alareeshdemolition.ae/wp-content/uploads/2023/12/Safety-Reliability.png"
                    alt="Al Areesh Demolition Safety & Reliability"
                    className="w-full h-80 sm:h-96 object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = "https://images.unsplash.com/photo-1541888946425-d0fbb186c5f7?auto=format&fit=crop&w=800&q=80";
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                  
                  <div className="absolute bottom-6 left-6 right-6">
                    <div className="flex items-center gap-2 text-sky-300 font-heading text-sm font-bold uppercase tracking-wider mb-1">
                      <ShieldCheck className="w-4 h-4 text-[#00a4e4]" />
                      Safety & Reliability Standard
                    </div>
                    <p className="text-xs text-white/90">
                      Dubai Civil Defence and Municipality safety standards on every project. Zero recordable incidents across 300+ sites.
                    </p>
                  </div>
                </div>

                {/* Floating Stat Card Badge with AAD Logo Dual Colors (Light) */}
                <div className="absolute -bottom-6 -right-4 sm:-right-6 bg-white border border-slate-200/90 p-5 rounded-2xl shadow-xl max-w-xs animate-float">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-xl bg-red-100 border border-red-200 flex items-center justify-center text-[#ea1d25] shrink-0">
                      <Award className="w-6 h-6" />
                    </div>
                    <div>
                      <div className="font-heading text-2xl font-black text-slate-900">12+ Years</div>
                      <div className="text-xs text-slate-600 font-medium">Proven UAE Demolition Track Record Since 2014</div>
                    </div>
                  </div>
                </div>

                {/* Dual Accent Corner (Red & Sky Blue) */}
                <div className="absolute -top-3 -left-3 w-16 h-16 brand-pattern rounded-tl-2xl border-t-2 border-l-2 border-[#00a4e4] pointer-events-none" />
              </div>
            </Reveal>
          </div>

          {/* Right Column: Narrative & Values */}
          <div className="lg:col-span-6 space-y-6">
            <Reveal animation="fade-left" delay={150}>
              <div className="space-y-2">
                <span className="text-xs font-bold uppercase tracking-widest text-[#ea1d25] flex items-center gap-2">
                  <span className="w-6 h-0.5 bg-[#ea1d25]"></span>
                  About Al Areesh Demolition (AAD)
                </span>
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight leading-tight">
                  Dubai's Most Trusted Demolition & Excavation Company
                </h2>
              </div>
            </Reveal>

            <Reveal animation="fade-left" delay={250}>
              <p className="text-slate-700 text-sm sm:text-base leading-relaxed">
                <strong className="text-slate-900">Al Areesh Wrecking & Demolition Works LLC</strong> is a professional demolition company in Dubai with over 12 years of hands-on experience in building demolition, villa demolition, excavation, and site clearance across the UAE.
              </p>
            </Reveal>

            <Reveal animation="fade-left" delay={350}>
              <p className="text-slate-600 text-sm leading-relaxed">
                We have successfully completed 300+ demolition projects for residential, commercial, and industrial clients including <span className="text-sky-700 font-bold">Dubai Holding Real Estate</span>. Our team of 100+ trained professionals operates across Dubai, Sharjah, Abu Dhabi, and Ajman — delivering every project on time, within budget, and in full compliance with Dubai Municipality regulations.
              </p>
            </Reveal>

            {/* Highlights Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              {highlights.map((item, idx) => (
                <Reveal key={idx} animation="fade-up" delay={400 + idx * 80}>
                  <div
                    className="p-4 rounded-xl bg-slate-50 border border-slate-200/90 hover:border-sky-400 hover:bg-white hover:shadow-md transition-all duration-300 card-hover-transition space-y-1.5 h-full"
                  >
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-[#00a4e4] shrink-0" />
                      <h3 className="text-xs font-bold text-slate-900 font-heading">{item.title}</h3>
                    </div>
                    <p className="text-[11px] text-slate-600 leading-snug pl-6">
                      {item.desc}
                    </p>
                  </div>
                </Reveal>
              ))}
            </div>

            {/* CTA action buttons */}
            <Reveal animation="fade-up" delay={600}>
              <div className="flex flex-wrap items-center gap-3 pt-3">
                <button
                  onClick={onOpenQuote}
                  className="px-6 py-3 text-xs font-bold uppercase tracking-wider text-white bg-gradient-to-r from-[#ea1d25] to-[#c41219] hover:from-[#ff2d35] hover:to-[#ea1d25] rounded-xl shadow-lg shadow-red-950/20 flex items-center gap-2 transition-all duration-300 transform hover:-translate-y-0.5 border border-red-500/30 active:scale-[0.98]"
                >
                  <span>Request Proposal</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <Link
                  to="/about"
                  className="px-5 py-3 text-xs font-bold text-slate-700 hover:text-[#ea1d25] bg-slate-100 hover:bg-slate-200/80 border border-slate-200 rounded-xl flex items-center gap-2 transition-all duration-300 transform hover:-translate-y-0.5"
                >
                  <span>About Us Profile</span>
                  <ArrowRight className="w-3.5 h-3.5 text-[#00a4e4]" />
                </Link>

                <a
                  href={`tel:${COMPANY_INFO.phoneRaw}`}
                  className="px-5 py-3 text-xs font-bold text-slate-700 hover:text-slate-900 bg-slate-100 hover:bg-slate-200/80 border border-slate-200 rounded-xl flex items-center gap-2 transition-all duration-300 transform hover:-translate-y-0.5"
                >
                  <Phone className="w-3.5 h-3.5 text-[#ea1d25]" />
                  <span>Call Us</span>
                </a>
              </div>
            </Reveal>
          </div>

        </div>
      </div>
    </section>
  );
}
