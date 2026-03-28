"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import SiteNav from "@/components/site-nav";
import SiteFooter from "@/components/site-footer";
import PasswordGate from "@/components/password-gate";

/* ── Cursor component — must live inside PasswordGate children so refs exist ── */
function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const mouseX = useRef(0);
  const mouseY = useRef(0);
  const ringX = useRef(0);
  const ringY = useRef(0);
  const animFrame = useRef<number | null>(null);

  useEffect(() => {
    const dot = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;
    dot.style.opacity = "0";
    ring.style.opacity = "0";
    let started = false;
    const onMouseMove = (e: MouseEvent) => {
      mouseX.current = e.clientX;
      mouseY.current = e.clientY;
      dot.style.left = e.clientX - 4 + "px";
      dot.style.top = e.clientY - 4 + "px";
      if (!started) {
        started = true;
        ringX.current = e.clientX;
        ringY.current = e.clientY;
        dot.style.opacity = "1";
        ring.style.opacity = "1";
      }
    };
    const animateRing = () => {
      ringX.current += (mouseX.current - ringX.current) * 0.12;
      ringY.current += (mouseY.current - ringY.current) * 0.12;
      ring.style.left = ringX.current - 20 + "px";
      ring.style.top = ringY.current - 20 + "px";
      animFrame.current = requestAnimationFrame(animateRing);
    };
    document.addEventListener("mousemove", onMouseMove);
    animFrame.current = requestAnimationFrame(animateRing);
    const hoverEls = document.querySelectorAll("a, button, .nav-item, .back-to-top");
    hoverEls.forEach((el) => {
      el.addEventListener("mouseenter", () => ring.classList.add("hover"));
      el.addEventListener("mouseleave", () => ring.classList.remove("hover"));
    });
    return () => {
      document.removeEventListener("mousemove", onMouseMove);
      if (animFrame.current) cancelAnimationFrame(animFrame.current);
    };
  }, []);

  return (
    <>
      <div className="cursor-dot" ref={dotRef} />
      <div className="cursor-ring" ref={ringRef} />
    </>
  );
}

