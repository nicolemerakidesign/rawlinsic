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

/* ──── Data ──── */

const pillarCards = [
  {
    title: "Urban Air Mobility",
    desc: "Transform passenger transportation through electric vertical takeoff and landing aircraft, enabling rapid point-to-point connectivity across metropolitan areas.",
    bullets: ["Urban air mobility solutions", "Vertiport integration planning", "Passenger safety and operations", "Multi-modal transportation integration"],
  },
  {
    title: "Geographic Intelligence",
    desc: "Harness unmanned aircraft systems to gather real-time aerial data for infrastructure monitoring, environmental assessment, and strategic planning.",
    bullets: ["Airborne data acquisition", "Infrastructure monitoring", "Environmental assessment", "Precision mapping and analytics"],
  },
  {
    title: "Last-Mile Logistics",
    desc: "Revolutionize supply chain operations with autonomous delivery systems, enabling faster response times and expanding service areas.",
    bullets: ["Last-mile delivery optimization", "Supply chain resilience", "Emergency response capability", "Rapid goods distribution"],
  },
];

const phaseData = [
  { num: "01", label: "Policy & System Planning", body: "Develop policy, system plans, and standardized guidance for local implementation." },
  { num: "02", label: "Regulatory Navigation", body: "Provide regulatory understanding for compliance and guide regulatory coordination." },
  { num: "03", label: "Infrastructure Planning", body: "Plan for infrastructure, including vertiports, including technical research and validation." },
  { num: "04", label: "Functional Frameworks", body: "Establish functional frameworks that support scalable program delivery and operational readiness." },
  { num: "05", label: "Data & Safety Integration", body: "Integrate data and safety policies into transportation systems." },
  { num: "06", label: "Implementation & Scaling", body: "Support implementation, deployment, and the scaling of AAM and UAS services." },
  { num: "07", label: "Community Engagement", body: "Facilitate ongoing community engagement and public trust-building." },
];

