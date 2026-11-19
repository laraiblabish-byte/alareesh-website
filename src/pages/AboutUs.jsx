import { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  CheckCircle2, 
  Phone, 
  ArrowRight, 
  ShieldCheck, 
  Award, 
  HardHat, 
  Plus, 
  Minus, 
  MessageSquare, 
  X, 
  Building2, 
  Building,
  Factory,
  Landmark,
  Truck,
  Send,
  Clock,
  Sparkles,
  Check,
  HelpCircle
} from 'lucide-react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import FloatingActions from '../components/FloatingActions';
import Reveal from '../components/Reveal';
import { COMPANY_INFO } from '../data/companyData';

export default function AboutUs({ includeLayout = true, onOpenQuote }) {
  // Accordion state (FAQ item 0 active by default matching original website)
  const [openFaqIndex, setOpenFaqIndex] = useState(0);

  // Self-contained Quote Modal state for standalone testing
  const [isQuoteModalOpen, setIsQuoteModalOpen] = useState(false);
  const [quoteFormData, setQuoteFormData] = useState({
    name: '',
    phone: '',
    email: '',
    service: 'Controlled Building Demolition',
    location: 'Dubai',
    details: ''
  });
  const [quoteSubmitted, setQuoteSubmitted] = useState(false);

  const toggleFaq = (index) => {
    setOpenFaqIndex((prev) => (prev === index ? -1 : index));
  };

  const handleOpenQuoteModal = () => {
    if (typeof onOpenQuote === 'function') {
      onOpenQuote();
    } else {
      setIsQuoteModalOpen(true);
    }
  };

  const handleQuoteSubmit = (e) => {
    e.preventDefault();
    setQuoteSubmitted(true);
    setTimeout(() => {
      setQuoteSubmitted(false);
      setIsQuoteModalOpen(false);
    }, 2500);
  };

  // The 6 FAQs exactly as on https://alareeshdemolition.ae/about/
  const faqs = [
    {
      id: '01',
      question: '1. What demolition services do you provide in Dubai?',
      answer:
        'Al Areesh Wrecking & Demolition Works LLC provides professional demolition services in Dubai including building demolition, villa demolition, concrete demolition, structural dismantling, and site clearance services. Our experienced demolition contractor team ensures safe and controlled demolition for residential, commercial, and industrial projects.'
    },
    {
      id: '02',
      question: '2. Do you provide villa demolition services in residential areas?',
      answer:
        'Yes, we specialize in villa demolition in Dubai. Our team follows controlled demolition methods and safety procedures to protect surrounding homes and infrastructure while safely dismantling residential buildings.'
    },
    {
      id: '03',
      question: '3. What equipment is used for building demolition?',
      answer:
        'Professional demolition projects use heavy machinery such as hydraulic excavators, concrete breakers, high-reach demolition machines, and dump trucks. These machines help demolition contractors dismantle buildings safely and efficiently.'
    },
    {
      id: '04',
      question: '4. How do you ensure safety during demolition projects?',
      answer:
        'Safety is the highest priority in demolition projects. Our demolition team conducts structural assessments, installs safety barriers, controls dust levels, and follows Dubai Municipality safety regulations to ensure secure project execution.'
    },
    {
      id: '05',
      question: '5. Do you handle debris removal and site clearance?',
      answer:
        'Yes, our demolition services include debris removal, concrete waste management, and complete site clearance. After demolition, the site is cleaned and prepared for future construction activities.'
    },
    {
      id: '06',
      question: '6. Why should I hire a professional demolition contractor in Dubai?',
      answer:
        'Hiring a professional demolition contractor ensures proper planning, advanced equipment, safety compliance, and efficient project completion. Professional demolition companies provide reliable solutions for building demolition and site preparation.'
    }
  ];

  // Principal contractor scope list with dedicated icons
  const experienceScopes = [
    {
      title: 'Residential & commercial building demolition',
      subtitle: 'Engineered dismantling of multistory and mixed-use structures',
      icon: Building2,
      accent: 'border-l-red-500'
    },
    {
      title: 'High-rise towers and villas',
      subtitle: 'Controlled high-reach breaking and private villa teardowns',
      icon: Building,
      accent: 'border-l-sky-500'
    },
    {
      title: 'Warehouses and factory sheds',
      subtitle: 'Industrial steel frame stripping, scrap recovery & sorting',
      icon: Factory,
      accent: 'border-l-amber-500'
    },
    {
      title: 'Masjids and sensitive structures',
      subtitle: 'Ultra-low vibration methods in congested urban spaces',
      icon: Landmark,
      accent: 'border-l-emerald-500'
    },
    {
      title: 'Infrastructure works including roads, foundations, and earthworks',
      subtitle: 'Bulk excavation, shoring, footing removal and leveling',
      icon: Truck,
      accent: 'border-l-purple-500'
    }
  ];

  const content = (
    <div className="bg-white text-slate-800 font-sans selection:bg-[#ea1d25] selection:text-white">
      
      {/* ========================================================= */}
      {/* 1. HERO SUB-HEADER BANNER & BREADCRUMBS                   */}
      {/* High-impact cinematic banner with glowing accents         */}
      {/* ========================================================= */}
      <section
        className="relative bg-slate-950 flex items-center justify-center overflow-hidden min-h-[260px] sm:min-h-[320px] lg:min-h-[360px] border-b-2 border-[#ea1d25]"
        style={{
          backgroundImage: "url('/subheader-1.jpg')",
          backgroundSize: 'cover',
          backgroundPosition: 'center 40%'
        }}
        aria-label="About Page Banner"
      >
        {/* Multi-layered dark gradient overlay for depth */}
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950/95 via-slate-950/80 to-slate-950/90" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-red-950/20 via-transparent to-transparent pointer-events-none" />

        {/* Ambient decorative elements */}
        <div className="absolute top-0 right-1/4 w-72 h-72 bg-[#ea1d25]/15 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-1/4 w-80 h-80 bg-[#00a4e4]/15 rounded-full blur-3xl pointer-events-none" />
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 w-full text-center space-y-4">
          <Reveal animation="fade-up" duration={600}>
            {/* Animated Authority Pill */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white shadow-xl animate-in fade-in duration-700">
              <span className="flex h-2 w-2 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#00a4e4] opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#00a4e4]"></span>
              </span>
              <ShieldCheck className="w-3.5 h-3.5 text-[#00a4e4]" />
              <span className="text-xs font-bold tracking-wider uppercase drop-shadow-sm">
                Dubai Municipality Licensed Class-1 Demolition Contractor
              </span>
            </div>

            {/* Page Main Heading */}
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-black text-white tracking-tight font-heading drop-shadow-[0_4px_16px_rgba(0,0,0,0.8)] mt-3">
              About <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#ea1d25] via-red-400 to-[#00a4e4]">Al Areesh</span>
            </h1>

            <p className="max-w-2xl mx-auto text-sm sm:text-base md:text-lg text-slate-300 font-normal leading-relaxed drop-shadow-sm mt-3">
              Complete demolition, excavation, recycling, and transportation services under one trusted, licensed team since 2014.
            </p>
            
            {/* Breadcrumb Navigation */}
            <nav
              aria-label="Breadcrumb"
              className="pt-3 flex items-center justify-center flex-wrap gap-2 text-xs sm:text-sm text-slate-300 drop-shadow-sm font-medium"
            >
              <Link
                to="/"
                className="text-slate-300 hover:text-white transition-colors flex items-center gap-1.5"
              >
                <span>Home</span>
              </Link>
              <span className="text-slate-500">›</span>
              <span className="text-[#ea1d25] font-bold">About Us</span>
            </nav>
          </Reveal>
        </div>
      </section>

      {/* Floating Trust Metrics Bar */}
      <div className="relative -mt-8 sm:-mt-10 z-20 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <Reveal animation="fade-up" delay={100} duration={650}>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 p-4 sm:p-6 rounded-2xl bg-white shadow-2xl border border-slate-200/80 backdrop-blur-md">
            
            <div className="p-3 sm:p-4 rounded-xl bg-slate-50 border border-slate-100 flex items-center gap-3.5 group hover:border-red-200 transition-all">
              <div className="p-2.5 sm:p-3 rounded-xl bg-[#ea1d25]/10 text-[#ea1d25] shrink-0 group-hover:scale-110 transition-transform">
                <Award className="w-5 h-5 sm:w-6 sm:h-6" />
              </div>
              <div>
                <div className="text-xl sm:text-2xl font-black text-slate-900 font-heading">2014</div>
                <div className="text-[11px] sm:text-xs text-slate-600 font-medium leading-tight">Established in UAE</div>
              </div>
            </div>

            <div className="p-3 sm:p-4 rounded-xl bg-slate-50 border border-slate-100 flex items-center gap-3.5 group hover:border-sky-200 transition-all">
              <div className="p-2.5 sm:p-3 rounded-xl bg-[#00a4e4]/10 text-[#00a4e4] shrink-0 group-hover:scale-110 transition-transform">
                <ShieldCheck className="w-5 h-5 sm:w-6 sm:h-6" />
              </div>
              <div>
                <div className="text-xl sm:text-2xl font-black text-slate-900 font-heading">DM #709421</div>
                <div className="text-[11px] sm:text-xs text-slate-600 font-medium leading-tight">Licensed Since 2015</div>
              </div>
            </div>

            <div className="p-3 sm:p-4 rounded-xl bg-slate-50 border border-slate-100 flex items-center gap-3.5 group hover:border-emerald-200 transition-all">
              <div className="p-2.5 sm:p-3 rounded-xl bg-emerald-500/10 text-emerald-600 shrink-0 group-hover:scale-110 transition-transform">
                <Truck className="w-5 h-5 sm:w-6 sm:h-6" />
              </div>
              <div>
                <div className="text-xl sm:text-2xl font-black text-slate-900 font-heading">50+ Units</div>
                <div className="text-[11px] sm:text-xs text-slate-600 font-medium leading-tight">Owned Heavy Fleet</div>
              </div>
            </div>

            <div className="p-3 sm:p-4 rounded-xl bg-slate-50 border border-slate-100 flex items-center gap-3.5 group hover:border-amber-200 transition-all">
              <div className="p-2.5 sm:p-3 rounded-xl bg-amber-500/10 text-amber-600 shrink-0 group-hover:scale-110 transition-transform">
                <HardHat className="w-5 h-5 sm:w-6 sm:h-6" />
              </div>
              <div>
                <div className="text-xl sm:text-2xl font-black text-slate-900 font-heading">100% Safe</div>
                <div className="text-[11px] sm:text-xs text-slate-600 font-medium leading-tight">Zero-Harm Record</div>
              </div>
            </div>

          </div>
        </Reveal>
      </div>

      {/* ========================================================= */}
      {/* 2. SECTION 1: WHO WE ARE & OUR EXPERIENCE & EXPERTISE     */}
      {/* Container 8194134 from original Elementor page            */}
      {/* ========================================================= */}
      <section className="py-16 sm:py-24 bg-white relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
          
          {/* Main Story & Municipality Accreditation Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
            
            {/* Left Story Column */}
            <div className="lg:col-span-7">
              <Reveal animation="fade-right">
                <div className="space-y-6">
                  <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-red-50 border border-red-200 text-[#ea1d25] text-xs font-bold tracking-wider uppercase">
                    <Sparkles className="w-3.5 h-3.5 text-[#ea1d25]" />
                    <span>Premier Industrial Leadership</span>
                  </div>

                  <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight font-heading leading-tight">
                    Who We Are
                  </h2>

                  <div className="space-y-4 text-slate-700 text-base sm:text-lg leading-relaxed font-normal">
                    <p>
                      <strong className="font-bold text-slate-900">Al Areesh Wrecking &amp; Demolition Works LLC</strong> is a trusted name in the demolition, excavation, and recycling industry in the United Arab Emirates. Established in 2014, the company has steadily grown into a reliable contractor known for safe execution, technical expertise, and environmental responsibility.
                    </p>
                    <p>
                      With a strong presence in Dubai and membership with <strong className="font-bold text-slate-900">Dubai Municipality (DM) since 2015</strong>, we proudly serve both public and private sector clients, many of whom have trusted us for over five years due to our consistent performance and professional standards.
                    </p>
                  </div>

                  {/* Verified Trust Badges */}
                  <div className="pt-2 flex flex-wrap items-center gap-3 text-xs font-semibold text-slate-700">
                    <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-100 border border-slate-200">
                      <Check className="w-3.5 h-3.5 text-emerald-600" />
                      Dubai Civil Defence Approved
                    </span>
                    <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-100 border border-slate-200">
                      <Check className="w-3.5 h-3.5 text-emerald-600" />
                      Trakhees Licensed
                    </span>
                    <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-100 border border-slate-200">
                      <Check className="w-3.5 h-3.5 text-emerald-600" />
                      Full Commercial Liability Coverage
                    </span>
                  </div>
                </div>
              </Reveal>
            </div>

            {/* Right Card: DM Membership Spotlight */}
            <div className="lg:col-span-5">
              <Reveal animation="fade-left" delay={150}>
                <div className="relative rounded-3xl p-8 bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-white shadow-2xl border border-slate-800 overflow-hidden space-y-6">
                  <div className="absolute top-0 right-0 w-48 h-48 bg-[#ea1d25]/20 rounded-full blur-2xl pointer-events-none" />
                  
                  <div className="flex items-center justify-between border-b border-slate-800 pb-5">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-[#ea1d25] to-[#c41219] flex items-center justify-center font-black text-lg text-white shadow-lg">
                        AAD
                      </div>
                      <div>
                        <div className="text-xs uppercase tracking-widest text-[#00a4e4] font-bold">Official Credential</div>
                        <div className="text-sm font-black text-white">Dubai Municipality Registered</div>
                      </div>
                    </div>
                    <span className="px-2.5 py-1 rounded-md bg-emerald-500/20 text-emerald-400 text-[11px] font-bold font-mono">
                      ACTIVE
                    </span>
                  </div>

                  <div className="space-y-3 text-sm text-slate-300">
                    <div className="flex justify-between py-1 border-b border-slate-800/60">
                      <span className="text-slate-400">Commercial License:</span>
                      <span className="font-mono font-bold text-white">#709421</span>
                    </div>
                    <div className="flex justify-between py-1 border-b border-slate-800/60">
                      <span className="text-slate-400">DM Registration:</span>
                      <span className="font-bold text-white">Active Since 2015</span>
                    </div>
                    <div className="flex justify-between py-1 border-b border-slate-800/60">
                      <span className="text-slate-400">Classification:</span>
                      <span className="font-bold text-[#00a4e4]">Class-1 Principal Contractor</span>
                    </div>
                    <div className="flex justify-between py-1 border-b border-slate-800/60">
                      <span className="text-slate-400">Jurisdiction:</span>
                      <span className="font-bold text-white">Dubai, Sharjah &amp; Abu Dhabi</span>
                    </div>
                  </div>

                  <div className="p-4 rounded-xl bg-white/5 border border-white/10 text-xs text-slate-300 flex items-start gap-3">
                    <Clock className="w-4 h-4 text-[#ea1d25] shrink-0 mt-0.5" />
                    <p>
                      Over 5 years of retained partnership with leading Dubai property developers and government entities.
                    </p>
                  </div>

                  <button
                    onClick={handleOpenQuoteModal}
                    className="w-full py-3.5 rounded-xl bg-gradient-to-r from-[#ea1d25] to-[#c41219] hover:from-[#ff2d35] hover:to-[#ea1d25] text-white font-extrabold uppercase text-xs tracking-wider shadow-lg shadow-red-950/50 flex items-center justify-center gap-2 transition-all transform hover:-translate-y-0.5"
                  >
                    <span>Request Permit Verification</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </Reveal>
            </div>

          </div>

          {/* Our Experience & Expertise Block */}
          <div className="space-y-8 pt-8 border-t border-slate-200">
            <Reveal animation="fade-up">
              <div className="max-w-3xl space-y-3">
                <div className="text-[#ea1d25] text-xs font-extrabold tracking-widest uppercase">
                  * PROVEN TRACK RECORD *
                </div>
                <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight font-heading">
                  Our Experience &amp; Expertise
                </h2>
                <p className="text-slate-700 text-base sm:text-lg leading-relaxed">
                  Over the years, Al Areesh has successfully delivered a wide range of projects, acting as <strong className="font-bold text-slate-900">Principal Contractor</strong> for:
                </p>
              </div>
            </Reveal>

            {/* Scope Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {experienceScopes.map((scope, idx) => {
                const ScopeIcon = scope.icon;
                return (
                  <Reveal key={idx} animation="fade-up" delay={idx * 60}>
                    <div
                      className={`h-full group p-6 rounded-2xl bg-white border border-slate-200 shadow-sm hover:shadow-xl hover:border-slate-300 transition-all duration-300 transform hover:-translate-y-1 relative overflow-hidden flex flex-col justify-between border-l-4 ${scope.accent}`}
                    >
                      <div className="space-y-3">
                        <div className="w-12 h-12 rounded-xl bg-slate-100 group-hover:bg-[#ea1d25]/10 text-slate-700 group-hover:text-[#ea1d25] flex items-center justify-center transition-colors">
                          <ScopeIcon className="w-6 h-6" />
                        </div>
                        <h3 className="text-lg font-bold text-slate-900 font-heading leading-snug group-hover:text-[#ea1d25] transition-colors">
                          {scope.title}
                        </h3>
                        <p className="text-xs sm:text-sm text-slate-500 leading-relaxed">
                          {scope.subtitle}
                        </p>
                      </div>

                      <div className="pt-4 flex items-center justify-between text-xs font-semibold text-slate-400 group-hover:text-[#ea1d25] transition-colors">
                        <span className="font-mono">Scope 0{idx + 1}</span>
                        <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                      </div>
                    </div>
                  </Reveal>
                );
              })}

              {/* 6th Card: Certified Team Summary */}
              <Reveal animation="fade-up" delay={experienceScopes.length * 60}>
                <div className="h-full p-6 rounded-2xl bg-gradient-to-br from-slate-900 to-slate-800 text-white shadow-xl flex flex-col justify-between space-y-4">
                  <div className="space-y-2">
                    <div className="inline-flex items-center gap-1.5 text-[#00a4e4] text-xs font-bold uppercase tracking-wider">
                      <HardHat className="w-4 h-4" />
                      <span>Certified Engineering Team</span>
                    </div>
                    <h3 className="text-lg font-bold font-heading text-white">
                      Qualified In-House Workforce
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                      Our team consists of highly experienced engineers, supervisors, machine operators, and safety officers, ensuring every project is completed on time, within budget, and in compliance with UAE regulations.
                    </p>
                  </div>
                  <div className="pt-2 flex items-center gap-2 text-xs text-slate-400 font-medium border-t border-slate-700/60">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                    <span>100% In-House Direct Supervision</span>
                  </div>
                </div>
              </Reveal>
            </div>

          </div>

        </div>
      </section>

      {/* ========================================================= */}
      {/* 3. SECTION 2: ABOUT US (Container 3d0d512)                */}
      {/* Trusted Demolition, Excavation & Recycling Company        */}
      {/* Left Image: trasport.png | Right: Content + 2 Icon Boxes  */}
      {/* ========================================================= */}
      <section className="py-16 sm:py-24 bg-slate-50 border-y border-slate-200/80 relative overflow-hidden">
        {/* Subtle background decoration */}
        <div className="absolute -top-32 -left-32 w-80 h-80 bg-red-100/50 rounded-full blur-3xl pointer-events-none" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-14 items-center">
            
            {/* Left Image Column with Luxury Perspective Frame */}
            <div className="lg:col-span-6">
              <Reveal animation="fade-right">
                <div className="relative group rounded-3xl overflow-hidden shadow-2xl border-2 border-white bg-slate-900">
                  <img
                    src="/trasport.png"
                    alt="Al Areesh Demolition & Transport Fleet"
                    className="w-full h-[400px] sm:h-[480px] lg:h-[520px] object-cover transition-transform duration-700 group-hover:scale-105"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-transparent opacity-80" />
                  
                  {/* Floating Live Fleet Badge */}
                  <div className="absolute top-5 left-5 px-4 py-2 rounded-xl bg-black/60 backdrop-blur-md border border-white/20 text-white shadow-xl flex items-center gap-2.5">
                    <span className="flex h-2.5 w-2.5 relative">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
                    </span>
                    <span className="text-xs font-bold tracking-wider uppercase">
                      50+ Active Fleet Units in Dubai
                    </span>
                  </div>

                  {/* Floating Bottom Card */}
                  <div className="absolute bottom-5 left-5 right-5 p-5 rounded-2xl bg-white/95 backdrop-blur-md border border-slate-200/80 shadow-2xl text-slate-800 space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="text-xs font-black uppercase tracking-wider text-[#ea1d25]">
                        Primary Contracting Division
                      </div>
                      <span className="text-[11px] font-bold text-slate-500 font-mono">EST. 2014</span>
                    </div>
                    <div className="text-base font-extrabold text-slate-900 font-heading">
                      Al Areesh Wrecking &amp; Demolition Works LLC
                    </div>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      Heavy hydraulic rock breakers, high-reach excavators, and 45-ton tippers deployed across the UAE.
                    </p>
                  </div>
                </div>
              </Reveal>
            </div>

            {/* Right Content Column */}
            <div className="lg:col-span-6">
              <Reveal animation="fade-left" delay={150}>
                <div className="space-y-7">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-50 border border-red-200 text-[#ea1d25] text-xs font-extrabold tracking-widest uppercase">
                    <span>* ABOUT US *</span>
                  </div>

                  <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight font-heading leading-[1.12]">
                    Trusted Demolition, Excavation &amp; Recycling Company
                  </h2>

                  <p className="text-slate-600 text-base sm:text-lg leading-relaxed">
                    we deliver safe, reliable, and fully compliant demolition and construction support services across the UAE
                  </p>

                  {/* 2 Icon Boxes exactly from original website */}
                  <div className="space-y-4 pt-2">
                    {/* Icon Box 1: Our Work Process */}
                    <div className="group flex items-start gap-5 p-5 rounded-2xl bg-white border border-slate-200 shadow-sm transition-all duration-300 hover:shadow-xl hover:border-red-200">
                      <div className="w-16 h-16 rounded-2xl bg-red-50 border border-red-100 flex items-center justify-center shrink-0 p-3 group-hover:scale-105 group-hover:bg-[#ea1d25]/10 transition-all">
                        <img
                          src="/icon-process.png"
                          alt="Work Process"
                          className="w-10 h-10 object-contain"
                          onError={(e) => {
                            e.target.onerror = null;
                            e.target.src = 'https://alareeshdemolition.ae/wp-content/uploads/2023/12/Transportation-Process.png';
                          }}
                        />
                      </div>
                      <div className="space-y-1">
                        <h3 className="text-lg sm:text-xl font-bold text-slate-900 font-heading group-hover:text-[#ea1d25] transition-colors">
                          Our Work Process
                        </h3>
                        <p className="text-sm text-slate-600 leading-relaxed">
                          We follow a structured and approved work methodology to ensure efficiency and safety at every stage.
                        </p>
                      </div>
                    </div>

                    {/* Icon Box 2: Safety & Reliability */}
                    <div className="group flex items-start gap-5 p-5 rounded-2xl bg-white border border-slate-200 shadow-sm transition-all duration-300 hover:shadow-xl hover:border-sky-200">
                      <div className="w-16 h-16 rounded-2xl bg-sky-50 border border-sky-100 flex items-center justify-center shrink-0 p-3 group-hover:scale-105 group-hover:bg-[#00a4e4]/10 transition-all">
                        <img
                          src="/icon-safety.png"
                          alt="Safety & Reliability"
                          className="w-10 h-10 object-contain"
                          onError={(e) => {
                            e.target.onerror = null;
                            e.target.src = 'https://alareeshdemolition.ae/wp-content/uploads/2023/12/Safety-Reliability.png';
                          }}
                        />
                      </div>
                      <div className="space-y-1">
                        <h3 className="text-lg sm:text-xl font-bold text-slate-900 font-heading group-hover:text-[#00a4e4] transition-colors">
                          Safety &amp; Reliability
                        </h3>
                        <p className="text-sm text-slate-600 leading-relaxed">
                          Safety is at the core of everything we do.On-time delivery with minimal site disruption
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
                    <button
                      onClick={handleOpenQuoteModal}
                      className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl bg-gradient-to-r from-[#ea1d25] to-[#c41219] hover:from-[#ff2d35] hover:to-[#ea1d25] text-white font-extrabold text-xs sm:text-sm uppercase tracking-wider shadow-xl shadow-red-950/20 transition-all duration-300 transform hover:-translate-y-0.5 active:scale-95"
                    >
                      <span>Read More</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>

                    <a
                      href={`tel:${COMPANY_INFO.phoneRaw}`}
                      className="inline-flex items-center justify-center gap-2 px-6 py-4 rounded-xl bg-white hover:bg-slate-50 text-slate-800 font-bold text-xs sm:text-sm border border-slate-200 shadow-sm transition-all"
                    >
                      <Phone className="w-4 h-4 text-[#ea1d25]" />
                      <span>Call {COMPANY_INFO.phone}</span>
                    </a>
                  </div>
                </div>
              </Reveal>
            </div>

          </div>
        </div>
      </section>

      {/* ========================================================= */}
      {/* 4. SECTION 3: WHY CHOOSE US (Container 0823150)           */}
      {/* Why You Should Choose Our Services?                       */}
      {/* Left: 3 Icon Boxes | Right Image: about-feature.png       */}
      {/* ========================================================= */}
      <section className="py-16 sm:py-24 bg-white relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-14 items-center">
            
            {/* Left Column: Heading & 3 Icon Boxes */}
            <div className="lg:col-span-6">
              <Reveal animation="fade-right">
                <div className="space-y-7">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-50 border border-red-200 text-[#ea1d25] text-xs font-extrabold tracking-widest uppercase">
                    <span>* Why Choose Us? *</span>
                  </div>

                  <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight font-heading leading-[1.12]">
                    Why You Should Choose Our Services?
                  </h2>

                  <p className="text-slate-600 text-base sm:text-lg leading-relaxed">
                    At <strong className="font-bold text-slate-900">Al Areesh Wrecking &amp; Demolition Works LLC</strong>, we combine experience, safety, and modern equipment to deliver reliable demolition and construction support services across the UAE. Our clients trust us because we focus on <strong className="font-bold text-slate-900">quality execution, regulatory compliance, and timely project delivery</strong>.
                  </p>

                  {/* 3 Feature Boxes exactly from original website */}
                  <div className="space-y-4 pt-2">
                    {/* 1. Safety First Approach */}
                    <div className="group flex items-start gap-4 p-5 rounded-2xl bg-slate-50 border border-slate-200 shadow-sm transition-all duration-300 hover:bg-white hover:shadow-xl hover:border-red-200">
                      <div className="w-14 h-14 rounded-2xl bg-white border border-slate-200 flex items-center justify-center shrink-0 p-2.5 shadow-sm group-hover:scale-105 transition-transform">
                        <img
                          src="/icon-safe-approach.png"
                          alt="Safety First"
                          className="w-10 h-10 object-contain"
                          onError={(e) => {
                            e.target.onerror = null;
                            e.target.src = 'https://alareeshdemolition.ae/wp-content/uploads/2023/12/Safe-Packing.png';
                          }}
                        />
                      </div>
                      <div className="space-y-1">
                        <h3 className="text-lg font-bold text-slate-900 font-heading group-hover:text-[#ea1d25] transition-colors">
                          Safety First Approach
                        </h3>
                        <p className="text-sm text-slate-600 leading-relaxed">
                          We operate with strict health, safety, and environmental standards on every project. Approved method statements &amp; risk assessments
                        </p>
                      </div>
                    </div>

                    {/* 2. Experienced Team & Modern Machinery */}
                    <div className="group flex items-start gap-4 p-5 rounded-2xl bg-slate-50 border border-slate-200 shadow-sm transition-all duration-300 hover:bg-white hover:shadow-xl hover:border-sky-200">
                      <div className="w-14 h-14 rounded-2xl bg-white border border-slate-200 flex items-center justify-center shrink-0 p-2.5 shadow-sm group-hover:scale-105 transition-transform">
                        <img
                          src="/icon-team-machinery.png"
                          alt="Team & Machinery"
                          className="w-10 h-10 object-contain"
                          onError={(e) => {
                            e.target.onerror = null;
                            e.target.src = 'https://alareeshdemolition.ae/wp-content/uploads/2023/12/Ship-Everywhere.png';
                          }}
                        />
                      </div>
                      <div className="space-y-1">
                        <h3 className="text-lg font-bold text-slate-900 font-heading group-hover:text-[#00a4e4] transition-colors">
                          Experienced Team &amp; Modern Machinery
                        </h3>
                        <p className="text-sm text-slate-600 leading-relaxed">
                          Our projects are handled by skilled professionals using advanced equipment.
                        </p>
                      </div>
                    </div>

                    {/* 3. Reliable & Responsible Solutions */}
                    <div className="group flex items-start gap-4 p-5 rounded-2xl bg-slate-50 border border-slate-200 shadow-sm transition-all duration-300 hover:bg-white hover:shadow-xl hover:border-emerald-200">
                      <div className="w-14 h-14 rounded-2xl bg-white border border-slate-200 flex items-center justify-center shrink-0 p-2.5 shadow-sm group-hover:scale-105 transition-transform">
                        <img
                          src="/icon-reliable-solutions.png"
                          alt="Reliable Solutions"
                          className="w-10 h-10 object-contain"
                          onError={(e) => {
                            e.target.onerror = null;
                            e.target.src = 'https://alareeshdemolition.ae/wp-content/uploads/2023/12/Fastest-Shipping.png';
                          }}
                        />
                      </div>
                      <div className="space-y-1">
                        <h3 className="text-lg font-bold text-slate-900 font-heading group-hover:text-emerald-600 transition-colors">
                          Reliable &amp; Responsible Solutions
                        </h3>
                        <p className="text-sm text-slate-600 leading-relaxed">
                          We deliver end-to-end solutions with environmental responsibility.Controlled demolition &amp; excavation
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </Reveal>
            </div>

            {/* Right Column: Feature Image with Metallic Frame */}
            <div className="lg:col-span-6">
              <Reveal animation="fade-left" delay={150}>
                <div className="relative group rounded-3xl overflow-hidden shadow-2xl border-2 border-slate-200/90 bg-white">
                  <img
                    src="/about-feature.png"
                    alt="Al Areesh Demolition Site and Heavy Excavator"
                    className="w-full h-[400px] sm:h-[480px] lg:h-[520px] object-cover transition-transform duration-700 group-hover:scale-105"
                    loading="lazy"
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = 'https://alareeshdemolition.ae/wp-content/uploads/2026/01/Untitled-design.png';
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-60" />

                  {/* Floating Bottom Stamp */}
                  <div className="absolute bottom-5 left-5 right-5 p-4 rounded-xl bg-black/70 backdrop-blur-md border border-white/20 text-white shadow-xl flex items-center justify-between">
                    <div>
                      <div className="text-xs font-bold text-[#00a4e4] uppercase tracking-wider">Turnkey Demolition</div>
                      <div className="text-sm font-bold">Urban Site Clearance &amp; Preparation</div>
                    </div>
                    <div className="text-right">
                      <div className="text-[11px] text-slate-300 font-mono">100% Compliant</div>
                      <div className="text-xs font-bold text-emerald-400">DM Approved</div>
                    </div>
                  </div>
                </div>
              </Reveal>
            </div>

          </div>
        </div>
      </section>

      {/* ========================================================= */}
      {/* 5. SECTION 4: FAQS (Container 12423f1)                    */}
      {/* Frequently Asked Questions About Demolition Services      */}
      {/* High-end interactive cards with clean numbers             */}
      {/* ========================================================= */}
      <section className="py-16 sm:py-24 bg-slate-50 border-t border-slate-200/80">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          
          {/* Section Heading */}
          <Reveal animation="fade-up">
            <div className="text-center space-y-4">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-red-50 border border-red-200 text-[#ea1d25] text-xs font-extrabold tracking-widest uppercase">
                <HelpCircle className="w-3.5 h-3.5 text-[#ea1d25]" />
                <span>Got Questions?</span>
              </div>

              <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-slate-900 tracking-tight font-heading">
                Frequently Asked Questions About Demolition Services
              </h2>
              <p className="max-w-2xl mx-auto text-slate-600 text-sm sm:text-base leading-relaxed">
                Clear answers regarding our Dubai Municipality certified demolition, permits, machinery, and safety processes.
              </p>
            </div>
          </Reveal>

          {/* Accordion Container */}
          <Reveal animation="fade-up" delay={100}>
            <div className="space-y-4">
              {faqs.map((faq, index) => {
                const isOpen = openFaqIndex === index;
                return (
                  <div
                    key={index}
                    className={`rounded-2xl transition-all duration-300 overflow-hidden border ${
                      isOpen
                        ? 'bg-white border-[#ea1d25]/50 shadow-xl border-l-4 border-l-[#ea1d25]'
                        : 'bg-white border-slate-200 shadow-sm hover:border-slate-300 hover:shadow-md'
                    }`}
                  >
                    <button
                      onClick={() => toggleFaq(index)}
                      className="w-full text-left p-5 sm:p-6 text-base sm:text-lg font-bold text-slate-900 flex items-center justify-between gap-4 focus:outline-none transition-colors"
                      aria-expanded={isOpen}
                    >
                      <div className="flex items-center gap-3.5">
                        <span className={`px-2.5 py-1 rounded-lg text-xs font-mono font-bold transition-colors ${
                          isOpen ? 'bg-[#ea1d25] text-white' : 'bg-slate-100 text-slate-600'
                        }`}>
                          {faq.id}
                        </span>
                        <span className="font-heading leading-snug">{faq.question}</span>
                      </div>

                      <span className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 transition-all ${
                        isOpen ? 'bg-[#ea1d25] text-white rotate-180' : 'bg-slate-100 text-slate-700'
                      }`}>
                        {isOpen ? <Minus className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                      </span>
                    </button>

                    {/* Collapsible Answer */}
                    <div
                      className={`transition-all duration-300 ease-in-out overflow-hidden ${
                        isOpen ? 'max-h-[400px] opacity-100' : 'max-h-0 opacity-0'
                      }`}
                    >
                      <div className="px-5 pb-6 sm:px-6 sm:pb-6 text-slate-700 text-sm sm:text-base leading-relaxed border-t border-slate-100 pt-4">
                        <p>{faq.answer}</p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </Reveal>

          {/* Additional Help Callout */}
          <Reveal animation="fade-up" delay={150}>
            <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
              <div className="space-y-1">
                <h4 className="text-base font-bold text-slate-900 font-heading">
                  Have a unique structural inquiry?
                </h4>
                <p className="text-xs sm:text-sm text-slate-500">
                  Speak directly with our senior demolition engineers for method statements and risk analysis.
                </p>
              </div>
              <a
                href={`https://wa.me/${COMPANY_INFO.whatsapp}?text=Hello%20Al%20Areesh%20Demolition,%20I%20have%20a%20question%20about%20a%20project`}
                target="_blank"
                rel="noopener noreferrer"
                className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs uppercase tracking-wider shadow-sm flex items-center gap-2 shrink-0 transition-all"
              >
                <MessageSquare className="w-4 h-4" />
                <span>WhatsApp Direct</span>
              </a>
            </div>
          </Reveal>

        </div>
      </section>

      {/* ========================================================= */}
      {/* 6. SECTION 5: CTA BANNER (Container 2c94150)              */}
      {/* Looking for the best Demolition Recyling services?        */}
      {/* High-impact command banner with dual actions              */}
      {/* ========================================================= */}
      <section className="relative py-16 sm:py-20 bg-gradient-to-r from-slate-950 via-slate-900 to-slate-950 text-white overflow-hidden border-t-2 border-[#ea1d25]">
        {/* Subtle background red glow */}
        <div className="absolute top-0 right-10 w-96 h-96 bg-[#ea1d25]/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-10 w-96 h-96 bg-[#00a4e4]/15 rounded-full blur-3xl pointer-events-none" />
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Reveal animation="fade-up">
            <div className="flex flex-col lg:flex-row items-center justify-between gap-10 text-center lg:text-left">
              <div className="space-y-3 max-w-2xl">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-500/10 border border-red-500/30 text-[#ea1d25] text-xs font-extrabold tracking-widest uppercase">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Request A Quote</span>
                </div>
                
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white font-heading tracking-tight leading-tight">
                  Looking for the best Demolition Recyling services?
                </h2>
                
                <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
                  Get an accurate, permit-inclusive cost calculation and method statement from Dubai's certified principal demolition contractor.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row items-center gap-4 shrink-0">
                <button
                  onClick={handleOpenQuoteModal}
                  className="w-full sm:w-auto px-8 py-4 rounded-xl bg-gradient-to-r from-[#ea1d25] to-[#c41219] hover:from-[#ff2d35] hover:to-[#ea1d25] text-white font-extrabold text-xs sm:text-sm uppercase tracking-wider shadow-2xl shadow-red-950/70 flex items-center justify-center gap-2.5 group transition-all duration-300 transform hover:-translate-y-0.5 active:scale-95"
                >
                  <span>Get A Quote</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>

                <a
                  href={`tel:${COMPANY_INFO.phoneRaw}`}
                  className="w-full sm:w-auto px-7 py-4 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold text-xs sm:text-sm backdrop-blur-md border border-white/20 shadow-md flex items-center justify-center gap-2 transition-all duration-300"
                >
                  <Phone className="w-4 h-4 text-[#00a4e4]" />
                  <span>Call {COMPANY_INFO.phone}</span>
                </a>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ========================================================= */}
      {/* 7. MODAL: QUOTE REQUEST (FOR STANDALONE TESTING)          */}
      {/* ========================================================= */}
      {isQuoteModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="relative w-full max-w-lg bg-white rounded-3xl shadow-2xl border border-slate-200 p-6 sm:p-8 space-y-6">
            <button
              onClick={() => setIsQuoteModalOpen(false)}
              className="absolute top-5 right-5 p-2 text-slate-400 hover:text-slate-700 bg-slate-100 rounded-full transition-colors"
              aria-label="Close Modal"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="space-y-1">
              <div className="text-xs font-bold uppercase tracking-wider text-[#ea1d25]">
                Al Areesh Demolition Works
              </div>
              <h3 className="text-2xl font-black text-slate-900 font-heading">
                Request A Free Quote
              </h3>
              <p className="text-xs sm:text-sm text-slate-600">
                Dubai Municipality Licensed Class-1 Demolition Contractor
              </p>
            </div>

            {quoteSubmitted ? (
              <div className="p-6 rounded-2xl bg-emerald-50 border border-emerald-200 text-center space-y-2">
                <CheckCircle2 className="w-10 h-10 text-emerald-600 mx-auto" />
                <h4 className="text-lg font-bold text-emerald-900">Inquiry Received!</h4>
                <p className="text-xs text-emerald-700">
                  Our structural engineers will contact you within 2 hours with project feasibility and cost estimate.
                </p>
              </div>
            ) : (
              <form onSubmit={handleQuoteSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                    Your Name / Company
                  </label>
                  <input
                    type="text"
                    required
                    value={quoteFormData.name}
                    onChange={(e) => setQuoteFormData({ ...quoteFormData, name: e.target.value })}
                    placeholder="e.g. Ahmed Al Mansoori"
                    className="w-full px-4 py-2.5 rounded-lg border border-slate-300 focus:outline-none focus:border-[#ea1d25] text-sm"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      required
                      value={quoteFormData.phone}
                      onChange={(e) => setQuoteFormData({ ...quoteFormData, phone: e.target.value })}
                      placeholder="+971 50 XXX XXXX"
                      className="w-full px-4 py-2.5 rounded-lg border border-slate-300 focus:outline-none focus:border-[#ea1d25] text-sm"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                      Project Location
                    </label>
                    <input
                      type="text"
                      value={quoteFormData.location}
                      onChange={(e) => setQuoteFormData({ ...quoteFormData, location: e.target.value })}
                      placeholder="e.g. Dubai Marina / DIP"
                      className="w-full px-4 py-2.5 rounded-lg border border-slate-300 focus:outline-none focus:border-[#ea1d25] text-sm"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                    Required Service
                  </label>
                  <select
                    value={quoteFormData.service}
                    onChange={(e) => setQuoteFormData({ ...quoteFormData, service: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-lg border border-slate-300 focus:outline-none focus:border-[#ea1d25] text-sm bg-white"
                  >
                    <option value="Controlled Building Demolition">Controlled Building Demolition</option>
                    <option value="Villa Demolition & Dismantling">Villa Demolition & Dismantling</option>
                    <option value="Bulk Excavation & Earthworks">Bulk Excavation & Earthworks</option>
                    <option value="Concrete Breaking & Crushing">Concrete Breaking & Crushing</option>
                    <option value="Transportation & Waste Disposal">Transportation & Waste Disposal</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                    Project Scope / Dimensions
                  </label>
                  <textarea
                    rows="3"
                    value={quoteFormData.details}
                    onChange={(e) => setQuoteFormData({ ...quoteFormData, details: e.target.value })}
                    placeholder="Brief description of the structure, number of floors, timeline..."
                    className="w-full px-4 py-2.5 rounded-lg border border-slate-300 focus:outline-none focus:border-[#ea1d25] text-sm"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3.5 rounded-xl bg-gradient-to-r from-[#ea1d25] to-[#c41219] hover:from-[#ff2d35] hover:to-[#ea1d25] text-white font-extrabold uppercase text-xs tracking-wider shadow-lg shadow-red-950/40 flex items-center justify-center gap-2 transition-all"
                >
                  <Send className="w-4 h-4" />
                  <span>Submit Demolition Quote Request</span>
                </button>
              </form>
            )}

            <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
              <a
                href={`tel:${COMPANY_INFO.phoneRaw}`}
                className="flex items-center gap-1 hover:text-[#ea1d25] font-semibold text-slate-700"
              >
                <Phone className="w-3.5 h-3.5 text-[#ea1d25]" />
                <span>Call {COMPANY_INFO.phone}</span>
              </a>
              <a
                href={`https://wa.me/${COMPANY_INFO.whatsapp}?text=Hello%20Al%20Areesh%20Demolition,%20I%20need%20a%20quote`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1 text-emerald-600 font-bold hover:underline"
              >
                <MessageSquare className="w-3.5 h-3.5" />
                <span>WhatsApp Instant</span>
              </a>
            </div>
          </div>
        </div>
      )}

    </div>
  );

  // If includeLayout is true, wrap in Header, Footer, and FloatingActions
  if (includeLayout) {
    return (
      <div className="min-h-screen bg-white text-slate-800 flex flex-col font-sans selection:bg-[#ea1d25] selection:text-white">
        <Header onOpenQuote={handleOpenQuoteModal} />
        <main className="flex-1">
          {content}
        </main>
        <Footer />
        <FloatingActions />
      </div>
    );
  }

  // Otherwise, return just the content
  return content;
}