export default function PodcastPage() {

  /* ── Micro particles ── */
  useEffect(() => {
    const container = document.getElementById("microParticles");
    if (!container) return;
    for (let i = 0; i < 15; i++) {
      const p = document.createElement("div");
      p.className = "micro-particle";
      p.style.left = Math.random() * 100 + "%";
      p.style.animationDuration = 8 + Math.random() * 14 + "s";
      p.style.animationDelay = Math.random() * 12 + "s";
      const size = 1.5 + Math.random() * 2.5 + "px";
      p.style.width = size;
      p.style.height = size;
      p.style.opacity = String(0.15 + Math.random() * 0.25);
      container.appendChild(p);
    }
    return () => { container.innerHTML = ""; };
  }, []);

  /* ── Nav scroll + back-to-top ── */
  useEffect(() => {
    const nav = document.getElementById("mainNav");
    const backToTop = document.getElementById("backToTop");
    const onScroll = () => {
      if (nav) nav.classList.toggle("scrolled", window.scrollY > 60);
      if (backToTop) backToTop.classList.toggle("visible", window.scrollY > 500);
    };
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /* ── Scroll reveal — delayed for PasswordGate ── */
  useEffect(() => {
    let observer: IntersectionObserver;
    const raf = requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        const reveals = document.querySelectorAll(".reveal");
        reveals.forEach((el) => { void (el as HTMLElement).offsetHeight; });
        observer = new IntersectionObserver(
          (entries) => {
            entries.forEach((entry) => {
              if (entry.isIntersecting) entry.target.classList.add("visible");
            });
          },
          { threshold: 0.08, rootMargin: "0px 0px -40px 0px" }
        );
        reveals.forEach((el) => observer.observe(el));
        setTimeout(() => {
          reveals.forEach((el) => {
            const r = el.getBoundingClientRect();
            if (r.top < window.innerHeight && r.bottom > 0) el.classList.add("visible");
          });
        }, 100);
      });
    });
    return () => { cancelAnimationFrame(raf); if (observer) observer.disconnect(); };
  }, []);

  return (
    <PasswordGate>
      {/* Ambient Background */}
      <div className="ambient-bg" />
      <div className="ambient-orbs">
        <div className="orb orb-1" />
        <div className="orb orb-2" />
        <div className="orb orb-3" />
        <div className="orb orb-4" />
      </div>
      <div className="micro-particles" id="microParticles" />

      {/* Custom Cursor */}
      <CustomCursor />

      {/* Back to Top */}
      <a href="#top" className="back-to-top" id="backToTop" aria-label="Back to top">
        <svg viewBox="0 0 24 24">
          <path d="M12 19V5M5 12l7-7 7 7" />
        </svg>
      </a>

      <SiteNav />

      <div className="content-wrapper">
        {/* ── Hero Section with animated waveform ── */}
        <section className="pod-hero" id="top">
          <div className="pod-hero-waveform">
            {Array.from({ length: 40 }).map((_, i) => (
              <div
                key={i}
                className="pod-wave-bar"
                style={{
                  animationDelay: `${i * 0.08}s`,
                  height: `${20 + Math.sin(i * 0.5) * 30 + Math.random() * 20}%`,
                }}
              />
            ))}
          </div>
          <div className="pod-hero-overlay" />
          <div className="pod-hero-content">
            <div className="pod-hero-icon">
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z" />
                <path d="M19 10v2a7 7 0 0 1-14 0v-2" />
                <line x1="12" y1="19" x2="12" y2="23" />
                <line x1="8" y1="23" x2="16" y2="23" />
              </svg>
            </div>
            <p className="section-label" style={{ textAlign: "center" }}>
              <span className="gold-text">Listen In. Learn More. Lead Better.</span>
            </p>
            <h1 className="hero-title">The Rawlins Way</h1>
            <p className="pod-hero-tagline">
              Providing &ldquo;Value&rdquo; Consulting with a Purpose
            </p>
          </div>
        </section>

        {/* Divider */}
        <div className="section-divider">
          <div className="gold-line" />
        </div>

        {/* ── About + Player Two-Column ── */}
        <section className="pod-main reveal">
          <div className="pod-main-grid">
            {/* Left: About */}
            <div className="pod-about">
              <h2 className="pod-about-title">
                <span className="gold-text">About the Podcast</span>
              </h2>
              <p className="pod-about-text">
                The Rawlins Way podcast offers an inside look at how Rawlins Infra
                Consult delivers value-driven infrastructure consulting. Through
                project deep dives, team insights, and industry discussions, discover
                our unique approach to creating exceptional client outcomes while
                fostering team success.
              </p>

              <div className="pod-topics">
                <h3 className="pod-topics-title">What We Cover</h3>
                <div className="pod-topic-tags">
                  <span className="pod-topic-tag">Project Deep Dives</span>
                  <span className="pod-topic-tag">Team Insights</span>
                  <span className="pod-topic-tag">Industry Trends</span>
                  <span className="pod-topic-tag">Client Outcomes</span>
                  <span className="pod-topic-tag">Transportation Strategy</span>
                  <span className="pod-topic-tag">Infrastructure Innovation</span>
                </div>
              </div>

              <div className="pod-cta-row">
                <Link href="/about" className="cs-cta-btn" style={{ width: "fit-content" }}>
                  <span>Meet the Team</span>
                </Link>
              </div>
            </div>

            {/* Right: Embedded Player */}
            <div className="pod-player-wrap reveal rd2">
              <div className="pod-player-label">
                <div className="pod-pulse" />
                <span>Now Streaming</span>
              </div>
              <div className="pod-player-embed">
                <iframe
                  width="100%"
                  height="600"
                  src="https://app.hiro.fm/embed/6750fc8bfc938602a4e7fd78"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope"
                  style={{ borderRadius: 12, border: "none" }}
                />
              </div>
            </div>
          </div>
        </section>

        {/* Divider */}
        <div className="section-divider">
          <div className="gold-line" />
        </div>

        {/* ── Equalizer Visual Break ── */}
        <section className="pod-eq-section">
          <div className="pod-eq-bars">
            {Array.from({ length: 60 }).map((_, i) => (
              <div
                key={i}
                className="pod-eq-bar"
                style={{
                  animationDelay: `${i * 0.06}s`,
                  animationDuration: `${0.8 + Math.random() * 0.8}s`,
                }}
              />
            ))}
          </div>
        </section>

        {/* ── CTA Section ── */}
        <section className="cs-cta-section reveal">
          <p className="cs-cta-label">
            <span className="gold-text">Ready to Take Your Organization to the Next Level?</span>
          </p>
          <h2 className="cs-cta-title">
            Let&apos;s Build Something Together
          </h2>
          <p className="cs-cta-text">
            Rawlins Infra Consult has the expertise and experience to drive your
            organization&apos;s success. Our tailored solutions and strategic approach
            help transportation agencies nationwide improve performance and meet
            evolving challenges.
          </p>
          <Link href="/contact" className="cs-cta-btn">
            <span>Connect With Us</span>
          </Link>
        </section>

        {/* Divider */}
        <div className="section-divider">
          <div className="gold-line" />
        </div>
      </div>

      <SiteFooter />
    </PasswordGate>
  );
}
