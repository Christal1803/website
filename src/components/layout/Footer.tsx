import Link from "next/link";
import { Logo } from "@/components/ui/Logo";

const NAV_LINKS = [
  // { href: "/", label: "Home" },
  { href: "/#rarescore-new", label: "RareScore\u2122" },
  { href: "/#services", label: "Services" },
];

function InstagramIcon() {
  return (
    <svg
      width="36"
      height="36"
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

function YouTubeIcon() {
  return (
    <svg
      width="36"
      height="36"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z" />
      <polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02" />
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
              aria-label="Rare Property Advisory — Home"
            >
              <Logo variant="full" className="h-7 w-auto" />
            </Link>
            <p className="mt-2 font-mono text-[9px] tracking-[0.2em]  text-gold">
              ADVISORY
            </p>
            <div className="mt-8 space-y-1 font-sans text-sm leading-relaxed text-muted">
              <p>Strategic real estate advisory for those who don&rsquo;t need more options,</p>
              <p>just the right decisions</p>
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
              +91 9886064364
            </a>
            <p>
              <a
                href="mailto:info@rareadvisory.co"
                data-cursor="hover"
                className="font-mono text-sm text-muted transition-colors duration-200 hover:text-gold"
              >
                info@rareadvisory.co
              </a>
            </p>

            <p className="mt-2 font-sans text-sm text-muted">Chennai, India</p>

            <div className="mt-6 flex items-center gap-4">
              <a
                href="https://www.instagram.com/the_rare_advisor"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                data-cursor="hover"
                className="text-cream/30 transition-colors duration-200 hover:text-gold"
              >
                <InstagramIcon />
              </a>
              <a
                href="https://www.youtube.com/@RarePropertyAdvisory"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="YouTube"
                data-cursor="hover"
                className="text-cream/30 transition-colors duration-200 hover:text-gold"
              >
                <YouTubeIcon />
              </a>
            </div>
          </div>
        </div>

        <div className="mt-12 flex flex-col justify-between gap-4 border-t border-white/5 pt-8 sm:flex-row">
          <p className="font-sans text-[11px] text-muted/50">
            &copy; 2026 Rare Property Advisory
          </p>
          <a
            href="/Privacy_Policy.pdf"
            target="_blank"
            rel="noopener noreferrer"
            data-cursor="hover"
            className="font-sans text-[11px] text-muted/50 transition-colors duration-200 hover:text-muted"
          >
            Privacy Policy
          </a>
        </div>
      </div>
    </footer>
  );
}
