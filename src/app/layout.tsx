import type { Metadata } from "next";
import { Cormorant_Garamond, DM_Sans, DM_Mono } from "next/font/google";
import SmoothScroll from "@/components/providers/SmoothScroll";
import { CustomCursor } from "@/components/ui/CustomCursor";
import { NavBar } from "@/components/layout/NavBar";
import { Footer } from "@/components/layout/Footer";
import { ContactDrawer } from "@/components/ui/ContactDrawer";
import { FloatingContact } from "@/components/ui/FloatingContact";
import { MarketReportModal } from "@/components/ui/MarketReportModal";
import { cn } from "@/lib/utils";
import "./globals.css";

const cormorant = Cormorant_Garamond({
  weight: ["300", "400", "500", "600"],
  subsets: ["latin"],
  variable: "--font-cormorant",
  display: "swap",
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-dm-sans",
  display: "swap",
});

const dmMono = DM_Mono({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-dm-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: "RARE Property Council | Luxury Real Estate Advisory, Chennai",
  description:
    "Strategic real estate advisory for discerning buyers in Chennai and global markets. High-conviction opportunities, evaluated through RareScore\u2122.",
  openGraph: {
    type: "website",
    locale: "en_IN",
    siteName: "RARE Property Council",
    title: "RARE Property Council | Luxury Real Estate Advisory, Chennai",
    description:
      "Strategic real estate advisory for discerning buyers in Chennai and global markets. High-conviction opportunities, evaluated through RareScore\u2122.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={cn(cormorant.variable, dmSans.variable, dmMono.variable)}
    >
      <body className="min-h-screen antialiased">
        <SmoothScroll>
          <CustomCursor />
          <NavBar />
          {children}
          <Footer />
          {/* <ContactDrawer /> */}
          <FloatingContact />
          <MarketReportModal />
        </SmoothScroll>
      </body>
    </html>
  );
}
