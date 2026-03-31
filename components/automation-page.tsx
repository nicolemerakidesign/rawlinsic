"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import SiteNav from "@/components/site-nav";
import SiteFooter from "@/components/site-footer";

const HERO_IMG = "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=compress&cs=tinysrgb&w=1920";
const DATA_IMG = "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=compress&cs=tinysrgb&w=1200";
const WORKFLOW_IMG = "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=compress&cs=tinysrgb&w=1200";
const AI_IMG = "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=compress&cs=tinysrgb&w=1200";
const TEAM_IMG = "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=compress&cs=tinysrgb&w=1200";
const CONNECT_IMG = "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=compress&cs=tinysrgb&w=1200";
const DASHBOARD_IMG = "https://images.unsplash.com/photo-1551434678-e076c223a692?auto=compress&cs=tinysrgb&w=1200";
const NETWORK_IMG = "https://images.unsplash.com/photo-1544197150-b99a580bb7a8?auto=compress&cs=tinysrgb&w=1200";
const CAPABILITY_IMG = "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=compress&cs=tinysrgb&w=1200";

/* ── Editable Data ── */

const benefits = [
  {
    title: "Decision Making",
    tagline: "",
    desc: "Make better decisions with up-to-date information in one place.",
    img: DATA_IMG,
    accent: "linear-gradient(90deg, #c9a84c, #e8d5a0)",
  },
  {
    title: "Efficiency",
    tagline: "",
    desc: "Achieve goals in less time.",
    img: WORKFLOW_IMG,
    accent: "linear-gradient(90deg, #d4b878, #c9a84c)",
  },
  {
    title: "Prioritization",
    tagline: "",
    desc: "Prioritize problem-solving, decision-making, and creativity rather than repetitive work.",
    img: AI_IMG,
    accent: "linear-gradient(90deg, #e8d5a0, #c9a84c)",
  },
  {
    title: "Innovation",
    tagline: "",
    desc: "Accelerate the pace of innovation.",
    img: CAPABILITY_IMG,
    accent: "linear-gradient(90deg, #c9a84c, #d4b878)",
  },
];

