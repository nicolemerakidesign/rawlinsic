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
const DRONE_FLIGHT_IMG = "https://images.pexels.com/photos/2050718/pexels-photo-2050718.jpeg?auto=compress&cs=tinysrgb&w=1200";
const BLUEPRINT_IMG = "https://images.pexels.com/photos/834892/pexels-photo-834892.jpeg?auto=compress&cs=tinysrgb&w=1200";
const DATA_CENTER_IMG = "https://images.pexels.com/photos/1148820/pexels-photo-1148820.jpeg?auto=compress&cs=tinysrgb&w=1200";
const HIGHWAY_AERIAL_IMG = "https://images.pexels.com/photos/681335/pexels-photo-681335.jpeg?auto=compress&cs=tinysrgb&w=1200";
const TEAM_MEETING_IMG = "https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=1200";

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
    bullets: ["Last-mile delivery", "Medical supply delivery", "Rural & remote delivery", "Inter-community delivery", "Retail & e-commerce support", "Air Taxis (AAM)", "Urban mobility", "Business travel", "Emergency medical transport", "Regional connectivity", "Tourism & sightseeing" ],
    img: LOGISTICS_IMG,
  },
];

const phaseData = [
  { num: "01", label: "Policy & System Planning", body: "Develop policy, system plans, and standardized guidance for local implementation.", img: BLUEPRINT_IMG },
  { num: "02", label: "Regulatory Navigation", body: "Provide regulatory understanding for compliance and guide regulatory coordination.", img: PLANNING_IMG },
  { num: "03", label: "Infrastructure Planning", body: "Plan for infrastructure, including vertiports, including technical research and validation.", img: INFRASTRUCTURE_IMG },
  { num: "04", label: "Functional Frameworks", body: "Establish functional frameworks that support scalable program delivery and operational readiness.", img: TECH_NETWORK_IMG },
  { num: "05", label: "Data & Safety Integration", body: "Integrate data and safety policies into transportation systems.", img: DATA_CENTER_IMG },
  { num: "06", label: "Implementation & Scaling", body: "Support implementation, deployment, and the scaling of AAM and UAS services.", img: DRONE_FLIGHT_IMG },
  { num: "07", label: "Community Engagement", body: "Facilitate ongoing community engagement and public trust-building.", img: TEAM_MEETING_IMG },
];

