"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import SiteNav from "@/components/site-nav";
import SiteFooter from "@/components/site-footer";

const LOGO_URL =
  "https://assets.macaly-user-data.dev/cdn-cgi/image/format=webp,width=2000,height=2000,fit=scale-down,quality=90,anim=true/c4zcddt61rtnmmmh8sqtv1fn/dkeher82cub0yp82vsjcz9t9/cfZ06kEF6A_pOkuifk_rD.webp";

// ── Content Data ────────────────────────────────────────────────────────────

const essentialPhases = [
  {
    label: "Policy & System Planning",
    desc: "Develop policy, system plans, and standardized guidance for local implementation.",
  },
  {
    label: "Regulatory Navigation",
    desc: "Provide regulatory understanding for compliance and guide regulatory coordination with the appropriate agencies.",
  },
  {
    label: "Infrastructure Planning",
    desc: "Plan for infrastructure including vertiports — incorporating technical research and validation to ensure feasibility.",
  },
  {
    label: "Functional Frameworks",
    desc: "Establish functional frameworks that support scalable program delivery and operational readiness.",
  },
  {
    label: "Data & Safety Integration",
    desc: "Integrate data and safety policies into transportation systems to ensure safe, reliable operations.",
  },
  {
    label: "Implementation & Scaling",
    desc: "Support implementation, deployment, and the scaling of AAM and UAS services across communities.",
  },
  {
    label: "Community Engagement",
    desc: "Facilitate ongoing community engagement and public trust-building throughout the program lifecycle.",
  },
];

const valuePillars = [
  {
    id: "aam",
    title: "AAM (Air Taxis)",
    desc: "Expanding passenger mobility through electric vertical takeoff and landing (eVTOL) aircraft for urban and regional transport.",
    bullets: [
      "Urban mobility",
      "Business travel",
      "Emergency medical transport",
      "Regional connectivity",
      "Tourism & sightseeing",
    ],
  },
  {
    id: "data",
    title: "UAS Data Collection",
    desc: "Harnessing drone technology to gather critical infrastructure, environmental, and operational data at scale.",
    bullets: [
      "Infrastructure inspection",
      "Construction inspection & monitoring",
      "Environmental monitoring",
      "Aerial surveying & mapping",
      "Disaster response",
    ],
  },
  {
    id: "delivery",
    title: "UAS Package Delivery",
    desc: "Enabling efficient, scalable last-mile and specialized delivery operations across diverse geographies.",
    bullets: [
      "Last-mile delivery",
      "Medical supply delivery",
      "Rural & remote delivery",
      "Inter-community delivery",
      "Retail & e-commerce support",
    ],
  },
];

const serviceFramework = [
  {
    phase: "Define",
    tagline: "Develop policy",
    color: "#c9a84c",
    bullets: [
      "National aviation policy framework development",
      "Translating emerging use cases into policy considerations",
      "Inter-ministerial and cross-border coordination",
      "Evidence-based policy sequencing",
    ],
  },
  {
    phase: "Enable",
    tagline: "Navigate regulations",
    color: "#d4b878",
    bullets: [
      "Regulatory gap assessments",
      "Certification and approval pathways",
      "BVLOS and advanced operations support",
      "Standards alignment and participation",
      "Audit-ready, defensible regulatory programs",
    ],
  },
  {
    phase: "Deliver",
    tagline: "Integrate and implement",
    color: "#e8d5a0",
    bullets: [
      "Airspace integration",
      "Aviation infrastructure readiness and planning",
      "Multi-stakeholder coordination and governance",
      "Risk-informed implementation pilots",
      "Sustainable authority capacity building",
    ],
  },
];

const servicePortfolio = {
  aam: {
    title: "AAM",
    items: [
      "Feasibility studies and site assessments",
      "Vertiport planning and design guidance",
      "Air traffic management integration support",
      "Policy and governance framework development",
      "Community outreach and public engagement",
      "Pilot program design and oversight",
      "Economic impact and cost-benefit analysis",
      "Safety case development and risk assessment",
      "Multimodal integration planning",
      "Regulatory compliance and certification support",
    ],
  },
  uas: {
    title: "UAS",
    items: [
      "Operational design domain (ODD) development",
      "Drone delivery corridor planning",
      "Data governance and privacy frameworks",
      "Beyond visual line of sight (BVLOS) operations support",
      "Safety management system development",
      "Integration with ground transportation networks",
      "Workforce training and UAS operator programs",
      "Airspace deconfliction and UTM integration",
      "Environmental and community impact assessments",
      "Procurement support and vendor evaluation",
    ],
  },
};

