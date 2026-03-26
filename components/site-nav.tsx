"use client";

import Link from "next/link";
import { useState } from "react";

const LOGO_URL =
  "https://assets.macaly-user-data.dev/cdn-cgi/image/format=webp,width=2000,height=2000,fit=scale-down,quality=90,anim=true/c4zcddt61rtnmmmh8sqtv1fn/dkeher82cub0yp82vsjcz9t9/cfZ06kEF6A_pOkuifk_rD.webp";

interface SiteNavProps {
  /** href for the "Get In Touch" CTA button. Defaults to /contact */
  ctaHref?: string;
}

export default function SiteNav({ ctaHref = "/contact" }: SiteNavProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const close = () => setMobileMenuOpen(false);

  return (
    <>
      {/* Mobile Menu */}
      <div className={`mobile-menu${mobileMenuOpen ? " active" : ""}`}>
        <button className="mobile-menu-close" onClick={close} aria-label="Close menu">
          &times;
        </button>
        <a href="/" onClick={close}>Home</a>
        <a href="/capabilities/advanced-air-mobility" onClick={close}>Advanced Air Mobility</a>
        <a href="/about/our-people" onClick={close}>Our People</a>
        <a href="/about/areas-we-serve" onClick={close}>Areas We Serve</a>
        <a href="#" onClick={close}>Insights</a>
        <a href="#" onClick={close}>Careers</a>
        <Link href={ctaHref} onClick={close}>Get In Touch</Link>
      </div>

      {/* Navigation */}
      <nav className="nav" id="mainNav">
        <a href="/" className="nav-logo" aria-label="Rawlins home">
          <img src={LOGO_URL} alt="Rawlins" className="nav-logo-img" />
        </a>

        <div className="nav-center">
          <div className="nav-item has-sub">
            <span className="nav-item-label">
              Capabilities
              <svg className="nav-chevron" width="8" height="5" viewBox="0 0 8 5" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M1 1l3 3 3-3"/>
              </svg>
            </span>
            <div className="nav-dropdown">
              <a href="#">View All</a>
              <a href="#">Strategy</a>
              <a href="#">Operations</a>
              <div className="nav-dropdown-sub">
                <span className="nav-dropdown-sub-label">
                  Technology
                  <svg className="nav-sub-chevron" width="6" height="8" viewBox="0 0 6 8" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M1 1l4 3-4 3"/>
                  </svg>
                </span>
                <div className="nav-sub-dropdown">
                  <a href="/capabilities/advanced-air-mobility">Advanced Air Mobility</a>
                  <a href="#">Automation &amp; Integration</a>
                </div>
              </div>
            </div>
          </div>

          <div className="nav-item has-sub">
            <span className="nav-item-label">
              About
              <svg className="nav-chevron" width="8" height="5" viewBox="0 0 8 5" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M1 1l3 3 3-3"/>
              </svg>
            </span>
            <div className="nav-dropdown">
              <a href="#">Who We Are</a>
              <a href="/about/our-people">Our People</a>
              <a href="/about/areas-we-serve">Areas We Serve</a>
            </div>
          </div>

          <div className="nav-item has-sub">
            <span className="nav-item-label">
              Insights
              <svg className="nav-chevron" width="8" height="5" viewBox="0 0 8 5" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M1 1l3 3 3-3"/>
              </svg>
            </span>
            <div className="nav-dropdown">
              <a href="#">Thought Leadership</a>
              <a href="#">Case Studies</a>
              <a href="#">Podcast</a>
            </div>
          </div>

          <a className="nav-item" href="#">Careers</a>
        </div>

        <div className="nav-right">
          <Link href={ctaHref} className="nav-cta">Get In Touch</Link>
        </div>

        <div
          className="menu-toggle"
          onClick={() => setMobileMenuOpen((v) => !v)}
          role="button"
          aria-label="Open menu"
          tabIndex={0}
        >
          <span />
          <span />
          <span />
        </div>
      </nav>
    </>
  );
}