const frameworkCards = [
  {
    title: "Define",
    tagline: "Vision & Scope",
    accent: "linear-gradient(90deg, #c9a84c, #e8d5a0)",
    bullets: ["Community needs assessment", "Vision and goals definition", "Program scope and timeline", "Stakeholder identification"],
    img: PLANNING_IMG,
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

const stakeholdersLeft = [
  { name: "Aviation Authorities", entities: "FAA · ICAO · NASAO" },
  { name: "Government Agencies", entities: "DOTs · Security · Emergency Services" },
  { name: "Standards Organizations", entities: "ACRA · AASHTO · NCHRP" },
  { name: "Academic Institutions", entities: "Research Centers · Universities · Labs" },
];

const stakeholdersRight = [
  { name: "Air Navigation Providers", entities: "UTM Operators · ATM Providers · Traffic Mgmt" },
  { name: "Operators & Services", entities: "Drone Operators · Delivery Services · Providers" },
  { name: "Industry Partners", entities: "Manufacturers · Tech Providers · Integrators" },
  { name: "Cities & MPOs", entities: "Municipal Gov · Planning Offices · Transit Agencies" },
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

/* ──── Component ──── */

/* ──── Stakeholder Ecosystem Data ──── */
const ecosystemNodes = [
  { id: 'aviation', label: 'Aviation\nAuthorities', short: 'FAA · ICAO · NASAO', desc: 'Federal and international aviation regulatory bodies shaping airspace policy and certification standards.', icon: '✈', angle: 0 },
  { id: 'government', label: 'Government\nAgencies', short: 'DOTs · Security · Emergency', desc: 'State and federal departments of transportation, homeland security, and emergency management services.', icon: '⚙', angle: 45 },
  { id: 'standards', label: 'Standards\nOrganizations', short: 'ACRA · AASHTO · NCHRP', desc: 'Industry standards bodies developing technical requirements, performance benchmarks, and interoperability frameworks.', icon: '◈', angle: 90 },
  { id: 'academic', label: 'Academic\nInstitutions', short: 'Research · Universities · Labs', desc: 'Research centers and universities advancing AAM technology, safety analysis, and workforce development.', icon: '◉', angle: 135 },
  { id: 'ansp', label: 'Air Navigation\nProviders', short: 'UTM · ATM · Traffic Mgmt', desc: 'Unmanned traffic management operators and air traffic management providers enabling safe airspace integration.', icon: '◎', angle: 180 },
  { id: 'operators', label: 'Operators &\nServices', short: 'Drone Ops · Delivery · Providers', desc: 'Commercial drone operators, delivery service providers, and aerial operations companies.', icon: '▲', angle: 225 },
  { id: 'industry', label: 'Industry\nPartners', short: 'OEMs · Tech · Integrators', desc: 'Aircraft manufacturers, technology providers, and systems integrators building the AAM ecosystem.', icon: '⬡', angle: 270 },
  { id: 'cities', label: 'Cities &\nMPOs', short: 'Municipal · Planning · Transit', desc: 'Metropolitan planning organizations, municipal governments, and transit agencies integrating AAM into community infrastructure.', icon: '▣', angle: 315 },
];

const AAMPage = () => {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const mouseX = useRef(0);
  const mouseY = useRef(0);
  const ringX = useRef(0);
  const ringY = useRef(0);
  const animFrame = useRef<number | null>(null);

  const [openPillars, setOpenPillars] = useState<Set<number>>(new Set());
  const [openPhases, setOpenPhases] = useState<Set<number>>(new Set());
  const [openFrameworks, setOpenFrameworks] = useState<Set<number>>(new Set());
  const [showAllAAM, setShowAllAAM] = useState(false);
  const [showAllUAS, setShowAllUAS] = useState(false);
  const [activeNode, setActiveNode] = useState<string | null>(null);
  const [hoveredNode, setHoveredNode] = useState<string | null>(null);
  const [introOpen, setIntroOpen] = useState(false);
  const [valueOpen, setValueOpen] = useState(false);
  const [openServices, setOpenServices] = useState<Set<number>>(new Set());

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
      <section className="aam-hero" id="top">
        <div className="aam-hero-bg" style={{ backgroundImage: `url(${DRONE_IMG})` }} />
        <div className="aam-hero-overlay" />
        <div className="aam-hero-content">
          <span className="hero-label"><span className="gold-text"></span></span>
          <h1 className="hero-title"><em>Advanced Air Mobility</em> &amp; Uncrewed Aircraft Systems</h1>
          <p className="hero-sub">Partnering to turn AAM and UAS concepts into community transport solutions.</p>
          <a href="#intro" className="hero-cta-btn"><span>explore our approach</span></a>
        </div>
        <div className="hero-scroll"><span>Scroll</span><div className="scroll-line" /></div>
      </section>

      <div className="section-divider"><div className="gold-line" /></div>

      {/* ── Intro: Why AAM & UAS ── */}
      <section className="aam-section aam-overview-section" id="intro">
        <div className="aam-container">
          <div className="aam-overview-grid">
            <div className="aam-overview-left">
              <p className="section-label"><span className="gold-text">are you ready?</span></p>
              <h2 className="section-title">The next major phase in transportation’s <em>evolution</em></h2>
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
Advanced air mobility (AAM) and uncrewed aircraft systems (UAS) are increasingly part of modern mobility ecosystems. Together, these systems and associated technologies are expected to transform transportation by enhancing connectivity, improving cargo logistics, expediting emergency response, and assisting infrastructure inspection.               </p>
                <p className="aam-section-lead">
                  Next-generation aerial capabilities, integrated into existing mobility systems, complement ground, rail, and maritime transport networks. They strengthen multimodal transportation and enable urban, rural, and regional areas to benefit from a more connected, resilient, and adaptable mobility ecosystem.</p>          </div>
            </div>
            <div className="aam-overview-right">
              <div className="intro-cinematic-wrap">
                <img className="intro-cinematic-img" src={AERIAL_VIEW_IMG} alt="Aerial view" />
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
          </div>
        </div>
      </section>

      {/* Parallax Quote with Image */}
      <div className="parallax-panel aam-parallax-img-panel">
        <div className="aam-parallax-bg" style={{ backgroundImage: `url(${SKYLINE_IMG})` }} />
        <div className="aam-parallax-overlay" />
        <p className="parallax-text" style={{ position: 'relative', zIndex: 2 }}>
          Strategic Multi-Modal Integration | <em>Built on Real-World Success</em>
        </p>
      </div>

      {/* ── Value Delivery: Pillar Cards ── */}
      <section className="aam-section" id="value">
        <div className="aam-container">
          <div className="aam-section-header">
            <p className="section-label"><span className="gold-text">Value Delivery</span></p>
            <h2 className="section-title">Where AAM and UAS deliver <em>value</em></h2>
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
The capabilities pioneered by UAS technologies underpin the development of AAM, which extends UAS applications into full-scale mobility solutions. UAS refers to all uncrewed aircraft, from small drones to larger remotely piloted systems. AAM represents a new vision of mobility, expanding transportation options for passengers, cargo, and emergency services across communities and regions.              </p>
            </div>
          </div>
          <div className="aam-pillars-grid">
            {pillarCards.map((card, i) => (
              <div className={`aam-pillar-card${openPillars.has(i) ? " open" : ""}`} key={card.title}>
                <div className="aam-pillar-img-wrap">
                  <img src={card.img} alt={card.title} className="aam-pillar-img" loading="lazy" />
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
          <div className="aam-section-header">
            <p className="section-label"><span className="gold-text">how we serve our clients</span></p>
            <h2 className="section-title">Essential <em>Phases</em></h2>
            <p className="section-text" style={{ marginTop: "20px" }}>
Our team brings together regulatory guidance, operational expertise, and program strategy to deliver real-world results. We support AAM and UAS initiatives throughout the program lifecycle.            </p>
          </div>
        </div>
        {/* Full-width scroll area — breaks out of aam-container */}
        <div className="aam-alt-scroll-outer">
          <div className="aam-alt-scroll-track">
            {phaseData.map((phase, i) => (
              <div className="aam-alt-card" key={phase.num}>
                <div className="aam-alt-card-bg" style={{ backgroundImage: `url(${phase.img})` }} />
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
          <div className="aam-section-header">
            <p className="section-label"><span className="gold-text">Strategic Methodology</span></p>
            <h2 className="section-title">Our <em>Approach</em></h2>
          </div>
          <div className="aam-framework-grid">
            {frameworkCards.map((card, i) => (
              <div className={`aam-framework-card${openFrameworks.has(i) ? " open" : ""}`} key={card.title}>
                <div className="aam-framework-img-wrap">
                  <img src={card.img} alt={card.title} className="aam-framework-img" loading="lazy" />
                  <div className="aam-framework-img-overlay" />
                </div>
                <div className="aam-framework-accent" style={{ background: card.accent }} />
                <div className="aam-framework-inner">
                  <h3 className="aam-framework-phase">{card.title}</h3>
                  <p className="aam-framework-tagline">{card.tagline}</p>
                  <button className="aam-framework-toggle" onClick={() => toggleSet(setOpenFrameworks, i)}>
                    <span>{openFrameworks.has(i) ? "Hide details" : "View details"}</span>
                    {chevronSvg(openFrameworks.has(i))}
                  </button>
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

      {/* Parallax Quote 2 with Image */}
      <div className="parallax-panel aam-parallax-img-panel">
        <div className="aam-parallax-bg" style={{ backgroundImage: `url(${HIGHWAY_AERIAL_IMG})` }} />
        <div className="aam-parallax-overlay" />
        <p className="parallax-text" style={{ position: 'relative', zIndex: 2 }}>
Serving FAA, NASA, FHWA, AAAE, and AASHTO to guide the <em>future</em> of aviation</p>
      </div>

      {/* ── Interactive Stakeholder Ecosystem ── */}
      <section className="aam-section aam-ecosystem-section" id="stakeholders">
        <div className="aam-container">
          <div className="eco-layout">
            {/* Left: text */}
            <div className="eco-layout-text">
              <div className="aam-section-header">
                <p className="section-label"><span className="gold-text">who we partner with</span></p>
                <h2 className="section-title">Stakeholders We <em>Engage</em></h2>
                <p className="aam-section-lead" style={{ marginTop: '20px' }}>
                  We engage multiple stakeholders in the public and private sectors across AAM and UAS to align policy, regulation, operations, and technology; integrate systems and infrastructure; implement/deploy and scale services.
                </p>
                <p className="aam-section-lead" style={{ marginTop: '12px', opacity: 0.5, fontSize: '14px' }}>
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
                  <circle cx="400" cy="400" r="80" fill="url(#centerGrad)" />
                  <circle cx="400" cy="400" r="52" fill="none" stroke="#c9a84c" strokeWidth="1" className="eco-center-pulse" opacity="0.2" />

                  {/* Center hub */}
                  <circle cx="400" cy="400" r="48" fill="rgba(6,12,22,0.9)" stroke="#c9a84c" strokeWidth="1.5" filter="url(#goldGlow)" />
                  <text x="400" y="388" textAnchor="middle" fill="url(#titleGoldGrad)" fontFamily="'DM Sans', sans-serif" fontSize="9" fontWeight="700" letterSpacing="3" style={{ textTransform: 'uppercase' }}>RAWLINS</text>
                  <text x="400" y="404" textAnchor="middle" fill="url(#titleGoldGrad)" fontFamily="'DM Sans', sans-serif" fontSize="8" fontWeight="600" letterSpacing="2" style={{ textTransform: 'uppercase' }}>AERO</text>
                  <text x="400" y="418" textAnchor="middle" fill="rgba(232,230,225,0.5)" fontFamily="'DM Sans', sans-serif" fontSize="7" fontWeight="500" letterSpacing="2" style={{ textTransform: 'uppercase' }}>TEAM</text>

                  {/* Stakeholder nodes — icons only, no circles */}
                  {ecosystemNodes.map((node) => {
                    const rad = (node.angle * Math.PI) / 180;
                    const nx = 400 + Math.cos(rad) * 280;
                    const ny = 400 + Math.sin(rad) * 280;
                    const isActive = activeNode === node.id;
                    const isHovered = hoveredNode === node.id;
                    const highlighted = isActive || isHovered;

                    return (
                      <g key={node.id} style={{ cursor: 'none' }} onClick={() => setActiveNode(activeNode === node.id ? null : node.id)} onMouseEnter={() => setHoveredNode(node.id)} onMouseLeave={() => setHoveredNode(null)}>
                        {/* Transparent hit area */}
                        <circle cx={nx} cy={ny} r="40" fill="transparent" />
                        {/* Icon */}
                        <text x={nx} y={ny} textAnchor="middle" dominantBaseline="middle" fill={highlighted ? "#e8d5a0" : "rgba(201,168,76,0.7)"} fontSize={highlighted ? "28" : "22"} style={{ transition: 'all 0.3s', filter: highlighted ? 'drop-shadow(0 0 8px rgba(201,168,76,0.5))' : 'none' }}>
                          {node.icon}
                        </text>
                        {/* Label below icon */}
                        {node.label.split('\n').map((line, li) => (
                          <text key={li} x={nx} y={ny + 34 + li * 14} textAnchor="middle" fill={highlighted ? "#e8d5a0" : "rgba(232,230,225,0.6)"} fontFamily="'DM Sans', sans-serif" fontSize={highlighted ? "10" : "9"} fontWeight={highlighted ? "600" : "500"} letterSpacing="1.2" style={{ textTransform: 'uppercase', transition: 'all 0.3s' }}>
                            {line}
                          </text>
                        ))}
                        {highlighted && (
                          <text x={nx} y={ny + 68} textAnchor="middle" fill="rgba(201,168,76,0.6)" fontFamily="'DM Sans', sans-serif" fontSize="8" letterSpacing="0.5">{node.short}</text>
                        )}
                      </g>
                    );
                  })}

                  {/* Particles */}
                  {ecosystemNodes.map((node, i) => {
                    const rad = (node.angle * Math.PI) / 180;
                    return (
                      <circle key={`particle-${i}`} r="2" fill="#c9a84c" className="eco-data-particle" style={{ animationDelay: `${i * 0.5}s` }}>
                        <animateMotion dur={`${3 + i * 0.3}s`} repeatCount="indefinite"><mpath href={`#path-${i}`} /></animateMotion>
                      </circle>
                    );
                  })}
                  {ecosystemNodes.map((node, i) => {
                    const rad = (node.angle * Math.PI) / 180;
                    const nx = 400 + Math.cos(rad) * 280;
                    const ny = 400 + Math.sin(rad) * 280;
                    return <path key={`path-${i}`} id={`path-${i}`} d={`M400,400 L${nx},${ny}`} fill="none" stroke="none" />;
                  })}
                </svg>

                {/* Detail panel — positioned near clicked node */}
                {activeNode && (() => {
                  const node = ecosystemNodes.find(n => n.id === activeNode);
                  if (!node) return null;
                  const rad = (node.angle * Math.PI) / 180;
                  const pctX = 50 + Math.cos(rad) * 35;
                  const pctY = 50 + Math.sin(rad) * 35;
                  const panelLeft = pctX < 30 ? '0%' : pctX > 70 ? 'auto' : `${pctX}%`;
                  const panelRight = pctX > 70 ? '0%' : 'auto';
                  const panelTop = pctY < 30 ? '0%' : `${Math.min(pctY, 65)}%`;
                  const panelTransform = pctX >= 30 && pctX <= 70 ? 'translateX(-50%)' : 'none';
                  return (
                    <div className="eco-detail-panel" style={{ left: panelLeft, right: panelRight, top: panelTop, bottom: 'auto', transform: panelTransform }}>
                      <div className="eco-detail-header">
                        <span className="eco-detail-icon">{node.icon}</span>
                        <div>
                          <h4 className="eco-detail-title">{node.label.replace('\n', ' ')}</h4>
                          <p className="eco-detail-short">{node.short}</p>
                        </div>
                        <button className="eco-detail-close" onClick={() => setActiveNode(null)}>
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 6L6 18M6 6l12 12" /></svg>
                        </button>
                      </div>
                      <p className="eco-detail-desc">{node.desc}</p>
                    </div>
                  );
                })()}
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="section-divider"><div className="gold-line" /></div>

      {/* ── Service Portfolio: Card Tiles (same style as Value Delivery) ── */}
      <section className="aam-section aam-portfolio-section" id="portfolio">
        <div className="aam-container">
          <div className="aam-section-header">
            <p className="section-label"><span className="gold-text">Services</span></p>
            <h2 className="section-title">Our Service <em>Portfolio</em></h2>
          </div>
          <div className="aam-pillars-grid aam-portfolio-tiles">
            {[
              { title: "AAM Services", img: DRONE_IMG, items: aamServices, idx: 0 },
              { title: "UAS Services", img: DRONE_FLIGHT_IMG, items: uasServices, idx: 1 },
            ].map((svc) => (
              <div className={`aam-pillar-card${openServices.has(svc.idx) ? " open" : ""}`} key={svc.title}>
                <div className="aam-pillar-img-wrap">
                  <img src={svc.img} alt={svc.title} className="aam-pillar-img" loading="lazy" />
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

      {/* ── CTA with Background ── */}
      <section className="aam-section aam-cta-section">
        <div className="aam-cta-bg" style={{ backgroundImage: `url(${HELICOPTER_IMG})` }} />
        <div className="aam-cta-overlay" />
        <div className="aam-container" style={{ position: 'relative', zIndex: 2 }}>
          <div className="aam-cta-wrap" style={{ textAlign: "center", margin: "0 auto" }}>
            <p className="section-label"><span className="gold-text">Get Started</span></p>
            <h2 className="section-title">Ready to <em>Transform</em> Your Region?</h2>
            <p className="aam-cta-body">
              Partner with Rawlins to unlock the potential of Advanced Air Mobility and UAS technology. Our experts are ready to guide your community toward innovation, resilience, and growth.
            </p>
            <Link href="/contact" className="hero-cta-btn" style={{ marginTop: "40px", display: "inline-block" }}>
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
