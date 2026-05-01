"use client";

import Image from "next/image";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

const FILTERS = [
  {
    id: "conviction",
    title: "Conviction",
    description: "Would we recommend this property to ourselves first? If not, it doesn't leave the table.",
    image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "location",
    title: "Location",
    description: "Will this location still be desirable 10-15 years from now?",
    image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "build_quality",
    title: "Build Quality",
    description: "Does the developer have the discipline to deliver what they promise?",
    image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "liquidity",
    title: "Liquidity",
    description: "If you decide to exit, will there be demand?",
    image: "https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "yield_hold",
    title: "Yield + Hold",
    description: "Are you paying for real value, or just marketing?",
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80",
  },
];

export function RareScore() {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <section className="relative bg-cream py-[130px] overflow-hidden" id="rarescore-new">
      <div className="w-full pl-8 pr-8 md:px-24">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 lg:gap-24">
          {/* Left Column */}
          <div className="flex flex-col">
            <p className="font-mono text-[10px] tracking-[0.3em] text-gold mb-4 uppercase">
              THE <span className="text-dark">RARESCORE&trade;</span> DIFFERENCE
            </p>
            <h2
              className="font-display font-light text-dark leading-[1.0] mb-8"
              style={{ fontSize: "clamp(32px, 4vw, 64px)" }}
            >
              Not every property <br />
              <span className="text-gold-dark">deserves your time.</span>
            </h2>
            <p className="font-sans text-[14px] text-muted leading-relaxed max-w-sm mb-16">
              Every property we recommend is stress-tested against five non-negotiable filters. We don&apos;t bring you what passes. We bring you what survives.
            </p>

            <div className="flex flex-col border-t border-dark/10 md:mx-12 mt-8">
              {FILTERS.map((filter, index) => {
                const isActive = activeIndex === index;
                return (
                  <div key={filter.id} className="border-b border-dark/10">
                    <button
                      type="button"
                      onClick={() => setActiveIndex(index)}
                      className="flex w-full items-center justify-between py-6 text-left"
                    >
                      <h3 className={cn("font-display text-2xl transition-colors duration-300", isActive ? "text-dark" : "text-dark/70")}>
                        {filter.title}
                      </h3>
                      <span className="font-light text-2xl text-dark/40 ml-4">
                        {isActive ? "—" : "+"}
                      </span>
                    </button>

                    <AnimatePresence initial={false}>
                      {isActive && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
                          className="overflow-hidden"
                        >
                          <div className="pb-6">
                            <p className="font-sans text-[12px] text-muted leading-relaxed max-w-[90%]">
                              {filter.description}
                            </p>

                            {/* Mobile Image */}
                            <div className="mt-8 md:hidden relative w-full aspect-[4/5] overflow-hidden">
                              <Image
                                src={filter.image}
                                alt={filter.title}
                                fill
                                className="object-cover"
                                sizes="100vw"
                              />
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right Column - Desktop Image */}
          <div className="hidden md:block">
            <div className="sticky top-32 w-full aspect-[4/5] overflow-hidden bg-dark/5">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeIndex}
                  initial={{ opacity: 0, scale: 1.05 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
                  className="absolute inset-0"
                >
                  <Image
                    src={FILTERS[activeIndex].image}
                    alt={FILTERS[activeIndex].title}
                    fill
                    className="object-cover"
                    sizes="(max-width: 1024px) 50vw, 40vw"
                    priority
                  />
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
