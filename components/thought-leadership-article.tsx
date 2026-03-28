"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import SiteNav from "@/components/site-nav";
import SiteFooter from "@/components/site-footer";
import {
  THOUGHT_LEADERSHIP,
  type ThoughtLeadershipArticle,
  type ArticleSection,
} from "@/components/thought-leadership-data";

interface Props {
  article: ThoughtLeadershipArticle;
}

/* ── Group content into accordion sections (one per question) ── */
function groupIntoAccordion(content: ArticleSection[]) {
  const sections: { question: string; blocks: ArticleSection[] }[] = [];
  let introBlocks: ArticleSection[] = [];
  let current: { question: string; blocks: ArticleSection[] } | null = null;

  for (const block of content) {
    if (block.type === "question") {
      if (current) sections.push(current);
      current = { question: block.text || "", blocks: [] };
    } else if (current) {
      current.blocks.push(block);
    } else {
      introBlocks.push(block);
    }
  }
  if (current) sections.push(current);

  return { introBlocks, sections };
}

export default function ThoughtLeadershipArticlePage({ article }: Props) {
  const idx = THOUGHT_LEADERSHIP.findIndex((a) => a.slug === article.slug);
  const prev = idx > 0 ? THOUGHT_LEADERSHIP[idx - 1] : null;
  const next = idx < THOUGHT_LEADERSHIP.length - 1 ? THOUGHT_LEADERSHIP[idx + 1] : null;

  const { introBlocks, sections } = groupIntoAccordion(article.content);

  /* ── Pull trailing callout out of last accordion section ── */
  let trailingCallout: ArticleSection | null = null;
  if (sections.length > 0) {
    const lastSection = sections[sections.length - 1];
    const lastBlock = lastSection.blocks[lastSection.blocks.length - 1];
    if (lastBlock && lastBlock.type === "callout") {
      trailingCallout = lastSection.blocks.pop()!;
    }
  }

  const [openSections, setOpenSections] = useState<Set<number>>(() => new Set([0]));

  const toggleSection = (i: number) => {
    setOpenSections((prev) => {
      const next = new Set(prev);
      next.has(i) ? next.delete(i) : next.add(i);
      return next;
    });
  };

  const expandAll = () => setOpenSections(new Set(sections.map((_, i) => i)));
  const collapseAll = () => setOpenSections(new Set());

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

  /* ── Render a content block ── */
  const renderBlock = (block: ArticleSection, i: number) => {
    switch (block.type) {
      case "intro":
        return (
          <p key={i} className="tla-intro">
            {block.text}
          </p>
        );
      case "answer":
        return (
          <p key={i} className="tla-answer">
            <strong className="tla-answer-name">{article.author}:</strong>{" "}
            {block.text}
          </p>
        );
      case "heading":
        return (
          <h3 key={i} className="tla-heading">
            {block.text}
          </h3>
        );
      case "paragraph":
        return (
          <p key={i} className="tla-paragraph">
            {block.text}
          </p>
        );
      case "callout":
        return (
          <blockquote key={i} className="tla-callout">
            <p>{block.text}</p>
          </blockquote>
        );
      case "divider":
        return null; /* accordion replaces dividers */
      case "list":
        return (
          <ul key={i} className="tla-list">
            {block.items?.map((item, j) => (
              <li key={j}>{item}</li>
            ))}
          </ul>
        );
      default:
        return null;
    }
  };

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
        {/* ── Hero with dark overlay ── */}
        <section className="csd-hero" id="top">
          <Image
            src={article.heroImage}
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

            {/* Article banner image */}
            {article.image && (
              <div className="tla-article-img-wrap">
                <Image
                  src={article.image}
                  alt={article.title}
                  width={900}
                  height={525}
                  sizes="(max-width: 768px) 100vw, 800px"
                  className="tla-article-img"
                />
              </div>
            )}

            {/* Intro blocks (before the first question) */}
            <div className="tla-body">
              {introBlocks.map((block, i) => renderBlock(block, i))}
            </div>

            {/* Accordion Q&A sections */}
            {sections.length > 0 && (
              <div className="tla-accordion">
                {/* Expand/Collapse controls */}
                <div className="tla-accordion-controls reveal">
                  <span className="tla-accordion-controls-label">Q&A</span>
                  <div className="tla-accordion-controls-btns">
                    <button onClick={expandAll} className="tla-expand-btn">Expand All</button>
                    <span className="tla-controls-sep">/</span>
                    <button onClick={collapseAll} className="tla-expand-btn">Collapse All</button>
                  </div>
                </div>

                {sections.map((section, i) => {
                  const isOpen = openSections.has(i);
                  return (
                    <div
                      key={i}
                      className={`tla-accordion-item${isOpen ? " open" : ""}`}
                    >
                      <button
                        className="tla-accordion-trigger"
                        onClick={() => toggleSection(i)}
                        aria-expanded={isOpen}
                      >
                        <div className="tla-q-icon">Q</div>
                        <h2 className="tla-q-text">{section.question}</h2>
                        <div className={`tla-accordion-chevron${isOpen ? " open" : ""}`}>
                          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M6 9l6 6 6-6" />
                          </svg>
                        </div>
                      </button>
                      <div className={`tla-accordion-body${isOpen ? " open" : ""}`}>
                        <div className="tla-accordion-body-inner">
                          {section.blocks.map((block, j) => renderBlock(block, j))}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}

            {/* Trailing callout (outside accordion) */}
            {trailingCallout && (
              <div className="tla-body" style={{ marginTop: 40 }}>
                {renderBlock(trailingCallout, 9999)}
              </div>
            )}

            {/* Fallback for coming-soon articles */}
            {sections.length === 0 && (
              <div className="tla-body">
                {article.content.map((block, i) => renderBlock(block, i))}
              </div>
            )}

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
