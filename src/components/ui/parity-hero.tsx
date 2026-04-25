import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarTrigger,
  MenubarSeparator,
} from "./menubar";
import { Shield, Box, Target, FileText, Mail, ChevronRight, Zap, Eye, Lock, ArrowRight, Menu, X } from "lucide-react";
import { useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "motion/react";

/* ---------------- WordsPullUp ---------------- */
interface WordsPullUpProps {
  text: string;
  className?: string;
  showAsterisk?: boolean;
  style?: React.CSSProperties;
}

export const WordsPullUp = ({ text, className = "", showAsterisk = false, style }: WordsPullUpProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true });
  const words = text.split(" ");

  return (
    <div ref={ref} className={`inline-flex flex-wrap ${className}`} style={style}>
      {words.map((word, i) => {
        const isLast = i === words.length - 1;
        return (
          <motion.span
            key={i}
            initial={{ y: 20, opacity: 0 }}
            animate={isInView ? { y: 0, opacity: 1 } : {}}
            transition={{ duration: 0.6, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] }}
            className="inline-block relative"
            style={{ marginRight: isLast ? 0 : "0.25em" }}
          >
            {word}
            {showAsterisk && isLast && (
              <span className="absolute top-[0.65em] -right-[0.3em] text-[0.31em] text-[#8A2BE2]">*</span>
            )}
          </motion.span>
        );
      })}
    </div>
  );
};

/* ---------------- ParityHero ---------------- */

