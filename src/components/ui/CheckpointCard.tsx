"use client";

import { useState, useRef, useEffect } from "react";
import { Checkpoint } from "@/content/itinerary";
import { Clock, MapPin, Mountain, ChevronDown, Sparkles, ExternalLink } from "lucide-react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import clsx from "clsx";
import Image from "next/image";
import confetti from "canvas-confetti";

interface CheckpointCardProps {
  checkpoint: Checkpoint;
}

export function CheckpointCard({ checkpoint }: CheckpointCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(cardRef, { once: true, amount: 0.5 });

  useEffect(() => {
    if (isInView && checkpoint.id === "d1-summit") {
      const duration = 3 * 1000;
      const animationEnd = Date.now() + duration;
      const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 100 };

      const randomInRange = (min: number, max: number) => Math.random() * (max - min) + min;

      const interval: any = setInterval(function() {
        const timeLeft = animationEnd - Date.now();

        if (timeLeft <= 0) {
          return clearInterval(interval);
        }

        const particleCount = 50 * (timeLeft / duration);
        confetti(Object.assign({}, defaults, { particleCount, origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 } }));
        confetti(Object.assign({}, defaults, { particleCount, origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 } }));
      }, 250);
      
      return () => clearInterval(interval);
    }
  }, [isInView, checkpoint.id]);

  return (
    <motion.div 
      ref={cardRef}
      layout
      onClick={() => setIsExpanded(!isExpanded)}
      className={clsx(
        "relative z-10 w-full max-w-lg rounded-3xl backdrop-blur-xl border border-white/10 cursor-pointer overflow-hidden group",
        "bg-(--color-charcoal)/90 shadow-2xl transition-colors hover:bg-(--color-moss)/40 texture-overlay",
        "mb-12 ml-auto flex flex-col"
      )}
    >
      {/* Editorial Image Header */}
      {checkpoint.imageUrl && (
        <div className="relative w-full h-48 md:h-56 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-t from-(--color-charcoal)/90 to-transparent z-10" />
          <motion.div 
            className="relative w-full h-full"
            animate={{ scale: isExpanded ? 1.05 : 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <Image 
              src={checkpoint.imageUrl} 
              alt={checkpoint.title} 
              fill 
              className="object-cover"
            />
          </motion.div>
        </div>
      )}

      {/* Content wrapper */}
      <div className={clsx("relative z-20 p-5 md:p-6", checkpoint.imageUrl ? "-mt-8" : "")}>
        <motion.div layout className="flex justify-between items-start mb-4">
          <div className="flex items-center gap-3 text-sm font-sans text-(--color-dawn) tracking-widest uppercase bg-(--color-charcoal) px-3 py-1.5 rounded-full border border-white/10 shadow-lg">
            {checkpoint.time && (
              <div className="flex items-center gap-1.5">
                <Clock size={14} />
                <span>{checkpoint.time}</span>
              </div>
            )}
            {checkpoint.time && <div className="w-[1px] h-3 bg-white/20" />}
            <div className="flex items-center gap-1.5 text-(--color-mist)">
              <Mountain size={14} className="text-(--color-river)" />
              <span>{checkpoint.elevationM}m</span>
            </div>
          </div>
        </motion.div>
      
        <motion.h3 layout className="text-2xl md:text-3xl font-serif text-(--color-mist) mb-2 tracking-wide font-medium">
          {checkpoint.title}
        </motion.h3>
      
        <motion.div layout className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-(--color-river) text-sm font-sans">
            <MapPin size={14} />
            {checkpoint.link ? (
              <a 
                href={checkpoint.link} 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center gap-1 hover:text-(--color-dawn) transition-colors"
                onClick={(e) => e.stopPropagation()}
              >
                <span className="underline underline-offset-2">{checkpoint.location}</span>
                <ExternalLink size={12} />
              </a>
            ) : (
              <span>{checkpoint.location}</span>
            )}
          </div>
          <motion.div 
            animate={{ rotate: isExpanded ? 180 : 0 }}
            className="bg-white/10 p-1.5 rounded-full"
          >
            <ChevronDown size={16} className="text-(--color-mist)" />
          </motion.div>
        </motion.div>

        <AnimatePresence initial={false}>
          {isExpanded && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="overflow-hidden"
            >
              <div className="pt-6">
                <p className="text-(--color-mist)/90 leading-relaxed font-sans text-base md:text-lg mb-6 font-light">
                {checkpoint.description}
              </p>

              {checkpoint.funFact && (
                <div className="bg-(--color-canopy)/80 border border-(--color-dawn)/20 rounded-xl p-5 mb-6">
                  <div className="flex items-center gap-2 text-(--color-dawn) mb-2">
                    <Sparkles size={14} />
                    <span className="text-xs font-sans tracking-widest uppercase">Expedition Note</span>
                  </div>
                  <p className="text-(--color-mist) font-serif italic">
                    &quot;{checkpoint.funFact}&quot;
                  </p>
                </div>
              )}

              {checkpoint.tags && (
                <div className="flex flex-wrap gap-2">
                  {checkpoint.tags.map((tag) => (
                    <span 
                      key={tag} 
                      className="px-3 py-1 bg-white/5 border border-white/10 rounded-full text-xs text-(--color-mist)/70 font-sans tracking-widest uppercase"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}
