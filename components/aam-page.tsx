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
    title: "AAM (Air Taxis)",
    desc: "",
    bullets: ["Urban mobility", "Business travel", "Emergency medical transport", "Regional Connectivity", "Tourism & sightseeing"],
    img: CITY_AERIAL_IMG,
  },
  {
    title: "AAM Package Delivery",
    desc: "",
    bullets: ["Last-mile delivery", "Medical supply delivery", "Rural & remote delivery", "Inter-community delivery", "Retail & e-commerce support", "Air Taxis (AAM)", "Urban mobility", "Business travel", "Emergency medical transport", "Regional connectivity", "Tourism & sightseeing"],
    img: LOGISTICS_IMG,
  },
  {
    title: "UAS Data Collection",
    desc: "",
    bullets: ["Infrastructure inspection", "Construction inspection & monitoring", "Environmental monitoring", "Aerial surveying & mapping", "Disaster response"],
    img: DRONE_FLIGHT_IMG,
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
              </div>
            </div>
            <div className="aam-overview-right reveal rd1">
              <div className="aam-ops-illustration">
                <svg viewBox="0 0 900 420" xmlns="http://www.w3.org/2000/svg" className="aam-ops-svg">
                  <defs>
                    <linearGradient id="opsGold" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="#c9a84c" />
                      <stop offset="50%" stopColor="#e8d5a0" />
                      <stop offset="100%" stopColor="#c9a84c" />
                    </linearGradient>
                    <linearGradient id="opsRiver" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="rgba(100,140,180,0.3)" />
                      <stop offset="50%" stopColor="rgba(100,140,180,0.5)" />
                      <stop offset="100%" stopColor="rgba(100,140,180,0.3)" />
                    </linearGradient>
                    <style>{`
                      .ops-flight { stroke-dasharray: 6 5; animation: opsFlightDash 12s linear infinite; }
                      @keyframes opsFlightDash { to { stroke-dashoffset: -200; } }
                    `}</style>
                  </defs>

                  {/* Ground line */}
                  <line x1="0" y1="370" x2="900" y2="370" stroke="rgba(201,168,76,0.15)" strokeWidth="1" />

                  {/* ── LEFT: Airport / Urban Area ── */}
                  {/* Stadium / Vertiport */}
                  <ellipse cx="95" cy="260" rx="55" ry="18" fill="rgba(232,230,225,0.9)" />
                  <path d="M40 260 Q40 225 95 220 Q150 225 150 260" fill="rgba(200,195,185,0.85)" stroke="rgba(232,230,225,0.6)" strokeWidth="0.5" />
                  <ellipse cx="95" cy="220" rx="55" ry="14" fill="rgba(180,175,165,0.8)" />
                  <text x="95" y="252" textAnchor="middle" fill="rgba(6,12,22,0.7)" fontSize="8" fontFamily="'DM Sans', sans-serif" fontWeight="600">URBAN AIR TAXI</text>

                  {/* Control tower */}
                  <rect x="165" y="225" width="8" height="45" fill="rgba(180,175,165,0.9)" />
                  <rect x="158" y="218" width="22" height="12" rx="2" fill="rgba(200,195,185,0.9)" stroke="rgba(232,230,225,0.5)" strokeWidth="0.5" />
                  <rect x="161" y="220" width="3" height="6" fill="rgba(140,200,220,0.6)" />
                  <rect x="166" y="220" width="3" height="6" fill="rgba(140,200,220,0.6)" />
                  <rect x="171" y="220" width="3" height="6" fill="rgba(140,200,220,0.6)" />

                  {/* Airplane */}
                  <g transform="translate(130,185) rotate(-15)">
                    <path d="M0 5 L35 0 L40 5 L35 10 Z" fill="rgba(232,230,225,0.85)" />
                    <path d="M12 5 L18 -8 L22 -6 L18 5Z" fill="rgba(232,230,225,0.7)" />
                    <path d="M30 5 L34 -2 L36 -1 L34 5Z" fill="rgba(232,230,225,0.7)" />
                  </g>

                  {/* Helicopter */}
                  <g transform="translate(55,195)">
                    <ellipse cx="12" cy="8" rx="10" ry="6" fill="rgba(232,230,225,0.85)" />
                    <line x1="2" y1="2" x2="22" y2="2" stroke="rgba(200,195,185,0.9)" strokeWidth="1.5" />
                    <line x1="12" y1="2" x2="12" y2="5" stroke="rgba(200,195,185,0.9)" strokeWidth="1" />
                    <path d="M22 8 L32 12 L32 10 L22 8Z" fill="rgba(200,195,185,0.8)" />
                    <line x1="8" y1="14" x2="16" y2="14" stroke="rgba(200,195,185,0.9)" strokeWidth="1" />
                  </g>

                  {/* Warehouse (Package Delivery) */}
                  <rect x="30" y="310" width="80" height="55" fill="rgba(180,175,165,0.9)" />
                  <rect x="30" y="300" width="80" height="15" fill="rgba(160,155,145,0.9)" />
                  <rect x="55" y="340" width="28" height="25" fill="rgba(140,135,125,0.7)" />
                  <text x="70" y="330" textAnchor="middle" fill="#c9a84c" fontSize="9" fontFamily="'DM Sans', sans-serif" fontWeight="700">PACKAGE</text>
                  <text x="70" y="340" textAnchor="middle" fill="#c9a84c" fontSize="9" fontFamily="'DM Sans', sans-serif" fontWeight="700">DELIVERY</text>

                  {/* Road from warehouse */}
                  <path d="M110 340 Q140 340 150 360 Q160 380 200 380" stroke="rgba(100,95,85,0.6)" strokeWidth="12" fill="none" />
                  <path d="M110 340 Q140 340 150 360 Q160 380 200 380" stroke="rgba(201,168,76,0.2)" strokeWidth="1" strokeDasharray="4 4" fill="none" />

                  {/* ── CENTER-TOP: Suburban Homes ── */}
                  {/* House 1 */}
                  <rect x="370" y="155" width="30" height="22" fill="rgba(200,195,185,0.9)" />
                  <path d="M365 155 L385 138 L405 155Z" fill="rgba(160,155,145,0.9)" />
                  <rect x="380" y="162" width="8" height="15" fill="rgba(140,180,160,0.5)" />

                  {/* House 2 */}
                  <rect x="415" y="150" width="35" height="27" fill="rgba(210,205,195,0.9)" />
                  <path d="M410 150 L432 130 L455 150Z" fill="rgba(170,165,155,0.9)" />
                  <rect x="420" y="158" width="8" height="8" fill="rgba(140,180,220,0.4)" />
                  <rect x="433" y="162" width="10" height="15" fill="rgba(140,135,125,0.6)" />

                  {/* House 3 */}
                  <rect x="460" y="152" width="28" height="25" fill="rgba(200,195,185,0.9)" />
                  <path d="M456 152 L474 137 L492 152Z" fill="rgba(155,150,140,0.9)" />
                  <rect x="468" y="160" width="8" height="17" fill="rgba(140,135,125,0.6)" />

                  {/* House 4 (smaller) */}
                  <rect x="500" y="156" width="22" height="20" fill="rgba(195,190,180,0.9)" />
                  <path d="M496 156 L511 144 L526 156Z" fill="rgba(165,160,150,0.9)" />

                  {/* Trees between houses */}
                  <circle cx="405" cy="163" r="6" fill="rgba(80,120,80,0.6)" />
                  <circle cx="453" cy="165" r="5" fill="rgba(70,110,70,0.5)" />
                  <circle cx="530" cy="163" r="7" fill="rgba(75,115,75,0.55)" />
                  <circle cx="534" cy="160" r="5" fill="rgba(85,125,85,0.5)" />

                  {/* ── CENTER-BOTTOM: Medical & City ── */}
                  {/* Medical building */}
                  <rect x="420" y="290" width="45" height="50" fill="rgba(232,230,225,0.9)" />
                  <rect x="430" y="298" width="8" height="8" fill="rgba(140,180,220,0.4)" />
                  <rect x="442" y="298" width="8" height="8" fill="rgba(140,180,220,0.4)" />
                  {/* Red cross */}
                  <rect x="436" y="280" width="18" height="14" rx="2" fill="rgba(200,60,60,0.85)" />
                  <rect x="442" y="283" width="6" height="8" fill="rgba(255,255,255,0.9)" />
                  <rect x="439" y="285.5" width="12" height="3" fill="rgba(255,255,255,0.9)" />
                  <text x="442" y="330" textAnchor="middle" fill="rgba(6,12,22,0.6)" fontSize="7" fontFamily="'DM Sans', sans-serif" fontWeight="600">MEDICAL</text>

                  {/* City skyline silhouettes */}
                  <rect x="490" y="275" width="25" height="95" fill="rgba(60,55,50,0.85)" />
                  <rect x="493" y="280" width="5" height="6" fill="rgba(201,168,76,0.3)" />
                  <rect x="501" y="280" width="5" height="6" fill="rgba(201,168,76,0.3)" />
                  <rect x="493" y="290" width="5" height="6" fill="rgba(201,168,76,0.3)" />
                  <rect x="501" y="290" width="5" height="6" fill="rgba(201,168,76,0.3)" />
                  <rect x="493" y="300" width="5" height="6" fill="rgba(201,168,76,0.3)" />
                  <rect x="501" y="300" width="5" height="6" fill="rgba(201,168,76,0.3)" />

                  <rect x="520" y="300" width="20" height="70" fill="rgba(70,65,58,0.85)" />
                  <rect x="545" y="260" width="30" height="110" fill="rgba(55,50,45,0.85)" />
                  <rect x="548" y="265" width="6" height="6" fill="rgba(201,168,76,0.25)" />
                  <rect x="558" y="265" width="6" height="6" fill="rgba(201,168,76,0.25)" />
                  <rect x="548" y="278" width="6" height="6" fill="rgba(201,168,76,0.25)" />
                  <rect x="558" y="278" width="6" height="6" fill="rgba(201,168,76,0.25)" />
                  <rect x="548" y="291" width="6" height="6" fill="rgba(201,168,76,0.25)" />

                  <rect x="580" y="310" width="18" height="60" fill="rgba(65,60,53,0.85)" />

                  {/* Construction cranes */}
                  <line x1="610" y1="245" x2="610" y2="370" stroke="rgba(201,168,76,0.5)" strokeWidth="2" />
                  <line x1="610" y1="245" x2="645" y2="245" stroke="rgba(201,168,76,0.5)" strokeWidth="1.5" />
                  <line x1="610" y1="245" x2="600" y2="250" stroke="rgba(201,168,76,0.4)" strokeWidth="1" />
                  <line x1="645" y1="245" x2="640" y2="270" stroke="rgba(201,168,76,0.3)" strokeWidth="0.5" />

                  <line x1="640" y1="270" x2="640" y2="370" stroke="rgba(201,168,76,0.4)" strokeWidth="1.5" />
                  <line x1="640" y1="270" x2="670" y2="270" stroke="rgba(201,168,76,0.4)" strokeWidth="1" />

                  {/* Bridge */}
                  <path d="M480 370 Q510 355 540 370 Q570 355 600 370 Q630 355 660 370" fill="none" stroke="rgba(120,115,105,0.8)" strokeWidth="3" />
                  <line x1="490" y1="370" x2="490" y2="385" stroke="rgba(120,115,105,0.7)" strokeWidth="2" />
                  <line x1="540" y1="370" x2="540" y2="385" stroke="rgba(120,115,105,0.7)" strokeWidth="2" />
                  <line x1="600" y1="370" x2="600" y2="385" stroke="rgba(120,115,105,0.7)" strokeWidth="2" />
                  <line x1="650" y1="370" x2="650" y2="385" stroke="rgba(120,115,105,0.7)" strokeWidth="2" />

                  {/* River */}
                  <rect x="470" y="378" width="200" height="18" fill="url(#opsRiver)" rx="4" />

                  {/* Orange/brown building */}
                  <rect x="680" y="285" width="40" height="85" fill="rgba(200,120,50,0.8)" rx="2" />
                  <rect x="685" y="292" width="8" height="8" fill="rgba(255,255,255,0.3)" />
                  <rect x="697" y="292" width="8" height="8" fill="rgba(255,255,255,0.3)" />
                  <rect x="685" y="305" width="8" height="8" fill="rgba(255,255,255,0.3)" />
                  <rect x="697" y="305" width="8" height="8" fill="rgba(255,255,255,0.3)" />
                  <rect x="685" y="318" width="8" height="8" fill="rgba(255,255,255,0.3)" />
                  <rect x="697" y="318" width="8" height="8" fill="rgba(255,255,255,0.3)" />
                  <rect x="685" y="331" width="8" height="8" fill="rgba(255,255,255,0.3)" />
                  <rect x="697" y="331" width="8" height="8" fill="rgba(255,255,255,0.3)" />
                  <rect x="693" y="348" width="12" height="22" fill="rgba(160,90,35,0.8)" />

                  {/* ── RIGHT: Rural / Farm ── */}
                  {/* Barn */}
                  <rect x="760" y="135" width="40" height="35" fill="rgba(180,100,60,0.8)" />
                  <path d="M755 135 L780 115 L805 135Z" fill="rgba(160,85,50,0.85)" />
                  <rect x="775" y="150" width="10" height="20" fill="rgba(140,75,40,0.7)" />

                  {/* Silo */}
                  <rect x="810" y="130" width="14" height="40" fill="rgba(190,185,175,0.85)" rx="3" />
                  <ellipse cx="817" cy="130" rx="7" ry="4" fill="rgba(170,165,155,0.8)" />

                  {/* Windmill */}
                  <line x1="843" y1="125" x2="843" y2="170" stroke="rgba(180,175,165,0.9)" strokeWidth="2" />
                  <g transform="translate(843,125)">
                    <line x1="0" y1="0" x2="-12" y2="-14" stroke="rgba(200,195,185,0.8)" strokeWidth="1.5" />
                    <line x1="0" y1="0" x2="14" y2="-8" stroke="rgba(200,195,185,0.8)" strokeWidth="1.5" />
                    <line x1="0" y1="0" x2="6" y2="15" stroke="rgba(200,195,185,0.8)" strokeWidth="1.5" />
                    <line x1="0" y1="0" x2="-14" y2="6" stroke="rgba(200,195,185,0.8)" strokeWidth="1.5" />
                  </g>

                  {/* Farm house */}
                  <rect x="855" y="140" width="30" height="30" fill="rgba(210,205,195,0.9)" />
                  <path d="M850 140 L870 122 L890 140Z" fill="rgba(160,155,145,0.9)" />

                  {/* Trees */}
                  <circle cx="740" cy="155" r="8" fill="rgba(60,100,60,0.6)" />
                  <circle cx="745" cy="150" r="6" fill="rgba(70,110,70,0.55)" />
                  <circle cx="835" cy="160" r="6" fill="rgba(65,105,65,0.5)" />
                  <circle cx="750" cy="160" r="5" fill="rgba(75,115,75,0.5)" />

                  {/* Fence */}
                  <line x1="740" y1="170" x2="890" y2="170" stroke="rgba(160,155,145,0.5)" strokeWidth="0.8" />

                  {/* ── DRONES ── */}
                  {/* Drone 1: near airport */}
                  <g transform="translate(195,210)">
                    <rect x="-3" y="-2" width="6" height="4" fill="rgba(60,55,50,0.9)" rx="1" />
                    <line x1="-8" y1="-3" x2="-3" y2="-2" stroke="rgba(80,75,70,0.8)" strokeWidth="1" />
                    <line x1="3" y1="-2" x2="8" y2="-3" stroke="rgba(80,75,70,0.8)" strokeWidth="1" />
                    <circle cx="-9" cy="-4" r="3" fill="none" stroke="rgba(201,168,76,0.6)" strokeWidth="0.8" />
                    <circle cx="9" cy="-4" r="3" fill="none" stroke="rgba(201,168,76,0.6)" strokeWidth="0.8" />
                  </g>

                  {/* Drone 2: near suburbs */}
                  <g transform="translate(350,120)">
                    <rect x="-3" y="-2" width="6" height="4" fill="rgba(60,55,50,0.9)" rx="1" />
                    <line x1="-8" y1="-3" x2="-3" y2="-2" stroke="rgba(80,75,70,0.8)" strokeWidth="1" />
                    <line x1="3" y1="-2" x2="8" y2="-3" stroke="rgba(80,75,70,0.8)" strokeWidth="1" />
                    <circle cx="-9" cy="-4" r="3" fill="none" stroke="rgba(201,168,76,0.6)" strokeWidth="0.8" />
                    <circle cx="9" cy="-4" r="3" fill="none" stroke="rgba(201,168,76,0.6)" strokeWidth="0.8" />
                  </g>

                  {/* Drone 3: near medical */}
                  <g transform="translate(460,250)">
                    <rect x="-3" y="-2" width="6" height="4" fill="rgba(60,55,50,0.9)" rx="1" />
                    <line x1="-8" y1="-3" x2="-3" y2="-2" stroke="rgba(80,75,70,0.8)" strokeWidth="1" />
                    <line x1="3" y1="-2" x2="8" y2="-3" stroke="rgba(80,75,70,0.8)" strokeWidth="1" />
                    <circle cx="-9" cy="-4" r="3" fill="none" stroke="rgba(201,168,76,0.6)" strokeWidth="0.8" />
                    <circle cx="9" cy="-4" r="3" fill="none" stroke="rgba(201,168,76,0.6)" strokeWidth="0.8" />
                  </g>

                  {/* Drone 4: near rural */}
                  <g transform="translate(720,100)">
                    <rect x="-3" y="-2" width="6" height="4" fill="rgba(60,55,50,0.9)" rx="1" />
                    <line x1="-8" y1="-3" x2="-3" y2="-2" stroke="rgba(80,75,70,0.8)" strokeWidth="1" />
                    <line x1="3" y1="-2" x2="8" y2="-3" stroke="rgba(80,75,70,0.8)" strokeWidth="1" />
                    <circle cx="-9" cy="-4" r="3" fill="none" stroke="rgba(201,168,76,0.6)" strokeWidth="0.8" />
                    <circle cx="9" cy="-4" r="3" fill="none" stroke="rgba(201,168,76,0.6)" strokeWidth="0.8" />
                  </g>

                  {/* ── FLIGHT PATHS (dashed curves) ── */}
                  {/* Airport → Suburbs */}
                  <path d="M150 230 Q250 100 370 140" fill="none" stroke="rgba(201,168,76,0.4)" strokeWidth="1.2" className="ops-flight" />
                  {/* Airport → Rural */}
                  <path d="M160 220 Q400 20 760 130" fill="none" stroke="rgba(201,168,76,0.35)" strokeWidth="1" className="ops-flight" />
                  {/* Airport → Medical */}
                  <path d="M130 270 Q280 230 420 280" fill="none" stroke="rgba(201,168,76,0.35)" strokeWidth="1" className="ops-flight" />
                  {/* Warehouse → Suburbs */}
                  <path d="M110 320 Q240 200 380 150" fill="none" stroke="rgba(201,168,76,0.35)" strokeWidth="1" className="ops-flight" />
                  {/* Warehouse → City */}
                  <path d="M110 340 Q300 290 490 290" fill="none" stroke="rgba(201,168,76,0.35)" strokeWidth="1" className="ops-flight" />
                  {/* Warehouse → Rural */}
                  <path d="M100 310 Q400 80 770 130" fill="none" stroke="rgba(201,168,76,0.3)" strokeWidth="1" className="ops-flight" />
                  {/* Suburbs → Rural */}
                  <path d="M530 155 Q630 90 760 130" fill="none" stroke="rgba(201,168,76,0.35)" strokeWidth="1" className="ops-flight" />
                  {/* Medical → Suburbs */}
                  <path d="M440 280 Q430 210 420 155" fill="none" stroke="rgba(201,168,76,0.35)" strokeWidth="1" className="ops-flight" />
                  {/* Medical → City */}
                  <path d="M465 300 Q475 300 490 295" fill="none" stroke="rgba(201,168,76,0.3)" strokeWidth="1" className="ops-flight" />

                  {/* ── LABELS ── */}
                  <text x="95" y="395" textAnchor="middle" fill="rgba(201,168,76,0.7)" fontSize="10" fontFamily="'DM Sans', sans-serif" fontWeight="600" letterSpacing="1.5" style={{ textTransform: 'uppercase' } as React.CSSProperties}>Airport Hub</text>
                  <text x="450" y="190" textAnchor="middle" fill="rgba(201,168,76,0.7)" fontSize="10" fontFamily="'DM Sans', sans-serif" fontWeight="600" letterSpacing="1.5" style={{ textTransform: 'uppercase' } as React.CSSProperties}>Suburban</text>
                  <text x="570" y="395" textAnchor="middle" fill="rgba(201,168,76,0.7)" fontSize="10" fontFamily="'DM Sans', sans-serif" fontWeight="600" letterSpacing="1.5" style={{ textTransform: 'uppercase' } as React.CSSProperties}>Urban Center</text>
                  <text x="810" y="190" textAnchor="middle" fill="rgba(201,168,76,0.7)" fontSize="10" fontFamily="'DM Sans', sans-serif" fontWeight="600" letterSpacing="1.5" style={{ textTransform: 'uppercase' } as React.CSSProperties}>Rural</text>
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
          Strategic multimodal integration<br /><em>Built on real-world success</em>
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
            <h2 className="section-title">Ready to <em>Transform</em> Your Region?</h2>
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
