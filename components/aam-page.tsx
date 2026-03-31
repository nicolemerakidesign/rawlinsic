'use client';

import React, { useRef, useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import SiteNav from '@/components/site-nav';
import SiteFooter from '@/components/site-footer';

const DRONE_IMG = "https://images.pexels.com/photos/442587/pexels-photo-442587.jpeg?auto=compress&cs=tinysrgb&w=1200";
const CITY_AERIAL_IMG = "https://images.unsplash.com/photo-1704912343381-99656b2a4ba3?auto=compress&cs=tinysrgb&w=1200";
const INFRASTRUCTURE_IMG = "https://images.pexels.com/photos/7381780/pexels-photo-7381780.jpeg?auto=compress&cs=tinysrgb&w=1200";
const TECH_NETWORK_IMG = "https://images.pexels.com/photos/373543/pexels-photo-373543.jpeg?auto=compress&cs=tinysrgb&w=1200";
const LOGISTICS_IMG = "https://images.unsplash.com/photo-1521405924368-64c5b84bec60?auto=compress&cs=tinysrgb&w=1200";
const PLANNING_IMG = "https://images.pexels.com/photos/3183150/pexels-photo-3183150.jpeg?auto=compress&cs=tinysrgb&w=1200";
const SKYLINE_IMG = "https://images.pexels.com/photos/1519088/pexels-photo-1519088.jpeg?auto=compress&cs=tinysrgb&w=1200";
const AERIAL_VIEW_IMG = "https://images.pexels.com/photos/739410/pexels-photo-739410.jpeg?auto=compress&cs=tinysrgb&w=1200";
const HELICOPTER_IMG = "https://images.unsplash.com/photo-1508444845599-5c89863b1c44?auto=compress&cs=tinysrgb&w=1200";
const CONTROL_ROOM_IMG = "https://images.pexels.com/photos/36155852/pexels-photo-36155852.jpeg?auto=compress&cs=tinysrgb&w=1200";
const DRONE_FLIGHT_IMG = "https://rawlinsic.com/wp-content/uploads/2024/12/skylimit.webp?auto=compress&cs=tinysrgb&w=1200";
const BLUEPRINT_IMG = "https://images.pexels.com/photos/834892/pexels-photo-834892.jpeg?auto=compress&cs=tinysrgb&w=1200";
const DATA_CENTER_IMG = "https://images.pexels.com/photos/1148820/pexels-photo-1148820.jpeg?auto=compress&cs=tinysrgb&w=1200";
const HIGHWAY_AERIAL_IMG = "https://images.pexels.com/photos/681335/pexels-photo-681335.jpeg?auto=compress&cs=tinysrgb&w=1200";
const TEAM_MEETING_IMG = "https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=1200";
const DEFINE_IMG = "https://rawlinsic.com/wp-content/uploads/2025/03/connectingdots.webp?auto=compress&cs=tinysrgb&w=1200";
const PLANNING2_IMG = "https://rawlinsic.com/wp-content/uploads/2025/07/proficiency-1.webp?auto=compress&cs=tinysrgb&w=1200";
const DRONEMOUNTAINS_IMG = "https://images.unsplash.com/photo-1488263590619-bc1fff43b6c1?auto=compress&cs=tinysrgb&w=1200";


/* ──── Data ──── */

const pillarCards = [
  {
    title: "AAM (Air Taxis)",
    desc: "",
    bullets: ["Urban mobility", "Business travel", "Emergency medical transport", "Regional Connectivity", "Tourism & sightseeing"],
    img: CITY_AERIAL_IMG,
  },
  {
    title: "UAS Data Collection",
    desc: "",
    bullets: ["Infrastructure inspection", "Construction inspection & monitoring", "Environmental monitoring", "Aerial surveying & mapping", "Disaster response"],
    img: DRONE_FLIGHT_IMG,
  },
  {
    title: "UAS Package Delivery",
    desc: "",
    bullets: ["Last-mile delivery", "Medical supply delivery", "Rural & remote delivery", "Inter-community delivery", "Retail & e-commerce support", "Air Taxis (AAM)", "Urban mobility", "Business travel", "Emergency medical transport", "Regional connectivity", "Tourism & sightseeing"],
    img: LOGISTICS_IMG,
  },
];

const phaseData = [
  { num: "01", label: "Policy & System Planning", body: "Develop policy, system plans, and standardized guidance for local implementation.", img: BLUEPRINT_IMG },
  { num: "02", label: "Regulatory Navigation", body: "Provide regulatory understanding for compliance and guide regulatory coordination.", img: PLANNING_IMG },
  { num: "03", label: "Infrastructure Planning", body: "Plan for infrastructure, including vertiports, including technical research and validation.", img: INFRASTRUCTURE_IMG },
  { num: "04", label: "Functional Frameworks", body: "Establish functional frameworks that support scalable program delivery and operational readiness.", img: TECH_NETWORK_IMG },
  { num: "05", label: "Data & Safety Integration", body: "Integrate data and safety policies into transportation systems.", img: DATA_CENTER_IMG },
  { num: "06", label: "Implementation & Scaling", body: "Support implementation, deployment, and the scaling of AAM and UAS services.", img: PLANNING2_IMG },
  { num: "07", label: "Community Engagement", body: "Facilitate ongoing community engagement and public trust-building.", img: TEAM_MEETING_IMG },
];

const frameworkCards = [
  {
    title: "Define",
    tagline: "Vision & Scope",
    accent: "linear-gradient(90deg, #c9a84c, #e8d5a0)",
    bullets: ["Community needs assessment", "Vision and goals definition", "Program scope and timeline", "Stakeholder identification"],
    img: DEFINE_IMG,
  },
  {
    title: "Enable",
    tagline: "Infrastructure & Policy",
    accent: "linear-gradient(90deg, #d4b878, #c9a84c)",
    bullets: ["Policy framework development", "Stakeholder coordination", "Infrastructure planning", "Regulatory alignment"],
    img: INFRASTRUCTURE_IMG,
  },
  {
    title: "Deliver",
    tagline: "Operations & Scale",
    accent: "linear-gradient(90deg, #e8d5a0, #c9a84c)",
    bullets: ["Operational deployment", "Safety and compliance monitoring", "Performance optimization", "Continuous improvement"],
    img: CONTROL_ROOM_IMG,
  },
];

const aamServices = [
  "Feasibility studies", "Vertiport planning", "Air traffic management",
  "Policy framework development", "Community outreach", "Pilot program design",
  "Economic impact analysis", "Safety case development", "Multimodal integration", "Regulatory compliance",
];

const uasServices = [
  "Operational design domain development", "Drone delivery corridor planning", "Data governance frameworks",
  "BVLOS operations support", "Safety management systems", "Ground transportation integration",
  "Workforce training programs", "Airspace deconfliction", "Environmental impact assessments", "Procurement support",
];

/* ──── Stakeholder Ecosystem Data ──── */
const ecoIcons: Record<string, string> = {
  aviation: 'M12 2L4 14h4v6h8v-6h4L12 2z',
  government: 'M3 21h18v-2H3v2zm0-4h18v-2H3v2zm2-6v4h3v-4H5zm5 0v4h4v-4h-4zm6 0v4h3v-4h-3zM4 9l8-6 8 6H4z',
  standards: 'M9 3v2H5v14h14V5h-4V3H9zm0 2h6v2H9V5zM7 9h10v2H7V9zm0 4h10v2H7v-2z',
  academic: 'M12 3L1 9l11 6 9-4.91V17h2V9L12 3zm0 12.18L4 11.1V16l8 4 8-4v-4.9l-8 4.08z',
  ansp: 'M12 2a10 10 0 100 20 10 10 0 000-20zm0 4a2 2 0 110 4 2 2 0 010-4zm-1 6h2v2l3 5h-2.2l-1.8-3.5L10.2 19H8l3-5v-2z',
  operators: 'M12 2L8 8h3v4H7l-2 4h3v4h8v-4h3l-2-4h-4V8h3L12 2z',
  industry: 'M22 9l-4-4-4 4h2v4h-4V9l-4-4-4 4h2v4H2v8h20v-8h-2V9h2zm-6 10h-3v-4h3v4zm-5 0H8v-4h3v4z',
  cities: 'M3 21h18v-2H3v2zM5 13v6h4v-6H5zm6-4v10h4V9h-4zm6 2v8h4v-8h-4z',
};

const ecosystemNodes = [
  { id: 'aviation', label: 'Aviation\nAuthorities', short: 'FAA · ICAO · NASAO', desc: 'Federal and international aviation regulatory bodies shaping airspace policy and certification standards.', angle: 0 },
  { id: 'government', label: 'Government\nAgencies', short: 'DOTs · Security · Emergency', desc: 'State and federal departments of transportation, homeland security, and emergency management services.', angle: 45 },
  { id: 'standards', label: 'Standards\nOrganizations', short: 'ACRA · AASHTO · NCHRP', desc: 'Industry standards bodies developing technical requirements, performance benchmarks, and interoperability frameworks.', angle: 90 },
  { id: 'academic', label: 'Academic\nInstitutions', short: 'Research · Universities · Labs', desc: 'Research centers and universities advancing AAM technology, safety analysis, and workforce development.', angle: 135 },
  { id: 'ansp', label: 'Air Navigation\nProviders', short: 'UTM · ATM · Traffic Mgmt', desc: 'Unmanned traffic management operators and air traffic management providers enabling safe airspace integration.', angle: 180 },
  { id: 'operators', label: 'Operators &\nServices', short: 'Drone Ops · Delivery · Providers', desc: 'Commercial drone operators, delivery service providers, and aerial operations companies.', angle: 225 },
  { id: 'industry', label: 'Industry\nPartners', short: 'OEMs · Tech · Integrators', desc: 'Aircraft manufacturers, technology providers, and systems integrators building the AAM ecosystem.', angle: 270 },
  { id: 'cities', label: 'Cities &\nMPOs', short: 'Municipal · Planning · Transit', desc: 'Metropolitan planning organizations, municipal governments, and transit agencies integrating AAM into community infrastructure.', angle: 315 },
];

/* ──── Component ──── */

const AAMPage = () => {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const mouseX = useRef(0);
  const mouseY = useRef(0);
  const ringX = useRef(0);
  const ringY = useRef(0);
  const animFrame = useRef<number | null>(null);

  const [openPillars, setOpenPillars] = useState<Set<number>>(new Set());
  const [openFrameworks, setOpenFrameworks] = useState<Set<number>>(new Set());
  const [activeNode, setActiveNode] = useState<string | null>(null);
  const [hoveredNode, setHoveredNode] = useState<string | null>(null);
  const [introOpen, setIntroOpen] = useState(false);
  const [valueOpen, setValueOpen] = useState(false);
  const [openServices, setOpenServices] = useState<Set<number>>(new Set());

  // Phases horizontal scroll
  const [phasesProgress, setPhasesProgress] = useState(0);
  const phasesTrackRef = useRef<HTMLDivElement>(null);

  const onPhasesScroll = () => {
    const el = phasesTrackRef.current;
    if (!el) return;
    const max = el.scrollWidth - el.clientWidth;
    setPhasesProgress(max > 0 ? el.scrollLeft / max : 0);
  };
  const phasesScrollPrev = () => phasesTrackRef.current?.scrollBy({ left: -420, behavior: "smooth" });
  const phasesScrollNext = () => phasesTrackRef.current?.scrollBy({ left: 420, behavior: "smooth" });

  const toggleSet = (setter: React.Dispatch<React.SetStateAction<Set<number>>>, idx: number) => {
    setter(prev => {
      const next = new Set(prev);
      next.has(idx) ? next.delete(idx) : next.add(idx);
      return next;
    });
  };

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
    const hoverEls = document.querySelectorAll("a, button, .nav-item, .back-to-top, .aam-pillar-card, .aam-framework-card, .explore-card, .eco-svg g[style]");
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

  // Nav + back-to-top
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

  // Scroll reveal
  useEffect(() => {
    let ob: IntersectionObserver;
    const raf = requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        const els = document.querySelectorAll(".reveal");
        els.forEach((el) => { void (el as HTMLElement).offsetHeight; });
        ob = new IntersectionObserver(
          (entries) => entries.forEach((e) => { if (e.isIntersecting) e.target.classList.add("visible"); }),
          { threshold: 0.08 }
        );
        els.forEach((el) => ob.observe(el));
        setTimeout(() => {
          els.forEach((el) => {
            const r = el.getBoundingClientRect();
            if (r.top < window.innerHeight && r.bottom > 0) el.classList.add("visible");
          });
        }, 100);
      });
    });
    return () => { cancelAnimationFrame(raf); if (ob) ob.disconnect(); };
  }, []);

  const chevronSvg = (rotated: boolean) => (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ transition: "transform 0.3s", transform: rotated ? "rotate(180deg)" : "rotate(0)" }}>
      <path d="M6 9l6 6 6-6" />
    </svg>
  );

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
        <svg viewBox="0 0 24 24"><path d="M12 19V5M5 12l7-7 7 7" /></svg>
      </a>

      <SiteNav ctaHref="/contact" />

      {/* ── Hero ── */}
      <section className="aam-hero aam-parallax-fixed" id="top" style={{ backgroundImage: `url(${DRONE_IMG})` }}>
        <div className="aam-hero-overlay" />
        <div className="aam-hero-content">
          <span className="hero-label"><span className="gold-text"></span></span>
          <h1 className="hero-title"><em>Advanced Air Mobility</em> &amp; Uncrewed Aircraft Systems</h1>
          <p className="hero-sub">Partnering to turn AAM and UAS concepts into community and regional transportation solutions.</p>
          <a href="#intro" className="hero-cta-btn"><span>explore our approach</span></a>
        </div>
        <div className="hero-scroll"><span>Scroll</span><div className="scroll-line" /></div>
      </section>

      <div className="section-divider"><div className="gold-line" /></div>

      {/* ── Intro: Why AAM & UAS ── */}
      <section className="aam-section aam-overview-section" id="intro">
        <div className="aam-container">
          <div className="aam-overview-grid">
            <div className="aam-overview-left reveal">
              <p className="section-label"><span className="gold-text">are you ready?</span></p>
              <h2 className="section-title">The next major phase in transportation's <em>evolution</em></h2>
              <button
                className={`intro-expand-btn${introOpen ? " expanded" : ""}`}
                aria-label="Learn more"
                onClick={() => setIntroOpen(o => !o)}
              >
                <span className="intro-expand-icon">
                  <svg width="16" height="10" viewBox="0 0 16 10" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M1 1.5l7 7 7-7" />
                  </svg>
                </span>
              </button>
              <div className={`intro-expandable${introOpen ? " expanded" : ""}`}>
                <p className="aam-section-lead">
                  Advanced air mobility (AAM) and uncrewed aircraft systems (UAS) are increasingly part of modern mobility ecosystems. Together, these systems and associated technologies are expected to transform transportation by enhancing connectivity, improving cargo logistics, expediting emergency response, and assisting infrastructure inspection.
                </p>
                <p className="aam-section-lead">
                  Next-generation aerial capabilities, integrated into existing mobility systems, complement ground, rail, and maritime transport networks. They strengthen multimodal transportation and enable urban, rural, and regional areas to benefit from a more connected, resilient, and adaptable mobility ecosystem.
                </p>
              </div>
            </div>
            <div className="aam-overview-right reveal rd1">
              <div className="intro-cinematic-wrap">
                <Image className="intro-cinematic-img" src={AERIAL_VIEW_IMG} alt="Aerial view" fill sizes="(max-width: 768px) 100vw, 50vw" />
                <div className="intro-cinematic-overlay" />
                <div className="intro-metrics">
                  <div className="intro-metric">
                    <span className="intro-metric-num">20+</span>
                    <span className="intro-metric-label">Specializations</span>
                  </div>
                  <div className="intro-metric-divider" />
                  <div className="intro-metric">
                    <span className="intro-metric-num">20</span>
                    <span className="intro-metric-label">US States Served</span>
                  </div>
                  <div className="intro-metric-divider" />
                  <div className="intro-metric">
                    <span className="intro-metric-num">7</span>
                    <span className="intro-metric-label">Phase Program Lifecycle Support</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Parallax Quote with Image */}
      <div
        className="parallax-panel aam-parallax-fixed"
        style={{ backgroundImage: `url(${SKYLINE_IMG})` }}
      >
        <div className="aam-parallax-overlay" />
        <p className="parallax-text1 reveal" style={{ position: 'relative', zIndex: 2 }}>
          Strategic Multimodal Integration.<br /><em>Built on Real-World Success.</em>
        </p>
      </div>

      {/* ── Value Delivery: Pillar Cards ── */}
      <section className="aam-section" id="value">
        <div className="aam-container">
          <div className="aam-section-header reveal">
            <p className="section-label"><span className="gold-text">Value Delivery</span></p>
            <h2 className="section-title">Where we drive <em>impact</em> in AAM and UAS</h2>
            <button
              className={`intro-expand-btn${valueOpen ? " expanded" : ""}`}
              aria-label="Learn more"
              onClick={() => setValueOpen(o => !o)}
            >
              <span className="intro-expand-icon">
                <svg width="16" height="10" viewBox="0 0 16 10" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M1 1.5l7 7 7-7" />
                </svg>
              </span>
            </button>
            <div className={`intro-expandable${valueOpen ? " expanded" : ""}`}>
              <p className="aam-section-lead">
                The capabilities pioneered by UAS technologies underpin the development of AAM, which extends UAS applications into full-scale mobility solutions. UAS refers to all uncrewed aircraft, from small drones to larger remotely piloted systems. AAM represents a new vision of mobility, expanding transportation options for passengers, cargo, and emergency services across communities and regions.
              </p>
            </div>
          </div>
          <div className="aam-pillars-grid">
            {pillarCards.map((card, i) => (
              <div className={`aam-pillar-card${openPillars.has(i) ? " open" : ""}`} key={card.title}>
                <div className="aam-pillar-img-wrap">
                  <Image src={card.img} alt={card.title} fill sizes="(max-width: 768px) 100vw, 33vw" className="aam-pillar-img" />
                  <div className="aam-pillar-img-overlay" />
                </div>
                <div className="aam-pillar-bar" />
                <div className="aam-pillar-inner">
                  <div className="aam-pillar-title-row">
                    <h3 className="aam-pillar-title">{card.title}</h3>
                    <button className="aam-expand-btn" onClick={() => toggleSet(setOpenPillars, i)}>
                      {chevronSvg(openPillars.has(i))}
                    </button>
                  </div>
                  {card.desc && <p className="aam-pillar-desc">{card.desc}</p>}
                  <div className={`aam-pillar-expand${openPillars.has(i) ? " open" : ""}`}>
                    <ul className="aam-bullet-list">
                      {card.bullets.map((b) => <li key={b}>{b}</li>)}
                    </ul>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="section-divider"><div className="gold-line" /></div>

      {/* ── How we serve: Horizontal Scroll Cards ── */}
      <section className="aam-section aam-phases-alt-section" id="phases-alt">
        <div className="aam-container">
          <div className="aam-section-header reveal">
            <p className="section-label"><span className="gold-text">how we serve our clients</span></p>
            <h2 className="section-title">Essential <em>Phases</em></h2>
            <p className="section-text" style={{ marginTop: "20px" }}>
              Our team brings together regulatory guidance, operational expertise, and program strategy to deliver real-world results. We support AAM and UAS initiatives throughout the program lifecycle.
            </p>
          </div>
        </div>

        {/* Progress bar + arrow controls */}
        <div className="story-scroll-controls">
          <div className="story-scroll-progress-bar">
            <div
              className="story-scroll-progress-fill"
              style={{ width: `${phasesProgress * 100}%` }}
            />
          </div>
          <div className="story-scroll-arrows">
            <button className="story-arrow-btn" onClick={phasesScrollPrev} aria-label="Previous phase">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M15 18l-6-6 6-6" />
              </svg>
            </button>
            <button className="story-arrow-btn" onClick={phasesScrollNext} aria-label="Next phase">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M9 18l6-6-6-6" />
              </svg>
            </button>
          </div>
        </div>

        {/* Full-width scroll area */}
        <div className="aam-alt-scroll-outer">
          <div
            className="aam-alt-scroll-track"
            ref={phasesTrackRef}
            onScroll={onPhasesScroll}
          >
            {phaseData.map((phase, i) => (
              <div className="aam-alt-card" key={phase.num}>
                <Image src={phase.img} alt={phase.label} fill sizes="(max-width: 768px) 80vw, 400px" className="aam-alt-card-bg" />
                <div className="aam-alt-card-overlay" />
                <div className="aam-alt-card-header">
                  <span className="aam-alt-card-num">{phase.num}</span>
                  <span className="aam-alt-card-phase">Phase {i + 1}</span>
                </div>
                <div className="aam-alt-card-divider" />
                <h4 className="aam-alt-card-title">{phase.label}</h4>
                <p className="aam-alt-card-body">{phase.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="section-divider"><div className="gold-line" /></div>

      {/* ── Strategic Methodology: Define / Enable / Deliver ── */}
      <section className="aam-section" id="methodology">
        <div className="aam-container">
          <div className="aam-section-header reveal">
            <h2 className="section-title">Our <em>Approach</em></h2>
          </div>
          <div className="aam-framework-grid">
            {frameworkCards.map((card, i) => (
              <div className={`aam-framework-card${openFrameworks.has(i) ? " open" : ""}`} key={card.title}>
                <div className="aam-framework-img-wrap">
                  <Image src={card.img} alt={card.title} fill sizes="(max-width: 768px) 100vw, 33vw" className="aam-framework-img" />
                  <div className="aam-framework-img-overlay" />
                </div>
                <div className="aam-framework-accent" style={{ background: card.accent }} />
                <div className="aam-framework-inner">
                  <div className="aam-pillar-title-row">
                    <h3 className="aam-framework-phase">{card.title}</h3>
                    <button className="aam-expand-btn" onClick={() => toggleSet(setOpenFrameworks, i)}>
                      {chevronSvg(openFrameworks.has(i))}
                    </button>
                  </div>
                  <p className="aam-framework-tagline">{card.tagline}</p>
                  <div className={`aam-framework-expand${openFrameworks.has(i) ? " open" : ""}`}>
                    <ul className="aam-bullet-list">
                      {card.bullets.map((b) => <li key={b}>{b}</li>)}
                    </ul>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="section-divider"><div className="gold-line" /></div>

      {/* Parallax Quote 2 */}
      <div
        className="parallax-panel aam-parallax-fixed"
        style={{ backgroundImage: `url(${HIGHWAY_AERIAL_IMG})` }}
      >
        <div className="aam-parallax-overlay" />
        <p className="parallax-text1 reveal" style={{ position: 'relative', zIndex: 2 }}>
          Guiding the <em>future</em> of aviation
        </p>
      </div>

      {/* ── Interactive Stakeholder Ecosystem ── */}
      <section className="aam-section aam-ecosystem-section" id="stakeholders">
        <div className="aam-container">
          <div className="eco-layout">
            {/* Left: text */}
            <div className="eco-layout-text">
              <div className="aam-section-header reveal">
                <p className="section-label"><span className="gold-text">who we partner with</span></p>
                <h2 className="section-title">Stakeholders We <em>Engage</em></h2>
                <p className="aam-section-lead" style={{ marginTop: '20px' }}>
                  We engage multiple stakeholders in the public and private sectors across AAM and UAS to align policy, regulation, operations, and technology; integrate systems and infrastructure; implement/deploy and scale services.
                </p>
                <p className="aam-section-lead" style={{ fontStyle: 'italic' }}>
                  Click any stakeholder to learn more.
                </p>
              </div>
            </div>

            {/* Right: interactive visualization */}
            <div className="eco-layout-vis">
              <div className="eco-vis-wrapper">
                <svg className="eco-svg" viewBox="0 0 800 800" xmlns="http://www.w3.org/2000/svg">
                  <defs>
                    <filter id="goldGlow" x="-50%" y="-50%" width="200%" height="200%">
                      <feGaussianBlur in="SourceAlpha" stdDeviation="6" result="blur" />
                      <feFlood floodColor="#c9a84c" floodOpacity="0.4" result="color" />
                      <feComposite in="color" in2="blur" operator="in" result="shadow" />
                      <feMerge><feMergeNode in="shadow" /><feMergeNode in="SourceGraphic" /></feMerge>
                    </filter>
                    <filter id="goldGlowStrong" x="-50%" y="-50%" width="200%" height="200%">
                      <feGaussianBlur in="SourceAlpha" stdDeviation="12" result="blur" />
                      <feFlood floodColor="#c9a84c" floodOpacity="0.6" result="color" />
                      <feComposite in="color" in2="blur" operator="in" result="shadow" />
                      <feMerge><feMergeNode in="shadow" /><feMergeNode in="SourceGraphic" /></feMerge>
                    </filter>
                    <linearGradient id="lineGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="#c9a84c" stopOpacity="0.1" />
                      <stop offset="50%" stopColor="#c9a84c" stopOpacity="0.5" />
                      <stop offset="100%" stopColor="#c9a84c" stopOpacity="0.1" />
                    </linearGradient>
                    <radialGradient id="centerGrad" cx="50%" cy="50%" r="50%">
                      <stop offset="0%" stopColor="#c9a84c" stopOpacity="0.25" />
                      <stop offset="60%" stopColor="#c9a84c" stopOpacity="0.08" />
                      <stop offset="100%" stopColor="#c9a84c" stopOpacity="0" />
                    </radialGradient>
                    <linearGradient id="titleGoldGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="#c9a84c" />
                      <stop offset="50%" stopColor="#e8d5a0" />
                      <stop offset="100%" stopColor="#c9a84c" />
                    </linearGradient>
                    <style>{`
                      .eco-connection { stroke-dasharray: 6 8; animation: ecoDash 25s linear infinite; }
                      .eco-connection-active { stroke-dasharray: 4 4; animation: ecoDash 8s linear infinite; stroke-width: 2; }
                      @keyframes ecoDash { to { stroke-dashoffset: -200; } }
                      .eco-orbit-ring { animation: ecoOrbitPulse 6s ease-in-out infinite; }
                      .eco-orbit-ring-2 { animation: ecoOrbitPulse 6s ease-in-out infinite 2s; }
                      .eco-orbit-ring-3 { animation: ecoOrbitPulse 6s ease-in-out infinite 4s; }
                      @keyframes ecoOrbitPulse { 0%,100% { opacity: 0.15; } 50% { opacity: 0.35; } }
                      .eco-center-pulse { animation: ecoCenterPulse 3s ease-in-out infinite; }
                      @keyframes ecoCenterPulse { 0%,100% { r: 52; opacity: 0.2; } 50% { r: 58; opacity: 0.35; } }
                      .eco-node-glow { animation: ecoNodeGlow 4s ease-in-out infinite; }
                      @keyframes ecoNodeGlow { 0%,100% { opacity: 0.3; } 50% { opacity: 0.6; } }
                      .eco-data-particle { animation: ecoParticle 4s linear infinite; opacity: 0; }
                      @keyframes ecoParticle { 0% { opacity: 0; } 10% { opacity: 0.8; } 90% { opacity: 0.8; } 100% { opacity: 0; } }
                    `}</style>
                  </defs>

                  {/* Background grid */}
                  <g opacity="0.04">
                    {Array.from({ length: 17 }, (_, i) => (
                      <React.Fragment key={`grid-${i}`}>
                        <line x1={i * 50} y1="0" x2={i * 50} y2="800" stroke="#c9a84c" strokeWidth="0.5" />
                        <line x1="0" y1={i * 50} x2="800" y2={i * 50} stroke="#c9a84c" strokeWidth="0.5" />
                      </React.Fragment>
                    ))}
                  </g>

                  {/* Orbital rings */}
                  <circle cx="400" cy="400" r="200" fill="none" stroke="#c9a84c" strokeWidth="0.5" className="eco-orbit-ring" />
                  <circle cx="400" cy="400" r="270" fill="none" stroke="#c9a84c" strokeWidth="0.5" className="eco-orbit-ring-2" />
                  <circle cx="400" cy="400" r="340" fill="none" stroke="#c9a84c" strokeWidth="0.3" className="eco-orbit-ring-3" />

                  {/* Connection lines */}
                  {ecosystemNodes.map((node) => {
                    const rad = (node.angle * Math.PI) / 180;
                    const nx = 400 + Math.cos(rad) * 280;
                    const ny = 400 + Math.sin(rad) * 280;
                    const isActive = activeNode === node.id || hoveredNode === node.id;
                    return (
                      <line key={`line-${node.id}`} x1="400" y1="400" x2={nx} y2={ny} stroke="#c9a84c" strokeWidth={isActive ? 2 : 1} className={isActive ? "eco-connection-active" : "eco-connection"} opacity={isActive ? 0.8 : 0.2} />
                    );
                  })}

                  {/* Cross-connections */}
                  {ecosystemNodes.map((node, i) => {
                    const next = ecosystemNodes[(i + 1) % ecosystemNodes.length];
                    const rad1 = (node.angle * Math.PI) / 180;
                    const rad2 = (next.angle * Math.PI) / 180;
                    return (
                      <line key={`cross-${i}`} x1={400 + Math.cos(rad1) * 280} y1={400 + Math.sin(rad1) * 280} x2={400 + Math.cos(rad2) * 280} y2={400 + Math.sin(rad2) * 280} stroke="#c9a84c" strokeWidth="0.5" className="eco-connection" opacity="0.08" />
                    );
                  })}

                  {/* Center glow */}
                  <circle cx="400" cy="400" r="100" fill="url(#centerGrad)" />
                  <circle cx="400" cy="400" r="68" fill="none" stroke="#c9a84c" strokeWidth="0.8" className="eco-center-pulse" opacity="0.2" />

                  {/* Center hub */}
                  <circle cx="400" cy="400" r="80" fill="rgba(6,12,22,0.95)" stroke="rgba(201,168,76,0.3)" strokeWidth="1" />
                  <text x="400" y="390" textAnchor="middle" fill="url(#titleGoldGrad)" fontFamily="'DM Sans', sans-serif" fontSize="16" fontWeight="700" letterSpacing="4" style={{ textTransform: 'uppercase' }}>RAWLINS</text>
                  <text x="400" y="412" textAnchor="middle" fill="url(#titleGoldGrad)" fontFamily="'DM Sans', sans-serif" fontSize="14" fontWeight="600" letterSpacing="3" style={{ textTransform: 'uppercase' }}>AERO TEAM</text>

                  {/* Stakeholder nodes */}
                  {ecosystemNodes.map((node) => {
                    const rad = (node.angle * Math.PI) / 180;
                    const nx = 400 + Math.cos(rad) * 280;
                    const ny = 400 + Math.sin(rad) * 280;
                    const isActive = activeNode === node.id;
                    const isHovered = hoveredNode === node.id;
                    const highlighted = isActive || isHovered;
                    const iconPath = ecoIcons[node.id] || '';
                    const iconSize = highlighted ? 56 : 48;

                    return (
                      <g key={node.id} style={{ cursor: 'none' }} onClick={() => setActiveNode(activeNode === node.id ? null : node.id)} onMouseEnter={() => setHoveredNode(node.id)} onMouseLeave={() => setHoveredNode(null)}>
                        <circle cx={nx} cy={ny} r="65" fill="transparent" />
                        <g transform={`translate(${nx - iconSize / 2}, ${ny - iconSize / 2})`} style={{ transition: 'all 0.3s' }}>
                          <svg width={iconSize} height={iconSize} viewBox="0 0 24 24">
                            <path d={iconPath} fill="url(#titleGoldGrad)" opacity={highlighted ? 1 : 0.7} style={{ filter: highlighted ? 'drop-shadow(0 0 10px rgba(201,168,76,0.6))' : 'none' }} />
                          </svg>
                        </g>
                        {node.label.split('\n').map((line, li) => (
                          <text key={li} x={nx} y={ny + (highlighted ? 42 : 36) + li * 20} textAnchor="middle" fill={highlighted ? "#e8d5a0" : "rgba(232,230,225,1)"} fontFamily="'DM Sans', sans-serif" fontSize="16" fontWeight={highlighted ? "600" : "500"} letterSpacing="1.5" style={{ textTransform: 'uppercase', transition: 'all 0.3s' }}>
                            {line}
                          </text>
                        ))}
                      </g>
                    );
                  })}

                  {/* Particles — outbound */}
                  {ecosystemNodes.map((node, i) => (
                    <circle key={`particle-out-${i}`} r="2" fill="#c9a84c" className="eco-data-particle" style={{ animationDelay: `${i * 0.5}s` }}>
                      <animateMotion dur={`${3 + i * 0.3}s`} repeatCount="indefinite"><mpath href={`#path-out-${i}`} /></animateMotion>
                    </circle>
                  ))}
                  {/* Particles — inbound */}
                  {ecosystemNodes.map((node, i) => (
                    <circle key={`particle-in-${i}`} r="2" fill="#c9a84c" className="eco-data-particle" style={{ animationDelay: `${i * 0.5 + 1.5}s` }}>
                      <animateMotion dur={`${3 + i * 0.3}s`} repeatCount="indefinite"><mpath href={`#path-in-${i}`} /></animateMotion>
                    </circle>
                  ))}
                  {/* Paths — outbound */}
                  {ecosystemNodes.map((node, i) => {
                    const rad = (node.angle * Math.PI) / 180;
                    const sx = 400 + Math.cos(rad) * 85;
                    const sy = 400 + Math.sin(rad) * 85;
                    const nx = 400 + Math.cos(rad) * 250;
                    const ny = 400 + Math.sin(rad) * 250;
                    return <path key={`path-out-${i}`} id={`path-out-${i}`} d={`M${sx},${sy} L${nx},${ny}`} fill="none" stroke="none" />;
                  })}
                  {/* Paths — inbound */}
                  {ecosystemNodes.map((node, i) => {
                    const rad = (node.angle * Math.PI) / 180;
                    const sx = 400 + Math.cos(rad) * 85;
                    const sy = 400 + Math.sin(rad) * 85;
                    const nx = 400 + Math.cos(rad) * 250;
                    const ny = 400 + Math.sin(rad) * 250;
                    return <path key={`path-in-${i}`} id={`path-in-${i}`} d={`M${nx},${ny} L${sx},${sy}`} fill="none" stroke="none" />;
                  })}
                </svg>

                {/* Detail panel */}
                {activeNode && (() => {
                  const node = ecosystemNodes.find(n => n.id === activeNode);
                  if (!node) return null;
                  const rad = (node.angle * Math.PI) / 180;
                  const cosA = Math.cos(rad);
                  const sinA = Math.sin(rad);
                  const rawX = 50 + cosA * 30;
                  const rawY = 50 + sinA * 30;
                  const clampX = Math.max(5, Math.min(95, rawX));
                  const clampY = Math.max(5, Math.min(70, rawY));
                  return (
                    <div className="eco-detail-panel" style={{ left: `${clampX}%`, top: `${clampY}%`, transform: 'translate(-50%, -50%)' }}>
                      <div className="eco-detail-header">
                        <div>
                          <h4 className="eco-detail-title">{node.label.replace('\n', ' ')}</h4>
                          <p className="eco-detail-short">{node.short}</p>
                        </div>
                        <button className="eco-detail-close" onClick={() => setActiveNode(null)}>
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 6L6 18M6 6l12 12" /></svg>
                        </button>
                      </div>
                      <p className="eco-detail-desc">{node.desc}</p>
                    </div>
                  );
                })()}

                {/* Click-outside overlay */}
                {activeNode && (
                  <div className="eco-click-outside" onClick={() => setActiveNode(null)} />
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="section-divider"><div className="gold-line" /></div>

      {/* ── Service Portfolio ── */}
      <section className="aam-section aam-portfolio-section" id="portfolio">
        <div className="aam-container">
          <div className="aam-section-header reveal" style={{ textAlign: 'center' }}>
            <p className="section-label"><span className="gold-text">Services</span></p>
            <h2 className="section-title">Our Service <em>Portfolio</em></h2>
          </div>
          <div className="aam-pillars-grid aam-portfolio-tiles">
            {[
              { title: "AAM Services", img: DRONEMOUNTAINS_IMG, items: aamServices, idx: 0 },
              { title: "UAS Services", img: PLANNING2_IMG, items: uasServices, idx: 1 },
            ].map((svc) => (
              <div className={`aam-pillar-card${openServices.has(svc.idx) ? " open" : ""}`} key={svc.title}>
                <div className="aam-pillar-img-wrap">
                  <Image src={svc.img} alt={svc.title} fill sizes="(max-width: 768px) 100vw, 50vw" className="aam-pillar-img" />
                  <div className="aam-pillar-img-overlay" />
                </div>
                <div className="aam-pillar-bar" />
                <div className="aam-pillar-inner">
                  <div className="aam-pillar-title-row">
                    <h3 className="aam-pillar-title">{svc.title}</h3>
                    <button className="aam-expand-btn" onClick={() => toggleSet(setOpenServices, svc.idx)}>
                      {chevronSvg(openServices.has(svc.idx))}
                    </button>
                  </div>
                  <div className={`aam-pillar-expand${openServices.has(svc.idx) ? " open" : ""}`}>
                    <ul className="aam-bullet-list">
                      {svc.items.map((s) => <li key={s}>{s}</li>)}
                    </ul>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="section-divider"><div className="gold-line" /></div>

      {/* ── CTA ── */}
      <section
        className="aam-section aam-cta-section aam-parallax-fixed"
        style={{ backgroundImage: `url(${HELICOPTER_IMG})` }}
      >
        <div className="aam-cta-overlay" />
        <div className="aam-container" style={{ position: 'relative', zIndex: 2 }}>
          <div className="aam-cta-wrap reveal" style={{ textAlign: "center", margin: "0 auto" }}>
            <p className="section-label"><span className="gold-text">Get Started</span></p>
            <h2 className="section-title">Ready to <em>Transform</em> Your Region?</h2>
            <p className="aam-cta-body">
              Whether you are just beginning or well along on your journey, we can provide guidance and support. To learn more about our service portfolio and how we can help you deliver successful AAM and UAS outcomes for your community, reach out.
            </p>
            <Link href="/contact" className="hero-cta-btn" style={{ marginTop: "20px", display: "inline-block" }}>
              <span>Start a Conversation</span>
            </Link>
          </div>
        </div>
      </section>

      <div className="section-divider"><div className="gold-line" /></div>

      <SiteFooter />
    </>
  );
};

export default AAMPage;
