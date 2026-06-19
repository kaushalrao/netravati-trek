"use client";

import { useRef, useEffect, useState } from "react";
import { motion, useScroll, useTransform, MotionValue } from "framer-motion";

export function CinematicBackdrop() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll();
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  // ----------------------------------------------------
  // 1. SKY & LIGHTING (Dynamic gradients based on journey)
  // Segments: Morning(0-0.2) -> Forest/Day(0.2-0.5) -> Sunset(0.5-0.7) -> Night(0.7-0.9) -> Morning(0.9-1)
  // ----------------------------------------------------
  const skyBackground = useTransform(
    scrollYProgress,
    [0, 0.2, 0.4, 0.6, 0.8, 1],
    [
      "linear-gradient(180deg, #fcd0a1 0%, #a6d0c4 100%)", // Morning / Arrival (Soft peach & mint)
      "linear-gradient(180deg, #81b29a 0%, #3d405b 100%)", // Deep Forest (Cool greens & dark slate)
      "linear-gradient(180deg, #6ba1bc 0%, #d8e2dc 100%)", // Summit (Bright sky blue)
      "linear-gradient(180deg, #e07a5f 0%, #3d405b 100%)", // Sunset / Descent (Terracotta & slate)
      "linear-gradient(180deg, #1d2136 0%, #0b0c10 100%)", // Night / Campfire (Deep navy to black)
      "linear-gradient(180deg, #fcd0a1 0%, #a6d0c4 100%)"  // Morning / Departure
    ]
  );

  const sunY = useTransform(
    scrollYProgress, 
    [0, 0.2, 0.35, 0.4, 0.55, 0.7, 0.75, 0.9, 1], 
    ["10%", "120%", "120%", "10%", "120%", "120%", "10%", "120%", "120%"]
  );
  
  const sunOpacity = useTransform(
    scrollYProgress, 
    [0, 0.2, 0.25, 0.4, 0.55, 0.6, 0.75, 0.9, 0.95, 1], 
    [1, 1, 0, 1, 1, 0, 1, 1, 0, 0]
  );
  
  const sunColor = useTransform(
    scrollYProgress, 
    [0, 0.2, 0.35, 0.4, 0.55, 0.7, 0.75, 0.9, 1], 
    ["#ffffff", "#ffb703", "#ffb703", "#ffffff", "#ffb703", "#ffb703", "#ffffff", "#ffb703", "#ffb703"]
  );

  const starsOpacity = useTransform(scrollYProgress, [0.6, 0.7, 0.9, 1], [0, 1, 1, 0]);

  // ----------------------------------------------------
  // 2. PARALLAX LAYERS (Mountain & Forest SVGs)
  // ----------------------------------------------------
  const layer1Y = useTransform(scrollYProgress, [0, 1], ["0%", "40%"]); // Deep Background
  const layer2Y = useTransform(scrollYProgress, [0, 1], ["0%", "-10%"]); // Mid Background
  const layer3Y = useTransform(scrollYProgress, [0, 1], ["0%", "-30%"]); // Near Midground
  const foregroundY = useTransform(scrollYProgress, [0, 1], ["0%", "-150%"]); // Fast Foreground

  // SVG Layer Opacities (Fade out deep mountains during night/forest)
  const mountainOpacity = useTransform(scrollYProgress, [0, 0.3, 0.4, 0.7, 0.8], [0.5, 0.1, 0.8, 0.2, 0.4]);
  const mistOpacity = useTransform(scrollYProgress, [0, 0.2, 0.4, 0.7, 0.9, 1], [0.6, 0.2, 0.8, 0, 0.4, 0.6]);

  // ----------------------------------------------------
  // 3. COLOR SHIFTS FOR SVGs (Match the lighting)
  // ----------------------------------------------------
  const mountainColor = useTransform(scrollYProgress, 
    [0, 0.4, 0.6, 0.8], 
    ["#3d405b", "#6ba1bc", "#1d2136", "#0b0c10"]
  );
  
  const midgroundColor = useTransform(scrollYProgress, 
    [0, 0.2, 0.4, 0.6, 0.8], 
    ["#5a8270", "#2c3d36", "#4a6d7c", "#2d1b2e", "#050608"]
  );

  const foregroundColor = useTransform(scrollYProgress, 
    [0, 0.2, 0.4, 0.6, 0.8], 
    ["#2c3d36", "#141c18", "#2a424a", "#1a0f1b", "#000000"]
  );

  return (
    <div ref={containerRef} className="fixed inset-0 z-0 pointer-events-none overflow-hidden bg-black">
      
      {/* --- SKY LAYER --- */}
      <motion.div className="absolute inset-0" style={{ background: skyBackground }} />

      {/* --- NOISE TEXTURE OVERLAY --- */}
      <div className="absolute inset-0 opacity-20 mix-blend-overlay" style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E\")" }} />

      {/* --- STARS (Night) --- */}
      <motion.div 
        className="absolute inset-0" 
        style={{ 
          opacity: starsOpacity, 
          backgroundImage: "radial-gradient(1.5px 1.5px at 20px 30px, #fff, rgba(0,0,0,0)), radial-gradient(1px 1px at 80px 120px, #fff, rgba(0,0,0,0)), radial-gradient(2px 2px at 150px 80px, #fff, rgba(0,0,0,0)), radial-gradient(1px 1px at 220px 200px, #fff, rgba(0,0,0,0))", 
          backgroundSize: "250px 250px" 
        }} 
      />

      {/* --- SUN / MOON --- */}
      <motion.div 
        className="absolute left-[60%] w-40 h-40 rounded-full blur-3xl"
        style={{ top: sunY, opacity: sunOpacity, backgroundColor: sunColor }}
      />
      <motion.div 
        className="absolute left-[65%] w-24 h-24 rounded-full blur-md"
        style={{ top: sunY, opacity: sunOpacity, backgroundColor: "#ffffff" }}
      />

      {/* --- DEEP BACKGROUND (Distant Mountains) --- */}
      <motion.div className="absolute bottom-20 left-0 right-0 w-full" style={{ y: layer1Y, opacity: mountainOpacity }}>
        <motion.svg viewBox="0 0 1440 400" className="w-full h-auto drop-shadow-2xl" preserveAspectRatio="none" style={{ fill: mountainColor }}>
          <path d="M0,250 C200,100 400,300 600,150 C800,0 1000,200 1200,100 C1300,50 1400,150 1440,180 L1440,400 L0,400 Z" />
        </motion.svg>
      </motion.div>

      {/* --- MID BACKGROUND (Rolling Forest Hills) --- */}
      <motion.div className="absolute -bottom-10 left-0 right-0 w-full" style={{ y: layer2Y }}>
        <motion.svg viewBox="0 0 1440 320" className="w-[150vw] md:w-full h-auto drop-shadow-2xl -ml-[10vw]" preserveAspectRatio="none" style={{ fill: midgroundColor }}>
          <path d="M0,160 C300,250 500,50 700,150 C900,250 1100,100 1440,180 L1440,320 L0,320 Z" />
        </motion.svg>
      </motion.div>

      {/* --- NEAR MIDGROUND (Steep Ridge) --- */}
      <motion.div className="absolute -bottom-20 left-0 right-0 w-full" style={{ y: layer3Y }}>
        <motion.svg viewBox="0 0 1440 320" className="w-[200vw] md:w-[120vw] h-auto drop-shadow-2xl -ml-[20vw]" preserveAspectRatio="none" style={{ fill: foregroundColor }}>
          <path d="M0,300 C200,150 400,280 600,200 C800,120 1000,250 1440,100 L1440,320 L0,320 Z" />
        </motion.svg>
      </motion.div>

      {/* --- FOREGROUND SILHOUETTES (Fast Parallax Trees) --- */}
      <motion.div className="absolute bottom-0 left-0 right-0 w-full opacity-90" style={{ y: foregroundY }}>
        <svg viewBox="0 0 1440 320" className="w-full h-auto fill-black/80 drop-shadow-[0_-10px_20px_rgba(0,0,0,0.5)]">
          {/* Massive Abstract Pine Trees framing the edges */}
          <path d="M-50,320 L-50,0 L20,100 L0,150 L60,220 L30,260 L80,320 Z" />
          <path d="M1500,320 L1500,-50 L1350,120 L1400,180 L1320,250 L1380,280 L1300,320 Z" />
        </svg>
      </motion.div>

      {/* --- ATMOSPHERIC PARTICLES --- */}
      {isMounted && <ParticleEngine scrollYProgress={scrollYProgress} />}

      {/* --- BOTTOM FADE --- */}
      <div className="absolute bottom-0 left-0 right-0 h-64 bg-gradient-to-t from-black to-transparent opacity-80" />
    </div>
  );
}

