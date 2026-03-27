"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import SiteNav from "@/components/site-nav";
import SiteFooter from "@/components/site-footer";
import {
  THOUGHT_LEADERSHIP,
  type ThoughtLeadershipArticle,
} from "@/components/thought-leadership-data";

interface Props {
  article: ThoughtLeadershipArticle;
}

export default function ThoughtLeadershipArticlePage({ article }: Props) {
  const idx = THOUGHT_LEADERSHIP.findIndex((a) => a.slug === article.slug);
  const prev = idx > 0 ? THOUGHT_LEADERSHIP[idx - 1] : null;
  const next = idx < THOUGHT_LEADERSHIP.length - 1 ? THOUGHT_LEADERSHIP[idx + 1] : null;

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
    const reveals = document.querySelectorAll(".reveal");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) entry.target.classList.add("visible");
        });
      },
      { threshold: 0.1, rootMargin: "0px 0px -40px 0px" }
    );
    reveals.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const isComingSoon = article.author === "Coming Soon";

  return (
    <>
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
      <div className="cursor-dot" ref={dotRef} />
      <div className="cursor-ring" ref={ringRef} />

      {/* Back to Top */}
      <a href="#top" className="back-to-top" id="backToTop" aria-label="Back to top">
        <svg viewBox="0 0 24 24">
          <path d="M12 19V5M5 12l7-7 7 7" />
        </svg>
      </a>

      <SiteNav />

      <div className="content-wrapper">
        {/* ── Hero with image ── */}
        <section className="csd-hero" id="top">
          <Image
            src={article.image}
            alt={article.title}
            fill
            priority
            sizes="100vw"
            className="csd-hero-img"
          />
          <div className="csd-hero-overlay" />
          <div className="csd-hero-content">
            <Link href="/insights/thought-leadership" className="csd-back-link">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M19 12H5M12 19l-7-7 7-7" />
              </svg>
              All Articles
            </Link>
            <p className="section-label">
              <span className="gold-text">{article.category} &middot; {article.dateLabel}</span>
            </p>
            <h1 className="hero-title">{article.title}</h1>
            <p className="hero-sub" style={{ maxWidth: 680, marginTop: 8 }}>
              {article.subtitle}
            </p>
          </div>
        </section>

        {/* Divider */}
        <div className="section-divider">
          <div className="gold-line" />
        </div>

        {/* ── Article Content ── */}
        <section className="tla-content">
          <div className="tla-content-inner">
            {/* Author bar + PDF download */}
            {!isComingSoon && (
              <div className="tla-author-bar reveal">
                <div className="tla-author-info">
                  {article.authorImage && (
                    <Image
                      src={article.authorImage}
                      alt={article.author}
                      width={56}
                      height={56}
                      className="tl-author-avatar tla-avatar-lg"
                    />
                  )}
                  <div>
                    <span className="tla-author-name">{article.author}</span>
                    <span className="tla-author-role">{article.authorRole}</span>
                  </div>
                </div>
                {article.pdfUrl && (
                  <a
                    href={article.pdfUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="tla-pdf-btn"
                  >
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M7 10l5 5 5-5M12 15V3" />
                    </svg>
                    <span>Download PDF</span>
                  </a>
                )}
              </div>
            )}

            {/* Article body */}
            <div className="tla-body">
              {article.content.map((section, i) => {
                switch (section.type) {
                  case "intro":
                    return (
                      <p key={i} className="tla-intro reveal">
                        {section.text}
                      </p>
                    );
                  case "question":
                    return (
                      <div key={i} className="tla-question reveal">
                        <div className="tla-q-icon">Q</div>
                        <h2 className="tla-q-text">{section.text}</h2>
                      </div>
                    );
                  case "answer":
                    return (
                      <p key={i} className="tla-answer reveal">
                        <strong className="tla-answer-name">{article.author}:</strong>{" "}
                        {section.text}
                      </p>
                    );
                  case "heading":
                    return (
                      <h3 key={i} className="tla-heading reveal">
                        {section.text}
                      </h3>
                    );
                  case "paragraph":
                    return (
                      <p key={i} className="tla-paragraph reveal">
                        {section.text}
                      </p>
                    );
                  case "callout":
                    return (
                      <blockquote key={i} className="tla-callout reveal">
                        <p>{section.text}</p>
                      </blockquote>
                    );
                  case "divider":
                    return (
                      <div key={i} className="tla-divider reveal">
                        <div className="gold-line" />
                      </div>
                    );
                  case "list":
                    return (
                      <ul key={i} className="tla-list reveal">
                        {section.items?.map((item, j) => (
                          <li key={j}>{item}</li>
                        ))}
                      </ul>
                    );
                  default:
                    return null;
                }
              })}
            </div>

            {/* Author contact footer */}
            {!isComingSoon && (
              <div className="tla-author-footer reveal">
                <div className="tla-author-footer-inner">
                  {article.authorImage && (
                    <Image
                      src={article.authorImage}
                      alt={article.author}
                      width={80}
                      height={80}
                      className="tl-author-avatar tla-avatar-xl"
                    />
                  )}
                  <div className="tla-author-footer-text">
                    <span className="tla-author-name">{article.author}</span>
                    <span className="tla-author-role">{article.authorRole}</span>
                    {article.authorPhone && (
                      <span className="tla-author-contact">{article.authorPhone}</span>
                    )}
                    <span className="tla-author-contact">{article.authorEmail}</span>
                  </div>
                  {article.pdfUrl && (
                    <a
                      href={article.pdfUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="tla-pdf-btn"
                    >
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M7 10l5 5 5-5M12 15V3" />
                      </svg>
                      <span>View Full PDF</span>
                    </a>
                  )}
                </div>
              </div>
            )}
          </div>
        </section>

        {/* Divider */}
        <div className="section-divider">
          <div className="gold-line" />
        </div>

        {/* ── Navigation between articles ── */}
        <section className="csd-nav-section">
          <div className="csd-nav-inner">
            {prev ? (
              <Link
                href={`/insights/thought-leadership/${prev.slug}`}
                className="csd-nav-link csd-nav-prev"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M19 12H5M12 19l-7-7 7-7" />
                </svg>
                <div>
                  <span className="csd-nav-label">Previous</span>
                  <span className="csd-nav-name">{prev.title}</span>
                </div>
              </Link>
            ) : (
              <div />
            )}
            {next ? (
              <Link
                href={`/insights/thought-leadership/${next.slug}`}
                className="csd-nav-link csd-nav-next"
              >
                <div>
                  <span className="csd-nav-label">Next</span>
                  <span className="csd-nav-name">{next.title}</span>
                </div>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </Link>
            ) : (
              <div />
            )}
          </div>
        </section>

        {/* Divider */}
        <div className="section-divider">
          <div className="gold-line" />
        </div>
      </div>

      <SiteFooter />
    </>
  );
}
