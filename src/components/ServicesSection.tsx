import React from 'react';
import { Shield, Mail, Fingerprint, FileCheck, Database, Cloud, ShieldAlert, Lock, BookOpen } from 'lucide-react';
import { DynamicFrameLayout } from './ui/dynamic-frame-layout';

/* ------------------------------------------------------------------ */
/*  CSS-only CRAZY Motion Graphic Backgrounds                         */
/* ------------------------------------------------------------------ */

const motionStyles = `
/* Global Grid Mixin */
.bg-grid-pattern {
  background-size: 40px 40px;
  background-image: linear-gradient(to right, rgba(255,255,255,0.05) 1px, transparent 1px),
                    linear-gradient(to bottom, rgba(255,255,255,0.05) 1px, transparent 1px);
}

/* VAPT - Radar */
@keyframes vapt-radar {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}
@keyframes vapt-ping {
  0% { transform: scale(0.5); opacity: 0.8; }
  100% { transform: scale(2); opacity: 0; }
}

/* Phishing - Cyber Lines */
@keyframes phishing-slide {
  0% { transform: translateY(-100%); opacity: 0; }
  50% { opacity: 1; }
  100% { transform: translateY(100%); opacity: 0; }
}
@keyframes phishing-shake {
  0%, 100% { transform: translateX(0); }
  25% { transform: translateX(-4px) rotate(-2deg); }
  75% { transform: translateX(4px) rotate(2deg); }
}

/* Dark Web - Matrix */
@keyframes matrix-rain {
  0% { transform: translateY(-100%); opacity: 0; }
  10% { opacity: 1; }
  90% { opacity: 1; }
  100% { transform: translateY(100%); opacity: 0; }
}

/* Compliance - Atom */
@keyframes atom-orbit-1 {
  0% { transform: rotate3d(1, 1, 0, 0deg); }
  100% { transform: rotate3d(1, 1, 0, 360deg); }
}
@keyframes atom-orbit-2 {
  0% { transform: rotate3d(-1, 1, 0, 0deg); }
  100% { transform: rotate3d(-1, 1, 0, 360deg); }
}
@keyframes atom-orbit-3 {
  0% { transform: rotate3d(0, 1, 1, 0deg); }
  100% { transform: rotate3d(0, 1, 1, 360deg); }
}

/* Network - Hex Pulse */
@keyframes hex-pulse {
  0%, 100% { stroke-width: 0.5; opacity: 0.2; transform: scale(1); }
  50% { stroke-width: 2; opacity: 0.8; transform: scale(1.1); stroke: #F97316; }
}

/* Cloud - Galaxy Swirl */
@keyframes galaxy-swirl {
  0% { transform: rotate(0deg) scale(1); }
  50% { transform: rotate(180deg) scale(1.5); }
  100% { transform: rotate(360deg) scale(1); }
}

/* Email - Wave Barrier */
@keyframes wave-barrier {
  0% { transform: translateX(-100%) skewX(-15deg); }
  100% { transform: translateX(100%) skewX(-15deg); }
}

/* Patch - Gears */
@keyframes gear-spin {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}
@keyframes gear-spin-reverse {
  from { transform: rotate(0deg); }
  to { transform: rotate(-360deg); }
}

/* Policy - Fractured Diamonds */
@keyframes diamond-float {
  0%, 100% { transform: translateY(0) rotate(45deg) scale(1); }
  50% { transform: translateY(-20px) rotate(90deg) scale(1.2); }
}
@keyframes diamond-shatter {
  0% { transform: rotate(45deg) scale(1); opacity: 1; }
  100% { transform: rotate(180deg) scale(2); opacity: 0; filter: blur(4px); }
}

/* Hover Icon Bounce */
.hover-bounce {
  transition: transform 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
}
.active-pulse {
  animation: vapt-ping 1s cubic-bezier(0, 0, 0.2, 1) infinite;
}
`;

/* ------------------------------------------------------------------ */
/*  Tile Components                                                   */
/* ------------------------------------------------------------------ */

