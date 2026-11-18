import { COMPANY_INFO, SERVICES } from '../data/companyData';
import { Phone, Mail, MapPin, Shield, Clock, ExternalLink } from 'lucide-react';
import BrandLogo from './BrandLogo';

export default function Footer() {
  return (
    <footer className="bg-slate-50 border-t border-slate-200 text-slate-600 text-xs">
      
      {/* Top Footer Banner */}
      <div className="border-b border-slate-200 py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-4 gap-8">
          
          {/* Brand Info with Real AAD Logo */}
          <div className="md:col-span-1 space-y-4">
            <BrandLogo size="md" />

            <p className="text-slate-600 leading-relaxed text-xs">
              Dubai's premier licensed demolition contractor. With 12+ years of experience and 300+ completed projects, delivering safe structural dismantling and excavation across UAE.
            </p>

            <div className="p-3 rounded-xl bg-white border border-slate-200 shadow-sm space-y-1">
              <div className="text-[11px] font-bold text-sky-700 flex items-center gap-1.5">
                <Shield className="w-3.5 h-3.5 text-[#00a4e4]" />
                Dubai Municipality Licensed
              </div>
              <div className="text-[10px] text-slate-500">Commercial License #709421</div>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-3">
            <h4 className="font-heading text-sm font-bold uppercase tracking-wider text-slate-900">
              Navigation
            </h4>
            <ul className="space-y-2">
              <li><a href="#hero" className="hover:text-[#00a4e4] transition-colors">Home</a></li>
              <li><a href="#about" className="hover:text-[#00a4e4] transition-colors">About Us</a></li>
              <li><a href="#services" className="hover:text-[#00a4e4] transition-colors">Wrecking & Demolition Services</a></li>
              <li><a href="#process" className="hover:text-[#00a4e4] transition-colors">Our Work Process</a></li>
              <li><a href="#fleet" className="hover:text-[#00a4e4] transition-colors">Modern Equipment & Fleet</a></li>
              <li><a href="#gallery" className="hover:text-[#00a4e4] transition-colors">Picture Gallery</a></li>
              <li><a href="#estimator" className="hover:text-[#00a4e4] transition-colors">Cost Estimator</a></li>
              <li><a href="#why-us" className="hover:text-[#00a4e4] transition-colors">Why Choose Al Areesh</a></li>
            </ul>
          </div>

          {/* Services */}
          <div className="space-y-3">
            <h4 className="font-heading text-sm font-bold uppercase tracking-wider text-slate-900">
              Core Services
            </h4>
            <ul className="space-y-2">
              {SERVICES.map((s) => (
                <li key={s.id}>
                  <a href="#services" className="hover:text-[#00a4e4] transition-colors">
                    {s.title}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Offices & Contacts */}
          <div className="space-y-3">
            <h4 className="font-heading text-sm font-bold uppercase tracking-wider text-slate-900">
              Contact & Locations
            </h4>
            <div className="space-y-2.5">
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-[#ea1d25] shrink-0 mt-0.5" />
                <span>Schon Business Park, Retail-15, DIP 1, Dubai, UAE</span>
              </div>
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-[#00a4e4] shrink-0 mt-0.5" />
                <span>Nasriya Bldg, Baghdad St, Al Qusais 1, Deira, Dubai</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-[#ea1d25] shrink-0" />
                <a href={`tel:${COMPANY_INFO.phoneRaw}`} className="text-slate-900 font-semibold hover:text-[#00a4e4]">
                  {COMPANY_INFO.phone}
                </a>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-[#00a4e4] shrink-0" />
                <a href={`mailto:${COMPANY_INFO.email}`} className="hover:text-[#00a4e4]">
                  {COMPANY_INFO.email}
                </a>
              </div>
              <div className="flex items-center gap-2 text-slate-500 text-[11px] pt-1">
                <Clock className="w-3.5 h-3.5 text-[#00a4e4]" />
                <span>Mon - Sat: 7AM - 7PM (24/7 Emergency Response)</span>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* Bottom Bar */}
      <div className="py-6 bg-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-slate-500">
          <div>
            Copyright &copy; 2026 <span className="text-slate-800 font-semibold">Al Areesh Wrecking & Demolition Works LLC (AAD)</span> | All rights reserved.
          </div>
          <div className="flex items-center space-x-6">
            <a href="https://alareeshdemolition.ae/" target="_blank" rel="noopener noreferrer" className="hover:text-[#00a4e4] flex items-center gap-1">
              <span>Original Domain: alareeshdemolition.ae</span>
              <ExternalLink className="w-3 h-3" />
            </a>
            <span>Dubai, UAE</span>
          </div>
        </div>
      </div>

    </footer>
  );
}
