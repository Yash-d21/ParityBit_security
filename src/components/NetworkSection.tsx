import { InfiniteSlider } from './ui/infinite-slider';
import { ProgressiveBlur } from './ui/progressive-blur';

const networkLogos = [
  {
    id: "northforge",
    name: "North Forge",
    image: "/northforge-logo.png",
  },
  {
    id: "chamber",
    name: "Winnipeg Chamber",
    image: "/chamber-logo.png",
  },
];

export function NetworkSection() {
  return (
    <section className="relative z-20 pt-24 pb-32 bg-black/40 overflow-hidden">
      {/* Bottom fade-out gradient */}
      <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-[#050505] to-transparent pointer-events-none z-10" />
      <div className="max-w-[1400px] mx-auto px-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-12">
          <div className="max-w-md text-center md:text-left shrink-0">
            <h2 className="text-xs font-bold tracking-[0.2em] text-[#8A2BE2] uppercase mb-4">Our Network</h2>
            <p className="text-xl font-semibold tracking-tight text-white/90">
              Proud members of Winnipeg's leading business and innovation networks.
            </p>
          </div>

          <div className='relative h-[100px] flex-1 w-full overflow-hidden'>
            <InfiniteSlider 
              className='flex h-full w-full items-center' 
              duration={30}
              gap={48}
            >
              {networkLogos.map((logo) => (
                <div 
                  key={logo.id} 
                  className='flex w-48 items-center justify-center group'
                >
                  {logo.image ? (
                    <img
                      src={logo.image}
                      alt={logo.name}
                      className="h-8 md:h-10 w-auto object-contain brightness-0 invert opacity-40 group-hover:opacity-100 transition-all duration-500"
                    />
                  ) : (
                    <div className="flex items-center gap-2">
                       <div className="w-1 h-1 rounded-full bg-[#8A2BE2]" />
                       <span className="text-[10px] font-bold tracking-widest uppercase text-white/20 group-hover:text-white/40 transition-colors">{logo.name}</span>
                    </div >
                  )}
                </div>
              ))}
            </InfiniteSlider>
            
            <ProgressiveBlur
              className='pointer-events-none absolute top-0 left-0 h-full w-[100px] z-10'
              direction='left'
              blurIntensity={1}
            />
            <ProgressiveBlur
              className='pointer-events-none absolute top-0 right-0 h-full w-[100px] z-10'
              direction='right'
              blurIntensity={1}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