// ----------------------------------------------------
// PARTICLE ENGINE (Fog, Dust, Embers)
// ----------------------------------------------------
function ParticleEngine({ scrollYProgress }: { scrollYProgress: MotionValue<number> }) {
  // Embers are only visible during night segment (0.6 to 0.9)
  const embersOpacity = useTransform(scrollYProgress, [0.5, 0.6, 0.8, 0.9], [0, 1, 1, 0]);
  
  // Fog is visible in morning and forest (0 to 0.4 and 0.9 to 1)
  const fogOpacity = useTransform(scrollYProgress, [0, 0.3, 0.4, 0.8, 0.9, 1], [0.8, 0.2, 0, 0, 0.5, 0.8]);

  return (
    <div className="absolute inset-0">
      {/* Fog Blobs */}
      <motion.div className="absolute inset-0" style={{ opacity: fogOpacity }}>
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={`fog-${i}`}
            className="absolute w-64 h-32 md:w-96 md:h-48 rounded-full bg-white opacity-10 blur-3xl"
            initial={{ 
              left: `${Math.random() * 100}%`, 
              top: `${(Math.random() * 50) + 50}%` // Keep fog lower down
            }}
            animate={{ 
              x: [0, (Math.random() > 0.5 ? 1 : -1) * 200, 0],
              y: [0, -50, 0],
            }}
            transition={{
              duration: Math.random() * 20 + 20,
              repeat: Infinity,
              ease: "easeInOut",
              delay: Math.random() * 10
            }}
          />
        ))}
      </motion.div>

      {/* Campfire Embers */}
      <motion.div className="absolute inset-0" style={{ opacity: embersOpacity }}>
        {[...Array(25)].map((_, i) => (
          <motion.div
            key={`ember-${i}`}
            className="absolute w-1 h-1 md:w-1.5 md:h-1.5 rounded-full bg-[#ff7b00] shadow-[0_0_10px_2px_#ff7b00]"
            initial={{ 
              left: `${Math.random() * 100}%`, 
              top: '110%' // Start below screen
            }}
            animate={{ 
              top: ['110%', '-10%'],
              x: [0, (Math.random() > 0.5 ? 1 : -1) * 150],
              opacity: [0, 1, 1, 0] 
            }}
            transition={{
              duration: Math.random() * 5 + 3,
              repeat: Infinity,
              ease: "easeOut",
              delay: Math.random() * 5
            }}
          />
        ))}
      </motion.div>
    </div>
  );
}
