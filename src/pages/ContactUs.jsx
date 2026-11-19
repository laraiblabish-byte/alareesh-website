import { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  MapPin, 
  Phone, 
  Mail, 
  Clock, 
  Send, 
  CheckCircle2, 
  AlertCircle, 
  ShieldCheck, 
  MessageSquare, 
  Building2, 
  ExternalLink
} from 'lucide-react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import FloatingActions from '../components/FloatingActions';
import Reveal from '../components/Reveal';
import { COMPANY_INFO } from '../data/companyData';

export default function ContactUs({ includeLayout = true, onOpenQuote }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Field change handler
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear error as user types
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  // Form validation
  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Full name is required';
    } else if (formData.name.trim().length < 2) {
      newErrors.name = 'Name must be at least 2 characters';
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim()) {
      newErrors.email = 'Email address is required';
    } else if (!emailRegex.test(formData.email.trim())) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required';
    } else if (formData.phone.replace(/[^0-9]/g, '').length < 7) {
      newErrors.phone = 'Please enter a valid phone number (at least 7 digits)';
    }

    if (!formData.subject.trim()) {
      newErrors.subject = 'Subject is required';
    }

    if (!formData.message.trim()) {
      newErrors.message = 'Message is required';
    } else if (formData.message.trim().length < 10) {
      newErrors.message = 'Please provide at least 10 characters describing your inquiry';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Form submission handler
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true);
    // Simulate API submission
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
    }, 800);
  };

  // Reset form to send another message
  const handleReset = () => {
    setFormData({
      name: '',
      email: '',
      phone: '',
      subject: '',
      message: ''
    });
    setErrors({});
    setIsSubmitted(false);
  };

  const content = (
    <div className="bg-white text-slate-800 font-sans selection:bg-[#ea1d25] selection:text-white">
      
      {/* ========================================================= */}
      {/* 1. SUB-HEADER BANNER & BREADCRUMBS                       */}
      {/* ========================================================= */}
      <section
        className="relative bg-slate-950 flex items-center justify-center overflow-hidden min-h-[220px] sm:min-h-[280px] border-b-2 border-[#ea1d25]"
        style={{
          backgroundImage: "url('/subheader-1.jpg')",
          backgroundSize: 'cover',
          backgroundPosition: 'center 40%'
        }}
        aria-label="Contact Us Banner"
      >
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950/95 via-slate-950/80 to-slate-950/90" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-red-950/20 via-transparent to-transparent pointer-events-none" />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 w-full text-center space-y-4">
          <Reveal animation="fade-up" duration={600}>
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white shadow-xl animate-in fade-in duration-700">
              <ShieldCheck className="w-3.5 h-3.5 text-[#00a4e4]" />
              <span className="text-xs font-bold tracking-wider uppercase drop-shadow-sm">
                Dubai Municipality Licensed Class-1 Demolition Contractor
              </span>
            </div>

            <h1 className="text-4xl sm:text-5xl md:text-6xl font-black text-white tracking-tight font-heading drop-shadow-md mt-3">
              Contact <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#ea1d25] via-red-400 to-[#00a4e4]">Us</span>
            </h1>

            <p className="max-w-2xl mx-auto text-sm sm:text-base md:text-lg text-slate-300 font-normal leading-relaxed mt-3">
              Get in touch with our engineering estimators, project directors, and site clearance specialists across Dubai &amp; the UAE.
            </p>

            <nav
              aria-label="Breadcrumb"
              className="pt-3 flex items-center justify-center flex-wrap gap-2 text-xs sm:text-sm text-slate-300 drop-shadow-sm font-medium"
            >
              <Link to="/" className="text-slate-300 hover:text-white transition-colors">
                Home
              </Link>
              <span className="text-slate-500">›</span>
              <span className="text-[#ea1d25] font-bold">Contact Us</span>
            </nav>
          </Reveal>
        </div>
      </section>

      {/* ========================================================= */}
      {/* 2. 4-COLUMN CONTACT INFO CARDS                           */}
      {/* ========================================================= */}
      <section className="py-12 sm:py-16 bg-slate-50 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Reveal animation="fade-up" delay={80}>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              
              {/* Card 1: Our Location */}
              <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm hover:border-red-200 hover:shadow-md transition-all space-y-3">
                <div className="w-12 h-12 rounded-xl bg-red-50 text-[#ea1d25] flex items-center justify-center">
                  <MapPin className="w-6 h-6" />
                </div>
                <div className="space-y-1">
                  <h3 className="font-heading font-black text-lg text-slate-900">
                    Our Location
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    {COMPANY_INFO.headOffice.address}
                  </p>
                </div>
                <a
                  href="https://maps.google.com/maps?q=Schone%20Business%20Park%20%2C%20R15%20%2C%20Zone%20-1%20%2CDip%201%2CDubai"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-[#ea1d25] hover:text-[#c41219] pt-1"
                >
                  <span>View on Google Maps</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>

              {/* Card 2: Call Us */}
              <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm hover:border-sky-200 hover:shadow-md transition-all space-y-3">
                <div className="w-12 h-12 rounded-xl bg-sky-50 text-[#00a4e4] flex items-center justify-center">
                  <Phone className="w-6 h-6" />
                </div>
                <div className="space-y-1">
                  <h3 className="font-heading font-black text-lg text-slate-900">
                    Call Us
                  </h3>
                  <div className="space-y-1 text-xs sm:text-sm text-slate-600">
                    <div>
                      <span className="text-slate-400 block text-[11px] font-bold uppercase">Landline:</span>
                      <a
                        href={`tel:${COMPANY_INFO.phoneRaw}`}
                        className="text-slate-900 font-bold hover:text-[#ea1d25] transition-colors"
                      >
                        {COMPANY_INFO.phone}
                      </a>
                    </div>
                    <div>
                      <span className="text-slate-400 block text-[11px] font-bold uppercase">Mobile / 24-7:</span>
                      <a
                        href="tel:+971507104786"
                        className="text-slate-900 font-bold hover:text-[#ea1d25] transition-colors"
                      >
                        +971 50 710 4786
                      </a>
                    </div>
                  </div>
                </div>
                <span className="inline-block text-[11px] font-mono text-emerald-600 font-bold bg-emerald-50 px-2.5 py-0.5 rounded">
                  ● 24/7 Hotline Active
                </span>
              </div>

              {/* Card 3: Email Us */}
              <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm hover:border-emerald-200 hover:shadow-md transition-all space-y-3">
                <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
                  <Mail className="w-6 h-6" />
                </div>
                <div className="space-y-1">
                  <h3 className="font-heading font-black text-lg text-slate-900">
                    Email Us
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    Send project drawings, tender inquiries or scope documents directly to:
                  </p>
                  <a
                    href={`mailto:${COMPANY_INFO.email}`}
                    className="block text-xs sm:text-sm font-bold text-slate-900 hover:text-[#ea1d25] transition-colors break-all pt-1"
                  >
                    {COMPANY_INFO.email}
                  </a>
                </div>
                <span className="inline-block text-[11px] text-slate-400">
                  Response within 2-4 hours
                </span>
              </div>

              {/* Card 4: Working Hours */}
              <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm hover:border-amber-200 hover:shadow-md transition-all space-y-3">
                <div className="w-12 h-12 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center">
                  <Clock className="w-6 h-6" />
                </div>
                <div className="space-y-1">
                  <h3 className="font-heading font-black text-lg text-slate-900">
                    Working Hours
                  </h3>
                  <div className="text-xs sm:text-sm text-slate-600 space-y-1">
                    <p className="font-semibold text-slate-800">
                      Mon – Sat: 7:00 AM – 7:00 PM
                    </p>
                    <p className="text-slate-500">
                      Sunday: Emergency Support Only
                    </p>
                  </div>
                </div>
                <span className="inline-block text-[11px] font-semibold text-[#00a4e4] bg-sky-50 px-2.5 py-0.5 rounded">
                  Dubai &amp; All UAE Emirates
                </span>
              </div>

            </div>
          </Reveal>
        </div>
      </section>

      {/* ========================================================= */}
      {/* 3. MAIN CONTACT FORM & SIDEBAR SECTION                   */}
      {/* ========================================================= */}
      <section className="py-16 sm:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            
            {/* Left Column: Contact Form (7 cols) */}
            <div className="lg:col-span-7">
              <Reveal animation="fade-right">
                <div className="space-y-8">
                  <div className="space-y-3">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-50 border border-red-200 text-[#ea1d25] text-xs font-bold tracking-wider uppercase">
                      <MessageSquare className="w-3.5 h-3.5" />
                      <span>Send Us a Message</span>
                    </div>
                    <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight font-heading leading-tight">
                      Have a Project to Discuss? Let&apos;s Connect.
                    </h2>
                    <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
                      Fill in your project details below. Our senior structural estimators and site clearance engineers will review your scope and provide a formal engineering quotation within 24 hours.
                    </p>
                  </div>

                  {/* Form Success State */}
                  {isSubmitted ? (
                    <div className="p-8 rounded-3xl bg-emerald-50 border border-emerald-200 text-emerald-950 space-y-4 animate-in fade-in zoom-in-95 duration-300">
                      <div className="w-14 h-14 rounded-2xl bg-emerald-600 text-white flex items-center justify-center shadow-lg shadow-emerald-600/20">
                        <CheckCircle2 className="w-8 h-8" />
                      </div>
                      <div className="space-y-1">
                        <h3 className="text-xl font-bold font-heading text-emerald-900">
                          Thank You, {formData.name || 'Valued Client'}!
                        </h3>
                        <p className="text-sm text-emerald-800 leading-relaxed">
                          Your message has been sent successfully. One of our certified duty demolition managers will review your inquiry and contact you at <strong className="font-semibold">{formData.email || 'your email'}</strong> or <strong className="font-semibold">{formData.phone || 'your phone number'}</strong> shortly.
                        </p>
                      </div>
                      <div className="pt-2">
                        <button
                          type="button"
                          onClick={handleReset}
                          className="px-6 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs uppercase tracking-wider transition-colors"
                        >
                          Send Another Message
                        </button>
                      </div>
                    </div>
                  ) : (
                    /* Contact Form */
                    <form onSubmit={handleSubmit} noValidate className="space-y-5 bg-slate-50/70 p-7 sm:p-9 rounded-3xl border border-slate-200 shadow-sm">
                      
                      {/* Row 1: Name & Email */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                        {/* Name Field */}
                        <div className="space-y-1.5">
                          <label htmlFor="contact-name" className="block text-xs font-bold uppercase tracking-wider text-slate-700">
                            Your Full Name <span className="text-[#ea1d25]">*</span>
                          </label>
                          <input
                            type="text"
                            id="contact-name"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            placeholder="e.g. Mohammed Al Hashmi"
                            className={`w-full px-4 py-3 rounded-xl bg-white border text-sm text-slate-800 placeholder-slate-400 focus:outline-none transition-colors ${
                              errors.name
                                ? 'border-[#ea1d25] focus:border-[#ea1d25] focus:ring-1 focus:ring-red-200'
                                : 'border-slate-300 focus:border-[#00a4e4] focus:ring-1 focus:ring-sky-200'
                            }`}
                          />
                          {errors.name && (
                            <p className="text-xs text-[#ea1d25] flex items-center gap-1 font-medium mt-1">
                              <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                              <span>{errors.name}</span>
                            </p>
                          )}
                        </div>

                        {/* Email Field */}
                        <div className="space-y-1.5">
                          <label htmlFor="contact-email" className="block text-xs font-bold uppercase tracking-wider text-slate-700">
                            Email Address <span className="text-[#ea1d25]">*</span>
                          </label>
                          <input
                            type="email"
                            id="contact-email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            placeholder="e.g. name@company.ae"
                            className={`w-full px-4 py-3 rounded-xl bg-white border text-sm text-slate-800 placeholder-slate-400 focus:outline-none transition-colors ${
                              errors.email
                                ? 'border-[#ea1d25] focus:border-[#ea1d25] focus:ring-1 focus:ring-red-200'
                                : 'border-slate-300 focus:border-[#00a4e4] focus:ring-1 focus:ring-sky-200'
                            }`}
                          />
                          {errors.email && (
                            <p className="text-xs text-[#ea1d25] flex items-center gap-1 font-medium mt-1">
                              <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                              <span>{errors.email}</span>
                            </p>
                          )}
                        </div>
                      </div>

                      {/* Row 2: Phone & Subject */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                        {/* Phone Field */}
                        <div className="space-y-1.5">
                          <label htmlFor="contact-phone" className="block text-xs font-bold uppercase tracking-wider text-slate-700">
                            Phone Number <span className="text-[#ea1d25]">*</span>
                          </label>
                          <input
                            type="tel"
                            id="contact-phone"
                            name="phone"
                            value={formData.phone}
                            onChange={handleChange}
                            placeholder="e.g. +971 50 123 4567"
                            className={`w-full px-4 py-3 rounded-xl bg-white border text-sm text-slate-800 placeholder-slate-400 focus:outline-none transition-colors ${
                              errors.phone
                                ? 'border-[#ea1d25] focus:border-[#ea1d25] focus:ring-1 focus:ring-red-200'
                                : 'border-slate-300 focus:border-[#00a4e4] focus:ring-1 focus:ring-sky-200'
                            }`}
                          />
                          {errors.phone && (
                            <p className="text-xs text-[#ea1d25] flex items-center gap-1 font-medium mt-1">
                              <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                              <span>{errors.phone}</span>
                            </p>
                          )}
                        </div>

                        {/* Subject Field */}
                        <div className="space-y-1.5">
                          <label htmlFor="contact-subject" className="block text-xs font-bold uppercase tracking-wider text-slate-700">
                            Subject / Scope <span className="text-[#ea1d25]">*</span>
                          </label>
                          <input
                            type="text"
                            id="contact-subject"
                            name="subject"
                            value={formData.subject}
                            onChange={handleChange}
                            placeholder="e.g. Villa Demolition in Palm Jumeirah"
                            className={`w-full px-4 py-3 rounded-xl bg-white border text-sm text-slate-800 placeholder-slate-400 focus:outline-none transition-colors ${
                              errors.subject
                                ? 'border-[#ea1d25] focus:border-[#ea1d25] focus:ring-1 focus:ring-red-200'
                                : 'border-slate-300 focus:border-[#00a4e4] focus:ring-1 focus:ring-sky-200'
                            }`}
                          />
                          {errors.subject && (
                            <p className="text-xs text-[#ea1d25] flex items-center gap-1 font-medium mt-1">
                              <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                              <span>{errors.subject}</span>
                            </p>
                          )}
                        </div>
                      </div>

                      {/* Row 3: Message Field */}
                      <div className="space-y-1.5">
                        <label htmlFor="contact-message" className="block text-xs font-bold uppercase tracking-wider text-slate-700">
                          Project Description &amp; Scope Requirements <span className="text-[#ea1d25]">*</span>
                        </label>
                        <textarea
                          id="contact-message"
                          name="message"
                          rows={5}
                          value={formData.message}
                          onChange={handleChange}
                          placeholder="Please include details such as building type, approximate area/floors, site location, timeline, and whether DEWA disconnection or permits are already obtained..."
                          className={`w-full px-4 py-3 rounded-xl bg-white border text-sm text-slate-800 placeholder-slate-400 focus:outline-none transition-colors ${
                            errors.message
                              ? 'border-[#ea1d25] focus:border-[#ea1d25] focus:ring-1 focus:ring-red-200'
                              : 'border-slate-300 focus:border-[#00a4e4] focus:ring-1 focus:ring-sky-200'
                          }`}
                        />
                        {errors.message && (
                          <p className="text-xs text-[#ea1d25] flex items-center gap-1 font-medium mt-1">
                            <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                            <span>{errors.message}</span>
                          </p>
                        )}
                      </div>

                      {/* Submit Button */}
                      <div className="pt-2">
                        <button
                          type="submit"
                          disabled={isSubmitting}
                          className="w-full sm:w-auto px-9 py-4 rounded-xl bg-[#ea1d25] hover:bg-[#c41219] text-white font-extrabold text-xs uppercase tracking-wider shadow-lg shadow-red-500/25 flex items-center justify-center gap-2 transition-all transform hover:-translate-y-0.5 active:scale-95 disabled:opacity-70 disabled:cursor-not-allowed"
                        >
                          {isSubmitting ? (
                            <>
                              <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                              <span>Sending Message...</span>
                            </>
                          ) : (
                            <>
                              <span>Submit Message</span>
                              <Send className="w-4 h-4" />
                            </>
                          )}
                        </button>
                      </div>

                    </form>
                  )}
                </div>
              </Reveal>
            </div>

            {/* Right Column: Direct Help & Credentials Sidebar (5 cols) */}
            <div className="lg:col-span-5">
              <Reveal animation="fade-left" delay={150}>
                <div className="space-y-6">
                  {/* Dark Accent Fast Assistance Card */}
                  <div className="p-7 sm:p-8 rounded-3xl bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-white shadow-2xl border border-slate-800 space-y-5 relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-[#ea1d25]/15 rounded-full blur-3xl pointer-events-none" />

                    <div className="inline-flex items-center gap-2 text-[#00a4e4] text-xs font-bold uppercase tracking-wider">
                      <Clock className="w-4 h-4" />
                      <span>Immediate Duty Manager Access</span>
                    </div>

                    <div className="space-y-2">
                      <h3 className="text-2xl font-black font-heading text-white">
                        Need an Urgent Site Visit or Demolition NOC?
                      </h3>
                      <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                        Our certified duty managers and site inspectors are available for immediate mobilization, safety barrier setup, and municipal coordination across Dubai.
                      </p>
                    </div>

                    {/* Direct Action Buttons */}
                    <div className="space-y-3 pt-2">
                      <a
                        href={`https://wa.me/${COMPANY_INFO.whatsapp}?text=Hello%20Al%20Areesh%20Demolition,%20I%20need%20assistance%20for%20a%20project`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-full py-3.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg shadow-emerald-950/20 transition-all"
                      >
                        <MessageSquare className="w-4 h-4" />
                        <span>WhatsApp Instant Assistance</span>
                      </a>

                      <a
                        href={`tel:${COMPANY_INFO.phoneRaw}`}
                        className="w-full py-3.5 rounded-xl bg-white hover:bg-slate-100 text-slate-900 font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-md transition-all"
                      >
                        <Phone className="w-4 h-4 text-[#ea1d25]" />
                        <span>Call Landline: {COMPANY_INFO.phone}</span>
                      </a>

                      <a
                        href="tel:+971507104786"
                        className="w-full py-3.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 border border-slate-700 transition-all"
                      >
                        <Phone className="w-4 h-4 text-[#00a4e4]" />
                        <span>Mobile Hotline: +971 50 710 4786</span>
                      </a>
                    </div>

                    {/* Authority Stamps */}
                    <div className="pt-4 border-t border-slate-800 grid grid-cols-2 gap-3 text-center">
                      <div className="p-3 rounded-xl bg-white/5 border border-white/10">
                        <div className="text-base font-black text-[#ea1d25] font-heading">License #709421</div>
                        <div className="text-[10px] text-slate-400 mt-0.5">Dubai Municipality</div>
                      </div>
                      <div className="p-3 rounded-xl bg-white/5 border border-white/10">
                        <div className="text-base font-black text-[#00a4e4] font-heading">Class-1 Certified</div>
                        <div className="text-[10px] text-slate-400 mt-0.5">Demolition &amp; Earthworks</div>
                      </div>
                    </div>
                  </div>

                  {/* Branch Operations Box */}
                  <div className="p-6 rounded-3xl bg-slate-50 border border-slate-200 space-y-4">
                    <div className="flex items-center gap-2">
                      <Building2 className="w-5 h-5 text-[#ea1d25]" />
                      <h4 className="font-heading font-bold text-base text-slate-900">
                        Logistics Yard &amp; Fleet Operations
                      </h4>
                    </div>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      {COMPANY_INFO.branchOffice.address}
                    </p>
                    <div className="text-[11px] text-slate-500 font-mono">
                      Heavy Excavators • 32m³ Tippers • Hydraulic Breakers
                    </div>
                  </div>
                </div>
              </Reveal>
            </div>

          </div>
        </div>
      </section>

      {/* ========================================================= */}
      {/* 4. GOOGLE MAPS LOCATION SECTION                          */}
      {/* ========================================================= */}
      <section className="py-16 sm:py-20 bg-slate-50 border-t border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          
          <Reveal animation="fade-up">
            <div className="text-center max-w-3xl mx-auto space-y-3">
              <span className="text-xs font-bold uppercase tracking-wider text-[#ea1d25] px-3.5 py-1.5 rounded-full bg-red-50 border border-red-200 inline-block">
                Interactive Map
              </span>
              <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight font-heading">
                Find Our Office &amp; Operations Hub
              </h2>
              <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
                Conveniently located at Schon Business Park, Dubai Investments Park (DIP 1), with direct access to Sheikh Mohammed Bin Zayed Road (E311), Emirates Road (E611), and Expo Road.
              </p>
            </div>
          </Reveal>

          {/* Responsive Map Container & Directions */}
          <Reveal animation="fade-up" delay={120}>
            <div className="space-y-6">
              <div className="rounded-3xl overflow-hidden shadow-2xl border-2 border-slate-200 bg-slate-900 h-[400px] sm:h-[480px] w-full relative">
                <iframe
                  src="https://maps.google.com/maps?q=Schone%20Business%20Park%20%2C%20R15%20%2C%20Zone%20-1%20%2CDip%201%2CDubai&t=m&z=16&output=embed&iwloc=near"
                  title="Al Areesh Demolition Office - Schon Business Park, DIP 1, Dubai"
                  className="w-full h-full border-0"
                  allowFullScreen=""
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>

              {/* Quick Direction Banner */}
              <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="space-y-0.5 text-center sm:text-left">
                  <div className="text-sm font-bold text-slate-900">
                    Al Areesh Wrecking &amp; Demolition Works LLC
                  </div>
                  <div className="text-xs text-slate-500">
                    Office Retail-15, Zone-1, Schon Business Park, DIP 1, Dubai, UAE
                  </div>
                </div>

                <a
                  href="https://maps.google.com/maps?q=Schone%20Business%20Park%20%2C%20R15%20%2C%20Zone%20-1%20%2CDip%201%2CDubai"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-6 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs uppercase tracking-wider flex items-center gap-1.5 shrink-0 transition-colors"
                >
                  <span>Get Driving Directions</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          </Reveal>

        </div>
      </section>

      {/* ========================================================= */}
      {/* 5. BOTTOM FAST INQUIRY CTA                               */}
      {/* ========================================================= */}
      <section className="py-12 bg-white border-t border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Reveal animation="fade-up">
            <div className="text-center space-y-4">
              <h3 className="text-xl sm:text-2xl font-black text-slate-900 font-heading">
                Need an Engineering Feasibility Review for a Tender?
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 max-w-lg mx-auto">
                Our registered engineers review tender drawings, calculate scrap metal salvage offsets, and provide certified method statements.
              </p>
              <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
                <button
                  onClick={() => {
                    if (typeof onOpenQuote === 'function') onOpenQuote('Tender Feasibility Review');
                  }}
                  className="px-7 py-3 rounded-xl bg-[#ea1d25] hover:bg-[#c41219] text-white font-bold text-xs uppercase tracking-wider shadow-md transition-all transform hover:-translate-y-0.5"
                >
                  Request Tender Quote
                </button>
                <Link
                  to="/services"
                  className="px-7 py-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs uppercase tracking-wider border border-slate-200 transition-all"
                >
                  Explore All 11 Services
                </Link>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

    </div>
  );

  if (includeLayout) {
    return (
      <div className="min-h-screen bg-white text-slate-800 flex flex-col font-sans selection:bg-[#ea1d25] selection:text-white">
        <Header onOpenQuote={onOpenQuote} />
        <main className="flex-1">{content}</main>
        <Footer />
        <FloatingActions />
      </div>
    );
  }

  return content;
}