const TileContent = ({ 
  icon: Icon, 
  title, 
  subtitle, 
  details, 
  colorStr, 
  isHovered, 
  isActive 
}: { 
  icon: any, title: string, subtitle: string, details: string, colorStr: string, isHovered: boolean, isActive: boolean 
}) => (
  <div className="relative z-20 flex flex-col items-center justify-center h-full px-4 text-center">
    <div className="relative mb-3 md:mb-4">
      {isActive && (
        <div className="absolute inset-0 rounded-full active-pulse" style={{ backgroundColor: colorStr }} />
      )}
      <Icon 
        className={`w-8 h-8 md:w-10 md:h-10 hover-bounce relative z-10 ${isActive ? 'scale-125' : isHovered ? 'scale-110' : ''}`} 
        style={{ color: colorStr, filter: (isActive || isHovered) ? `drop-shadow(0 0 10px ${colorStr})` : 'none' }} 
      />
    </div>
    
    <h3 className={`text-white font-bold tracking-tight transition-all duration-300 ${isActive ? 'text-xl md:text-2xl mb-2' : 'text-sm md:text-base'}`}>
      {title}
    </h3>
    
    {!isActive && (
      <p className="text-gray-400 text-[10px] md:text-xs mt-1 leading-tight max-w-[120px] transition-opacity duration-300">
        {subtitle}
      </p>
    )}

    <div className={`overflow-hidden transition-all duration-500 ease-in-out ${isActive ? 'max-h-[200px] opacity-100 mt-4' : 'max-h-0 opacity-0'}`}>
      <p className="text-gray-300 text-xs md:text-sm leading-relaxed max-w-sm mx-auto border-t border-white/10 pt-4">
        {details}
      </p>
      <button 
        className="mt-6 px-6 py-2 rounded-full text-[10px] font-bold tracking-widest uppercase transition-all"
        style={{ backgroundColor: `${colorStr}20`, color: colorStr, border: `1px solid ${colorStr}50` }}
      >
        Explore Module
      </button>
    </div>
  </div>
);


const TileVAPT = ({ isHovered, isActive }: { isHovered: boolean, isActive: boolean }) => (
  <div className="relative w-full h-full bg-gradient-to-br from-[#0a0015] to-[#050505] overflow-hidden flex items-center justify-center group">
    {/* Grid Background */}
    <div className={`absolute inset-0 bg-grid-pattern opacity-10 transition-transform duration-1000 ${isActive ? 'scale-150 rotate-12' : ''}`} />
    
    {/* Radar Sweep */}
    <div 
      className="absolute w-[200%] h-[200%] origin-center" 
      style={{ 
        background: 'conic-gradient(from 0deg, transparent 70%, rgba(168, 85, 247, 0.4) 100%)',
        animation: `vapt-radar ${isActive ? '1s' : '3s'} linear infinite` 
      }} 
    />
    
    {/* Rings */}
    <div className={`absolute rounded-full border border-purple-500/30 transition-all duration-500 ${isActive ? 'w-[80%] h-[80%] opacity-50' : 'w-48 h-48 opacity-20'}`} />
    <div className={`absolute rounded-full border border-purple-500/50 transition-all duration-500 ${isActive ? 'w-[60%] h-[60%] opacity-80' : 'w-32 h-32 opacity-30'}`} />
    
    {isActive && (
      <div className="absolute w-full h-[1px] bg-purple-500/50 left-0 top-1/2 shadow-[0_0_10px_#a855f7]" />
    )}
    
    <div className="absolute inset-0 bg-gradient-to-t from-[#0a0015] to-transparent z-10" />
    <TileContent 
      icon={Shield} 
      title="VAPT" 
      subtitle="Penetration Testing & Vulnerability Assessment" 
      details="Uncover and remediate security vulnerabilities before attackers exploit them. Our CREST-certified team conducts deep-dive manual penetration testing and automated vulnerability scanning across networks, web applications, and APIs."
      colorStr="#c084fc"
      isHovered={isHovered}
      isActive={isActive}
    />
  </div>
);


const TilePhishing = ({ isHovered, isActive }: { isHovered: boolean, isActive: boolean }) => (
  <div className="relative w-full h-full bg-gradient-to-br from-[#000a1a] to-[#050505] overflow-hidden flex items-center justify-center">
    <div className={`absolute inset-0 ${isActive ? 'opacity-40' : 'opacity-20'}`} style={{ backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 30px, rgba(59,130,246,0.1) 30px, rgba(59,130,246,0.1) 31px)' }} />
    
    {[...Array(isActive ? 15 : 5)].map((_, i) => (
      <div key={i} className="absolute w-[2px] bg-blue-500 shadow-[0_0_8px_#3b82f6]"
        style={{ 
          left: `${Math.random() * 100}%`, 
          height: `${20 + Math.random() * 40}%`,
          animation: `phishing-slide ${0.5 + Math.random() * 2}s linear ${Math.random() * 2}s infinite` 
        }} 
      />
    ))}

    <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent,rgba(0,10,26,0.8))] z-10" />
    <TileContent 
      icon={Mail} 
      title="Phishing Simulation" 
      subtitle="Campaign Simulation & Security Training" 
      details="Transform your workforce into a human firewall. We deploy hyper-realistic, AI-generated phishing campaigns to test employee resilience against business email compromise (BEC) and social engineering."
      colorStr="#60a5fa"
      isHovered={isHovered}
      isActive={isActive}
    />
  </div>
);