const stakeholderRows = [
  {
    public: { category: "Aviation Authorities", entities: "Federal Aviation Administration · International Civil Aviation Organization · NASAO" },
    private: { category: "Air Navigation Service Providers", entities: "UTM operators · Air traffic management providers · Data service providers" },
  },
  {
    public: { category: "Government Agencies", entities: "Departments of Transportation · Security Agencies · Emergency Management" },
    private: { category: "Operators & Service Providers", entities: "Drone operators (data collection) · Package delivery services · Air taxi operators" },
  },
  {
    public: { category: "Standards Organizations", entities: "ACRA · AASHTO · NCHRP · FHWA" },
    private: { category: "Industry", entities: "Aircraft manufacturers · Technology providers · Infrastructure developers" },
  },
  {
    public: { category: "Academic Institutions", entities: "Research universities · Transportation research centers · Engineering programs" },
    private: { category: "Cities & MPOs", entities: "Metropolitan planning organizations · Municipal governments · Regional transit authorities" },
  },
];

const rawlinsRoles = [
  { label: "Policy & Standards Development", color: "#5b8dee" },
  { label: "Regulatory Translation", color: "#4ecb71" },
  { label: "Technical Research & Validation", color: "#c9a84c" },
  { label: "Integration & Deployment Support", color: "#e85b5b" },
];

// ── Component ────────────────────────────────────────────────────────────────

