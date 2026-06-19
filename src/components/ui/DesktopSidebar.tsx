"use client";

import { useEffect, useState } from "react";
import { trekInfo } from "@/content/itinerary";
import { Mountain, Route, Calendar, Compass } from "lucide-react";
import { motion } from "framer-motion";

export function DesktopSidebar() {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [daysToGo, setDaysToGo] = useState<number | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = Math.min(100, Math.max(0, (window.scrollY / totalHeight) * 100));
      setScrollProgress(progress);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const now = new Date();
    let target = new Date(now.getFullYear(), 5, 26); 
    
    if (now > target) {
      target = new Date(now.getFullYear() + 1, 5, 26);
    }

    const diffTime = Math.abs(target.getTime() - now.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)); 
    setDaysToGo(diffDays);
  }, []);

  const currentDistance = (trekInfo.totalDistanceKm * (scrollProgress / 100)).toFixed(1);
  const currentElevation = Math.round(
    trekInfo.baseElevationM + (trekInfo.summitElevationM - trekInfo.baseElevationM) * (scrollProgress / 100)
  );

  return (
    <div className="hidden lg:flex fixed top-0 left-0 w-[320px] h-screen bg-(--color-charcoal)/95 backdrop-blur-2xl border-r border-white/10 z-[100] flex-col justify-between p-8 xl:p-12">
      {/* Top Branding */}
      <div>
        <div className="flex items-center gap-3 text-(--color-dawn) mb-12">
          <Compass size={24} />
          <span className="font-serif text-xl tracking-widest uppercase">Netravati</span>
        </div>
        
        <p className="font-sans text-xs text-white/50 leading-relaxed uppercase tracking-widest mb-16">
          Western Ghats Expedition <br/> 3 Days / 2 Nights
        </p>
      </div>

      {/* Middle Vertical Progress */}
      <div className="flex-1 flex items-stretch gap-8 relative my-8">
        {/* Vertical Bar */}
        <div className="w-1.5 h-full bg-black/50 rounded-full relative overflow-hidden">
          {/* Day Ticks */}
          <div className="absolute left-0 right-0 top-[33.33%] h-[2px] bg-white/20 z-10" />
          <div className="absolute left-0 right-0 top-[66.66%] h-[2px] bg-white/20 z-10" />
          
          <motion.div 
            className="absolute top-0 left-0 w-full bg-gradient-to-b from-(--color-moss) to-(--color-dawn) rounded-full"
            style={{ height: `${scrollProgress}%` }}
            transition={{ ease: "easeOut", duration: 0.15 }}
          />
        </div>

        {/* Labels positioned relative to the bar */}
        <div className="relative flex-1 py-1">
          <div className="absolute top-0 -translate-y-1/2 flex items-center gap-3 text-white/40">
            <span className="text-[10px] font-sans tracking-widest uppercase">Start</span>
          </div>
          <div className="absolute top-[33.33%] -translate-y-1/2 flex items-center gap-3">
            <span className={`text-[10px] font-sans tracking-widest uppercase transition-colors ${scrollProgress >= 33.33 ? 'text-(--color-mist)' : 'text-white/40'}`}>Day 1</span>
          </div>
          <div className="absolute top-[66.66%] -translate-y-1/2 flex items-center gap-3">
            <span className={`text-[10px] font-sans tracking-widest uppercase transition-colors ${scrollProgress >= 66.66 ? 'text-(--color-mist)' : 'text-white/40'}`}>Day 2</span>
          </div>
          <div className="absolute bottom-0 translate-y-1/2 flex items-center gap-3 text-white/40">
            <span className={`text-[10px] font-sans tracking-widest uppercase transition-colors ${scrollProgress >= 98 ? 'text-(--color-dawn)' : 'text-white/40'}`}>Day 3</span>
          </div>
        </div>
      </div>

      {/* Bottom Stats */}
      <div className="flex flex-col gap-6 pt-12 border-t border-white/10 mt-auto">
        <div className="flex justify-between items-center text-xs font-data text-white/50 uppercase tracking-widest">
          <span>Completion</span>
          <span className="text-(--color-dawn)">{Math.round(scrollProgress)}%</span>
        </div>

        <div className="grid grid-cols-2 gap-y-6 gap-x-4">
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-2 text-white/40">
              <Route size={14} />
              <span className="text-[9px] uppercase tracking-widest">Distance</span>
            </div>
            <span className="font-serif text-lg text-white">{currentDistance} km</span>
          </div>
          
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-2 text-white/40">
              <Mountain size={14} />
              <span className="text-[9px] uppercase tracking-widest">Elevation</span>
            </div>
            <span className="font-serif text-lg text-white">{currentElevation}m</span>
          </div>

          {daysToGo !== null && (
            <div className="col-span-2 flex items-center gap-3 bg-white/5 border border-white/10 rounded-xl p-3">
              <Calendar size={14} className="text-orange-400" />
              <span className="text-[10px] uppercase tracking-widest text-orange-400">{daysToGo} Days To Go</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
