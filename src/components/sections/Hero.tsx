import { trekInfo } from "@/content/itinerary";
import { ChevronDown } from "lucide-react";

export function Hero() {
  return (
    <section className="relative w-full h-screen flex flex-col items-center justify-center overflow-hidden z-10">
      <div className="text-center px-6 max-w-4xl mx-auto mt-20">
        <h4 className="font-sans text-(--color-charcoal)/80 uppercase tracking-[0.3em] text-sm md:text-base mb-6 font-semibold">
          {trekInfo.region}
        </h4>
        <h1 className="font-serif text-6xl md:text-8xl lg:text-9xl text-(--color-charcoal) leading-tight mb-8">
          {trekInfo.name}
        </h1>
        <div className="flex flex-wrap items-center justify-center gap-6 font-sans text-lg text-(--color-charcoal)/80 font-medium">
          <span>{trekInfo.dates}</span>
          <span className="w-1.5 h-1.5 rounded-full bg-(--color-charcoal)/50" />
          <span>{trekInfo.totalDistanceKm}km Total</span>
          <span className="w-1.5 h-1.5 rounded-full bg-(--color-charcoal)/50" />
          <span>{trekInfo.summitElevationM}m Summit</span>
        </div>
      </div>

      <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4 animate-pulse">
        <span className="font-sans text-xs tracking-[0.2em] text-(--color-charcoal)/60 uppercase font-semibold">
          Begin Journey
        </span>
        <ChevronDown className="text-(--color-charcoal)/80" size={24} />
      </div>
    </section>
  );
}
