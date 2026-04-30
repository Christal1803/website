"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { motion, AnimatePresence, type Variants } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { cn } from "@/lib/utils";
import { openContactDrawer } from "@/lib/events";
import { Logo } from "@/components/ui/Logo";

const NAV_LINKS = [
  { href: "/#about", label: "About" },
  { href: "/services", label: "Services" },
  { href: "/rarescore", label: "RareScore\u2122" },
  { href: "/intelligence", label: "Intelligence" },
];

const PHONE = "+1 (212) 555-0142";

const overlayVariants: Variants = {
  hidden: { y: "-100%" },
  visible: { y: 0 },
};

const listVariants: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.08, delayChildren: 0.2 },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
  },
};

const navLinkClass =
  "relative font-sans text-[12px] tracking-[0.04em] text-muted transition-colors duration-300 hover:text-cream " +
  "after:absolute after:bottom-[-6px] after:left-0 after:h-px after:w-full after:origin-left after:scale-x-0 " +
  "after:bg-gold after:transition-transform after:duration-300 after:content-[''] hover:after:scale-x-100";

const contactButtonBase =
  "border border-gold/40 font-mono text-[11px] tracking-[0.12em] text-gold " +
  "transition-colors duration-[250ms] hover:border-gold hover:bg-gold hover:text-dark";

export function NavBar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const trigger = ScrollTrigger.create({
      start: 60,
      onEnter: () => setScrolled(true),
      onLeaveBack: () => setScrolled(false),
    });
    return () => {
      trigger.kill();
    };
  }, []);

  useEffect(() => {
    if (!menuOpen) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previous;
    };
  }, [menuOpen]);

  const openContact = () => {
    setMenuOpen(false);
    openContactDrawer();
  };

  return (
    <>
      <header
        className={cn(
          "fixed inset-x-0 top-0 z-50 flex h-[72px] items-center justify-between px-8 transition-colors duration-300 md:px-16",
          scrolled
            ? "scrolled bg-[rgba(30,26,23,0.92)] backdrop-blur-md"
            : "bg-transparent",
        )}
      >
        <Link
          href="/"
          data-cursor="hover"
          className="flex items-center"
          aria-label="Rare Property Council — Home"
        >
          <Logo variant="full" priority className="h-6 w-auto md:h-7" />
        </Link>

        <ul className="hidden items-center gap-10 md:flex">
          {NAV_LINKS.map((link) => (
            <li key={link.href}>
              <Link href={link.href} data-cursor="hover" className={navLinkClass}>
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        <div className="flex items-center">
          <span className="mr-6 hidden font-mono text-[12px] text-muted md:inline">
            {PHONE}
          </span>
          <button
            type="button"
            onClick={openContact}
            data-cursor="hover"
            className={cn("hidden px-5 py-2 md:inline-block", contactButtonBase)}
          >
            Contact
          </button>
          <button
            type="button"
            onClick={() => setMenuOpen(true)}
            data-cursor="hover"
            aria-label="Open menu"
            aria-expanded={menuOpen}
            className={cn(
              "ml-4 flex-col gap-[5px] md:hidden",
              menuOpen ? "hidden" : "flex",
            )}
          >
            <span className="block h-px w-5 bg-cream" />
            <span className="block h-px w-5 bg-cream" />
            <span className="block h-px w-5 bg-cream" />
          </button>
        </div>
      </header>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            key="mobile-menu"
            variants={overlayVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
            transition={{ duration: 0.5, ease: [0.76, 0, 0.24, 1] }}
            className="fixed inset-0 z-[60] flex flex-col items-center justify-center bg-dark px-8"
          >
            <Link
              href="/"
              data-cursor="hover"
              onClick={() => setMenuOpen(false)}
              aria-label="Rare Property Council — Home"
              className="absolute left-8 top-6"
            >
              <Logo variant="full" className="h-6 w-auto" />
            </Link>
            <button
              type="button"
              onClick={() => setMenuOpen(false)}
              data-cursor="hover"
              aria-label="Close menu"
              className="absolute right-8 top-6 text-2xl font-light text-cream"
            >
              <span aria-hidden>&times;</span>
            </button>

            <motion.ul
              variants={listVariants}
              initial="hidden"
              animate="visible"
              className="flex flex-col items-center gap-6"
            >
              {NAV_LINKS.map((link) => (
                <motion.li key={link.href} variants={itemVariants}>
                  <Link
                    href={link.href}
                    data-cursor="hover"
                    onClick={() => setMenuOpen(false)}
                    className="font-display text-5xl font-light text-cream"
                  >
                    {link.label}
                  </Link>
                </motion.li>
              ))}
            </motion.ul>

            <motion.button
              type="button"
              onClick={openContact}
              data-cursor="hover"
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className={cn("absolute bottom-12 px-6 py-3", contactButtonBase)}
            >
              Contact
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
