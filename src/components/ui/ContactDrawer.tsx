"use client";

import {
  useCallback,
  useEffect,
  useMemo,
  useState,
  type Dispatch,
  type SetStateAction,
} from "react";
import { motion, AnimatePresence, type Variants } from "framer-motion";
import { CONTACT_DRAWER_EVENT } from "@/lib/events";
import { cn } from "@/lib/utils";

type View = "menu" | "consultation" | "report";

type Option = {
  id: string;
  label: string;
  description: string;
  view: Exclude<View, "menu">;
};

const EMAIL = "info@rarepropertycounsel.com";
const CLOSED_HEIGHT = 56;
const OPEN_CAP = 680;
const EASE_INOUT: [number, number, number, number] = [0.76, 0, 0.24, 1];
const SOFT_EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

const OPTIONS: Option[] = [
  {
    id: "book",
    label: "Book a Private Consultation",
    description: "For serious buyers evaluating a high-value decision",
    view: "consultation",
  },
  {
    id: "curated",
    label: "Request Curated Opportunities",
    description: "Access selectively evaluated properties",
    view: "consultation",
  },
  {
    id: "report",
    label: "Get Market Report",
    description: "Receive Rare Intelligence on luxury markets",
    view: "report",
  },
];

const INPUT_CLASS =
  "w-full border-b border-white/15 bg-transparent py-3 font-sans text-sm text-cream " +
  "placeholder:text-muted/40 focus:border-gold focus:outline-none transition-colors duration-200";

const PILL_BUTTON_CLASS =
  "inline-flex items-center gap-3 border border-gold/40 px-6 py-3 font-mono text-[11px] " +
  "tracking-[0.12em] text-gold transition-colors duration-[250ms] hover:border-gold " +
  "hover:bg-gold hover:text-dark disabled:cursor-not-allowed disabled:opacity-40";

const CONSULTATION_STEPS = [
  {
    title: "Identity",
    description: "Tell us who we're speaking with.",
    fields: [
      { key: "fullName", placeholder: "Full name", type: "text" as const },
      { key: "email", placeholder: "Email address", type: "email" as const },
    ],
  },
  {
    title: "Interest",
    description: "What are you considering?",
    fields: [
      { key: "market", placeholder: "Preferred market or neighborhood", type: "text" as const },
      { key: "range", placeholder: "Investment range (USD)", type: "text" as const },
    ],
  },
  {
    title: "Timeline",
    description: "How soon are you looking to move?",
    fields: [
      { key: "timeline", placeholder: "Timeline (e.g. within 6 months)", type: "text" as const },
      { key: "status", placeholder: "Status (cash, financing, 1031, etc.)", type: "text" as const },
    ],
  },
  {
    title: "Context",
    description: "Anything specific we should know.",
    fields: [
      { key: "notes", placeholder: "Share context or questions", type: "textarea" as const },
    ],
  },
];

const overlayVariants: Variants = {
  strip: { opacity: 1, transition: { delay: 0.3, duration: 0.2 } },
  panel: { opacity: 1, transition: { delay: 0.25, duration: 0.35 } },
  exit: { opacity: 0, transition: { duration: 0.15 } },
};

