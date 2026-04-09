import "./globals.css";

import type { Metadata } from "next";
import Script from "next/script";
import { DM_Sans, Cormorant_Garamond } from "next/font/google";

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  style: ["normal", "italic"],
});

export const metadata: Metadata = {
  title: {
    default: "Home | Rawlins Infra Consult",
    template: "%s | Rawlins Infra Consult",
  },
  description:
    "Rawlins Infra Consult is a global consultancy at the intersection of strategy, operations, and technology — helping organizations translate ambitious priorities into measurable results.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={`${dmSans.variable} ${cormorant.variable} antialiased`}
        suppressHydrationWarning={true}
      >
        <a href="#main-content" className="skip-to-content">Skip to main content</a>
        <div id="main-content">
        {children}
        </div>
        <Script id="keyboard-nav" strategy="afterInteractive">{`
          document.addEventListener('keydown',function(e){if(e.key==='Tab')document.body.classList.add('keyboard-nav')});
          document.addEventListener('mousedown',function(){document.body.classList.remove('keyboard-nav')});
        `}</Script>
      </body>
    </html>
  );
}
