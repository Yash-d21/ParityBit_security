import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'motion/react';
import { Terminal, Shield, Target, Cpu, Globe, ChevronRight, ChevronLeft } from 'lucide-react';
import { cn } from '../lib/utils';

const roadmapStory = [
  {
    year: "2022",
    title: "The Genesis",
    subtitle: "Consulting in the trenches",
    description: "ParityBit started in the trenches. We spent our days working directly with organizations on security assessments, intense incident response, and training. We saw firsthand how legacy security tools failed the very teams trying to use them. They were noisy black boxes.",
    icon: Terminal
  },
  {
    year: "2023",
    title: "Building Trust",
    subtitle: "Expanding our offensive capabilities",
    description: "Our reputation grew. We expanded into deep penetration testing and specialized security training. We built unshakeable trust with enterprises and startups across multiple high-stakes sectors. But we knew we could do more than just consult on broken infrastructure.",
    icon: Shield
  },
  {
    year: "2024",
    title: "ParityBit Formalized",
    subtitle: "A shift in the mission",
    description: "We formalized the company with a clear, singular mission: stop consulting on broken systems and start building the proactive security tools we wished existed when we were on the front lines. The architectural foundation for our entire ecosystem was laid.",
    icon: Target
  },
  {
    year: "2025",
    title: "The Ecosystem Awakes",
    subtitle: "Shipping purpose-built tools",
    description: "We shipped ThreatAtlas for AI-powered threat intelligence, and VECTOR SIEM for next-generation security operations. They aren't wrappers around existing tools; they are built entirely from scratch by practitioners, to solve real problems we encountered firsthand.",
    icon: Cpu
  },
  {
    year: "2026",
    title: "Global Scale",
    subtitle: "Unlocking absolute resilience",
    description: "Today, we combine our hands-on offensive expertise with purpose-built defensive products. We are rapidly expanding our product suite and growing our team globally to serve organizations across international markets, staying permanently ahead of the threat curve.",
    icon: Globe
  }
];

export const AboutSection = () => {
  const targetRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start start", "end end"]
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  // Translates the container to the left as the user scrolls down
  // Translating by -75% ensures the final 2026 card fully enters the viewport.
  const x = useTransform(smoothProgress, [0, 1], ["0%", "-75%"]);

  return (
    <section ref={targetRef} className="relative z-20 h-[300vh]" id="company">
      <div className="sticky top-0 h-screen flex flex-col justify-center overflow-hidden bg-transparent">
        <div className="max-w-[1400px] mx-auto w-full px-4 md:px-12 pt-20">
          
          <div className="mb-12 md:mb-20 px-4 md:px-8">
            <h2 className="text-xs font-bold tracking-[0.2em] text-[#8A2BE2] uppercase mb-4">Our Journey</h2>
            <p className="text-3xl md:text-5xl font-bold tracking-tighter">
              The Roadmap to <br />
              <span className="text-gray-600">Absolute Resilience.</span>
            </p>
          </div>

          {/* Horizontal Scrolling Track */}
          <motion.div 
            style={{ x }} 
            className="flex gap-6 md:gap-8 px-4 md:px-8 w-max pb-12"
          >
            {roadmapStory.map((step, idx) => {
              const Icon = step.icon;
              return (
                <div 
                  key={step.year}
                  className="w-[85vw] md:w-[450px] shrink-0 bg-[#050505]/80 backdrop-blur-2xl border border-white/10 rounded-3xl p-8 md:p-10 flex flex-col relative overflow-hidden group hover:bg-white/[0.02] transition-colors duration-500 shadow-[0_8px_32px_0_rgba(0,0,0,0.3)]"
                >
                  {/* Background Accent */}
                  <div className="absolute -top-24 -right-24 w-48 h-48 bg-[#8A2BE2]/10 rounded-full blur-[60px] group-hover:bg-[#8A2BE2]/20 transition-colors duration-500 pointer-events-none" />
                  
                  <div className="flex items-start justify-between mb-12 relative z-10">
                    <div className="w-14 h-14 rounded-2xl bg-[#8A2BE2]/10 border border-[#8A2BE2]/20 flex items-center justify-center shadow-[inset_0_0_20px_rgba(138,43,226,0.2)]">
                      <Icon className="w-6 h-6 text-[#8A2BE2]" />
                    </div>
                    <span className="text-3xl font-black font-mono text-white/20 tracking-tighter">{step.year}</span>
                  </div>

                  <div className="relative z-10 mt-auto">
                    <h4 className="text-[10px] font-bold tracking-[0.2em] text-[#8A2BE2] uppercase mb-3">{step.subtitle}</h4>
                    <h3 className="text-2xl md:text-3xl font-bold mb-4 text-white tracking-tight leading-tight">
                      {step.title}
                    </h3>
                    <p className="text-gray-400 font-light text-sm leading-relaxed">
                      {step.description}
                    </p>
                  </div>
                  
                  {/* Visual Connector for desktop */}
                  {idx !== roadmapStory.length - 1 && (
                    <div className="hidden md:block absolute top-1/2 -right-8 w-8 h-[1px] bg-white/10" />
                  )}
                </div>
              );
            })}
          </motion.div>
        </div>
      </div>
    </section>
  );
};
