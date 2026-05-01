"use client";

import Image from "next/image";
import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const MARQUEE_UNIT =
  "RARE PROPERTY COUNCIL \u00B7 CONVICTION OVER INVENTORY \u00B7 CHENNAI INDIA \u00B7 RARESCORE\u2122 \u00B7 ";
const MARQUEE_CONTENT = MARQUEE_UNIT.repeat(4);

export function Hero() {
  const sectionRef = useRef<HTMLElement | null>(null);

  const bgRef = useRef<HTMLDivElement | null>(null);
  const midRef = useRef<HTMLDivElement | null>(null);
  const contentRef = useRef<HTMLDivElement | null>(null);

  const eyebrowRef = useRef<HTMLParagraphElement | null>(null);
  const line1Ref = useRef<HTMLSpanElement | null>(null);
  const line2Ref = useRef<HTMLSpanElement | null>(null);
  const line3Ref = useRef<HTMLSpanElement | null>(null);
  const subtextRef = useRef<HTMLParagraphElement | null>(null);

  useGSAP(
    () => {
      gsap.registerPlugin(ScrollTrigger);

      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      tl.fromTo(
        eyebrowRef.current,
        { opacity: 0, y: 8 },
        { opacity: 1, y: 0, duration: 0.6 },
        0.3,
      );

      tl.fromTo(
        [line1Ref.current, line2Ref.current, line3Ref.current],
        { opacity: 0, y: 60 },
        { opacity: 1, y: 0, duration: 1.0, stagger: 0.12 },
        0.5,
      );

      tl.fromTo(
        subtextRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.8 },
        1.4,
      );

      tl.fromTo(
        [bgRef.current, midRef.current],
        { opacity: 0, scale: 1.04 },
        { opacity: 1, scale: 1, duration: 1.6, ease: "power2.out" },
        0,
      );

      // Multi-layer parallax — each layer travels a different distance as we scroll.
      const layers: Array<{ el: HTMLElement | null; distance: number }> = [
        { el: bgRef.current, distance: 60 },
        { el: midRef.current, distance: 140 },
        { el: contentRef.current, distance: 90 },
      ];

      layers.forEach(({ el, distance }) => {
        if (!el) return;
        gsap.to(el, {
          y: distance,
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top top",
            end: "bottom top",
            scrub: 0.6,
            invalidateOnRefresh: true,
          },
        });
      });
    },
    { scope: sectionRef },
  );

  return (
    <section
      ref={sectionRef}
      className="relative h-screen w-full overflow-hidden bg-dark"
    >
      {/* Layer 0 — full-bleed dusk villa, slowest parallax */}
      <div
        ref={bgRef}
        className="absolute inset-0 z-[0] will-change-transform"
      >
        <Image
          src="https://images.unsplash.com/photo-1613977257363-707ba9348227?w=2880&q=90&auto=format&fit=crop"
          alt=""
          fill
          priority
          quality={92}
          sizes="100vw"
          className="object-cover"
        />
        <div aria-hidden className="absolute inset-0 bg-dark/30" />
      </div>

      {/* Layer 1 — right-side architectural close-up, faster parallax */}
      <div
        ref={midRef}
        className="absolute inset-y-0 right-0 z-[1] hidden w-[52%] will-change-transform md:block"
        style={{
          maskImage:
            "linear-gradient(to right, transparent 0%, black 50%)",
          WebkitMaskImage:
            "linear-gradient(to right, transparent 0%, black 50%)",
        }}
      >
        <Image
          src="https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=1800&q=90&auto=format&fit=crop"
          alt=""
          fill
          priority
          quality={90}
          sizes="52vw"
          className="object-cover"
        />
      </div>

      {/* Hard left scrim → soft right transition for text legibility */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-[2]"
        style={{
          background:
            "linear-gradient(to right, #1E1A17 35%, rgba(30,26,23,0.85) 55%, transparent 100%)",
        }}
      />

      {/* Top fade so navbar reads cleanly */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 z-[3] h-40"
        style={{
          background:
            "linear-gradient(to bottom, rgba(30,26,23,0.85) 0%, rgba(30,26,23,0.4) 50%, transparent 100%)",
        }}
      />

      {/* Bottom fade into next section */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 z-[3] h-48"
        style={{
          background:
            "linear-gradient(to top, #1E1A17 0%, rgba(30,26,23,0.6) 60%, transparent 100%)",
        }}
      />

      {/* Content */}
      <div
        ref={contentRef}
        className="relative z-10 px-6 pt-32 will-change-transform sm:px-10 md:px-0 md:pl-24 md:pt-40"
      >
        <p
          ref={eyebrowRef}
          className="font-mono text-[10px] tracking-[0.3em] text-gold opacity-0"
        >
          STRATEGIC REAL ESTATE ADVISORY &middot; CHENNAI
        </p>

        <h1
          className="mt-6 max-w-[18ch] font-display font-light leading-[1.05] text-cream md:max-w-[22ch]"
          style={{ fontSize: "clamp(40px, 5.5vw, 66px)" }}
        >
          <span
            ref={line1Ref}
            className="block pb-1 opacity-0 will-change-transform"
          >
            Advisory for those
          </span>
          <span
            ref={line2Ref}
            className="block pb-1 opacity-0 will-change-transform"
          >
            who don&rsquo;t need more options&nbsp;&mdash;just the
          </span>
          <span
            ref={line3Ref}
            className="block pb-1 opacity-0 will-change-transform"
          >
            right decisions.
          </span>
        </h1>

        <p
          ref={subtextRef}
          className="mt-5 max-w-md font-sans text-[14px] font-light leading-relaxed text-muted opacity-0"
        >
          We curate, evaluate, and secure high-conviction residential
          opportunities across Chennai and select global markets.
        </p>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-24 right-12 z-20 flex flex-col items-center gap-3">
        <span className="font-mono text-[10px] tracking-[0.15em] text-muted">
          Scroll
        </span>
        <span
          aria-hidden
          className="block h-1.5 w-1.5 rounded-full bg-gold"
          style={{ animation: "hero-scroll-dot 1.8s ease-in-out infinite" }}
        />
        <span
          aria-hidden
          className="block w-px bg-gradient-to-b from-gold/60 to-transparent"
          style={{
            height: 50,
            animation: "hero-scroll 1.5s ease infinite",
          }}
        />
      </div>

      {/* Marquee */}
      <div className="pointer-events-none absolute inset-x-0 bottom-14 z-10 overflow-hidden border-t border-white/5 py-3">
        <div className="hero-marquee-anim flex w-max whitespace-nowrap">
          <span className="shrink-0 font-mono text-[10px] tracking-[0.2em] text-gold/25">
            {MARQUEE_CONTENT}
          </span>
          <span
            aria-hidden
            className="shrink-0 font-mono text-[10px] tracking-[0.2em] text-gold/25"
          >
            {MARQUEE_CONTENT}
          </span>
        </div>
      </div>
    </section>
  );
}
