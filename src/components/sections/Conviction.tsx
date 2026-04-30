"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const PRINCIPLES = [
  {
    id: "O1",
    title: "Only select properties",
    body: "We curate fewer than 1% of available listings in any given quarter.",
  },
  {
    id: "O2",
    title: "No developer incentives",
    body: "We earn nothing from project launches. Our fee comes entirely from you.",
  },
  {
    id: "O3",
    title: "Conviction or silence",
    body: "If we don\u2019t believe in an opportunity, we simply don\u2019t present it.",
  },
];

export function Conviction() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const italicRef = useRef<HTMLParagraphElement | null>(null);
  const columnsRef = useRef<HTMLDivElement | null>(null);

  useGSAP(
    () => {
      gsap.registerPlugin(ScrollTrigger);

      const lineNodes = italicRef.current?.querySelectorAll<HTMLElement>(
        "[data-line]",
      );

      if (lineNodes && lineNodes.length > 0) {
        gsap.fromTo(
          Array.from(lineNodes),
          { opacity: 0, y: 24 },
          {
            opacity: 1,
            y: 0,
            duration: 0.9,
            stagger: 0.06,
            ease: "power3.out",
            scrollTrigger: {
              trigger: italicRef.current,
              start: "top 85%",
              toggleActions: "play none none none",
            },
          },
        );
      }

      const columns = columnsRef.current?.children;
      if (columns && columns.length > 0) {
        gsap.fromTo(
          Array.from(columns) as HTMLElement[],
          { opacity: 0, y: 16 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            stagger: 0.1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: columnsRef.current,
              start: "top 85%",
              toggleActions: "play none none none",
            },
          },
        );
      }
    },
    { scope: sectionRef },
  );

  return (
    <section
      id="about"
      ref={sectionRef}
      className="relative bg-cream py-[140px]"
    >
      <div className="mx-auto max-w-4xl px-8">
        <div className="h-px w-[60px] bg-gold-dark" aria-hidden />

        <p
          ref={italicRef}
          className="mt-12 font-display font-light italic leading-[1.3] text-dark"
          style={{ fontSize: "clamp(22px, 2.5vw, 36px)" }}
        >
          <span data-line className="block will-change-transform">
            Every recommendation we make is backed
          </span>
          <span data-line className="block will-change-transform">
            by conviction &mdash; not inventory.
          </span>
        </p>

        <p className="mt-8 max-w-2xl font-sans text-base leading-relaxed text-muted">
          We don&rsquo;t chase launches. We don&rsquo;t promote inventory. We
          don&rsquo;t work on volume. We recommend with conviction &mdash; or
          not at all.
        </p>

        <div
          ref={columnsRef}
          className="mt-20 grid grid-cols-1 gap-12 border-t border-dark/[0.08] pt-20 md:grid-cols-3"
        >
          {PRINCIPLES.map((p) => (
            <div key={p.id} className="will-change-transform">
              <p className="font-mono text-[11px] tracking-[0.15em] text-gold-dark">
                {p.id}
              </p>
              <h3 className="mt-4 font-display text-xl font-normal text-dark">
                {p.title}
              </h3>
              <p className="mt-3 font-sans text-sm leading-relaxed text-muted">
                {p.body}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
