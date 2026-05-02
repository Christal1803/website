"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export function StatsStrip() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const valueRef = useRef<HTMLSpanElement | null>(null);
  const yearsRef = useRef<HTMLSpanElement | null>(null);

  useGSAP(
    () => {
      gsap.registerPlugin(ScrollTrigger);

      const runCounter = (
        el: HTMLElement | null,
        target: number,
        format: (n: number) => string,
      ) => {
        if (!el) return;
        const obj = { val: 0 };
        gsap.to(obj, {
          val: target,
          duration: 1.5,
          ease: "power2.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 90%",
            toggleActions: "play none none none",
          },
          onUpdate: () => {
            el.textContent = format(obj.val);
          },
        });
      };

      runCounter(valueRef.current, 200, (n) => `${Math.round(n)}`);
      runCounter(yearsRef.current, 25, (n) => `${Math.round(n)}`);
    },
    { scope: sectionRef },
  );

  return (
    <section
      ref={sectionRef}
      aria-label="Firm statistics"
      className="relative flex flex-col items-center justify-center gap-6 border-y border-[rgba(201,169,110,0.12)] bg-[rgba(201,169,110,0.06)] px-8 py-8 md:h-20 md:flex-row md:gap-32 lg:gap-48 md:py-0"
    >
      <div className="flex flex-col items-center gap-1">
        <div className="flex items-baseline font-mono text-[22px] leading-none text-cream">
          <span className="text-[17px] mr-0.5">&#8377;</span>
          <span ref={valueRef}>0</span>
          <span>Cr+</span>
        </div>
        <span className="font-sans text-[12px] text-muted text-center">
          In closed transactions
        </span>
      </div>

      <div className="flex flex-col items-center gap-1">
        <div className="font-mono text-[22px] leading-none text-cream text-center">
          <span ref={yearsRef}>0</span>
          <span>+</span>
        </div>
        <span className="font-sans text-[12px] text-muted text-center">
          Years combined advisory
        </span>
      </div>


      <div className="flex flex-col items-center gap-1">
        <span className="font-mono text-[22px] leading-none text-gold text-center">
          Limited
        </span>
        <span className="font-sans text-[12px] text-muted text-center">
          Client intake per quarter
        </span>
      </div>
    </section>
  );
}
