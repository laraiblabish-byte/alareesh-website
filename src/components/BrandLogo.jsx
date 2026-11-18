export default function BrandLogo({ size = 'md', showText = true, isDark = false }) {
  const sizeClasses = {
    sm: 'h-8 w-8 sm:h-9 sm:w-9',
    md: 'h-10 w-10 sm:h-11 sm:w-11',
    lg: 'h-12 w-12 sm:h-14 sm:w-14',
    xl: 'h-14 w-14 sm:h-16 sm:w-16'
  };

  return (
    <div className="flex items-center gap-2.5 group">
      {/* Real AAD Logo Globe Emblem (Circular, Round & Balanced) */}
      <div className="relative flex items-center justify-center p-0.5 bg-white rounded-full border border-slate-200/90 shadow-xs group-hover:border-red-500/50 group-hover:shadow-md transition-all duration-300">
        <img
          src="/logo.png"
          alt="Al Areesh Wrecking & Demolition Works LLC Logo (AAD)"
          className={`${sizeClasses[size] || sizeClasses.md} aspect-square object-contain rounded-full`}
        />
      </div>

      {showText && (
        <div className="flex flex-col">
          <div className="flex items-center gap-1.5">
            <span className={`font-heading font-black text-base sm:text-lg tracking-tight ${isDark ? 'text-white' : 'text-slate-900'} group-hover:text-[#ea1d25] transition-colors uppercase leading-none`}>
              Al Areesh
            </span>
            <span className="text-[9px] bg-[#ea1d25] text-white px-1.5 py-0.5 rounded font-black tracking-wider uppercase">
              AAD
            </span>
          </div>
          <span className={`text-[10px] sm:text-[10.5px] ${isDark ? 'text-slate-400' : 'text-slate-500'} font-semibold tracking-tight uppercase mt-0.5 leading-tight`}>
            Wrecking & Demolition Works LLC
          </span>
        </div>
      )}
    </div>
  );
}
