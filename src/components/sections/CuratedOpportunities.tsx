"use client";

import Image from "next/image";
import { useRef } from "react";
import { cn } from "@/lib/utils";
import { openContactDrawer } from "@/lib/events";

const PROPERTIES = [
  {
    id: "ecr",
    name: "Coastal Estate, ECR",
    range: "Price on request",
    image:
      "https://images.unsplash.com/photo-1613977257363-707ba9348227?w=1600&q=85&auto=format&fit=crop",
  },
  {
    id: "boat-club",
    name: "Boulevard Penthouse, Boat Club",
    range: "\u20B912.5Cr+",
    image:
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1600&q=85&auto=format&fit=crop",
  },
  {
    id: "poes",
    name: "Heritage Bungalow, Adyar",
    range: "Price on request",
    image:
      "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=1600&q=85&auto=format&fit=crop",
  },
];

function LockIcon() {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.25"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <rect x="5" y="11" width="14" height="10" rx="1" />
      <path d="M8 11V7a4 4 0 0 1 8 0v4" />
    </svg>
  );
}

export function CuratedOpportunities() {
  const sectionRef = useRef<HTMLElement | null>(null);

  const openContact = openContactDrawer;

  return (
    <section
      id="properties"
      ref={sectionRef}
      className="relative bg-cream py-[130px]"
    >
      <div className="w-full px-8 md:px-24">
        <header>
          <p className="font-mono text-[10px] tracking-[0.3em] text-gold  uppercase">
            CURATED OPPORTUNITIES
          </p>
          <h2
            className="font-display font-light text-dark"
            style={{ fontSize: "clamp(30px, 3.8vw, 62px)" }}
          >
            How We Curate Opportunities
          </h2>
          <p className=" font-sans text-[14px] leading-relaxed text-muted max-w-2xl">
            Each property below has been evaluated through RareScore&trade;. Full access is reserved for <br></br> clients under active advisory.
          </p>
        </header>

        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
          {PROPERTIES.map((p, i) => (
            <article
              key={p.id}
              className="group overflow-hidden"
            >
              <div className="relative h-[280px] overflow-hidden">
                <Image
                  src={p.image}
                  alt=""
                  fill
                  quality={85}
                  sizes="(min-width: 768px) 33vw, 100vw"
                  className="object-cover blur-[5px] brightness-[0.65] transition-[filter,transform] duration-[500ms] ease-out will-change-transform group-hover:scale-[1.02] group-hover:blur-[3px] group-hover:brightness-[0.8]"
                />
                <div
                  aria-hidden
                  className="absolute inset-0 flex flex-col items-center justify-center bg-dark/50 backdrop-blur-[3px]"
                >
                  <span className="text-cream/50">
                    <LockIcon />
                  </span>
                  <p className="mt-3 font-mono text-[10px] tracking-[0.1em] text-cream/40">
                    Access restricted
                  </p>
                </div>
              </div>

              <div className="pt-6">
                <h3 className="font-display text-xl font-normal text-dark">
                  {p.name}
                </h3>
                <p className="mt-1 font-mono text-sm text-gold-dark">{p.range}</p>

                <div className="mt-4 border-t border-dark/[0.08] pt-4">
                  <button
                    type="button"
                    onClick={openContact}
                    data-cursor="hover"
                    className="font-mono text-[11px] text-gold-dark/80 transition-colors duration-300 hover:text-gold-dark"
                  >
                    Request Full Access &rarr;
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>

        <p className="mt-20 text-center font-display text-[16px] font-light italic text-muted/80">
          Full access is limited to clients under active advisory.
        </p>
      </div>
    </section>
  );
}
