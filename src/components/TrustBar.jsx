import { Shield, Building, Award, FileCheck, Layers } from 'lucide-react';
import Reveal from './Reveal';

export default function TrustBar() {
  const credentials = [
    {
      title: "Dubai Municipality",
      desc: "Licensed Class-1 Contractor",
      icon: Shield,
      tag: "Approval #709421"
    },
    {
      title: "Dubai Civil Defence",
      desc: "Safety & Hazard Compliant",
      icon: Award,
      tag: "Certified Protocol"
    },
    {
      title: "Dubai Holding Real Estate",
      desc: "Completed Demolition Projects",
      icon: Building,
      tag: "Trusted Partner"
    },
    {
      title: "Trakhees Civil Engineering",
      desc: "Special Development Zones",
      icon: Layers,
      tag: "Port & Freezone NOCs"
    },
    {
      title: "UAE OSHAD Standards",
      desc: "Health, Safety & Environment",
      icon: FileCheck,
      tag: "Zero-Incident Audit"
    }
  ];

  return (
    <section className="bg-slate-50/90 border-y border-slate-200/80 py-6 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <Reveal animation="fade-right">
            <div className="shrink-0 text-center md:text-left">
              <span className="text-[11px] font-bold uppercase tracking-widest text-[#00a4e4] block">
                AUTHORITY APPROVALS & COMPLIANCE
              </span>
              <span className="text-sm font-bold text-slate-800">
                Fully Licensed for High-Risk Demolition in the UAE
              </span>
            </div>
          </Reveal>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 w-full md:w-auto">
            {credentials.map((item, idx) => {
              const Icon = item.icon;
              return (
                <Reveal key={idx} animation="fade-up" delay={idx * 80}>
                  <div
                    className="flex items-center gap-2.5 px-3 py-2 rounded-xl bg-white border border-slate-200 hover:border-sky-400 hover:shadow-sm transition-all duration-300 card-hover-transition cursor-default"
                  >
                    <Icon className="w-5 h-5 text-[#ea1d25] shrink-0" />
                    <div className="text-left">
                      <div className="text-xs font-bold text-slate-800 leading-tight">{item.title}</div>
                      <div className="text-[10px] text-slate-500">{item.desc}</div>
                    </div>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
