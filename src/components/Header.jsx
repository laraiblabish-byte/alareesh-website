import { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  Phone, 
  Mail, 
  MapPin, 
  Clock, 
  Menu, 
  X, 
  Shield, 
  ChevronDown, 
  Camera, 
  Video, 
  Briefcase, 
  ArrowRight,
  Users
} from 'lucide-react';
import { COMPANY_INFO, SERVICES } from '../data/companyData';
import BrandLogo from './BrandLogo';

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Dropdown states for desktop
  const [servicesDropdownOpen, setServicesDropdownOpen] = useState(false);
  const [moreDropdownOpen, setMoreDropdownOpen] = useState(false);

  // Mobile accordion states
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);
  const [mobileMoreOpen, setMobileMoreOpen] = useState(false);

  const location = useLocation();

  const servicesTimeoutRef = useRef(null);
  const moreTimeoutRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close menus on browser back/forward navigation
  useEffect(() => {
    const handlePopState = () => {
      setMobileMenuOpen(false);
      setServicesDropdownOpen(false);
      setMoreDropdownOpen(false);
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const isHomeActive = location.pathname === '/' && !location.hash;
  const isAboutActive = location.pathname === '/about';
  const isServicesActive = location.pathname === '/services' || location.pathname.startsWith('/service/') || SERVICES.some(s => location.pathname === `/${s.slug}`);
  const isMoreActive = 
    location.pathname === '/photo-gallery' || 
    location.pathname === '/video-gallery' || 
    location.pathname === '/our-clients' || 
    location.pathname === '/clients' || 
    location.pathname === '/careers-dubai' || 
    location.pathname === '/careers';
  const isContactActive = location.pathname === '/contact' || location.pathname === '/contact-us';

  return (
    <header className="sticky top-0 z-50 w-full transition-all duration-300">
      {/* Top Notification / Contact Bar (Clean Light Theme) */}
      <div className="bg-slate-100/95 border-b border-slate-200/80 text-xs text-slate-700 py-2 hidden lg:block">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center">
          <div className="flex items-center space-x-6">
            <div className="flex items-center text-slate-600 gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-[#ea1d25]" />
              <span>Schon Business Park, DIP 1, Dubai, UAE</span>
            </div>
            <div className="flex items-center text-slate-600 gap-1.5">
              <Clock className="w-3.5 h-3.5 text-[#00a4e4]" />
              <span>Mon - Sat: 7:00 AM - 7:00 PM (24/7 Emergency Response)</span>
            </div>
            <div className="flex items-center gap-1.5 text-sky-700 font-semibold bg-sky-50 px-2 py-0.5 rounded border border-sky-200/60">
              <Shield className="w-3.5 h-3.5 text-sky-600" />
              <span>Dubai Municipality Licensed #709421</span>
            </div>
          </div>

          <div className="flex items-center space-x-6">
            <a
              href={`mailto:${COMPANY_INFO.email}`}
              className="flex items-center gap-1.5 text-slate-600 hover:text-slate-900 transition-colors"
            >
              <Mail className="w-3.5 h-3.5 text-[#00a4e4]" />
              <span>{COMPANY_INFO.email}</span>
            </a>
            <a
              href={`tel:${COMPANY_INFO.phoneRaw}`}
              className="flex items-center gap-1.5 text-slate-900 font-bold hover:text-[#ea1d25] transition-colors"
            >
              <Phone className="w-3.5 h-3.5 text-[#ea1d25]" />
              <span>{COMPANY_INFO.phone}</span>
            </a>
          </div>
        </div>
      </div>

      {/* Main Navigation Bar (Clean White Background) */}
      <nav
        className={`w-full transition-all duration-300 ${
          isScrolled
            ? 'bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-md py-2.5'
            : 'bg-white/90 backdrop-blur-sm border-b border-slate-200/60 py-3.5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Real Website Logo Branding (AAD) */}
          <Link to="/" className="flex items-center">
            <BrandLogo size="md" />
          </Link>

          {/* Desktop Nav Links */}
          <div className="hidden lg:flex items-center space-x-1 xl:space-x-2">
            
            {/* 1. Home */}
            <Link
              to="/"
              className={`px-3 py-1.5 rounded-lg text-sm font-semibold transition-all ${
                isHomeActive
                  ? 'text-[#ea1d25] bg-red-50 font-bold shadow-xs'
                  : 'text-slate-700 hover:text-[#ea1d25] hover:bg-slate-100'
              }`}
            >
              Home
            </Link>

            {/* 2. About Us */}
            <Link
              to="/about"
              className={`px-3 py-1.5 rounded-lg text-sm font-semibold transition-all ${
                isAboutActive
                  ? 'text-[#ea1d25] bg-red-50 font-bold shadow-xs'
                  : 'text-slate-700 hover:text-[#ea1d25] hover:bg-slate-100'
              }`}
            >
              About Us
            </Link>

            {/* 3. Services Dropdown (All 11 individual services) */}
            <div
              className="relative"
              onMouseEnter={() => {
                clearTimeout(servicesTimeoutRef.current);
                setServicesDropdownOpen(true);
              }}
              onMouseLeave={() => {
                servicesTimeoutRef.current = setTimeout(() => {
                  setServicesDropdownOpen(false);
                }, 150);
              }}
            >
              <button
                onClick={() => setServicesDropdownOpen(!servicesDropdownOpen)}
                className={`px-3 py-1.5 rounded-lg text-sm font-semibold flex items-center gap-1 transition-all ${
                  isServicesActive
                    ? 'text-[#ea1d25] bg-red-50 font-bold shadow-xs'
                    : 'text-slate-700 hover:text-[#ea1d25] hover:bg-slate-100'
                }`}
              >
                <span>Services</span>
                <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${servicesDropdownOpen ? 'rotate-180 text-[#ea1d25]' : 'text-slate-500'}`} />
              </button>

              {/* 2-Column Mega Dropdown Menu */}
              {servicesDropdownOpen && (
                <div className="absolute left-1/2 -translate-x-1/2 top-full mt-1.5 w-[640px] bg-white rounded-2xl shadow-2xl border border-slate-200 p-4 animate-in fade-in zoom-in-95 duration-150 z-50">
                  <div className="border-b border-slate-100 pb-2 mb-3 flex items-center justify-between px-2">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                      Our Demolition &amp; Earthwork Services (11)
                    </span>
                    <Link
                      to="/services"
                      onClick={() => setServicesDropdownOpen(false)}
                      className="text-xs font-bold text-[#ea1d25] hover:underline flex items-center gap-1"
                    >
                      <span>View All Services Overview</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    {SERVICES.map((service, index) => {
                      const isCurrentService = location.pathname.includes(service.slug);
                      return (
                        <Link
                          key={service.id}
                          to={`/service/${service.slug}`}
                          onClick={() => setServicesDropdownOpen(false)}
                          className={`p-2 rounded-xl flex items-start gap-2 text-xs transition-all ${
                            isCurrentService
                              ? 'bg-red-50 text-[#ea1d25] font-bold'
                              : 'text-slate-700 hover:text-[#ea1d25] hover:bg-slate-50 font-medium'
                          }`}
                        >
                          <span className="text-[10px] font-mono font-bold text-slate-400 mt-0.5">
                            {index < 9 ? `0${index + 1}` : index + 1}.
                          </span>
                          <span className="line-clamp-1 leading-snug">
                            {service.title}
                          </span>
                        </Link>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>

            {/* 4. More Dropdown (Gallery, Clients & Careers) */}
            <div
              className="relative"
              onMouseEnter={() => {
                clearTimeout(moreTimeoutRef.current);
                setMoreDropdownOpen(true);
              }}
              onMouseLeave={() => {
                moreTimeoutRef.current = setTimeout(() => {
                  setMoreDropdownOpen(false);
                }, 150);
              }}
            >
              <button
                onClick={() => setMoreDropdownOpen(!moreDropdownOpen)}
                className={`px-3 py-1.5 rounded-lg text-sm font-semibold flex items-center gap-1 transition-all ${
                  isMoreActive
                    ? 'text-[#ea1d25] bg-red-50 font-bold shadow-xs'
                    : 'text-slate-700 hover:text-[#ea1d25] hover:bg-slate-100'
                }`}
              >
                <span>More</span>
                <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${moreDropdownOpen ? 'rotate-180 text-[#ea1d25]' : 'text-slate-500'}`} />
              </button>

              {moreDropdownOpen && (
                <div className="absolute right-0 top-full mt-1.5 w-72 bg-white rounded-2xl shadow-2xl border border-slate-200 p-2.5 animate-in fade-in zoom-in-95 duration-150 z-50 space-y-1">
                  <div className="px-3 py-1.5 border-b border-slate-100 mb-1">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                      Explore Al Areesh
                    </span>
                  </div>

                  {/* Photo Gallery */}
                  <Link
                    to="/photo-gallery"
                    onClick={() => setMoreDropdownOpen(false)}
                    className="flex items-center gap-3 p-2.5 rounded-xl hover:bg-slate-50 text-slate-700 hover:text-[#ea1d25] text-xs font-bold transition-colors group"
                  >
                    <div className="w-8 h-8 rounded-lg bg-red-50 text-[#ea1d25] group-hover:bg-[#ea1d25] group-hover:text-white flex items-center justify-center shrink-0 transition-colors">
                      <Camera className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="text-slate-900 font-bold group-hover:text-[#ea1d25] transition-colors">Photo Gallery</div>
                      <div className="text-[11px] text-slate-500 font-normal">Executed project photography</div>
                    </div>
                  </Link>

                  {/* Video Gallery */}
                  <Link
                    to="/video-gallery"
                    onClick={() => setMoreDropdownOpen(false)}
                    className="flex items-center gap-3 p-2.5 rounded-xl hover:bg-slate-50 text-slate-700 hover:text-[#00a4e4] text-xs font-bold transition-colors group"
                  >
                    <div className="w-8 h-8 rounded-lg bg-sky-50 text-[#00a4e4] group-hover:bg-[#00a4e4] group-hover:text-white flex items-center justify-center shrink-0 transition-colors">
                      <Video className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="text-slate-900 font-bold group-hover:text-[#00a4e4] transition-colors">Video Gallery</div>
                      <div className="text-[11px] text-slate-500 font-normal">On-site heavy machinery reels</div>
                    </div>
                  </Link>

                  {/* Our Clients */}
                  <Link
                    to="/our-clients"
                    onClick={() => setMoreDropdownOpen(false)}
                    className="flex items-center gap-3 p-2.5 rounded-xl hover:bg-slate-50 text-slate-700 hover:text-emerald-600 text-xs font-bold transition-colors group"
                  >
                    <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-600 group-hover:bg-emerald-600 group-hover:text-white flex items-center justify-center shrink-0 transition-colors">
                      <Users className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="text-slate-900 font-bold group-hover:text-emerald-600 transition-colors">Our Clients</div>
                      <div className="text-[11px] text-slate-500 font-normal">Developers &amp; government entities</div>
                    </div>
                  </Link>

                  {/* Careers Dubai */}
                  <Link
                    to="/careers-dubai"
                    onClick={() => setMoreDropdownOpen(false)}
                    className="flex items-center gap-3 p-2.5 rounded-xl hover:bg-slate-50 text-slate-700 hover:text-amber-600 text-xs font-bold transition-colors group"
                  >
                    <div className="w-8 h-8 rounded-lg bg-amber-50 text-amber-600 group-hover:bg-amber-600 group-hover:text-white flex items-center justify-center shrink-0 transition-colors">
                      <Briefcase className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="text-slate-900 font-bold group-hover:text-amber-600 transition-colors">Careers Dubai</div>
                      <div className="text-[11px] text-slate-500 font-normal">Join our engineering team</div>
                    </div>
                  </Link>
                </div>
              )}
            </div>

            {/* Contact Us */}
            <Link
              to="/contact"
              className={`px-4 py-1.5 rounded-lg text-sm font-bold transition-all ${
                isContactActive
                  ? 'text-white bg-[#ea1d25] shadow-md shadow-red-500/20'
                  : 'text-white bg-[#ea1d25] hover:bg-[#c41219] shadow-xs'
              }`}
            >
              Contact Us
            </Link>

          </div>

          {/* Mobile menu trigger button */}
          <div className="flex lg:hidden items-center space-x-2">
            <a
              href={`tel:${COMPANY_INFO.phoneRaw}`}
              className="p-2 text-[#ea1d25] bg-red-50 rounded-lg border border-red-200"
              aria-label="Call Al Areesh"
            >
              <Phone className="w-4 h-4" />
            </a>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-slate-700 hover:text-slate-900 bg-slate-100 border border-slate-200 rounded-lg focus:outline-none"
              aria-label="Toggle Navigation"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-white border-b border-slate-200 px-4 pt-3 pb-6 space-y-2 animate-in slide-in-from-top duration-200 shadow-2xl max-h-[85vh] overflow-y-auto">
            <div className="flex flex-col space-y-1">
              
              {/* Home */}
              <Link
                to="/"
                onClick={() => setMobileMenuOpen(false)}
                className={`px-3 py-2.5 rounded-md text-sm font-semibold ${
                  isHomeActive ? 'text-[#ea1d25] bg-red-50 font-bold' : 'text-slate-800 hover:bg-slate-50'
                }`}
              >
                Home
              </Link>

              {/* About Us */}
              <Link
                to="/about"
                onClick={() => setMobileMenuOpen(false)}
                className={`px-3 py-2.5 rounded-md text-sm font-semibold ${
                  isAboutActive ? 'text-[#ea1d25] bg-red-50 font-bold' : 'text-slate-800 hover:bg-slate-50'
                }`}
              >
                About Us
              </Link>

              {/* Services Accordion */}
              <div>
                <button
                  onClick={() => setMobileServicesOpen(!mobileServicesOpen)}
                  className={`w-full px-3 py-2.5 rounded-md text-sm font-semibold flex items-center justify-between ${
                    isServicesActive ? 'text-[#ea1d25] bg-red-50 font-bold' : 'text-slate-800 hover:bg-slate-50'
                  }`}
                >
                  <span>Services (11)</span>
                  <ChevronDown className={`w-4 h-4 transition-transform ${mobileServicesOpen ? 'rotate-180 text-[#ea1d25]' : 'text-slate-500'}`} />
                </button>

                {mobileServicesOpen && (
                  <div className="pl-4 pr-2 py-2 space-y-1 bg-slate-50 rounded-xl mt-1 border border-slate-100">
                    <Link
                      to="/services"
                      onClick={() => setMobileMenuOpen(false)}
                      className="block px-3 py-2 rounded-lg text-xs font-bold text-[#ea1d25] hover:underline"
                    >
                      → All Services Overview Page
                    </Link>
                    {SERVICES.map((s, idx) => (
                      <Link
                        key={s.id}
                        to={`/service/${s.slug}`}
                        onClick={() => setMobileMenuOpen(false)}
                        className="block px-3 py-2 rounded-lg text-xs text-slate-700 hover:text-[#ea1d25] hover:bg-white font-medium"
                      >
                        <span className="font-mono text-slate-400 mr-2">{idx + 1}.</span>
                        {s.title}
                      </Link>
                    ))}
                  </div>
                )}
              </div>

              {/* More Accordion (Gallery, Clients, Careers) */}
              <div>
                <button
                  onClick={() => setMobileMoreOpen(!mobileMoreOpen)}
                  className={`w-full px-3 py-2.5 rounded-md text-sm font-semibold flex items-center justify-between ${
                    isMoreActive ? 'text-[#ea1d25] bg-red-50 font-bold' : 'text-slate-800 hover:bg-slate-50'
                  }`}
                >
                  <span>More</span>
                  <ChevronDown className={`w-4 h-4 transition-transform ${mobileMoreOpen ? 'rotate-180 text-[#ea1d25]' : 'text-slate-500'}`} />
                </button>

                {mobileMoreOpen && (
                  <div className="pl-4 pr-2 py-2 space-y-1 bg-slate-50 rounded-xl mt-1 border border-slate-100">
                    <Link
                      to="/photo-gallery"
                      onClick={() => setMobileMenuOpen(false)}
                      className="flex items-center gap-2.5 px-3 py-2 rounded-lg text-xs font-bold text-slate-700 hover:text-[#ea1d25] hover:bg-white"
                    >
                      <Camera className="w-3.5 h-3.5 text-[#ea1d25]" />
                      <span>Photo Gallery</span>
                    </Link>

                    <Link
                      to="/video-gallery"
                      onClick={() => setMobileMenuOpen(false)}
                      className="flex items-center gap-2.5 px-3 py-2 rounded-lg text-xs font-bold text-slate-700 hover:text-[#00a4e4] hover:bg-white"
                    >
                      <Video className="w-3.5 h-3.5 text-[#00a4e4]" />
                      <span>Video Gallery</span>
                    </Link>

                    <Link
                      to="/our-clients"
                      onClick={() => setMobileMenuOpen(false)}
                      className="flex items-center gap-2.5 px-3 py-2 rounded-lg text-xs font-bold text-slate-700 hover:text-emerald-600 hover:bg-white"
                    >
                      <Users className="w-3.5 h-3.5 text-emerald-600" />
                      <span>Our Clients</span>
                    </Link>

                    <Link
                      to="/careers-dubai"
                      onClick={() => setMobileMenuOpen(false)}
                      className="flex items-center gap-2.5 px-3 py-2 rounded-lg text-xs font-bold text-slate-700 hover:text-amber-600 hover:bg-white"
                    >
                      <Briefcase className="w-3.5 h-3.5 text-amber-600" />
                      <span>Careers Dubai</span>
                    </Link>
                  </div>
                )}
              </div>

              {/* Contact Us Button */}
              <div className="pt-2">
                <Link
                  to="/contact"
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-full text-center block px-4 py-3 rounded-xl bg-[#ea1d25] hover:bg-[#c41219] text-white font-bold text-sm shadow-md"
                >
                  Contact Us
                </Link>
              </div>

            </div>
          </div>
        )}
      </nav>

      {/* Solid Red Line Under Navbar */}
      <div className="h-[2.5px] sm:h-[3px] w-full bg-[#ea1d25]" />
    </header>
  );
}
