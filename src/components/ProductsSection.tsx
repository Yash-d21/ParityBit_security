import React, { useState, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useTransform, useSpring, useMotionValueEvent } from 'motion/react';
import { ArrowRight, CheckCircle2, ChevronRight, Package } from 'lucide-react';

const products = [
  {
    id: "01",
    name: "ThreatAtlas",
    title: "ThreatAtlas™ Platform",
    description: "Advanced threat intelligence platform combining global threat feeds, machine learning analytics, and real-time IOC correlation for proactive threat detection and response.",
    features: [
      "Global Threat Feeds",
      "ML-Powered Analytics",
      "IOC Correlation",
      "Threat Attribution",
      "Automated Response",
      "Executive Briefings"
    ],
    image: "/threatintel.jpg",
    color: "#8A2BE2"
  },
  {
    id: "02",
    name: "VECTOR - AI Powered SIEM",
    title: "VECTOR SIEM",
    description: "Next-generation AI-powered Security Information and Event Management platform with intelligent threat detection, automated response, and comprehensive security analytics.",
    features: [
      "AI Threat Detection",
      "Automated Response",
      "Real-time Analytics",
      "Threat Intelligence",
      "Compliance Reporting",
      "Advanced SOAR"
    ],
    image: "/siem.png",
    color: "#4B0082"
  },
  {
    id: "03",
    name: "PhishGuard Enterprise",
    title: "PhishGuard Email Security",
    description: "Next-generation email security platform using advanced AI/ML algorithms to detect and block sophisticated phishing, BEC attacks, and zero-day email threats.",
    features: [
      "AI-Powered Detection",
      "BEC Protection",
      "URL Sandboxing",
      "Email Encryption",
      "User Training",
      "Incident Analytics"
    ],
    image: "/phishzipper.png",
    color: "#9370DB"
  },
  {
    id: "04",
    name: "Parity OS",
    title: "Parity Secure OS",
    description: "Military-grade hardened operating system with integrated security controls, application whitelisting, and advanced endpoint protection for critical infrastructure.",
    features: [
      "Military-Grade Hardening",
      "Application Whitelisting",
      "Endpoint Protection",
      "Secure Boot Chain",
      "Data Encryption",
      "Compliance Controls"
    ],
    image: "/image.png",
    color: "#7B68EE"
  }
];

