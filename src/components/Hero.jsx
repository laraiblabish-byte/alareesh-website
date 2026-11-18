import { useState, useEffect, useRef, useCallback } from 'react';
import { Phone, ArrowRight, CheckCircle2, ChevronLeft, ChevronRight, MessageSquare, Truck, Shield, HardHat, Award } from 'lucide-react';
import { COMPANY_INFO } from '../data/companyData';

const SLIDES = [
  {
    id: 1,
    tag: 'Dubai Municipality Licensed Class-1 • Since 2014',
    tagIcon: Award,
    title: 'Al Areesh Wrecking & Demolition',
    titleHighlight: 'Premier Controlled Demolition in Dubai',
    desc: 'Specialized in engineered building demolition, villa dismantling, and high-reach concrete breaking across Dubai, Sharjah, and Abu Dhabi with certified operators and zero safety incidents.',
    primaryBtn: {
      text: 'Request Free Demolition Quote',
      action: 'quote',
      icon: ArrowRight
    },
    secondaryBtn: {
      text: `Call ${COMPANY_INFO.phone}`,
      href: `tel:${COMPANY_INFO.phoneRaw}`,
      icon: Phone
    },
    features: [
      'Zero Recordable Incidents',
      'Dubai Municipality Permits Handled',
      'Class-1 Certified Engineers'
    ],
    image: '/real-hero-1.png',
    fallbackImage: '/real-demolition.png'
  },
  {
    id: 2,
    tag: 'Turnkey Site Preparation • Dubai Municipality Approved',
    tagIcon: Shield,
    title: 'Turnkey Site Clearance & Bulk Excavation',
    titleHighlight: 'Advanced Earthworks & Concrete Recycling',
    desc: 'Providing environmentally compliant bulk excavation, shoring, site leveling, and rubble crushing with high-pressure dust suppression and maximum project efficiency.',
    primaryBtn: {
      text: 'Explore Our Heavy Fleet',
      href: '#fleet',
      icon: ArrowRight
    },
    secondaryBtn: {
      text: 'Calculate Project Budget',
      href: '#estimator',
      icon: HardHat
    },
    features: [
      'Water Mist Dust Suppression',
      'Deep Foundation Excavation',
      'Clean Municipality Site Handover'
    ],
    image: '/real-urban-excavation.png',
    fallbackImage: '/real-excavation.png'
  },
  {
    id: 3,
    tag: 'Heavy Fleet Logistics • Approved Waste Disposal',
    tagIcon: Truck,
    title: 'Commercial Fleet & Material Logistics',
    titleHighlight: 'Rapid Mobilization with 50+ Heavy Machinery Units',
    desc: 'Operating company-owned heavy excavators, hydraulic rock breakers, and 45-ton tippers 24/7 with certified waste transit permits to Dubai Municipality approved landfills.',
    primaryBtn: {
      text: 'Consult Our Structural Engineers',
      action: 'quote',
      icon: ArrowRight
    },
    secondaryBtn: {
      text: 'WhatsApp Direct Chat',
      href: `https://wa.me/${COMPANY_INFO.whatsapp}?text=Hello%20Al%20Areesh%20Demolition,%20I%20need%20a%20quote%20for%20a%20project`,
      icon: MessageSquare,
      isExternal: true
    },
    features: [
      '24/7 Fleet Mobilization',
      '50+ Company-Owned Units',
      'Approved Landfill Disposal'
    ],
    image: '/trasport.png',
    fallbackImage: '/real-industrial-dismantling.png'
  }
];

