import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { 
  CheckCircle2, 
  ArrowRight, 
  Phone, 
  MessageSquare, 
  ShieldCheck, 
  Plus, 
  Minus, 
  Clock, 
  Sparkles, 
  ChevronRight
} from 'lucide-react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import FloatingActions from '../components/FloatingActions';
import Reveal from '../components/Reveal';
import { DETAILED_SERVICES } from '../data/servicesDetailedData';
import { SERVICES, COMPANY_INFO } from '../data/companyData';

export default function ServiceDetailPage({ includeLayout = true, onOpenQuote, customSlug }) {
  const { slug } = useParams();

  // Scroll to top on slug change
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug, customSlug]);

  // Find service by slug or fallback
  const currentSlug = customSlug || slug || 'controlled-demolition-services';
  const service = DETAILED_SERVICES[currentSlug] || 
                  DETAILED_SERVICES['controlled-demolition-services'];

  // State for interactive FAQs accordion
  const [openFaqIndex, setOpenFaqIndex] = useState(0);

  const toggleFaq = (index) => {
    setOpenFaqIndex((prev) => (prev === index ? -1 : index));
  };

  // Safe derived values to prevent runtime crashes from missing properties
  const pageTitle = service.title || 'Specialized Demolition Service';
  const overviewHeadline = service.overview?.headline || `${pageTitle} in Dubai`;
  const overviewParagraphs = Array.isArray(service.overview?.paragraphs) ? service.overview.paragraphs : [];
  const subServicesList = Array.isArray(service.subServices) ? service.subServices : [];
  const processHeadline = service.process?.headline || 'Our Engineering Methodology';
  const processSteps = Array.isArray(service.process?.steps) ? service.process.steps : [];

  const safetyHeadline = service.safetyFocus?.headline || service.safety?.headline || 'Strict Safety & Compliance Protocols';
  const safetyDesc = service.safetyFocus?.description || (Array.isArray(service.safety?.points) && service.safety.points.length > 0 ? service.safety.points[0] : 'Strict adherence to Dubai Municipality and Civil Defence safety regulations.');
  const safetyPoints = Array.isArray(service.safety?.points) ? service.safety.points : [];

  const costHeadline = service.costFactors?.headline || `Factors Influencing ${pageTitle} Cost`;
  const costParagraphs = Array.isArray(service.costFactors?.paragraphs) ? service.costFactors.paragraphs : [];
  const costItems = Array.isArray(service.costFactors?.items) && service.costFactors.items.length > 0
    ? service.costFactors.items
    : Array.isArray(service.costFactors?.factors)
      ? service.costFactors.factors.map((f) => (typeof f === 'string' ? f : `${f.name}: ${f.detail}`))
      : [];

  const faqsList = Array.isArray(service.faqs) ? service.faqs : [];

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
        aria-label="Service Page Banner"
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

            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-white tracking-tight font-heading drop-shadow-md mt-3">
              {pageTitle}
            </h1>

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
              <Link
                to="/services"
                className="text-slate-300 hover:text-white transition-colors"
              >
                Services
              </Link>
              <span className="text-slate-500">›</span>
              <span className="text-[#ea1d25] font-bold">{pageTitle}</span>
            </nav>
          </Reveal>
        </div>
      </section>

      {/* ========================================================= */}
      {/* 2. MAIN 2-COLUMN CONTENT & SIDEBAR SECTION                */}
      {/* ========================================================= */}
      <section className="py-14 sm:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12">
            
            {/* =================================================== */}
            {/* LEFT / MAIN COLUMN (8 Cols)                         */}
            {/* =================================================== */}
            <div className="lg:col-span-8 space-y-12">
              
              {/* Featured Image Container */}
              <Reveal animation="fade-up">
                <div className="relative rounded-3xl overflow-hidden shadow-2xl border border-slate-200 bg-slate-950">
                  <img
                    src={service.image}
                    alt={service.title}
                    className="w-full h-[360px] sm:h-[440px] md:h-[480px] object-cover"
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = service.fallbackImage;
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />
                  
                  {/* Floating Bottom Badge on Image */}
                  <div className="absolute bottom-5 left-5 right-5 p-4 rounded-2xl bg-white/95 backdrop-blur-md border border-slate-200/80 shadow-lg flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-[#ea1d25] text-white flex items-center justify-center font-black shrink-0">
                        AAD
                      </div>
                      <div>
                        <div className="text-[11px] font-bold text-[#ea1d25] uppercase tracking-wider">
                          Turnkey Certified Work
                        </div>
                        <div className="text-sm font-extrabold text-slate-900">
                          Al Areesh Wrecking &amp; Demolition Works LLC
                        </div>
                      </div>
                    </div>
                    <span className="hidden sm:inline-block text-xs font-mono font-bold px-3 py-1 rounded-md bg-emerald-100 text-emerald-800">
                      DM Permitted
                    </span>
                  </div>
                </div>
              </Reveal>

              {/* Overview & Description Section */}
              <Reveal animation="fade-up">
                <div className="space-y-5">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-50 border border-red-200 text-[#ea1d25] text-xs font-bold tracking-wider uppercase">
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>Technical Overview</span>
                  </div>

                  <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-slate-900 tracking-tight font-heading leading-tight">
                    {overviewHeadline}
                  </h2>

                  <div className="space-y-4 text-slate-700 text-base sm:text-lg leading-relaxed font-normal">
                    {overviewParagraphs.map((p, i) => (
                      <p key={i}>{p}</p>
                    ))}
                  </div>
                </div>
              </Reveal>

              {/* Sub-Services 6-Card Grid */}
              {subServicesList.length > 0 && (
                <Reveal animation="fade-up">
                  <div className="space-y-6 pt-4 border-t border-slate-200">
                    <div className="space-y-2">
                      <div className="text-xs font-extrabold text-[#ea1d25] uppercase tracking-widest">
                        * SPECIALIZED SCOPE *
                      </div>
                      <h3 className="text-2xl sm:text-3xl font-black text-slate-900 font-heading">
                        {pageTitle} in Dubai
                      </h3>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      {subServicesList.map((sub, idx) => (
                        <div
                          key={idx}
                          className="p-5 rounded-2xl bg-slate-50 border border-slate-200 hover:border-red-200 hover:shadow-lg transition-all duration-300 space-y-2"
                        >
                          <div className="w-10 h-10 rounded-xl bg-white border border-slate-200 flex items-center justify-center text-[#ea1d25] shadow-xs">
                            <CheckCircle2 className="w-5 h-5" />
                          </div>
                          <h4 className="text-base font-bold text-slate-900 font-heading">
                            {sub.title}
                          </h4>
                          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                            {sub.desc}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                </Reveal>
              )}

              {/* Step-by-Step Work Process */}
              {processSteps.length > 0 && (
                <Reveal animation="fade-up">
                  <div className="space-y-6 pt-6 border-t border-slate-200">
                    <div className="space-y-2">
                      <div className="text-xs font-extrabold text-[#ea1d25] uppercase tracking-widest">
                        * ENGINEERING METHODOLOGY *
                      </div>
                      <h3 className="text-2xl sm:text-3xl font-black text-slate-900 font-heading">
                        {processHeadline}
                      </h3>
                    </div>

                    <div className="space-y-3.5">
                      {processSteps.map((step, idx) => (
                        <div
                          key={idx}
                          className="p-4 sm:p-5 rounded-2xl bg-white border border-slate-200 hover:border-slate-300 shadow-sm flex items-start gap-4 transition-all"
                        >
                          <div className="w-10 h-10 rounded-xl bg-[#ea1d25] text-white flex items-center justify-center font-mono font-bold text-sm shrink-0 shadow-sm">
                            {step.step}
                          </div>
                          <div className="space-y-1">
                            <h4 className="text-base font-bold text-slate-900 font-heading">
                              {step.title}
                            </h4>
                            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                              {step.desc}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </Reveal>
              )}

              {/* Dark Accent Safety & Live Operations Section */}
              <Reveal animation="fade-up">
                <div className="p-7 sm:p-9 rounded-3xl bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-white shadow-2xl border border-slate-800 space-y-4 relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-64 h-64 bg-[#ea1d25]/15 rounded-full blur-3xl pointer-events-none" />
                  
                  <div className="inline-flex items-center gap-2 text-[#00a4e4] text-xs font-bold uppercase tracking-wider">
                    <ShieldCheck className="w-4 h-4" />
                    <span>Strict Safety Protocols</span>
                  </div>

                  <h3 className="text-xl sm:text-2xl font-black font-heading text-white">
                    {safetyHeadline}
                  </h3>

                  <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
                    {safetyDesc}
                  </p>

                  {safetyPoints.length > 0 && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-2">
                      {safetyPoints.map((pt, i) => (
                        <div key={i} className="flex items-start gap-2 text-xs text-slate-300">
                          <CheckCircle2 className="w-3.5 h-3.5 text-[#00a4e4] shrink-0 mt-0.5" />
                          <span>{pt}</span>
                        </div>
                      ))}
                    </div>
                  )}

                  <div className="pt-2 flex flex-wrap gap-2 text-xs font-medium text-slate-400">
                    <span className="px-3 py-1 rounded-lg bg-white/5 border border-white/10">
                      Dubai Municipality Permits
                    </span>
                    <span className="px-3 py-1 rounded-lg bg-white/5 border border-white/10">
                      Vibration Damping
                    </span>
                    <span className="px-3 py-1 rounded-lg bg-white/5 border border-white/10">
                      Dust Mist Cannons
                    </span>
                  </div>
                </div>
              </Reveal>

              {/* Cost & Pricing Factors Section */}
              <Reveal animation="fade-up">
                <div className="space-y-5 pt-4 border-t border-slate-200">
                  <div className="space-y-2">
                    <div className="text-xs font-extrabold text-[#ea1d25] uppercase tracking-widest">
                      * TRANSPARENT ESTIMATION *
                    </div>
                    <h3 className="text-2xl sm:text-3xl font-black text-slate-900 font-heading">
                      {costHeadline}
                    </h3>
                  </div>

                  {costParagraphs.length > 0 && (
                    <div className="space-y-3 text-sm sm:text-base text-slate-700 leading-relaxed">
                      {costParagraphs.map((p, i) => (
                        <p key={i}>{p}</p>
                      ))}
                    </div>
                  )}

                  {costItems.length > 0 && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-2">
                      {costItems.map((item, i) => (
                        <div
                          key={i}
                          className="flex items-center gap-2.5 p-3 rounded-xl bg-slate-50 border border-slate-200 text-xs sm:text-sm text-slate-800 font-medium"
                        >
                          <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                          <span>{item}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </Reveal>

              {/* Service-Specific FAQs Accordion */}
              {faqsList.length > 0 && (
                <Reveal animation="fade-up">
                  <div className="space-y-6 pt-6 border-t border-slate-200">
                    <div className="space-y-2">
                      <div className="text-xs font-extrabold text-[#ea1d25] uppercase tracking-widest">
                        * COMMON QUESTIONS *
                      </div>
                      <h3 className="text-2xl sm:text-3xl font-black text-slate-900 font-heading">
                        {pageTitle}: Frequently Asked Questions
                      </h3>
                    </div>

                    <div className="space-y-3">
                      {faqsList.map((faq, idx) => {
                        const questionText = faq.question || faq.q || `Question #${idx + 1}`;
                        const answerText = faq.answer || faq.a || 'Contact our engineering team for full specifications.';
                        const isOpen = openFaqIndex === idx;

                        return (
                          <div
                            key={idx}
                            className={`rounded-2xl transition-all duration-300 overflow-hidden border ${
                              isOpen
                                ? 'bg-white border-[#ea1d25]/50 shadow-md border-l-4 border-l-[#ea1d25]'
                                : 'bg-white border-slate-200 shadow-xs hover:border-slate-300'
                            }`}
                          >
                            <button
                              onClick={() => toggleFaq(idx)}
                              className="w-full text-left p-5 text-base font-bold text-slate-900 flex items-center justify-between gap-4 focus:outline-none"
                              aria-expanded={isOpen}
                            >
                              <span className="font-heading leading-snug">{questionText}</span>
                              <span className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 ${
                                isOpen ? 'bg-[#ea1d25] text-white' : 'bg-slate-100 text-slate-700'
                              }`}>
                                {isOpen ? <Minus className="w-3.5 h-3.5" /> : <Plus className="w-3.5 h-3.5" />}
                              </span>
                            </button>

                            <div
                              className={`transition-all duration-300 ease-in-out overflow-hidden ${
                                isOpen ? 'max-h-[300px] opacity-100' : 'max-h-0 opacity-0'
                              }`}
                            >
                              <div className="px-5 pb-5 text-slate-600 text-sm leading-relaxed border-t border-slate-100 pt-3">
                                <p>{answerText}</p>
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </Reveal>
              )}

              {/* Bottom Project Inquiry CTA Box */}
              <Reveal animation="fade-up">
                <div className="p-8 rounded-3xl bg-slate-50 border border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-6">
                  <div className="space-y-1 text-center sm:text-left">
                    <h4 className="text-xl font-bold text-slate-900 font-heading">
                      Plan Your {pageTitle} in Dubai
                    </h4>
                    <p className="text-xs sm:text-sm text-slate-600">
                      Get an engineering review, method statement, and formal quote within 24 hours.
                    </p>
                  </div>

                  <button
                    onClick={() => {
                      if (typeof onOpenQuote === 'function') onOpenQuote(pageTitle);
                    }}
                    className="px-8 py-3.5 rounded-xl bg-[#ea1d25] hover:bg-[#c41219] text-white font-extrabold text-xs uppercase tracking-wider shadow-lg shadow-red-950/20 flex items-center gap-2 shrink-0 transition-all transform hover:-translate-y-0.5"
                  >
                    <span>Request Scope Quote</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </Reveal>

            </div>

            {/* =================================================== */}
            {/* RIGHT COLUMN / SIDEBAR (4 Cols)                     */}
            {/* =================================================== */}
            <div className="lg:col-span-4">
              <Reveal animation="fade-left" delay={150}>
                <div className="p-6 rounded-3xl bg-slate-50 border border-slate-200 shadow-sm space-y-4 sticky top-24">
                <div className="border-b border-slate-200 pb-3 flex items-center justify-between">
                  <h3 className="font-heading text-lg font-black text-slate-900">
                    All Services
                  </h3>
                  <span className="text-xs font-mono font-bold text-[#ea1d25]">
                    11 Services
                  </span>
                </div>

                <ul className="space-y-2">
                  {SERVICES.map((srv) => {
                    const isActive = srv.slug === currentSlug;
                    return (
                      <li key={srv.id}>
                        <Link
                          to={`/service/${srv.slug}`}
                          className={`flex items-center justify-between p-3.5 rounded-xl text-xs sm:text-sm font-bold transition-all duration-200 ${
                            isActive
                              ? 'bg-[#ea1d25] text-white shadow-md shadow-red-500/20 scale-[1.02]'
                              : 'bg-white text-slate-700 hover:text-[#ea1d25] hover:bg-slate-100 border border-slate-200/60'
                          }`}
                        >
                          <span className="line-clamp-1">{srv.title}</span>
                          <ChevronRight className={`w-4 h-4 shrink-0 transition-transform ${
                            isActive ? 'translate-x-1' : ''
                          }`} />
                        </Link>
                      </li>
                    );
                  })}
                </ul>

                {/* Need Urgent Site Assistance Card */}
                <div className="mt-6 p-6 rounded-2xl bg-gradient-to-br from-slate-900 to-slate-800 text-white shadow-xl space-y-4">
                  <div className="flex items-center gap-2 text-[#00a4e4] text-xs font-bold uppercase tracking-wider">
                    <Clock className="w-4 h-4" />
                    <span>24/7 Rapid Response</span>
                  </div>

                  <h4 className="text-lg font-black font-heading text-white leading-snug">
                    Need Urgent Demolition or Site Clearance?
                  </h4>

                  <p className="text-xs text-slate-300 leading-relaxed">
                    Our certified duty managers and site inspectors are available 24/7 for emergency site mobilization across Dubai.
                  </p>

                  <div className="space-y-2.5 pt-1">
                    <a
                      href={`tel:${COMPANY_INFO.phoneRaw}`}
                      className="w-full py-3 rounded-xl bg-white text-slate-900 hover:bg-slate-100 font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-sm transition-all"
                    >
                      <Phone className="w-3.5 h-3.5 text-[#ea1d25]" />
                      <span>{COMPANY_INFO.phone}</span>
                    </a>

                    <a
                      href={`https://wa.me/${COMPANY_INFO.whatsapp}?text=Hello%20Al%20Areesh%20Demolition,%20I%20need%20assistance%20for%20${encodeURIComponent(pageTitle)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-sm transition-all"
                    >
                      <MessageSquare className="w-3.5 h-3.5" />
                      <span>WhatsApp Direct</span>
                    </a>
                  </div>
                </div>

                {/* Municipality Credential Stamp */}
                <div className="p-5 rounded-2xl bg-white border border-slate-200 text-center space-y-2">
                  <ShieldCheck className="w-8 h-8 text-[#00a4e4] mx-auto" />
                  <div className="text-xs font-black uppercase text-slate-900">
                    Dubai Municipality Licensed
                  </div>
                  <div className="text-[11px] font-mono text-slate-500 font-bold">
                    License #709421 • Class-1 Contractor
                  </div>
                  <div className="text-[10px] text-slate-400">
                    100% Permit Acquisition &amp; NOC Clearances Handled
                  </div>
                </div>

              </div>
            </Reveal>
          </div>

          </div>
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
