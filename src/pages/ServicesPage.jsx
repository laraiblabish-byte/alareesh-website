import { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  ArrowRight, 
  ShieldCheck, 
  Award, 
  HardHat, 
  Truck, 
  CheckCircle2, 
  Sparkles, 
  Building2, 
  Phone,
  MessageSquare
} from 'lucide-react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import FloatingActions from '../components/FloatingActions';
import Reveal from '../components/Reveal';
import { SERVICES, COMPANY_INFO } from '../data/companyData';

export default function ServicesPage({ includeLayout = true, onOpenQuote }) {
  const [activeCategory, setActiveCategory] = useState('All');

  const categories = ['All', 'Structural', 'Earthworks', 'Industrial', 'Recycling', 'Demolition', 'Logistics'];

  const filteredServices = activeCategory === 'All'
    ? SERVICES
    : SERVICES.filter((s) => s.category.toLowerCase() === activeCategory.toLowerCase());

  const content = (
    <div className="bg-white text-slate-800 font-sans selection:bg-[#ea1d25] selection:text-white">
      {/* ========================================================= */}
      {/* 1. SUB-HEADER BANNER & BREADCRUMBS                       */}
      {/* ========================================================= */}
      <section
        className="relative bg-slate-950 flex items-center justify-center overflow-hidden min-h-[220px] sm:min-h-[280px] border-b-2 border-[#ea1d25]"
        style={{
          backgroundImage: "url('/subheader-1.jpg')",
          backgroundSize: 'cover',
          backgroundPosition: 'center 40%'
        }}
        aria-label="Services Page Banner"
      >
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950/95 via-slate-950/80 to-slate-950/90" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-red-950/20 via-transparent to-transparent pointer-events-none" />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 w-full text-center space-y-4">
          <Reveal animation="fade-up" duration={600}>
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white shadow-xl animate-in fade-in duration-700">
              <ShieldCheck className="w-3.5 h-3.5 text-[#00a4e4]" />
              <span className="text-xs font-bold tracking-wider uppercase drop-shadow-sm">
                Dubai Municipality Licensed Class-1 Demolition Contractor
              </span>
            </div>

            <h1 className="text-4xl sm:text-5xl md:text-6xl font-black text-white tracking-tight font-heading drop-shadow-md mt-3">
              Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#ea1d25] via-red-400 to-[#00a4e4]">Services</span>
            </h1>

            <p className="max-w-2xl mx-auto text-sm sm:text-base md:text-lg text-slate-300 font-normal leading-relaxed mt-3">
              Turnkey demolition, excavation, structural dismantling, and recycling solutions across Dubai &amp; the UAE.
            </p>

            <nav
              aria-label="Breadcrumb"
              className="pt-3 flex items-center justify-center flex-wrap gap-2 text-xs sm:text-sm text-slate-300 drop-shadow-sm font-medium"
            >
              <Link
                to="/"
                className="text-slate-300 hover:text-white transition-colors"
              >
                Home
              </Link>
              <span className="text-slate-500">›</span>
              <span className="text-[#ea1d25] font-bold">Services</span>
            </nav>
          </Reveal>
        </div>
      </section>

      {/* ========================================================= */}
      {/* 2. SERVICES GRID SECTION                                  */}
      {/* ========================================================= */}
      <section className="py-16 sm:py-24 bg-white relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          
          {/* Header & Filter Row */}
          <Reveal animation="fade-up">
            <div className="text-center max-w-3xl mx-auto space-y-4">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-red-50 border border-red-200 text-[#ea1d25] text-xs font-bold tracking-wider uppercase">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Engineered Core Solutions</span>
              </div>

              <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-slate-900 tracking-tight font-heading leading-tight">
                Comprehensive Demolition Solutions in Dubai &amp; the UAE
              </h2>

              <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
                From precision urban building dismantling to deep multi-acre basement excavation, our certified teams deliver turnkey site clearance on schedule and within budget.
              </p>

              {/* Filter Pills */}
              <div className="flex flex-wrap items-center justify-center gap-2 pt-4">
                {categories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setActiveCategory(cat)}
                    className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all duration-300 transform active:scale-95 ${
                      activeCategory === cat
                        ? 'bg-[#ea1d25] text-white shadow-lg shadow-red-500/20 scale-105'
                        : 'bg-slate-100 text-slate-700 hover:text-[#ea1d25] hover:bg-slate-200/80 border border-slate-200/60'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>
          </Reveal>

          {/* 6-Card Services Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredServices.map((service, index) => {
              const detailUrl = `/service/${service.slug}`;
              return (
                <Reveal key={service.id} animation="fade-up" delay={(index % 3) * 75}>
                  <div
                    className="h-full group rounded-3xl bg-white border border-slate-200 hover:border-[#ea1d25]/40 transition-all duration-500 flex flex-col overflow-hidden hover:shadow-2xl hover:-translate-y-1.5 shadow-sm"
                  >
                    {/* Service Image Container with Link */}
                    <Link to={detailUrl} className="relative h-56 sm:h-64 w-full overflow-hidden bg-slate-900 block">
                      <img
                        src={service.image}
                        alt={service.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
                        onError={(e) => {
                          e.target.onerror = null;
                          e.target.src = service.fallbackImage;
                        }}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/20 to-transparent transition-opacity group-hover:opacity-90" />
                      
                      {/* Category Pill */}
                      <div className="absolute top-4 left-4">
                        <span className="text-[11px] font-extrabold uppercase tracking-wider px-3 py-1.5 rounded-lg bg-white/95 backdrop-blur-md text-[#ea1d25] border border-slate-200 shadow-md">
                          {service.category}
                        </span>
                      </div>

                      {/* Step Number Tag */}
                      <div className="absolute top-4 right-4">
                        <span className="text-xs font-mono font-bold px-2.5 py-1 rounded-md bg-black/60 backdrop-blur-md text-white border border-white/20">
                          0{index + 1}
                        </span>
                      </div>

                      {/* Subtitle banner */}
                      <div className="absolute bottom-4 left-4 right-4">
                        <span className="text-xs font-semibold text-slate-200 drop-shadow-md">
                          {service.subtitle}
                        </span>
                      </div>
                    </Link>

                    {/* Card Content */}
                    <div className="p-6 sm:p-7 flex-1 flex flex-col justify-between space-y-5">
                      <div className="space-y-3">
                        <Link to={detailUrl}>
                          <h3 className="font-heading text-xl font-bold text-slate-900 group-hover:text-[#ea1d25] transition-colors leading-snug">
                            {service.title}
                          </h3>
                        </Link>
                        <p className="text-sm text-slate-600 leading-relaxed line-clamp-3">
                          {service.shortDesc}
                        </p>
                      </div>

                      {/* Features list */}
                      <div className="space-y-2 border-t border-slate-100 pt-4">
                        {service.features.slice(0, 2).map((feat, i) => (
                          <div key={i} className="flex items-start gap-2.5 text-xs text-slate-700">
                            <CheckCircle2 className="w-4 h-4 text-[#00a4e4] shrink-0 mt-0.5" />
                            <span className="line-clamp-1">{feat}</span>
                          </div>
                        ))}
                      </div>

                      {/* Action Footer */}
                      <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                        <Link
                          to={detailUrl}
                          className="inline-flex items-center gap-1.5 text-sm font-extrabold text-[#ea1d25] hover:text-[#c41219] group-hover:translate-x-1 transition-all"
                        >
                          <span>Explore Service</span>
                          <ArrowRight className="w-4 h-4" />
                        </Link>

                        <button
                          onClick={() => {
                            if (typeof onOpenQuote === 'function') onOpenQuote(service.title);
                          }}
                          className="text-xs font-bold text-slate-500 hover:text-slate-900 px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 transition-colors"
                        >
                          Request Quote
                        </button>
                      </div>
                    </div>

                    {/* Bottom Accent Bar */}
                    <div className="h-1.5 w-full bg-slate-100 group-hover:bg-gradient-to-r group-hover:from-[#ea1d25] group-hover:to-[#00a4e4] transition-all duration-500" />
                  </div>
                </Reveal>
              );
            })}
          </div>

        </div>
      </section>

      {/* ========================================================= */}
      {/* 3. CAPABILITY SPOTLIGHT SECTION                           */}
      {/* ========================================================= */}
      <section className="py-16 sm:py-20 bg-slate-50 border-t border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Reveal animation="fade-up">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm flex items-start gap-4">
                <div className="p-3 rounded-xl bg-red-100 text-[#ea1d25] shrink-0">
                  <Award className="w-6 h-6" />
                </div>
                <div className="space-y-1">
                  <div className="text-xl font-black text-slate-900 font-heading">Class-1 Licensed</div>
                  <div className="text-xs text-slate-600">Dubai Municipality approved contractor #709421</div>
                </div>
              </div>

              <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm flex items-start gap-4">
                <div className="p-3 rounded-xl bg-sky-100 text-[#00a4e4] shrink-0">
                  <Truck className="w-6 h-6" />
                </div>
                <div className="space-y-1">
                  <div className="text-xl font-black text-slate-900 font-heading">50+ Heavy Units</div>
                  <div className="text-xs text-slate-600">Company-owned excavators, breakers &amp; tippers</div>
                </div>
              </div>

              <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm flex items-start gap-4">
                <div className="p-3 rounded-xl bg-emerald-100 text-emerald-600 shrink-0">
                  <HardHat className="w-6 h-6" />
                </div>
                <div className="space-y-1">
                  <div className="text-xl font-black text-slate-900 font-heading">Zero Safety Harm</div>
                  <div className="text-xs text-slate-600">Civil Defence &amp; OSHAD compliant operations</div>
                </div>
              </div>

              <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm flex items-start gap-4">
                <div className="p-3 rounded-xl bg-purple-100 text-purple-600 shrink-0">
                  <Building2 className="w-6 h-6" />
                </div>
                <div className="space-y-1">
                  <div className="text-xl font-black text-slate-900 font-heading">300+ Projects</div>
                  <div className="text-xs text-slate-600">Villas, high-rises, warehouses &amp; factories</div>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ========================================================= */}
      {/* 4. REQUEST A QUOTE CTA BANNER                             */}
      {/* ========================================================= */}
      <section className="relative py-16 sm:py-20 bg-gradient-to-r from-slate-950 via-slate-900 to-slate-950 text-white overflow-hidden border-t-2 border-[#ea1d25]">
        <div className="absolute top-0 right-10 w-96 h-96 bg-[#ea1d25]/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-10 w-96 h-96 bg-[#00a4e4]/15 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Reveal animation="fade-up">
            <div className="flex flex-col lg:flex-row items-center justify-between gap-10 text-center lg:text-left">
              <div className="space-y-3 max-w-2xl">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-500/10 border border-red-500/30 text-[#ea1d25] text-xs font-extrabold tracking-widest uppercase">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Free Project Consultation</span>
                </div>
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white font-heading tracking-tight leading-tight">
                  Looking for the best Demolition &amp; Recycling services?
                </h2>
                <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
                  Contact our engineering team for permit handling, method statements, and transparent feasibility pricing across the UAE.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row items-center gap-4 shrink-0">
                <button
                  onClick={() => {
                    if (typeof onOpenQuote === 'function') onOpenQuote();
                  }}
                  className="w-full sm:w-auto px-8 py-4 rounded-xl bg-gradient-to-r from-[#ea1d25] to-[#c41219] hover:from-[#ff2d35] hover:to-[#ea1d25] text-white font-extrabold text-xs sm:text-sm uppercase tracking-wider shadow-2xl shadow-red-950/70 flex items-center justify-center gap-2.5 transition-all transform hover:-translate-y-0.5 active:scale-95"
                >
                  <span>Request Free Quote</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <a
                  href={`tel:${COMPANY_INFO.phoneRaw}`}
                  className="w-full sm:w-auto px-7 py-4 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs sm:text-sm border border-slate-700 flex items-center justify-center gap-2 transition-all duration-300"
                >
                  <Phone className="w-4 h-4 text-[#ea1d25]" />
                  <span>{COMPANY_INFO.phone}</span>
                </a>

                <a
                  href={`https://wa.me/${COMPANY_INFO.whatsapp}?text=Hello%20Al%20Areesh%20Demolition,%20I%20need%20a%20service%20quote`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto px-7 py-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs sm:text-sm shadow-md flex items-center justify-center gap-2 transition-all duration-300"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>WhatsApp Direct</span>
                </a>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </div>
  );

  if (includeLayout) {
    return (
      <div className="min-h-screen bg-white text-slate-800 flex flex-col font-sans selection:bg-[#ea1d25] selection:text-white">
        <Header onOpenQuote={onOpenQuote} />
        <main className="flex-1">{content}</main>
        <Footer />
        <FloatingActions />
      </div>
    );
  }

  return content;
}