const TileDarkWeb = ({ isHovered, isActive }: { isHovered: boolean, isActive: boolean }) => (
  <div className="relative w-full h-full bg-[#030303] overflow-hidden flex items-center justify-center">
    {/* Matrix Rain */}
    {[...Array(isActive ? 30 : 10)].map((_, i) => (
      <div key={i} className={`absolute w-[1px] ${isActive ? 'bg-red-500 shadow-[0_0_5px_red]' : 'bg-gray-500'}`}
        style={{ 
          left: `${3 + (i * (100 / (isActive ? 30 : 10)))}%`, 
          height: `${30 + Math.random() * 50}%`,
          animation: `matrix-rain ${(isActive ? 0.5 : 2) + Math.random()}s linear ${Math.random()}s infinite` 
        }} 
      />
    ))}
    
    {isActive && (
      <div className="absolute inset-0 bg-red-900/10 mix-blend-color-burn animate-pulse" />
    )}
    
    <div className="absolute inset-0 bg-gradient-to-t from-[#030303] via-transparent to-[#030303] z-10" />
    <TileContent 
      icon={Fingerprint} 
      title="Dark Web Monitoring" 
      subtitle="Threat Hunting & Intel Collection" 
      details="Continuous surveillance of darknet forums, ransomware leak sites, and underground marketplaces. We proactively detect leaked credentials, compromised databases, and early-warning threats targeting your brand."
      colorStr={isActive ? "#ef4444" : "#9ca3af"}
      isHovered={isHovered}
      isActive={isActive}
    />
  </div>
);


const TileCompliance = ({ isHovered, isActive }: { isHovered: boolean, isActive: boolean }) => (
  <div className="relative w-full h-full bg-gradient-to-br from-[#001a0a] to-[#050505] overflow-hidden flex items-center justify-center">
    <div className="absolute w-40 h-40" style={{ transformStyle: 'preserve-3d', perspective: '1000px' }}>
      {[...Array(3)].map((_, i) => (
        <div key={i} 
          className={`absolute inset-0 rounded-full border ${isActive ? 'border-emerald-400 shadow-[0_0_15px_#10b981]' : 'border-emerald-500/30'} border-dashed`}
          style={{ animation: `atom-orbit-${i+1} ${isActive ? '2s' : '8s'} linear infinite` }} 
        />
      ))}
      {isActive && <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 bg-emerald-500/30 rounded-full blur-md active-pulse" />}
    </div>
    
    <div className="absolute inset-0 bg-gradient-to-b from-[#001a0a]/80 to-transparent z-10" />
    <TileContent 
      icon={FileCheck} 
      title="Compliance & Risk" 
      subtitle="ISO 27001, SOC 2 & Risk Assessment" 
      details="Navigate complex regulatory landscapes with confidence. We provide end-to-end consulting for ISO 27001, SOC 2, HIPAA, and GDPR compliance, ensuring your security posture aligns with global standards."
      colorStr="#34d399"
      isHovered={isHovered}
      isActive={isActive}
    />
  </div>
);


const TileNetwork = ({ isHovered, isActive }: { isHovered: boolean, isActive: boolean }) => (
  <div className="relative w-full h-full bg-gradient-to-br from-[#1a0c00] to-[#050505] overflow-hidden flex items-center justify-center">
    <svg className="absolute inset-0 w-full h-full opacity-30" viewBox="0 0 200 200">
      {[...Array(12)].map((_, i) => (
        <circle 
          key={i} 
          cx={20 + (i % 4) * 50} 
          cy={30 + Math.floor(i / 4) * 60} 
          r={isActive ? "20" : "15"} 
          fill="none" 
          stroke="#f97316" 
          strokeDasharray="4 4"
          style={isActive ? { animation: `hex-pulse ${1 + Math.random()}s infinite` } : {}}
        />
      ))}
      {isActive && [...Array(10)].map((_, i) => (
        <line key={`l${i}`} 
          x1={20 + (i % 4) * 50} y1={30 + Math.floor(i / 4) * 60} 
          x2={20 + ((i + 1) % 4) * 50} y2={30 + Math.floor((i + 1) / 4) * 60}
          stroke="#f97316" strokeWidth="1" opacity="0.5" 
        />
      ))}
    </svg>
    
    <div className="absolute inset-0 bg-gradient-to-t from-[#1a0c00] to-transparent z-10" />
    <TileContent 
      icon={Database} 
      title="Network & OS Audit" 
      subtitle="Firewall Review & CIS Benchmarks" 
      details="Comprehensive architectural reviews of your network infrastructure and operating systems. We apply CIS benchmarks and zero-trust principles to harden active directories, firewalls, and core routers."
      colorStr="#fb923c"
      isHovered={isHovered}
      isActive={isActive}
    />
  </div>
);


const TileCloud = ({ isHovered, isActive }: { isHovered: boolean, isActive: boolean }) => (
  <div className="relative w-full h-full bg-gradient-to-br from-[#001a2e] to-[#050505] overflow-hidden flex items-center justify-center">
    <div className={`absolute w-[150%] h-[150%] ${isActive ? 'opacity-60' : 'opacity-20'}`} 
         style={{ animation: `galaxy-swirl ${isActive ? '10s' : '30s'} linear infinite` }}>
      {[...Array(isActive ? 40 : 15)].map((_, i) => (
        <div key={i} className="absolute rounded-full bg-cyan-400 shadow-[0_0_10px_#22d3ee]"
          style={{
            width: `${2 + Math.random() * 4}px`, height: `${2 + Math.random() * 4}px`,
            left: `${Math.random() * 100}%`, top: `${Math.random() * 100}%`,
            opacity: Math.random()
          }} 
        />
      ))}
    </div>
    
    <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent,rgba(0,26,46,0.9))] z-10" />
    <TileContent 
      icon={Cloud} 
      title="Cloud Security" 
      subtitle="CSPM, IAM & DevSecOps" 
      details="Secure your AWS, Azure, or GCP environments. We evaluate Identity and Access Management (IAM), configure Cloud Security Posture Management (CSPM), and integrate security directly into your CI/CD pipelines."
      colorStr="#22d3ee"
      isHovered={isHovered}
      isActive={isActive}
    />
  </div>
);


