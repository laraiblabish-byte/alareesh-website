import { useState } from 'react';
import { COMPANY_INFO, SERVICES } from '../data/companyData';
import { Phone, Mail, MapPin, Send, CheckCircle2, Clock, ShieldCheck, MessageSquare } from 'lucide-react';
import Reveal from './Reveal';
import { submitContactMessage } from '../lib/supabase';

export default function QuoteSection({ initialData = null }) {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    service: initialData?.service || 'Controlled Demolition Services',
    location: initialData?.location || 'Dubai - DIP / Jebel Ali',
    timeline: 'Immediate (Within 7 Days)',
    message: initialData?.details || ''
  });

  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      await submitContactMessage({
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        subject: `Quote Request: ${formData.service}`,
        message: `Service: ${formData.service}\nLocation: ${formData.location}\nTimeline: ${formData.timeline}\nDetails: ${formData.message || 'Standard quote request'}`,
        source: 'Home Quote Form'
      });
      setSubmitted(true);
    } catch (err) {
      console.warn('Quote submission notice:', err.message);
      setSubmitted(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-20 bg-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Top Callout Banner */}
        <Reveal animation="fade-up">
          <div className="text-center max-w-3xl mx-auto space-y-3 mb-16">
            <span className="text-xs font-bold uppercase tracking-widest text-[#ea1d25] inline-block px-3 py-1 rounded-full bg-red-50 border border-red-200">
              Request A Free Quote
            </span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight">
              Need a Reliable Demolition Company in Dubai? Get Your Free Quote Today
            </h2>
            <p className="text-sm sm:text-base text-slate-600">
              Contact us today. Our structural engineers review your requirements and provide a detailed methodology statement within 24 hours.
            </p>
          </div>
        </Reveal>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Direct Contact & Office Cards */}
          <div className="lg:col-span-5 space-y-6">
            <Reveal animation="fade-right" delay={150}>
              {/* Primary Hotline Card with Red Accent */}
              <div className="p-6 rounded-2xl bg-slate-50/70 border border-slate-200 space-y-4 card-hover-transition">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-red-50 border border-red-200 flex items-center justify-center text-[#ea1d25]">
                    <Phone className="w-6 h-6" />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-slate-500 uppercase tracking-wider">Direct Phone Inquiries</div>
                    <a
                      href={`tel:${COMPANY_INFO.phoneRaw}`}
                      className="font-heading text-xl font-bold text-slate-900 hover:text-[#00a4e4] transition-colors duration-200"
                    >
                      {COMPANY_INFO.phone}
                    </a>
                  </div>
                </div>

                <div className="pt-3 border-t border-slate-200 flex items-center justify-between text-xs text-slate-600">
                  <span className="flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5 text-[#00a4e4]" />
                    Mon - Sat: 7AM - 7PM
                  </span>
                  <span className="text-emerald-600 font-semibold">24/7 Emergency Demolition</span>
                </div>
              </div>
            </Reveal>

            <Reveal animation="fade-right" delay={250}>
              {/* WhatsApp Quick Connect Card */}
              <div className="p-6 rounded-2xl bg-slate-50/70 border border-emerald-200 flex items-center justify-between card-hover-transition">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-emerald-50 border border-emerald-200 flex items-center justify-center text-emerald-600">
                    <MessageSquare className="w-6 h-6" />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-slate-500 uppercase tracking-wider">Instant WhatsApp Chat</div>
                    <div className="text-sm font-bold text-slate-900">Direct Engineer Response</div>
                  </div>
                </div>
                <a
                  href={`https://wa.me/${COMPANY_INFO.whatsapp}?text=Hello%20Al%20Areesh%20Demolition,%20I%20need%20a%20quote`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold transition-all duration-200 transform hover:scale-105 active:scale-95"
                >
                  Chat Now
                </a>
              </div>
            </Reveal>

            <Reveal animation="fade-right" delay={350}>
              {/* Office Locations */}
              <div className="p-6 rounded-2xl bg-slate-50/70 border border-slate-200 space-y-4 card-hover-transition">
                <h3 className="font-heading text-sm font-bold uppercase tracking-wider text-slate-900">
                  UAE Physical Office Locations
                </h3>

                <div className="space-y-4 text-xs">
                  <div className="flex items-start gap-3">
                    <MapPin className="w-4 h-4 text-[#ea1d25] shrink-0 mt-0.5" />
                    <div>
                      <div className="font-bold text-slate-900">{COMPANY_INFO.headOffice.title}</div>
                      <div className="text-slate-600 mt-0.5">{COMPANY_INFO.headOffice.address}</div>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 pt-3 border-t border-slate-200">
                    <MapPin className="w-4 h-4 text-[#00a4e4] shrink-0 mt-0.5" />
                    <div>
                      <div className="font-bold text-slate-900">{COMPANY_INFO.branchOffice.title}</div>
                      <div className="text-slate-600 mt-0.5">{COMPANY_INFO.branchOffice.address}</div>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 pt-3 border-t border-slate-200">
                    <Mail className="w-4 h-4 text-[#ea1d25] shrink-0 mt-0.5" />
                    <div>
                      <div className="font-bold text-slate-900">Email Address</div>
                      <a href={`mailto:${COMPANY_INFO.email}`} className="text-[#00a4e4] hover:text-sky-700 transition-colors duration-200">
                        {COMPANY_INFO.email}
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </Reveal>

          </div>

          {/* Right Column: Quote Request Form with Transition */}
          <div className="lg:col-span-7">
            <Reveal animation="fade-left" delay={200}>
              <div className="p-6 sm:p-8 rounded-3xl bg-white border border-slate-200 shadow-xl relative card-hover-transition">
                
                {submitted ? (
                  <div className="py-12 text-center space-y-4 animate-in zoom-in duration-300">
                    <div className="w-16 h-16 rounded-full bg-emerald-100 border border-emerald-300 text-emerald-600 flex items-center justify-center mx-auto">
                      <CheckCircle2 className="w-8 h-8" />
                    </div>
                    <h3 className="font-heading text-2xl font-bold text-slate-900">
                      Quote Request Received!
                    </h3>
                    <p className="text-sm text-slate-600 max-w-md mx-auto">
                      Thank you, <strong className="text-slate-900">{formData.name}</strong>. Our demolition engineering team will review your specifications and contact you within 24 hours at <strong className="text-slate-900">{formData.phone}</strong>.
                    </p>
                    <button
                      onClick={() => setSubmitted(false)}
                      className="mt-4 px-6 py-2.5 rounded-lg text-xs font-semibold text-slate-700 hover:text-slate-900 bg-slate-100 hover:bg-slate-200 transition-colors"
                    >
                      Submit Another Inquiry
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                          Your Full Name *
                        </label>
                        <input
                          type="text"
                          required
                          placeholder="e.g. Tariq Al Hashimi"
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          className="w-full bg-slate-50 border border-slate-300 text-slate-900 placeholder-slate-400 text-xs rounded-xl p-3.5 focus:outline-none focus:border-sky-400 focus:bg-white transition-colors duration-200"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                          Phone / WhatsApp Number *
                        </label>
                        <input
                          type="tel"
                          required
                          placeholder="+971 50 123 4567"
                          value={formData.phone}
                          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                          className="w-full bg-slate-50 border border-slate-300 text-slate-900 placeholder-slate-400 text-xs rounded-xl p-3.5 focus:outline-none focus:border-sky-400 focus:bg-white transition-colors duration-200"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                          Email Address *
                        </label>
                        <input
                          type="email"
                          required
                          placeholder="name@company.ae"
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          className="w-full bg-slate-50 border border-slate-300 text-slate-900 placeholder-slate-400 text-xs rounded-xl p-3.5 focus:outline-none focus:border-sky-400 focus:bg-white transition-colors duration-200"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                          Service Required *
                        </label>
                        <select
                          value={formData.service}
                          onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                          className="w-full bg-slate-50 border border-slate-300 text-slate-900 text-xs rounded-xl p-3.5 focus:outline-none focus:border-sky-400 focus:bg-white transition-colors duration-200"
                        >
                          {SERVICES.map((s) => (
                            <option key={s.id} value={s.title}>{s.title}</option>
                          ))}
                        </select>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                          Project Location
                        </label>
                        <select
                          value={formData.location}
                          onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                          className="w-full bg-slate-50 border border-slate-300 text-slate-900 text-xs rounded-xl p-3.5 focus:outline-none focus:border-sky-400 focus:bg-white transition-colors duration-200"
                        >
                          <option value="Dubai - DIP / Jebel Ali">Dubai - DIP / Jebel Ali</option>
                          <option value="Dubai - Jumeirah / Umm Suqeim">Dubai - Jumeirah / Umm Suqeim</option>
                          <option value="Dubai - Business Bay / Downtown">Dubai - Business Bay / Downtown</option>
                          <option value="Dubai - Deira / Al Qusais">Dubai - Deira / Al Qusais</option>
                          <option value="Dubai - Dubai South / Expo">Dubai - Dubai South / Expo</option>
                          <option value="Sharjah / Ajman">Sharjah / Ajman</option>
                          <option value="Abu Dhabi / Al Ain">Abu Dhabi / Al Ain</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                          Estimated Start Timeline
                        </label>
                        <select
                          value={formData.timeline}
                          onChange={(e) => setFormData({ ...formData, timeline: e.target.value })}
                          className="w-full bg-slate-50 border border-slate-300 text-slate-900 text-xs rounded-xl p-3.5 focus:outline-none focus:border-sky-400 focus:bg-white transition-colors duration-200"
                        >
                          <option value="Immediate (Within 7 Days)">Immediate (Within 7 Days)</option>
                          <option value="Within 2 to 4 Weeks">Within 2 to 4 Weeks</option>
                          <option value="Next 1 - 3 Months">Next 1 - 3 Months</option>
                          <option value="Budgeting & Planning Stage">Budgeting & Planning Stage</option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                        Project Details / Scope Description
                      </label>
                      <textarea
                        rows={4}
                        placeholder="Describe the structure (e.g. G+1 Villa, concrete raft slab, basement excavation depth, utility status)..."
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        className="w-full bg-slate-50 border border-slate-300 text-slate-900 placeholder-slate-400 text-xs rounded-xl p-3.5 focus:outline-none focus:border-sky-400 focus:bg-white transition-colors duration-200"
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full py-4 text-xs font-extrabold uppercase tracking-wider text-white bg-gradient-to-r from-[#ea1d25] to-[#c41219] hover:from-[#ff2d35] hover:to-[#ea1d25] rounded-xl shadow-md flex items-center justify-center gap-2 transition-all duration-300 transform hover:-translate-y-0.5 border border-red-500/50 active:scale-[0.98] disabled:opacity-75 disabled:cursor-not-allowed"
                    >
                      <Send className="w-4 h-4" />
                      <span>{isSubmitting ? 'Submitting Request...' : 'Submit Free Quote Request'}</span>
                    </button>

                    <div className="flex items-center justify-center gap-2 text-[11px] text-slate-500 pt-1">
                      <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                      <span>Strictly confidential. No spam. Contact within 24 hours guaranteed.</span>
                    </div>
                  </form>
                )}

              </div>
            </Reveal>
          </div>

        </div>

      </div>
    </section>
  );
}
