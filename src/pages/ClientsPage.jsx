import { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  ShieldCheck, 
  ExternalLink, 
  ArrowRight, 
  Phone, 
  MessageSquare,
  Award,
  Users
} from 'lucide-react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import FloatingActions from '../components/FloatingActions';
import Reveal from '../components/Reveal';
import { CLIENTS } from '../data/clientsData';
import { COMPANY_INFO } from '../data/companyData';

export default function ClientsPage({ includeLayout = true, onOpenQuote }) {
  const [activeFilter, setActiveFilter] = useState('All');

  const filterCategories = [
    'All',
    'Government Entity',
    'Master Developer',
    'Contractor',
    'Holding Group',
    'Conglomerate'
  ];

  const filteredClients = activeFilter === 'All'
    ? CLIENTS
    : CLIENTS.filter((c) => c.category === activeFilter);

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
        aria-label="Our Clients Banner"
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
              Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#ea1d25] via-red-400 to-[#00a4e4]">Clients</span>
            </h1>

            <p className="max-w-2xl mx-auto text-sm sm:text-base md:text-lg text-slate-300 font-normal leading-relaxed mt-3">
              Trusted by Dubai Municipality, Dubai Holding, Nakheel, and top developers across the UAE.
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
              <span className="text-[#ea1d25] font-bold">Our Clients</span>
            </nav>
          </Reveal>
        </div>
      </section>

      {/* ========================================================= */}
      {/* 2. STATS & CREDENTIALS BANNER                            */}
      {/* ========================================================= */}
      <section className="bg-slate-50 border-b border-slate-200/80 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Reveal animation="fade-up" delay={80}>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
              <div className="p-4 rounded-xl bg-white border border-slate-200 shadow-xs">
                <div className="text-2xl sm:text-3xl font-black text-[#ea1d25] font-heading">26+</div>
                <div className="text-xs sm:text-sm font-bold text-slate-800 mt-1">Esteemed Clients</div>
                <div className="text-[11px] text-slate-500">Government &amp; Private</div>
              </div>

              <div className="p-4 rounded-xl bg-white border border-slate-200 shadow-xs">
                <div className="text-2xl sm:text-3xl font-black text-[#00a4e4] font-heading">300+</div>
                <div className="text-xs sm:text-sm font-bold text-slate-800 mt-1">Completed Sites</div>
                <div className="text-[11px] text-slate-500">Demolition &amp; Excavation</div>
              </div>

              <div className="p-4 rounded-xl bg-white border border-slate-200 shadow-xs">
                <div className="text-2xl sm:text-3xl font-black text-slate-900 font-heading">12+</div>
                <div className="text-xs sm:text-sm font-bold text-slate-800 mt-1">Years in UAE</div>
                <div className="text-[11px] text-slate-500">Established Track Record</div>
              </div>

              <div className="p-4 rounded-xl bg-white border border-slate-200 shadow-xs">
                <div className="text-2xl sm:text-3xl font-black text-emerald-600 font-heading">100%</div>
                <div className="text-xs sm:text-sm font-bold text-slate-800 mt-1">Permit Compliance</div>
                <div className="text-[11px] text-slate-500">Dubai Municipality &amp; Civil Defence</div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ========================================================= */}
      {/* 3. CLIENTS SECTION                                       */}
      {/* ========================================================= */}
      <section className="py-16 sm:py-24 bg-white relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          
          {/* Section Header */}
          <Reveal animation="fade-up">
            <div className="text-center max-w-3xl mx-auto space-y-4">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-red-50 border border-red-200 text-[#ea1d25] text-xs font-bold tracking-wider uppercase">
                <Users className="w-3.5 h-3.5" />
                <span>Proven Track Record</span>
              </div>

              <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-slate-900 tracking-tight font-heading leading-tight">
                Our Esteemed Clients
              </h2>

              <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
                Trusted by government entities, developers, contractors, and consultants across the UAE. Over the past decade, Al Areesh Wrecking &amp; Demolition Works LLC has forged enduring partnerships with the region&apos;s foremost property developers, municipal authorities, and construction giants.
              </p>

              {/* Filter Pills */}
              <div className="flex flex-wrap items-center justify-center gap-2 pt-4">
                {filterCategories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setActiveFilter(cat)}
                    className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all duration-300 transform active:scale-95 ${
                      activeFilter === cat
                        ? 'bg-[#ea1d25] text-white shadow-lg shadow-red-500/20 scale-105'
                        : 'bg-slate-100 text-slate-700 hover:text-[#ea1d25] hover:bg-slate-200/80 border border-slate-200/60'
                    }`}
                  >
                    {cat === 'All' ? 'All Clients (26)' : cat}
                  </button>
                ))}
              </div>
            </div>
          </Reveal>

          {/* Clean, Well-Organized Responsive Grid with Equal-Sized Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {filteredClients.map((client, index) => {
              const hasUrl = Boolean(client.url);

              const CardContent = (
                <div
                  className={`h-full flex flex-col justify-between items-center text-center p-6 rounded-2xl bg-white border transition-all duration-300 relative ${
                    hasUrl
                      ? 'border-slate-200/90 hover:border-[#ea1d25] hover:shadow-xl hover:-translate-y-1.5 shadow-xs cursor-pointer group'
                      : 'border-slate-200/60 bg-slate-50/50 shadow-xs cursor-default'
                  }`}
                >
                  {/* Top: Logo or Professional Initial Monogram */}
                  <div className="w-full flex flex-col items-center">
                    <div className="h-20 w-full flex items-center justify-center mb-4 px-2 bg-slate-50/60 rounded-xl border border-slate-100 group-hover:bg-white group-hover:border-slate-200 transition-colors">
                      {client.logo ? (
                        <img
                          src={client.logo}
                          alt={`${client.name} official logo`}
                          className="max-h-14 max-w-[85%] object-contain transition-transform duration-300 group-hover:scale-105"
                          onError={(e) => {
                            // Gracefully fallback to styled monogram if image cannot load
                            e.target.style.display = 'none';
                            const fallback = e.target.parentElement.querySelector('.fallback-monogram');
                            if (fallback) fallback.style.display = 'flex';
                          }}
                        />
                      ) : null}

                      {/* Professional Monogram fallback */}
                      <div
                        className={`fallback-monogram w-14 h-14 rounded-xl bg-gradient-to-br from-[#ea1d25] to-[#c41219] text-white flex items-center justify-center font-black text-xl shadow-md shadow-red-500/20 group-hover:scale-105 transition-transform duration-300 ${
                          client.logo ? 'hidden' : 'flex'
                        }`}
                      >
                        {client.initials}
                      </div>
                    </div>

                    {/* Company Name */}
                    <h3 className="font-heading font-bold text-slate-900 text-sm sm:text-base leading-snug group-hover:text-[#ea1d25] transition-colors line-clamp-2 min-h-[44px] flex items-center justify-center">
                      {client.name}
                    </h3>
                  </div>

                  {/* Bottom: Note & Link Status */}
                  <div className="mt-4 pt-3 border-t border-slate-100 w-full flex flex-col items-center space-y-2">
                    <span className="text-[11px] font-semibold text-slate-500 bg-slate-100 px-3 py-1 rounded-full line-clamp-1">
                      {client.note}
                    </span>

                    {hasUrl ? (
                      <span className="inline-flex items-center gap-1 text-[11px] font-bold text-[#ea1d25] group-hover:text-[#c41219] transition-colors">
                        <span>Visit Website</span>
                        <ExternalLink className="w-3 h-3 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                      </span>
                    ) : (
                      <span className="text-[11px] font-medium text-slate-400">
                        Profile Listing
                      </span>
                    )}
                  </div>
                </div>
              );

              return hasUrl ? (
                <Reveal key={client.id} animation="fade-up" delay={(index % 4) * 60}>
                  <a
                    href={client.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block h-full no-underline"
                    title={`Visit ${client.name} official website`}
                  >
                    {CardContent}
                  </a>
                </Reveal>
              ) : (
                <Reveal key={client.id} animation="fade-up" delay={(index % 4) * 60}>
                  <div className="h-full">
                    {CardContent}
                  </div>
                </Reveal>
              );
            })}
          </div>

        </div>
      </section>

      {/* ========================================================= */}
      {/* 4. TRUST ASSURANCE BANNER                                */}
      {/* ========================================================= */}
      <section className="py-14 bg-slate-50 border-t border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Reveal animation="fade-up">
            <div className="rounded-3xl bg-white border border-slate-200 p-8 sm:p-12 shadow-sm text-center max-w-4xl mx-auto space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-sky-50 border border-sky-200 text-[#00a4e4] text-xs font-bold tracking-wider uppercase">
              <Award className="w-3.5 h-3.5" />
              <span>Partner With Dubai&apos;s Best</span>
            </div>

            <h3 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight font-heading">
              Ready to Partner With Al Areesh Demolition?
            </h3>

            <p className="text-slate-600 text-sm sm:text-base leading-relaxed max-w-2xl mx-auto">
              Whether you require precision controlled building demolition, deep multi-level basement excavation, or certified recycling and site clearance, our registered engineers ensure seamless execution and zero municipal delays.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
              <button
                onClick={() => {
                  if (typeof onOpenQuote === 'function') onOpenQuote();
                }}
                className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-gradient-to-r from-[#ea1d25] to-[#c41219] hover:from-[#ff2d35] hover:to-[#ea1d25] text-white font-extrabold text-xs sm:text-sm uppercase tracking-wider shadow-lg shadow-red-500/20 flex items-center justify-center gap-2 transition-all transform hover:-translate-y-0.5 active:scale-95"
              >
                <span>Request Project Proposal</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <a
                href={`tel:${COMPANY_INFO.phoneRaw}`}
                className="w-full sm:w-auto px-7 py-3.5 rounded-xl bg-slate-100 hover:bg-slate-200/80 text-slate-800 font-bold text-xs sm:text-sm border border-slate-200 flex items-center justify-center gap-2 transition-all duration-300"
              >
                <Phone className="w-4 h-4 text-[#ea1d25]" />
                <span>Call {COMPANY_INFO.phone}</span>
              </a>

              <a
                href={`https://wa.me/${COMPANY_INFO.whatsapp}?text=Hello%20Al%20Areesh%20Demolition,%20I%20would%20like%20to%20discuss%20a%20demolition%20partnership`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto px-7 py-3.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs sm:text-sm shadow-sm flex items-center justify-center gap-2 transition-all duration-300"
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
