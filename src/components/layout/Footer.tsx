import Link from "next/link";
import { Logo } from "@/components/ui/Logo";

const NAV_LINKS = [
  // { href: "/", label: "Home" },
  { href: "/#rarescore-new", label: "About" },
  { href: "/#services", label: "RareScore\u2122" },
  { href: "/intelligence", label: "Contact" },
];

function LinkedInIcon() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-4 0v7h-4v-7a6 6 0 0 1 6-6z" />
      <rect x="2" y="9" width="4" height="12" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  );
}

function InstagramIcon() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
    </svg>
  );
}

export function Footer() {
  return (
    <footer className="relative border-t border-gold/10 bg-[#120F0D] pb-8 pt-20">
      <div className="w-full px-8 md:px-24">
        <div className="grid grid-cols-1 gap-16 md:grid-cols-3">
          <div>
            <Link
              href="/"
              data-cursor="hover"
              className="inline-flex items-center"
              aria-label="Rare Property Council — Home"
            >
              <Logo variant="full" className="h-7 w-auto" />
            </Link>
            <p className="mt-2 font-mono text-[9px] tracking-[0.2em]  text-gold">
              ADVISORY
            </p>
            <div className="mt-8 space-y-1 font-sans text-sm leading-relaxed text-muted">
              <p>Strategic real estate advisory for those who don&rsquo;t need more</p>
              <p>options&mdash;just the right decisions.</p>
            </div>
          </div>

          <div>
            <p className="mb-5 font-mono text-[9px] tracking-[0.2em] text-gold">
              NAVIGATION
            </p>
            <nav aria-label="Footer navigation">
              <ul>
                {NAV_LINKS.map((link) => (
                  <li key={link.href} className="mb-3">
                    <Link
                      href={link.href}
                      data-cursor="hover"
                      className="font-sans text-sm text-muted transition-colors duration-200 hover:text-cream"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </div>

          <div>
            <p className="mb-5 font-mono text-[9px] tracking-[0.2em] text-gold">
              CONTACT
            </p>
            <a
              href="tel:+919886064364"
              data-cursor="hover"
              className="font-mono text-sm text-muted transition-colors duration-200 hover:text-gold"
            >
              +91 98860 64364
            </a>
            <p>
              <a
                href="mailto:info@rarepropertycounsel.com"
                data-cursor="hover"
                className="font-mono text-sm text-muted transition-colors duration-200 hover:text-gold"
              >
                info@rareadvisory.co
              </a>
            </p>

            <p className="mt-2 font-sans text-sm text-muted">Chennai, India</p>

            {/* <div className="mt-6 flex items-center gap-4">
              <a
                href="#"
                aria-label="LinkedIn"
                data-cursor="hover"
                className="text-cream/30 transition-colors duration-200 hover:text-gold"
              >
                <LinkedInIcon />
              </a>
              <a
                href="#"
                aria-label="Instagram"
                data-cursor="hover"
                className="text-cream/30 transition-colors duration-200 hover:text-gold"
              >
                <InstagramIcon />
              </a>
            </div> */}
          </div>
        </div>

        <div className="mt-12 flex flex-col justify-between gap-4 border-t border-white/5 pt-8 sm:flex-row">
          <p className="font-sans text-[11px] text-muted/50">
            &copy; 2026 Rare Property Council
          </p>
          <Link
            href="#"
            data-cursor="hover"
            className="font-sans text-[11px] text-muted/50 transition-colors duration-200 hover:text-muted"
          >
            Privacy Policy
          </Link>
        </div>
      </div>
    </footer>
  );
}
