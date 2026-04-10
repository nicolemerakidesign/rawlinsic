"use client";

import Link from "next/link";
import SiteNav from "@/components/site-nav";
import SiteFooter from "@/components/site-footer";

const quickLinks = [
  { href: "/", label: "Home" },
  { href: "/capabilities", label: "Capabilities" },
  { href: "/about/our-people", label: "Our People" },
  { href: "/insights", label: "Insights" },
  { href: "/contact", label: "Contact" },
];

export default function NotFoundPage() {
  return (
    <>
      <div className="ambient-bg" />
      <div className="ambient-orbs">
        <div className="orb orb-1" />
        <div className="orb orb-2" />
        <div className="orb orb-3" />
        <div className="orb orb-4" />
      </div>

      <SiteNav />

      <main className="nf-main" id="top">
        <div className="nf-content">
          <span className="hero-label">
            <span className="gold-text">Error 404</span>
          </span>
          <h1 className="hero-title nf-title">
            Page <em>not found</em>
          </h1>
          <p className="hero-sub nf-sub">
            The page you were looking for has moved, been retired, or never existed. Let&rsquo;s
            get you back on track.
          </p>

          <div className="nf-actions">
            <Link href="/" className="auto-hero-btn">
              <span>Back to Home</span>
            </Link>
            <Link href="/contact" className="nf-secondary-btn">
              <span>Contact Us</span>
            </Link>
          </div>

          <div className="nf-links">
            <p className="nf-links-label">Or explore:</p>
            <ul className="nf-links-list">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href}>{link.label}</Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </main>

      <SiteFooter />
    </>
  );
}
