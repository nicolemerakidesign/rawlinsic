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
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"><path d="M18 6L6 18M6 6l12 12" /></svg>
        </button>

        <div className="mobile-menu-items">
          <a href="/" onClick={close} className="mobile-menu-link">Home</a>

          {/* Capabilities */}
          <div className="mobile-menu-group">
            <button className="mobile-menu-parent" onClick={() => toggleSub("cap")}>
              Capabilities
              <svg className={`mobile-menu-chevron${mobileSubOpen.has("cap") ? " open" : ""}`} width="12" height="8" viewBox="0 0 12 8" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M1 1.5l5 5 5-5"/></svg>
            </button>
            <div className={`mobile-menu-sub${mobileSubOpen.has("cap") ? " open" : ""}`}>
              <a href="/capabilities" onClick={close}>View All</a>
              <a href="/capabilities#strategy" onClick={close}>Strategy</a>
              <a href="/capabilities#operations" onClick={close}>Operations</a>
              <a href="/capabilities#technology" onClick={close}>Technology</a>
              <a href="/capabilities/technology/advanced-air-mobility" onClick={close}>Advanced Air Mobility</a>
            </div>
          </div>

          {/* About */}
          <div className="mobile-menu-group">
            <button className="mobile-menu-parent" onClick={() => toggleSub("about")}>
              About
              <svg className={`mobile-menu-chevron${mobileSubOpen.has("about") ? " open" : ""}`} width="12" height="8" viewBox="0 0 12 8" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M1 1.5l5 5 5-5"/></svg>
            </button>
            <div className={`mobile-menu-sub${mobileSubOpen.has("about") ? " open" : ""}`}>
              <a href="/#story" onClick={close}>Who We Are</a>
              <a href="/about/our-people" onClick={close}>Our People</a>
              <a href="/about/areas-we-serve" onClick={close}>Areas We Serve</a>
            </div>
          </div>

          {/* Insights */}
          <div className="mobile-menu-group">
            <button className="mobile-menu-parent" onClick={() => toggleSub("insights")}>
              Insights
              <svg className={`mobile-menu-chevron${mobileSubOpen.has("insights") ? " open" : ""}`} width="12" height="8" viewBox="0 0 12 8" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M1 1.5l5 5 5-5"/></svg>
            </button>
            <div className={`mobile-menu-sub${mobileSubOpen.has("insights") ? " open" : ""}`}>
              <a href="/insights" onClick={close}>View All</a>
              <a href="/insights/thought-leadership" onClick={close}>Thought Leadership</a>
              <a href="/insights/case-studies" onClick={close}>Case Studies</a>
              <a href="/insights/podcast" onClick={close}>Podcast</a>
            </div>
          </div>

          <a href="#" onClick={close} className="mobile-menu-link">Careers</a>
          <a href="/contact" onClick={close} className="mobile-menu-link">Contact</a>
        </div>

        {/* Social icons */}
        <div className="mobile-menu-social">
          <a href="https://www.linkedin.com/company/rawlins-infra-consult/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" /></svg>
          </a>
          <a href="https://g.co/kgs/rawlins" target="_blank" rel="noopener noreferrer" aria-label="Google">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 01-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" /><path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" /><path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" /><path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" /></svg>
          </a>
        </div>

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
                <span className="nav-dropdown-sub-label" style={{ cursor: "pointer" }} onClick={() => { window.location.href = "/capabilities#technology"; }}>
                  Technology
                  <svg className="nav-sub-chevron" width="6" height="8" viewBox="0 0 6 8" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M1 1l4 3-4 3"/>
                  </svg>
                </span>
                <div className="nav-sub-dropdown">
                  <a href="/capabilities/technology/advanced-air-mobility">Advanced Air Mobility</a>
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
            <span className="nav-item-label">
              Insights
              <svg className="nav-chevron" width="8" height="5" viewBox="0 0 8 5" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M1 1l3 3 3-3"/>
              </svg>
            </span>
            <div className="nav-dropdown">
              <a href="/insights">View All</a>
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
