"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import SiteNav from "@/components/site-nav";
import SiteFooter from "@/components/site-footer";
import PasswordGate from "@/components/password-gate";

const VALUES = [
  {
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" />
        <circle cx="12" cy="12" r="6" />
        <circle cx="12" cy="12" r="2" />
      </svg>
    ),
    title: "Meaningful Impact",
    desc: "Every project connects to something larger\u2014a transportation network that moves a region, a data strategy that transforms an agency, a technology deployment that changes how people work.",
  },
  {
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M15 3h6v6" />
        <path d="M9 21H3v-6" />
        <path d="M21 3l-7 7" />
        <path d="M3 21l7-7" />
      </svg>
    ),
    title: "Autonomy & Trust",
    desc: "We hire people who are ready to lead. You will own your work, shape your approach, and have the backing of a team that values judgment over process.",
  },
  {
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="22 7 13.5 15.5 8.5 10.5 2 17" />
        <polyline points="16 7 22 7 22 13" />
      </svg>
    ),
    title: "Growth Without Ceilings",
    desc: "As a growing firm, we offer something rare: the chance to build the firm as you build your career. New capabilities, new sectors, new challenges\u2014if you are ambitious, there is room.",
  },
];

const PROFILES = [
  {
    title: "Strategy & Advisory",
    desc: "You see the whole board. You have led planning efforts, navigated governance structures, or shaped organizational change. You think in frameworks but communicate in plain language.",
  },
  {
    title: "Operations & Delivery",
    desc: "You make things work. You have managed programs, improved processes, or led teams through complex multi-stakeholder projects. You are pragmatic, accountable, and calm under pressure.",
  },
  {
    title: "Technology & Data",
    desc: "You connect systems to outcomes. Whether it is data governance, automation, analytics, or emerging tech like AI and advanced air mobility\u2014you bring technical depth paired with the ability to translate for non-technical leaders.",
  },
];

const WORK_ITEMS = [
  { keyword: "Client-Embedded", desc: "We work alongside our clients, not from a distance. Expect deep integration, not drive-by deliverables." },
  { keyword: "Cross-Disciplinary", desc: "Strategy, operations, and technology are not separate lanes here. You will work across all three." },
  { keyword: "Ownership", desc: "You will lead workstreams, present to executives, and own outcomes from day one." },
  { keyword: "Continuous Learning", desc: "From our podcast to our thought leadership program, we invest in building expertise across the firm." },
];

export default function CareersPage() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const mouseX = useRef(0);
  const mouseY = useRef(0);
  const ringX = useRef(0);
  const ringY = useRef(0);
  const animFrame = useRef<number | null>(null);
  const [expandedProfile, setExpandedProfile] = useState<number | null>(null);

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
    const hoverEls = document.querySelectorAll("a, button, .nav-item, .back-to-top, .careers-value-card, .cap-svc-row");
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
                <span className="gold-text">Join Rawlins</span>
              </p>
              <h1 className="hero-title">
                Build What <em>Matters.</em>
              </h1>
              <p className="hero-sub" style={{ maxWidth: 720 }}>
                We are advisors, builders, and problem-solvers working at the intersection of strategy, operations, and technology. If you thrive on meaningful work with exceptional people, we want to hear from you.
              </p>
            </div>
          </section>

          {/* Divider */}
          <div className="section-divider">
            <div className="gold-line" />
          </div>

          {/* ── Why Rawlins ── */}
          <section className="cs-cta-section reveal">
            <p className="cs-cta-label">
              <span className="gold-text">Why Rawlins</span>
            </p>
            <h2 className="cs-cta-title">
              Work That Shapes <em>Organizations</em>
            </h2>
            <p className="cs-cta-text">
              At Rawlins, every engagement is a chance to leave something better than you found it. We partner with agencies and enterprises facing real complexity&mdash;and we give our people the autonomy, trust, and resources to solve problems that matter. No two projects look the same. That is the point.
            </p>
            <div className="careers-values-grid">
              {VALUES.map((v) => (
                <div key={v.title} className="careers-value-card">
                  <div className="careers-value-icon">{v.icon}</div>
                  <h3 className="careers-value-title">{v.title}</h3>
                  <p className="careers-value-desc">{v.desc}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Divider */}
          <div className="section-divider">
            <div className="gold-line" />
          </div>

          {/* ── Who Thrives Here ── */}
          <section className="cs-cta-section reveal">
            <p className="cs-cta-label">
              <span className="gold-text">Who Thrives Here</span>
            </p>
            <h2 className="cs-cta-title">
              Advisors, Operators, <em>Technologists</em>
            </h2>
            <p className="cs-cta-text">
              We don&rsquo;t hire for narrow roles. We look for people who bring depth in one area and curiosity across all three.
            </p>
            <div className="cap-svc-list" style={{ maxWidth: 800, margin: "0 auto", textAlign: "left" }}>
              {PROFILES.map((p, i) => {
                const isOpen = expandedProfile === i;
                return (
                  <div
                    key={p.title}
                    className={`cap-svc-row${isOpen ? " expanded" : ""}`}
                    onClick={() => setExpandedProfile(isOpen ? null : i)}
                  >
                    <div className="cap-svc-row-header">
                      <span className="cap-svc-row-num">{String(i + 1).padStart(2, "0")}</span>
                      <h3 className="cap-svc-row-title">{p.title}</h3>
                      <div className="cap-svc-row-icon">
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                          <line x1="12" y1="5" x2="12" y2="19" className="cap-svc-vline" />
                          <line x1="5" y1="12" x2="19" y2="12" />
                        </svg>
                      </div>
                    </div>
                    <div className="cap-svc-row-body">
                      <p className="cap-svc-row-desc">{p.desc}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </section>

          {/* Divider */}
          <div className="section-divider">
            <div className="gold-line" />
          </div>

          {/* ── How We Work ── */}
          <section className="cs-cta-section reveal">
            <p className="cs-cta-label">
              <span className="gold-text">The Rawlins Way</span>
            </p>
            <h2 className="cs-cta-title">
              How We <em>Work</em>
            </h2>
            <div className="careers-work-grid">
              {WORK_ITEMS.map((item) => (
                <div key={item.keyword} className="careers-work-item">
                  <h4 className="careers-work-keyword">{item.keyword}</h4>
                  <p className="careers-work-desc">{item.desc}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Divider */}
          <div className="section-divider">
            <div className="gold-line" />
          </div>

          {/* ── CTA ── */}
          <section className="cs-cta-section reveal">
            <p className="cs-cta-label">
              <span className="gold-text">Start a Conversation</span>
            </p>
            <h2 className="cs-cta-title">
              Interested? <em>Let&rsquo;s Talk.</em>
            </h2>
            <p className="cs-cta-text">
              We&rsquo;re always looking for exceptional people. If our work resonates with you, reach out. Tell us who you are, what drives you, and what kind of work excites you. No formal application required.
            </p>
            <Link href="/contact" className="cs-cta-btn">
              <span>Get In Touch</span>
            </Link>
            <p className="careers-email-line">
              Or email us directly at{" "}
              <a href="mailto:info@rawlinsic.com" className="careers-email-link">
                info@rawlinsic.com
              </a>
            </p>
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
