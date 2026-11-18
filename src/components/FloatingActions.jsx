import { useState, useEffect } from 'react';
import { MessageSquare, Phone, ArrowUp } from 'lucide-react';
import { COMPANY_INFO } from '../data/companyData';

export default function FloatingActions() {
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 400);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="fixed bottom-6 right-6 z-40 flex flex-col items-end gap-3 pointer-events-none">
      
      {/* Scroll to Top */}
      {showScrollTop && (
        <button
          onClick={scrollToTop}
          aria-label="Scroll to top"
          className="pointer-events-auto p-3 rounded-full bg-white hover:bg-[#ea1d25] text-slate-800 hover:text-white border border-slate-200 shadow-xl transition-all duration-300 transform hover:-translate-y-1"
        >
          <ArrowUp className="w-4 h-4" />
        </button>
      )}

      {/* Floating Phone Call */}
      <a
        href={`tel:${COMPANY_INFO.phoneRaw}`}
        aria-label="Call Al Areesh Demolition"
        className="pointer-events-auto flex sm:hidden items-center justify-center p-3.5 rounded-full bg-[#ea1d25] hover:bg-red-700 text-white shadow-xl shadow-red-950/50 border border-red-500/40 transition-all transform hover:scale-105"
      >
        <Phone className="w-5 h-5" />
      </a>

      {/* Floating WhatsApp Action */}
      <a
        href={`https://wa.me/${COMPANY_INFO.whatsapp}?text=Hello%20Al%20Areesh%20Demolition,%20I%20need%20a%20demolition%20quote`}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat on WhatsApp"
        className="pointer-events-auto group flex items-center gap-2 p-3 sm:px-4 sm:py-3 rounded-full bg-emerald-500 hover:bg-emerald-600 text-white shadow-2xl shadow-emerald-950/60 border border-emerald-400/40 transition-all transform hover:scale-105"
      >
        <MessageSquare className="w-5 h-5" />
        <span className="hidden sm:inline-block text-xs font-bold uppercase tracking-wider">
          WhatsApp Us
        </span>
      </a>

    </div>
  );
}
