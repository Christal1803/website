"use client";

import { openContactDrawer } from "@/lib/events";

const EMAIL = "info@rareadvisory.co";

export function ConsultationStrip() {
  return (
    <div className="w-full bg-dark border-b border-gold/10">
      <div className="flex h-[52px] w-full items-center justify-between px-8 md:px-24">
        <a
          href={`mailto:${EMAIL}`}
          data-cursor="hover"
          className="font-mono text-[12px] text-muted transition-colors hover:text-cream"
        >
          {EMAIL}
        </a>
        
        <button
          type="button"
          onClick={openContactDrawer}
          data-cursor="hover"
          className="group inline-flex items-center gap-3 whitespace-nowrap font-mono text-[11px] uppercase tracking-[0.1em] text-gold transition-colors hover:text-cream"
        >
          <span>Book a Private Consultation</span>
          <span className="transition-transform duration-300 group-hover:translate-x-1">
            &rarr;
          </span>
        </button>
      </div>
    </div>
  );
}
