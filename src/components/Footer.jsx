import { Link } from 'react-router-dom';
import { COMPANY_INFO, SERVICES } from '../data/companyData';
import { Phone, Mail, MapPin, Shield, Clock, ExternalLink, ArrowRight, ChevronRight } from 'lucide-react';
import BrandLogo from './BrandLogo';

export default function Footer() {
  const handleScrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Explicit verified navigation links matching actual website routes
  const navigationLinks = [
    { name: 'Home', path: '/' },
    { name: 'About Us', path: '/about' },
    { name: 'Our Clients', path: '/our-clients' },
    { name: 'Photo Gallery', path: '/photo-gallery' },
    { name: 'Video Gallery', path: '/video-gallery' },
    { name: 'Careers', path: '/careers-dubai' },
    { name: 'Contact Us', path: '/contact' }
  ];

  return (
    <footer className="bg-slate-50 border-t border-slate-200 text-slate-600 text-xs">
      
      {/* Main 4-Section Footer Body */}
      <div className="py-14 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10">
            
            {/* ========================================================= */}
            {/* 1. COMPANY INFORMATION                                    */}
            {/* ========================================================= */}
            <div className="lg:col-span-3 space-y-5">
              <Link to="/" onClick={handleScrollToTop} className="inline-block" aria-label="Al Areesh Demolition Home">
                <BrandLogo size="md" />
              </Link>

              <p className="text-slate-600 leading-relaxed text-xs">
                Dubai&apos;s premier licensed demolition contractor. With 12+ years of experience and 300+ successfully completed projects, delivering safe structural dismantling, bulk excavation, and eco-friendly site clearance across Dubai and the UAE.
              </p>

              {/* Authority Credential Badge */}
              <div className="p-3.5 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-1.5">
                <div className="text-xs font-bold text-slate-900 flex items-center gap-1.5">
                  <Shield className="w-4 h-4 text-[#00a4e4] shrink-0" />
                  <span>Dubai Municipality Licensed</span>
                </div>
                <div className="text-[11px] text-slate-500 font-medium">
                  Class-1 Demolition Contractor • License #709421
                </div>
                <div className="text-[10px] text-emerald-600 font-semibold flex items-center gap-1 pt-0.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 inline-block" />
                  <span>100% Fully Compliant &amp; Insured</span>
                </div>
              </div>
            </div>

            {/* ========================================================= */}
            {/* 2. NAVIGATION                                             */}
            {/* ========================================================= */}
            <div className="lg:col-span-2 space-y-4">
              <h4 className="font-heading text-sm font-black uppercase tracking-wider text-slate-900 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#ea1d25]" />
                <span>Navigation</span>
              </h4>
              <ul className="space-y-2.5">
                {navigationLinks.map((item) => (
                  <li key={item.path}>
                    <Link
                      to={item.path}
                      onClick={handleScrollToTop}
                      className="group flex items-center gap-1.5 text-slate-600 hover:text-[#ea1d25] transition-colors py-0.5"
                    >
                      <ChevronRight className="w-3 h-3 text-slate-400 group-hover:text-[#ea1d25] group-hover:translate-x-0.5 transition-all" />
                      <span className="font-medium">{item.name}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* ========================================================= */}
            {/* 3. CORE SERVICES                                          */}
            {/* ========================================================= */}
            <div className="lg:col-span-4 space-y-4">
              <h4 className="font-heading text-sm font-black uppercase tracking-wider text-slate-900 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#00a4e4]" />
                <span>Core Services</span>
              </h4>
              <ul className="space-y-2">
                {SERVICES.map((s) => (
                  <li key={s.id}>
                    <Link 
                      to={`/service/${s.slug}`} 
                      onClick={handleScrollToTop}
                      className="group flex items-start gap-1.5 text-slate-600 hover:text-[#ea1d25] transition-colors py-0.5"
                    >
                      <ChevronRight className="w-3 h-3 text-slate-400 group-hover:text-[#ea1d25] group-hover:translate-x-0.5 transition-all mt-0.5 shrink-0" />
                      <span className="leading-snug">{s.title}</span>
                    </Link>
                  </li>
                ))}
                
                {/* View All Services Link */}
                <li className="pt-2">
                  <Link
                    to="/services"
                    onClick={handleScrollToTop}
                    className="inline-flex items-center gap-1.5 text-xs font-extrabold text-[#ea1d25] hover:text-[#c41219] transition-colors group pt-1"
                  >
                    <span>View All Services</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </li>
              </ul>
            </div>

            {/* ========================================================= */}
            {/* 4. CONTACT & LOCATIONS                                    */}
            {/* ========================================================= */}
            <div className="lg:col-span-3 space-y-4">
              <h4 className="font-heading text-sm font-black uppercase tracking-wider text-slate-900 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#ea1d25]" />
                <span>Contact &amp; Locations</span>
              </h4>
              
              <div className="space-y-3.5">
                {/* Head Office */}
                <div className="flex items-start gap-2.5">
                  <MapPin className="w-4 h-4 text-[#ea1d25] shrink-0 mt-0.5" />
                  <div className="space-y-0.5">
                    <span className="font-bold text-slate-900 block text-[11px] uppercase tracking-wider">
                      Head Office:
                    </span>
                    <p className="text-slate-600 leading-relaxed">
                      {COMPANY_INFO.headOffice.address}
                    </p>
                  </div>
                </div>

                {/* Operations Yard */}
                <div className="flex items-start gap-2.5">
                  <MapPin className="w-4 h-4 text-[#00a4e4] shrink-0 mt-0.5" />
                  <div className="space-y-0.5">
                    <span className="font-bold text-slate-900 block text-[11px] uppercase tracking-wider">
                      Operations Yard:
                    </span>
                    <p className="text-slate-600 leading-relaxed">
                      {COMPANY_INFO.branchOffice.address}
                    </p>
                  </div>
                </div>

                {/* Landline */}
                <div className="flex items-center gap-2.5">
                  <Phone className="w-4 h-4 text-[#ea1d25] shrink-0" />
                  <div className="flex items-baseline gap-1.5 flex-wrap">
                    <span className="text-slate-500 text-[11px] font-semibold">Landline:</span>
                    <a
                      href={`tel:${COMPANY_INFO.phoneRaw}`}
                      className="text-slate-900 font-bold hover:text-[#ea1d25] transition-colors"
                    >
                      {COMPANY_INFO.phone}
                    </a>
                  </div>
                </div>

                {/* Mobile / 24-7 Hotline */}
                <div className="flex items-center gap-2.5">
                  <Phone className="w-4 h-4 text-[#00a4e4] shrink-0" />
                  <div className="flex items-baseline gap-1.5 flex-wrap">
                    <span className="text-slate-500 text-[11px] font-semibold">24/7 Hotline:</span>
                    <a
                      href="tel:+971507104786"
                      className="text-slate-900 font-bold hover:text-[#00a4e4] transition-colors"
                    >
                      +971 50 710 4786
                    </a>
                  </div>
                </div>

                {/* Email */}
                <div className="flex items-center gap-2.5">
                  <Mail className="w-4 h-4 text-emerald-600 shrink-0" />
                  <div className="flex items-baseline gap-1.5 flex-wrap">
                    <span className="text-slate-500 text-[11px] font-semibold">Email:</span>
                    <a
                      href={`mailto:${COMPANY_INFO.email}`}
                      className="text-slate-900 font-bold hover:text-[#ea1d25] transition-colors break-all"
                    >
                      {COMPANY_INFO.email}
                    </a>
                  </div>
                </div>

                {/* Working Hours */}
                <div className="flex items-start gap-2.5 pt-1 border-t border-slate-200">
                  <Clock className="w-4 h-4 text-[#00a4e4] shrink-0 mt-0.5" />
                  <div className="space-y-0.5 text-[11px]">
                    <span className="font-bold text-slate-800 block">
                      Mon – Sat: 7:00 AM – 7:00 PM
                    </span>
                    <span className="text-slate-500 block">
                      Sunday: 24/7 Emergency Demolition Response
                    </span>
                  </div>
                </div>

              </div>
            </div>

          </div>
        </div>
      </div>

      {/* Bottom Bar: Copyright & Credentials */}
      <div className="py-6 bg-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-slate-500">
          <div>
            Copyright &copy; 2026 <span className="text-slate-800 font-semibold">Al Areesh Wrecking &amp; Demolition Works LLC (AAD)</span>. All rights reserved.
          </div>
          <div className="flex items-center space-x-6">
            <a
              href="https://alareeshdemolition.ae/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[#ea1d25] flex items-center gap-1 transition-colors"
            >
              <span>Original Domain: alareeshdemolition.ae</span>
              <ExternalLink className="w-3 h-3" />
            </a>
            <span className="hidden sm:inline text-slate-300">•</span>
            <span className="text-slate-700 font-medium">Dubai, United Arab Emirates</span>
            <span className="hidden sm:inline text-slate-300">•</span>
            <Link
              to="/admin/login"
              onClick={handleScrollToTop}
              className="hover:text-[#ea1d25] flex items-center gap-1 transition-colors font-medium text-slate-600"
              title="Super Admin Portal Login"
            >
              <Shield className="w-3 h-3 text-[#00a4e4]" />
              <span>Admin Portal</span>
            </Link>
          </div>
        </div>
      </div>

    </footer>
  );
}
