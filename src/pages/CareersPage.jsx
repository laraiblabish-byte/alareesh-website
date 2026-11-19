import { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Briefcase, 
  CheckCircle2, 
  Send, 
  Users, 
  Award, 
  ArrowRight
} from 'lucide-react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import FloatingActions from '../components/FloatingActions';
import Reveal from '../components/Reveal';
import { COMPANY_INFO } from '../data/companyData';

export default function CareersPage({ includeLayout = true, onOpenQuote }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    position: 'Demolition Operator',
    experience: '1-3 Years',
    location: 'Dubai',
    notes: ''
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const openPositions = [
    {
      title: 'Demolition Operators',
      department: 'Field Operations',
      type: 'Full-Time',
      location: 'Dubai & UAE Sites',
      desc: 'Experienced operators skilled in mechanical building dismantling, concrete crushing, and structural demolition operations.'
    },
    {
      title: 'Heavy Equipment Operators',
      department: 'Machinery & Fleet',
      type: 'Full-Time',
      location: 'Dubai & UAE Sites',
      desc: 'Certified operators for CAT/Komatsu 30T-50T heavy excavators, hydraulic rock breakers, and long-reach booms.'
    },
    {
      title: 'Site Supervisors & Foremen',
      department: 'Site Management',
      type: 'Full-Time',
      location: 'Dubai',
      desc: 'Supervisors with 5+ years of UAE civil demolition experience, method statement enforcement, and crew leadership.'
    },
    {
      title: 'Safety Officers (HSE)',
      department: 'Health, Safety & Environment',
      type: 'Full-Time',
      location: 'Dubai & Northern Emirates',
      desc: 'NEBOSH/OSHAD certified officers ensuring complete adherence to Dubai Municipality and Civil Defence safety rules.'
    },
    {
      title: 'Excavation Machine Operators',
      department: 'Earthworks',
      type: 'Full-Time',
      location: 'Dubai & Abu Dhabi',
      desc: 'Specialized operators for deep basement digging, rock trenching, laser grading, and bulk earth movement.'
    },
    {
      title: 'Heavy Tipper Truck Drivers',
      department: 'Logistics',
      type: 'Full-Time',
      location: 'DIP 1 Operations Yard',
      desc: 'Drivers with valid UAE Heavy Vehicle Driving License (Category 4 or 6) for 32m³ debris transport to municipal landfills.'
    },
    {
      title: 'Project Coordinators & Estimators',
      department: 'Engineering Office',
      type: 'Full-Time',
      location: 'Schon Business Park, DIP 1',
      desc: 'Civil engineers responsible for Dubai Municipality NOC tracking, quantity surveying, and subcontractor coordination.'
    },
    {
      title: 'Skilled Construction Laborers',
      department: 'Field Crew',
      type: 'Full-Time',
      location: 'Dubai & Sharjah',
      desc: 'Hardworking crew members for internal strip-outs, manual debris sorting, rebar collection, and site maintenance.'
    }
  ];

  const benefits = [
    {
      title: 'Reputable Class-1 Contractor',
      desc: 'Work with one of Dubai’s premier licensed demolition and earthwork engineering firms since 2014.'
    },
    {
      title: 'Safety First Culture',
      desc: 'Strict zero-incident HSE protocols with complete safety gear, daily toolboxes, and medical coverage.'
    },
    {
      title: 'Modern Heavy Machinery Fleet',
      desc: 'Operate modern, company-owned Caterpillar, Komatsu, and Volvo excavators and breakers.'
    },
    {
      title: 'Career Growth & Stability',
      desc: 'Competitive compensation, on-time payroll, UAE labor law compliance, and skill advancement.'
    }
  ];

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
        aria-label="Careers Banner"
      >
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950/95 via-slate-950/80 to-slate-950/90" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-red-950/20 via-transparent to-transparent pointer-events-none" />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 w-full text-center space-y-4">
          <Reveal animation="fade-up" duration={600}>
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white shadow-xl animate-in fade-in duration-700">
              <Briefcase className="w-3.5 h-3.5 text-[#00a4e4]" />
              <span className="text-xs font-bold tracking-wider uppercase drop-shadow-sm">
                Build Your Career in the UAE Demolition Industry
              </span>
            </div>

            <h1 className="text-4xl sm:text-5xl md:text-6xl font-black text-white tracking-tight font-heading drop-shadow-md mt-3">
              Careers at <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#ea1d25] via-red-400 to-[#00a4e4]">Al Areesh</span>
            </h1>

            <p className="max-w-2xl mx-auto text-sm sm:text-base md:text-lg text-slate-300 font-normal leading-relaxed mt-3">
              Join our 100+ strong team of certified demolition engineers, heavy equipment operators, and project managers.
            </p>

            <nav
              aria-label="Breadcrumb"
              className="pt-3 flex items-center justify-center flex-wrap gap-2 text-xs sm:text-sm text-slate-300 drop-shadow-sm font-medium"
            >
              <Link
                to="/"
                className="text-slate-300 hover:text-white transition-colors"
              >
                Home
              </Link>
              <span className="text-slate-500">›</span>
              <span className="text-[#ea1d25] font-bold">Careers Dubai</span>
            </nav>
          </Reveal>
        </div>
      </section>

      {/* ========================================================= */}
      {/* 2. INTRO & CULTURE SECTION                               */}
      {/* ========================================================= */}
      <section className="py-16 sm:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left Content */}
            <div className="lg:col-span-7">
              <Reveal animation="fade-right">
                <div className="space-y-6">
                  <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-red-50 border border-red-200 text-[#ea1d25] text-xs font-bold tracking-wider uppercase">
                    <Users className="w-3.5 h-3.5" />
                    <span>Join Our Growing Team</span>
                  </div>

                  <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight font-heading leading-tight">
                    Work With Dubai&apos;s Leading Demolition Contractor
                  </h2>

                  <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
                    Al Areesh Wrecking &amp; Demolition Works LLC is a professional demolition contractor in Dubai specializing in commercial building demolition, villa demolition, industrial decommissioning, and deep excavation works.
                  </p>

                  <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
                    As we continue to expand our projects across Dubai, Abu Dhabi, Sharjah, and Ajman, we are consistently looking for skilled, safety-conscious, and motivated professionals to join our operational crews and management teams.
                  </p>

                  {/* Benefits Grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-3">
                    {benefits.map((b, i) => (
                      <div key={i} className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-1.5">
                        <div className="flex items-center gap-2 font-bold text-slate-900 text-sm">
                          <CheckCircle2 className="w-4 h-4 text-[#ea1d25] shrink-0" />
                          <span>{b.title}</span>
                        </div>
                        <p className="text-xs text-slate-600 leading-relaxed pl-6">
                          {b.desc}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </Reveal>
            </div>

            {/* Right Featured Image */}
            <div className="lg:col-span-5">
              <Reveal animation="fade-left" delay={150}>
                <div className="relative rounded-3xl overflow-hidden border border-slate-200 shadow-2xl group">
                  <img
                    src="/career-hero.png"
                    alt="Al Areesh Demolition Careers"
                    className="w-full h-[420px] object-cover group-hover:scale-105 transition-transform duration-700"
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = '/real-excavator-building.png';
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />
                  <div className="absolute bottom-6 left-6 right-6 text-white space-y-1">
                    <div className="text-xs font-bold text-[#00a4e4] uppercase tracking-wider flex items-center gap-1.5">
                      <Award className="w-3.5 h-3.5" />
                      <span>Equal Opportunity Employer</span>
                    </div>
                    <div className="text-lg font-bold font-heading">
                      100+ Certified Demolition Professionals
                    </div>
                  </div>
                </div>
              </Reveal>
            </div>

          </div>
        </div>
      </section>

      {/* ========================================================= */}
      {/* 3. OPEN POSITIONS SECTION                                 */}
      {/* ========================================================= */}
      <section className="py-16 bg-slate-50 border-y border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          
          <Reveal animation="fade-up">
            <div className="text-center max-w-2xl mx-auto space-y-3">
              <span className="text-xs font-bold uppercase tracking-wider text-[#00a4e4] px-3 py-1 rounded-full bg-sky-50 border border-sky-200">
                Current Opportunities
              </span>
              <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight font-heading">
                Positions We Commonly Hire
              </h2>
              <p className="text-slate-600 text-sm">
                We regularly consider applications across field operations, heavy machinery handling, HSE, and project management.
              </p>
            </div>
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {openPositions.map((pos, idx) => (
              <Reveal key={idx} animation="fade-up" delay={(idx % 4) * 60}>
                <div
                  className="h-full p-6 rounded-2xl bg-white border border-slate-200 hover:border-[#ea1d25] shadow-xs hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 flex flex-col justify-between space-y-4 group"
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-md bg-red-50 text-[#ea1d25] border border-red-200">
                        {pos.type}
                      </span>
                      <span className="text-[11px] font-medium text-slate-500">
                        {pos.location}
                      </span>
                    </div>

                    <h3 className="font-heading font-bold text-base text-slate-900 group-hover:text-[#ea1d25] transition-colors leading-snug">
                      {pos.title}
                    </h3>

                    <p className="text-xs text-slate-600 leading-relaxed line-clamp-3">
                      {pos.desc}
                    </p>
                  </div>

                  <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                    <span className="font-medium text-slate-500 text-[11px]">
                      {pos.department}
                    </span>
                    <a
                      href="#apply"
                      onClick={() => {
                        setFormData((prev) => ({ ...prev, position: pos.title }));
                      }}
                      className="font-bold text-[#ea1d25] hover:underline flex items-center gap-1"
                    >
                      <span>Apply</span>
                      <ArrowRight className="w-3 h-3" />
                    </a>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>

        </div>
      </section>

      {/* ========================================================= */}
      {/* 4. APPLICATION & CV SUBMISSION FORM                      */}
      {/* ========================================================= */}
      <section id="apply" className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Reveal animation="fade-up">
            <div className="rounded-3xl bg-slate-50 border border-slate-200 p-8 sm:p-12 shadow-sm space-y-8">
            
            <div className="text-center space-y-2">
              <span className="text-xs font-bold uppercase tracking-wider text-[#ea1d25] px-3 py-1 rounded-full bg-red-50 border border-red-200 inline-block">
                Direct HR Gateway
              </span>
              <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight font-heading">
                Submit Your CV / Application
              </h2>
              <p className="text-slate-600 text-sm max-w-xl mx-auto">
                Fill in your details below. Our HR and operations recruitment officers will review your profile and contact you for upcoming UAE projects.
              </p>
            </div>

            {submitted ? (
              <div className="p-8 rounded-2xl bg-emerald-50 border border-emerald-200 text-center space-y-3">
                <CheckCircle2 className="w-12 h-12 text-emerald-600 mx-auto" />
                <h3 className="text-xl font-bold text-emerald-900 font-heading">
                  Application Submitted Successfully
                </h3>
                <p className="text-sm text-emerald-800 max-w-md mx-auto">
                  Thank you for your interest in joining Al Areesh Demolition. Our recruitment department has received your details and will be in touch.
                </p>
                <div className="pt-2">
                  <button
                    onClick={() => setSubmitted(false)}
                    className="text-xs font-bold text-emerald-700 underline"
                  >
                    Submit Another Application
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="e.g. Mohammad Rashid"
                      className="w-full px-4 py-3 rounded-xl bg-white border border-slate-300 focus:outline-none focus:border-[#ea1d25] text-sm text-slate-900"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                      Phone / Mobile Number *
                    </label>
                    <input
                      type="tel"
                      required
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="+971 50 123 4567"
                      className="w-full px-4 py-3 rounded-xl bg-white border border-slate-300 focus:outline-none focus:border-[#ea1d25] text-sm text-slate-900"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="your.email@example.com"
                      className="w-full px-4 py-3 rounded-xl bg-white border border-slate-300 focus:outline-none focus:border-[#ea1d25] text-sm text-slate-900"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                      Position Applied For *
                    </label>
                    <select
                      value={formData.position}
                      onChange={(e) => setFormData({ ...formData, position: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-white border border-slate-300 focus:outline-none focus:border-[#ea1d25] text-sm text-slate-900"
                    >
                      {openPositions.map((p, idx) => (
                        <option key={idx} value={p.title}>
                          {p.title}
                        </option>
                      ))}
                      <option value="Other">Other Specialized Role</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                      Relevant Experience *
                    </label>
                    <select
                      value={formData.experience}
                      onChange={(e) => setFormData({ ...formData, experience: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-white border border-slate-300 focus:outline-none focus:border-[#ea1d25] text-sm text-slate-900"
                    >
                      <option value="1-3 Years">1 - 3 Years</option>
                      <option value="3-5 Years">3 - 5 Years</option>
                      <option value="5-10 Years">5 - 10 Years</option>
                      <option value="10+ Years">10+ Years (Senior / Foreman)</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                      Current Location in UAE *
                    </label>
                    <select
                      value={formData.location}
                      onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-white border border-slate-300 focus:outline-none focus:border-[#ea1d25] text-sm text-slate-900"
                    >
                      <option value="Dubai">Dubai</option>
                      <option value="Abu Dhabi">Abu Dhabi</option>
                      <option value="Sharjah">Sharjah</option>
                      <option value="Ajman">Ajman</option>
                      <option value="Ras Al Khaimah">Ras Al Khaimah</option>
                      <option value="Fujairah">Fujairah</option>
                      <option value="Overseas / Relocating">Overseas / Relocating to UAE</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                    Summary of Qualifications / Experience
                  </label>
                  <textarea
                    rows={4}
                    value={formData.notes}
                    onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                    placeholder="Briefly describe your demolition machinery certifications, previous UAE projects, or driving license categories..."
                    className="w-full px-4 py-3 rounded-xl bg-white border border-slate-300 focus:outline-none focus:border-[#ea1d25] text-sm text-slate-900"
                  />
                </div>

                <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2">
                  <div className="text-xs text-slate-500">
                    Or email your CV directly to{' '}
                    <a href={`mailto:${COMPANY_INFO.email}`} className="text-[#ea1d25] font-bold underline">
                      {COMPANY_INFO.email}
                    </a>
                  </div>

                  <button
                    type="submit"
                    className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-gradient-to-r from-[#ea1d25] to-[#c41219] hover:from-[#ff2d35] hover:to-[#ea1d25] text-white font-extrabold text-xs uppercase tracking-wider shadow-lg shadow-red-500/20 flex items-center justify-center gap-2 transition-all transform hover:-translate-y-0.5 active:scale-95"
                  >
                    <span>Submit Application</span>
                    <Send className="w-4 h-4" />
                  </button>
                </div>
              </form>
            )}

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