export default function Hero({ onOpenQuote }) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const touchStartX = useRef(null);

  const totalSlides = SLIDES.length;

  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev + 1) % totalSlides);
  }, [totalSlides]);

  const prevSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev - 1 + totalSlides) % totalSlides);
  }, [totalSlides]);

  // Automatic sliding interval (5.5 seconds)
  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(() => {
      nextSlide();
    }, 5500);
    return () => clearInterval(interval);
  }, [isPaused, nextSlide]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'ArrowLeft') prevSlide();
      if (e.key === 'ArrowRight') nextSlide();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [nextSlide, prevSlide]);

  // Touch Swipe Handlers for Mobile
  const handleTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e) => {
    if (touchStartX.current === null) return;
    const touchEndX = e.changedTouches[0].clientX;
    const diff = touchStartX.current - touchEndX;
    if (Math.abs(diff) > 50) {
      if (diff > 0) nextSlide();
      else prevSlide();
    }
    touchStartX.current = null;
  };

  const slide = SLIDES[currentSlide];
  const TagIcon = slide.tagIcon;

  return (
    <section
      id="hero"
      className="relative min-h-[580px] sm:min-h-[640px] lg:min-h-[700px] xl:min-h-[760px] flex items-center justify-center overflow-hidden bg-slate-950"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      aria-roledescription="carousel"
      aria-label="Al Areesh Demolition Featured Works Slider"
    >
      {/* Slide Background Images with Cross-Fade & Subtle Ken Burns Zoom */}
      {SLIDES.map((s, index) => {
        const isActive = index === currentSlide;
        return (
          <div
            key={s.id}
            aria-hidden={!isActive}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
              isActive ? 'opacity-100 z-0' : 'opacity-0 pointer-events-none'
            }`}
          >
            <img
              src={s.image}
              alt={s.title}
              className={`w-full h-full object-cover transition-transform duration-7000 ease-out ${
                isActive ? 'scale-105' : 'scale-100'
              }`}
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = s.fallbackImage;
              }}
            />
            {/* Soft transparent gradient overlay so the pictures are clearly visible and vibrant */}
            <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/45 to-black/10" />
            <div className="absolute inset-0 bg-black/15" />
          </div>
        );
      })}

      {/* Main Slide Content Container (Spacious Layout without Card Obstruction) */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20 lg:py-28 w-full">
        <div className="max-w-3xl lg:max-w-4xl text-left space-y-6">
          
          {/* Accreditation Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-black/40 backdrop-blur-md border border-white/25 text-white shadow-lg animate-in fade-in slide-in-from-top duration-500">
            <span className="flex h-2 w-2 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#00a4e4] opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[#00a4e4]"></span>
            </span>
            <TagIcon className="w-3.5 h-3.5 text-[#00a4e4] shrink-0" />
            <span className="text-xs font-bold tracking-wider uppercase drop-shadow-sm">
              {slide.tag}
            </span>
          </div>

          {/* Slide Title with Logo Color Gradient */}
          <div className="space-y-2 animate-in fade-in slide-in-from-bottom-2 duration-700">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-white leading-[1.12] tracking-tight drop-shadow-[0_3px_12px_rgba(0,0,0,0.85)]">
              {slide.title}
              <span className="block mt-2 text-transparent bg-clip-text bg-gradient-to-r from-[#ea1d25] via-red-500 to-[#00a4e4] drop-shadow-sm">
                {slide.titleHighlight}
              </span>
            </h1>
          </div>

          {/* Slide Description */}
          <p className="text-sm sm:text-base md:text-lg text-slate-100 max-w-2xl font-normal leading-relaxed drop-shadow-[0_2px_8px_rgba(0,0,0,0.85)] animate-in fade-in slide-in-from-bottom-4 duration-700">
            {slide.desc}
          </p>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-2">
            {slide.primaryBtn.action === 'quote' ? (
              <button
                onClick={onOpenQuote}
                className="px-7 py-3.5 sm:py-4 text-xs sm:text-sm font-extrabold uppercase tracking-wider text-white bg-gradient-to-r from-[#ea1d25] to-[#c41219] hover:from-[#ff2d35] hover:to-[#ea1d25] rounded-xl shadow-xl shadow-red-950/60 border border-red-500/40 flex items-center justify-center gap-2 group transition-all duration-300 transform hover:-translate-y-0.5 active:scale-[0.98]"
              >
                <span>{slide.primaryBtn.text}</span>
                <slide.primaryBtn.icon className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
            ) : (
              <a
                href={slide.primaryBtn.href}
                className="px-7 py-3.5 sm:py-4 text-xs sm:text-sm font-extrabold uppercase tracking-wider text-white bg-gradient-to-r from-[#ea1d25] to-[#c41219] hover:from-[#ff2d35] hover:to-[#ea1d25] rounded-xl shadow-xl shadow-red-950/60 border border-red-500/40 flex items-center justify-center gap-2 group transition-all duration-300 transform hover:-translate-y-0.5 active:scale-[0.98]"
              >
                <span>{slide.primaryBtn.text}</span>
                <slide.primaryBtn.icon className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </a>
            )}

            <a
              href={slide.secondaryBtn.href}
              target={slide.secondaryBtn.isExternal ? '_blank' : '_self'}
              rel={slide.secondaryBtn.isExternal ? 'noopener noreferrer' : undefined}
              className="px-6 py-3.5 sm:py-4 text-xs sm:text-sm font-bold text-white bg-black/40 hover:bg-black/60 backdrop-blur-md border border-white/30 rounded-xl shadow-md flex items-center justify-center gap-2 transition-all duration-300 transform hover:-translate-y-0.5"
            >
              <slide.secondaryBtn.icon className="w-4 h-4 text-[#00a4e4]" />
              <span>{slide.secondaryBtn.text}</span>
            </a>
          </div>

          {/* Feature Bullets */}
          <div className="pt-2 flex flex-wrap items-center gap-3 sm:gap-4 text-xs text-slate-200">
            {slide.features.map((feat, i) => (
              <div
                key={i}
                className="flex items-center gap-1.5 bg-black/50 backdrop-blur-md px-3.5 py-1.5 rounded-lg border border-white/15 shadow-sm"
              >
                <CheckCircle2 className="w-3.5 h-3.5 text-[#00a4e4] shrink-0" />
                <span className="drop-shadow-sm">{feat}</span>
              </div>
            ))}
          </div>

        </div>
      </div>

      {/* Navigation Arrow Controls (Previous / Next) */}
      <button
        onClick={prevSlide}
        aria-label="Previous Slide"
        className="absolute left-3 sm:left-6 top-1/2 -translate-y-1/2 z-20 p-2.5 sm:p-3 rounded-full bg-black/40 hover:bg-[#ea1d25] text-white/80 hover:text-white backdrop-blur-md border border-white/20 shadow-xl transition-all duration-200 transform hover:scale-110 active:scale-95 focus:outline-none"
      >
        <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" />
      </button>

      <button
        onClick={nextSlide}
        aria-label="Next Slide"
        className="absolute right-3 sm:right-6 top-1/2 -translate-y-1/2 z-20 p-2.5 sm:p-3 rounded-full bg-black/40 hover:bg-[#ea1d25] text-white/80 hover:text-white backdrop-blur-md border border-white/20 shadow-xl transition-all duration-200 transform hover:scale-110 active:scale-95 focus:outline-none"
      >
        <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6" />
      </button>

      {/* Clickable Pagination Dots with Active Animated Expansion & Progress */}
      <div className="absolute bottom-5 sm:bottom-8 left-1/2 -translate-x-1/2 z-20 flex items-center gap-2 sm:gap-3 bg-black/50 backdrop-blur-md px-4 py-2 rounded-full border border-white/15">
        {SLIDES.map((s, index) => {
          const isActive = index === currentSlide;
          return (
            <button
              key={s.id}
              onClick={() => setCurrentSlide(index)}
              aria-label={`Go to slide ${index + 1}: ${s.title}`}
              aria-current={isActive ? 'true' : 'false'}
              className={`group flex items-center gap-1.5 transition-all duration-300 focus:outline-none ${
                isActive
                  ? 'px-3 py-1 rounded-full bg-[#ea1d25] text-white shadow-md'
                  : 'p-1.5 rounded-full hover:bg-white/20 text-white/60'
              }`}
            >
              <span
                className={`rounded-full transition-all duration-300 ${
                  isActive
                    ? 'w-2.5 h-2.5 bg-white'
                    : 'w-2 h-2 bg-white/50 group-hover:bg-white'
                }`}
              />
              {isActive && (
                <span className="text-[11px] font-bold font-mono tracking-wider">
                  0{index + 1}
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* Auto-Slide Progress Bar Indicator at bottom edge */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-white/10 z-20 overflow-hidden">
        <div
          key={currentSlide}
          className="h-full bg-gradient-to-r from-[#ea1d25] via-red-500 to-[#00a4e4] transition-all duration-5000 ease-linear animate-slide-progress"
          style={{ width: isPaused ? '100%' : undefined }}
        />
      </div>
    </section>
  );
}
