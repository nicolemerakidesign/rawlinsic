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
        {children}
        {/* UserWay Accessibility Widget — sign up at https://userway.org for a free account ID and replace below */}
        <Script
          src="https://cdn.userway.org/widget.js"
          data-account="REPLACE_WITH_YOUR_ACCOUNT_ID"
          strategy="lazyOnload"
        />
      </body>
    </html>
  );
}