export const ProductsSection = () => {
  const [activeId, setActiveId] = useState<string>(products[0].id);
  const activeProduct = products.find(p => p.id === activeId)!;

  // Scroll Animations
  const containerRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 35,
    restDelta: 0.001
  });

  const lidRotateX = useTransform(
    smoothProgress,
    [0, 0.10, 0.92, 1],
    [-98, 0, 0, -98]
  );

  const baseRotateX = useTransform(
    smoothProgress,
    [0, 0.10, 0.92, 1],
    [25, 0, 0, 25]
  );

  const laptopScale = useTransform(
    smoothProgress,
    [0, 0.10, 0.92, 1],
    [0.85, 1, 1, 0.85]
  );

  const screenOpacity = useTransform(
    smoothProgress,
    [0, 0.08, 0.93, 1],
    [0, 1, 1, 0]
  );

  // Automatically advance products based on scroll progress
  useMotionValueEvent(smoothProgress, "change", (latest) => {
    if (latest < 0.3) {
      if (activeId !== products[0].id) setActiveId(products[0].id);
    } else if (latest < 0.5) {
      if (activeId !== products[1].id) setActiveId(products[1].id);
    } else if (latest < 0.7) {
      if (activeId !== products[2].id) setActiveId(products[2].id);
    } else {
      if (activeId !== products[3].id) setActiveId(products[3].id);
    }
  });

  return (
    <section ref={containerRef} id="products" className="relative z-20 h-[400vh] w-full">
      <div className="sticky top-0 h-screen w-full flex flex-col items-center justify-center px-4 overflow-hidden">

        <div className="mb-4 md:mb-6 text-center max-w-2xl mx-auto z-50 px-6">
          <h2 className="text-[10px] font-bold tracking-[0.4em] uppercase text-[#8A2BE2] mb-2">OUR PRODUCTS</h2>
          <h3 className="text-2xl md:text-3xl font-bold tracking-tighter text-white">
            Advanced security solutions <span className="text-gray-600">powered by cutting-edge technology</span>
          </h3>
        </div>

        {/* 3D Scene Container */}
        <div className="w-full max-w-[800px] flex flex-col items-center perspective-[2500px]">

          {/* Entire Laptop Group */}
          <motion.div
            style={{
              rotateX: baseRotateX,
              scale: laptopScale,
              transformStyle: 'preserve-3d'
            }}
            className="w-full flex flex-col items-center relative"
          >

            {/* Laptop Lid/Screen */}
            <motion.div
              style={{
                rotateX: lidRotateX,
                transformOrigin: 'bottom',
                transformStyle: 'preserve-3d'
              }}
              className="w-full aspect-[16/10] relative z-10"
            >
              {/* Front Face - The Screen */}
              <div className="absolute inset-0 bg-[#050505] rounded-t-3xl rounded-b-sm border-[8px] md:border-[12px] border-[#181818] shadow-[0_0_60px_rgba(0,0,0,1)] flex flex-col overflow-hidden ring-1 ring-white/10" style={{ backfaceVisibility: 'hidden' }}>

                {/* Camera Notch */}
                <div className="absolute top-1 md:top-2 left-1/2 -translate-x-1/2 w-3 h-3 rounded-full bg-[#050505] ring-1 ring-white/5 flex items-center justify-center z-50">
                  <div className="w-1 h-1 rounded-full bg-blue-900/50" />
                </div>

                {/* Screen Content - Product Showcase */}
                <motion.div style={{ opacity: screenOpacity }} className="flex-1 m-1 md:m-2 bg-[#0a0a0a] rounded-lg border border-white/10 flex flex-col overflow-hidden relative">

                  {/* Window Header */}
                  <div className="h-8 md:h-10 bg-[#111]/80 backdrop-blur-md border-b border-white/10 flex items-center px-4 gap-2 shrink-0 relative z-10">
                    <div className="w-2.5 h-2.5 md:w-3 md:h-3 rounded-full bg-[#FF5F56]" />
                    <div className="w-2.5 h-2.5 md:w-3 md:h-3 rounded-full bg-[#FFBD2E]" />
                    <div className="w-2.5 h-2.5 md:w-3 md:h-3 rounded-full bg-[#27C93F]" />
                    <div className="mx-auto flex items-center gap-2 text-[10px] md:text-xs text-gray-400">
                      <Package size={12} />
                      <span>ParityBit — Product Suite</span>
                    </div>
                  </div>

                  {/* Split Layout */}
                  <div className="flex-1 flex overflow-hidden relative z-10">

                    {/* Left Sidebar - Product List */}
                    <div className="w-[35%] md:w-[30%] bg-black/40 border-r border-white/10 flex flex-col shrink-0">
                      <div className="p-3 border-b border-white/5 text-[9px] md:text-[10px] text-gray-500 font-bold tracking-widest uppercase">
                        Product Suite
                      </div>
                      <div className="flex-1 overflow-y-auto p-2 space-y-1">
                        {products.map(p => (
                          <button
                            key={p.id}
                            onClick={() => setActiveId(p.id)}
                            className={`w-full text-left flex items-center gap-2 px-3 py-2.5 rounded-md transition-all text-[10px] md:text-xs ${
                              activeId === p.id
                                ? 'bg-[#8A2BE2]/20 text-white shadow-[inset_2px_0_0_#8A2BE2]'
                                : 'text-gray-500 hover:text-gray-300 hover:bg-white/5'
                            }`}
                          >
                            <ChevronRight size={12} className={activeId === p.id ? 'opacity-100 text-[#8A2BE2]' : 'opacity-0'} />
                            <span className="truncate">{p.name}</span>
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Right Pane - Product Detail */}
                    <div className="flex-1 bg-black/60 overflow-y-auto relative">
                      <AnimatePresence mode="wait">
                        <motion.div
                          key={activeId}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -10 }}
                          transition={{ duration: 0.2 }}
                          className="flex flex-col h-full"
                        >
                          {/* Product Image */}
                          <div className="relative w-full h-[40%] shrink-0 overflow-hidden">
                            <img 
                              src={activeProduct.image} 
                              alt={activeProduct.name} 
                              className="w-full h-full object-cover"
                            />
                            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#0a0a0a]" />
                            <div className="absolute bottom-3 left-4 md:left-6">
                              <span className="text-[9px] md:text-[10px] font-bold tracking-widest uppercase px-2 py-0.5 rounded bg-[#8A2BE2]/20 text-[#8A2BE2] border border-[#8A2BE2]/30">{activeProduct.id}</span>
                            </div>
                          </div>

                          {/* Product Info */}
                          <div className="p-4 md:p-6 flex-1">
                            <h2 className="text-sm md:text-lg text-white font-bold mb-1 leading-tight">{activeProduct.title}</h2>
                            <p className="text-[10px] md:text-xs text-gray-400 mb-4 leading-relaxed line-clamp-2">
                              {activeProduct.description}
                            </p>

                            <div className="text-[9px] md:text-[10px] text-gray-500 mb-2 tracking-widest border-b border-white/10 pb-1.5">
                              KEY CAPABILITIES:
                            </div>
                            <div className="grid grid-cols-2 gap-x-4 gap-y-1.5">
                              {activeProduct.features.map((f, i) => (
                                <motion.div
                                  key={i}
                                  initial={{ opacity: 0, x: -10 }}
                                  animate={{ opacity: 1, x: 0 }}
                                  transition={{ delay: 0.05 + (i * 0.04) }}
                                  className="flex items-center gap-2 text-[10px] md:text-xs"
                                >
                                  <CheckCircle2 className="w-3 h-3 text-[#8A2BE2] shrink-0" />
                                  <span className="text-gray-300">{f}</span>
                                </motion.div>
                              ))}
                            </div>
                          </div>
                        </motion.div>
                      </AnimatePresence>
                    </div>

                  </div>
                </motion.div>
              </div>

              {/* Back Face */}
              <div
                className="absolute inset-0 bg-gradient-to-b from-[#111] to-[#0a0a0a] rounded-t-3xl rounded-b-sm border-[2px] border-[#333] flex items-center justify-center"
                style={{ transform: 'rotateX(180deg) translateZ(1px)', backfaceVisibility: 'hidden' }}
              >
                <div className="w-24 h-24 rounded-full bg-white/5 flex items-center justify-center border border-white/10 shadow-[0_0_30px_rgba(255,255,255,0.05)]">
                  <span className="text-white/20 font-black text-3xl tracking-tighter">PB</span>
                </div>
              </div>

            </motion.div>

            {/* Laptop Base */}
            <div className="w-[110%] md:w-[115%] h-6 md:h-8 bg-gradient-to-b from-[#2a2a2a] to-[#050505] rounded-b-2xl rounded-t-sm shadow-[0_30px_60px_rgba(0,0,0,1)] relative flex justify-center border-t border-[#444] z-20 -mt-1">
              <div className="w-24 md:w-32 h-1.5 md:h-2 bg-[#111] rounded-b-md absolute top-0 shadow-[inset_0_2px_4px_rgba(0,0,0,0.5)]" />
            </div>
          </motion.div>
        </div>

      </div>
    </section>
  );
};
