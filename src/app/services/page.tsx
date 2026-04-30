"use client";

import Image from "next/image";
import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { cn } from "@/lib/utils";
import { openContactDrawer } from "@/lib/events";

const BLOCKS: Array<{
  id: string;
  variant: "cream" | "dark";
  reverse: boolean;
  number: string;
  label: string;
  items: string[];
  image: string;
}> = [
  {
    id: "before",
    variant: "cream",
    reverse: false,
    number: "O1",
    label: "BEFORE YOU BUY",
    items: [
      "Market intelligence",
      "Property curation",
      "Developer due diligence",
      "Investment analysis",
    ],
    image:
      "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=2400&q=90&auto=format&fit=crop",
  },
  {
    id: "during",
    variant: "dark",
    reverse: true,
    number: "O2",
    label: "DURING THE DEAL",
    items: [
      "Negotiation strategy",
      "Legal & documentation support",
      "Pricing validation",
      "Deal structuring",
    ],
    image:
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=2400&q=90&auto=format&fit=crop",
  },
  {
    id: "after",
    variant: "cream",
    reverse: false,
    number: "O3",
    label: "AFTER OWNERSHIP",
    items: [
      "Rental advisory",
      "Resale strategy",
      "Portfolio review",
      "Expansion into global markets",
    ],
    image:
      "https://images.unsplash.com/photo-1613977257363-707ba9348227?w=2400&q=90&auto=format&fit=crop",
  },
];

type BlockProps = (typeof BLOCKS)[number];

function ServiceBlock({
  variant,
  reverse,
  number,
  label,
  items,
  image,
}: BlockProps) {
  const sectionRef = useRef<HTMLElement | null>(null);
  const imageRef = useRef<HTMLDivElement | null>(null);
  const listRef = useRef<HTMLUListElement | null>(null);

  useGSAP(
    () => {
      gsap.registerPlugin(ScrollTrigger);

      if (imageRef.current) {
        gsap.fromTo(
          imageRef.current,
          { yPercent: -10 },
          {
            yPercent: 10,
            ease: "none",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top bottom",
              end: "bottom top",
              scrub: true,
              invalidateOnRefresh: true,
            },
          },
        );
      }

      const listItems =
        listRef.current?.querySelectorAll<HTMLElement>("[data-item]");
      if (listItems && listItems.length > 0) {
        gsap.fromTo(
          Array.from(listItems),
          { opacity: 0, x: -40 },
          {
            opacity: 1,
            x: 0,
            duration: 0.8,
            stagger: 0.1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: listRef.current,
              start: "top 85%",
              toggleActions: "play none none none",
            },
          },
        );
      }
    },
    { scope: sectionRef },
  );

  const isDark = variant === "dark";

  return (
    <section
      ref={sectionRef}
      className={cn(
        "relative flex min-h-[75vh] flex-col md:flex-row md:items-stretch",
        isDark ? "bg-dark" : "bg-cream",
        reverse && "md:flex-row-reverse",
      )}
    >
      <div
        className="flex flex-col justify-center px-8 py-20 md:w-1/2 md:px-[8vw] md:py-[10vw]"
      >
        <p
          className={cn(
            "font-mono text-[11px] tracking-[0.15em]",
            isDark ? "text-gold" : "text-gold-dark",
          )}
        >
          {number}
        </p>
        <p
          className={cn(
            "mt-2 font-mono text-[10px] tracking-[0.2em]",
            isDark ? "text-cream/55" : "text-dark/55",
          )}
        >
          {label}
        </p>

        <ul ref={listRef} className="mt-10">
          {items.map((item) => (
            <li
              key={item}
              data-item
              className={cn(
                "border-b py-6 font-display text-[22px] font-normal last:border-b-0 will-change-transform",
                isDark
                  ? "border-white/[0.08] text-cream"
                  : "border-dark/[0.08] text-dark",
              )}
            >
              {item}
            </li>
          ))}
        </ul>
      </div>

      <div className="relative min-h-[60vw] overflow-hidden md:min-h-0 md:w-1/2">
        <div
          ref={imageRef}
          className="absolute -inset-y-[12%] inset-x-0 will-change-transform"
        >
          <Image
            src={image}
            alt=""
            fill
            quality={90}
            sizes="(min-width: 768px) 50vw, 100vw"
            className="object-cover"
          />
        </div>
      </div>
    </section>
  );
}

export default function ServicesPage() {
  const pageRef = useRef<HTMLDivElement | null>(null);
  const heroRef = useRef<HTMLElement | null>(null);
  const ctaRef = useRef<HTMLElement | null>(null);

  useGSAP(
    () => {
      gsap.registerPlugin(ScrollTrigger);

      const heroLines = heroRef.current?.querySelectorAll<HTMLElement>(
        "[data-hero]",
      );
      if (heroLines && heroLines.length > 0) {
        gsap.fromTo(
          Array.from(heroLines),
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 1.0,
            stagger: 0.12,
            ease: "power3.out",
            delay: 0.1,
          },
        );
      }

      const ctaItems = ctaRef.current?.querySelectorAll<HTMLElement>(
        "[data-cta]",
      );
      if (ctaItems && ctaItems.length > 0) {
        gsap.fromTo(
          Array.from(ctaItems),
          { opacity: 0, y: 20 },
          {
            opacity: 1,
            y: 0,
            duration: 0.9,
            stagger: 0.1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: ctaRef.current,
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
        className="relative bg-dark pb-24 pt-40 md:pb-[100px] md:pt-[180px]"
      >
        <div className="mx-auto max-w-4xl px-8">
          <p
            data-hero
            className="font-mono text-[10px] tracking-[0.3em] text-gold will-change-transform"
          >
            SERVICES
          </p>
          <h1
            className="mt-5 font-display font-light italic leading-[1.1]"
            style={{ fontSize: "clamp(28px, 3.5vw, 52px)" }}
          >
            <span
              data-hero
              className="block text-cream will-change-transform"
            >
              Our role is not to show you properties.
            </span>
            <span
              data-hero
              className="block text-cream/70 will-change-transform"
            >
              It is to ensure you make the right decision.
            </span>
          </h1>
        </div>
      </section>

      {BLOCKS.map((block) => (
        <ServiceBlock key={block.id} {...block} />
      ))}

      <section
        ref={ctaRef}
        className="relative bg-dark py-[120px]"
      >
        <div className="mx-auto max-w-3xl px-8 text-center">
          <p
            data-cta
            className="font-display font-light italic leading-[1.15] text-cream will-change-transform"
            style={{ fontSize: "clamp(20px, 2.2vw, 34px)" }}
          >
            If you&rsquo;re evaluating a serious real estate decision, let&rsquo;s
            get it right.
          </p>

          <div data-cta className="mt-12 will-change-transform">
            <button
              type="button"
              onClick={openContact}
              data-cursor="hover"
              className="border border-gold px-10 py-5 font-mono text-[11px] tracking-[0.12em] text-gold transition-colors duration-300 hover:bg-gold hover:text-dark"
            >
              Start a Consultation
            </button>
          </div>

          <p
            data-cta
            className="mt-6 font-sans text-xs text-muted will-change-transform"
          >
            We work with a limited number of clients.
          </p>
        </div>
      </section>
    </main>
  );
}
