import { useState } from 'react';
import { Link } from 'react-router-dom';
import { SERVICES } from '../data/companyData';
import { ArrowRight, Check, X, ExternalLink } from 'lucide-react';
import Reveal from './Reveal';

export default function ServicesSection({ onSelectServiceForQuote }) {
  const [activeFilter, setActiveFilter] = useState('All');
  const [selectedService, setSelectedService] = useState(null);

  const categories = ['All', 'Structural', 'Earthworks', 'Industrial', 'Recycling', 'Demolition', 'Logistics'];

  const filteredServices = activeFilter === 'All'
    ? SERVICES
    : SERVICES.filter((s) => s.category.toLowerCase() === activeFilter.toLowerCase());

  return (
    <section id="services" className="py-20 bg-slate-50/70 border-y border-slate-200 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <Reveal animation="fade-up">
          <div className="text-center max-w-3xl mx-auto space-y-3 mb-12">
            <span className="text-xs font-bold uppercase tracking-widest text-[#00a4e4] inline-block px-3 py-1 rounded-full bg-sky-50 border border-sky-200">
              Special Wrecking & Demolition Services
            </span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight">
              Comprehensive Demolition Solutions in Dubai & the UAE
            </h2>
            <p className="text-sm sm:text-base text-slate-600">
              From precision urban building dismantling to deep multi-acre basement excavation, our certified teams deliver turnkey site clearance on schedule and within budget.
            </p>

            {/* Filter Pills with Smooth Transitions */}
            <div className="flex flex-wrap items-center justify-center gap-1.5 pt-4">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveFilter(cat)}
                  className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all duration-300 transform active:scale-95 ${
                    activeFilter === cat
                      ? 'bg-[#ea1d25] text-white shadow-md shadow-red-500/20 border border-red-600 scale-105'
                      : 'bg-white text-slate-700 hover:text-[#00a4e4] hover:bg-slate-100 border border-slate-200 shadow-sm'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        </Reveal>

        {/* Services 6-Card Grid with Staggered Transitions */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredServices.map((service, index) => (
            <Reveal key={service.id} animation="fade-up" delay={index * 100}>
              <div
                className="group relative rounded-2xl bg-white border border-slate-200 hover:border-sky-400 transition-all duration-500 flex flex-col overflow-hidden hover:shadow-xl card-hover-transition h-full"
              >
                {/* Service Featured Image Container */}
                <Link
                  to={`/service/${service.slug}`}
                  className="relative h-48 sm:h-52 w-full overflow-hidden bg-slate-100 block"
                >
                  <img
                    src={service.image}
                    alt={service.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = service.fallbackImage;
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/30 to-transparent transition-opacity duration-300 group-hover:opacity-90" />
                  
                  {/* Category Pill on Image (Logo Sky Blue) */}
                  <div className="absolute top-3 left-3">
                    <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-md bg-white/95 backdrop-blur-md text-[#00a4e4] border border-slate-200 shadow-sm">
                      {service.category}
                    </span>
                  </div>

                  {/* Subtitle tag */}
                  <div className="absolute bottom-3 left-4 right-4">
                    <span className="text-xs font-semibold text-slate-200 tracking-wide drop-shadow-sm">
                      {service.subtitle}
                    </span>
                  </div>
                </Link>

                {/* Service Content */}
                <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                  <div className="space-y-2">
                    <Link to={`/service/${service.slug}`}>
                      <h3 className="font-heading text-lg font-bold text-slate-900 group-hover:text-[#ea1d25] transition-colors duration-300">
                        {service.title}
                      </h3>
                    </Link>
                    <p className="text-xs text-slate-600 leading-relaxed line-clamp-3">
                      {service.shortDesc}
                    </p>
                  </div>

                  {/* Feature Bullet points */}
                  <div className="space-y-1.5 border-t border-slate-100 pt-3">
                    {service.features.slice(0, 2).map((feat, i) => (
                      <div key={i} className="flex items-start gap-2 text-[11px] text-slate-700">
                        <Check className="w-3.5 h-3.5 text-[#00a4e4] shrink-0 mt-0.5 transition-transform duration-300 group-hover:scale-110" />
                        <span className="line-clamp-1">{feat}</span>
                      </div>
                    ))}
                  </div>

                  {/* Action Footers */}
                  <div className="pt-2 flex items-center justify-between border-t border-slate-100 text-xs">
                    <Link
                      to={`/service/${service.slug}`}
                      className="text-slate-700 hover:text-[#ea1d25] font-bold flex items-center gap-1 transition-colors duration-200"
                    >
                      <span>Explore Page</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>

                    <button
                      onClick={() => onSelectServiceForQuote(service.title)}
                      className="text-[#ea1d25] hover:text-red-700 font-bold flex items-center gap-1 group-hover:translate-x-1 transition-all duration-200"
                    >
                      <span>Get Quote</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                {/* Subtle bottom hover accent bar */}
                <div className="h-1 w-full bg-transparent group-hover:bg-gradient-to-r group-hover:from-[#ea1d25] group-hover:to-[#00a4e4] transition-all duration-500" />
              </div>
            </Reveal>
          ))}
        </div>

        {/* Bottom Banner callout */}
        <Reveal animation="zoom-in" delay={300}>
          <div className="mt-14 p-6 sm:p-8 rounded-2xl bg-white border border-slate-200 shadow-sm text-center flex flex-col sm:flex-row items-center justify-between gap-6 card-hover-transition">
            <div className="text-left space-y-1">
              <h4 className="text-base sm:text-lg font-bold text-slate-900 font-heading">
                Need a Custom Demolition Scope or Site Assessment?
              </h4>
              <p className="text-xs sm:text-sm text-slate-600">
                Our registered engineers provide comprehensive structural demolition methodology statements for Dubai Municipality review.
              </p>
            </div>
            <button
              onClick={() => onSelectServiceForQuote('Controlled Demolition Services')}
              className="shrink-0 px-6 py-3 text-xs font-bold uppercase tracking-wider text-white bg-gradient-to-r from-[#ea1d25] to-[#c41219] hover:from-[#ff2d35] hover:to-[#ea1d25] rounded-xl shadow-md transition-all duration-300 transform hover:-translate-y-0.5 border border-red-500/40 active:scale-[0.98]"
            >
              Consult Our Engineers
            </button>
          </div>
        </Reveal>

      </div>

      {/* Scope & Specs Modal with Smooth Backdrop & Scale Transition */}
      {selectedService && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm transition-opacity duration-300">
          <div className="relative w-full max-w-2xl bg-white border border-slate-200 rounded-2xl shadow-2xl overflow-hidden max-h-[90vh] flex flex-col transition-all duration-300 transform scale-100 animate-in zoom-in-95">
            
            {/* Modal Header */}
            <div className="p-6 border-b border-slate-100 flex items-start justify-between bg-slate-50/80">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-red-100 text-[#ea1d25] border border-red-200">
                  {selectedService.category}
                </span>
                <h3 className="font-heading text-xl font-bold text-slate-900 mt-1">
                  {selectedService.title}
                </h3>
                <p className="text-xs text-sky-700">{selectedService.subtitle}</p>
              </div>
              <button
                onClick={() => setSelectedService(null)}
                className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-200/60 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6 overflow-y-auto space-y-6 text-xs sm:text-sm">
              <div>
                <h4 className="font-bold text-slate-900 uppercase tracking-wider text-xs mb-2">
                  Service Description & Methodology
                </h4>
                <p className="text-slate-600 leading-relaxed">
                  {selectedService.fullDesc || selectedService.shortDesc}
                </p>
              </div>

              <div>
                <h4 className="font-bold text-slate-900 uppercase tracking-wider text-xs mb-2">
                  Included Project Deliverables
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {selectedService.features.map((feat, i) => (
                    <div key={i} className="flex items-start gap-2 text-slate-700 bg-slate-50 p-2.5 rounded-lg border border-slate-200">
                      <Check className="w-4 h-4 text-[#00a4e4] shrink-0 mt-0.5" />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="font-bold text-slate-900 uppercase tracking-wider text-xs mb-2">
                  Dedicated In-House Equipment Deployed
                </h4>
                <div className="flex flex-wrap gap-2">
                  {selectedService.equipment.map((eq, i) => (
                    <span
                      key={i}
                      className="px-3 py-1 text-xs rounded-md bg-sky-50 border border-sky-200 text-[#00a4e4] font-medium"
                    >
                      {eq}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="p-4 border-t border-slate-100 bg-slate-50 flex items-center justify-between">
              <Link
                to={`/service/${selectedService.slug}`}
                onClick={() => setSelectedService(null)}
                className="text-xs font-bold text-[#00a4e4] hover:underline flex items-center gap-1"
              >
                <span>Full Technical Specifications Page</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </Link>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setSelectedService(null)}
                  className="px-4 py-2 text-xs font-semibold text-slate-600 hover:text-slate-900 transition-colors"
                >
                  Close
                </button>
                <button
                  onClick={() => {
                    const title = selectedService.title;
                    setSelectedService(null);
                    onSelectServiceForQuote(title);
                  }}
                  className="px-6 py-2.5 text-xs font-bold uppercase tracking-wider text-white bg-gradient-to-r from-[#ea1d25] to-[#c41219] hover:from-[#ff2d35] hover:to-[#ea1d25] rounded-lg shadow-md flex items-center gap-1.5 border border-red-500/40 transition-all transform hover:scale-[1.02] active:scale-[0.98]"
                >
                  <span>Request Quote</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>

          </div>
        </div>
      )}
    </section>
  );
}
