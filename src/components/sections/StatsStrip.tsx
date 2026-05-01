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

      runCounter(
        valueRef.current,
        200,
        (n) => `\u20B9${Math.round(n)}Cr+`,
      );
      runCounter(yearsRef.current, 12, (n) => `${Math.round(n)}+`);
    },
    { scope: sectionRef },
  );

  return (
    <section
      ref={sectionRef}
      aria-label="Firm statistics"
      className="relative flex flex-col items-center justify-center gap-6 border-y border-[rgba(201,169,110,0.12)] bg-[rgba(201,169,110,0.06)] px-8 py-8 md:h-20 md:flex-row md:gap-32 lg:gap-48 md:py-0"
    >
      <div className="flex flex-col items-start gap-1 md:items-start">
        <span
          ref={valueRef}
          className="font-mono text-[22px] leading-none text-cream"
        >
          &#8377;0Cr+
        </span>
        <span className="font-sans text-[12px] text-muted">
          In closed transactions
        </span>
      </div>

      <div className="flex flex-col items-start gap-1 md:items-start">
        <span
          ref={yearsRef}
          className="font-mono text-[22px] leading-none text-cream"
        >
          0+
        </span>
        <span className="font-sans text-[12px] text-muted">
          Years combined advisory
        </span>
      </div>

      <div className="flex flex-col items-start gap-1 md:items-start">
        <span className="font-mono text-[22px] leading-none text-gold">
          Limited
        </span>
        <span className="font-sans text-[12px] text-muted">
          Client intake per quarter
        </span>
      </div>
    </section>
  );
}
