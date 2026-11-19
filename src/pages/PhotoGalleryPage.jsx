import { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Camera, 
  Video, 
  X, 
  Maximize2, 
  ArrowRight
} from 'lucide-react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import FloatingActions from '../components/FloatingActions';
import Reveal from '../components/Reveal';

export default function PhotoGalleryPage({ includeLayout = true, onOpenQuote }) {
  const [activeCategory, setActiveCategory] = useState('All');
  const [selectedImage, setSelectedImage] = useState(null);

  const galleryItems = [
    {
      id: 1,
      title: 'Commercial Tower Controlled Demolition',
      category: 'Building Demolition',
      location: 'Business Bay, Dubai',
      src: '/service-building-demolition.jpg',
      desc: 'Floor-by-floor controlled mechanical deconstruction of multi-storey commercial structure.'
    },
    {
      id: 2,
      title: 'Heavy RCC Frame Crushing',
      category: 'Concrete Breaking',
      location: 'Dubai Marina',
      src: '/service-concrete-building.png',
      desc: 'High-reach excavator equipped with hydraulic concrete pulverizer dismantling reinforced beam joints.'
    },
    {
      id: 3,
      title: 'Residential Villa Demolition',
      category: 'Villa Demolition',
      location: 'Palm Jumeirah, Dubai',
      src: '/service-villa-demolition.jpg',
      desc: 'Turnkey luxury villa teardown with precision boundary separation and swimming pool breaking.'
    },
    {
      id: 4,
      title: 'Deep Basement Bulk Earthworks',
      category: 'Excavation',
      location: 'Downtown Dubai',
      src: '/service-site-clearance.png',
      desc: 'Excavation of multi-level basement footprint with coordinated shoring and water table control.'
    },
    {
      id: 5,
      title: 'Excavator Demolishing Concrete Structure',
      category: 'Building Demolition',
      location: 'DIP 1, Dubai',
      src: '/real-excavator-building.png',
      desc: 'Heavy crawler excavator crushing primary structural concrete piers on an industrial plot.'
    },
    {
      id: 6,
      title: 'Urban Site Clearing & Earthmoving',
      category: 'Excavation',
      location: 'Al Barsha, Dubai',
      src: '/real-urban-excavation.png',
      desc: 'Bulk earthmoving, laser leveling, and soil compaction for high-density residential redevelopment.'
    },
    {
      id: 7,
      title: 'Industrial Steel Plant Dismantling',
      category: 'Industrial',
      location: 'Jebel Ali Industrial Area',
      src: '/real-industrial-dismantling.png',
      desc: 'Cold cutting, mobile crane lifting, and dismantling of heavy structural steel warehouse framework.'
    },
    {
      id: 8,
      title: 'Concrete Breaking & Pile Chipping',
      category: 'Concrete Breaking',
      location: 'Deira, Dubai',
      src: '/service-concrete.jpg',
      desc: 'Hydraulic rock hammer fracturing thick foundation rafts and reinforced concrete footings.'
    },
    {
      id: 9,
      title: 'Heavy Logistics & Tipper Transport Fleet',
      category: 'Fleet',
      location: 'Al Areesh Logistics Yard',
      src: '/service-waste-fleet.png',
      desc: 'Fleet of 32m³ heavy tippers mobilized for rapid municipal debris hauling.'
    },
    {
      id: 10,
      title: 'Sunset Scrap Yard Crane Operations',
      category: 'Recycling',
      location: 'Sharjah Industrial Zone',
      src: '/service-scrap.png',
      desc: 'Electromagnetic crane sorting and baling rebar extracted from demolished reinforced concrete.'
    },
    {
      id: 11,
      title: 'On-Site Machine Fleet Mobilization',
      category: 'Fleet',
      location: 'Dubai South',
      src: '/service-demolition-contractors.png',
      desc: 'Turnkey fleet setup including CAT excavators, wheel loaders, and mist dust cannons.'
    },
    {
      id: 12,
      title: 'Urban Demolition With Dubai Skyline',
      category: 'Building Demolition',
      location: 'Sheikh Zayed Road, Dubai',
      src: 'https://alareeshdemolition.ae/wp-content/uploads/2026/02/WhatsApp-Image-2026-01-16-at-6.55.23-PM-1-300x169.jpeg',
      desc: 'High-precision urban deconstruction directly adjacent to live commercial arterial roads.'
    },
    {
      id: 13,
      title: 'Precision Hydraulic Shearing',
      category: 'Industrial',
      location: 'Ras Al Khor, Dubai',
      src: 'https://alareeshdemolition.ae/wp-content/uploads/2026/02/WhatsApp-Image-2026-01-16-at-6.55.22-PM-1-300x169.jpeg',
      desc: 'Hydraulic metal shear attachment cutting through heavy industrial pipework and steel trusses.'
    },
    {
      id: 14,
      title: 'Villa Boundary Wall Saw Cutting',
      category: 'Villa Demolition',
      location: 'Jumeirah 1, Dubai',
      src: 'https://alareeshdemolition.ae/wp-content/uploads/2026/02/WhatsApp-Image-2026-01-16-at-6.55.21-PM-1-300x169.jpeg',
      desc: 'Diamond saw blade isolating shared villa boundary walls to prevent collateral cracking.'
    },
    {
      id: 15,
      title: 'Substructure Foundation Extraction',
      category: 'Excavation',
      location: 'Al Quoz Industrial, Dubai',
      src: 'https://alareeshdemolition.ae/wp-content/uploads/2026/02/WhatsApp-Image-2026-01-16-at-6.55.20-PM-1-300x169.jpeg',
      desc: 'Extracting deep concrete footings and buried utilities to prepare pristine ground.'
    },
    {
      id: 16,
      title: 'Completed Site Handover Ready for Building',
      category: 'Excavation',
      location: 'Umm Suqeim, Dubai',
      src: 'https://alareeshdemolition.ae/wp-content/uploads/2026/02/WhatsApp-Image-2026-01-16-at-6.55.19-PM-1-300x169.jpeg',
      desc: 'Fully leveled, compacted plot with Dubai Municipality NOC sign-off.'
    }
  ];

  const categories = ['All', 'Building Demolition', 'Villa Demolition', 'Excavation', 'Concrete Breaking', 'Industrial', 'Fleet'];

  const filteredItems = activeCategory === 'All'
    ? galleryItems
    : galleryItems.filter((item) => item.category === activeCategory);

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
        aria-label="Photo Gallery Banner"
      >
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950/95 via-slate-950/80 to-slate-950/90" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-red-950/20 via-transparent to-transparent pointer-events-none" />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 w-full text-center space-y-4">
          <Reveal animation="fade-up" duration={600}>
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white shadow-xl animate-in fade-in duration-700">
              <Camera className="w-3.5 h-3.5 text-[#00a4e4]" />
              <span className="text-xs font-bold tracking-wider uppercase drop-shadow-sm">
                Visual Portfolio of Executed Projects
              </span>
            </div>

            <h1 className="text-4xl sm:text-5xl md:text-6xl font-black text-white tracking-tight font-heading drop-shadow-md mt-3">
              Photo <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#ea1d25] via-red-400 to-[#00a4e4]">Gallery</span>
            </h1>

            <p className="max-w-2xl mx-auto text-sm sm:text-base md:text-lg text-slate-300 font-normal leading-relaxed mt-3">
              High-resolution on-site photography showcasing building dismantling, villa teardowns, heavy excavation, and recycling across Dubai.
            </p>

            <nav
              aria-label="Breadcrumb"
              className="pt-3 flex items-center justify-center flex-wrap gap-2 text-xs sm:text-sm text-slate-300 drop-shadow-sm font-medium"
            >
              <Link to="/" className="text-slate-300 hover:text-white transition-colors">
                Home
              </Link>
              <span className="text-slate-500">›</span>
              <span className="text-slate-400">Gallery</span>
              <span className="text-slate-500">›</span>
              <span className="text-[#ea1d25] font-bold">Photo Gallery</span>
            </nav>
          </Reveal>
        </div>
      </section>

      {/* ========================================================= */}
      {/* 2. GALLERY SWITCHER TABS                                 */}
      {/* ========================================================= */}
      <section className="bg-slate-100 border-b border-slate-200 py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Reveal animation="fade-up" delay={80}>
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-2 bg-white p-1 rounded-2xl border border-slate-200 shadow-xs">
                <Link
                  to="/photo-gallery"
                  className="px-5 py-2 rounded-xl text-xs sm:text-sm font-bold bg-[#ea1d25] text-white shadow-md shadow-red-500/20 flex items-center gap-2"
                >
                  <Camera className="w-4 h-4" />
                  <span>Photo Gallery</span>
                </Link>
                <Link
                  to="/video-gallery"
                  className="px-5 py-2 rounded-xl text-xs sm:text-sm font-bold text-slate-700 hover:text-[#ea1d25] hover:bg-slate-50 flex items-center gap-2 transition-colors"
                >
                  <Video className="w-4 h-4 text-[#00a4e4]" />
                  <span>Video Gallery</span>
                </Link>
              </div>

              <div className="text-xs text-slate-500 font-medium">
                Displaying {filteredItems.length} Project Photos
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ========================================================= */}
      {/* 3. PHOTO GRID WITH FILTER PILLS                          */}
      {/* ========================================================= */}
      <section className="py-16 sm:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          
          {/* Category Filter Pills */}
          <Reveal animation="fade-up">
            <div className="flex flex-wrap items-center justify-center gap-2">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all duration-300 transform active:scale-95 ${
                    activeCategory === cat
                      ? 'bg-[#ea1d25] text-white shadow-lg shadow-red-500/20 scale-105'
                      : 'bg-slate-100 text-slate-700 hover:text-[#ea1d25] hover:bg-slate-200/80 border border-slate-200/60'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </Reveal>

          {/* Photos Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {filteredItems.map((item, index) => (
              <Reveal key={item.id} animation="fade-up" delay={(index % 4) * 60}>
                <div
                  onClick={() => setSelectedImage(item)}
                  className="h-full group relative rounded-2xl overflow-hidden bg-slate-900 border border-slate-200 hover:border-[#ea1d25] shadow-sm hover:shadow-2xl hover:-translate-y-1.5 transition-all duration-300 cursor-pointer min-h-[280px] flex flex-col justify-end"
                >
                  <img
                    src={item.src}
                    alt={item.title}
                    className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = '/real-excavator-building.png';
                    }}
                  />
                  
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/30 to-transparent transition-opacity group-hover:opacity-95" />

                  {/* Top Badge */}
                  <div className="absolute top-3 left-3 right-3 flex items-center justify-between">
                    <span className="text-[10px] font-extrabold uppercase tracking-wider px-2.5 py-1 rounded-md bg-white/95 text-[#ea1d25] shadow-xs">
                      {item.category}
                    </span>
                    <div className="w-7 h-7 rounded-full bg-black/60 backdrop-blur-md text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                      <Maximize2 className="w-3.5 h-3.5" />
                    </div>
                  </div>

                  {/* Bottom Content */}
                  <div className="relative z-10 p-4 space-y-1 text-white">
                    <h3 className="font-heading font-bold text-sm leading-snug line-clamp-2">
                      {item.title}
                    </h3>
                    <p className="text-[11px] text-slate-300 flex items-center gap-1">
                      <span>{item.location}</span>
                    </p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>

        </div>
      </section>

      {/* ========================================================= */}
      {/* 4. LIGHTBOX MODAL                                         */}
      {/* ========================================================= */}
      {selectedImage && (
        <div
          onClick={() => setSelectedImage(null)}
          className="fixed inset-0 z-50 bg-slate-950/90 backdrop-blur-md flex items-center justify-center p-4 animate-in fade-in duration-200"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative max-w-4xl w-full bg-white rounded-3xl overflow-hidden shadow-2xl border border-slate-700"
          >
            <button
              onClick={() => setSelectedImage(null)}
              className="absolute top-4 right-4 z-10 p-2.5 rounded-full bg-black/70 hover:bg-black text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="max-h-[70vh] bg-black flex items-center justify-center overflow-hidden">
              <img
                src={selectedImage.src}
                alt={selectedImage.title}
                className="max-h-[70vh] w-auto object-contain"
              />
            </div>

            <div className="p-6 bg-white flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div className="space-y-1">
                <span className="text-[10px] font-extrabold uppercase tracking-wider px-2.5 py-0.5 rounded bg-red-100 text-[#ea1d25]">
                  {selectedImage.category}
                </span>
                <h3 className="font-heading font-bold text-lg text-slate-900">
                  {selectedImage.title}
                </h3>
                <p className="text-xs text-slate-600">
                  {selectedImage.desc}
                </p>
              </div>

              <button
                onClick={() => {
                  setSelectedImage(null);
                  if (typeof onOpenQuote === 'function') onOpenQuote(selectedImage.title);
                }}
                className="px-6 py-2.5 rounded-xl bg-[#ea1d25] hover:bg-[#c41219] text-white font-bold text-xs uppercase tracking-wider shrink-0"
              >
                Inquire on this Scope
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Bottom Switch to Video Gallery CTA */}
      <section className="py-12 bg-slate-50 border-t border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Reveal animation="fade-up">
            <div className="text-center space-y-4">
              <h3 className="text-xl sm:text-2xl font-black text-slate-900 font-heading">
                Want to See Our Heavy Machinery in Action?
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 max-w-lg mx-auto">
                Watch real on-site operational videos showcasing high-reach demolition, hydraulic rock breaking, and bulk earthworks.
              </p>
              <Link
                to="/video-gallery"
                className="inline-flex items-center gap-2 px-7 py-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs uppercase tracking-wider shadow-md transition-all"
              >
                <Video className="w-4 h-4 text-[#00a4e4]" />
                <span>Go to Video Gallery</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
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