const frameworkCards = [
  {
    title: "Define",
    tagline: "Vision & Scope",
    accent: "linear-gradient(90deg, #c9a84c, #e8d5a0)",
    bullets: ["Community needs assessment", "Vision and goals definition", "Program scope and timeline", "Stakeholder identification"],
  },
  {
    title: "Enable",
    tagline: "Infrastructure & Policy",
    accent: "linear-gradient(90deg, #d4b878, #c9a84c)",
    bullets: ["Policy framework development", "Stakeholder coordination", "Infrastructure planning", "Regulatory alignment"],
  },
  {
    title: "Deliver",
    tagline: "Operations & Scale",
    accent: "linear-gradient(90deg, #e8d5a0, #c9a84c)",
    bullets: ["Operational deployment", "Safety and compliance monitoring", "Performance optimization", "Continuous improvement"],
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

const AAMPage = () => {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const mouseX = useRef(0);
  const mouseY = useRef(0);
  const ringX = useRef(0);
  const ringY = useRef(0);
  const animFrame = useRef<number | null>(null);

  const [introOpen, setIntroOpen] = useState(false);
  const [openPillars, setOpenPillars] = useState<Set<number>>(new Set());
  const [openPhases, setOpenPhases] = useState<Set<number>>(new Set());
  const [openFrameworks, setOpenFrameworks] = useState<Set<number>>(new Set());
  const [showAllAAM, setShowAllAAM] = useState(false);
  const [showAllUAS, setShowAllUAS] = useState(false);

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
    const hoverEls = document.querySelectorAll("a, button, .nav-item, .back-to-top, .aam-pillar-card, .aam-framework-card, .explore-card");
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
          <a href="#intro" className="hero-cta-btn"><span>explore our approach</span></a>
        </div>
        <div className="hero-scroll">
          <span>Scroll</span>
          <div className="scroll-line" />
        </div>
      </section>

      <div className="section-divider"><div className="gold-line" /></div>
      <div className="section-divider"><div className="gold-line" /></div>

      {/* ── Intro: Why AAM & UAS ── */}
      <section className="new-intro" id="intro">
        <div className="new-intro-wrap">
          <div className="new-intro-images reveal">
            <div className="intro-cinematic-wrap">
              <img className="intro-cinematic-img" src={DRONE_IMG} alt="Advanced Air Mobility drone" />
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
            <p className="section-label"><span className="gold-text">Our Foundation</span></p>
            <h2 className="section-title">Why <em>AAM &amp; UAS</em> Matter</h2>
            <button className={`intro-expand-btn${introOpen ? " expanded" : ""}`} onClick={() => setIntroOpen(o => !o)}>
              <span className="intro-expand-icon">
                <svg width="16" height="10" viewBox="0 0 16 10" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M1 1.5l7 7 7-7" /></svg>
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

      {/* ── Value Delivery: Pillar Cards ── */}
      <section className="aam-section" id="value">
        <div className="aam-container">
          <div className="aam-section-header reveal">
            <p className="section-label"><span className="gold-text">Value Delivery</span></p>
            <h2 className="section-title">Advanced <em>Applications</em></h2>
            <p className="aam-section-lead">
              From passenger air taxis to aerial data collection and autonomous delivery, our advisory services span the full spectrum of advanced air mobility.
            </p>
          </div>
          <div className="aam-pillars-grid">
            {pillarCards.map((card, i) => (
              <div className={`aam-pillar-card reveal${openPillars.has(i) ? " open" : ""}${i > 0 ? ` rd${i}` : ""}`} key={card.title}>
                <div className="aam-pillar-bar" />
                <div className="aam-pillar-inner">
                  <div className="aam-pillar-title-row">
                    <h3 className="aam-pillar-title">{card.title}</h3>
                    <button className="aam-expand-btn" onClick={() => toggleSet(setOpenPillars, i)}>
                      {chevronSvg(openPillars.has(i))}
                    </button>
                  </div>
                  <p className="aam-pillar-desc">{card.desc}</p>
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

      {/* ── How We Serve: Phases Accordion + Overview ── */}
      <section className="aam-section aam-serve-section" id="phases">
        <div className="aam-container">
          <div className="aam-serve-grid">
            <div className="aam-serve-left reveal">
              <p className="section-label"><span className="gold-text">How We Serve</span></p>
              <h2 className="section-title">Essential <em>Phases</em></h2>
              <p className="aam-section-lead" style={{ marginTop: "24px" }}>
                Our structured approach guides communities through seven phases of AAM and UAS integration—from initial policy development to full-scale implementation and community engagement.
              </p>
            </div>
            <div className="reveal rd1">
              <p className="aam-phases-label">Program Lifecycle</p>
              <div className="aam-phases-list">
                {phaseData.map((phase, i) => (
                  <div className={`aam-phase-item${openPhases.has(i) ? " open" : ""}`} key={phase.num}>
                    <button className="aam-phase-header" onClick={() => toggleSet(setOpenPhases, i)}>
                      <span className="aam-phase-num">{phase.num}</span>
                      <span className="aam-phase-label">{phase.label}</span>
                      <span className="aam-phase-chevron">{chevronSvg(openPhases.has(i))}</span>
                    </button>
                    <div className="aam-phase-body">
                      <p>{phase.body}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="section-divider"><div className="gold-line" /></div>

      {/* ── Strategic Methodology: Define / Enable / Deliver ── */}
      <section className="aam-section" id="methodology">
        <div className="aam-container">
          <div className="aam-section-header reveal">
            <p className="section-label"><span className="gold-text">Strategic Methodology</span></p>
            <h2 className="section-title">Our <em>Approach</em></h2>
          </div>
          <div className="aam-framework-grid">
            {frameworkCards.map((card, i) => (
              <div className={`aam-framework-card reveal${openFrameworks.has(i) ? " open" : ""}${i > 0 ? ` rd${i}` : ""}`} key={card.title}>
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

      {/* Parallax Quote 2 */}
      <div className="parallax-panel">
        <p className="parallax-text reveal">
          Successful AAM and UAS integration requires <em>coordinated planning</em>, stakeholder alignment, and a commitment to continuous innovation and community benefit.
        </p>
      </div>

      {/* ── Stakeholder Ecosystem with Hub ── */}
      <section className="aam-section" id="stakeholders">
        <div className="aam-container">
          <div className="aam-section-header reveal" style={{ textAlign: "center", margin: "0 auto 64px" }}>
            <p className="section-label"><span className="gold-text">Stakeholder Ecosystem</span></p>
            <h2 className="section-title">Who We <em>Partner</em> With</h2>
          </div>
          <div className="aam-stakeholders-layout reveal">
            {/* Left column */}
            <div>
              <p className="aam-stakeholders-col-label">Public Sector</p>
              <div className="aam-stakeholders-items">
                {stakeholdersLeft.map((s) => (
                  <div className="aam-stakeholder-item" key={s.name}>
                    <div className="aam-stakeholder-name">{s.name}</div>
                    <div className="aam-stakeholder-entities">{s.entities}</div>
                  </div>
                ))}
              </div>
            </div>
            {/* Center hub */}
            <div className="aam-hub-col">
              <div className="aam-rawlins-hub">
                <div className="aam-hub-ring aam-hub-ring-outer" />
                <div className="aam-hub-ring aam-hub-ring-mid" />
                <div className="aam-hub-inner">
                  <div className="aam-hub-title">Rawlins</div>
                  <div className="aam-hub-sub">Strategic Integration Hub</div>
                </div>
              </div>
              <div className="aam-rawlins-roles">
                <div className="aam-rawlins-role">
                  <span className="aam-rawlins-role-dot" />
                  Advisory &amp; Strategy
                </div>
                <div className="aam-rawlins-role">
                  <span className="aam-rawlins-role-dot" />
                  Program Management
                </div>
                <div className="aam-rawlins-role">
                  <span className="aam-rawlins-role-dot" />
                  Stakeholder Coordination
                </div>
              </div>
            </div>
            {/* Right column */}
            <div>
              <p className="aam-stakeholders-col-label">Private Sector</p>
              <div className="aam-stakeholders-items">
                {stakeholdersRight.map((s) => (
                  <div className="aam-stakeholder-item" key={s.name}>
                    <div className="aam-stakeholder-name">{s.name}</div>
                    <div className="aam-stakeholder-entities">{s.entities}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="section-divider"><div className="gold-line" /></div>

      {/* ── Service Portfolio ── */}
      <section className="aam-section aam-portfolio-section" id="portfolio">
        <div className="aam-container">
          <div className="aam-section-header reveal" style={{ textAlign: "center", margin: "0 auto 64px" }}>
            <p className="section-label"><span className="gold-text">Service Portfolio</span></p>
            <h2 className="section-title">AAM &amp; <em>UAS</em> Services</h2>
          </div>
          <div className="aam-portfolio-grid reveal">
            {/* AAM column */}
            <div className="aam-portfolio-col">
              <h3 className="aam-portfolio-col-title">AAM Services</h3>
              <div className="aam-portfolio-items">
                <ul className="aam-portfolio-list">
                  {aamServices.slice(0, showAllAAM ? aamServices.length : 5).map((s) => (
                    <li key={s}>{s}</li>
                  ))}
                </ul>
                {!showAllAAM && <div className="aam-portfolio-fade" />}
              </div>
              <button className="aam-portfolio-toggle" onClick={() => setShowAllAAM(!showAllAAM)}>
                <span>{showAllAAM ? "Show less" : `View all ${aamServices.length} services`}</span>
                {chevronSvg(showAllAAM)}
              </button>
            </div>
            {/* UAS column */}
            <div className="aam-portfolio-col">
              <h3 className="aam-portfolio-col-title">UAS Services</h3>
              <div className="aam-portfolio-items">
                <ul className="aam-portfolio-list">
                  {uasServices.slice(0, showAllUAS ? uasServices.length : 5).map((s) => (
                    <li key={s}>{s}</li>
                  ))}
                </ul>
                {!showAllUAS && <div className="aam-portfolio-fade" />}
              </div>
              <button className="aam-portfolio-toggle" onClick={() => setShowAllUAS(!showAllUAS)}>
                <span>{showAllUAS ? "Show less" : `View all ${uasServices.length} services`}</span>
                {chevronSvg(showAllUAS)}
              </button>
            </div>
          </div>
        </div>
      </section>

      <div className="section-divider"><div className="gold-line" /></div>

      {/* ── CTA ── */}
      <section className="aam-section aam-cta-section">
        <div className="aam-container">
          <div className="aam-cta-wrap reveal" style={{ textAlign: "center", margin: "0 auto" }}>
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
