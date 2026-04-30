"use client";

import { useEffect, useState } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { MARKET_REPORT_EVENT } from "@/lib/events";
import { cn } from "@/lib/utils";

const INPUT_CLASS =
  "w-full border-b border-white/15 bg-transparent py-3 font-sans text-sm text-cream " +
  "placeholder:text-muted/40 focus:border-gold focus:outline-none transition-colors duration-200";

export function MarketReportModal() {
  const [open, setOpen] = useState(false);
  const [data, setData] = useState({ name: "", email: "", interest: "" });
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    const handler = () => {
      setData({ name: "", email: "", interest: "" });
      setSubmitted(false);
      setOpen(true);
    };
    window.addEventListener(MARKET_REPORT_EVENT, handler);
    return () => window.removeEventListener(MARKET_REPORT_EVENT, handler);
  }, []);

  const filled =
    data.name.trim() && data.email.trim() && data.interest.trim();

  const handleSubmit = () => {
    if (!filled) return;
    setSubmitted(true);
  };

  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <Dialog.Portal>
        <Dialog.Overlay className="modal-overlay-anim fixed inset-0 z-50 bg-dark/90 backdrop-blur-sm" />
        <Dialog.Content
          className={cn(
            "modal-content-anim fixed left-1/2 top-[20vh] z-50 w-[calc(100%-2rem)] max-w-md -translate-x-1/2",
            "border border-gold/20 bg-dark p-8 md:p-10",
            "focus:outline-none",
          )}
          aria-describedby={undefined}
        >
          <Dialog.Close asChild>
            <button
              type="button"
              aria-label="Close market report"
              data-cursor="hover"
              className="absolute right-6 top-4 font-mono text-muted transition-colors hover:text-cream"
            >
              <span aria-hidden>&times;</span>
            </button>
          </Dialog.Close>

          {submitted ? (
            <div className="flex flex-col items-center justify-center py-6 text-center">
              <span
                aria-hidden
                className="flex h-12 w-12 items-center justify-center rounded-full border border-gold/40 text-gold"
              >
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M20 6L9 17l-5-5" />
                </svg>
              </span>
              <Dialog.Title className="mt-6 font-display text-xl font-light italic text-cream">
                Thank you.
              </Dialog.Title>
              <p className="mt-3 font-sans text-sm text-muted">
                Your report will be emailed shortly.
              </p>
            </div>
          ) : (
            <div>
              <Dialog.Title className="font-display text-2xl font-light text-cream">
                Get the Rare Counsel Market Report
              </Dialog.Title>
              <p className="mt-3 font-sans text-sm text-muted">
                Receive exclusive intelligence on Chennai&rsquo;s luxury
                market. No spam.
              </p>

              <div className="mt-8 flex flex-col gap-2">
                <input
                  type="text"
                  placeholder="Full name"
                  value={data.name}
                  onChange={(e) =>
                    setData((d) => ({ ...d, name: e.target.value }))
                  }
                  className={INPUT_CLASS}
                />
                <input
                  type="email"
                  placeholder="Email address"
                  value={data.email}
                  onChange={(e) =>
                    setData((d) => ({ ...d, email: e.target.value }))
                  }
                  className={INPUT_CLASS}
                />
                <input
                  type="text"
                  placeholder="Investment interest"
                  value={data.interest}
                  onChange={(e) =>
                    setData((d) => ({ ...d, interest: e.target.value }))
                  }
                  className={INPUT_CLASS}
                />
              </div>

              <button
                type="button"
                onClick={handleSubmit}
                disabled={!filled}
                data-cursor="hover"
                className="mt-8 w-full bg-gold py-4 font-mono text-[11px] tracking-[0.1em] text-dark transition-opacity duration-200 hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-40"
              >
                Send Me the Report
              </button>
            </div>
          )}
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
