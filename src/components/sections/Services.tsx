"use client";

import Image from "next/image";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { openContactDrawer } from "@/lib/events";

const SERVICES_DATA = [
  {
    id: "before",
    title: "Before You Buy",
    items: [
      "Market intelligence",
      "Property curation",
      "Developer due diligence",
      "Investment analysis",
    ],
    image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "during",
    title: "During The Transaction",
    items: [
      "Negotiation strategy",
      "Legal & tax coordination",
      "Document verification",
      "Escrow & payment management",
    ],
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "after",
    title: "After Your Buy",
    items: [
      "Portfolio monitoring",
      "Resale & exit strategy",
      "Property management",
      "Tax & compliance support",
    ],
    image: "https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?auto=format&fit=crop&w=800&q=80",
  },
];

export function Services() {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <section className="relative bg-dark py-[120px] overflow-hidden" id="services">
      <div className="w-full px-8 md:px-24">
        {/* Header */}
        <div className="mb-20">
          <p className="font-mono text-[10px] tracking-[0.3em] text-gold mb-6 uppercase">
            SERVICES
          </p>
          <h2
            className="font-display font-light text-cream leading-[1.1] "
            style={{ fontSize: "clamp(42px, 4.5vw, 58px)" }}
          >
            Our role is not to show you properties. <br />
            <span className="text-gold">It is to ensure you make the right decision.</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 lg:gap-32 items-center">
          {/* Left Column: Accordion */}
          <div className="flex flex-col">
            <div className="flex flex-col border-t border-white/10 md:ml-24">
              {SERVICES_DATA.map((service, index) => {
                const isActive = activeIndex === index;
                return (
                  <div key={service.id} className="border-b border-white/10">
                    <button
                      type="button"
                      onClick={() => setActiveIndex(index)}
                      className="flex w-full items-center justify-between py-8 text-left group"
                    >
                      <h3
                        className={cn(
                          "font-display text-2xl md:text-3xl transition-colors duration-300",
                          isActive ? "text-cream" : "text-cream/50 group-hover:text-cream"
                        )}
                      >
                        {service.title}
                      </h3>
                      <span className={cn("font-light text-2xl transition-colors", isActive ? "text-gold" : "text-white/20")}>
                        {isActive ? "—" : "+"}
                      </span>
                    </button>

                    <AnimatePresence initial={false}>
                      {isActive && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                          className="overflow-hidden"
                        >
                          <div className="pb-10">
                            <ul className="space-y-3">
                              {service.items.map((item, i) => (
                                <li key={i} className="flex items-center gap-3 font-sans text-sm text-muted">
                                  <span className="h-px w-2 bg-gold/50" />
                                  {item}
                                </li>
                              ))}
                            </ul>

                            {/* Mobile Image */}
                            <div className="mt-10 md:hidden relative w-full aspect-[4/5] overflow-hidden">
                              <Image
                                src={service.image}
                                alt={service.title}
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

          {/* Right Column: Desktop Image */}
          <div className="hidden md:block relative h-full">
            <div className="sticky top-32 w-full aspect-[4/5] overflow-hidden">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeIndex}
                  initial={{ opacity: 0, scale: 1.05 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                  className="absolute inset-0"
                >
                  <Image
                    src={SERVICES_DATA[activeIndex].image}
                    alt={SERVICES_DATA[activeIndex].title}
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

        {/* CTA Button */}
        <div className="mt-12 md:mt-20 md:ml-24">
          <button
            type="button"
            onClick={openContactDrawer}
            data-cursor="hover"
            className="inline-flex items-center border border-gold/40 px-10 py-5 font-mono text-[11px] tracking-[0.15em] text-gold transition-colors duration-300 hover:border-gold hover:bg-gold hover:text-dark uppercase"
          >
            Start a Consultation
          </button>
        </div>
      </div>
    </section>
  );
}
