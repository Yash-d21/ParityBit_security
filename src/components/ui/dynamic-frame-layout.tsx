"use client"

import { useState } from "react"
import { motion } from "framer-motion"

interface Frame {
  id: number
  defaultPos: { x: number; y: number; w: number; h: number }
  mediaSize: number
  content: (isHovered: boolean, isActive: boolean) => React.ReactNode
}

interface DynamicFrameLayoutProps {
  frames: Frame[]
  className?: string
  hoverSize?: number
  activeSize?: number
  gapSize?: number
}

export function DynamicFrameLayout({ 
  frames: initialFrames, 
  className,
  hoverSize = 5.5,
  activeSize = 8,
  gapSize = 6
}: DynamicFrameLayoutProps) {
  const [frames] = useState<Frame[]>(initialFrames)
  const [hovered, setHovered] = useState<{ row: number; col: number } | null>(null)
  const [active, setActive] = useState<{ row: number; col: number, id: number } | null>(null)

  const getRowSizes = () => {
    if (active !== null) {
      const nonActiveSize = (12 - activeSize) / 2;
      return [0, 1, 2].map((r) => (r === active.row ? `${activeSize}fr` : `${nonActiveSize}fr`)).join(" ")
    }
    if (hovered !== null) {
      const nonHoveredSize = (12 - hoverSize) / 2;
      return [0, 1, 2].map((r) => (r === hovered.row ? `${hoverSize}fr` : `${nonHoveredSize}fr`)).join(" ")
    }
    return "4fr 4fr 4fr"
  }

  const getColSizes = () => {
    if (active !== null) {
      const nonActiveSize = (12 - activeSize) / 2;
      return [0, 1, 2].map((c) => (c === active.col ? `${activeSize}fr` : `${nonActiveSize}fr`)).join(" ")
    }
    if (hovered !== null) {
      const nonHoveredSize = (12 - hoverSize) / 2;
      return [0, 1, 2].map((c) => (c === hovered.col ? `${hoverSize}fr` : `${nonHoveredSize}fr`)).join(" ")
    }
    return "4fr 4fr 4fr"
  }

  const getTransformOrigin = (x: number, y: number) => {
    const vertical = y === 0 ? "top" : y === 4 ? "center" : "bottom"
    const horizontal = x === 0 ? "left" : x === 4 ? "center" : "right"
    return `${vertical} ${horizontal}`
  }

  return (
    <div
      className={`relative w-full h-full ${className}`}
      style={{
        display: "grid",
        gridTemplateRows: getRowSizes(),
        gridTemplateColumns: getColSizes(),
        gap: `${gapSize}px`,
        transition: "grid-template-rows 0.5s cubic-bezier(0.16, 1, 0.3, 1), grid-template-columns 0.5s cubic-bezier(0.16, 1, 0.3, 1)",
      }}
    >
      {frames.map((frame) => {
        const row = Math.floor(frame.defaultPos.y / 4)
        const col = Math.floor(frame.defaultPos.x / 4)
        const transformOrigin = getTransformOrigin(frame.defaultPos.x, frame.defaultPos.y)
        
        const isHovered = hovered?.row === row && hovered?.col === col
        const isActive = active?.id === frame.id
        
        // If there's an active tile, others are dimmed.
        const isDimmed = active !== null && !isActive

        return (
          <motion.div
            key={frame.id}
            className="relative overflow-hidden rounded-xl cursor-pointer"
            style={{
              transformOrigin,
            }}
            onMouseEnter={() => setHovered({ row, col })}
            onMouseLeave={() => setHovered(null)}
            onClick={() => setActive(isActive ? null : { row, col, id: frame.id })}
          >
            <div 
              className="absolute inset-0 transition-all duration-500"
              style={{
                opacity: isDimmed ? 0.4 : (isHovered || isActive) ? 1 : 0.8,
                filter: isDimmed ? "grayscale(100%) blur(2px)" : "none",
              }}
            >
              {frame.content(isHovered, isActive)}
            </div>
          </motion.div>
        )
      })}
    </div>
  )
}
