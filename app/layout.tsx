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

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://rawlinsic.com";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Home | Rawlins Infra Consult",
    template: "%s | Rawlins Infra Consult",
  },
  description:
    "Rawlins Infra Consult is a global consultancy at the intersection of strategy, operations, and technology — helping organizations translate ambitious priorities into measurable results.",
  openGraph: {
    title: "Rawlins Infra Consult",
    description:
      "Global consultancy at the intersection of strategy, operations, and technology.",
    url: SITE_URL,
    siteName: "Rawlins Infra Consult",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Rawlins Infra Consult",
    description:
      "Global consultancy at the intersection of strategy, operations, and technology.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

const ORGANIZATION_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Rawlins Infra Consult",
  alternateName: "Rawlins IC",
  url: SITE_URL,
  logo: `${SITE_URL}/images/pages/hero-bg.webp`,
  description:
    "Global consultancy at the intersection of strategy, operations, and technology — helping organizations translate ambitious priorities into measurable results.",
  email: "info@rawlinsic.com",
  telephone: "+1-775-843-3822",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Reno",
    addressRegion: "NV",
    addressCountry: "US",
  },
  sameAs: [
    "https://www.linkedin.com/company/107078508/",
  ],
  areaServed: {
    "@type": "Place",
    name: "Worldwide",
  },
};

const WEBSITE_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "Rawlins Infra Consult",
  url: SITE_URL,
  potentialAction: {
    "@type": "SearchAction",
    target: `${SITE_URL}/?q={search_term_string}`,
    "query-input": "required name=search_term_string",
  },
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
        <Script
          id="schema-organization"
          type="application/ld+json"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(ORGANIZATION_SCHEMA) }}
        />
        <Script
          id="schema-website"
          type="application/ld+json"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(WEBSITE_SCHEMA) }}
        />
        <Script id="keyboard-nav" strategy="afterInteractive">{`
          document.addEventListener('keydown',function(e){if(e.key==='Tab')document.body.classList.add('keyboard-nav')});
          document.addEventListener('mousedown',function(){document.body.classList.remove('keyboard-nav')});
        `}</Script>
      </body>
    </html>
  );
}
