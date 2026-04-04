"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import SiteNav from "@/components/site-nav";
import SiteFooter from "@/components/site-footer";
import PasswordGate from "@/components/password-gate";

export default function CareersPage() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const mouseX = useRef(0);
  const mouseY = useRef(0);
  const ringX = useRef(0);
  const ringY = useRef(0);
  const animFrame = useRef<number | null>(null);

  /* ── Custom cursor ── */
  useEffect(() => {
    const dot = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;
    const onMouseMove = (e: MouseEvent) => {
      mouseX.current = e.clientX;
      mouseY.current = e.clientY;
      dot.style.left = e.clientX - 4 + "px";
      dot.style.top = e.clientY - 4 + "px";
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

  /* ── Scroll reveal ── */
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
    <>
      {/* Custom Cursor */}
      <div className="cursor-dot" ref={dotRef} />
      <div className="cursor-ring" ref={ringRef} />

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

        {/* Back to Top */}
        <a href="#top" className="back-to-top" id="backToTop" aria-label="Back to top">
          <svg viewBox="0 0 24 24">
            <path d="M12 19V5M5 12l7-7 7 7" />
          </svg>
        </a>

        <SiteNav />

        <div className="content-wrapper">
          {/* ── Hero ── */}
          <section className="cs-hero" id="top">
            <div className="cs-hero-content">
              <p className="section-label" style={{ textAlign: "center" }}>
                <span className="gold-text">Careers at Rawlins</span>
              </p>
              <h1 className="hero-title">
                Work With <em>Us</em>
              </h1>
              <p className="hero-sub" style={{ maxWidth: 680 }}>
                We&rsquo;re always looking for talented people who are passionate about solving complex challenges in strategy, operations, and technology. If that sounds like you, we&rsquo;d love to connect.
              </p>
            </div>
          </section>

          {/* Divider */}
          <div className="section-divider">
            <div className="gold-line" />
          </div>

          {/* ── CTA ── */}
          <section className="cs-cta-section reveal">
            <p className="cs-cta-label">
              <span className="gold-text">Join Our Team</span>
            </p>
            <h2 className="cs-cta-title">
              Ready to Make an <em>Impact?</em>
            </h2>
            <p className="cs-cta-text">
              Tell us about yourself and what kind of work excites you. No formal application needed&mdash;just reach out and start a conversation.
            </p>
            <Link href="/contact" className="cs-cta-btn">
              <span>Get In Touch</span>
            </Link>
          </section>

          {/* Divider */}
          <div className="section-divider">
            <div className="gold-line" />
          </div>
        </div>

        <SiteFooter />
      </PasswordGate>
    </>
  );
}