export function ContactDrawer() {
  const [open, setOpen] = useState(false);
  const [view, setView] = useState<View>("menu");
  const [maxHeight, setMaxHeight] = useState(OPEN_CAP);

  useEffect(() => {
    const update = () => {
      const vh = window.innerHeight;
      const isMobile = window.innerWidth < 768;
      setMaxHeight(isMobile ? vh * 0.9 : Math.min(vh * 0.9, OPEN_CAP));
    };
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  useEffect(() => {
    const onOpen = () => {
      setView("menu");
      setOpen(true);
    };
    window.addEventListener(CONTACT_DRAWER_EVENT, onOpen);
    return () => window.removeEventListener(CONTACT_DRAWER_EVENT, onOpen);
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open]);

  const close = useCallback(() => setOpen(false), []);
  const backToMenu = useCallback(() => setView("menu"), []);

  const openFromStrip = () => {
    setView("consultation");
    setOpen(true);
  };

  return (
    <motion.section
      aria-label="Contact"
      className="fixed inset-x-0 bottom-0 z-40 overflow-hidden border-t border-gold/20 bg-dark"
      initial={false}
      animate={{ height: open ? maxHeight : CLOSED_HEIGHT }}
      transition={{ duration: 0.6, ease: EASE_INOUT }}
    >
      <AnimatePresence initial={false} mode="wait">
        {open ? (
          <motion.div
            key="panel"
            initial={{ opacity: 0 }}
            animate="panel"
            exit="exit"
            variants={overlayVariants}
            className="relative h-full w-full"
          >
            <ExpandedPanel
              view={view}
              setView={setView}
              onBack={backToMenu}
              onClose={close}
            />
          </motion.div>
        ) : (
          <motion.div
            key="strip"
            initial={{ opacity: 0 }}
            animate="strip"
            exit="exit"
            variants={overlayVariants}
            className="flex h-[56px] w-full items-center justify-center px-6"
          >
            <a
              href={`mailto:${EMAIL}`}
              data-cursor="hover"
              className="hidden font-mono text-[12px] text-muted transition-colors hover:text-cream md:inline"
            >
              {EMAIL}
            </a>
            <span aria-hidden className="mx-6 hidden text-gold/30 md:inline">
              ·
            </span>
            <button
              type="button"
              onClick={openFromStrip}
              data-cursor="hover"
              className="group inline-flex items-center gap-3 whitespace-nowrap font-mono text-[11px] uppercase tracking-[0.1em] text-gold transition-colors hover:text-cream"
            >
              <span>Book a Private Consultation</span>
              <span className="transition-transform duration-300 group-hover:translate-x-1">
                &rarr;
              </span>
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.section>
  );
}

type ExpandedPanelProps = {
  view: View;
  setView: Dispatch<SetStateAction<View>>;
  onBack: () => void;
  onClose: () => void;
};

function ExpandedPanel({ view, setView, onBack, onClose }: ExpandedPanelProps) {
  const activeOptionId = useMemo(
    () => OPTIONS.find((o) => view !== "menu" && o.view === view)?.id ?? null,
    [view],
  );

  return (
    <div className="relative h-full w-full">
      <button
        type="button"
        onClick={onClose}
        data-cursor="hover"
        aria-label="Close contact panel"
        className="absolute right-8 top-4 z-10 font-mono text-muted transition-colors hover:text-cream"
      >
        <span aria-hidden>&times;</span>
      </button>

      <div className="grid h-full grid-cols-1 gap-10 overflow-y-auto px-8 pb-10 pt-8 md:grid-cols-[2fr_3fr] md:px-16">
        <div className="flex flex-col">
          <p className="font-mono text-[10px] tracking-[0.2em] text-gold">
            RARE PROPERTY COUNCIL
          </p>
          <h2 className="mt-4 font-display text-[clamp(28px,3vw,44px)] font-light italic text-cream">
            Gain Private Access
          </h2>

          <ul className="mt-8 flex flex-col">
            {OPTIONS.map((option) => {
              const active = activeOptionId === option.id;
              return (
                <li key={option.id}>
                  <button
                    type="button"
                    onClick={() => setView(option.view)}
                    data-cursor="hover"
                    aria-pressed={active}
                    className={cn(
                      "group flex w-full items-center justify-between border-b border-white/[0.08] py-4 text-left transition-colors",
                    )}
                  >
                    <span className="flex flex-col">
                      <span
                        className={cn(
                          "font-display text-lg font-light transition-colors",
                          active ? "text-gold" : "text-cream group-hover:text-gold",
                        )}
                      >
                        {option.label}
                      </span>
                      <span className="mt-1 font-sans text-[11px] text-muted">
                        {option.description}
                      </span>
                    </span>
                    <span className="ml-6 font-mono text-sm text-gold transition-transform duration-300 group-hover:translate-x-1">
                      &rarr;
                    </span>
                  </button>
                </li>
              );
            })}
          </ul>

          <p className="mt-6 font-sans text-[11px] italic text-muted">
            Not every request is accepted. We prioritise alignment over volume.
          </p>
        </div>

        <div className="relative flex min-h-[300px] flex-col">
          <AnimatePresence mode="wait">
            {view === "menu" && (
              <motion.div
                key="menu"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="flex h-full min-h-[300px] items-center justify-center"
              >
                <span
                  aria-hidden
                  className="font-display font-light leading-none text-cream/[0.05]"
                  style={{ fontSize: 180 }}
                >
                  R
                </span>
              </motion.div>
            )}

            {view === "consultation" && (
              <motion.div
                key="consultation"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.35, ease: SOFT_EASE }}
                className="h-full"
              >
                <ConsultationForm onBackToMenu={onBack} />
              </motion.div>
            )}

            {view === "report" && (
              <motion.div
                key="report"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.35, ease: SOFT_EASE }}
                className="h-full"
              >
                <ReportForm onBackToMenu={onBack} />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}

function ConsultationForm({ onBackToMenu }: { onBackToMenu: () => void }) {
  const [step, setStep] = useState(0);
  const [data, setData] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState(false);

  const total = CONSULTATION_STEPS.length;
  const current = CONSULTATION_STEPS[step];
  const isLast = step === total - 1;

  const allFilled = current.fields.every(
    (f) => (data[f.key] ?? "").trim().length > 0,
  );

  const handlePrev = () => {
    if (step === 0) {
      onBackToMenu();
    } else {
      setStep((s) => s - 1);
    }
  };

  const handleNext = () => {
    if (!allFilled) return;
    if (isLast) {
      setSubmitted(true);
    } else {
      setStep((s) => s + 1);
    }
  };

  if (submitted) {
    return (
      <div className="flex h-full flex-col items-start justify-center gap-4">
        <p className="font-mono text-[11px] tracking-[0.2em] text-gold">
          REQUEST RECEIVED
        </p>
        <h3 className="font-display text-3xl font-light italic text-cream">
          Thank you.
        </h3>
        <p className="max-w-md font-sans text-sm text-muted">
          A member of the Rare desk will review your request and reply directly
          from {EMAIL}.
        </p>
        <button
          type="button"
          onClick={onBackToMenu}
          data-cursor="hover"
          className={PILL_BUTTON_CLASS}
        >
          Return
        </button>
      </div>
    );
  }

  return (
    <div className="flex h-full flex-col">
      <div className="flex items-center justify-between">
        <span className="font-mono text-[11px] text-gold">
          {String(step + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
        </span>
        <button
          type="button"
          onClick={handlePrev}
          data-cursor="hover"
          className="font-mono text-[11px] text-muted transition-colors hover:text-cream"
        >
          &larr; {step === 0 ? "Back to options" : "Previous"}
        </button>
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={step}
          initial={{ opacity: 0, x: 16 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -16 }}
          transition={{ duration: 0.3, ease: SOFT_EASE }}
          className="mt-6 flex flex-1 flex-col"
        >
          <h3 className="font-display text-2xl font-light italic text-cream">
            {current.title}
          </h3>
          <p className="mt-1 font-sans text-[13px] text-muted">
            {current.description}
          </p>

          <div className="mt-6 flex flex-col gap-2">
            {current.fields.map((field) =>
              field.type === "textarea" ? (
                <textarea
                  key={field.key}
                  rows={3}
                  placeholder={field.placeholder}
                  value={data[field.key] ?? ""}
                  onChange={(e) =>
                    setData((d) => ({ ...d, [field.key]: e.target.value }))
                  }
                  className={cn(INPUT_CLASS, "resize-none")}
                />
              ) : (
                <input
                  key={field.key}
                  type={field.type}
                  placeholder={field.placeholder}
                  value={data[field.key] ?? ""}
                  onChange={(e) =>
                    setData((d) => ({ ...d, [field.key]: e.target.value }))
                  }
                  className={INPUT_CLASS}
                />
              ),
            )}
          </div>
        </motion.div>
      </AnimatePresence>

      <div className="mt-8 flex justify-end">
        <button
          type="button"
          onClick={handleNext}
          disabled={!allFilled}
          data-cursor="hover"
          className={PILL_BUTTON_CLASS}
        >
          {isLast ? "Request Consultation" : "Continue"}
          <span>&rarr;</span>
        </button>
      </div>
    </div>
  );
}

function ReportForm({ onBackToMenu }: { onBackToMenu: () => void }) {
  const [data, setData] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState(false);

  const filled =
    (data.name ?? "").trim() &&
    (data.email ?? "").trim() &&
    (data.interest ?? "").trim();

  if (submitted) {
    return (
      <div className="flex h-full flex-col items-start justify-center gap-4">
        <p className="font-mono text-[11px] tracking-[0.2em] text-gold">
          REPORT REQUESTED
        </p>
        <h3 className="font-display text-3xl font-light italic text-cream">
          On its way.
        </h3>
        <p className="max-w-md font-sans text-sm text-muted">
          The latest Rare Intelligence report will be sent to your inbox.
        </p>
        <button
          type="button"
          onClick={onBackToMenu}
          data-cursor="hover"
          className={PILL_BUTTON_CLASS}
        >
          Return
        </button>
      </div>
    );
  }

  return (
    <div className="flex h-full flex-col">
      <div className="flex items-center justify-between">
        <span className="font-mono text-[11px] text-gold">MARKET REPORT</span>
        <button
          type="button"
          onClick={onBackToMenu}
          data-cursor="hover"
          className="font-mono text-[11px] text-muted transition-colors hover:text-cream"
        >
          &larr; Back to options
        </button>
      </div>

      <div className="mt-6 flex flex-1 flex-col">
        <h3 className="font-display text-2xl font-light italic text-cream">
          Rare Intelligence
        </h3>
        <p className="mt-1 font-sans text-[13px] text-muted">
          A quarterly briefing on luxury markets we track.
        </p>

        <div className="mt-6 flex flex-col gap-2">
          <input
            type="text"
            placeholder="Full name"
            value={data.name ?? ""}
            onChange={(e) => setData((d) => ({ ...d, name: e.target.value }))}
            className={INPUT_CLASS}
          />
          <input
            type="email"
            placeholder="Email address"
            value={data.email ?? ""}
            onChange={(e) => setData((d) => ({ ...d, email: e.target.value }))}
            className={INPUT_CLASS}
          />
          <input
            type="text"
            placeholder="Investment interest"
            value={data.interest ?? ""}
            onChange={(e) =>
              setData((d) => ({ ...d, interest: e.target.value }))
            }
            className={INPUT_CLASS}
          />
        </div>
      </div>

      <div className="mt-8 flex justify-end">
        <button
          type="button"
          onClick={() => {
            if (filled) setSubmitted(true);
          }}
          disabled={!filled}
          data-cursor="hover"
          className={PILL_BUTTON_CLASS}
        >
          Send Report
          <span>&rarr;</span>
        </button>
      </div>
    </div>
  );
}
