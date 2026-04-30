"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { cn } from "@/lib/utils";
import { openContactDrawer } from "@/lib/events";

const HEADLINE_WORDS = [
  "Not",
  "every",
  "property",
  "deserves",
  "your",
  "time.",
];

const PILLARS = [
  {
    id: "O1",
    name: "Location Longevity",
    question:
      "Will this location still be desirable 10\u201315 years from now?",
  },
  {
    id: "O2",
    name: "Developer Credibility",
    question:
      "Does the developer have the discipline to deliver what they promise?",
  },
  {
    id: "O3",
    name: "Liquidity Potential",
    question:
      "If you decide to exit, will there be demand for what you\u2019re holding?",
  },
  {
    id: "O4",
    name: "Value vs Pricing",
    question: "Are you paying for real value, or just marketing?",
  },
  {
    id: "O5",
    name: "Investment Fit",
    question:
      "Does this align with your personal strategy and risk profile?",
  },
];

export default function RareScorePage() {
  const pageRef = useRef<HTMLDivElement | null>(null);
  const heroRef = useRef<HTMLElement | null>(null);
  const gridRef = useRef<HTMLDivElement | null>(null);
  const closingRef = useRef<HTMLElement | null>(null);

  useGSAP(
    () => {
      gsap.registerPlugin(ScrollTrigger);

      const words = heroRef.current?.querySelectorAll<HTMLElement>(
        "[data-word]",
      );
      if (words && words.length > 0) {
        gsap.fromTo(
          Array.from(words),
          { opacity: 0, y: 40 },
          {
            opacity: 1,
            y: 0,
            duration: 0.9,
            stagger: 0.04,
            ease: "power3.out",
          },
        );
      }

      const cards = gridRef.current?.querySelectorAll<HTMLElement>(
        "[data-pillar]",
      );
      if (cards && cards.length > 0) {
        gsap.fromTo(
          Array.from(cards),
          { opacity: 0, y: 20 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            stagger: 0.08,
            ease: "power3.out",
            scrollTrigger: {
              trigger: gridRef.current,
              start: "top 85%",
              toggleActions: "play none none none",
            },
          },
        );
      }

      const closingLines = closingRef.current?.querySelectorAll<HTMLElement>(
        "[data-close]",
      );
      if (closingLines && closingLines.length > 0) {
        gsap.fromTo(
          Array.from(closingLines),
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 0.9,
            stagger: 0.1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: closingRef.current,
              start: "top 80%",
              toggleActions: "play none none none",
            },
          },
        );
      }
    },
    { scope: pageRef },
  );

  const openContact = openContactDrawer;

  return (
    <main ref={pageRef}>
      <section
        ref={heroRef}
        className="relative bg-cream pb-20 pt-40 md:pt-[160px]"
      >
        <div className="mx-auto max-w-4xl px-8">
          <div className="h-px w-10 bg-gold-dark" aria-hidden />

          <h1
            className="mt-12 flex flex-wrap gap-x-[0.25em] font-display font-light italic leading-[1.0] text-dark"
            style={{ fontSize: "clamp(36px, 5vw, 72px)" }}
          >
            {HEADLINE_WORDS.map((word, i) => (
              <span
                key={i}
                data-word
                className="inline-block opacity-0 will-change-transform"
              >
                {word}
              </span>
            ))}
          </h1>

          <p className="mt-8 max-w-2xl font-sans text-base leading-relaxed text-muted">
            Every opportunity we present has been evaluated through
            RareScore&trade; &mdash; our proprietary evaluation framework built
            to identify high-conviction opportunities and eliminate everything
            else.
          </p>

          <div className="mt-16 flex items-center gap-6" aria-hidden>
            <span className="h-px flex-1 bg-dark/10" />
            <span className="font-display text-lg italic text-muted">
              Five filters. One standard.
            </span>
            <span className="h-px flex-1 bg-dark/10" />
          </div>
        </div>
      </section>

      <section className="relative bg-cream pb-24">
        <div className="mx-auto max-w-5xl px-8">
          <div ref={gridRef} className="grid grid-cols-1 md:grid-cols-2">
            {PILLARS.map((pillar, i) => (
              <article
                key={pillar.id}
                data-pillar
                className={cn(
                  "relative border border-dark/10 px-12 py-[52px] transition-colors duration-300 hover:bg-gold/[0.04] will-change-transform",
                  i > 0 && "border-t-0",
                  i === 1 && "md:border-l-0 md:border-t",
                  i === 3 && "md:border-l-0",
                  i === 4 && "md:col-span-2 md:border-t",
                )}
              >
                <p className="font-mono text-[11px] tracking-[0.15em] text-gold-dark">
                  {pillar.id}
                </p>
                <h2 className="mt-5 font-display text-[26px] font-normal leading-tight text-dark">
                  {pillar.name}
                </h2>
                <p className="mt-4 font-sans text-[14px] leading-relaxed text-muted">
                  {pillar.question}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section
        ref={closingRef}
        className="relative bg-dark py-[130px]"
      >
        <div className="mx-auto max-w-3xl px-8 text-center">
          <h2
            className="font-display font-light leading-[1.15] text-cream"
            style={{ fontSize: "clamp(22px, 2.5vw, 38px)" }}
          >
            <span data-close className="block will-change-transform">
              Only properties that meet our internal RareScore&trade;
              threshold
            </span>
            <span data-close className="block will-change-transform">
              are ever recommended.
            </span>
          </h2>

          <p
            data-close
            className="mt-2 font-display font-light leading-[1.15] text-gold will-change-transform"
            style={{ fontSize: "clamp(22px, 2.5vw, 38px)" }}
          >
            Everything else is filtered out.
          </p>

          <div data-close className="mt-16 will-change-transform">
            <button
              type="button"
              onClick={openContact}
              data-cursor="hover"
              className="border border-gold px-10 py-5 font-mono text-[11px] tracking-[0.12em] text-gold transition-colors duration-300 hover:bg-gold hover:text-dark"
            >
              Apply for Access to Curated Opportunities
            </button>
          </div>

          <p
            data-close
            className="mt-6 font-sans text-xs text-muted/50 will-change-transform"
          >
            We work with a limited number of clients. Not every request is
            accepted.
          </p>
        </div>
      </section>
    </main>
  );
}
