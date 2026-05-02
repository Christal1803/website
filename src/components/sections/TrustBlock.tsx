"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { openContactDrawer } from "@/lib/events";

export function TrustBlock() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const revealRef = useRef<HTMLDivElement | null>(null);

  useGSAP(
    () => {
      gsap.registerPlugin(ScrollTrigger);

      const lines = revealRef.current?.querySelectorAll<HTMLElement>(
        "[data-reveal]",
      );
      if (!lines || lines.length === 0) return;

      gsap.fromTo(
        Array.from(lines),
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.9,
          stagger: 0.08,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
            toggleActions: "play none none none",
          },
        },
      );
    },
    { scope: sectionRef },
  );

  const openContact = openContactDrawer;

  return (
    <section
      ref={sectionRef}
      className="relative bg-dark py-[120px]"
      aria-label="Trust"
    >
      <div ref={revealRef} className="w-full px-8 md:px-24">
        <div
          data-reveal
          className="h-px w-[60px] bg-gold will-change-transform"
          aria-hidden
        />

        <h2
          className="mt-10 font-display font-light leading-[1.05] text-cream"
          style={{ fontSize: "clamp(28px, 3.5vw, 52px)" }}
        >
          <span data-reveal className="block will-change-transform">
            Trusted by founders, CXOs,and global investors
          </span>

          <span
            data-reveal
            className="block text-gold will-change-transform mt-10"
          >
            who value clarity over access.
          </span>
        </h2>

        <p
          data-reveal
          className="mt-10 font-sans text-sm  text-muted will-change-transform"
        >
          We work with a limited number of clients. Not every request is
          accepted.
        </p>

        <div data-reveal className="mt-10 will-change-transform">
          <button
            type="button"
            onClick={openContact}
            data-cursor="hover"
            className="font-mono text-[12px] tracking-[0.08em] text-gold transition-[letter-spacing,color] duration-300 ease-out hover:tracking-[0.15em] hover:text-cream"
          >
            Book a Private Consultation &rarr;
          </button>
        </div>
      </div>
    </section>
  );
}
