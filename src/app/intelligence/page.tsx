"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { openContactDrawer, openMarketReport } from "@/lib/events";
import { articles } from "@/lib/articles";

const FEATURED = articles[0];
const REST = articles.slice(1);

export default function IntelligencePage() {
  const pageRef = useRef<HTMLDivElement | null>(null);
  const heroRef = useRef<HTMLElement | null>(null);
  const featuredRef = useRef<HTMLAnchorElement | null>(null);
  const listRef = useRef<HTMLDivElement | null>(null);
  const ctaRef = useRef<HTMLElement | null>(null);

  useGSAP(
    () => {
      gsap.registerPlugin(ScrollTrigger);

      const heroItems = heroRef.current?.querySelectorAll<HTMLElement>(
        "[data-hero]",
      );
      if (heroItems && heroItems.length > 0) {
        gsap.fromTo(
          Array.from(heroItems),
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 1.0,
            stagger: 0.1,
            ease: "power3.out",
            delay: 0.1,
          },
        );
      }

      if (featuredRef.current) {
        gsap.fromTo(
          featuredRef.current,
          { opacity: 0, y: 16 },
          {
            opacity: 1,
            y: 0,
            duration: 0.9,
            ease: "power3.out",
            scrollTrigger: {
              trigger: featuredRef.current,
              start: "top 85%",
              toggleActions: "play none none none",
            },
          },
        );
      }

      const rows = listRef.current?.querySelectorAll<HTMLElement>(
        "[data-article]",
      );
      if (rows && rows.length > 0) {
        gsap.fromTo(
          Array.from(rows),
          { opacity: 0, y: 16 },
          {
            opacity: 1,
            y: 0,
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
        className="relative bg-dark pb-20 pt-40 md:pb-[80px] md:pt-[180px]"
      >
        <div className="mx-auto max-w-5xl px-8">
          <div className="grid grid-cols-1 gap-10 md:grid-cols-[55%_45%] md:items-center md:gap-0">
            <div>
              <p
                data-hero
                className="font-mono text-[10px] tracking-[0.3em] text-gold will-change-transform"
              >
                RARE INTELLIGENCE
              </p>

              <h1
                data-hero
                className="mt-5 font-display font-light italic leading-[1.1] text-cream will-change-transform"
                style={{ fontSize: "clamp(26px, 3vw, 46px)" }}
              >
                Our insights are built from active market exposure, not
                surface-level research.
              </h1>

              <div data-hero className="mt-10 will-change-transform">
                <button
                  type="button"
                  onClick={openMarketReport}
                  data-cursor="hover"
                  className="border border-gold/50 px-8 py-4 font-mono text-[11px] tracking-[0.1em] text-gold transition-colors duration-300 hover:bg-gold hover:text-dark"
                >
                  Get the Rare Counsel Market Report
                </button>
                <p className="mt-3 font-sans text-xs text-muted">
                  Receive exclusive investment insights.
                </p>
              </div>
            </div>

            <div
              aria-hidden
              className="pointer-events-none relative hidden overflow-hidden md:block"
            >
              <span
                className="block text-right font-display font-light leading-none text-cream/[0.04]"
                style={{ fontSize: 160 }}
              >
                RI
              </span>
            </div>
          </div>
        </div>
      </section>

      <section className="relative bg-cream py-[100px]">
        <div className="mx-auto max-w-4xl px-8">
          <Link
            ref={featuredRef}
            href={`/intelligence/${FEATURED.slug}`}
            data-cursor="hover"
            className="group grid grid-cols-1 gap-10 border-b border-dark/10 pb-16 will-change-transform md:grid-cols-2"
          >
            <div className="relative h-[260px] overflow-hidden">
              {FEATURED.image ? (
                <Image
                  src={FEATURED.image}
                  alt=""
                  fill
                  quality={90}
                  sizes="(min-width: 768px) 50vw, 100vw"
                  className="object-cover brightness-[0.65] transition-[filter] duration-500 group-hover:brightness-[0.8]"
                />
              ) : null}
            </div>

            <div className="flex flex-col">
              <p className="font-mono text-[10px] tracking-[0.15em] text-gold-dark">
                Insight {FEATURED.number}
              </p>
              <h2 className="mt-3 font-display text-[28px] font-light leading-snug text-dark">
                {FEATURED.title}
              </h2>
              <p className="mt-4 font-sans text-sm leading-relaxed text-muted">
                {FEATURED.preview}
              </p>
              <span className="mt-8 inline-block self-start font-mono text-[11px] tracking-[0.05em] text-gold-dark transition-[letter-spacing] duration-300 group-hover:tracking-[0.12em]">
                Read Intelligence &rarr;
              </span>
            </div>
          </Link>

          <div ref={listRef}>
            {REST.map((article) => (
              <Link
                key={article.slug}
                href={`/intelligence/${article.slug}`}
                data-article
                data-cursor="hover"
                aria-label={`Read ${article.title}`}
                className="group grid grid-cols-[80px_1fr_auto] items-start gap-8 border-b border-dark/[0.08] py-10 transition-colors duration-300 will-change-transform hover:bg-dark/[0.015]"
              >
                <p className="pt-1 font-mono text-[10px] tracking-[0.15em] text-gold-dark">
                  Insight {article.number}
                </p>
                <div>
                  <h3 className="font-display text-xl font-normal text-dark transition-colors duration-300 group-hover:text-gold-dark">
                    {article.title}
                  </h3>
                  <p className="mt-2 font-sans text-sm leading-relaxed text-muted">
                    {article.preview}
                  </p>
                </div>
                <span
                  aria-hidden
                  className="self-start pt-1 font-mono text-sm text-gold-dark transition-transform duration-200 group-hover:translate-x-1"
                >
                  &rarr;
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section
        ref={ctaRef}
        className="relative bg-dark py-[120px]"
      >
        <div className="mx-auto max-w-3xl px-8 text-center">
          <h2
            className="font-display font-light italic leading-[1.2] text-cream"
            style={{ fontSize: "clamp(18px, 2vw, 32px)" }}
          >
            <span data-cta className="block will-change-transform">
              If you&rsquo;re evaluating a serious real estate decision,
            </span>
            <span data-cta className="block will-change-transform">
              you don&rsquo;t need more information. You need clarity.
            </span>
          </h2>

          <div data-cta className="mt-12 will-change-transform">
            <button
              type="button"
              onClick={openContact}
              data-cursor="hover"
              className="border border-gold px-10 py-5 font-mono text-[11px] tracking-[0.12em] text-gold transition-colors duration-300 hover:bg-gold hover:text-dark"
            >
              Book a Private Consultation
            </button>
          </div>
        </div>
      </section>
    </main>
  );
}