export default function AAMPage() {
  const [openPhases, setOpenPhases] = useState<number[]>([]);
  const [openFramework, setOpenFramework] = useState<number[]>([]);
  const [portfolioOpen, setPortfolioOpen] = useState<Record<string, boolean>>({ aam: false, uas: false });
  const [openPillar, setOpenPillar] = useState<string | null>(null);

  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const mouseX = useRef(0);
  const mouseY = useRef(0);
  const ringX = useRef(0);
  const ringY = useRef(0);
  const animFrame = useRef<number | null>(null);

  // Scroll reveal
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
          }
        });
      },
      { threshold: 0.08, rootMargin: "0px 0px -40px 0px" }
    );
    document.querySelectorAll(".reveal").forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

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

    const hoverEls = document.querySelectorAll("a, button, .nav-item");
    hoverEls.forEach((el) => {
      el.addEventListener("mouseenter", () => ring.classList.add("hover"));
      el.addEventListener("mouseleave", () => ring.classList.remove("hover"));
    });

    return () => {
      document.removeEventListener("mousemove", onMouseMove);
      if (animFrame.current) cancelAnimationFrame(animFrame.current);
    };
  }, []);

  const togglePhase = (idx: number) => {
    setOpenPhases((prev) =>
      prev.includes(idx) ? prev.filter((i) => i !== idx) : [...prev, idx]
    );
  };

  const toggleFramework = (idx: number) => {
    setOpenFramework((prev) =>
      prev.includes(idx) ? prev.filter((i) => i !== idx) : [...prev, idx]
    );
  };

  return (
    <>
      {/* Custom cursor */}
      <div className="cursor-dot" ref={dotRef} />
      <div className="cursor-ring" ref={ringRef} />

      {/* Ambient background */}
      <div className="ambient-bg" />
      <div className="ambient-orbs">
        <div className="orb orb-1" />
        <div className="orb orb-2" />
        <div className="orb orb-3" />
        <div className="orb orb-4" />
      </div>

      <SiteNav />

      <div className="content-wrapper">

        {/* ── Hero ─────────────────────────────────────────────── */}
        <section className="aam-hero">
          <div
            className="aam-hero-bg"
            style={{
              backgroundImage:
                "url(https://images.pexels.com/photos/442587/pexels-photo-442587.jpeg?auto=compress&cs=tinysrgb&w=1600)",
            }}
          />
          <div className="aam-hero-overlay" />
          <div className="aam-hero-content">
            <div className="hero-label gold-flat reveal rd1">
              Technology · Advanced Air Mobility &amp; UAS
            </div>
            <h1 className="hero-title reveal rd2">
              Partnering to turn AAM and UAS concepts into{" "}
              <em>community transport solutions</em>
            </h1>
            <p className="hero-sub reveal rd3">
              Are you ready for the next major phase in transportation&rsquo;s evolution?
            </p>
          </div>
          <div className="hero-scroll">
            <span>Explore</span>
            <div className="scroll-line" />
          </div>
        </section>

        {/* ── Overview ─────────────────────────────────────────── */}
        <section className="aam-section aam-overview-section">
          <div className="aam-container">
            <div className="aam-overview-grid">
              <div className="aam-overview-left reveal">
                <div className="section-label gold-flat">Overview</div>
                <h2 className="section-title">
                  The next major phase in transportation&rsquo;s evolution
                </h2>
              </div>
              <div className="aam-overview-right reveal rd2">
                <p className="section-text">
                  Advanced air mobility (AAM) and uncrewed aircraft systems (UAS) are increasingly
                  part of modern mobility ecosystems. Together, these systems and associated
                  technologies are expected to transform transportation by enhancing connectivity,
                  improving cargo logistics, expediting emergency response, and assisting
                  infrastructure inspection.
                </p>
                <p className="section-text" style={{ marginTop: "1.5rem" }}>
                  Next-generation aerial capabilities, integrated into existing mobility systems,
                  complement ground, rail, and maritime transport networks. They strengthen
                  multimodal transportation and enable urban, rural, and regional areas to benefit
                  from a more connected, resilient, and adaptable mobility ecosystem.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Gold divider */}
        <div className="section-divider"><div className="gold-line" /></div>

        {/* ── Where AAM/UAS deliver value ──────────────────────── */}
        <section className="aam-section">
          <div className="aam-container">
            <div className="aam-section-header reveal">
              <div className="section-label gold-flat">Where AAM and UAS deliver value</div>
              <h2 className="section-title">
                Capabilities that underpin the future of mobility
              </h2>
              <p className="aam-section-lead reveal rd2">
                The capabilities pioneered by UAS technologies underpin the development of AAM,
                which extends UAS applications into full-scale mobility solutions. UAS refers to
                all uncrewed aircraft, from small drones to larger remotely piloted systems. AAM
                represents a new vision of mobility, expanding transportation options for
                passengers, cargo, and emergency services across communities and regions.
              </p>
            </div>

            <div className="aam-pillars-grid">
              {valuePillars.map((pillar, idx) => {
                const isOpen = openPillar === pillar.id;
                return (
                  <div
                    key={pillar.id}
                    className={`aam-pillar-card reveal rd${idx + 1} ${isOpen ? "open" : ""}`}
                  >
                    <div className="aam-pillar-bar" />
                    <div className="aam-pillar-inner">
                      <div className="aam-pillar-title-row">
                        <h3 className="aam-pillar-title">{pillar.title}</h3>
                        <button
                          className="aam-expand-btn"
                          onClick={() => setOpenPillar(isOpen ? null : pillar.id)}
                          aria-expanded={isOpen}
                          aria-label={isOpen ? "Collapse" : "Expand"}
                        >
                          <svg
                            width="16"
                            height="16"
                            viewBox="0 0 16 16"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                          >
                            <path d="M3 8h10" />
                            {!isOpen && <path d="M8 3v10" />}
                          </svg>
                        </button>
                      </div>
                      <p className="aam-pillar-desc">{pillar.desc}</p>
                      <div className={`aam-pillar-expand ${isOpen ? "open" : ""}`}>
                        <ul className="aam-bullet-list">
                          {pillar.bullets.map((b, i) => (
                            <li key={i}>{b}</li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Gold divider */}
        <div className="section-divider"><div className="gold-line" /></div>

        {/* ── How we serve our clients ─────────────────────────── */}
        <section className="aam-section aam-serve-section">
          <div className="aam-container">
            <div className="aam-serve-grid">
              <div className="aam-serve-left reveal">
                <div className="section-label gold-flat">How we serve our clients</div>
                <h2 className="section-title">
                  Guiding programs from concept through sustained operation
                </h2>
                <p className="section-text" style={{ marginTop: "1.5rem" }}>
                  Our team brings together regulatory guidance, operational expertise, and program
                  strategy to deliver real-world results. We support AAM and UAS initiatives
                  throughout the program lifecycle.
                </p>
              </div>

              <div className="aam-serve-right reveal rd2">
                <div className="aam-phases-label">Essential phases</div>
                <div className="aam-phases-list">
                  {essentialPhases.map((phase, idx) => {
                    const isOpen = openPhases.includes(idx);
                    return (
                      <div key={idx} className={`aam-phase-item ${isOpen ? "open" : ""}`}>
                        <button
                          className="aam-phase-header"
                          onClick={() => togglePhase(idx)}
                          aria-expanded={isOpen}
                        >
                          <span className="aam-phase-num">
                            {String(idx + 1).padStart(2, "0")}
                          </span>
                          <span className="aam-phase-label">{phase.label}</span>
                          <span className="aam-phase-chevron">
                            <svg
                              width="12"
                              height="12"
                              viewBox="0 0 12 12"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="1.5"
                              strokeLinecap="round"
                              style={{
                                transform: isOpen ? "rotate(180deg)" : "rotate(0deg)",
                                transition: "transform 0.3s",
                              }}
                            >
                              <path d="M2 4l4 4 4-4" />
                            </svg>
                          </span>
                        </button>
                        <div className="aam-phase-body">
                          <p>{phase.desc}</p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Gold divider */}
        <div className="section-divider"><div className="gold-line" /></div>

        {/* ── Define / Enable / Deliver ─────────────────────────── */}
        <section className="aam-section">
          <div className="aam-container">
            <div className="aam-section-header reveal">
              <div className="section-label gold-flat">Our Service Categories</div>
              <h2 className="section-title">Our approach across the program lifecycle</h2>
            </div>

            <div className="aam-framework-grid">
              {serviceFramework.map((frame, idx) => {
                const isOpen = openFramework.includes(idx);
                return (
                  <div key={idx} className={`aam-framework-card reveal rd${idx + 1} ${isOpen ? "open" : ""}`}>
                    <div className="aam-framework-accent" style={{ background: frame.color }} />
                    <div className="aam-framework-inner">
                      <div
                        className="aam-framework-phase"
                        style={{ color: frame.color }}
                      >
                        {frame.phase}
                      </div>
                      <div className="aam-framework-tagline">({frame.tagline})</div>
                      <button
                        className="aam-framework-toggle"
                        onClick={() => toggleFramework(idx)}
                        aria-expanded={isOpen}
                      >
                        <span>{isOpen ? "Hide details" : "View details"}</span>
                        <svg
                          width="12"
                          height="12"
                          viewBox="0 0 12 12"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          style={{
                            transform: isOpen ? "rotate(180deg)" : "rotate(0deg)",
                            transition: "transform 0.3s",
                          }}
                        >
                          <path d="M2 4l4 4 4-4" />
                        </svg>
                      </button>
                      <div className={`aam-framework-expand ${isOpen ? "open" : ""}`}>
                        <ul className="aam-bullet-list">
                          {frame.bullets.map((b, i) => (
                            <li key={i}>{b}</li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Gold divider */}
        <div className="section-divider"><div className="gold-line" /></div>

        {/* ── Our Service Portfolio ─────────────────────────────── */}
        <section className="aam-section aam-portfolio-section">
          <div className="aam-container">
            <div className="aam-section-header reveal">
              <div className="section-label gold-flat">Our Service Portfolio</div>
              <h2 className="section-title">
                Comprehensive AAM &amp; UAS capabilities
              </h2>
            </div>

            <div className="aam-portfolio-grid">
              {(["aam", "uas"] as const).map((key) => {
                const col = servicePortfolio[key];
                const isOpen = portfolioOpen[key];
                const visibleItems = isOpen ? col.items : col.items.slice(0, 4);
                return (
                  <div key={key} className="aam-portfolio-col">
                    <h3 className="aam-portfolio-col-title">{col.title}</h3>
                    <div className="gold-line" style={{ margin: "16px 0 28px" }} />
                    <div className={`aam-portfolio-items ${isOpen ? "open" : ""}`}>
                      <ul className="aam-portfolio-list">
                        {visibleItems.map((item, i) => (
                          <li key={i}>{item}</li>
                        ))}
                      </ul>
                      {!isOpen && <div className="aam-portfolio-fade" />}
                    </div>
                    <button
                      className="aam-portfolio-toggle"
                      onClick={() =>
                        setPortfolioOpen((prev) => ({ ...prev, [key]: !prev[key] }))
                      }
                    >
                      <span>{isOpen ? "Show less" : `View all ${col.items.length} services`}</span>
                      <svg
                        width="12"
                        height="12"
                        viewBox="0 0 12 12"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        style={{
                          transform: isOpen ? "rotate(180deg)" : "rotate(0deg)",
                          transition: "transform 0.3s",
                        }}
                      >
                        <path d="M2 4l4 4 4-4" />
                      </svg>
                    </button>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Gold divider */}
        <div className="section-divider"><div className="gold-line" /></div>

        {/* ── Stakeholders we engage ────────────────────────────── */}
        <section className="aam-section aam-stakeholders-section">
          <div className="aam-container">
            <div className="aam-section-header reveal">
              <div className="section-label gold-flat">Stakeholders we engage</div>
              <h2 className="section-title">
                Connecting policy to operations across the ecosystem
              </h2>
              <p className="aam-section-lead reveal rd2">
                We engage multiple stakeholders in the public and private sectors across AAM and
                UAS to align policy, regulation, operations, and technology; integrate systems and
                infrastructure; implement, deploy, and scale services.
              </p>
            </div>

            <div className="aam-stakeholders-layout">
              {/* Public sector column */}
              <div className="aam-stakeholders-col reveal">
                <div className="aam-stakeholders-col-label">Public Sector</div>
                <div className="aam-stakeholders-items">
                  {stakeholderRows.map((row, i) => (
                    <div key={i} className="aam-stakeholder-item">
                      <div className="aam-stakeholder-name">{row.public.category}</div>
                      <div className="aam-stakeholder-entities">{row.public.entities}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Center hub */}
              <div className="aam-hub-col reveal rd2">
                <div className="aam-rawlins-hub">
                  <div className="aam-hub-ring aam-hub-ring-outer" />
                  <div className="aam-hub-ring aam-hub-ring-mid" />
                  <div className="aam-hub-inner">
                    <div className="aam-hub-title">Rawlins<br />Aero Team</div>
                    <div className="aam-hub-sub">Connecting Policy<br />to Operations</div>
                  </div>
                </div>
                <div className="aam-rawlins-roles">
                  {rawlinsRoles.map((role, i) => (
                    <div key={i} className="aam-rawlins-role">
                      <span className="aam-rawlins-role-dot" style={{ background: role.color }} />
                      <span>{role.label}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Private sector column */}
              <div className="aam-stakeholders-col reveal rd3">
                <div className="aam-stakeholders-col-label">Private Sector</div>
                <div className="aam-stakeholders-items">
                  {stakeholderRows.map((row, i) => (
                    <div key={i} className="aam-stakeholder-item">
                      <div className="aam-stakeholder-name">{row.private.category}</div>
                      <div className="aam-stakeholder-entities">{row.private.entities}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Gold divider */}
        <div className="section-divider"><div className="gold-line" /></div>

        {/* ── CTA ──────────────────────────────────────────────── */}
        <section className="aam-section aam-cta-section">
          <div className="aam-container">
            <div className="aam-cta-wrap reveal">
              <div className="section-label gold-flat">Ready to get started?</div>
              <h2 className="section-title" style={{ maxWidth: "760px", margin: "1.5rem 0 1.75rem" }}>
                Whether you are just beginning or well along on your journey, we can provide guidance and support.
              </h2>
              <p className="aam-cta-body">
                To learn more about our service portfolio and how we can help you deliver
                successful AAM and UAS outcomes for your community, reach out to our team.
              </p>
              <Link href="/contact" className="nav-cta">
                Get in touch
              </Link>
            </div>
          </div>
        </section>

        {/* Gold divider */}
        <div className="section-divider"><div className="gold-line" /></div>

        <SiteFooter />
      </div>
    </>
  );
}
