import { useState } from 'react';
import { GALLERY_PROJECTS } from '../data/companyData';
import { MapPin, Eye, X, ArrowRight } from 'lucide-react';
import Reveal from './Reveal';

export default function ProjectGallery({ onOpenQuote }) {
  const [activeCategory, setActiveCategory] = useState('All');
  const [activeProject, setActiveProject] = useState(null);

  const categories = ['All', 'Building', 'Villa', 'Excavation', 'Industrial', 'Concrete', 'Clearance'];

  const filteredProjects = activeCategory === 'All'
    ? GALLERY_PROJECTS
    : GALLERY_PROJECTS.filter((p) => p.category.toLowerCase() === activeCategory.toLowerCase());

  return (
    <section id="gallery" className="py-20 bg-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <Reveal animation="fade-up">
          <div className="text-center max-w-3xl mx-auto space-y-3 mb-12">
            <span className="text-xs font-bold uppercase tracking-widest text-[#ea1d25] inline-block px-3 py-1 rounded-full bg-red-50 border border-red-200">
              Picture Gallery & Works
            </span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight">
              Executed Projects Across Dubai & UAE
            </h2>
            <p className="text-sm sm:text-base text-slate-600">
              Explore our proven track record across commercial towers, residential luxury villas, deep basement excavations, and industrial structural clearances.
            </p>

            {/* Category Tabs */}
            <div className="flex flex-wrap items-center justify-center gap-2 pt-4">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-4 py-1.5 rounded-lg text-xs font-semibold transition-all duration-300 transform active:scale-95 ${
                    activeCategory === cat
                      ? 'bg-[#ea1d25] text-white shadow-md shadow-red-500/20 border border-red-600 scale-105'
                      : 'bg-slate-100 text-slate-700 hover:text-[#00a4e4] hover:bg-slate-200 border border-slate-200'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        </Reveal>

        {/* Gallery Grid with Staggered Transition */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProjects.map((project, index) => (
            <Reveal key={project.id} animation="fade-up" delay={index * 100}>
              <div
                className="group relative rounded-2xl bg-white border border-slate-200 overflow-hidden cursor-pointer hover:border-sky-400 transition-all duration-500 hover:shadow-xl card-hover-transition flex flex-col h-full"
                onClick={() => setActiveProject(project)}
              >
                {/* Image Frame */}
                <div className="relative h-64 w-full overflow-hidden bg-slate-100">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = project.fallbackImage;
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/25 to-transparent opacity-85 group-hover:opacity-70 transition-opacity duration-300" />

                  {/* Tag pill with Logo Blue */}
                  <div className="absolute top-3 left-3">
                    <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-md bg-white/95 backdrop-blur-md text-[#00a4e4] border border-slate-200 shadow-sm">
                      {project.tag}
                    </span>
                  </div>

                  {/* Quick inspect overlay button */}
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300">
                    <div className="p-3 rounded-full bg-[#ea1d25] text-white shadow-xl backdrop-blur-md transform scale-75 group-hover:scale-100 transition-transform duration-300 border border-red-400/40">
                      <Eye className="w-5 h-5" />
                    </div>
                  </div>

                  {/* Location indicator */}
                  <div className="absolute bottom-3 left-4 right-4 flex items-center gap-1.5 text-xs text-slate-200">
                    <MapPin className="w-3.5 h-3.5 text-[#ea1d25] shrink-0" />
                    <span className="truncate">{project.location}</span>
                  </div>
                </div>

                {/* Title & Scope */}
                <div className="p-5 flex-1 flex flex-col justify-between">
                  <h3 className="font-heading text-base font-bold text-slate-900 group-hover:text-[#00a4e4] transition-colors duration-300">
                    {project.title}
                  </h3>
                  <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                    {project.scope}
                  </p>

                  <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-semibold text-slate-500 group-hover:text-[#00a4e4] transition-colors duration-200">
                    <span>View Project Details</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1.5 transition-transform duration-200" />
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>

      </div>

      {/* Lightbox / Project Details Modal with Scale Transition */}
      {activeProject && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm transition-opacity duration-300">
          <div className="relative w-full max-w-3xl bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-2xl flex flex-col max-h-[92vh] animate-in zoom-in-95 duration-200">
            
            <div className="relative h-72 sm:h-96 w-full bg-slate-900">
              <img
                src={activeProject.image}
                alt={activeProject.title}
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = activeProject.fallbackImage;
                }}
              />
              <button
                onClick={() => setActiveProject(null)}
                className="absolute top-4 right-4 p-2 rounded-full bg-slate-900/80 text-white hover:bg-[#ea1d25] transition-colors duration-200"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-[#00a4e4] px-2.5 py-0.5 rounded bg-sky-50 border border-sky-200">
                  {activeProject.tag}
                </span>
                <div className="flex items-center gap-1.5 text-xs text-slate-500">
                  <MapPin className="w-3.5 h-3.5 text-[#ea1d25]" />
                  <span>{activeProject.location}</span>
                </div>
              </div>

              <h3 className="font-heading text-xl font-bold text-slate-900">
                {activeProject.title}
              </h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                {activeProject.scope}
              </p>

              <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                <button
                  onClick={() => setActiveProject(null)}
                  className="px-4 py-2 text-xs font-semibold text-slate-600 hover:text-slate-900 transition-colors"
                >
                  Close
                </button>
                <button
                  onClick={() => {
                    setActiveProject(null);
                    onOpenQuote();
                  }}
                  className="px-6 py-2.5 text-xs font-bold uppercase tracking-wider text-white bg-gradient-to-r from-[#ea1d25] to-[#c41219] hover:from-[#ff2d35] hover:to-[#ea1d25] rounded-lg shadow-md flex items-center gap-1.5 border border-red-500/40 transition-all transform hover:scale-[1.02] active:scale-[0.98]"
                >
                  <span>Inquire for Similar Project</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>

          </div>
        </div>
      )}
    </section>
  );
}
