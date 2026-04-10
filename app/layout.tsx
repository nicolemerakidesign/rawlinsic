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
    streetAddress: "500 Damonte Ranch Parkway #980",
    addressLocality: "Reno",
    addressRegion: "NV",
    postalCode: "89521",
    addressCountry: "US",
  },
  sameAs: [
    "https://www.linkedin.com/company/107078508/",
    "https://www.facebook.com/rawlinsic",
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

/* LocalBusiness / ProfessionalService schema — richer Google Maps /
   local-pack representation linked to the Reno, NV Google Business
   Profile. */
const LOCAL_BUSINESS_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  "@id": `${SITE_URL}#business`,
  name: "Rawlins Infra Consult",
  alternateName: "Rawlins IC",
  url: SITE_URL,
  image: `${SITE_URL}/images/pages/hero-bg.webp`,
  logo: `${SITE_URL}/images/pages/hero-bg.webp`,
  description:
    "Global consultancy at the intersection of strategy, operations, and technology — helping public agencies and private organizations translate ambitious priorities into measurable results.",
  email: "info@rawlinsic.com",
  telephone: "+1-775-843-3822",
  priceRange: "$$$$",
  address: {
    "@type": "PostalAddress",
    streetAddress: "500 Damonte Ranch Parkway #980",
    addressLocality: "Reno",
    addressRegion: "NV",
    postalCode: "89521",
    addressCountry: "US",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: 39.4451,
    longitude: -119.7517,
  },
  areaServed: {
    "@type": "Place",
    name: "Worldwide",
  },
  sameAs: [
    "https://www.linkedin.com/company/107078508/",
    "https://www.facebook.com/rawlinsic",
  ],
  knowsAbout: [
    "Strategy consulting",
    "Operations consulting",
    "Technology strategy",
    "Data governance",
    "Automation and AI",
    "Advanced Air Mobility",
    "Uncrewed Aircraft Systems",
    "Transportation infrastructure",
    "Organizational change management",
  ],
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Consulting Services",
    itemListElement: [
      /* ── Strategy ── */
      {
        "@type": "OfferCatalog",
        name: "Strategy",
        url: `${SITE_URL}/capabilities#strategy`,
        description:
          "Decision systems, planning, and organizational design that turn priorities into measurable results.",
        itemListElement: [
          { "@type": "Offer", itemOffered: { "@type": "Service", name: "Strategic Planning", description: "Translate leadership vision into measurable goals, developing roadmaps that balance short-term priorities with long-term organizational ambitions." } },
          { "@type": "Offer", itemOffered: { "@type": "Service", name: "Organizational IT Strategy", description: "Define how technology investments, platforms, and capabilities will enable business goals, translating priorities into a pragmatic roadmap for modernization, security, and measurable outcomes." } },
          { "@type": "Offer", itemOffered: { "@type": "Service", name: "Organizational Analysis", description: "Assess structures, processes, and culture to identify inefficiencies and surface opportunities for meaningful, data-informed improvement." } },
          { "@type": "Offer", itemOffered: { "@type": "Service", name: "Organizational Change Management", description: "Guide organizations through transformation with frameworks that earn buy-in, reduce friction, and sustain momentum across every level." } },
          { "@type": "Offer", itemOffered: { "@type": "Service", name: "Performance Management", description: "Establish clear goals, measures, and feedback loops that tie individual and team performance to strategic outcomes." } },
          { "@type": "Offer", itemOffered: { "@type": "Service", name: "Program Effectiveness", description: "Evaluate whether programs are delivering intended outcomes, identify performance gaps, and optimize execution." } },
          { "@type": "Offer", itemOffered: { "@type": "Service", name: "Asset Management", description: "Manage assets across their lifecycle to maximize value and performance while controlling cost and risk." } },
        ],
      },
      /* ── Operations ── */
      {
        "@type": "OfferCatalog",
        name: "Operations",
        url: `${SITE_URL}/capabilities#operations`,
        description:
          "People, process, culture, and workforce programs that foster accountability and high performance.",
        itemListElement: [
          { "@type": "Offer", itemOffered: { "@type": "Service", name: "Process & Procedure Improvements", description: "Analyze and streamline end-to-end processes and procedures to reduce waste and risk, improve consistency, and strengthen operational performance." } },
          { "@type": "Offer", itemOffered: { "@type": "Service", name: "Program and Project Leadership", description: "Guide senior leaders in leading complex, multistakeholder programs and projects on schedule, within scope, and aligned with organizational goals." } },
          { "@type": "Offer", itemOffered: { "@type": "Service", name: "Project Delivery", description: "Support project teams from kickoff to close-out to deliver on time and within budget, managing risk, coordinating stakeholders, and ensuring quality deliverables." } },
          { "@type": "Offer", itemOffered: { "@type": "Service", name: "Maintenance & Operations Improvements", description: "Optimize day-to-day operations and maintenance to reduce downtime, improve service reliability, and increase work execution efficiency." } },
          { "@type": "Offer", itemOffered: { "@type": "Service", name: "Program Quality Assurance", description: "Embed quality governance, reviews, and feedback loops to ensure program deliverables meet defined standards and stakeholder expectations." } },
          { "@type": "Offer", itemOffered: { "@type": "Service", name: "Administration Program Services", description: "Streamline administrative functions by improving processes, controls, and reporting to increase efficiency, compliance, and operational performance." } },
          { "@type": "Offer", itemOffered: { "@type": "Service", name: "Owner's Representative", description: "Serve as the owner's trusted on-site representative, protecting your interests, coordinating contractors, and ensuring scope, quality, schedule, and standards are met." } },
          { "@type": "Offer", itemOffered: { "@type": "Service", name: "Finance, Budget & Procurement", description: "Provide finance, budgeting, and procurement management to help organizations allocate resources effectively, maintain fiscal responsibility, and ensure compliance." } },
        ],
      },
      /* ── Technology ── */
      {
        "@type": "OfferCatalog",
        name: "Technology",
        url: `${SITE_URL}/capabilities#technology`,
        description:
          "Human-centric AI integration, data governance, analytics, and advanced air mobility.",
        itemListElement: [
          { "@type": "Offer", itemOffered: { "@type": "Service", name: "Data Governance", description: "Develop and implement data governance policies, processes, and standards so data is accurate, secure, consistent, and used responsibly across the enterprise.", url: `${SITE_URL}/capabilities/technology/automation-integration` } },
          { "@type": "Offer", itemOffered: { "@type": "Service", name: "Automation & Integration", description: "Connect systems, automate workflows, and integrate AI so people can focus on high-value work and decisions rather than repetitive tasks.", url: `${SITE_URL}/capabilities/technology/automation-integration` } },
          { "@type": "Offer", itemOffered: { "@type": "Service", name: "Advanced Air Mobility & Uncrewed Aircraft Systems", description: "Planning, implementation, and integration of advanced air mobility and uncrewed aircraft systems within existing transportation networks.", url: `${SITE_URL}/capabilities/technology/advanced-air-mobility` } },
        ],
      },
    ],
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
        <Script
          id="schema-local-business"
          type="application/ld+json"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(LOCAL_BUSINESS_SCHEMA) }}
        />
        <Script id="keyboard-nav" strategy="afterInteractive">{`
          document.addEventListener('keydown',function(e){if(e.key==='Tab')document.body.classList.add('keyboard-nav')});
          document.addEventListener('mousedown',function(){document.body.classList.remove('keyboard-nav')});
        `}</Script>
      </body>
    </html>
  );
}