const TileEmail = ({ isHovered, isActive }: { isHovered: boolean, isActive: boolean }) => (
  <div className="relative w-full h-full bg-gradient-to-br from-[#1a0008] to-[#050505] overflow-hidden flex items-center justify-center">
    <div className="absolute inset-0">
      <div className="absolute w-[200%] h-full opacity-30"
        style={{ 
          background: 'linear-gradient(90deg, transparent, rgba(244,63,94,0.8), transparent)', 
          animation: `wave-barrier ${isActive ? '1s' : '4s'} linear infinite` 
        }} 
      />
      {isActive && (
        <div className="absolute w-[200%] h-full opacity-50"
          style={{ 
            background: 'linear-gradient(90deg, transparent, rgba(244,63,94,1), transparent)', 
            animation: 'wave-barrier 1.5s linear infinite reverse' 
          }} 
        />
      )}
    </div>
    <div className="absolute inset-0 bg-gradient-to-b from-[#1a0008]/90 to-transparent z-10" />
    <TileContent 
      icon={ShieldAlert} 
      title="Email Security" 
      subtitle="Anti-Phishing & BEC Protection" 
      details="Advanced protection against the #1 threat vector. We deploy robust DMARC/DKIM/SPF configurations and AI-driven inbox defense to stop malware, spear-phishing, and impersonation attacks before they reach users."
      colorStr="#fb7185"
      isHovered={isHovered}
      isActive={isActive}
    />
  </div>
);


