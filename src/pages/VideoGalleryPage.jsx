import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  Play, 
  Video, 
  Camera, 
  X, 
  Clock, 
  ArrowRight,
  ExternalLink,
  ShieldCheck,
  Sparkles
} from 'lucide-react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import FloatingActions from '../components/FloatingActions';
import Reveal from '../components/Reveal';
import { getGalleryVideos } from '../lib/supabase';
import { 
  extractYouTubeId, 
  getVideoPoster, 
  getYouTubeEmbedUrl, 
  getYouTubeWatchUrl 
} from '../lib/videoHelper';

export default function VideoGalleryPage({ includeLayout = true, onOpenQuote }) {
  const [activeVideo, setActiveVideo] = useState(null);
  const [activeCategory, setActiveCategory] = useState('All');

  // Exact 8 official Al Areesh Demolition operational video reels
  const defaultVideoItems = [
    {
      id: 1,
      youtubeId: 'TVmIlM3znvg',
      video_url: 'https://www.youtube.com/watch?v=TVmIlM3znvg',
      title: 'Commercial Multi-Storey Building High-Reach Demolition',
      category: 'Building Demolition',
      duration: '03:45',
      poster: 'https://img.youtube.com/vi/TVmIlM3znvg/hqdefault.jpg',
      fallbackPoster: '/service-building-demolition.jpg',
      location: 'Business Bay, Dubai',
      desc: 'Watch our long-reach high-boom excavator systematically crush reinforced concrete slabs and columns floor-by-floor with continuous water misting.'
    },
    {
      id: 2,
      youtubeId: 'HyZT6O17G6g',
      video_url: 'https://www.youtube.com/watch?v=HyZT6O17G6g',
      title: 'Controlled High-Boom Structural Deconstruction',
      category: 'Controlled Demolition',
      duration: '02:50',
      poster: 'https://img.youtube.com/vi/HyZT6O17G6g/hqdefault.jpg',
      fallbackPoster: '/real-excavator-building.png',
      location: 'Dubai Marina',
      desc: 'High-precision structural separation and mechanical crushing of high-rise commercial beams keeping adjacent roadways completely safe.'
    },
    {
      id: 3,
      youtubeId: 'Th2_6MKeI54',
      video_url: 'https://www.youtube.com/watch?v=Th2_6MKeI54',
      title: 'Building Demolition & Reinforced Concrete Pulverization',
      category: 'Building Demolition',
      duration: '01:00',
      poster: 'https://img.youtube.com/vi/Th2_6MKeI54/hqdefault.jpg',
      fallbackPoster: '/service-concrete-building.png',
      location: 'Dubai Investments Park (DIP)',
      desc: 'Live on-site mechanical pulverization of heavy reinforced concrete frame and rebar extraction under strict Dubai Municipality supervision.'
    },
    {
      id: 4,
      youtubeId: 'XaSD5FoSP-A',
      video_url: 'https://www.youtube.com/watch?v=XaSD5FoSP-A',
      title: 'Heavy Hydraulic Rock Breaker & RCC Foundation Work',
      category: 'Concrete Breaking',
      duration: '02:30',
      poster: 'https://img.youtube.com/vi/XaSD5FoSP-A/hqdefault.jpg',
      fallbackPoster: '/service-concrete.jpg',
      location: 'Downtown Dubai',
      desc: 'High-impact 4500kg Montabert hydraulic rock breaker tackling thick reinforced concrete foundation raft footings without shockwaves.'
    },
    {
      id: 5,
      youtubeId: 'JjIKSFjczNU',
      video_url: 'https://www.youtube.com/watch?v=JjIKSFjczNU',
      title: 'Turnkey Residential Villa Demolition & Plot Clearance',
      category: 'Villa Demolition',
      duration: '01:00',
      poster: 'https://img.youtube.com/vi/JjIKSFjczNU/hqdefault.jpg',
      fallbackPoster: '/service-villa-demolition.jpg',
      location: 'Palm Jumeirah, Dubai',
      desc: 'Complete luxury villa teardown with precision boundary separation, swimming pool breaking, and atomized water cannons containing all dust.'
    },
    {
      id: 6,
      youtubeId: 'dvU-Pk_DuRc',
      video_url: 'https://www.youtube.com/watch?v=dvU-Pk_DuRc',
      title: 'Deep Basement Bulk Earthworks & Tipper Hauling',
      category: 'Excavation',
      duration: '04:10',
      poster: 'https://img.youtube.com/vi/dvU-Pk_DuRc/hqdefault.jpg',
      fallbackPoster: '/service-site-clearance.png',
      location: 'Downtown Dubai',
      desc: 'A synchronized fleet of Caterpillar excavators and 32m³ heavy tippers executing rapid bulk excavation and soil transport to approved landfills.'
    },
    {
      id: 7,
      youtubeId: 'YGOtSKc97dA',
      video_url: 'https://www.youtube.com/watch?v=YGOtSKc97dA',
      title: 'Industrial Steel Structure Dismantling & Cold Shearing',
      category: 'Industrial',
      duration: '01:00',
      poster: 'https://img.youtube.com/vi/YGOtSKc97dA/hqdefault.jpg',
      fallbackPoster: '/real-industrial-dismantling.png',
      location: 'Jebel Ali Free Zone',
      desc: 'Flame-free hydraulic cold shears, crane rigging, and systematic warehouse framework dismantling for eco-friendly scrap recycling.'
    },
    {
      id: 8,
      youtubeId: '2KJkLdGBJTY',
      video_url: 'https://www.youtube.com/watch?v=2KJkLdGBJTY',
      title: 'Heavy Logistics Fleet & Live Site Operations',
      category: 'Fleet & Logistics',
      duration: '01:00',
      poster: 'https://img.youtube.com/vi/2KJkLdGBJTY/hqdefault.jpg',
      fallbackPoster: '/service-waste-fleet.png',
      location: 'Dubai Investments Park',
      desc: 'Coordinated operational footage of tipper trucks, wheel loaders, and excavators operating simultaneously on an active site.'
    }
  ];

  const [videos, setVideos] = useState(defaultVideoItems);

  // Sync with live Supabase database
  useEffect(() => {
    let isMounted = true;
    getGalleryVideos().then((data) => {
      if (isMounted && data && data.length > 0) {
        setVideos(data);
      }
    });
    return () => { isMounted = false; };
  }, []);

  const categories = ['All', 'Building Demolition', 'Controlled Demolition', 'Concrete Breaking', 'Villa Demolition', 'Excavation', 'Industrial', 'Fleet & Logistics'];

  const filteredVideos = activeCategory === 'All'
    ? videos
    : videos.filter(v => v.category?.toLowerCase() === activeCategory.toLowerCase());

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
        aria-label="Video Gallery Banner"
      >
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950/95 via-slate-950/80 to-slate-950/90" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-red-950/20 via-transparent to-transparent pointer-events-none" />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 w-full text-center space-y-4">
          <Reveal animation="fade-up" duration={600}>
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white shadow-xl animate-in fade-in duration-700">
              <Video className="w-3.5 h-3.5 text-[#00a4e4]" />
              <span className="text-xs font-bold tracking-wider uppercase drop-shadow-sm">
                Official Al Areesh Demolition Video Reels
              </span>
            </div>

            <h1 className="text-4xl sm:text-5xl md:text-6xl font-black text-white tracking-tight font-heading drop-shadow-md mt-3">
              Video <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#ea1d25] via-red-400 to-[#00a4e4]">Gallery</span>
            </h1>

            <p className="max-w-2xl mx-auto text-sm sm:text-base md:text-lg text-slate-300 font-normal leading-relaxed mt-3">
              High-definition video reels highlighting Al Areesh Demolition&apos;s excavators, hydraulic breakers, and site clearance teams across the UAE.
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
              <span className="text-[#ea1d25] font-bold">Video Gallery</span>
            </nav>
          </Reveal>
        </div>
      </section>

      {/* ========================================================= */}
      {/* 2. GALLERY SWITCHER TABS & CATEGORIES                    */}
      {/* ========================================================= */}
      <section className="bg-slate-100 border-b border-slate-200 py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Reveal animation="fade-up" delay={80}>
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-2 bg-white p-1 rounded-2xl border border-slate-200 shadow-xs">
                <Link
                  to="/photo-gallery"
                  className="px-5 py-2 rounded-xl text-xs sm:text-sm font-bold text-slate-700 hover:text-[#ea1d25] hover:bg-slate-50 flex items-center gap-2 transition-colors"
                >
                  <Camera className="w-4 h-4 text-[#00a4e4]" />
                  <span>Photo Gallery</span>
                </Link>
                <Link
                  to="/video-gallery"
                  className="px-5 py-2 rounded-xl text-xs sm:text-sm font-bold bg-[#ea1d25] text-white shadow-md shadow-red-500/20 flex items-center gap-2"
                >
                  <Video className="w-4 h-4" />
                  <span>Video Gallery</span>
                </Link>
              </div>

              <div className="flex items-center gap-2 text-xs text-slate-600 font-medium">
                <ShieldCheck className="w-4 h-4 text-[#00a4e4]" />
                <span>Official Channel: Al Areesh Wrecking &amp; Demolition Dubai</span>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ========================================================= */}
      {/* 3. VIDEO CARDS GRID                                      */}
      {/* ========================================================= */}
      <section className="py-16 sm:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          
          <Reveal animation="fade-up">
            <div className="text-center max-w-3xl mx-auto space-y-4">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-red-50 border border-red-200 text-[#ea1d25] text-xs font-bold tracking-wider uppercase">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Engineering in Motion</span>
              </div>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-slate-900 tracking-tight font-heading">
                Heavy Demolition Fleet Operational Videos
              </h2>
              <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
                Click any video card below to watch live on-site footage of high-rise commercial structures being demolished, heavy concrete foundations broken, and multi-acre construction plots leveled across Dubai.
              </p>

              {/* Category Filter Tabs */}
              <div className="flex flex-wrap items-center justify-center gap-2 pt-4">
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
            </div>
          </Reveal>

          {/* Video Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredVideos.map((item, index) => {
              const posterUrl = getVideoPoster(item);
              return (
                <Reveal key={item.id || index} animation="fade-up" delay={(index % 4) * 60}>
                  <div
                    onClick={() => setActiveVideo(item)}
                    className="h-full group rounded-3xl bg-white border border-slate-200 hover:border-[#ea1d25] shadow-sm hover:shadow-2xl hover:-translate-y-1.5 transition-all duration-300 overflow-hidden flex flex-col justify-between cursor-pointer"
                  >
                    {/* Poster & Play Button Container */}
                    <div className="relative h-52 sm:h-56 w-full overflow-hidden bg-slate-950">
                      <img
                        src={posterUrl}
                        alt={item.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 opacity-90"
                        onError={(e) => {
                          e.target.onerror = null;
                          e.target.src = '/service-building-demolition.jpg';
                        }}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-slate-950/30 to-transparent transition-opacity group-hover:opacity-90" />

                      {/* Play Icon Badge */}
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-[#ea1d25]/90 text-white flex items-center justify-center shadow-2xl group-hover:scale-110 group-hover:bg-[#ea1d25] transition-all duration-300 pl-1 border border-white/20">
                          <Play className="w-6 h-6 sm:w-7 sm:h-7 fill-white" />
                        </div>
                      </div>

                      {/* Duration Tag */}
                      <div className="absolute bottom-3 right-3">
                        <span className="text-[11px] font-mono font-bold px-2 py-1 rounded-md bg-black/70 backdrop-blur-md text-white flex items-center gap-1 border border-white/20">
                          <Clock className="w-3 text-[#00a4e4]" />
                          <span>{item.duration || '02:00'}</span>
                        </span>
                      </div>

                      {/* Category Pill */}
                      <div className="absolute top-3 left-3">
                        <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-md bg-white/95 text-[#ea1d25] shadow-sm">
                          {item.category}
                        </span>
                      </div>

                      {/* Direct YouTube Link Badge on Card */}
                      {(() => {
                        const cardYtId = extractYouTubeId(item.youtubeId || item.video_url || item.videoUrl);
                        if (cardYtId) {
                          return (
                            <a
                              href={getYouTubeWatchUrl(cardYtId)}
                              target="_blank"
                              rel="noopener noreferrer"
                              onClick={(e) => e.stopPropagation()}
                              className="absolute top-3 right-3 z-10 px-2.5 py-1 rounded-md bg-red-600/90 hover:bg-red-600 text-white text-[10px] font-bold flex items-center gap-1 transition-all shadow-md hover:scale-105"
                              title="Watch directly on YouTube"
                            >
                              <span>YouTube</span>
                              <ExternalLink className="w-2.5 h-2.5" />
                            </a>
                          );
                        }
                        return null;
                      })()}
                    </div>

                    {/* Details */}
                    <div className="p-5 space-y-3 flex-1 flex flex-col justify-between">
                      <div className="space-y-1.5">
                        <span className="text-[11px] font-bold text-[#00a4e4] uppercase tracking-wider">
                          {item.location || 'Dubai, UAE'}
                        </span>
                        <h3 className="font-heading font-bold text-sm sm:text-base text-slate-900 group-hover:text-[#ea1d25] transition-colors leading-snug line-clamp-2">
                          {item.title}
                        </h3>
                        <p className="text-xs text-slate-500 leading-relaxed line-clamp-2">
                          {item.desc || item.description}
                        </p>
                      </div>

                      <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-[#ea1d25]">
                        <span className="flex items-center gap-1">
                          <Play className="w-3.5 h-3.5 fill-[#ea1d25]" />
                          <span>Play Video Reel</span>
                        </span>
                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                      </div>
                    </div>
                  </div>
                </Reveal>
              );
            })}
          </div>

        </div>
      </section>

      {/* ========================================================= */}
      {/* 4. REAL RESPONSIVE VIDEO MODAL PLAYER                     */}
      {/* ========================================================= */}
      {activeVideo && (
        <div
          onClick={() => setActiveVideo(null)}
          className="fixed inset-0 z-50 bg-slate-950/90 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 animate-in fade-in duration-200"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative max-w-4xl w-full bg-slate-900 rounded-3xl overflow-hidden shadow-2xl border border-slate-700 text-white flex flex-col max-h-[92vh]"
          >
            {/* Modal Close Button */}
            <button
              onClick={() => setActiveVideo(null)}
              className="absolute top-3 right-3 z-20 p-2 rounded-full bg-black/80 hover:bg-[#ea1d25] text-white transition-colors"
              aria-label="Close Video Player"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Video Player (Supports YouTube Embeds & Direct HTML5 MP4/WebM) */}
            <div className="relative aspect-video w-full bg-black flex items-center justify-center">
              {(() => {
                const ytId = extractYouTubeId(activeVideo.youtubeId || activeVideo.video_url || activeVideo.videoUrl);
                if (ytId) {
                  return (
                    <iframe
                      src={getYouTubeEmbedUrl(ytId, { autoplay: true })}
                      title={activeVideo.title}
                      className="w-full h-full border-0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                      referrerPolicy="no-referrer-when-downgrade"
                      allowFullScreen
                    />
                  );
                }
                const fileUrl = activeVideo.video_url || activeVideo.videoUrl;
                if (fileUrl) {
                  return (
                    <video
                      src={fileUrl}
                      poster={getVideoPoster(activeVideo)}
                      controls
                      autoPlay
                      playsInline
                      className="w-full h-full object-contain"
                    >
                      Your browser does not support HTML5 video.
                    </video>
                  );
                }
                return (
                  <div className="text-center p-6 text-slate-400 text-sm">
                    Video stream unavailable.
                  </div>
                );
              })()}
            </div>

            {/* YouTube Playback Resilience Notice Bar */}
            {(() => {
              const ytId = extractYouTubeId(activeVideo.youtubeId || activeVideo.video_url || activeVideo.videoUrl);
              if (ytId) {
                return (
                  <div className="px-5 py-2.5 bg-slate-950 border-t border-slate-800 text-[11px] text-slate-400 flex flex-wrap items-center justify-between gap-2">
                    <div className="flex items-center gap-1.5 text-slate-300">
                      <ShieldCheck className="w-3.5 h-3.5 text-[#00a4e4] shrink-0" />
                      <span>Official Al Areesh Demolition footage. If browser restricts embedded iframes:</span>
                    </div>
                    <a
                      href={getYouTubeWatchUrl(ytId)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[#ea1d25] hover:text-red-400 font-bold inline-flex items-center gap-1 transition-colors"
                    >
                      <span>Watch Directly on YouTube</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>
                );
              }
              return null;
            })()}

            {/* Video Details & Actions */}
            <div className="p-5 sm:p-6 bg-slate-900 border-t border-slate-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div className="space-y-1.5 flex-1 pr-4">
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-extrabold uppercase tracking-wider px-2 py-0.5 rounded bg-red-950 text-red-400 border border-red-800">
                    {activeVideo.category}
                  </span>
                  <span className="text-xs text-[#00a4e4] font-medium">
                    {activeVideo.location || 'Dubai, UAE'}
                  </span>
                </div>
                <h3 className="text-base sm:text-lg font-bold font-heading text-white">
                  {activeVideo.title}
                </h3>
                <p className="text-xs text-slate-400 line-clamp-2">
                  {activeVideo.desc || activeVideo.description}
                </p>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-2.5 shrink-0 w-full sm:w-auto">
                {(() => {
                  const ytId = extractYouTubeId(activeVideo.youtubeId || activeVideo.video_url || activeVideo.videoUrl);
                  if (ytId) {
                    return (
                      <a
                        href={getYouTubeWatchUrl(ytId)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-4 py-2.5 rounded-xl bg-red-600 hover:bg-red-700 text-white font-bold text-xs flex items-center justify-center gap-1.5 transition-colors shadow-md shadow-red-600/30"
                      >
                        <Play className="w-3.5 h-3.5 fill-white" />
                        <span>Watch on YouTube</span>
                        <ExternalLink className="w-3.5 h-3.5" />
                      </a>
                    );
                  }
                  return null;
                })()}

                <button
                  onClick={() => {
                    setActiveVideo(null);
                    if (typeof onOpenQuote === 'function') onOpenQuote(activeVideo.title);
                  }}
                  className="px-5 py-2.5 rounded-xl bg-[#ea1d25] hover:bg-[#c41219] text-white font-bold text-xs uppercase tracking-wider transition-all transform hover:-translate-y-0.5"
                >
                  Inquire Quote
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================= */}
      {/* 5. SWITCH TO PHOTO GALLERY CTA                           */}
      {/* ========================================================= */}
      <section className="py-12 bg-slate-50 border-t border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Reveal animation="fade-up">
            <div className="text-center space-y-4">
              <h3 className="text-xl sm:text-2xl font-black text-slate-900 font-heading">
                Looking for High-Resolution Project Photos?
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 max-w-lg mx-auto">
                Browse our full photographic archive featuring 16+ executed commercial, villa, and industrial demolition sites.
              </p>
              <Link
                to="/photo-gallery"
                className="inline-flex items-center gap-2 px-7 py-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs uppercase tracking-wider shadow-md transition-all transform hover:-translate-y-0.5"
              >
                <Camera className="w-4 h-4 text-[#00a4e4]" />
                <span>Go to Photo Gallery</span>
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
