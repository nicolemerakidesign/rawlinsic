'use client';

import React, { useRef, useEffect, useState } from 'react';
import Link from 'next/link';
import SiteNav from '@/components/site-nav';
import SiteFooter from '@/components/site-footer';

const DRONE_IMG = "https://images.pexels.com/photos/442587/pexels-photo-442587.jpeg?auto=compress&cs=tinysrgb&w=1200";
const CITY_AERIAL_IMG = "https://images.pexels.com/photos/1486222/pexels-photo-1486222.jpeg?auto=compress&cs=tinysrgb&w=1200";
const INFRASTRUCTURE_IMG = "https://images.pexels.com/photos/1105766/pexels-photo-1105766.jpeg?auto=compress&cs=tinysrgb&w=1200";
const TECH_NETWORK_IMG = "https://images.pexels.com/photos/373543/pexels-photo-373543.jpeg?auto=compress&cs=tinysrgb&w=1200";
const LOGISTICS_IMG = "https://images.pexels.com/photos/4481259/pexels-photo-4481259.jpeg?auto=compress&cs=tinysrgb&w=1200";
const PLANNING_IMG = "https://images.pexels.com/photos/3183150/pexels-photo-3183150.jpeg?auto=compress&cs=tinysrgb&w=1200";
const SKYLINE_IMG = "https://images.pexels.com/photos/1519088/pexels-photo-1519088.jpeg?auto=compress&cs=tinysrgb&w=1200";
const AERIAL_VIEW_IMG = "https://images.pexels.com/photos/2026324/pexels-photo-2026324.jpeg?auto=compress&cs=tinysrgb&w=1200";
const HELICOPTER_IMG = "https://images.pexels.com/photos/210199/pexels-photo-210199.jpeg?auto=compress&cs=tinysrgb&w=1200";
const CONTROL_ROOM_IMG = "https://images.pexels.com/photos/325229/pexels-photo-325229.jpeg?auto=compress&cs=tinysrgb&w=1200";

const phaseData = [
  { phase: "Phase 1", title: "Policy & System Planning", desc: "Develop policy, system plans, and standardized guidance for local implementation.", bg: PLANNING_IMG },
  { phase: "Phase 2", title: "Regulatory Navigation", desc: "Provide regulatory understanding for compliance and guide regulatory coordination.", bg: INFRASTRUCTURE_IMG },
  { phase: "Phase 3", title: "Infrastructure Planning", desc: "Plan for infrastructure, including vertiports, including technical research and validation.", bg: SKYLINE_IMG },
  { phase: "Phase 4", title: "Functional Frameworks", desc: "Establish functional frameworks that support scalable program delivery and operational readiness.", bg: CONTROL_ROOM_IMG },
  { phase: "Phase 5", title: "Data & Safety Integration", desc: "Integrate data and safety policies into transportation systems.", bg: TECH_NETWORK_IMG },
  { phase: "Phase 6", title: "Implementation & Scaling", desc: "Support implementation, deployment, and the scaling of AAM and UAS services.", bg: CITY_AERIAL_IMG },
  { phase: "Phase 7", title: "Community Engagement", desc: "Facilitate ongoing community engagement and public trust-building.", bg: AERIAL_VIEW_IMG },
];

const serviceAreas = [
  {
    name: "AAM Advisory",
    tags: "Feasibility · Vertiport Planning · Air Traffic Management",
    desc: "From feasibility studies and vertiport planning to air traffic management and multimodal integration, we provide end-to-end advisory for Advanced Air Mobility programs. Our team guides policy framework development, community outreach, pilot program design, economic impact analysis, safety case development, and regulatory compliance.",
    bg: DRONE_IMG,
  },
  {
    name: "UAS Operations",
    tags: "Drone Corridors · Data Governance · BVLOS",
    desc: "We support the full spectrum of UAS operations—including operational design domain development, drone delivery corridor planning, data governance frameworks, BVLOS operations support, safety management systems, ground transportation integration, workforce training, airspace deconfliction, environmental assessments, and procurement.",
    bg: HELICOPTER_IMG,
  },
  {
    name: "Strategic Integration",
    tags: "Stakeholder Alignment · Community Planning · Multi-Modal",
    desc: "Bridging the gap between emerging aerial technology and existing transportation networks, we coordinate across aviation authorities, government agencies, standards organizations, academic institutions, air navigation providers, operators, industry partners, and municipal planning offices.",
    bg: CONTROL_ROOM_IMG,
  },
];

