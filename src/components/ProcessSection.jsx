import { WORK_PROCESS } from '../data/companyData';
import { ArrowRight, CheckCircle2, ClipboardCheck, Truck, ShieldAlert, FileCheck } from 'lucide-react';
import Reveal from './Reveal';

export default function ProcessSection({ onOpenQuote }) {
  const stepIcons = [ClipboardCheck, Truck, ShieldAlert, FileCheck];

  return (
    <section id="process" className="py-20 bg-white relative overflow-hidden">
      {/* Background accents */}
      <div className="absolute inset-0 bg-grid-pattern opacity-30 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <Reveal animation="fade-up">
          <div className="text-center max-w-3xl mx-auto space-y-3 mb-16">
            <span className="text-xs font-bold uppercase tracking-widest text-[#ea1d25] inline-block px-3 py-1 rounded-full bg-red-50 border border-red-200">
              How We Execute Your Project
            </span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight">
              Engineered 4-Step Demolition Workflow
            </h2>
            <p className="text-sm sm:text-base text-slate-600">
              Every demolition project starts with a site inspection, municipality permit processing, and a detailed safety plan before any mechanical work begins.
            </p>
          </div>
        </Reveal>

        {/* 4 Process Cards with Staggered Sequence */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {WORK_PROCESS.map((item, index) => {
            const IconComponent = stepIcons[index] || ClipboardCheck;
            return (
              <Reveal key={item.step} animation="fade-up" delay={index * 150}>
                <div
                  className="relative rounded-2xl bg-slate-50/70 border border-slate-200 p-6 flex flex-col justify-between hover:bg-white hover:border-sky-400 transition-all duration-300 group hover:shadow-lg card-hover-transition h-full"
                >
                  {/* Step Number Top Badge */}
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-10 h-10 rounded-xl bg-sky-100 border border-sky-200 flex items-center justify-center text-[#00a4e4] group-hover:bg-[#00a4e4] group-hover:text-white transition-all duration-300 group-hover:scale-110">
                      <IconComponent className="w-5 h-5" />
                    </div>
                    <span className="font-heading text-2xl font-black text-slate-300 group-hover:text-[#00a4e4] transition-colors duration-300">
                      {item.step}
                    </span>
                  </div>

                  {/* Content */}
                  <div className="space-y-2 flex-1">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-[#00a4e4]">
                      {item.subtitle}
                    </span>
                    <h3 className="font-heading text-base font-bold text-slate-900 group-hover:text-[#00a4e4] transition-colors duration-300">
                      {item.title}
                    </h3>
                    <p className="text-xs text-slate-600 leading-relaxed pt-1">
                      {item.desc}
                    </p>
                  </div>

                  {/* Highlights list */}
                  <div className="mt-6 pt-4 border-t border-slate-200 space-y-1.5">
                    {item.highlights.map((h, i) => (
                      <div key={i} className="flex items-center gap-1.5 text-[11px] text-slate-700">
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#00a4e4] shrink-0" />
                        <span className="truncate">{h}</span>
                      </div>
                    ))}
                  </div>

                  {/* Top Corner Brand Stripes Accent for first & last card */}
                  {index === 0 && (
                    <div className="absolute top-0 right-0 w-8 h-8 overflow-hidden rounded-tr-2xl">
                      <div className="w-12 h-2 brand-stripes rotate-45 transform origin-top-left -translate-y-2" />
                    </div>
                  )}
                </div>
              </Reveal>
            );
          })}
        </div>

        {/* Process Guarantee Callout */}
        <Reveal animation="zoom-in" delay={400}>
          <div className="mt-12 text-center">
            <div className="inline-flex flex-col sm:flex-row items-center gap-4 p-4 px-6 rounded-2xl bg-slate-50 border border-slate-200 shadow-sm card-hover-transition">
              <span className="text-xs font-semibold text-slate-700">
                Need immediate mobilization for an emergency or priority project?
              </span>
              <button
                onClick={onOpenQuote}
                className="px-5 py-2 text-xs font-bold uppercase tracking-wider text-white bg-gradient-to-r from-[#ea1d25] to-[#c41219] hover:from-[#ff2d35] hover:to-[#ea1d25] rounded-lg transition-all duration-300 flex items-center gap-1.5 border border-red-500/40 transform hover:-translate-y-0.5 active:scale-95"
              >
                <span>Schedule Site Inspection</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </Reveal>

      </div>
    </section>
  );
}
