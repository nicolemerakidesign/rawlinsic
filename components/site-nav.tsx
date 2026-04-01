"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect, useRef } from "react";

const LOGO_URL =
  "/images/pages/hero-bg.webp";

interface SiteNavProps {
  /** href for the "Get In Touch" CTA button. Defaults to /contact */
  ctaHref?: string;
}

export default function SiteNav({ ctaHref = "/contact" }: SiteNavProps) {
  const navRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const onScroll = () => {
      if (navRef.current) navRef.current.classList.toggle("scrolled", window.scrollY > 60);
    };
    window.addEventListener("scroll", onScroll);
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileSubOpen, setMobileSubOpen] = useState<Set<string>>(new Set());
  const close = () => { setMobileMenuOpen(false); setMobileSubOpen(new Set()); };
  const toggleSub = (key: string) => setMobileSubOpen(prev => {
    const next = new Set(prev);
    next.has(key) ? next.delete(key) : next.add(key);
    return next;
  });

  return (
    <>
      {/* Mobile Menu */}
      <div className={`mobile-menu${mobileMenuOpen ? " active" : ""}`}>
        <button className="mobile-menu-close" onClick={close} aria-label="Close menu">
          &times;
        </button>
        <a href="/" onClick={close}>Home</a>

        {/* Capabilities */}
        <button className="mobile-menu-parent" onClick={() => toggleSub("cap")}>
          Capabilities
          <svg className={`mobile-menu-chevron${mobileSubOpen.has("cap") ? " open" : ""}`} width="12" height="8" viewBox="0 0 12 8" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M1 1.5l5 5 5-5"/></svg>
        </button>
        <div className={`mobile-menu-sub${mobileSubOpen.has("cap") ? " open" : ""}`}>
          <a href="/capabilities" onClick={close}>View All</a>
          <a href="/capabilities#strategy" onClick={close}>Strategy</a>
          <a href="/capabilities#operations" onClick={close}>Operations</a>
          <button className="mobile-menu-parent mobile-menu-nested" onClick={() => toggleSub("tech")}>
            Technology
            <svg className={`mobile-menu-chevron${mobileSubOpen.has("tech") ? " open" : ""}`} width="12" height="8" viewBox="0 0 12 8" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M1 1.5l5 5 5-5"/></svg>
          </button>
          <div className={`mobile-menu-sub mobile-menu-sub-nested${mobileSubOpen.has("tech") ? " open" : ""}`}>
            <a href="/capabilities/technology/advanced-air-mobility" onClick={close}>Advanced Air Mobility</a>
            <a href="#" onClick={close}>Automation &amp; Integration</a>
          </div>
        </div>

        {/* About */}
        <button className="mobile-menu-parent" onClick={() => toggleSub("about")}>
          About
          <svg className={`mobile-menu-chevron${mobileSubOpen.has("about") ? " open" : ""}`} width="12" height="8" viewBox="0 0 12 8" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M1 1.5l5 5 5-5"/></svg>
        </button>
        <div className={`mobile-menu-sub${mobileSubOpen.has("about") ? " open" : ""}`}>
          <a href="/#story" onClick={close}>Who We Are</a>
          <a href="/about/our-people" onClick={close}>Our People</a>
          <a href="/about/areas-we-serve" onClick={close}>Areas We Serve</a>
        </div>

        {/* Insights */}
        <button className="mobile-menu-parent" onClick={() => toggleSub("insights")}>
          Insights
          <svg className={`mobile-menu-chevron${mobileSubOpen.has("insights") ? " open" : ""}`} width="12" height="8" viewBox="0 0 12 8" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M1 1.5l5 5 5-5"/></svg>
        </button>
        <div className={`mobile-menu-sub${mobileSubOpen.has("insights") ? " open" : ""}`}>
          <a href="/insights/thought-leadership" onClick={close}>Thought Leadership</a>
          <a href="/insights/case-studies" onClick={close}>Case Studies</a>
          <a href="/insights/podcast" onClick={close}>Podcast</a>
        </div>

        <a href="#" onClick={close}>Careers</a>
        <Link href={ctaHref} onClick={close} className="mobile-menu-cta">Get In Touch</Link>
      </div>

      {/* Navigation */}
      <nav className="nav" id="mainNav" ref={navRef}>
        <a href="/" className="nav-logo" aria-label="Rawlins home">
          <Image src={LOGO_URL} alt="Rawlins" width={160} height={40} className="nav-logo-img" priority />
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
              <a href="/capabilities">View All</a>
              <a href="/capabilities#strategy">Strategy</a>
              <a href="/capabilities#operations">Operations</a>
              <div className="nav-dropdown-sub">
                <span className="nav-dropdown-sub-label">
                  Technology
                  <svg className="nav-sub-chevron" width="6" height="8" viewBox="0 0 6 8" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M1 1l4 3-4 3"/>
                  </svg>
                </span>
                <div className="nav-sub-dropdown">
                  <a href="/capabilities/technology/advanced-air-mobility">Advanced Air Mobility</a>
                  <a href="/capabilities/technology/automation-integration">Automation &amp; Integration</a>
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
              <a href="/#story">Who We Are</a>
              <a href="/about/our-people">Our People</a>
              <a href="/about/areas-we-serve">Areas We Serve</a>
            </div>
          </div>

          <div className="nav-item has-sub">
            <a href="/insights" className="nav-item-label">
              Insights
              <svg className="nav-chevron" width="8" height="5" viewBox="0 0 8 5" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M1 1l3 3 3-3"/>
              </svg>
            </a>
            <div className="nav-dropdown">
              <a href="/insights/thought-leadership">Thought Leadership</a>
              <a href="/insights/case-studies">Case Studies</a>
              <a href="/insights/podcast">Podcast</a>
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
