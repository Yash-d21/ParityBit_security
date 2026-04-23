import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useSpring, useInView } from 'motion/react';
import { Shield, BrainCircuit, Activity, Box, Database, Radar } from 'lucide-react';
import { BinaryBackground } from './components/BinaryBackground';
import { ServicesSection } from './components/ServicesSection';
import { ProductsSection } from './components/ProductsSection';
import { Testimonials } from './components/ui/unique-testimonial';
import { ParityHero } from './components/ui/parity-hero';
import { NetworkSection } from './components/NetworkSection';
import { AboutSection } from './components/AboutSection';
import { CinematicFooter } from './components/ui/motion-footer';
import { SupportSection } from './components/SupportSection';

const MainContent = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });
  
  return (
    <div className="bg-[#050505] text-[#F5F5F7] selection:bg-[#8A2BE2]/30 font-sans min-h-screen relative flex flex-col" ref={containerRef}>
      
      {/* Absolute Ambient Backgrounds */}
      <div className="fixed top-[-10%] left-[-10%] w-[60%] h-[60%] bg-[#8A2BE2] opacity-10 blur-[120px] rounded-full pointer-events-none z-0"></div>
      <div className="fixed bottom-[-5%] right-[5%] w-[40%] h-[50%] bg-[#4B0082] opacity-10 blur-[120px] rounded-full pointer-events-none z-0"></div>
      
      {/* Binary Matrix Background */}
      <BinaryBackground />

      <ParityHero />

      <NetworkSection />

      <ServicesSection />
      
      <ProductsSection />

      {/* Testimonials */}
      <section className="relative z-20 py-48 md:py-64 px-6 md:px-12 bg-transparent">
        <div className="max-w-[1400px] mx-auto">
          <div className="mb-12 text-center">
            <h2 className="text-xs font-bold tracking-[0.2em] text-[#8A2BE2] uppercase mb-4">What clients say</h2>
            <p className="text-3xl md:text-5xl font-bold tracking-tighter">Trusted by security teams <span className="text-gray-600">worldwide</span></p>
          </div>
          <Testimonials />
        </div>
      </section>

      <AboutSection />

      {/* Blog Section */}
      <section className="relative z-20 py-48 md:py-64 px-6 md:px-12 bg-transparent border-t border-white/5">
        <div className="max-w-[1400px] mx-auto">
          <div className="mb-16 flex flex-col md:flex-row md:items-end justify-between gap-8">
            <div>
              <h2 className="text-xs font-bold tracking-[0.2em] text-[#8A2BE2] uppercase mb-4">From the Blog</h2>
              <p className="text-3xl md:text-5xl font-bold tracking-tighter">Latest <span className="text-gray-600">Insights</span></p>
            </div>
            <button className="text-[10px] font-bold tracking-[0.2em] uppercase hover:text-[#8A2BE2] transition-colors border-b border-[#8A2BE2] pb-1">View all posts</button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <BlogCard 
              category="Threat Intelligence" 
              title="149 Million Passwords Exposed: 48-Hour Action Plan for CISOs and Executives" 
              readTime="5 min read" 
            />
            <BlogCard 
              category="Threat Intelligence" 
              title="The Email That Exposed 750,000 Manitobans: Inside CIRO's Phishing Crisis" 
              readTime="6 min read" 
            />
            <BlogCard 
              category="Threat Intelligence" 
              title="Advanced Threat Detection Techniques in 2025" 
              readTime="2 min read" 
            />
          </div>
        </div>
      </section>

      {/* Support & FAQ */}
      <SupportSection />

      {/* Cinematic Footer */}
      <CinematicFooter />
    </div>
  );
};

interface BentoCardProps {
  title: string;
  desc: string;
  label: string;
  className?: string;
  highlight?: boolean;
  icon?: React.ReactNode;
  extra?: React.ReactNode;
}

const BentoCard = ({ title, desc, label, className = "", highlight, icon, extra }: BentoCardProps) => {
  const cardRef = useRef(null);
  const isInView = useInView(cardRef, { once: true, margin: "-50px" });

  return (
    <motion.div 
      ref={cardRef}
      initial={{ opacity: 0, y: 50, scale: 0.98 }}
      animate={isInView ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 50, scale: 0.98 }}
      transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
      whileHover={{ y: -8, scale: 1.01, transition: { duration: 0.4, ease: "easeOut" } }}
      className={`group p-8 md:p-12 rounded-[2.5rem] backdrop-blur-xl transition-colors duration-700 hover:bg-white/[0.08] tracking-wide flex flex-col justify-between ${
        highlight 
          ? 'bg-[#111] border border-white/10 ring-1 ring-[#8A2BE2]/10' 
          : 'bg-[#0a0a0a] border border-white/5'
      } relative overflow-hidden ${className}`}
    >
      {/* Decorative gradient blob inside card */}
      {highlight && (
        <div className="absolute top-0 right-0 w-64 h-64 bg-[#8A2BE2]/5 rounded-full blur-[80px] -translate-y-1/2 translate-x-1/2 pointer-events-none transition-all duration-700 group-hover:bg-[#8A2BE2]/10" />
      )}

      <div>
        <div className="flex justify-between items-start mb-12">
          <div className="text-[10px] font-bold tracking-widest text-[#8A2BE2] uppercase border border-[#8A2BE2]/20 px-3 py-1 rounded-full">{label}</div>
          {icon && <div className="hidden md:block transition-transform duration-500 group-hover:scale-110 group-hover:text-white">{icon}</div>}
        </div>
      </div>
      
      <div className="relative z-10 mt-auto">
        <h3 className={`text-2xl font-bold tracking-tight mb-4 ${highlight ? 'text-white' : 'text-gray-200'}`}>{title}</h3>
        <p className={`text-sm leading-relaxed ${highlight ? 'text-gray-400' : 'text-gray-500'}`}>{desc}</p>
        {extra && extra}
      </div>
    </motion.div>
  );
};

// Sub-components

const TestimonialCard = ({ text, author, role, initials }: { text: string, author: string, role: string, initials: string }) => (
  <div className="p-8 rounded-2xl bg-[#0a0a0a] border border-white/5 flex flex-col justify-between hover:bg-white/[0.03] transition-colors">
    <p className="text-gray-400 text-sm leading-relaxed mb-8">"{text}"</p>
    <div className="flex items-center gap-4">
      <div className="w-10 h-10 rounded-full bg-[#8A2BE2]/20 text-[#8A2BE2] flex items-center justify-center text-xs font-bold font-mono">
        {initials}
      </div>
      <div>
        <p className="text-white text-sm font-semibold">{author}</p>
        <p className="text-gray-500 text-xs">{role}</p>
      </div>
    </div>
  </div>
);



const BlogCard = ({ category, title, readTime }: { category: string, title: string, readTime: string }) => (
  <div className="group cursor-pointer">
    <div className="h-48 w-full bg-[#0a0a0a] border border-white/5 rounded-2xl mb-6 overflow-hidden relative">
       {/* Fake image placeholder with subtle gradient */}
       <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent group-hover:scale-105 transition-transform duration-700"></div>
    </div>
    <div className="text-[10px] font-bold tracking-[0.2em] text-[#8A2BE2] uppercase mb-3">{category}</div>
    <h4 className="text-xl font-bold text-gray-200 group-hover:text-white transition-colors mb-4 line-clamp-2 leading-tight">{title}</h4>
    <p className="text-xs text-gray-500">{readTime}</p>
  </div>
);

export default MainContent;
