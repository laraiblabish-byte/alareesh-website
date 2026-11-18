import { useState, useEffect } from 'react';
import { Phone, Mail, MapPin, Clock, Menu, X, Shield } from 'lucide-react';
import { COMPANY_INFO } from '../data/companyData';
import BrandLogo from './BrandLogo';

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', href: '#hero' },
    { name: 'About Us', href: '#about' },
    { name: 'Services', href: '#services' },
    { name: 'Contact', href: '#contact' },
  ];

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
            ? 'bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-md py-3'
            : 'bg-white/90 backdrop-blur-sm border-b border-slate-200/60 py-4'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Real Website Logo Branding (AAD) */}
          <a href="#hero" className="flex items-center">
            <BrandLogo size="md" />
          </a>

          {/* Desktop Nav Links */}
          <div className="hidden md:flex items-center space-x-2 lg:space-x-4">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="px-3.5 py-1.5 rounded-lg text-sm font-semibold text-slate-700 hover:text-[#ea1d25] hover:bg-slate-100 transition-all"
              >
                {link.name}
              </a>
            ))}
          </div>

          {/* Mobile menu trigger */}
          <div className="flex md:hidden items-center">
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
          <div className="md:hidden bg-white border-b border-slate-200 px-4 pt-3 pb-5 space-y-2 animate-in slide-in-from-top duration-200 shadow-xl">
            <div className="flex flex-col space-y-1">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="px-3 py-2.5 rounded-md text-sm font-semibold text-slate-700 hover:text-[#ea1d25] hover:bg-slate-50 transition-colors"
                >
                  {link.name}
                </a>
              ))}
            </div>
          </div>
        )}
      </nav>

      {/* Solid Red Line Under Navbar */}
      <div className="h-[2.5px] sm:h-[3px] w-full bg-[#ea1d25]" />
    </header>
  );
}