const TilePatch = ({ isHovered, isActive }: { isHovered: boolean, isActive: boolean }) => (
  <div className="relative w-full h-full bg-gradient-to-br from-[#1a1a00] to-[#050505] overflow-hidden flex items-center justify-center">
    <div className="absolute right-0 bottom-0 opacity-20" style={{ animation: `gear-spin ${isActive ? '3s' : '10s'} linear infinite` }}>
      <svg className="w-48 h-48 text-yellow-500" fill="currentColor" viewBox="0 0 24 24"><path d="M19.14,12.94c0.04-0.3,0.06-0.61,0.06-0.94c0-0.32-0.02-0.64-0.06-0.94l2.03-1.58c0.18-0.14,0.23-0.41,0.12-0.61 l-1.92-3.32c-0.12-0.22-0.37-0.29-0.59-0.22l-2.39,0.96c-0.5-0.38-1.03-0.7-1.62-0.94L14.4,2.81c-0.04-0.24-0.24-0.41-0.48-0.41 h-3.84c-0.24,0-0.43,0.17-0.47,0.41L9.25,5.35C8.66,5.59,8.12,5.92,7.63,6.29L5.24,5.33c-0.22-0.08-0.47,0-0.59,0.22L2.73,8.87 C2.62,9.08,2.66,9.34,2.86,9.48l2.03,1.58C4.84,11.36,4.8,11.69,4.8,12s0.02,0.64,0.06,0.94l-2.03,1.58 c-0.18,0.14-0.23,0.41-0.12,0.61l1.92,3.32c0.12,0.22,0.37,0.29,0.59,0.22l2.39-0.96c0.5,0.38,1.03,0.7,1.62,0.94l0.36,2.54 c0.05,0.24,0.24,0.41,0.48,0.41h3.84c0.24,0,0.43-0.17,0.47-0.41l0.36-2.54c0.59-0.24,1.13-0.56,1.62-0.94l2.39,0.96 c0.22,0.08,0.47,0,0.59-0.22l1.92-3.32c0.12-0.22,0.07-0.49-0.12-0.61L19.14,12.94z M12,15.6c-1.98,0-3.6-1.62-3.6-3.6 s1.62-3.6,3.6-3.6s3.6,1.62,3.6,3.6S13.98,15.6,12,15.6z"/></svg>
    </div>
    {isActive && (
      <div className="absolute left-10 top-10 opacity-30" style={{ animation: 'gear-spin-reverse 2s linear infinite' }}>
        <svg className="w-32 h-32 text-yellow-500" fill="currentColor" viewBox="0 0 24 24"><path d="M19.14,12.94c0.04-0.3,0.06-0.61,0.06-0.94c0-0.32-0.02-0.64-0.06-0.94l2.03-1.58c0.18-0.14,0.23-0.41,0.12-0.61 l-1.92-3.32c-0.12-0.22-0.37-0.29-0.59-0.22l-2.39,0.96c-0.5-0.38-1.03-0.7-1.62-0.94L14.4,2.81c-0.04-0.24-0.24-0.41-0.48-0.41 h-3.84c-0.24,0-0.43,0.17-0.47,0.41L9.25,5.35C8.66,5.59,8.12,5.92,7.63,6.29L5.24,5.33c-0.22-0.08-0.47,0-0.59,0.22L2.73,8.87 C2.62,9.08,2.66,9.34,2.86,9.48l2.03,1.58C4.84,11.36,4.8,11.69,4.8,12s0.02,0.64,0.06,0.94l-2.03,1.58 c-0.18,0.14-0.23,0.41-0.12,0.61l1.92,3.32c0.12,0.22,0.37,0.29,0.59,0.22l2.39-0.96c0.5,0.38,1.03,0.7,1.62,0.94l0.36,2.54 c0.05,0.24,0.24,0.41,0.48,0.41h3.84c0.24,0,0.43-0.17,0.47-0.41l0.36-2.54c0.59-0.24,1.13-0.56,1.62-0.94l2.39,0.96 c0.22,0.08,0.47,0,0.59-0.22l1.92-3.32c0.12-0.22,0.07-0.49-0.12-0.61L19.14,12.94z M12,15.6c-1.98,0-3.6-1.62-3.6-3.6 s1.62-3.6,3.6-3.6s3.6,1.62,3.6,3.6S13.98,15.6,12,15.6z"/></svg>
      </div>
    )}
    
    <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent,rgba(26,26,0,0.9))] z-10" />
    <TileContent 
      icon={Lock} 
      title="Patch Management" 
      subtitle="Automated Updates & Zero-Day Response" 
      details="Close the window of exposure. We implement robust patch management lifecycles to automatically deploy critical security updates, mitigating zero-day vulnerabilities across operating systems and third-party apps."
      colorStr="#facc15"
      isHovered={isHovered}
      isActive={isActive}
    />
  </div>
);


