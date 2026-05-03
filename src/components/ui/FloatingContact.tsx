"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export function FloatingContact() {
  const [isOpen, setIsOpen] = useState(false);

  // Close on escape
  useEffect(() => {
    if (!isOpen) return;
    const handleEsc = (e: KeyboardEvent) => e.key === "Escape" && setIsOpen(false);
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [isOpen]);

  return (
    <>
      {/* Floating Trigger */}
      <AnimatePresence>
        {!isOpen && (
          <motion.div
            initial={{ y: 100, opacity: 0, x: "-50%" }}
            animate={{ y: 0, opacity: 1, x: "-50%" }}
            exit={{ y: 100, opacity: 0, x: "-50%" }}
            className="fixed bottom-10 left-1/2 z-50 -translate-x-1/2"
          >
            <button
              onClick={() => setIsOpen(true)}
              data-cursor="hover"
              className="flex items-center gap-2 rounded-full border border-white/10 bg-dark/80 p-2 backdrop-blur-xl transition-transform hover:scale-105 active:scale-95"
            >
              <div className="rounded-full bg-gold px-8 py-3.5 font-display text-[13px] font-medium tracking-tight text-dark">
                Book Consultation
              </div>
              <div className="flex h-[46px] w-[46px] items-center justify-center rounded-full bg-gold text-dark">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-5 w-5 rotate-45"
                >
                  <path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z" />
                </svg>
              </div>
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Horizontal Drawer */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 z-[60] bg-dark/40 backdrop-blur-sm"
            />

            {/* Content */}
            <motion.div
              initial={{ y: "100%", x: "-50%" }}
              animate={{ y: 0, x: "-50%" }}
              exit={{ y: "100%", x: "-50%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed bottom-6 left-1/2 z-[70] w-[calc(100%-48px)] max-w-6xl -translate-x-1/2"
            >
              {/* Close Button Above */}
              <button
                onClick={() => setIsOpen(false)}
                className="absolute -top-16 left-1/2 flex h-10 w-10 -translate-x-1/2 items-center justify-center rounded-full bg-white text-dark shadow-xl transition-transform hover:scale-110 active:scale-90"
              >
                <span className="text-xl">&times;</span>
              </button>

              <div className="overflow-hidden rounded-[40px] bg-white px-10 py-8 text-dark shadow-2xl md:px-16">
                <form className="flex flex-col gap-6 md:flex-row md:items-center md:gap-12">
                  <div className="shrink-0 font-display text-4xl font-light tracking-tighter">
                    Contact
                  </div>

                  <div className="grid flex-1 grid-cols-1 gap-8 md:grid-cols-4 md:gap-12">
                    <Field label="NAME" placeholder="Type..." />
                    <Field label="EMAIL" placeholder="Email..." />
                    <Field label="PHONE" placeholder="Phone..." />
                    <Field label="INTEREST" placeholder="City, Country..." />
                  </div>

                  <button
                    type="submit"
                    className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-dark text-white transition-transform hover:scale-105 active:scale-95"
                  >
                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="h-6 w-6 rotate-45"
                    >
                      <path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z" />
                    </svg>
                  </button>
                </form>

                <div className="mt-8 flex items-center gap-3">
                  <div className="h-4 w-4 rounded-full border border-dark/20 flex items-center justify-center">
                    <div className="h-2 w-2 rounded-full bg-dark/0 transition-colors" />
                  </div>
                  <p className="font-mono text-[9px] tracking-widest text-dark/40 uppercase">
                    By submitting, you agree to our privacy policy
                  </p>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}

function Field({ label, placeholder }: { label: string; placeholder: string }) {
  return (
    <div className="flex flex-col gap-2 border-l border-dark/10 pl-6 first:border-l-0 first:pl-0">
      <label className="font-mono text-[10px] font-bold tracking-widest text-dark/40">
        {label}
      </label>
      <input
        type="text"
        placeholder={placeholder}
        className="bg-transparent font-display text-lg font-light text-dark placeholder:text-dark/20 focus:outline-none"
      />
    </div>
  );
}
