"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { clsx } from "clsx";

gsap.registerPlugin(ScrollTrigger);

interface StoryInterstitialProps {
  text: string;
  align?: "left" | "right" | "center";
}

export function StoryInterstitial({ text, align = "center" }: StoryInterstitialProps) {
  const textRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (textRef.current) {
        // Split text into words (simple split for demo purposes, robust split would use SplitText or similar)
        const words = text.split(" ");
        textRef.current.innerHTML = words.map(w => `<span class="inline-block opacity-20 mr-2 md:mr-3">${w}</span>`).join("");
        
        const spans = textRef.current.querySelectorAll("span");
        
        gsap.to(spans, {
          opacity: 1,
          stagger: 0.05,
          ease: "none",
          scrollTrigger: {
            trigger: textRef.current,
            start: "top 80%",
            end: "bottom 50%",
            scrub: true,
          }
        });
      }
    });
    return () => ctx.revert();
  }, [text]);

  return (
    <div className="min-h-[40vh] md:min-h-[70vh] flex items-center justify-center py-16 md:py-24 relative texture-overlay">
      <div className={clsx(
        "max-w-4xl mx-auto px-6 relative z-10 mb-12 md:mb-0 w-full",
        align === "left" ? "lg:mr-auto lg:ml-[10%]" : 
        align === "right" ? "lg:ml-auto lg:mr-[10%]" : 
        "text-center"
      )}>
        <p 
          ref={textRef}
          className={clsx(
            "text-4xl md:text-5xl lg:text-6xl lg:leading-tight font-serif text-white leading-tight md:leading-tight drop-shadow-[0_4px_16px_rgba(0,0,0,0.8)]",
            align === "left" ? "lg:text-left" : 
            align === "right" ? "lg:text-right" : 
            "text-center"
          )}
        >
          {text}
        </p>
      </div>
    </div>
  );
}
