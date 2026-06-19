"use client";

import { Leaf, ShieldAlert } from "lucide-react";
import { motion } from "framer-motion";

export function GreenPledge() {
  return (
    <section className="relative w-full px-4 py-12 flex justify-center z-20">
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-4xl bg-[#122318] rounded-3xl p-6 md:p-10 border border-green-500/20 shadow-2xl relative overflow-hidden"
      >
        <div className="absolute inset-0 bg-gradient-to-br from-green-500/10 to-transparent pointer-events-none" />
        
        <div className="relative z-10 flex flex-col md:flex-row items-center gap-6 md:gap-10 text-center md:text-left">
          
          <div className="flex items-center justify-center w-16 h-16 rounded-full bg-green-500/20 border border-green-500/30 shrink-0">
            <Leaf className="text-green-400" size={28} />
          </div>

          <div className="flex-1 space-y-2">
            <h3 className="text-xl md:text-2xl font-serif text-white flex items-center justify-center md:justify-start gap-2">
              The Green Pledge
            </h3>
            <p className="text-white/70 font-sans text-sm md:text-base leading-relaxed">
              We are guests in the Western Ghats. We take a strict pledge to protect these ancient forests. 
              <strong className="text-white"> Leave absolutely no human trash, plastics, or traces on the trails.</strong> Carry everything back. Let's keep the mountains wild and pristine.
            </p>
          </div>

        </div>
      </motion.div>
    </section>
  );
}
