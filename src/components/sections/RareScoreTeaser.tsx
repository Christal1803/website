"use client";

import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { openContactDrawer } from "@/lib/events";

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
    question: "If you decide to exit, will there be demand?",
  },
  {
    id: "O4",
    name: "Value vs Pricing",
    question: "Are you paying for real value, or just marketing?",
  },
  {
    id: "O5",
    name: "Investment Fit",
    question: "Does this align with your personal strategy?",
  },
];

function ChevronLeftIcon() {
  return (
    <svg
      width="12"
      height="12"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <path d="M15 18l-6-6 6-6" />
    </svg>
  );
}

function ChevronRightIcon() {
  return (
    <svg
      width="12"
      height="12"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <path d="M9 6l6 6-6 6" />
    </svg>
  );
}

export function RareScoreTeaser() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const line1Ref = useRef<HTMLSpanElement | null>(null);
  const line2Ref = useRef<HTMLSpanElement | null>(null);
  const pillarsRef = useRef<HTMLDivElement | null>(null);

  const [showArrows, setShowArrows] = useState(false);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const updateScrollState = useCallback(() => {
    const el = pillarsRef.current;
    if (!el) return;
    const hasOverflow = el.scrollWidth > el.clientWidth + 1;
    setShowArrows(hasOverflow);
    setCanScrollLeft(el.scrollLeft > 1);
    setCanScrollRight(
      el.scrollLeft < el.scrollWidth - el.clientWidth - 1,
    );
  }, []);

  useEffect(() => {
    const el = pillarsRef.current;
    if (!el) return;
    updateScrollState();
    el.addEventListener("scroll", updateScrollState, { passive: true });
    window.addEventListener("resize", updateScrollState);
    return () => {
      el.removeEventListener("scroll", updateScrollState);
      window.removeEventListener("resize", updateScrollState);
    };
  }, [updateScrollState]);

  const scrollByCard = (direction: 1 | -1) => {
    const el = pillarsRef.current;
    if (!el) return;
    // 200px card + 16px gap, scroll by ~one and a bit
    el.scrollBy({ left: direction * 232, behavior: "smooth" });
  };

  useGSAP(
    () => {
      gsap.registerPlugin(ScrollTrigger);

      gsap.fromTo(
        [line1Ref.current, line2Ref.current],
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 1.0,
          stagger: 0.12,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
            toggleActions: "play none none none",
          },
        },
      );

      const pillars = pillarsRef.current?.children;
      if (pillars && pillars.length > 0) {
        gsap.fromTo(
          Array.from(pillars) as HTMLElement[],
          { opacity: 0, x: 30 },
          {
            opacity: 1,
            x: 0,
            duration: 0.8,
            stagger: 0.08,
            ease: "power3.out",
            scrollTrigger: {
              trigger: pillarsRef.current,
              start: "top 85%",
              toggleActions: "play none none none",
            },
          },
        );
      }
    },
    { scope: sectionRef },
  );

  const openContact = openContactDrawer;

  return (
    <section
      id="rarescore-teaser"
      ref={sectionRef}
      className="relative bg-dark py-[130px]"
    >
      <div className="mx-auto max-w-5xl px-8">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-[1fr_auto] md:items-end md:gap-20">
          <div>
            <p className="font-mono text-[10px] tracking-[0.3em] text-gold">
              THE RARESCORE&trade; DIFFERENCE
            </p>
            <h2
              className="mt-4 font-display font-light leading-[1.0] text-cream"
              style={{ fontSize: "clamp(32px, 4vw, 64px)" }}
            >
              <span
                ref={line1Ref}
                className="block pb-1 opacity-0 will-change-transform"
              >
                Not every property
              </span>
              <span
                ref={line2Ref}
                className="block pb-1 opacity-0 will-change-transform"
              >
                deserves your time.
              </span>
            </h2>
          </div>

          <p className="max-w-xs font-sans text-[14px] leading-relaxed text-muted">
            Every opportunity we present has been evaluated through
            RareScore&trade; &mdash; our internal framework designed to filter
            noise and identify what truly makes sense.
          </p>
        </div>

        <div
          className="mt-20 flex items-center"
          aria-hidden
        >
          <span className="h-px flex-1 bg-white/[0.08]" />
          <span className="px-8 font-display text-lg italic text-muted">
            Five filters. One standard.
          </span>
          <span className="h-px flex-1 bg-white/[0.08]" />
        </div>

        <div className="mt-10 flex items-center justify-between gap-6">
          <p className="font-mono text-[10px] tracking-[0.2em] text-muted">
            FIVE FILTERS
          </p>

          {showArrows ? (
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => scrollByCard(-1)}
                disabled={!canScrollLeft}
                aria-label="Scroll filters left"
                data-cursor="hover"
                className="flex h-9 w-9 items-center justify-center border border-gold/30 text-gold transition-colors duration-300 hover:border-gold hover:bg-gold hover:text-dark disabled:cursor-default disabled:opacity-25 disabled:hover:border-gold/30 disabled:hover:bg-transparent disabled:hover:text-gold"
              >
                <ChevronLeftIcon />
              </button>
              <button
                type="button"
                onClick={() => scrollByCard(1)}
                disabled={!canScrollRight}
                aria-label="Scroll filters right"
                data-cursor="hover"
                className="flex h-9 w-9 items-center justify-center border border-gold/30 text-gold transition-colors duration-300 hover:border-gold hover:bg-gold hover:text-dark disabled:cursor-default disabled:opacity-25 disabled:hover:border-gold/30 disabled:hover:bg-transparent disabled:hover:text-gold"
              >
                <ChevronRightIcon />
              </button>
            </div>
          ) : null}
        </div>

        <div className="relative">
          <div
            ref={pillarsRef}
            className="mt-4 flex gap-4 overflow-x-auto pb-2 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          >
            {PILLARS.map((pillar) => (
              <div
                key={pillar.id}
                className="group min-w-[200px] shrink-0 border border-white/[0.08] p-6 transition-colors duration-[250ms] hover:border-gold/30 will-change-transform"
              >
                <p className="font-mono text-[11px] tracking-[0.1em] text-gold">
                  {pillar.id}
                </p>
                <h3 className="mt-3 font-display text-lg font-normal text-cream">
                  {pillar.name}
                </h3>
                <p className="mt-2 font-sans text-[12px] leading-relaxed text-muted">
                  {pillar.question}
                </p>
              </div>
            ))}
          </div>

          {/* Edge fades to hint there's more, only when overflowing */}
          {showArrows ? (
            <>
              <div
                aria-hidden
                className={
                  "pointer-events-none absolute inset-y-0 left-0 w-12 bg-gradient-to-r from-dark to-transparent transition-opacity duration-300 " +
                  (canScrollLeft ? "opacity-100" : "opacity-0")
                }
              />
              <div
                aria-hidden
                className={
                  "pointer-events-none absolute inset-y-0 right-0 w-12 bg-gradient-to-l from-dark to-transparent transition-opacity duration-300 " +
                  (canScrollRight ? "opacity-100" : "opacity-0")
                }
              />
            </>
          ) : null}
        </div>

        <div className="mt-16 flex flex-col items-start gap-6 sm:flex-row sm:items-center sm:gap-8">
          <button
            type="button"
            onClick={openContact}
            data-cursor="hover"
            className="border border-gold/50 px-8 py-4 font-mono text-[11px] tracking-[0.12em] text-gold transition-colors duration-300 hover:bg-gold hover:text-dark"
          >
            Request Full Access
          </button>
          <Link
            href="/rarescore"
            data-cursor="hover"
            className="font-sans text-sm text-muted transition-colors duration-300 hover:text-cream"
          >
            or explore the full framework &rarr;
          </Link>
        </div>
      </div>
    </section>
  );
}
