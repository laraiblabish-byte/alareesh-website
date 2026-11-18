import { FLEET_MACHINERY } from '../data/companyData';
import { Truck, Check } from 'lucide-react';
import Reveal from './Reveal';

export default function FleetSection() {
  return (
    <section id="fleet" className="py-20 bg-slate-50/70 border-y border-slate-200 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <Reveal animation="fade-up">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
            <div className="space-y-3 max-w-2xl">
              <span className="text-xs font-bold uppercase tracking-widest text-[#00a4e4] inline-block px-3 py-1 rounded-full bg-sky-50 border border-sky-200">
                Modern Fleet & In-House Equipment
              </span>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight">
                Company-Owned Heavy Demolition Machinery
              </h2>
              <p className="text-sm text-slate-600">
                We own our entire fleet of excavators, hydraulic breakers, tipper trucks, and mobile crushers. Zero subcontracting delays — your project begins on the exact date agreed.
              </p>
            </div>

            <div className="shrink-0">
              <div className="p-4 rounded-xl bg-white border border-slate-200 shadow-sm text-right card-hover-transition">
                <div className="text-2xl font-black font-heading text-slate-900">50+ Units</div>
                <div className="text-xs text-sky-700 font-medium">Ready for Deployment Across UAE</div>
              </div>
            </div>
          </div>
        </Reveal>

        {/* Fleet Grid with Staggered Transition */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {FLEET_MACHINERY.map((machinery, idx) => (
            <Reveal key={idx} animation="fade-up" delay={idx * 100}>
              <div
                className="p-6 rounded-2xl bg-white border border-slate-200 hover:border-sky-400 transition-all duration-300 flex flex-col justify-between group hover:shadow-lg card-hover-transition h-full"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-sky-50 text-[#00a4e4] border border-sky-200">
                      {machinery.tag}
                    </span>
                    <Truck className="w-5 h-5 text-slate-400 group-hover:text-[#00a4e4] transition-colors duration-300 group-hover:scale-110" />
                  </div>

                  <h3 className="font-heading text-lg font-bold text-slate-900 group-hover:text-[#00a4e4] transition-colors duration-300">
                    {machinery.name}
                  </h3>
                  <div className="text-xs font-semibold text-slate-500 mt-1 font-mono">
                    {machinery.model}
                  </div>

                  <div className="mt-4 p-3 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
                    <div className="text-[10px] uppercase font-bold text-slate-500">Operating Capacity</div>
                    <div className="text-xs font-bold text-sky-700">{machinery.capacity}</div>
                  </div>

                  <p className="text-xs text-slate-600 mt-3 leading-relaxed">
                    {machinery.application}
                  </p>
                </div>

                <div className="mt-5 pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
                  <span className="flex items-center gap-1.5 text-slate-700">
                    <Check className="w-3.5 h-3.5 text-[#00a4e4]" />
                    Operator Included
                  </span>
                  <span className="font-semibold text-emerald-600">Available</span>
                </div>
              </div>
            </Reveal>
          ))}
        </div>

      </div>
    </section>
  );
}
