"use client";

import { Fragment, useRef, type ReactNode } from "react";
import Link from "next/link";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import type { Article } from "@/lib/articles";
import { openContactDrawer } from "@/lib/events";

interface ArticleViewProps {
  article: Article;
  related: Article[];
}

export function ArticleView({ article, related }: ArticleViewProps) {
  const pageRef = useRef<HTMLDivElement | null>(null);
  const headerRef = useRef<HTMLElement | null>(null);
  const bodyRef = useRef<HTMLElement | null>(null);
  const ctaRef = useRef<HTMLElement | null>(null);
  const moreRef = useRef<HTMLElement | null>(null);

  useGSAP(
    () => {
      gsap.registerPlugin(ScrollTrigger);

      const headerLines =
        headerRef.current?.querySelectorAll<HTMLElement>("[data-header]");
      if (headerLines && headerLines.length > 0) {
        gsap.fromTo(
          Array.from(headerLines),
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 0.9,
            stagger: 0.08,
            ease: "power3.out",
            delay: 0.1,
          },
        );
      }

      const bodyBlocks =
        bodyRef.current?.querySelectorAll<HTMLElement>("[data-block]");
      if (bodyBlocks && bodyBlocks.length > 0) {
        gsap.fromTo(
          Array.from(bodyBlocks),
          { opacity: 0, y: 16 },
          {
            opacity: 1,
            y: 0,
            duration: 0.7,
            stagger: 0.04,
            ease: "power2.out",
            scrollTrigger: {
              trigger: bodyRef.current,
              start: "top 85%",
              toggleActions: "play none none none",
            },
          },
        );
      }

      const ctaItems =
        ctaRef.current?.querySelectorAll<HTMLElement>("[data-cta]");
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

      const moreItems =
        moreRef.current?.querySelectorAll<HTMLElement>("[data-more]");
      if (moreItems && moreItems.length > 0) {
        gsap.fromTo(
          Array.from(moreItems),
          { opacity: 0, y: 16 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            stagger: 0.1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: moreRef.current,
              start: "top 85%",
              toggleActions: "play none none none",
            },
          },
        );
      }
    },
    { scope: pageRef },
  );

  const titleLines = splitTitleIntoLines(article.title);

  return (
    <main ref={pageRef}>
      <section
        ref={headerRef}
        className="relative bg-cream pb-20 pt-40 md:pt-[160px]"
      >
        <div className="mx-auto max-w-3xl px-8">
          <div
            data-header
            className="flex flex-wrap items-center gap-x-3 gap-y-1 will-change-transform"
          >
            <p className="font-mono text-[10px] tracking-[0.2em] text-gold-dark">
              INSIGHT {article.number}
            </p>
            <span className="font-mono text-[10px] text-gold-dark/40">
              &middot;
            </span>
            <p className="font-mono text-[10px] uppercase tracking-[0.1em] text-dark/60">
              {article.category}
            </p>
          </div>

          <h1
            className="mt-6 font-display font-light italic leading-[1.1] text-dark"
            style={{ fontSize: "clamp(32px, 4vw, 56px)" }}
          >
            {titleLines.map((line, i) => (
              <span
                key={i}
                data-header
                className="block will-change-transform"
              >
                {line}
              </span>
            ))}
          </h1>

          <p
            data-header
            className="mt-8 font-mono text-[10px] tracking-[0.15em] text-dark/55 will-change-transform"
          >
            {article.readTime.toUpperCase()}
          </p>

          <div
            data-header
            className="mt-8 h-px w-full bg-dark/10 will-change-transform"
            aria-hidden
          />
        </div>
      </section>

      <section ref={bodyRef} className="relative bg-cream pb-[120px] pt-[60px]">
        <div className="mx-auto max-w-2xl px-8">
          {renderBody(article.body)}
        </div>
      </section>

      <section ref={ctaRef} className="relative bg-dark py-[100px]">
        <div className="mx-auto max-w-3xl px-8 text-center">
          <h2
            className="font-display font-light italic leading-[1.2] text-cream"
            style={{ fontSize: "clamp(20px, 2vw, 32px)" }}
          >
            <span data-cta className="block will-change-transform">
              If this raises questions about your specific situation,
            </span>
            <span
              data-cta
              className="block text-gold will-change-transform"
            >
              we&rsquo;re available for a private consultation.
            </span>
          </h2>

          <div
            data-cta
            className="mt-12 flex flex-col items-center justify-center gap-4 will-change-transform sm:flex-row"
          >
            <button
              type="button"
              onClick={openContactDrawer}
              data-cursor="hover"
              className="bg-gold px-10 py-5 font-mono text-[11px] tracking-[0.12em] text-dark transition-colors duration-300 hover:bg-gold-dark"
            >
              Book a Private Consultation
            </button>
            <Link
              href="/intelligence"
              data-cursor="hover"
              className="border border-gold px-10 py-5 font-mono text-[11px] tracking-[0.12em] text-gold transition-colors duration-300 hover:bg-gold hover:text-dark"
            >
              Read More Intelligence &rarr;
            </Link>
          </div>
        </div>
      </section>

      {related.length > 0 ? (
        <section ref={moreRef} className="relative bg-cream py-[80px]">
          <div className="mx-auto max-w-4xl px-8">
            <p
              data-more
              className="font-mono text-[10px] tracking-[0.2em] text-gold-dark will-change-transform"
            >
              MORE INTELLIGENCE
            </p>

            <div className="mt-12 grid grid-cols-1 gap-12 md:grid-cols-2">
              {related.map((item, i) => (
                <Link
                  key={item.slug}
                  href={`/intelligence/${item.slug}`}
                  data-cursor="hover"
                  data-more
                  className={
                    "group block will-change-transform " +
                    (i === 1
                      ? "md:border-l md:border-dark/[0.08] md:pl-12"
                      : "")
                  }
                >
                  <p className="font-mono text-[10px] tracking-[0.15em] text-gold-dark">
                    Insight {item.number}
                  </p>
                  <h3 className="mt-3 font-display text-[22px] font-normal leading-snug text-dark">
                    {item.title}
                  </h3>
                  <p className="mt-2 font-sans text-[13px] leading-[20px] text-muted">
                    {item.preview}
                  </p>
                  <span className="mt-6 inline-block font-mono text-[10px] tracking-[0.05em] text-gold-dark transition-[letter-spacing] duration-300 group-hover:tracking-[0.12em]">
                    Read Intelligence &rarr;
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </section>
      ) : null}
    </main>
  );
}

function splitTitleIntoLines(title: string): string[] {
  const words = title.split(" ");
  if (words.length <= 6) return [title];
  const lineCount = Math.min(3, Math.ceil(words.length / 6));
  const perLine = Math.ceil(words.length / lineCount);
  const lines: string[] = [];
  for (let i = 0; i < words.length; i += perLine) {
    lines.push(words.slice(i, i + perLine).join(" "));
  }
  return lines;
}

function renderBody(body: string): ReactNode {
  const blocks = body.trim().split(/\n{2,}/);
  return blocks.map((raw, i) => {
    const block = raw.trim();
    if (!block) return null;

    if (block.startsWith("## ")) {
      return (
        <h2
          key={i}
          data-block
          className="mb-4 mt-12 font-display text-[28px] font-light leading-tight text-dark will-change-transform first:mt-0"
        >
          {block.slice(3)}
        </h2>
      );
    }

    return (
      <p
        key={i}
        data-block
        className="mb-6 font-sans text-[16px] leading-[28px] text-muted will-change-transform"
      >
        {renderInline(block)}
      </p>
    );
  });
}

function renderInline(text: string): ReactNode {
  const parts = text.split(/(\*\*[^*]+\*\*)/g);
  return parts.map((part, i) => {
    if (part.startsWith("**") && part.endsWith("**")) {
      return (
        <strong key={i} className="font-medium text-dark">
          {part.slice(2, -2)}
        </strong>
      );
    }
    return <Fragment key={i}>{part}</Fragment>;
  });
}
