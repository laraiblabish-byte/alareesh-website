import { WHY_CHOOSE_US } from '../data/companyData';
import { ShieldCheck, Truck, HardHat, DollarSign, FileText, Recycle } from 'lucide-react';
import Reveal from './Reveal';

export default function WhyChooseUs() {
  const iconMap = {
    ShieldCheck,
    Truck,
    HardHat,
    DollarSign,
    FileText,
    Recycle
  };

  return (
    <section id="why-us" className="py-20 bg-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <Reveal animation="fade-up">
          <div className="text-center max-w-3xl mx-auto space-y-3 mb-16">
            <span className="text-xs font-bold uppercase tracking-widest text-[#00a4e4] inline-block px-3 py-1 rounded-full bg-sky-50 border border-sky-200">
              Few Reasons To Choose Our Consultancy
            </span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight">
              Why Dubai Clients Choose Al Areesh Over Other Demolition Companies
            </h2>
            <p className="text-sm sm:text-base text-slate-600">
              At Al Areesh Wrecking & Demolition Works LLC, we combine experience, safety, and modern equipment to deliver reliable demolition and construction support services across the UAE.
            </p>
          </div>
        </Reveal>

        {/* 6 Grid Cards with Staggered Transitions */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {WHY_CHOOSE_US.map((item, idx) => {
            const Icon = iconMap[item.icon] || ShieldCheck;
            return (
              <Reveal key={idx} animation="fade-up" delay={idx * 100}>
                <div
                  className="p-6 rounded-2xl bg-slate-50/70 border border-slate-200 hover:border-sky-400 hover:bg-white transition-all duration-300 flex flex-col justify-between group hover:shadow-lg card-hover-transition h-full"
                >
                  <div className="space-y-4">
                    <div className="w-12 h-12 rounded-xl bg-sky-100 border border-sky-200 flex items-center justify-center text-[#00a4e4] group-hover:bg-[#ea1d25] group-hover:text-white transition-all duration-300 group-hover:scale-110">
                      <Icon className="w-6 h-6" />
                    </div>

                    <h3 className="font-heading text-lg font-bold text-slate-900 group-hover:text-[#00a4e4] transition-colors duration-300">
                      {item.title}
                    </h3>

                    <p className="text-xs text-slate-600 leading-relaxed">
                      {item.desc}
                    </p>
                  </div>

                  <div className="mt-6 pt-3 border-t border-slate-200 flex items-center justify-between text-[11px] font-semibold text-slate-500 group-hover:text-[#00a4e4] transition-colors">
                    <span>Guaranteed Standard</span>
                    <span className="text-emerald-600 font-bold">100% Compliant</span>
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>

      </div>
    </section>
  );
}
