import React, { useEffect, useRef } from 'react';
import { useScroll, useTransform, motion } from 'motion/react';

export const BinaryBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let stars: { 
      x: number; 
      y: number; 
      z: number; 
      prevZ: number;
      color: string;
      size: number;
      char: string;
    }[] = [];
    
    // Very sparse, elegant starfield for a cleaner premium aesthetic
    const numStars = 400; 

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight; 
      
      stars = [];
      for (let i = 0; i < numStars; i++) {
        // Light shreds of purple vibe
        const purpleShades = ['138, 43, 226', '147, 112, 219', '186, 85, 211', '123, 104, 238', '216, 191, 216'];
        const color = purpleShades[Math.floor(Math.random() * purpleShades.length)];

        stars.push({
          x: (Math.random() - 0.5) * 4000,
          y: (Math.random() - 0.5) * 4000,
          z: Math.random() * 4000,
          prevZ: 0,
          color: color,
          // Finer base sizes so they don't become massive
          size: Math.random() * 0.8 + 0.2,
          char: Array.from({length: Math.floor(Math.random() * 8) + 4}, () => Math.random() > 0.5 ? '1' : '0').join('')
        });
      }
    };

    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();

    let lastScrollY = window.scrollY;
    let warpSpeed = 0;

    const draw = () => {
      const currentScrollY = window.scrollY;
      const scrollDelta = currentScrollY - lastScrollY;
      lastScrollY = currentScrollY;

      // Only trigger warp speed if we are in the Hero section (before the Services section)
      let activeScrollDelta = scrollDelta;
      if (currentScrollY > window.innerHeight * 1.5) {
          activeScrollDelta = 0;
      }

      // When scrolling down, positive delta -> warp forward. When scrolling up, negative -> warp backward.
      // Slower decay and higher scroll multiplier for an explosive hyperspace feeling
      warpSpeed = warpSpeed * 0.95 + activeScrollDelta * 0.8; 


      const baseSpeed = 1.0;
      const speed = baseSpeed + warpSpeed;

      // Trail effect: instead of clearing, fill with low opacity black. 
      // Higher warp speed = longer trails
      const alpha = warpSpeed > 2 ? 0.15 : 0.4;
      ctx.fillStyle = `rgba(5, 5, 5, ${alpha})`;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      const centerX = canvas.width / 2;
      const centerY = canvas.height / 2;
      const fov = 800; // Field of view depth

      for (let i = 0; i < stars.length; i++) {
        const star = stars[i];
        
        star.prevZ = star.z;
        star.z -= speed;

        // If star passes the camera, reset it far away
        if (star.z <= 1) {
          star.z = 4000;
          star.prevZ = 4000;
          star.x = (Math.random() - 0.5) * 4000;
          star.y = (Math.random() - 0.5) * 4000;
        } else if (star.z > 4000) {
          // If star goes too far back (when reversing), reset it near the camera
          star.z = 2;
          star.prevZ = 2;
          star.x = (Math.random() - 0.5) * 4000;
          star.y = (Math.random() - 0.5) * 4000;
        }

        // Project 3D to 2D
        const x = (star.x / star.z) * fov + centerX;
        const y = (star.y / star.z) * fov + centerY;
        
        const prevX = (star.x / star.prevZ) * fov + centerX;
        const prevY = (star.y / star.prevZ) * fov + centerY;

        const radius = (star.size * fov) / star.z;
        
        // Skip drawing if outside screen bounds
        if (x < 0 || x > canvas.width || y < 0 || y > canvas.height) continue;

        const brightness = Math.min(1, 500 / star.z);
        
        // Render as 0s and 1s zooming towards the camera
        const fontSize = Math.min(Math.max(6, radius * 6), 36); // Elegant text size with a strict max cap
        ctx.font = `bold ${fontSize}px "Space Mono", "JetBrains Mono", monospace`;
        ctx.fillStyle = `rgba(${star.color}, ${brightness * 0.8})`;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        
        // Add glow to closer/larger text
        if (radius > 1.2) {
            ctx.shadowBlur = 15;
            ctx.shadowColor = `rgba(${star.color}, ${brightness})`;
        } else {
            ctx.shadowBlur = 0;
        }
        
        ctx.save();
        ctx.translate(x, y);
        // Rotate the text so the chain points outwards from the center
        const angle = Math.atan2(y - centerY, x - centerX);
        ctx.rotate(angle);
        ctx.fillText(star.char, 0, 0);
        ctx.restore();
      }
      
      // Central cosmic glow (Hail Mary vibe)
      const centralGlowRadius = 200 + warpSpeed * 3;
      if (centralGlowRadius > 0 && centralGlowRadius < canvas.width * 2) {
        ctx.shadowBlur = 0;
        const centralGlow = ctx.createRadialGradient(centerX, centerY, 0, centerX, centerY, centralGlowRadius);
        centralGlow.addColorStop(0, `rgba(138, 43, 226, ${Math.min(0.2, warpSpeed * 0.02 + 0.05)})`);
        centralGlow.addColorStop(1, 'rgba(5, 5, 5, 0)');
        ctx.fillStyle = centralGlow;
        ctx.fillRect(0, 0, canvas.width, canvas.height);
      }

      animationFrameId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden bg-[#050505]">
      {/* Subtle vignette */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_100%_100%_at_50%_50%,transparent_0%,#050505_90%)] z-10" />
      <canvas 
        ref={canvasRef} 
        className="w-full h-full mix-blend-screen relative z-0"
      />
    </div>
  );
};

