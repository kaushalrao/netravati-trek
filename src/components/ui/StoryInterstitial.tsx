"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface StoryInterstitialProps {
  text: string;
}

export function StoryInterstitial({ text }: StoryInterstitialProps) {
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
    <div className="min-h-[70vh] flex items-center justify-center py-24 relative texture-overlay">
      <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
        <p 
          ref={textRef}
          className="text-4xl md:text-5xl lg:text-6xl font-serif text-(--color-mist) leading-tight md:leading-tight"
        >
          {text}
        </p>
      </div>
    </div>
  );
}
