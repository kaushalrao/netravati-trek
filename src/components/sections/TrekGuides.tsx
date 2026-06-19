"use client";

import { motion } from "framer-motion";
import { Users, Compass, ShieldCheck } from "lucide-react";

export function TrekGuides() {
  return (
    <section className="relative w-full px-4 py-16 flex justify-center z-20 bg-(--color-obsidian)">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8 }}
        className="w-full max-w-4xl bg-gradient-to-br from-[#1a2920] to-[#0a110d] rounded-3xl p-8 md:p-12 border border-white/10 shadow-2xl relative overflow-hidden"
      >
        {/* Decorative Topographic pattern */}
        <div className="absolute inset-0 opacity-[0.02] mix-blend-overlay pointer-events-none" style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E\")" }} />

        <div className="relative z-10 flex flex-col md:flex-row gap-8 items-center md:items-start">

          <div className="flex-1 space-y-6 text-center md:text-left">
            <div className="inline-flex items-center gap-2 bg-orange-500/10 text-orange-400 px-4 py-1.5 rounded-full border border-orange-500/20">
              <Users size={14} />
              <span className="text-[10px] uppercase tracking-widest font-bold">The Trek Leads</span>
            </div>

            <h2 className="text-3xl md:text-5xl font-serif text-white leading-tight">
              Meet Your <br /> Expedition Leaders
            </h2>

            <div className="flex flex-col sm:flex-row gap-4 pt-4 justify-center md:justify-start">
              <div className="flex items-center gap-3 bg-black/30 px-4 py-3 rounded-2xl border border-white/5">
                <Compass className="text-orange-400" size={20} />
                <div className="text-left">
                  <div className="text-white text-xs font-bold uppercase tracking-wider">Local Experts</div>
                  <div className="text-white/50 text-[10px]">Born in the Ghats</div>
                </div>
              </div>
            </div>
          </div>

          <div className="w-full md:w-72 flex-shrink-0 grid grid-cols-2 gap-4">
            <div className="aspect-[3/4] bg-black/40 rounded-2xl border border-white/10 overflow-hidden relative group">
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent z-10" />
              <div className="absolute bottom-4 left-4 z-20">
                <div className="text-white font-serif text-lg">Kaushal</div>
                <div className="text-orange-400 text-[10px] uppercase tracking-wider font-bold">Lead Guide</div>
              </div>
              <img src="/kaushal.jpg" alt="Kaushal" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
            </div>
            <div className="aspect-[3/4] bg-black/40 rounded-2xl border border-white/10 overflow-hidden relative group mt-8">
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent z-10" />
              <div className="absolute bottom-4 left-4 z-20">
                <div className="text-white font-serif text-lg">Pankaj</div>
                <div className="text-orange-400 text-[10px] uppercase tracking-wider font-bold">Lead Guide</div>
              </div>
              <img src="/pankaj_pawskar.jpg" alt="Pankaj" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
            </div>
          </div>

        </div>
      </motion.div>
    </section>
  );
}