const TilePolicy = ({ isHovered, isActive }: { isHovered: boolean, isActive: boolean }) => (
  <div className="relative w-full h-full bg-gradient-to-br from-[#0f0026] to-[#050505] overflow-hidden flex items-center justify-center">
    {[...Array(isActive ? 12 : 3)].map((_, i) => (
      <div key={i} 
        className="absolute w-20 h-20 border border-violet-500/20" 
        style={{ 
          left: `${Math.random() * 80}%`, top: `${Math.random() * 80}%`,
          animation: `${isActive ? 'diamond-shatter' : 'diamond-float'} ${3 + Math.random() * 4}s infinite`
        }} 
      />
    ))}
    
    <div className="absolute inset-0 bg-gradient-to-t from-[#0f0026] to-transparent z-10" />
    <TileContent 
      icon={BookOpen} 
      title="Security Policy" 
      subtitle="Governance Framework & Policy Development" 
      details="Build a foundation of strong governance. We draft and implement comprehensive cybersecurity policies, disaster recovery plans, and acceptable use frameworks tailored to your organization's specific risk appetite."
      colorStr="#a78bfa"
      isHovered={isHovered}
      isActive={isActive}
    />
  </div>
);

/* ------------------------------------------------------------------ */
/*  Services Frame Data                                               */
/* ------------------------------------------------------------------ */

const serviceFrames = [
  { id: 1, defaultPos: { x: 0, y: 0, w: 4, h: 4 }, mediaSize: 1, content: (isHovered: boolean, isActive: boolean) => <TileVAPT isHovered={isHovered} isActive={isActive} /> },
  { id: 2, defaultPos: { x: 4, y: 0, w: 4, h: 4 }, mediaSize: 1, content: (isHovered: boolean, isActive: boolean) => <TilePhishing isHovered={isHovered} isActive={isActive} /> },
  { id: 3, defaultPos: { x: 8, y: 0, w: 4, h: 4 }, mediaSize: 1, content: (isHovered: boolean, isActive: boolean) => <TileDarkWeb isHovered={isHovered} isActive={isActive} /> },
  { id: 4, defaultPos: { x: 0, y: 4, w: 4, h: 4 }, mediaSize: 1, content: (isHovered: boolean, isActive: boolean) => <TileCompliance isHovered={isHovered} isActive={isActive} /> },
  { id: 5, defaultPos: { x: 4, y: 4, w: 4, h: 4 }, mediaSize: 1, content: (isHovered: boolean, isActive: boolean) => <TileNetwork isHovered={isHovered} isActive={isActive} /> },
  { id: 6, defaultPos: { x: 8, y: 4, w: 4, h: 4 }, mediaSize: 1, content: (isHovered: boolean, isActive: boolean) => <TileCloud isHovered={isHovered} isActive={isActive} /> },
  { id: 7, defaultPos: { x: 0, y: 8, w: 4, h: 4 }, mediaSize: 1, content: (isHovered: boolean, isActive: boolean) => <TileEmail isHovered={isHovered} isActive={isActive} /> },
  { id: 8, defaultPos: { x: 4, y: 8, w: 4, h: 4 }, mediaSize: 1, content: (isHovered: boolean, isActive: boolean) => <TilePatch isHovered={isHovered} isActive={isActive} /> },
  { id: 9, defaultPos: { x: 8, y: 8, w: 4, h: 4 }, mediaSize: 1, content: (isHovered: boolean, isActive: boolean) => <TilePolicy isHovered={isHovered} isActive={isActive} /> },
];

/* ------------------------------------------------------------------ */
/*  Main Section                                                      */
/* ------------------------------------------------------------------ */

export const ServicesSection = () => {
  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: motionStyles }} />
      <section id="services" className="relative z-20 py-24 md:py-32 w-full px-4 md:px-8">
        <div className="max-w-[1400px] mx-auto">
          <div className="mb-12 md:mb-16 text-center max-w-2xl mx-auto">
            <h2 className="text-[10px] font-bold tracking-[0.4em] uppercase text-[#8A2BE2] mb-3">OUR SERVICES</h2>
            <h3 className="text-2xl md:text-4xl font-bold tracking-tighter text-white">
              Comprehensive cybersecurity solutions <span className="text-gray-600">tailored for modern businesses</span>
            </h3>
            <p className="mt-4 text-xs text-gray-400 uppercase tracking-widest animate-pulse">Tap a module to expand details</p>
          </div>

          <div className="w-full aspect-square max-h-[85vh]">
            <DynamicFrameLayout
              frames={serviceFrames}
              className="w-full h-full"
              hoverSize={6}
              activeSize={9}
              gapSize={4}
            />
          </div>
        </div>
      </section>
    </>
  );
};
