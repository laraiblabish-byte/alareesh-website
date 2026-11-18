import { useState } from 'react';
import { Calculator, ArrowRight } from 'lucide-react';
import Reveal from './Reveal';

export default function CostEstimator({ onTransferToQuote }) {
  const [projectType, setProjectType] = useState('villa');
  const [areaSize, setAreaSize] = useState('5000');
  const [location, setLocation] = useState('Dubai');
  const [needPermits, setNeedPermits] = useState(true);
  const [includeRecycling, setIncludeRecycling] = useState(true);

  // Heuristic for Dubai Demolition scope estimation
  const projectTypes = [
    { id: 'villa', label: 'Residential Villa Demolition', rate: 12, timeBase: 10 },
    { id: 'commercial', label: 'Commercial Building Demolition', rate: 18, timeBase: 25 },
    { id: 'excavation', label: 'Bulk Basement Excavation & Earthworks', rate: 15, timeBase: 18 },
    { id: 'stripout', label: 'Internal Strip-out & Structural Dismantling', rate: 9, timeBase: 7 },
    { id: 'concrete', label: 'Reinforced Concrete Foundation Breaking', rate: 22, timeBase: 12 }
  ];

  const selectedProj = projectTypes.find((p) => p.id === projectType) || projectTypes[0];
  const sizeNum = parseInt(areaSize, 10) || 5000;

  // Approximate ballpark range in AED
  const baseEstimate = sizeNum * selectedProj.rate;
  const permitFee = needPermits ? 8000 : 0;
  const recyclingCredit = includeRecycling ? Math.round(baseEstimate * 0.12) : 0;
  const finalEst = Math.max(15000, baseEstimate + permitFee - recyclingCredit);

  const estimatedDays = Math.max(5, Math.round(selectedProj.timeBase * (sizeNum / 5000)));

  const handleApply = () => {
    onTransferToQuote({
      service: selectedProj.label,
      location: location,
      details: `Calculated Estimate: Approx ${sizeNum.toLocaleString()} sq.ft, Est. Timeline: ~${estimatedDays} days, Permits Required: ${needPermits ? 'Yes' : 'No'}, Scrap Credit: ${includeRecycling ? 'Yes' : 'No'}.`
    });
  };

  return (
    <section id="estimator" className="py-20 bg-slate-50/70 border-y border-slate-200 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        <Reveal animation="zoom-in">
          <div className="max-w-4xl mx-auto rounded-3xl bg-white border border-slate-200 p-6 sm:p-10 shadow-xl relative overflow-hidden card-hover-transition">
            
            {/* Top Logo Dual-Color Accent (Red & Sky Blue) */}
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#ea1d25] via-[#00a4e4] to-[#ea1d25]" />
            
            <div className="text-center max-w-2xl mx-auto space-y-2 mb-8">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-sky-50 border border-sky-200 text-[#00a4e4] text-xs font-bold uppercase tracking-wider">
                <Calculator className="w-3.5 h-3.5" />
                <span>Interactive Scope & Budget Estimator</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                Estimate Your UAE Demolition Project
              </h2>
              <p className="text-xs sm:text-sm text-slate-600">
                Get an instant preliminary estimate based on current Dubai Municipality permit requirements and machine mobilization rates.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              
              {/* Left Inputs */}
              <div className="lg:col-span-7 space-y-5">
                
                {/* Project Type */}
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
                    1. Project Type
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {projectTypes.map((t) => (
                      <button
                        key={t.id}
                        type="button"
                        onClick={() => setProjectType(t.id)}
                        className={`p-3 rounded-xl text-left text-xs font-semibold transition-all duration-200 border transform active:scale-95 ${
                          projectType === t.id
                            ? 'bg-red-50 border-[#ea1d25] text-[#ea1d25] shadow-sm scale-[1.02]'
                            : 'bg-slate-50 border-slate-200 text-slate-700 hover:text-slate-900 hover:bg-slate-100'
                        }`}
                      >
                        {t.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Area Slider */}
                <div>
                  <div className="flex justify-between items-center mb-1.5">
                    <label className="text-xs font-bold uppercase tracking-wider text-slate-700">
                      2. Estimated Plot / Built-Up Area
                    </label>
                    <span className="text-xs font-mono font-bold text-sky-700 bg-sky-50 px-2 py-0.5 rounded border border-sky-200 transition-all duration-150">
                      {parseInt(areaSize, 10).toLocaleString()} sq. ft.
                    </span>
                  </div>
                  <input
                    type="range"
                    min="1000"
                    max="40000"
                    step="1000"
                    value={areaSize}
                    onChange={(e) => setAreaSize(e.target.value)}
                    className="w-full accent-[#ea1d25] cursor-pointer h-2 bg-slate-200 rounded-lg transition-all"
                  />
                  <div className="flex justify-between text-[10px] text-slate-500 font-mono mt-1">
                    <span>1,000 sq ft</span>
                    <span>20,000 sq ft</span>
                    <span>40,000+ sq ft</span>
                  </div>
                </div>

                {/* Location & Options */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
                      3. Location in UAE
                    </label>
                    <select
                      value={location}
                      onChange={(e) => setLocation(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-200 text-slate-800 text-xs rounded-xl p-3 focus:outline-none focus:border-sky-400 focus:bg-white transition-colors"
                    >
                      <option value="Dubai - DIP / Jebel Ali">Dubai - DIP / Jebel Ali</option>
                      <option value="Dubai - Jumeirah / Palm">Dubai - Jumeirah / Palm</option>
                      <option value="Dubai - Business Bay / Downtown">Dubai - Business Bay / Downtown</option>
                      <option value="Dubai - Deira / Al Qusais">Dubai - Deira / Al Qusais</option>
                      <option value="Dubai - Dubai South / Expo">Dubai - Dubai South / Expo</option>
                      <option value="Sharjah / Ajman">Sharjah / Ajman</option>
                      <option value="Abu Dhabi">Abu Dhabi</option>
                    </select>
                  </div>

                  <div className="space-y-2 pt-1">
                    <label className="flex items-center gap-2 text-xs text-slate-700 cursor-pointer transition-colors hover:text-slate-900">
                      <input
                        type="checkbox"
                        checked={needPermits}
                        onChange={(e) => setNeedPermits(e.target.checked)}
                        className="accent-[#ea1d25] w-4 h-4 rounded transition-transform active:scale-90"
                      />
                      <span>Include Dubai Municipality Permits</span>
                    </label>
                    <label className="flex items-center gap-2 text-xs text-slate-700 cursor-pointer transition-colors hover:text-slate-900">
                      <input
                        type="checkbox"
                        checked={includeRecycling}
                        onChange={(e) => setIncludeRecycling(e.target.checked)}
                        className="accent-[#00a4e4] w-4 h-4 rounded transition-transform active:scale-90"
                      />
                      <span>Apply Scrap Metal Value Credit</span>
                    </label>
                  </div>
                </div>

              </div>

              {/* Right Result Card */}
              <div className="lg:col-span-5">
                <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 shadow-md space-y-5 text-center sm:text-left card-hover-transition">
                  <div className="flex items-center justify-between pb-3 border-b border-slate-200">
                    <span className="text-xs font-bold uppercase tracking-wider text-slate-600">
                      Preliminary Scope Estimate
                    </span>
                    <span className="text-[10px] text-[#00a4e4] font-mono font-bold px-2 py-0.5 rounded bg-sky-50 border border-sky-200">
                      BALLPARK
                    </span>
                  </div>

                  <div>
                    <div className="text-xs text-slate-500 mb-1">Estimated Budget Range</div>
                    <div className="text-2xl sm:text-3xl font-black font-heading text-slate-900 transition-all duration-200">
                      AED {(Math.round(finalEst * 0.9)).toLocaleString()} – {(Math.round(finalEst * 1.15)).toLocaleString()}
                    </div>
                    <div className="text-[11px] text-slate-500 mt-0.5">
                      Includes machine mobilization, certified operators & waste disposal.
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3 pt-2">
                    <div className="p-2.5 rounded-lg bg-white border border-slate-200 shadow-sm">
                      <div className="text-[10px] text-slate-500">Estimated Duration</div>
                      <div className="text-sm font-bold text-sky-700 font-mono">
                        ~{estimatedDays} Working Days
                      </div>
                    </div>
                    <div className="p-2.5 rounded-lg bg-white border border-slate-200 shadow-sm">
                      <div className="text-[10px] text-slate-500">Permit Handling</div>
                      <div className="text-sm font-bold text-slate-900">
                        {needPermits ? 'Included (100%)' : 'Client Provided'}
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={handleApply}
                    className="w-full py-3.5 px-4 text-xs font-bold uppercase tracking-wider text-white bg-gradient-to-r from-[#ea1d25] to-[#c41219] hover:from-[#ff2d35] hover:to-[#ea1d25] rounded-xl shadow-md flex items-center justify-center gap-2 transition-all duration-300 transform hover:-translate-y-0.5 border border-red-500/40 active:scale-[0.98]"
                  >
                    <span>Lock In Quote With These Details</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>

                  <p className="text-[10px] text-slate-500 text-center leading-tight">
                    * Final pricing is confirmed after our structural engineer completes a complimentary on-site physical survey.
                  </p>
                </div>
              </div>

            </div>

          </div>
        </Reveal>

      </div>
    </section>
  );
}
