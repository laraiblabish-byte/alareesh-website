import { TESTIMONIALS } from '../data/companyData';
import { Star, Quote, CheckCircle2, ExternalLink } from 'lucide-react';
import Reveal from './Reveal';

export default function Testimonials() {
  return (
    <section className="py-20 bg-slate-50/70 border-y border-slate-200 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header with Google Rating Badge */}
        <Reveal animation="fade-up">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6 mb-12">
            <div className="space-y-2 text-center md:text-left">
              <span className="text-xs font-bold uppercase tracking-widest text-[#00a4e4] inline-block px-3 py-1 rounded-full bg-sky-50 border border-sky-200">
                Verified Client Feedback
              </span>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight">
                What Our Clients Have to Say
              </h2>
              <p className="text-sm text-slate-600 max-w-xl">
                From major developers like Dubai Holding to residential villa owners in Jumeirah, discover why contractors trust Al Areesh.
              </p>
            </div>

            {/* Google Verified Review Card */}
            <div className="flex items-center gap-4 p-4 px-5 rounded-2xl bg-white border border-slate-200 shadow-sm card-hover-transition">
              <div className="flex flex-col items-center">
                <div className="flex items-center gap-1 text-amber-500">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                  ))}
                </div>
                <span className="text-xs font-extrabold text-slate-900 mt-1">5.0 / 5.0 Rating</span>
              </div>
              <div className="h-8 w-px bg-slate-200" />
              <div className="text-left text-xs">
                <span className="font-bold text-slate-900 block">Google Verified Reviews</span>
                <span className="text-sky-700 text-[11px] font-medium">Trustindex Verified Source</span>
              </div>
            </div>
          </div>
        </Reveal>

        {/* Testimonial Cards with Staggered Transition */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {TESTIMONIALS.map((item, idx) => (
            <Reveal key={idx} animation="fade-up" delay={idx * 100}>
              <div
                className="p-6 rounded-2xl bg-white border border-slate-200 hover:border-sky-400 transition-all duration-300 flex flex-col justify-between group hover:shadow-lg card-hover-transition h-full"
              >
                <div>
                  {/* Rating & Quote Icon */}
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-1 text-amber-500">
                      {[...Array(item.rating)].map((_, i) => (
                        <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                      ))}
                    </div>
                    <Quote className="w-6 h-6 text-slate-300 group-hover:text-red-400/50 transition-colors duration-300 group-hover:scale-110" />
                  </div>

                  <p className="text-xs text-slate-700 leading-relaxed italic">
                    "{item.quote}"
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-slate-100 space-y-1">
                  <div className="flex items-center justify-between">
                    <h4 className="font-heading text-sm font-bold text-slate-900 group-hover:text-[#00a4e4] transition-colors duration-200">
                      {item.name}
                    </h4>
                    <span className="text-[10px] text-emerald-600 font-semibold flex items-center gap-0.5">
                      <CheckCircle2 className="w-3 h-3" />
                      Verified
                    </span>
                  </div>
                  <div className="text-[11px] text-sky-700 font-medium">{item.role}</div>
                  <div className="text-[10px] text-slate-500">{item.company} • {item.location}</div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>

        {/* Social Media Follow Strip */}
        <Reveal animation="zoom-in" delay={300}>
          <div className="mt-12 p-6 rounded-2xl bg-white border border-slate-200 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4 card-hover-transition">
            <div className="space-y-1 text-center sm:text-left">
              <h4 className="text-sm font-bold text-slate-900 font-heading">
                Follow Al Areesh on Social Media
              </h4>
              <p className="text-xs text-slate-600">
                Stay updated with our latest demolition projects, live site clearances, and machinery operations in Dubai.
              </p>
            </div>

            <div className="flex items-center gap-3">
              <a
                href="https://www.facebook.com/AlAreeshwreckingdemolitionE"
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 rounded-lg bg-blue-50 text-blue-700 border border-blue-200 text-xs font-semibold hover:bg-blue-100 transition-all duration-200 flex items-center gap-1.5 transform hover:-translate-y-0.5"
              >
                <span>Facebook</span>
                <ExternalLink className="w-3 h-3" />
              </a>

              <a
                href="https://www.instagram.com/alareeshdemolition/"
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 rounded-lg bg-pink-50 text-pink-700 border border-pink-200 text-xs font-semibold hover:bg-pink-100 transition-all duration-200 flex items-center gap-1.5 transform hover:-translate-y-0.5"
              >
                <span>Instagram</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </div>
        </Reveal>

      </div>
    </section>
  );
}
