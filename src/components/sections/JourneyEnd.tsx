"use client";

import { motion } from "framer-motion";
import { Sparkles, Map } from "lucide-react";

export function JourneyEnd() {
  return (
    <section className="relative w-full min-h-[40vh] md:min-h-[70vh] flex flex-col items-center justify-center text-center px-6 py-16 md:py-24 z-10">
      <motion.div 
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2, ease: "easeOut" }}
        viewport={{ once: true, margin: "-100px" }}
        className="max-w-2xl mx-auto flex flex-col items-center"
      >
        <div className="w-[1px] h-12 md:h-24 bg-gradient-to-b from-transparent to-(--color-charcoal)/30 mb-6 md:mb-8" />
        
        <div className="flex items-center gap-3 text-(--color-charcoal)/80 mb-6 bg-(--color-charcoal)/5 px-6 py-2 rounded-full border border-(--color-charcoal)/10">
          <Map size={16} />
          <span className="font-sans text-xs md:text-sm tracking-[0.3em] uppercase font-semibold">Expedition Complete</span>
        </div>

        <h2 className="text-5xl md:text-7xl font-serif text-(--color-charcoal) mb-8 leading-tight">
          Every summit leaves a story behind.
        </h2>

        <p className="text-lg md:text-xl text-(--color-charcoal)/80 font-sans font-medium leading-relaxed mb-12">
          You have navigated the dense forests, crossed roaring rivers, and stood above the clouds at Netravati Peak. As you head back to reality, take these memories with you.
        </p>

        <motion.button 
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="flex items-center gap-2 text-(--color-mist) bg-(--color-charcoal) px-8 py-4 rounded-full font-sans tracking-widest uppercase text-sm shadow-xl hover:shadow-2xl hover:bg-black transition-all"
        >
          <Sparkles size={16} />
          <span>Relive the Journey</span>
        </motion.button>
      </motion.div>
    </section>
  );
}
