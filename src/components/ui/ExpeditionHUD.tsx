"use client";

import { useEffect, useState } from "react";
import { trekInfo } from "@/content/itinerary";
import { Mountain, Route, Calendar } from "lucide-react";

export function ExpeditionHUD() {
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
    <div className="fixed bottom-4 left-4 right-4 md:bottom-8 md:left-1/2 md:-translate-x-1/2 md:w-auto md:min-w-[400px] z-50 lg:hidden">
      <div className="bg-(--color-canopy)/80 backdrop-blur-xl border border-white/10 rounded-2xl p-4 shadow-2xl flex flex-col gap-3">
        <div className="flex justify-between items-center text-xs font-data text-(--color-mist) uppercase tracking-widest">
          <span>Expedition Progress</span>
          <span className="text-(--color-dawn)">{Math.round(scrollProgress)}%</span>
        </div>
        
        {/* Progress Bar with Day Markers */}
        <div className="relative">
          <div className="w-full h-1.5 bg-black/50 rounded-full relative overflow-hidden">
            {/* Dividers */}
            <div className="absolute top-0 bottom-0 left-[33.33%] w-[2px] bg-(--color-charcoal) z-10" />
            <div className="absolute top-0 bottom-0 left-[66.66%] w-[2px] bg-(--color-charcoal) z-10" />
            
            <div 
              className="absolute top-0 left-0 h-full bg-gradient-to-r from-(--color-moss) to-(--color-dawn) rounded-full transition-all duration-150 ease-out"
              style={{ width: `${scrollProgress}%` }}
            />
          </div>
          
          {/* Day Labels */}
          <div className="flex justify-between w-full mt-1.5 px-4 absolute top-full">
             <span className="text-[9px] font-sans tracking-widest text-(--color-mist)/40 uppercase transform -translate-x-1/2">Day 1</span>
             <span className="text-[9px] font-sans tracking-widest text-(--color-mist)/40 uppercase transform -translate-x-1/2">Day 2</span>
             <span className="text-[9px] font-sans tracking-widest text-(--color-mist)/40 uppercase transform translate-x-4">Day 3</span>
          </div>
        </div>

        {/* Stats */}
        <div className="flex justify-between items-center mt-1">
          <div className="flex items-center gap-1.5 text-sm text-(--color-mist)">
            <Route size={14} className="text-(--color-river)" />
            <span>{currentDistance} km</span>
          </div>
          
          {daysToGo !== null && (
            <div className="flex items-center gap-1.5 text-xs tracking-widest uppercase font-medium text-orange-400">
              <Calendar size={12} />
              <span>{daysToGo} Days To Go</span>
            </div>
          )}

          <div className="flex items-center gap-1.5 text-sm text-(--color-mist)">
            <Mountain size={14} className="text-(--color-dawn)" />
            <span>{currentElevation}m</span>
          </div>
        </div>
      </div>
    </div>
  );
}
