'use client';

import React, { useRef, useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import SiteNav from '@/components/site-nav';
import SiteFooter from '@/components/site-footer';

const DRONE_IMG = "/images/pages/aam-drone.jpg";
const CITY_AERIAL_IMG = "/images/pages/aam-city-aerial.jpg";
const INFRASTRUCTURE_IMG = "/images/pages/aam-infrastructure.jpg";
const TECH_NETWORK_IMG = "/images/pages/aam-tech-network.jpg";
const LOGISTICS_IMG = "/images/pages/aam-logistics.jpg";
const PLANNING_IMG = "/images/pages/aam-planning.jpg";
const SKYLINE_IMG = "/images/pages/aam-skyline.jpg";
const AERIAL_VIEW_IMG = "/images/pages/aam-aerial-view.jpg";
const HELICOPTER_IMG = "/images/pages/aam-helicopter.jpg";
const CONTROL_ROOM_IMG = "/images/pages/aam-control-room.jpg";
const DRONE_FLIGHT_IMG = "/images/pages/skylimit.webp";
const BLUEPRINT_IMG = "/images/pages/aam-blueprint.jpg";
const DATA_CENTER_IMG = "/images/pages/aam-data-center.jpg";
const HIGHWAY_AERIAL_IMG = "/images/pages/aam-highway-aerial.jpg";
const TEAM_MEETING_IMG = "/images/pages/aam-team-meeting.jpg";
const DEFINE_IMG = "/images/pages/connectingdots.webp";
const PLANNING2_IMG = "/images/pages/proficiency-1.webp";
const DRONEMOUNTAINS_IMG = "/images/pages/aam-drone-mountains.jpg";


/* ──── Data ──── */

const pillarCards = [
  {
    title: "Advanced Air Mobility",
    desc: "",
    bullets: ["Urban & Regional Connectivity", "Workforce Mobility", "Emergency Medical Transport", "Tourism & Sightseeing"],
    img: CITY_AERIAL_IMG,
    imgPos: "center 25%",
  },
  {
    title: "Drone Package Delivery",
    desc: "",
    bullets: ["Urban Air Mobility", "Regional Air Mobility", "Multi-modal Facilities", "Cargo Transport", "Emergency Medical Transport", "Business Travel", "Tourism & Sightseeing"],
    img: LOGISTICS_IMG,
    imgPos: "center 30%",
  },
  {
    title: "UAS Data Collection",
    desc: "",
    bullets: ["Infrastructure Inspection", "Construction Inspection & Monitoring", "Environmental Monitoring", "Aerial Surveying & Mapping", "Disaster Response", "Incident Scene Management"],
    img: DRONE_FLIGHT_IMG,
    imgPos: "",
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

/* ──── Landscape Visualization Data ──── */
const lsIcons: Record<string, string> = {
  helicopter: '<g transform="scale(0.9) translate(2,2)"><path d="M4 12h3l2-4h6l2 4h3" stroke="currentColor" stroke-width="1.5" fill="none"/><circle cx="12" cy="12" r="2.5" fill="currentColor" opacity="0.8"/><line x1="3" y1="8" x2="21" y2="8" stroke="currentColor" stroke-width="1" opacity="0.6"/><line x1="12" y1="8" x2="12" y2="9.5" stroke="currentColor" stroke-width="1"/><line x1="10" y1="14.5" x2="8" y2="18" stroke="currentColor" stroke-width="1"/><line x1="14" y1="14.5" x2="16" y2="18" stroke="currentColor" stroke-width="1"/></g>',
  package: '<g><rect x="5" y="8" width="14" height="12" rx="1" stroke="currentColor" stroke-width="1.5" fill="none"/><line x1="5" y1="13" x2="19" y2="13" stroke="currentColor" stroke-width="1" opacity="0.5"/><line x1="12" y1="8" x2="12" y2="20" stroke="currentColor" stroke-width="1" opacity="0.5"/><path d="M8 4L12 2L16 4" stroke="currentColor" stroke-width="1.5" fill="none"/><line x1="12" y1="2" x2="12" y2="8" stroke="currentColor" stroke-width="1"/></g>',
  residential: '<g><path d="M3 12L12 4l9 8" stroke="currentColor" stroke-width="1.5" fill="none"/><rect x="6" y="12" width="12" height="8" stroke="currentColor" stroke-width="1.2" fill="none"/><rect x="10" y="15" width="4" height="5" stroke="currentColor" stroke-width="1" fill="none"/></g>',
  medical: '<g><rect x="4" y="4" width="16" height="16" rx="3" stroke="currentColor" stroke-width="1.5" fill="none"/><line x1="12" y1="8" x2="12" y2="16" stroke="currentColor" stroke-width="2.5"/><line x1="8" y1="12" x2="16" y2="12" stroke="currentColor" stroke-width="2.5"/></g>',
  rural: '<g><path d="M2 20L12 6l10 14" stroke="currentColor" stroke-width="1.2" fill="none"/><line x1="18" y1="20" x2="18" y2="10" stroke="currentColor" stroke-width="1.2"/><line x1="16" y1="12" x2="20" y2="12" stroke="currentColor" stroke-width="1"/><circle cx="8" cy="16" r="1" fill="currentColor" opacity="0.5"/></g>',
  city: '<g><rect x="2" y="10" width="5" height="11" stroke="currentColor" stroke-width="1" fill="none"/><rect x="8" y="4" width="5" height="17" stroke="currentColor" stroke-width="1" fill="none"/><rect x="14" y="7" width="5" height="14" stroke="currentColor" stroke-width="1" fill="none"/><rect x="20" y="12" width="3" height="9" stroke="currentColor" stroke-width="0.8" fill="none"/></g>',
};

const landscapeNodes = [
  { id: 'urban-air-taxi', label: 'Urban Air Taxi', x: 15, y: 8, icon: 'helicopter', desc: 'Electric vertical takeoff and landing (eVTOL) aircraft providing on-demand urban and regional passenger transport.' },
  { id: 'package-delivery', label: 'Package Delivery', x: 10, y: 52, icon: 'package', desc: 'Automated drone logistics for last-mile and middle-mile package delivery across urban and suburban areas.' },
  { id: 'residential', label: 'Residential Areas', x: 44, y: 5, icon: 'residential', desc: 'Suburban and residential communities served by drone delivery, air taxi connections, and emergency response UAS.' },
  { id: 'medical', label: 'Medical Supplies', x: 38, y: 40, icon: 'medical', desc: 'Time-critical medical supply delivery including lab samples, medications, vaccines, and emergency equipment.' },
  { id: 'rural', label: 'Rural & Agriculture', x: 72, y: 5, icon: 'rural', desc: 'Agricultural monitoring, crop spraying, rural delivery services, and environmental data collection for remote areas.' },
  { id: 'city-center', label: 'City Center', x: 58, y: 40, icon: 'city', desc: 'Dense urban cores integrating vertiport networks, drone corridors, and multimodal transit connections.' },
];

const landscapePaths = [
  // Urban Air Taxi → Medical, Residential, Rural
  { from: 'urban-air-taxi', to: 'medical', color: '#c9a84c', type: 'air-taxi' },
  { from: 'urban-air-taxi', to: 'residential', color: '#c9a84c', type: 'air-taxi' },
  { from: 'urban-air-taxi', to: 'rural', color: '#c9a84c', type: 'air-taxi' },
  // Residential → Rural, City Center
  { from: 'residential', to: 'rural', color: '#c9a84c', type: 'air-taxi' },
  { from: 'residential', to: 'city-center', color: '#c9a84c', type: 'air-taxi' },
  // Rural → Medical
  { from: 'rural', to: 'medical', color: '#d4443b', type: 'medical' },
  // Package Delivery → Medical, Residential, Rural
  { from: 'package-delivery', to: 'medical', color: '#e8d5a0', type: 'delivery' },
  { from: 'package-delivery', to: 'residential', color: '#e8d5a0', type: 'delivery' },
  { from: 'package-delivery', to: 'rural', color: '#e8d5a0', type: 'delivery' },
  // Medical → Residential, Rural
  { from: 'medical', to: 'residential', color: '#d4443b', type: 'medical' },
  { from: 'medical', to: 'rural', color: '#d4443b', type: 'medical' },
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
  { id: 'industry', label: 'Industries', short: 'OEMs · Tech · Integrators', desc: 'Aircraft manufacturers, technology providers, and systems integrators building the AAM ecosystem.', angle: 270 },
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
  const [hoveredLs, setHoveredLs] = useState<string | null>(null);

  // Phases horizontal scroll
  const [phasesProgress, setPhasesProgress] = useState(0);
  const phasesTrackRef = useRef<HTMLDivElement>(null);

  const onPhasesScroll = () => {
    const el = phasesTrackRef.current;
    if (!el) return;
    const max = el.scrollWidth - el.clientWidth;
    setPhasesProgress(max > 0 ? el.scrollLeft / max : 0);
  };
  const phasesScrollPrev = () => {
    const track = phasesTrackRef.current; if (!track) return;
    const card = track.querySelector('.aam-alt-card') as HTMLElement;
    const w = card ? card.offsetWidth + 24 : 420;
    track.scrollBy({ left: -w, behavior: "smooth" });
  };
  const phasesScrollNext = () => {
    const track = phasesTrackRef.current; if (!track) return;
    const card = track.querySelector('.aam-alt-card') as HTMLElement;
    const w = card ? card.offsetWidth + 24 : 420;
    track.scrollBy({ left: w, behavior: "smooth" });
  };

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
          <a href="#intro" className="auto-hero-btn"><span>Explore Our Approach</span></a>
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
              {/* Landscape info panel */}
              {hoveredLs && (() => {
                const node = landscapeNodes.find(n => n.id === hoveredLs);
                if (!node) return null;
                const isMed = node.id === 'medical';
                return (
                  <div className="ls-info-panel">
                    <div className="ls-info-header">
                      <div className="ls-info-icon" style={isMed ? { borderColor: 'rgba(212,68,59,0.3)', background: 'rgba(212,68,59,0.08)' } : undefined}>
                        <svg width="20" height="20" viewBox="0 0 24 24" style={{ color: isMed ? '#d4443b' : '#c9a84c' }} dangerouslySetInnerHTML={{ __html: lsIcons[node.icon] }} />
                      </div>
                      <span className="ls-info-title">{node.label}</span>
                    </div>
                    <p className="ls-info-desc">{node.desc}</p>
                  </div>
                );
              })()}
              <p className="aam-section-lead" style={{ fontStyle: 'italic', marginTop: 16, opacity: 0.6 }}>
                Hover over any location to explore.
              </p>
              </div>
            </div>
            <div className="aam-overview-right reveal rd1">
              <div className="ls-vis-wrapper">
                <svg viewBox="0 -60 1000 660" xmlns="http://www.w3.org/2000/svg" style={{ display: 'block', width: '100%', height: 'auto' }}>
                  <defs>
                    <linearGradient id="lsGoldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#c9a84c" />
                      <stop offset="50%" stopColor="#e8d5a0" />
                      <stop offset="100%" stopColor="#c9a84c" />
                    </linearGradient>
                    <radialGradient id="lsNodeGlow" cx="50%" cy="50%" r="50%">
                      <stop offset="0%" stopColor="#c9a84c" stopOpacity="0.4" />
                      <stop offset="100%" stopColor="#c9a84c" stopOpacity="0" />
                    </radialGradient>
                    <filter id="lsGlow" x="-50%" y="-50%" width="200%" height="200%">
                      <feGaussianBlur in="SourceAlpha" stdDeviation="6" result="blur" />
                      <feFlood floodColor="#c9a84c" floodOpacity="0.5" result="color" />
                      <feComposite in="color" in2="blur" operator="in" result="shadow" />
                      <feMerge><feMergeNode in="shadow" /><feMergeNode in="SourceGraphic" /></feMerge>
                    </filter>
                    <filter id="lsGlowMed" x="-50%" y="-50%" width="200%" height="200%">
                      <feGaussianBlur in="SourceAlpha" stdDeviation="5" result="blur" />
                      <feFlood floodColor="#d4443b" floodOpacity="0.5" result="color" />
                      <feComposite in="color" in2="blur" operator="in" result="shadow" />
                      <feMerge><feMergeNode in="shadow" /><feMergeNode in="SourceGraphic" /></feMerge>
                    </filter>
                    <style>{`
                      .ls-flight-path { stroke-dasharray: 8 12; animation: lsDash 4s linear infinite; }
                      .ls-flight-path-med { stroke-dasharray: 6 10; animation: lsDash 3s linear infinite; }
                      .ls-flight-path-reverse { stroke-dasharray: 8 12; animation: lsDashReverse 4s linear infinite; }
                      .ls-particle { animation: lsParticle 3s linear infinite; opacity: 0; }
                      .ls-node-pulse { animation: lsNodePulse 4s ease-in-out infinite; }
                      @keyframes lsDash { to { stroke-dashoffset: -60; } }
                      @keyframes lsDashReverse { to { stroke-dashoffset: 60; } }
                      @keyframes lsParticle { 0% { opacity: 0; } 10% { opacity: 1; } 90% { opacity: 1; } 100% { opacity: 0; } }
                      @keyframes lsNodePulse { 0%,100% { r: 32; opacity: 0.12; } 50% { r: 40; opacity: 0.25; } }
                    `}</style>
                  </defs>

                  {/* Grid */}
                  <g opacity="0.04">
                    {Array.from({ length: 21 }, (_, i) => (
                      <React.Fragment key={`lsg-${i}`}>
                        <line x1={i * 50} y1="0" x2={i * 50} y2="600" stroke="#c9a84c" strokeWidth="0.5" />
                        <line x1="0" y1={i * 30} x2="1000" y2={i * 30} stroke="#c9a84c" strokeWidth="0.5" />
                      </React.Fragment>
                    ))}
                  </g>


                  {/* ── SCENE: Building silhouettes (full opacity) ── */}
                  {/* Airport: eVTOL left, icon right, hangar/tower/plane below */}
                  <g opacity={hoveredLs === 'urban-air-taxi' ? 1 : 0.85} style={{ transition: 'opacity 0.3s' }}>
                    {/* eVTOL Air Taxi drone — to the left of icon */}
                    <g transform="translate(60,48)">
                      <ellipse cx="0" cy="5" rx="18" ry="12" fill="#c0bcb6" />
                      <line x1="-18" y1="0" x2="-34" y2="-8" stroke="#c0bcb6" strokeWidth="2.5" />
                      <line x1="18" y1="0" x2="34" y2="-8" stroke="#c0bcb6" strokeWidth="2.5" />
                      <ellipse cx="-34" cy="-10" rx="14" ry="4" fill="none" stroke="#aaa6a0" strokeWidth="1.2" />
                      <ellipse cx="34" cy="-10" rx="14" ry="4" fill="none" stroke="#aaa6a0" strokeWidth="1.2" />
                      <line x1="-12" y1="16" x2="-16" y2="22" stroke="#aaa6a0" strokeWidth="1.5" />
                      <line x1="12" y1="16" x2="16" y2="22" stroke="#aaa6a0" strokeWidth="1.5" />
                      <line x1="-20" y1="22" x2="20" y2="22" stroke="#9e9a94" strokeWidth="1.5" />
                      <circle cx="0" cy="-2" r="4" fill="#c9a84c" />
                      <path d="M-6 14 L-4 5 L4 5 L6 14Z" fill="rgba(201,168,76,0.8)" />
                    </g>
                    {/* Hangar — moved down */}
                    <path d="M20 230 Q20 190 110 178 Q200 190 200 230 L200 260 L20 260Z" fill="#b8b4ae" stroke="#ccc8c2" strokeWidth="1" />
                    <rect x="38" y="208" width="140" height="52" fill="#9e9a94" stroke="#b8b4ae" strokeWidth="0.5" />
                    <rect x="55" y="218" width="28" height="14" fill="#87837d" />
                    <rect x="95" y="218" width="28" height="14" fill="#87837d" />
                    <rect x="135" y="218" width="28" height="14" fill="#87837d" />
                    <rect x="72" y="240" width="14" height="20" fill="#7a766f" />
                    <rect x="92" y="240" width="14" height="20" fill="#7a766f" />
                    <rect x="112" y="240" width="14" height="20" fill="#7a766f" />
                    {/* Tower — moved down */}
                    <rect x="222" y="175" width="16" height="85" fill="#c0bcb6" />
                    <rect x="214" y="160" width="32" height="20" rx="3" fill="#ccc8c2" stroke="#d8d4ce" strokeWidth="0.8" />
                    <rect x="218" y="165" width="6" height="10" fill="#7eb8d0" />
                    <rect x="226" y="165" width="6" height="10" fill="#7eb8d0" />
                    <rect x="234" y="165" width="6" height="10" fill="#7eb8d0" />
                    <rect x="208" y="230" width="50" height="30" fill="#a8a49e" />
                    {/* Airplane — moved down */}
                    <g transform="translate(160,140) rotate(-10)">
                      <ellipse cx="30" cy="8" rx="32" ry="6" fill="#ccc8c2" />
                      <path d="M18 8 L28 -14 L36 -12 L26 8Z" fill="#b8b4ae" />
                      <path d="M18 8 L28 30 L36 28 L26 8Z" fill="#b8b4ae" />
                      <path d="M-2 8 L2 -5 L9 -3 L5 8Z" fill="#aaa6a0" />
                      <ellipse cx="58" cy="8" rx="6" ry="4" fill="#7eb8d0" />
                    </g>
                  </g>

                  {/* Warehouse + Delivery Drone (drone to LEFT of icon) */}
                  <g opacity={hoveredLs === 'package-delivery' ? 1 : 0.85} style={{ transition: 'opacity 0.3s' }}>
                    <rect x="40" y="380" width="170" height="85" fill="#b0aca6" />
                    <rect x="40" y="365" width="170" height="20" fill="#a8a49e" />
                    <rect x="70" y="420" width="28" height="45" fill="#87837d" />
                    <rect x="108" y="420" width="28" height="45" fill="#87837d" />
                    <rect x="146" y="420" width="28" height="45" fill="#87837d" />
                    {/* Delivery drone — to the LEFT of icon */}
                    <g transform="translate(30,295)">
                      <ellipse cx="0" cy="0" rx="16" ry="7" fill="#ccc8c2" />
                      <line x1="-16" y1="0" x2="-30" y2="-7" stroke="#c0bcb6" strokeWidth="2.5" />
                      <line x1="16" y1="0" x2="30" y2="-7" stroke="#c0bcb6" strokeWidth="2.5" />
                      <ellipse cx="-30" cy="-9" rx="12" ry="3.5" fill="none" stroke="#aaa6a0" strokeWidth="1.2" />
                      <ellipse cx="30" cy="-9" rx="12" ry="3.5" fill="none" stroke="#aaa6a0" strokeWidth="1.2" />
                      <line x1="-9" y1="7" x2="-14" y2="16" stroke="#aaa6a0" strokeWidth="1.5" />
                      <line x1="9" y1="7" x2="14" y2="16" stroke="#aaa6a0" strokeWidth="1.5" />
                      <line x1="0" y1="7" x2="0" y2="18" stroke="#c9a84c" strokeWidth="1" />
                      <rect x="-9" y="18" width="18" height="16" rx="2" fill="#c9a84c" stroke="#dab84c" strokeWidth="1" />
                      <line x1="0" y1="18" x2="0" y2="34" stroke="rgba(201,168,76,0.5)" strokeWidth="0.8" />
                      <line x1="-9" y1="26" x2="9" y2="26" stroke="rgba(201,168,76,0.5)" strokeWidth="0.8" />
                    </g>
                  </g>

                  {/* Suburban houses */}
                  <g opacity={hoveredLs === 'residential' ? 1 : 0.85} style={{ transition: 'opacity 0.3s' }}>
                    <rect x="360" y="105" width="38" height="28" fill="#b8b4ae" />
                    <path d="M354 105 L379 82 L404 105Z" fill="#ada9a3" />
                    <rect x="371" y="116" width="10" height="17" fill="#8a8680" />
                    <rect x="410" y="92" width="50" height="41" fill="#c0bcb6" />
                    <path d="M404 92 L435 65 L466 92Z" fill="#b0aca6" />
                    <rect x="428" y="116" width="13" height="17" fill="#8a8680" />
                    <rect x="415" y="100" width="9" height="9" fill="#7eb8d0" />
                    <rect x="470" y="88" width="55" height="45" fill="#bcb8b2" />
                    <path d="M464 88 L497 60 L531 88Z" fill="#ada9a3" />
                    <rect x="476" y="96" width="9" height="9" fill="#7eb8d0" />
                    <rect x="490" y="96" width="9" height="9" fill="#7eb8d0" />
                    <rect x="506" y="96" width="9" height="9" fill="#7eb8d0" />
                    <rect x="492" y="116" width="12" height="17" fill="#8a8680" />
                    <circle cx="403" cy="118" r="10" fill="#5a945a" />
                    <circle cx="465" cy="120" r="8" fill="#4f8a4f" />
                    <circle cx="535" cy="118" r="11" fill="#558e55" />
                    <line x1="350" y1="133" x2="550" y2="133" stroke="rgba(232,230,225,0.4)" strokeWidth="1" />
                  </g>

                  {/* City skyline — moved left */}
                  <g opacity={hoveredLs === 'city-center' ? 1 : 0.85} style={{ transition: 'opacity 0.3s' }}>
                    <rect x="650" y="280" width="32" height="120" fill="#b8b4ae" />
                    <rect x="687" y="258" width="28" height="142" fill="#b0aca6" />
                    <rect x="720" y="300" width="22" height="100" fill="#a8a49e" />
                    <rect x="747" y="240" width="38" height="160" fill="#c0bcb6" />
                    <rect x="790" y="280" width="24" height="120" fill="#aca8a2" />
                    <rect x="819" y="310" width="20" height="90" fill="#9e9a94" />
                    <rect x="655" y="290" width="6" height="6" fill="#c9a84c" />
                    <rect x="663" y="290" width="6" height="6" fill="#c9a84c" />
                    <rect x="655" y="302" width="6" height="6" fill="#c9a84c" />
                    <rect x="752" y="250" width="7" height="7" fill="rgba(201,168,76,0.6)" />
                    <rect x="763" y="250" width="7" height="7" fill="rgba(201,168,76,0.6)" />
                    <rect x="752" y="266" width="7" height="7" fill="rgba(201,168,76,0.6)" />
                    <rect x="763" y="266" width="7" height="7" fill="rgba(201,168,76,0.6)" />
                    <rect x="752" y="282" width="7" height="7" fill="rgba(201,168,76,0.6)" />
                    <rect x="844" y="280" width="48" height="120" fill="#c2872e" rx="2" />
                    <rect x="850" y="290" width="9" height="9" fill="rgba(0,0,0,0.4)" />
                    <rect x="865" y="290" width="9" height="9" fill="rgba(0,0,0,0.4)" />
                    <rect x="850" y="306" width="9" height="9" fill="rgba(0,0,0,0.4)" />
                    <rect x="865" y="306" width="9" height="9" fill="rgba(0,0,0,0.4)" />
                    <rect x="850" y="322" width="9" height="9" fill="rgba(0,0,0,0.4)" />
                    <rect x="865" y="322" width="9" height="9" fill="rgba(0,0,0,0.4)" />
                  </g>

                  {/* Medical building (hospital) + Medical Drone w/ heart — more right */}
                  <g opacity={hoveredLs === 'medical' ? 1 : 0.85} style={{ transition: 'opacity 0.3s' }}>
                    {/* Hospital building — down and to the right */}
                    <rect x="390" y="340" width="90" height="80" fill="#b8b4ae" />
                    <rect x="390" y="330" width="90" height="14" fill="#c0bcb6" />
                    <rect x="420" y="312" width="30" height="22" rx="3" fill="#d4443b" />
                    <rect x="431" y="316" width="8" height="14" fill="#fff" />
                    <rect x="424" y="321" width="22" height="4" fill="#fff" />
                    {/* Windows */}
                    <rect x="398" y="348" width="10" height="10" fill="#7eb8d0" />
                    <rect x="414" y="348" width="10" height="10" fill="#7eb8d0" />
                    <rect x="430" y="348" width="10" height="10" fill="#7eb8d0" />
                    <rect x="446" y="348" width="10" height="10" fill="#7eb8d0" />
                    <rect x="462" y="348" width="10" height="10" fill="#7eb8d0" />
                    <rect x="398" y="370" width="10" height="10" fill="#7eb8d0" />
                    <rect x="414" y="370" width="10" height="10" fill="#7eb8d0" />
                    <rect x="430" y="370" width="10" height="10" fill="#7eb8d0" />
                    <rect x="446" y="370" width="10" height="10" fill="#7eb8d0" />
                    <rect x="462" y="370" width="10" height="10" fill="#7eb8d0" />
                    {/* Entrance */}
                    <rect x="422" y="390" width="26" height="30" fill="#8a8680" />
                    {/* Medical drone w/ heart — further right of icon */}
                    <g transform="translate(490,230)">
                      <ellipse cx="0" cy="0" rx="16" ry="7" fill="#ccc8c2" />
                      <line x1="-16" y1="0" x2="-30" y2="-7" stroke="#c0bcb6" strokeWidth="2.5" />
                      <line x1="16" y1="0" x2="30" y2="-7" stroke="#c0bcb6" strokeWidth="2.5" />
                      <ellipse cx="-30" cy="-9" rx="12" ry="3.5" fill="none" stroke="#aaa6a0" strokeWidth="1.2" />
                      <ellipse cx="30" cy="-9" rx="12" ry="3.5" fill="none" stroke="#aaa6a0" strokeWidth="1.2" />
                      <line x1="-9" y1="7" x2="-14" y2="16" stroke="#aaa6a0" strokeWidth="1.5" />
                      <line x1="9" y1="7" x2="14" y2="16" stroke="#aaa6a0" strokeWidth="1.5" />
                      <g transform="translate(0,24)">
                        <path d="M0 4 C0 -3 -10 -5 -10 2 C-10 7 0 14 0 14 C0 14 10 7 10 2 C10 -5 0 -3 0 4Z" fill="#d4443b" stroke="#e04e47" strokeWidth="1" />
                        <path d="M-6 5 L-3 5 L0 0 L3 10 L5 5 L7 5" fill="none" stroke="#fff" strokeWidth="1.2" />
                      </g>
                    </g>
                  </g>

                  {/* Rural farm */}
                  <g opacity={hoveredLs === 'rural' ? 1 : 0.85} style={{ transition: 'opacity 0.3s' }}>
                    <rect x="680" y="85" width="55" height="45" fill="#bcb8b2" />
                    <path d="M674 85 L707 58 L741 85Z" fill="#b09870" />
                    <rect x="698" y="106" width="16" height="24" fill="#8a8680" />
                    <rect x="745" y="68" width="20" height="62" rx="5" fill="#b8b4ae" />
                    <ellipse cx="755" cy="68" rx="10" ry="6" fill="#ada9a3" />
                    <line x1="785" y1="62" x2="785" y2="130" stroke="#c0bcb6" strokeWidth="2.5" />
                    <g transform="translate(785,62)">
                      <line x1="0" y1="0" x2="-16" y2="-20" stroke="#b8b4ae" strokeWidth="2" />
                      <line x1="0" y1="0" x2="20" y2="-12" stroke="#b8b4ae" strokeWidth="2" />
                      <line x1="0" y1="0" x2="10" y2="20" stroke="#b8b4ae" strokeWidth="2" />
                      <line x1="0" y1="0" x2="-20" y2="10" stroke="#b8b4ae" strokeWidth="2" />
                    </g>
                    <path d="M660 110 L670 75 L680 110Z" fill="#5a945a" />
                    <path d="M648 115 L655 88 L662 115Z" fill="#4f8a4f" />
                    <circle cx="810" cy="112" r="10" fill="#558e55" />
                    <circle cx="828" cy="116" r="7" fill="#4f8a4f" />
                    <line x1="645" y1="130" x2="840" y2="130" stroke="rgba(232,230,225,0.35)" strokeWidth="1" />
                  </g>


                  {/* ── FLIGHT PATHS ── */}
                  {landscapePaths.map((fp, i) => {
                    const from = landscapeNodes.find(n => n.id === fp.from)!;
                    const to = landscapeNodes.find(n => n.id === fp.to)!;
                    const x1 = from.x * 10, y1 = from.y * 6;
                    const x2 = to.x * 10, y2 = to.y * 6;
                    let d: string;
                    // Special case: urban-air-taxi → rural — arc ABOVE residential
                    if (fp.from === 'urban-air-taxi' && fp.to === 'rural') {
                      const mx = (x1 + x2) / 2;
                      d = `M${x1},${y1} Q${mx},-40 ${x2},${y2}`;
                    } else {
                      const mx = (x1 + x2) / 2;
                      const dx = x2 - x1, dy = y2 - y1;
                      const my = (y1 + y2) / 2 + dx * 0.15;
                      d = `M${x1},${y1} Q${mx - dy * 0.15},${my} ${x2},${y2}`;
                    }
                    // Only highlight direct connections for the hovered node
                    const hl = hoveredLs === fp.from || hoveredLs === fp.to;
                    const cls = fp.type === 'medical' ? 'ls-flight-path-med' : (i % 2 === 0 ? 'ls-flight-path' : 'ls-flight-path-reverse');
                    return (
                      <React.Fragment key={`lsp-${i}`}>
                        <path d={d} fill="none" stroke={fp.color} strokeWidth={hl ? 2.5 : 1.2} opacity={hl ? 0.85 : 0.3} className={cls} />
                        <path id={`lspath-${i}`} d={d} fill="none" stroke="none" />
                        <circle r={hl ? 4 : 3} fill={fp.color} className="ls-particle" style={{ animationDelay: `${i * 0.4}s`, animationDuration: `${2.5 + (i % 3) * 0.5}s` }}>
                          <animateMotion dur={`${3 + (i % 4) * 0.8}s`} repeatCount="indefinite">
                            <mpath href={`#lspath-${i}`} />
                          </animateMotion>
                        </circle>
                      </React.Fragment>
                    );
                  })}

                  {/* ── Animated drones on some paths ── */}
                  {[0, 2, 5, 7, 10].map(idx => {
                    const fp = landscapePaths[idx];
                    if (!fp) return null;
                    const c = fp.type === 'medical' ? '#d4443b' : '#c9a84c';
                    return (
                      <g key={`drone-${idx}`} opacity="0.8">
                        <g>
                          <animateMotion dur={`${5 + idx * 0.5}s`} repeatCount="indefinite">
                            <mpath href={`#lspath-${idx}`} />
                          </animateMotion>
                          <circle r="5" fill={c} opacity="0.25" />
                          <line x1="-8" y1="0" x2="8" y2="0" stroke={c} strokeWidth="1.2" opacity="0.8" />
                          <line x1="0" y1="-5" x2="0" y2="5" stroke={c} strokeWidth="1.2" opacity="0.8" />
                          <circle r="2" fill={c} opacity="0.9" />
                        </g>
                      </g>
                    );
                  })}

                  {/* ── INTERACTIVE NODES ── */}
                  {landscapeNodes.map((node, ni) => {
                    const nx = node.x * 10;
                    const ny = node.y * 6;
                    const hl = hoveredLs === node.id;
                    const isMed = node.id === 'medical';
                    const sc = isMed && hl ? '#d4443b' : hl ? '#e8d5a0' : 'rgba(201,168,76,0.4)';
                    const flt = hl ? (isMed ? 'url(#lsGlowMed)' : 'url(#lsGlow)') : 'none';
                    return (
                      <g
                        key={node.id}
                        style={{ cursor: 'pointer', transition: 'all 0.3s' }}
                        onMouseEnter={() => setHoveredLs(node.id)}
                        onMouseLeave={() => setHoveredLs(null)}
                      >
                        {/* Pulse ring */}
                        <circle cx={nx} cy={ny} r={32} fill="none" stroke={isMed ? '#d4443b' : '#c9a84c'} strokeWidth="0.8" className="ls-node-pulse" style={{ animationDelay: `${ni * 0.5}s` }} />
                        {/* Glow */}
                        <circle cx={nx} cy={ny} r={hl ? 48 : 36} fill="url(#lsNodeGlow)" opacity={hl ? 1 : 0.6} />
                        {/* Circle bg */}
                        <circle cx={nx} cy={ny} r={26} fill="rgba(6,12,22,0.92)" stroke={sc} strokeWidth={hl ? 2 : 1} />
                        {/* Icon */}
                        <g
                          transform={`translate(${nx - 13},${ny - 13})`}
                          style={{ filter: flt }}
                        >
                          <svg width="26" height="26" viewBox="0 0 24 24">
                            <g dangerouslySetInnerHTML={{ __html: lsIcons[node.icon].replace(/currentColor/g, isMed ? '#d4443b' : 'url(#lsGoldGrad)') }} />
                          </svg>
                        </g>
                        {/* Hit area */}
                        <circle cx={nx} cy={ny} r={45} fill="transparent" />
                      </g>
                    );
                  })}

                  {/* ── LABELS (rendered last = on top of everything) ── */}
                  {landscapeNodes.map((node) => {
                    const nx = node.x * 10;
                    const ny = node.y * 6;
                    const hl = hoveredLs === node.id;
                    let lx = nx, ly = ny + 40, anchor: string = 'middle';
                    if (node.id === 'residential') { ly = 155; }
                    if (node.id === 'rural') { ly = 155; }
                    return (
                      <text
                        key={`label-${node.id}`}
                        x={lx} y={ly}
                        textAnchor={anchor}
                        fill={hl ? '#e8d5a0' : '#ffffff'}
                        fontFamily="'DM Sans', sans-serif"
                        fontSize={hl ? '13' : '12'}
                        fontWeight={hl ? '700' : '600'}
                        letterSpacing="1.5"
                        style={{ textTransform: 'uppercase', pointerEvents: 'none' } as React.CSSProperties}
                      >
                        {node.label}
                      </text>
                    );
                  })}
                </svg>
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
        <div className="aam-parallax-overlay" style={{ background: "rgba(6,12,22,0.8)" }} />
        <p className="parallax-text1 reveal" style={{ position: 'relative', zIndex: 2 }}>
          Strategic multimodal integration<br /><em>Built on experience</em>
        </p>
      </div>

      {/* ── Value Delivery: Pillar Cards ── */}
      <section className="aam-section" id="value">
        <div className="aam-container">
          <div className="aam-section-header reveal">
            <p className="section-label"><span className="gold-text">Value Delivery</span></p>
            <h2 className="section-title">Where we drive <em>impact</em> in aviation</h2>
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
                  <Image src={card.img} alt={card.title} fill sizes="(max-width: 768px) 100vw, 33vw" className="aam-pillar-img" style={card.imgPos ? { objectPosition: card.imgPos } : undefined} />
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

      {/* Parallax Quote 2 */}
      <div
        className="parallax-panel aam-parallax-fixed"
        style={{ backgroundImage: `url(${HIGHWAY_AERIAL_IMG})` }}
      >
        <div className="aam-parallax-overlay" style={{ background: "rgba(6,12,22,0.8)" }} />
        <p className="parallax-text1 reveal" style={{ position: 'relative', zIndex: 2 }}>
          Guiding the <em>future</em> of aviation
        </p>
      </div>

      <div className="section-divider"><div className="gold-line" /></div>

      {/* ── Strategic Methodology: Define / Enable / Deliver ── */}
      <section className="aam-section" id="methodology">
        <div className="aam-container">
          <div className="aam-section-header reveal">
            <h2 className="section-title">Our <em>Approach</em></h2>
            <p className="section-text" style={{ marginTop: "20px" }}>
              By bringing each unique stakeholder to the table we can plan for aviation&rsquo;s future.
            </p>
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
        <div className="aam-alt-scroll-outer" ref={phasesTrackRef} onScroll={onPhasesScroll}>
          <div
            className="aam-alt-scroll-track"
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
        <div className="aam-cta-overlay" style={{ background: "rgba(6,12,22,0.8)" }} />
        <div className="aam-container" style={{ position: 'relative', zIndex: 2 }}>
          <div className="aam-cta-wrap reveal" style={{ textAlign: "center", margin: "0 auto" }}>
            <p className="section-label"><span className="gold-text">Get Started</span></p>
            <h2 className="section-title">Ready to <em>transform</em> your region?</h2>
            <p className="aam-cta-body">
              Whether you are just beginning or well along on your journey, we can provide guidance and support. To learn more about our service portfolio and how we can help you deliver successful AAM and UAS outcomes for your community, reach out.
            </p>
            <Link href="/contact" className="auto-hero-btn" style={{ marginTop: "20px", opacity: 1, transform: "none", animation: "none" }}>
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