const exploreCards = [
  {
    title: "Urban Air Mobility",
    desc: "Transform passenger transportation through eVTOL aircraft enabling rapid point-to-point metropolitan connectivity.",
    bg: CITY_AERIAL_IMG,
  },
  {
    title: "Aerial Intelligence",
    desc: "Harness UAS for real-time data acquisition, infrastructure monitoring, and precision mapping.",
    bg: TECH_NETWORK_IMG,
  },
  {
    title: "Last-Mile Delivery",
    desc: "Autonomous delivery systems for faster response times and expanded service coverage.",
    bg: LOGISTICS_IMG,
  },
];

const AAMPage = () => {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const mouseX = useRef(0);
  const mouseY = useRef(0);
  const ringX = useRef(0);
  const ringY = useRef(0);
  const animFrame = useRef<number | null>(null);

  const [introOpen, setIntroOpen] = useState(false);
  const [activePillar, setActivePillar] = useState<string | null>(null);
  const [phaseProgress, setPhaseProgress] = useState(0);

  const phaseTrackRef = useRef<HTMLDivElement>(null);
  const phaseDragging = useRef(false);
  const phaseDragStart = useRef(0);
  const phaseScrollStart = useRef(0);

  const onPhaseScroll = () => {
    const el = phaseTrackRef.current;
    if (!el) return;
    const max = el.scrollWidth - el.clientWidth;
    setPhaseProgress(max > 0 ? el.scrollLeft / max : 0);
  };
  const onPhaseMouseDown = (e: React.MouseEvent) => {
    phaseDragging.current = true;
    phaseDragStart.current = e.clientX;
    phaseScrollStart.current = phaseTrackRef.current?.scrollLeft ?? 0;
  };
  const onPhaseMouseMove = (e: React.MouseEvent) => {
    if (!phaseDragging.current || !phaseTrackRef.current) return;
    e.preventDefault();
    phaseTrackRef.current.scrollLeft = phaseScrollStart.current - (e.clientX - phaseDragStart.current);
  };
  const onPhaseMouseUp = () => { phaseDragging.current = false; };
  const phaseScrollPrev = () => phaseTrackRef.current?.scrollBy({ left: -420, behavior: "smooth" });
  const phaseScrollNext = () => phaseTrackRef.current?.scrollBy({ left: 420, behavior: "smooth" });

  // Pillars (service areas) scroll
  const pillarsTrackRef = useRef<HTMLDivElement>(null);
  const [pillarsProgress, setPillarsProgress] = useState(0);
  const pillarsDragging = useRef(false);
  const pillarsDragStart = useRef(0);
  const pillarsScrollStart = useRef(0);
  const onPillarsScroll = () => {
    const el = pillarsTrackRef.current;
    if (!el) return;
    const max = el.scrollWidth - el.clientWidth;
    setPillarsProgress(max > 0 ? el.scrollLeft / max : 0);
  };
  const onPillarsMouseDown = (e: React.MouseEvent) => {
    pillarsDragging.current = true;
    pillarsDragStart.current = e.clientX;
    pillarsScrollStart.current = pillarsTrackRef.current?.scrollLeft ?? 0;
  };
  const onPillarsMouseMove = (e: React.MouseEvent) => {
    if (!pillarsDragging.current || !pillarsTrackRef.current) return;
    e.preventDefault();
    pillarsTrackRef.current.scrollLeft = pillarsScrollStart.current - (e.clientX - pillarsDragStart.current);
  };
  const onPillarsMouseUp = () => { pillarsDragging.current = false; };
  const pillarsScrollPrev = () => pillarsTrackRef.current?.scrollBy({ left: -420, behavior: "smooth" });
  const pillarsScrollNext = () => pillarsTrackRef.current?.scrollBy({ left: 420, behavior: "smooth" });

  // Custom cursor
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

    const hoverEls = document.querySelectorAll("a, button, .nav-item, .back-to-top, .pillar-card, .explore-card");
    hoverEls.forEach((el) => {
      el.addEventListener("mouseenter", () => ring.classList.add("hover"));
      el.addEventListener("mouseleave", () => ring.classList.remove("hover"));
    });

    return () => {
      document.removeEventListener("mousemove", onMouseMove);
      if (animFrame.current) cancelAnimationFrame(animFrame.current);
    };
  }, []);

  // Micro particles
  useEffect(() => {
    const container = document.getElementById("microParticles");
    if (!container) return;
    for (let i = 0; i < 20; i++) {
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

  // Nav scroll + back-to-top
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

  // Scroll reveal with delay for hydration
  useEffect(() => {
    const timer = setTimeout(() => {
      const reveals = document.querySelectorAll(".reveal");
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) entry.target.classList.add("visible");
          });
        },
        { threshold: 0.05, rootMargin: "0px 0px 50px 0px" }
      );
      reveals.forEach((el) => observer.observe(el));
      (window as unknown as Record<string, unknown>).__aamObserver = observer;
    }, 300);
    return () => {
      clearTimeout(timer);
      const obs = (window as unknown as Record<string, unknown>).__aamObserver as IntersectionObserver | undefined;
      if (obs) obs.disconnect();
    };
  }, []);

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

      <SiteNav ctaHref="/contact" />

      {/* ── Hero ── */}
      <section className="hero" id="top">
        <div className="hero-content">
          <span className="hero-label">
            <span className="gold-text">Technology · Advanced Air Mobility</span>
          </span>
          <h1 className="hero-title">
            Advanced Air Mobility <em>&amp; UAS</em>
          </h1>
          <p className="hero-sub">
            Partnering to turn AAM and UAS concepts into community transport solutions
          </p>
          <a href="#intro" className="hero-cta-btn">
            <span>explore our approach</span>
          </a>
        </div>
        <div className="hero-scroll">
          <span>Scroll</span>
          <div className="scroll-line" />
        </div>
      </section>

      <div className="section-divider"><div className="gold-line" /></div>
      <div className="section-divider"><div className="gold-line" /></div>

      {/* ── Why AAM & UAS ── */}
      <section className="new-intro" id="intro">
        <div className="new-intro-wrap">
          <div className="new-intro-images reveal">
            <div className="intro-cinematic-wrap">
              <img
                className="intro-cinematic-img"
                src={DRONE_IMG}
                alt="Advanced Air Mobility drone technology"
              />
              <div className="intro-cinematic-overlay" />
              <div className="intro-metrics">
                <div className="intro-metric">
                  <span className="intro-metric-num">3</span>
                  <span className="intro-metric-label">Core Service Areas</span>
                </div>
                <div className="intro-metric-divider" />
                <div className="intro-metric">
                  <span className="intro-metric-num">7</span>
                  <span className="intro-metric-label">Program Phases</span>
                </div>
                <div className="intro-metric-divider" />
                <div className="intro-metric">
                  <span className="intro-metric-num">28+</span>
                  <span className="intro-metric-label">States Served</span>
                </div>
              </div>
            </div>
          </div>

          <div className="intro-text reveal rd1">
            <p className="section-label">
              <span className="gold-text">Our Foundation</span>
            </p>
            <h2 className="section-title">
              Why <em>AAM &amp; UAS</em> Matter
            </h2>
            <button
              className={`intro-expand-btn${introOpen ? " expanded" : ""}`}
              aria-label="Learn more"
              onClick={() => setIntroOpen((o) => !o)}
            >
              <span className="intro-expand-icon">
                <svg width="16" height="10" viewBox="0 0 16 10" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M1 1.5l7 7 7-7" />
                </svg>
              </span>
            </button>
            <div className={`intro-expandable${introOpen ? " expanded" : ""}`}>
              <p className="section-text">
                Advanced Air Mobility and Unmanned Aircraft Systems represent a fundamental shift in how communities connect, serve, and innovate—offering unprecedented opportunities for urban planning, emergency response, logistics, and citizen well-being.
              </p>
              <p className="section-text" style={{ marginTop: "16px" }}>
                By partnering with communities, Rawlins supports the full lifecycle of AAM and UAS adoption—from initial policy development through implementation and scaling. Our expertise spans regulatory frameworks, infrastructure planning, stakeholder coordination, and operational readiness.
              </p>
              <p style={{ marginTop: "20px", fontWeight: 600, color: "#d0b86c" }}>
                We help your region prepare to thrive in this emerging mobility ecosystem.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Parallax Quote */}
      <div className="parallax-panel">
        <p className="parallax-text reveal">
          Next-generation aerial capabilities strengthen <em>multimodal transportation</em> and enable communities to benefit from a more connected, resilient mobility ecosystem.
        </p>
      </div>

      {/* ── Service Areas (Pillar Cards) ── */}
      <section className="section-pillars" id="services">
        <div className="pillars-header">
          <div className="reveal">
            <p className="section-label">
              <span className="gold-text">what we deliver</span>
            </p>
            <h2 className="section-title">Our Service Areas</h2>
          </div>
        </div>
        <div className="pillars-scroll-controls">
          <div className="pillars-scroll-progress-bar">
            <div className="pillars-scroll-progress-fill" style={{ width: `${pillarsProgress * 100}%` }} />
          </div>
          <div className="story-scroll-arrows">
            <button className="story-arrow-btn" onClick={pillarsScrollPrev} aria-label="Previous">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M15 18l-6-6 6-6" /></svg>
            </button>
            <button className="story-arrow-btn" onClick={pillarsScrollNext} aria-label="Next">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M9 18l6-6-6-6" /></svg>
            </button>
          </div>
        </div>
        <div
          className="pillars-track"
          ref={pillarsTrackRef}
          onScroll={onPillarsScroll}
          onMouseDown={onPillarsMouseDown}
          onMouseMove={onPillarsMouseMove}
          onMouseUp={onPillarsMouseUp}
          onMouseLeave={onPillarsMouseUp}
        >
          {serviceAreas.map((p) => (
            <div
              className={`pillar-card${activePillar === p.name ? " active" : ""}`}
              key={p.name}
              onClick={() => setActivePillar((prev) => (prev === p.name ? null : p.name))}
            >
              <div className="pillar-card-img" style={{ backgroundImage: `url(${p.bg})` }} />
              <div className="pillar-card-overlay" />
              <div className="pillar-card-content">
                <h3 className="pillar-name">{p.name}</h3>
                <div className="pillar-tags">{p.tags}</div>
                <p className="pillar-desc">{p.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <div className="section-divider"><div className="gold-line" /></div>

      {/* ── Program Phases (Story Cards) ── */}
      <section className="section-story" id="phases">
        <div className="story-header reveal">
          <p className="section-label">
            <span className="gold-text">program lifecycle</span>
          </p>
          <h2 className="section-title">
            Program <em>Phases</em>
          </h2>
          <p className="section-text" style={{ marginTop: "20px" }}>
            Our structured approach guides communities through seven phases of AAM and UAS integration—from initial policy development to full-scale implementation.
          </p>
        </div>
        <div className="story-scroll-controls">
          <div className="story-scroll-progress-bar">
            <div className="story-scroll-progress-fill" style={{ width: `${phaseProgress * 100}%` }} />
          </div>
          <div className="story-scroll-arrows">
            <button className="story-arrow-btn" onClick={phaseScrollPrev} aria-label="Previous">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M15 18l-6-6 6-6" /></svg>
            </button>
            <button className="story-arrow-btn" onClick={phaseScrollNext} aria-label="Next">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M9 18l6-6-6-6" /></svg>
            </button>
          </div>
        </div>
        <div className="story-scroll-outer">
          <div
            className="story-scroll-track"
            ref={phaseTrackRef}
            onScroll={onPhaseScroll}
            onMouseDown={onPhaseMouseDown}
            onMouseMove={onPhaseMouseMove}
            onMouseUp={onPhaseMouseUp}
            onMouseLeave={onPhaseMouseUp}
          >
            {phaseData.map((phase, i) => (
              <div className="story-card" key={phase.phase}>
                <div className="story-card-bg" style={{ backgroundImage: `url(${phase.bg})` }} />
                <div className="story-card-overlay" />
                <div className="story-card-header">
                  <span className="story-card-num">0{i + 1}</span>
                  <span className="timeline-phase">{phase.phase}</span>
                </div>
                <div className="story-card-divider" />
                <h4 className="story-card-title">{phase.title}</h4>
                <div className="story-card-body-wrap">
                  <p className="story-card-body">{phase.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="section-divider"><div className="gold-line" /></div>

      {/* Parallax Quote 2 */}
      <div className="parallax-panel">
        <p className="parallax-text reveal">
          Successful AAM and UAS integration requires <em>coordinated planning</em>, stakeholder alignment, and a commitment to continuous innovation and community benefit.
        </p>
      </div>

      <div className="section-divider"><div className="gold-line" /></div>

      {/* ── Advanced Applications (Explore Cards) ── */}
      <section className="section-explore" id="applications">
        <div className="explore-wrapper">
          <div className="explore-header reveal">
            <p className="section-label">
              <span className="gold-text">advanced applications</span>
            </p>
            <h2 className="section-title">Value Delivery</h2>
          </div>
          <div className="explore-grid">
            {exploreCards.map((card, i) => (
              <div
                className={`explore-card reveal${i > 0 ? ` rd${i}` : ""}`}
                key={card.title}
              >
                <div className="explore-card-bg" style={{ backgroundImage: `url(${card.bg})` }} />
                <div className="explore-card-overlay" />
                <div className="explore-card-inner">
                  <h3 className="explore-card-title">{card.title}</h3>
                  <p className="explore-card-desc">{card.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="section-divider"><div className="gold-line" /></div>

      {/* ── CTA ── */}
      <section className="section-team" id="cta">
        <div className="team-content reveal">
          <p className="section-label">
            <span className="gold-text">Get Started</span>
          </p>
          <h2 className="section-title">
            Ready to <em>Transform</em> Your Region?
          </h2>
          <p className="team-desc">
            Partner with Rawlins to unlock the potential of Advanced Air Mobility and UAS technology. Our experts are ready to guide your community toward innovation, resilience, and growth.
          </p>
          <Link href="/contact" className="btn-team"><span>Start a Conversation</span></Link>
        </div>
      </section>

      <div className="section-divider"><div className="gold-line" /></div>

      <SiteFooter />
    </>
  );
};

export default AAMPage;