const orgValues = [
  { num: "01", label: "Optimize Resources", body: "Optimize the use of diverse resources across your organization.", img: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=compress&cs=tinysrgb&w=800" },
  { num: "02", label: "Boost Efficiency", body: "Routine processes that take hours or days can be done in seconds, reducing errors.", img: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=compress&cs=tinysrgb&w=800" },
  { num: "03", label: "Scale Team Impact", body: "Scale the impact of teams beyond what manual processes allow.", img: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=compress&cs=tinysrgb&w=800" },
  { num: "04", label: "Enhance Responsiveness", body: "React faster to changing conditions and stakeholder needs.", img: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=compress&cs=tinysrgb&w=800" },
  { num: "05", label: "Support Resilience", body: "Standardized tasks support continuity of operations and enable faster response when needs evolve.", img: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=compress&cs=tinysrgb&w=800" },
  { num: "06", label: "Support Human Talent", body: "Free your people to focus on high-value work that requires human judgment.", img: "https://images.unsplash.com/photo-1552664730-d307ca884978?auto=compress&cs=tinysrgb&w=800" },
];

const pipeline = [
  { step: "01", label: "Data Governance", desc: "People bring trust to data through data governance." },
  { step: "02", label: "Automation", desc: "Automation transforms workflows using clean, structured data." },
  { step: "03", label: "AI", desc: "AI recognizes patterns, makes predictions, evaluates alternatives, picks the best option, and updates its internal model, adapting outputs over time." },
  { step: "04", label: "Human Validation", desc: "People validate AI results by applying context and judgment, then turn AI outputs into actionable insights." },
];

const challenges = [
  { title: "Disconnected Tools", solution: "We enable your systems to work together efficiently.", img: CONNECT_IMG, videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ" },
  { title: "Duplicated Work", solution: "We design and implement platforms that streamline processes, eliminate manual mistakes in routine workflows, and move data where people need it.", img: DASHBOARD_IMG, videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ" },
  { title: "Fragmented Information Landscape", solution: "We integrate systems via a central hub to provide timely information in a unified view.", img: NETWORK_IMG, videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ" },
  { title: "Capability Gap", solution: "We equip teams in automation and help organizations apply AI effectively and responsibly. We guide leaders and organizations through the challenges of automation and AI, helping teams adapt to embrace new technologies and work practices.", img: TEAM_IMG, videoUrl: "" },
];

export default function AutomationPage() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const mouseX = useRef(0);
  const mouseY = useRef(0);
  const ringX = useRef(0);
  const ringY = useRef(0);
  const valuesTrackRef = useRef<HTMLDivElement>(null);
  const [valuesProgress, setValuesProgress] = useState(0);
  const [openBenefits, setOpenBenefits] = useState<Set<number>>(new Set());
  const [activeVideo, setActiveVideo] = useState<number | null>(null);
  const [openChallenge, setOpenChallenge] = useState<number | null>(null);

  const chevronSvg = (isOpen: boolean) => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{ transition: "transform 0.3s", transform: isOpen ? "rotate(180deg)" : "none" }}>
      <path d="M6 9l6 6 6-6" />
    </svg>
  );

  useEffect(() => {
    const dot = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;
    const move = (e: MouseEvent) => {
      mouseX.current = e.clientX; mouseY.current = e.clientY;
      dot.style.left = e.clientX - 4 + "px"; dot.style.top = e.clientY - 4 + "px";
    };
    const loop = () => {
      ringX.current += (mouseX.current - ringX.current) * 0.12;
      ringY.current += (mouseY.current - ringY.current) * 0.12;
      ring.style.left = ringX.current - 20 + "px"; ring.style.top = ringY.current - 20 + "px";
      requestAnimationFrame(loop);
    };
    document.addEventListener("mousemove", move);
    requestAnimationFrame(loop);
    return () => document.removeEventListener("mousemove", move);
  }, []);

  useEffect(() => {
    let ob: IntersectionObserver;
    const timer = setTimeout(() => {
      const els = document.querySelectorAll(".reveal");
      if (els.length === 0) return;
      els.forEach((el) => { void (el as HTMLElement).offsetHeight; });
      ob = new IntersectionObserver(
        (entries) => entries.forEach((e) => { if (e.isIntersecting) e.target.classList.add("visible"); }),
        { threshold: 0.08 }
      );
      els.forEach((el) => ob.observe(el));
    }, 300);
    return () => { clearTimeout(timer); if (ob) ob.disconnect(); };
  }, []);

  const onValuesScroll = () => {
    const el = valuesTrackRef.current;
    if (!el) return;
    const max = el.scrollWidth - el.clientWidth;
    setValuesProgress(max > 0 ? el.scrollLeft / max : 0);
  };
  const valuesScrollPrev = () => {
    const track = valuesTrackRef.current; if (!track) return;
    const card = track.querySelector(".aam-alt-card") as HTMLElement;
    const w = card ? card.offsetWidth + 24 : 420;
    track.scrollBy({ left: -w, behavior: "smooth" });
  };
  const valuesScrollNext = () => {
    const track = valuesTrackRef.current; if (!track) return;
    const card = track.querySelector(".aam-alt-card") as HTMLElement;
    const w = card ? card.offsetWidth + 24 : 420;
    track.scrollBy({ left: w, behavior: "smooth" });
  };

  const toggleBenefit = (idx: number) => {
    setOpenBenefits((prev) => {
      const next = new Set(prev);
      next.has(idx) ? next.delete(idx) : next.add(idx);
      return next;
    });
  };

  return (
    <>
      <div className="cursor-dot" ref={dotRef} />
      <div className="cursor-ring" ref={ringRef} />
    <>
      <div className="ambient-bg" />
      <div className="ambient-orbs">
        <div className="orb orb-1" /><div className="orb orb-2" /><div className="orb orb-3" /><div className="orb orb-4" />
      </div>

      <SiteNav />

      {/* ── Hero ── */}
      <section className="aam-hero aam-parallax-fixed" style={{ backgroundImage: `url(${HERO_IMG})` }}>
        <div className="aam-hero-overlay" style={{ background: "rgba(6,12,22,0.82)" }} />
        <div className="aam-hero-content">
          <span className="hero-label"><span className="gold-text">Smarter Systems. Empowered Teams.</span></span>
          <h1 className="hero-title">Systems <em>Automation</em> &amp; AI</h1>
          <p className="hero-sub">
            Partnering to reshape the way people work.
          </p>
          <a href="#benefits" className="auto-hero-btn">
            <span>Explore Solutions</span>
          </a>
        </div>
        <div className="hero-scroll"><span style={{ background: "linear-gradient(145deg, #c9a84c, #e8d5a0, #d4b878)", WebkitBackgroundClip: "text", backgroundClip: "text", color: "transparent", fontSize: "0.6rem", letterSpacing: "3px", textTransform: "uppercase" as const }}>Scroll</span><div className="scroll-line" /></div>
      </section>

      <div className="section-divider"><div className="gold-line" /></div>

      {/* ── Benefits: AAM "Our Approach" style framework cards ── */}
      <section className="aam-section" id="benefits" style={{ padding: "100px 24px", scrollMarginTop: "80px" }}>
        <div style={{ maxWidth: "1500px", margin: "0 auto" }}>
          <div className="aam-section-header reveal">
            <p className="section-label"><span className="gold-text">Human-Centered Automation</span></p>
            <h2 className="section-title">How can automation help people <em>thrive</em> in a data-driven workplace?</h2>
          </div>
          <div className="aam-framework-grid auto-benefits-grid" style={{ marginTop: "60px" }}>
            {benefits.map((card, i) => (
              <div className={`aam-framework-card${openBenefits.has(i) ? " open" : ""}`} key={card.title}>
                <div className="aam-framework-img-wrap">
                  <Image src={card.img} alt={card.title} fill sizes="(max-width: 768px) 100vw, 33vw" className="aam-framework-img" />
                  <div className="aam-framework-img-overlay" />
                </div>
                <div className="aam-framework-accent" style={{ background: card.accent }} />
                <div className="aam-framework-inner">
                  <div className="aam-pillar-title-row">
                    <h3 className="aam-framework-phase" style={{ fontSize: "2rem" }}>{card.title}</h3>
                    <button className="aam-expand-btn" onClick={() => toggleBenefit(i)}>
                      {chevronSvg(openBenefits.has(i))}
                    </button>
                  </div>
                  <div className={`aam-framework-expand${openBenefits.has(i) ? " open" : ""}`}>
                    <p style={{ fontSize: "16px", color: "#e8e6e1", lineHeight: 1.8 }}>{card.desc}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Parallax Quote */}
      <div className="parallax-panel aam-parallax-fixed" style={{ backgroundImage: "url(https://images.unsplash.com/photo-1504639725590-34d0984388bd?auto=compress&cs=tinysrgb&w=1920)" }}>
        <div className="aam-parallax-overlay" style={{ background: "rgba(6,12,22,0.8)" }} />
        <p className="parallax-text1 reveal" style={{ position: "relative", zIndex: 2 }}>
          Put some quote <em>here</em> placeholder.
        </p>
      </div>

      <div className="section-divider"><div className="gold-line" /></div>

      {/* ── Organizational Value: Essential Phases style scroll cards ── */}
      <section className="aam-section aam-phases-alt-section" style={{ padding: "100px 0" }}>
        <div className="aam-container" style={{ padding: "0 48px" }}>
          <div className="aam-section-header reveal">
            <p className="section-label"><span className="gold-text">Organizational Impact</span></p>
            <h2 className="section-title">How automation delivers <em>value</em></h2>
          </div>
        </div>

        {/* Progress bar + arrow controls */}
        <div className="story-scroll-controls" style={{ padding: "0 48px", marginTop: "40px" }}>
          <div className="story-scroll-progress-bar">
            <div className="story-scroll-progress-fill" style={{ width: `${valuesProgress * 100}%` }} />
          </div>
          <div className="story-scroll-arrows">
            <button className="story-arrow-btn" onClick={valuesScrollPrev} aria-label="Previous">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M15 18l-6-6 6-6" /></svg>
            </button>
            <button className="story-arrow-btn" onClick={valuesScrollNext} aria-label="Next">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M9 18l6-6-6-6" /></svg>
            </button>
          </div>
        </div>

        {/* Scroll cards */}
        <div className="aam-alt-scroll-outer" ref={valuesTrackRef} onScroll={onValuesScroll}>
          <div className="aam-alt-scroll-track">
            {orgValues.map((v, i) => (
              <div className="aam-alt-card" key={v.num}>
                <Image src={v.img} alt={v.label} fill sizes="(max-width: 768px) 80vw, 400px" className="aam-alt-card-bg" />
                <div className="aam-alt-card-overlay" />
                <div className="aam-alt-card-header">
                  <span className="aam-alt-card-num">{v.num}</span>
                </div>
                <div className="aam-alt-card-divider" />
                <h4 className="aam-alt-card-title">{v.label}</h4>
                <p className="aam-alt-card-body">{v.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="section-divider"><div className="gold-line" /></div>

      {/* ── Pipeline: same style as orgValues (numbered left-border list) ── */}
      <section className="aam-section" style={{ padding: "100px 24px" }}>
        <div style={{ maxWidth: "1500px", margin: "0 auto" }}>
          <div className="aam-section-header reveal">
            <p className="section-label"><span className="gold-text">The Ecosystem</span></p>
            <h2 className="section-title">How data governance, automation, and <em>AI</em> work together</h2>
          </div>
          <div className="auto-ecosystem-grid" style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "24px", marginTop: "60px" }}>
            {pipeline.map((p, i) => (
              <div key={i} className="reveal auto-eco-tile" style={{ display: "flex", flexDirection: "column", gap: "16px", padding: "32px 24px", position: "relative", transition: "all 0.3s" }}>
                <span style={{ fontFamily: "var(--font-cormorant), 'Cormorant Garamond', Georgia, serif", fontSize: "36px", fontWeight: 300, background: "linear-gradient(145deg, #c9a84c, #e8d5a0, #d4b878)", WebkitBackgroundClip: "text", backgroundClip: "text", color: "transparent", lineHeight: 1.2 }}>
                  {p.step}
                </span>
                <h3 style={{ fontFamily: "var(--font-cormorant), 'Cormorant Garamond', Georgia, serif", fontSize: "28px", fontWeight: 400, color: "#fff", marginBottom: "4px", lineHeight: 1.2 }}>{p.label}</h3>
                <p style={{ fontSize: "16px", color: "#fff", lineHeight: 1.8 }}>{p.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Parallax Quote 2 */}
      <div className="parallax-panel aam-parallax-fixed" style={{ backgroundImage: `url(${WORKFLOW_IMG})` }}>
        <div className="aam-parallax-overlay" style={{ background: "rgba(6,12,22,0.8)" }} />
        <p className="parallax-text1 reveal" style={{ position: "relative", zIndex: 2 }}>
          Explore the <em>possibilities</em>
        </p>
      </div>

      <div className="section-divider"><div className="gold-line" /></div>

      {/* ── Driving Transformation ── */}
      <section className="aam-section" style={{ padding: "100px 48px" }}>
        <div className="aam-container">
          <div className="aam-section-header reveal">
            <p className="section-label"><span className="gold-text">Driving Transformation</span></p>
            <h2 className="section-title">What we <em>deliver</em></h2>
          </div>
          <div className="auto-deliver-grid" style={{ display: "grid", gap: "60px", marginTop: "60px", alignItems: "center" }}>
            <div className="reveal">
              <div style={{ position: "relative", borderRadius: "12px", overflow: "hidden", aspectRatio: "4/3" }}>
                <Image src="https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=compress&cs=tinysrgb&w=1200" alt="Team collaborating on digital transformation" fill sizes="(max-width: 768px) 100vw, 50vw" style={{ objectFit: "cover" }} />
                <div style={{ position: "absolute", inset: 0, background: "linear-gradient(135deg, rgba(6,12,22,0.15), rgba(6,12,22,0.45))" }} />
              </div>
            </div>
            <div className="reveal">
              <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: "36px" }}>
                <li style={{ paddingLeft: "24px", borderLeft: "2px solid", borderImage: "linear-gradient(180deg, #c9a84c, #e8d5a0) 1", fontSize: "17px", color: "#fff", lineHeight: 1.8 }}>
                  We design and implement digital solutions that help people work smarter and more creatively.
                </li>
                <li style={{ paddingLeft: "24px", borderLeft: "2px solid", borderImage: "linear-gradient(180deg, #c9a84c, #e8d5a0) 1", fontSize: "17px", color: "#fff", lineHeight: 1.8 }}>
                  We reduce manual effort, streamline and connect workflows, and establish effective <Link href="/capabilities" className="gold-text" style={{ textDecoration: "underline", textUnderlineOffset: "4px" }}>data governance</Link> practices.
                </li>
                <li style={{ paddingLeft: "24px", borderLeft: "2px solid", borderImage: "linear-gradient(180deg, #c9a84c, #e8d5a0) 1", fontSize: "17px", color: "#fff", lineHeight: 1.8 }}>
                  We develop high-value AI use cases and a roadmap for adoption and scaling.
                </li>
                <li style={{ paddingLeft: "24px", borderLeft: "2px solid", borderImage: "linear-gradient(180deg, #c9a84c, #e8d5a0) 1", fontSize: "17px", color: "#fff", lineHeight: 1.8 }}>
                  We partner to guide <Link href="/capabilities" className="gold-text" style={{ textDecoration: "underline", textUnderlineOffset: "4px" }}>organizational change</Link> by cultivating the culture required for new ways of working.
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <div className="section-divider"><div className="gold-line" /></div>

      {/* ── Addressing Key Challenges / Videos ── */}
      <section className="aam-section" style={{ padding: "100px 48px" }}>
        <div className="aam-container">
          <div className="aam-section-header reveal">
            <p className="section-label"><span className="gold-text">Addressing Key Challenges</span></p>
            <h2 className="section-title">Elevate human <em>potential</em> throughout your organization</h2>
          </div>
          <div className="auto-challenges-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "28px", marginTop: "60px", alignItems: "start" }}>
            {challenges.map((c, i) => {
              const isOpen = openChallenge === i;
              const isPlaying = activeVideo === i;
              const hasVideo = !!c.videoUrl;
              return (
              <div key={i} className="reveal" style={{ borderRadius: "12px", overflow: "hidden", border: "1px solid rgba(201,168,76,0.1)", transition: "all 0.3s" }}>
                {/* Image/Video — always visible */}
                {hasVideo && isPlaying ? (
                  <div style={{ position: "relative", paddingTop: "56.25%", background: "#000" }}>
                    <iframe src={c.videoUrl + "?autoplay=1"} allow="autoplay; encrypted-media" allowFullScreen style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%", border: "none" }} />
                    <button onClick={() => setActiveVideo(null)} style={{ position: "absolute", top: "12px", right: "12px", width: "36px", height: "36px", borderRadius: "50%", border: "1px solid rgba(255,255,255,0.5)", background: "rgba(6,12,22,0.8)", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", zIndex: 3 }}>
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2"><path d="M18 6L6 18M6 6l12 12" /></svg>
                    </button>
                  </div>
                ) : (
                  <div style={{ position: "relative", height: "240px", cursor: hasVideo ? "pointer" : "default" }} onClick={() => hasVideo && setActiveVideo(i)}>
                    <Image src={c.img} alt={c.title} fill sizes="(max-width: 768px) 100vw, 50vw" style={{ objectFit: "cover" }} />
                    <div style={{ position: "absolute", inset: 0, background: "rgba(6,12,22,0.75)" }} />
                    {hasVideo && (
                      <>
                        <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)", width: "64px", height: "64px", borderRadius: "50%", border: "2px solid rgba(255,255,255,0.6)", background: "rgba(6,12,22,0.5)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 2 }}>
                          <svg width="24" height="24" viewBox="0 0 24 24" fill="#fff" stroke="none"><polygon points="8,5 20,12 8,19" /></svg>
                        </div>
                        <span style={{ position: "absolute", top: "16px", left: "16px", zIndex: 2, fontSize: "11px", fontWeight: 600, letterSpacing: "2px", textTransform: "uppercase", color: "#fff" }}>Watch Video</span>
                      </>
                    )}
                  </div>
                )}

                {/* Title + expand — always visible */}
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "24px 28px", background: "rgba(6,12,22,0.5)", cursor: "pointer" }} onClick={() => setOpenChallenge(isOpen ? null : i)}>
                  <div>
                    <span style={{ fontSize: "12px", fontWeight: 600, letterSpacing: "2px", textTransform: "uppercase", background: "linear-gradient(145deg, #c9a84c, #e8d5a0, #d4b878)", WebkitBackgroundClip: "text", backgroundClip: "text", color: "transparent" }}>Challenge</span>
                    <h3 style={{ fontFamily: "var(--font-cormorant), 'Cormorant Garamond', Georgia, serif", fontSize: "28px", fontWeight: 400, color: "#fff", marginTop: "4px" }}>{c.title}</h3>
                  </div>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0, transition: "transform 0.3s", transform: isOpen ? "rotate(45deg)" : "none" }}>
                    <line x1="12" y1="5" x2="12" y2="19" />
                    <line x1="5" y1="12" x2="19" y2="12" />
                  </svg>
                </div>

                {/* Expandable description only */}
                <div style={{ maxHeight: isOpen ? "300px" : "0", overflow: "hidden", transition: "max-height 0.5s ease" }}>
                  <div style={{ padding: "0 28px 24px", background: "rgba(6,12,22,0.5)" }}>
                    <p style={{ fontSize: "16px", color: "#fff", lineHeight: 1.8 }}>{c.solution}</p>
                  </div>
                </div>
              </div>
              );
            })}
          </div>
        </div>
      </section>

      <div className="section-divider"><div className="gold-line" /></div>

      {/* ── CTA ── */}
      <section className="aam-section aam-cta-section aam-parallax-fixed" style={{ backgroundImage: `url(${TEAM_IMG})` }}>
        <div className="aam-parallax-overlay" style={{ background: "rgba(6,12,22,0.8)" }} />
        <div style={{ position: "relative", zIndex: 2, textAlign: "center", padding: "0 32px", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", width: "100%", maxWidth: "800px", margin: "0 auto" }}>
          <p className="section-label"><span className="gold-text">Let&rsquo;s Connect</span></p>
          <h2 className="section-title auto-cta-title" style={{ color: "#fff", marginBottom: "20px", textAlign: "center" }}>Ready to reshape how your <em>organization</em> works?</h2>
          <p className="hero-sub" style={{ opacity: 1, transform: "none", animation: "none", textAlign: "center", marginBottom: "40px" }}>
            Let&rsquo;s discuss how automation and AI can elevate your team&rsquo;s capabilities.
          </p>
          <Link href="/contact" className="auto-hero-btn" style={{ animation: "none", opacity: 1, transform: "none" }}><span>Connect With Us</span></Link>
        </div>
      </section>

      <div className="section-divider"><div className="gold-line" /></div>
      <SiteFooter />
    </>
    </>
  );
}
