"use client";

import { useEffect, useRef } from "react";
import { Checkpoint } from "@/content/itinerary";
import { CheckpointCard } from "@/components/ui/CheckpointCard";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion, useScroll, useTransform } from "framer-motion";
import { Mountain, Map, Clock, Footprints } from "lucide-react";
import clsx from "clsx";

gsap.registerPlugin(ScrollTrigger);

export interface TimelineDayMetadata {
  elevationGain: string;
  distance: string;
  duration: string;
  terrain: string[];
  theme: "forest" | "exploration" | "farewell";
  highlights: string[];
}

interface TimelineDayProps {
  dayNumber: 1 | 2 | 3;
  title: string;
  subtitle: string;
  checkpoints: Checkpoint[];
  metadata: TimelineDayMetadata;
}

export function TimelineDay({ dayNumber, title, subtitle, checkpoints, metadata }: TimelineDayProps) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const coverRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  const { scrollYProgress } = useScroll({
    target: coverRef,
    offset: ["start end", "end start"]
  });

  const y1 = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);
  const y2 = useTransform(scrollYProgress, [0, 1], ["0%", "40%"]);
  const y3 = useTransform(scrollYProgress, [0, 1], ["0%", "60%"]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animate Checkpoint Cards
      cardsRef.current.forEach((card) => {
        if (!card) return;
        gsap.fromTo(card,
          { opacity: 0, y: 50, scale: 0.95 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.8,
            ease: "power3.out",
            scrollTrigger: {
              trigger: card,
              start: "top 85%",
              toggleActions: "play none none reverse"
            }
          }
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const themeColors = {
    forest: { bg: "bg-(--color-charcoal)", text: "text-(--color-moss)", accent: "bg-(--color-moss)" },
    exploration: { bg: "bg-(--color-river)", text: "text-(--color-mist)", accent: "bg-(--color-mist)" },
    farewell: { bg: "bg-(--color-dawn)", text: "text-(--color-charcoal)", accent: "bg-(--color-charcoal)" }
  };

  const colors = themeColors[metadata.theme];

  return (
    <section ref={sectionRef} className="relative w-full max-w-5xl mx-auto px-4 md:px-6 py-24 z-10">
      
      {/* --- CHAPTER COVER --- */}
      <div 
        ref={coverRef}
        className={clsx(
          "relative w-full min-h-[65vh] rounded-[2rem] md:rounded-[3rem] overflow-hidden shadow-2xl mb-24 border border-white/10 flex flex-col justify-between",
          metadata.theme === "forest" ? "bg-gradient-to-b from-[#1a2920] to-[#0a110d]" :
          metadata.theme === "exploration" ? "bg-gradient-to-b from-[#2c4e5c] to-[#12232b]" :
          "bg-gradient-to-b from-[#b87c4c] to-[#4a301f]"
        )}
      >
        {/* Topographic Noise Texture */}
        <div className="absolute inset-0 opacity-10 mix-blend-overlay pointer-events-none" style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E\")" }} />

        {/* Topographic SVG Lines (Abstract) */}
        <svg className="absolute inset-0 w-full h-full opacity-10 pointer-events-none" viewBox="0 0 100 100" preserveAspectRatio="none">
          <path d="M0,20 Q25,10 50,30 T100,20" fill="none" stroke="white" strokeWidth="0.5" />
          <path d="M0,40 Q25,30 50,50 T100,40" fill="none" stroke="white" strokeWidth="0.5" />
          <path d="M0,60 Q25,50 50,70 T100,60" fill="none" stroke="white" strokeWidth="0.5" />
          <path d="M0,80 Q25,70 50,90 T100,80" fill="none" stroke="white" strokeWidth="0.5" />
        </svg>

        {/* Dynamic Landscape Layers */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {metadata.theme === "forest" && (
            <>
              <motion.svg style={{ y: y3 }} viewBox="0 0 1440 320" className="absolute bottom-12 w-full h-auto opacity-30 fill-(--color-moss)"><path d="M0,160 C300,50 600,250 1440,100 L1440,320 L0,320 Z" /></motion.svg>
              <motion.svg style={{ y: y2 }} viewBox="0 0 1440 320" className="absolute bottom-0 w-[150vw] -ml-[25vw] h-auto opacity-60 fill-[#122318]"><path d="M0,200 C400,300 800,100 1440,250 L1440,320 L0,320 Z" /></motion.svg>
            </>
          )}
          {metadata.theme === "exploration" && (
            <>
              <motion.svg style={{ y: y3 }} viewBox="0 0 1440 320" className="absolute bottom-20 w-[120vw] h-auto opacity-40 fill-[#5ba6c7]"><path d="M0,100 L100,200 L300,50 L500,250 L700,100 L1000,300 L1440,50 L1440,320 L0,320 Z" /></motion.svg>
              <motion.svg style={{ y: y2 }} viewBox="0 0 1440 320" className="absolute bottom-0 w-[150vw] -ml-[25vw] h-auto opacity-70 fill-[#1a3845]"><path d="M0,250 C300,100 600,300 1440,200 L1440,320 L0,320 Z" /></motion.svg>
            </>
          )}
          {metadata.theme === "farewell" && (
            <>
              <motion.svg style={{ y: y3 }} viewBox="0 0 1440 320" className="absolute bottom-16 w-full h-auto opacity-40 fill-[#e8a368]"><path d="M0,250 Q300,50 600,200 T1440,150 L1440,320 L0,320 Z" /></motion.svg>
              <motion.svg style={{ y: y2 }} viewBox="0 0 1440 320" className="absolute bottom-0 w-[120vw] h-auto opacity-80 fill-[#4a301f]"><path d="M0,300 Q400,150 800,250 T1440,200 L1440,320 L0,320 Z" /></motion.svg>
            </>
          )}
          <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-black/60 to-transparent" />
        </div>

        {/* Cover Content */}
        <div className="relative z-10 flex flex-col h-full p-8 md:p-12">
          
          {/* Top Row: Progress */}
          <div className="flex items-center gap-4 w-full opacity-80">
            <span className="font-sans text-xs md:text-sm text-white tracking-[0.3em] font-medium">DAY {dayNumber}</span>
            <div className="flex-1 h-[1px] bg-white/20 relative">
              <motion.div 
                className="absolute left-0 top-0 h-full bg-white" 
                initial={{ width: 0 }}
                whileInView={{ width: "100%" }}
                transition={{ duration: 1.5, ease: "easeInOut", delay: 0.2 }}
                viewport={{ once: true }}
              />
            </div>
            <span className="font-sans text-xs md:text-sm text-white/50 tracking-widest">0{dayNumber} / 03</span>
          </div>

          {/* Middle Row: Title & Highlights */}
          <div className="flex flex-col lg:flex-row lg:items-end justify-between mt-auto mb-12 gap-12">
            <div className="max-w-2xl">
              <motion.h2 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="text-6xl md:text-8xl lg:text-9xl font-serif text-white leading-[0.9] mb-4"
              >
                {title}
              </motion.h2>
              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.1 }}
                className="text-xl md:text-3xl text-white/80 font-sans font-light italic"
              >
                {subtitle}
              </motion.p>
            </div>

            {/* Highlights Divider List */}
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="flex flex-col gap-3 border-l border-white/20 pl-6 lg:min-w-[200px]"
            >
              {metadata.highlights.map((hl, i) => (
                <span key={i} className="text-white/70 font-sans text-sm tracking-widest uppercase">
                  {hl}
                </span>
              ))}
            </motion.div>
          </div>

          {/* Bottom Row: Metadata Grid */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-8 border-t border-white/20"
          >
            <div className="flex flex-col gap-1">
              <div className="flex items-center gap-1.5 text-white/50 mb-1"><Map size={14}/><span className="text-[10px] uppercase tracking-widest">Distance</span></div>
              <span className="text-white font-serif text-xl md:text-2xl">{metadata.distance}</span>
            </div>
            <div className="flex flex-col gap-1">
              <div className="flex items-center gap-1.5 text-white/50 mb-1"><Mountain size={14}/><span className="text-[10px] uppercase tracking-widest">Elevation Gain</span></div>
              <span className="text-white font-serif text-xl md:text-2xl">{metadata.elevationGain}</span>
            </div>
            <div className="flex flex-col gap-1">
              <div className="flex items-center gap-1.5 text-white/50 mb-1"><Clock size={14}/><span className="text-[10px] uppercase tracking-widest">Duration</span></div>
              <span className="text-white font-serif text-xl md:text-2xl">{metadata.duration}</span>
            </div>
            <div className="flex flex-col gap-1">
              <div className="flex items-center gap-1.5 text-white/50 mb-1"><Footprints size={14}/><span className="text-[10px] uppercase tracking-widest">Terrain</span></div>
              <div className="flex flex-wrap gap-1.5 mt-1">
                {metadata.terrain.map(t => (
                  <span key={t} className="px-2 py-0.5 border border-white/20 rounded-full text-[10px] text-white/80 uppercase tracking-widest">
                    {t}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>

        </div>
      </div>

      {/* --- TIMELINE CHECKPOINTS --- */}
      <div className="relative">
        <div className="flex flex-col gap-8 md:gap-16">
          {checkpoints.map((cp, idx) => (
            <div 
              key={cp.id} 
              ref={el => { cardsRef.current[idx] = el; }}
              className={`w-full flex ${idx % 2 === 0 ? 'md:justify-start' : 'md:justify-end'}`}
            >
              <div className="w-full md:w-[60%] lg:w-[45%]">
                <CheckpointCard checkpoint={cp} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
