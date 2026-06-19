"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  CloudRain, TriangleAlert, CheckCircle2, Circle, 
  ChevronDown, XCircle, Backpack, Umbrella, Droplets, X
} from "lucide-react";
import { mustCarryItems, packingCategories, prohibitedItems } from "@/content/packingList";
import clsx from "clsx";

export function PackingGuide() {
  const [isOpen, setIsOpen] = useState(false);
  const [packedItems, setPackedItems] = useState<Set<string>>(new Set());
  const [expandedCategories, setExpandedCategories] = useState<Set<string>>(new Set([packingCategories[0].id]));
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    const saved = localStorage.getItem("netravati_packing_progress");
    if (saved) {
      try {
        setPackedItems(new Set(JSON.parse(saved)));
      } catch (e) {
        console.error("Failed to parse packing progress", e);
      }
    }
  }, []);

  useEffect(() => {
    if (isMounted) {
      localStorage.setItem("netravati_packing_progress", JSON.stringify(Array.from(packedItems)));
    }
  }, [packedItems, isMounted]);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => { document.body.style.overflow = "unset"; };
  }, [isOpen]);

  const toggleItem = (id: string) => {
    setPackedItems(prev => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const toggleCategory = (id: string) => {
    setExpandedCategories(prev => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const totalItems = mustCarryItems.length + packingCategories.reduce((acc, cat) => acc + cat.items.length, 0);
  const progressPercentage = Math.round((packedItems.size / totalItems) * 100) || 0;

  if (!isMounted) return null;

  return (
    <>
      {/* Floating Action Button */}
      <motion.button
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setIsOpen(true)}
        className="fixed bottom-36 right-6 md:bottom-40 md:right-10 z-[60] bg-(--color-charcoal) text-(--color-dawn) border border-orange-500/30 shadow-[0_0_30px_rgba(255,183,3,0.2)] p-4 rounded-full flex items-center justify-center group hover:bg-black transition-colors"
      >
        {/* Pulsing Ring */}
        <div className="absolute inset-0 rounded-full border border-orange-500/50 animate-ping opacity-50" />
        
        <div className="relative">
          <Backpack size={24} className="text-orange-400" />
          {packedItems.size > 0 && packedItems.size < totalItems && (
            <span className="absolute -top-1 -right-1 w-3 h-3 bg-orange-500 rounded-full shadow-[0_0_10px_rgba(255,183,3,1)]" />
          )}
          {packedItems.size === totalItems && (
            <span className="absolute -top-1 -right-1 w-3 h-3 bg-emerald-500 rounded-full shadow-[0_0_10px_rgba(16,185,129,1)]" />
          )}
        </div>
      </motion.button>

      {/* Full Screen Modal */}
      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8">
            <motion.div 
              initial={{ opacity: 0 }} 
              animate={{ opacity: 1 }} 
              exit={{ opacity: 0 }} 
              className="absolute inset-0 bg-black/60 backdrop-blur-md"
              onClick={() => setIsOpen(false)}
            />
            
            <motion.div 
              initial={{ opacity: 0, y: 50, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.95 }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="relative w-full max-w-4xl max-h-full bg-(--color-charcoal) rounded-3xl md:rounded-[2.5rem] shadow-2xl border border-white/10 overflow-hidden flex flex-col"
            >
              {/* Modal Header */}
              <div className="sticky top-0 z-20 flex justify-between items-center p-6 md:p-8 bg-(--color-charcoal) border-b border-white/5">
                <div>
                  <h2 className="text-3xl md:text-4xl font-serif text-(--color-mist)">Things To Carry</h2>
                  <p className="text-sm md:text-base text-white/50 font-sans mt-1">Pack smart. Travel light. Stay dry.</p>
                </div>
                <button 
                  onClick={() => setIsOpen(false)}
                  className="bg-white/5 hover:bg-white/10 p-2 rounded-full transition-colors"
                >
                  <X size={24} className="text-white/70" />
                </button>
              </div>

              {/* Scrollable Content Area */}
              <div className="overflow-y-auto flex-1 p-6 md:p-8 pb-32 custom-scrollbar overscroll-contain transform-gpu">
                
                {/* Monsoon Advisory */}
                <div className="bg-orange-900/20 border border-orange-500/30 rounded-3xl p-6 md:p-8 mb-12 flex flex-col md:flex-row gap-6 items-start">
                  <div className="bg-orange-500/20 p-4 rounded-full text-orange-400">
                    <TriangleAlert size={32} />
                  </div>
                  <div>
                    <h3 className="text-2xl font-serif text-orange-300 mb-2">Monsoon Trek Advisory</h3>
                    <p className="text-orange-200/80 font-sans leading-relaxed mb-4">
                      Expect heavy rain, slippery trails, river crossings, and muddy sections. Proper rain protection and trekking shoes with excellent grip are absolutely mandatory.
                    </p>
                    <div className="flex gap-4">
                      <span className="flex items-center gap-2 text-[10px] md:text-xs uppercase tracking-widest text-orange-300/80 bg-orange-500/10 px-3 py-1.5 rounded-full border border-orange-500/20">
                        <CloudRain size={14} /> Rain
                      </span>
                      <span className="flex items-center gap-2 text-[10px] md:text-xs uppercase tracking-widest text-orange-300/80 bg-orange-500/10 px-3 py-1.5 rounded-full border border-orange-500/20">
                        <Droplets size={14} /> River Crossings
                      </span>
                    </div>
                  </div>
                </div>

                {/* Must Carry Highlight Cards */}
                <div className="mb-12">
                  <h3 className="flex items-center gap-3 text-lg md:text-xl font-sans tracking-widest uppercase text-(--color-dawn) mb-6">
                    <Backpack size={20} />
                    Must Carry
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {mustCarryItems.map(item => {
                      const isPacked = packedItems.has(item.id);
                      return (
                        <div 
                          key={item.id}
                          onClick={() => toggleItem(item.id)}
                          className={clsx(
                            "relative p-5 md:p-6 rounded-2xl border cursor-pointer transition-all duration-300 overflow-hidden",
                            isPacked 
                              ? "bg-black/40 border-white/5 opacity-50 grayscale-[50%]" 
                              : "bg-black/20 border-white/5 hover:bg-white/5"
                          )}
                        >
                          <div className="flex justify-between items-start mb-3">
                            <h4 className={clsx("font-serif text-lg md:text-xl transition-colors pr-6", isPacked ? "text-white/50 line-through" : "text-white")}>
                              {item.name}
                            </h4>
                            {isPacked ? (
                              <CheckCircle2 className="text-emerald-500 shrink-0" />
                            ) : (
                              <Circle className="text-white/20 shrink-0" />
                            )}
                          </div>
                          <p className={clsx("text-xs md:text-sm font-sans", isPacked ? "text-white/30" : "text-white/60")}>
                            {item.description}
                          </p>
                          {item.isRequired && (
                            <div className="absolute top-0 right-0 bg-red-500/20 text-red-300 text-[9px] uppercase tracking-widest px-2 py-1 rounded-bl-lg">
                              Required
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Categorized Accordions */}
                <div className="mb-12 flex flex-col gap-4">
                  {packingCategories.map(category => {
                    const isExpanded = expandedCategories.has(category.id);
                    const categoryPackedCount = category.items.filter(i => packedItems.has(i.id)).length;
                    const isAllPacked = categoryPackedCount === category.items.length;

                    return (
                      <div key={category.id} className="bg-black/20 border border-white/5 rounded-2xl overflow-hidden">
                        <div 
                          className="flex items-center justify-between p-5 md:p-6 cursor-pointer hover:bg-white/5 transition-colors"
                          onClick={() => toggleCategory(category.id)}
                        >
                          <div className="flex items-center gap-4">
                            <h3 className={clsx("text-lg md:text-xl font-serif", isAllPacked ? "text-emerald-500" : "text-(--color-mist)")}>
                              {category.title}
                            </h3>
                            <span className="text-[10px] md:text-xs font-sans tracking-widest text-white/40">
                              {categoryPackedCount} / {category.items.length}
                            </span>
                          </div>
                          <ChevronDown 
                            className={clsx("text-white/40 transition-transform duration-300", isExpanded && "rotate-180")} 
                          />
                        </div>

                        <AnimatePresence>
                          {isExpanded && (
                            <motion.div
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: "auto", opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              className="overflow-hidden"
                            >
                              <div className="p-5 md:p-6 pt-0 flex flex-col gap-2">
                                {category.items.map(item => {
                                  const isPacked = packedItems.has(item.id);
                                  return (
                                    <div 
                                      key={item.id}
                                      onClick={() => toggleItem(item.id)}
                                      className={clsx(
                                        "flex items-start gap-3 md:gap-4 p-3 md:p-4 rounded-xl cursor-pointer transition-colors",
                                        isPacked ? "bg-black/20 opacity-50" : "hover:bg-white/5"
                                      )}
                                    >
                                      <div className="mt-0.5 md:mt-1">
                                        {isPacked ? (
                                          <CheckCircle2 size={18} className="text-emerald-500" />
                                        ) : (
                                          <Circle size={18} className="text-white/20" />
                                        )}
                                      </div>
                                      <div>
                                        <h4 className={clsx("font-serif text-base md:text-lg", isPacked ? "text-white/50 line-through" : "text-white")}>
                                          {item.name}
                                        </h4>
                                        <p className={clsx("text-xs md:text-sm font-sans mt-0.5", isPacked ? "text-white/30" : "text-white/60")}>
                                          {item.description}
                                        </p>
                                      </div>
                                    </div>
                                  );
                                })}
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    );
                  })}
                </div>

                {/* What NOT to bring */}
                <div className="bg-red-900/10 border border-red-500/20 rounded-3xl p-6 md:p-8">
                  <h3 className="text-lg font-sans tracking-widest uppercase text-red-400 mb-6 flex items-center gap-3">
                    <XCircle size={20} />
                    What NOT to bring
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                    {prohibitedItems.map(item => (
                      <div key={item} className="flex items-center gap-2 text-red-200/70 font-sans text-sm">
                        <XCircle size={14} className="text-red-500/50" />
                        {item}
                      </div>
                    ))}
                  </div>
                </div>

              </div>

              {/* Sticky Progress Bar at bottom of Modal */}
              <div className="absolute bottom-0 left-0 w-full bg-(--color-charcoal) border-t border-white/10 p-5 md:p-6 z-20">
                <div className="flex flex-col md:flex-row items-center gap-4 md:gap-8">
                  <div className="flex justify-between w-full md:w-auto items-center gap-4">
                    <span className="font-sans text-[10px] md:text-xs uppercase tracking-widest text-(--color-dawn)">
                      Packing Progress
                    </span>
                    <span className="font-serif text-lg md:text-xl text-white">
                      {progressPercentage}%
                    </span>
                  </div>
                  <div className="flex-1 w-full h-2 bg-black/50 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-gradient-to-r from-(--color-moss) to-(--color-dawn) rounded-full transition-all duration-500 ease-out"
                      style={{ width: `${progressPercentage}%` }}
                    />
                  </div>
                  <div className="hidden md:block font-sans text-xs uppercase tracking-widest text-white/40">
                    {packedItems.size} / {totalItems} Items
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