export const ParityHero = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <section className="h-screen w-full relative z-20 p-2 md:p-4">
      <div className="relative h-[95vh] w-full overflow-hidden rounded-2xl md:rounded-[2rem] border border-white/[0.05] shadow-[0_8px_32px_0_rgba(0,0,0,0.5)] bg-black/20 backdrop-blur-sm mt-4 md:mt-6">
        
        {/* Background Video */}
        <video 
          autoPlay 
          loop 
          muted 
          playsInline 
          className="absolute inset-0 w-full h-full object-cover z-0 opacity-40"
        >
          <source src="/bg.mp4" type="video/mp4" />
        </video>

        {/* Gradient overlays for cinematic feel */}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/90 z-10" />
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,rgba(138,43,226,0.15)_0%,transparent_60%)] z-10" />

        {/* Navbar (Header Thing) */}
        <nav className="absolute left-1/2 top-0 z-50 -translate-x-1/2 w-[95vw] md:w-auto mt-2 md:mt-0">
          <div className="mx-auto flex items-center justify-between md:justify-center rounded-2xl md:rounded-b-3xl md:rounded-t-none bg-black/40 backdrop-blur-xl border border-white/10 md:border-t-0 px-4 py-3 sm:px-6 md:px-8 shadow-[0_8px_32px_0_rgba(0,0,0,0.5)]">
            
            {/* Logo */}
            <div className="flex items-center justify-center md:pr-6 md:border-r border-white/10 md:mr-4">
              <img src="/paritybit-logo.png" alt="ParityBit" className="h-7 md:h-10 object-contain" />
            </div>

            {/* Mobile Hamburger Toggle */}
            <button 
              className="md:hidden text-white/70 hover:text-white p-1"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>

            {/* Desktop Menu */}
            <div className="hidden md:block">
              <Menubar className="border-none bg-transparent shadow-none p-0 h-auto">

            {/* Our Products */}
            <MenubarMenu>
              <MenubarTrigger className="flex items-center gap-2 cursor-pointer text-white/60 hover:text-white data-[state=open]:text-white data-[state=open]:bg-white/10 px-4 py-2 rounded-full transition-all text-xs sm:text-sm font-medium">
                Our Products
              </MenubarTrigger>
              <MenubarContent className="bg-[#111]/90 backdrop-blur-2xl border border-white/10 shadow-2xl rounded-xl min-w-[200px] p-2">
                <MenubarItem className="flex items-center gap-3 cursor-pointer text-white/70 hover:text-white hover:bg-white/10 focus:bg-white/10 focus:text-white rounded-lg px-3 py-2 transition-colors">
                  <Shield className="w-4 h-4 text-[#8A2BE2]" />
                  ThreatAtlas
                </MenubarItem>
                <MenubarItem className="flex items-center gap-3 cursor-pointer text-white/70 hover:text-white hover:bg-white/10 focus:bg-white/10 focus:text-white rounded-lg px-3 py-2 transition-colors">
                  <Zap className="w-4 h-4 text-[#8A2BE2]" />
                  VECTOR SIEM
                </MenubarItem>
                <MenubarItem className="flex items-center gap-3 cursor-pointer text-white/70 hover:text-white hover:bg-white/10 focus:bg-white/10 focus:text-white rounded-lg px-3 py-2 transition-colors">
                  <Eye className="w-4 h-4 text-[#8A2BE2]" />
                  PhishGuard
                </MenubarItem>
                <MenubarSeparator className="bg-white/10 my-1" />
                <MenubarItem className="flex items-center gap-3 cursor-pointer text-white/70 hover:text-white hover:bg-white/10 focus:bg-white/10 focus:text-white rounded-lg px-3 py-2 transition-colors">
                  <Lock className="w-4 h-4 text-[#8A2BE2]" />
                  Parity OS
                </MenubarItem>
              </MenubarContent>
            </MenubarMenu>

            {/* Modules */}
            <MenubarMenu>
              <MenubarTrigger className="flex items-center gap-2 cursor-pointer text-white/60 hover:text-white data-[state=open]:text-white data-[state=open]:bg-white/10 px-4 py-2 rounded-full transition-all text-xs sm:text-sm font-medium">
                Modules
              </MenubarTrigger>
              <MenubarContent className="bg-[#111]/90 backdrop-blur-2xl border border-white/10 shadow-2xl rounded-xl min-w-[200px] p-2">
                <MenubarItem className="flex items-center gap-3 cursor-pointer text-white/70 hover:text-white hover:bg-white/10 focus:bg-white/10 focus:text-white rounded-lg px-3 py-2 transition-colors">
                  <Box className="w-4 h-4" />
                  Penetration Testing
                </MenubarItem>
                <MenubarItem className="flex items-center gap-3 cursor-pointer text-white/70 hover:text-white hover:bg-white/10 focus:bg-white/10 focus:text-white rounded-lg px-3 py-2 transition-colors">
                  <Target className="w-4 h-4" />
                  Incident Response
                </MenubarItem>
              </MenubarContent>
            </MenubarMenu>

            {/* Methodology */}
            <MenubarMenu>
              <MenubarTrigger className="flex items-center gap-2 cursor-pointer text-white/60 hover:text-white data-[state=open]:text-white data-[state=open]:bg-white/10 px-4 py-2 rounded-full transition-all text-xs sm:text-sm font-medium">
                Methodology
              </MenubarTrigger>
              <MenubarContent className="bg-[#111]/90 backdrop-blur-2xl border border-white/10 shadow-2xl rounded-xl min-w-[200px] p-2">
                <MenubarItem className="flex items-center gap-3 cursor-pointer text-white/70 hover:text-white hover:bg-white/10 focus:bg-white/10 focus:text-white rounded-lg px-3 py-2 transition-colors">
                  Offensive Security
                </MenubarItem>
                <MenubarItem className="flex items-center gap-3 cursor-pointer text-white/70 hover:text-white hover:bg-white/10 focus:bg-white/10 focus:text-white rounded-lg px-3 py-2 transition-colors">
                  Zero Trust Architecture
                </MenubarItem>
              </MenubarContent>
            </MenubarMenu>

            {/* Testimonials */}
            <MenubarMenu>
              <MenubarTrigger className="flex items-center gap-2 cursor-pointer text-white/60 hover:text-white data-[state=open]:text-white data-[state=open]:bg-white/10 px-4 py-2 rounded-full transition-all text-xs sm:text-sm font-medium">
                Testimonials
              </MenubarTrigger>
              <MenubarContent className="bg-[#111]/90 backdrop-blur-2xl border border-white/10 shadow-2xl rounded-xl min-w-[200px] p-2">
                <MenubarItem className="flex items-center gap-3 cursor-pointer text-white/70 hover:text-white hover:bg-white/10 focus:bg-white/10 focus:text-white rounded-lg px-3 py-2 transition-colors">
                  <FileText className="w-4 h-4" />
                  View Case Studies
                </MenubarItem>
              </MenubarContent>
            </MenubarMenu>

            {/* Contact */}
            <MenubarMenu>
              <MenubarTrigger className="flex items-center gap-2 cursor-pointer text-white/60 hover:text-white data-[state=open]:text-white data-[state=open]:bg-white/10 px-4 py-2 rounded-full transition-all text-xs sm:text-sm font-medium">
                Contact
              </MenubarTrigger>
              <MenubarContent className="bg-[#111]/90 backdrop-blur-2xl border border-white/10 shadow-2xl rounded-xl min-w-[200px] p-2">
                <MenubarItem className="flex items-center gap-3 cursor-pointer text-white/70 hover:text-white hover:bg-white/10 focus:bg-white/10 focus:text-white rounded-lg px-3 py-2 transition-colors">
                  <Mail className="w-4 h-4" />
                  Talk to Sales
                </MenubarItem>
              </MenubarContent>
            </MenubarMenu>

              </Menubar>
            </div>
          </div>

          {/* Mobile Menu Dropdown */}
          <AnimatePresence>
            {isMobileMenuOpen && (
              <motion.div 
                initial={{ opacity: 0, y: -10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -10, scale: 0.95 }}
                transition={{ duration: 0.2 }}
                className="md:hidden absolute top-full left-0 w-full mt-2 bg-[#0a0a0a]/95 backdrop-blur-3xl border border-white/10 rounded-2xl p-5 shadow-2xl flex flex-col gap-6 max-h-[70vh] overflow-y-auto"
              >
                <div className="flex flex-col gap-2">
                  <div className="text-[10px] font-bold text-[#8A2BE2] uppercase tracking-widest px-2 mb-1">Products</div>
                  <button className="text-left text-sm text-white/80 hover:text-white py-2 px-2 rounded-lg hover:bg-white/5 flex items-center gap-3 transition-colors">
                    <Shield className="w-4 h-4 text-[#8A2BE2]" /> ThreatAtlas
                  </button>
                  <button className="text-left text-sm text-white/80 hover:text-white py-2 px-2 rounded-lg hover:bg-white/5 flex items-center gap-3 transition-colors">
                    <Zap className="w-4 h-4 text-[#8A2BE2]" /> VECTOR SIEM
                  </button>
                  <button className="text-left text-sm text-white/80 hover:text-white py-2 px-2 rounded-lg hover:bg-white/5 flex items-center gap-3 transition-colors">
                    <Eye className="w-4 h-4 text-[#8A2BE2]" /> PhishGuard
                  </button>
                  <button className="text-left text-sm text-white/80 hover:text-white py-2 px-2 rounded-lg hover:bg-white/5 flex items-center gap-3 transition-colors">
                    <Lock className="w-4 h-4 text-[#8A2BE2]" /> Parity OS
                  </button>
                </div>

                <div className="flex flex-col gap-2">
                  <div className="text-[10px] font-bold text-[#8A2BE2] uppercase tracking-widest px-2 mb-1">Modules</div>
                  <button className="text-left text-sm text-white/80 hover:text-white py-2 px-2 rounded-lg hover:bg-white/5 flex items-center gap-3 transition-colors">
                    <Box className="w-4 h-4 text-gray-400" /> Penetration Testing
                  </button>
                  <button className="text-left text-sm text-white/80 hover:text-white py-2 px-2 rounded-lg hover:bg-white/5 flex items-center gap-3 transition-colors">
                    <Target className="w-4 h-4 text-gray-400" /> Incident Response
                  </button>
                </div>

                <div className="flex flex-col gap-2">
                  <div className="text-[10px] font-bold text-[#8A2BE2] uppercase tracking-widest px-2 mb-1">Company</div>
                  <button className="text-left text-sm text-white/80 hover:text-white py-2 px-2 rounded-lg hover:bg-white/5 flex items-center gap-3 transition-colors">
                    <FileText className="w-4 h-4 text-gray-400" /> View Case Studies
                  </button>
                  <button className="text-left text-sm text-white/80 hover:text-white py-2 px-2 rounded-lg hover:bg-white/5 flex items-center gap-3 transition-colors">
                    <Mail className="w-4 h-4 text-gray-400" /> Talk to Sales
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </nav>

        {/* Hero content */}
        <div className="absolute bottom-0 left-0 right-0 px-6 pb-8 sm:px-10 md:px-16 md:pb-16 z-20">
          <div className="grid grid-cols-12 items-end gap-6 md:gap-12">
            
            <div className="col-span-12 lg:col-span-7">
              <div className="text-[10px] md:text-xs font-bold tracking-[0.3em] uppercase text-[#8A2BE2] mb-4 flex items-center gap-4">
                <span className="w-8 h-[1px] bg-[#8A2BE2]"></span>
                System Online
              </div>
              <h1
                className="font-bold leading-[0.85] tracking-tighter text-[20vw] sm:text-[20vw] md:text-[18vw] lg:text-[14vw] xl:text-[12vw] text-white"
              >
                <WordsPullUp text="ParityBit" showAsterisk />
              </h1>
            </div>

            <div className="col-span-12 flex flex-col gap-6 pb-2 lg:col-span-5 lg:pb-6">
              
              <motion.p
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
                className="text-sm text-gray-400 sm:text-base md:text-lg font-light max-w-lg"
                style={{ lineHeight: 1.6 }}
              >
                Offensive security expertise engineered into defensive architecture. We are a network of cybersecurity practitioners bound by a mission to unlock absolute resilience through zero-day intelligence and AI-powered operations.
              </motion.p>

              <motion.button
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.7, ease: [0.16, 1, 0.3, 1] }}
                className="group inline-flex items-center gap-3 self-start rounded-full bg-[#8A2BE2] py-1.5 pl-6 pr-1.5 text-sm font-semibold text-white transition-all hover:bg-[#9d3df5] sm:text-base shadow-[0_0_20px_rgba(138,43,226,0.3)]"
              >
                Initialize Protocol
                <span className="flex h-8 w-8 sm:h-10 sm:w-10 items-center justify-center rounded-full bg-white transition-transform duration-300 group-hover:scale-105">
                  <ArrowRight className="h-4 w-4 sm:h-5 sm:w-5 text-[#8A2BE2]" />
                </span>
              </motion.button>

            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
