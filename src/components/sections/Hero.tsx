"use client";

import { trekInfo } from "@/content/itinerary";
import { Backpack, MapPin, Mountain, Route, ArrowDown, Leaf, Droplets, Compass } from "lucide-react";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

export function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  return (
    <section ref={containerRef} className="relative w-full h-[90svh] md:h-screen flex flex-col items-center justify-between overflow-hidden z-10 bg-gradient-to-b from-[#1a2920] to-[#0a110d] pt-24 pb-8">
      
      {/* BACKGROUND: Topographic Contour */}
      <div className="absolute inset-0 opacity-[0.03] mix-blend-overlay pointer-events-none" style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E\")" }} />
      <svg className="absolute inset-0 w-full h-full opacity-10 pointer-events-none" viewBox="0 0 100 100" preserveAspectRatio="none">
        <path d="M0,20 Q25,10 50,30 T100,20" fill="none" stroke="white" strokeWidth="0.5" />
        <path d="M0,40 Q30,50 60,30 T100,50" fill="none" stroke="white" strokeWidth="0.3" />
        <path d="M0,60 Q40,30 70,70 T100,60" fill="none" stroke="white" strokeWidth="0.4" />
        <path d="M0,80 Q20,90 50,70 T100,85" fill="none" stroke="white" strokeWidth="0.2" />
      </svg>

      {/* HEADER STACK */}
      <motion.div 
        className="relative z-20 text-center px-4 max-w-5xl mx-auto flex flex-col items-center gap-3 w-full pb-12"
      >
        <motion.span 
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="font-sans text-orange-400 uppercase tracking-[0.4em] text-[10px] md:text-xs font-bold"
        >
          Western Ghats Expedition
        </motion.span>
        
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="font-serif text-6xl md:text-8xl lg:text-9xl text-white leading-[0.9] tracking-tight drop-shadow-2xl"
        >
          {trekInfo.name.replace(" Expedition", "")} <br />
          <span className="text-white/80 italic text-5xl md:text-7xl">Peak</span>
        </motion.h1>
        
        <motion.span 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="font-serif italic text-white/60 text-lg md:text-2xl mt-2 mb-4"
        >
          3 Days • 2 Nights Adventure
        </motion.span>
        
        <motion.p 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="font-sans text-sm md:text-lg text-white/80 max-w-lg md:max-w-2xl font-light leading-relaxed"
        >
          Cross rivers, chase waterfalls, and stand above the clouds at Netravati Peak.
        </motion.p>
      </motion.div>

      {/* DETAILS ROW & TAGS */}
      <motion.div 
        className="relative z-20 flex flex-col items-center gap-6 mt-auto mb-8 w-full px-4"
      >
        {/* Metadata */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="flex flex-wrap items-center justify-center gap-4 md:gap-8 font-sans text-xs md:text-sm text-white/90 font-medium bg-black/30 backdrop-blur-md px-6 py-3 rounded-full border border-white/10 shadow-xl"
        >
          <div className="flex items-center gap-1.5"><MapPin size={14} className="text-orange-400" /> Samse, Mudigere</div>
          <div className="w-1 h-1 rounded-full bg-white/30" />
          <div className="flex items-center gap-1.5"><Mountain size={14} className="text-orange-400" /> 1520m Summit</div>
          <div className="w-1 h-1 rounded-full bg-white/30" />
          <div className="flex items-center gap-1.5"><Route size={14} className="text-orange-400" /> 14km Trek</div>
        </motion.div>

        {/* Tags */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="flex flex-wrap justify-center gap-2 max-w-sm md:max-w-none"
        >
          {[
            { icon: Leaf, label: "Forest Trails" },
            { icon: Droplets, label: "Waterfalls" },
            { icon: Route, label: "River Crossing" },
            { icon: Compass, label: "Coffee Estates" }
          ].map((tag, i) => (
            <span key={i} className="flex items-center gap-1.5 bg-white/5 backdrop-blur-sm border border-white/10 px-3 py-1.5 rounded-full text-[10px] md:text-xs text-white/70 uppercase tracking-wider">
              <tag.icon size={10} className="text-white/50" />
              {tag.label}
            </span>
          ))}
        </motion.div>
      </motion.div>

      {/* JOURNEY PREVIEW & CTA */}
      <motion.div 
        className="relative z-20 w-full px-4 pb-36 md:pb-20 flex flex-col items-center gap-6 mt-auto"
      >
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.7 }}
          className="hidden md:flex items-center gap-4 text-xs font-sans text-white/50 tracking-widest uppercase"
        >
          <span>Day 1 → Summit Trek</span>
          <span className="w-1 h-1 rounded-full bg-white/20" />
          <span>Day 2 → Waterfalls & Viewpoints</span>
          <span className="w-1 h-1 rounded-full bg-white/20" />
          <span>Day 3 → Estate Walk</span>
        </motion.div>

        <motion.button 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.8, type: "spring" }}
          onClick={() => window.dispatchEvent(new Event('open-packing-guide'))}
          className="flex items-center gap-3 bg-orange-500 hover:bg-orange-400 text-black px-8 py-4 rounded-full transition-all shadow-[0_0_40px_rgba(249,115,22,0.3)] hover:shadow-[0_0_60px_rgba(249,115,22,0.5)] hover:-translate-y-1 group mb-4"
        >
          <Backpack size={18} className="transition-transform group-hover:scale-110 group-hover:-rotate-12" />
          <span className="font-sans text-sm tracking-[0.2em] uppercase font-bold">Things to Carry</span>
        </motion.button>

        {/* SCROLL CUE */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.5 }}
          className="flex flex-col items-center gap-2"
        >
          <div className="w-[1px] h-12 bg-gradient-to-b from-white/20 to-transparent relative overflow-hidden">
            <motion.div 
              animate={{ y: ["-100%", "200%"] }}
              transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
              className="absolute top-0 left-0 w-full h-1/2 bg-gradient-to-b from-transparent via-orange-400 to-transparent"
            />
          </div>
        </motion.div>
      </motion.div>


      {/* MOUNTAIN SILHOUETTE PARALLAX BACKGROUND */}
      <div className="absolute inset-x-0 bottom-0 h-[40vh] pointer-events-none z-0 overflow-hidden flex items-end">
        <motion.svg viewBox="0 0 1440 320" className="absolute bottom-0 w-[150vw] -ml-[25vw] h-auto opacity-20 fill-[#2a3c2f] transform-gpu"><path d="M0,200 C300,50 600,250 1440,100 L1440,320 L0,320 Z" /></motion.svg>
        <motion.svg viewBox="0 0 1440 320" className="absolute bottom-0 w-[120vw] h-auto opacity-40 fill-[#122318] transform-gpu"><path d="M0,250 C400,100 800,300 1440,150 L1440,320 L0,320 Z" /></motion.svg>
        <motion.svg viewBox="0 0 1440 320" className="absolute bottom-0 w-full h-auto opacity-100 fill-[#0a110d] transform-gpu"><path d="M0,300 C300,200 600,250 1440,200 L1440,320 L0,320 Z" /></motion.svg>
        
        {/* Fog/Mist Overlay */}
        <div className="absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-[#0a110d] via-[#0a110d]/80 to-transparent" />
      </div>

    </section>
  );
}
