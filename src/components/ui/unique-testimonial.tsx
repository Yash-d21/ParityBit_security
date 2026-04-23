"use client"

import { useState, useEffect } from "react"
import { cn } from "../../lib/utils"

const testimonials = [
  {
    id: 1,
    quote: "ParityBit's threat intelligence proactively identified a zero-day vulnerability in our infrastructure before it could be exploited. Their service is invaluable.",
    author: "Elena Rodriguez",
    role: "CISO at Global Finance",
    avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=800&auto=format&fit=crop",
  },
  {
    id: 2,
    quote: "The automated response capabilities of VECTOR SIEM have reduced our incident resolution time from hours to mere minutes. A true force multiplier.",
    author: "Marcus Johnson",
    role: "Director of SecOps at TechNova",
    avatar: "https://images.unsplash.com/photo-1556157382-97eda2d62296?q=80&w=800&auto=format&fit=crop",
  },
  {
    id: 3,
    quote: "Implementing Parity OS across our critical infrastructure was the best security decision we've made. It provides absolute peace of mind.",
    author: "Sarah Chen",
    role: "VP of Engineering at Nexus",
    avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=800&auto=format&fit=crop",
  },
  {
    id: 4,
    quote: "Their phishing simulations are incredibly realistic. It completely transformed our employees' security awareness and reduced our risk profile significantly.",
    author: "David Kim",
    role: "Head of IT at Horizon Health",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=800&auto=format&fit=crop",
  }
]

export function Testimonials() {
  const [activeIndex, setActiveIndex] = useState(0)
  const [isAnimating, setIsAnimating] = useState(false)
  const [displayedQuote, setDisplayedQuote] = useState(testimonials[0].quote)
  const [displayedRole, setDisplayedRole] = useState(testimonials[0].role)
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)

  const handleSelect = (index: number) => {
    if (index === activeIndex) return
    setIsAnimating(true)

    setTimeout(() => {
      setDisplayedQuote(testimonials[index].quote)
      setDisplayedRole(testimonials[index].role)
      setActiveIndex(index)
      setTimeout(() => setIsAnimating(false), 400)
    }, 200)
  }

  // Auto-play effect
  useEffect(() => {
    // Only auto-play if we aren't actively hovering over a circle
    if (hoveredIndex !== null) return;
    
    const timer = setInterval(() => {
      handleSelect((activeIndex + 1) % testimonials.length)
    }, 3000)
    
    return () => clearInterval(timer)
  }, [activeIndex, hoveredIndex])

  return (
    <div className="flex flex-col items-center gap-12 py-16 relative z-10 w-full">
      {/* Quote Container */}
      <div className="relative px-8 md:px-16 w-full max-w-4xl mx-auto flex flex-col items-center">
        <span className="absolute -top-12 md:-top-16 left-0 text-[120px] md:text-[180px] font-serif text-white/[0.03] select-none pointer-events-none leading-none">
          "
        </span>

        <div className="min-h-[160px] md:min-h-[140px] flex items-center justify-center text-center">
          <p
            className={cn(
              "text-2xl md:text-4xl font-light text-white leading-relaxed tracking-wide transition-all duration-400 ease-out",
              isAnimating ? "opacity-0 blur-sm scale-[0.98]" : "opacity-100 blur-0 scale-100",
            )}
          >
            {displayedQuote}
          </p>
        </div>

        <span className="absolute -bottom-16 md:-bottom-24 right-0 text-[120px] md:text-[180px] font-serif text-white/[0.03] select-none pointer-events-none leading-none rotate-180">
          "
        </span>
      </div>

      <div className="flex flex-col items-center gap-8 mt-8">
        {/* Role text */}
        <p
          className={cn(
            "text-xs md:text-sm text-[#8A2BE2] font-semibold tracking-[0.3em] uppercase transition-all duration-500 ease-out",
            isAnimating ? "opacity-0 translate-y-2" : "opacity-100 translate-y-0",
          )}
        >
          {displayedRole}
        </p>

        {/* Avatar Selection Track */}
        <div className="flex items-center justify-center gap-2 md:gap-4 p-2 bg-white/[0.02] border border-white/[0.08] rounded-full backdrop-blur-xl shadow-[0_8px_32px_0_rgba(0,0,0,0.5)]">
          {testimonials.map((testimonial, index) => {
            const isActive = activeIndex === index
            const isHovered = hoveredIndex === index && !isActive
            const showName = isActive || isHovered

            return (
              <button
                key={testimonial.id}
                onClick={() => handleSelect(index)}
                onMouseEnter={() => {
                  setHoveredIndex(index)
                  handleSelect(index)
                }}
                onMouseLeave={() => setHoveredIndex(null)}
                className={cn(
                  "relative flex items-center gap-0 rounded-full cursor-pointer",
                  "transition-all duration-500 ease-[cubic-bezier(0.4,0,0.2,1)]",
                  isActive ? "bg-white/[0.1] shadow-[inset_0_1px_1px_rgba(255,255,255,0.1),0_4px_12px_rgba(0,0,0,0.3)] border border-white/[0.05]" : "bg-transparent hover:bg-white/[0.05]",
                  showName ? "pr-5 pl-2 py-2" : "p-2",
                )}
              >
                {/* Avatar with smooth ring animation */}
                <div className="relative flex-shrink-0">
                  <img
                    src={testimonial.avatar || "/placeholder.svg"}
                    alt={testimonial.author}
                    className={cn(
                      "w-10 h-10 md:w-12 md:h-12 rounded-full object-cover",
                      "transition-all duration-500 ease-[cubic-bezier(0.4,0,0.2,1)]",
                      isActive ? "ring-2 ring-white/20" : "ring-1 ring-white/10 opacity-70",
                      !isActive && "hover:scale-110 hover:opacity-100",
                    )}
                  />
                </div>

                <div
                  className={cn(
                    "grid transition-all duration-500 ease-[cubic-bezier(0.4,0,0.2,1)]",
                    showName ? "grid-cols-[1fr] opacity-100 ml-3" : "grid-cols-[0fr] opacity-0 ml-0",
                  )}
                >
                  <div className="overflow-hidden">
                    <span
                      className={cn(
                        "text-sm font-medium whitespace-nowrap block",
                        "transition-colors duration-300",
                        isActive ? "text-white" : "text-white/70",
                      )}
                    >
                      {testimonial.author}
                    </span>
                  </div>
                </div>
              </button>
            )
          })}
        </div>
      </div>
    </div>
  )
}
