"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import SiteNav from "@/components/site-nav";
import SiteFooter from "@/components/site-footer";

/* ─── Images ─── */
const HERO_IMG =
  "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1920&q=80";
const STRATEGY_IMG =
  "https://assets.macaly-user-data.dev/cdn-cgi/image/format=webp,width=2000,height=2000,fit=scale-down,quality=85,anim=false/c4zcddt61rtnmmmh8sqtv1fn/dkeher82cub0yp82vsjcz9t9/gNTqxQESyZzn0S1NPC6S2.webp";
const OPERATIONS_IMG =
  "https://assets.macaly-user-data.dev/cdn-cgi/image/format=webp,width=2000,height=2000,fit=scale-down,quality=85,anim=false/c4zcddt61rtnmmmh8sqtv1fn/dkeher82cub0yp82vsjcz9t9/P9ho_XURvnAgxJEfA0Udc.webp";
const TECHNOLOGY_IMG =
  "https://assets.macaly-user-data.dev/cdn-cgi/image/format=webp,width=2000,height=2000,fit=scale-down,quality=85,anim=false/c4zcddt61rtnmmmh8sqtv1fn/dkeher82cub0yp82vsjcz9t9/aJz_dR6Ty4KJ0pskjhA86.webp";

/* ─── Data ─── */
interface Service {
  title: string;
  desc: string;
  icon: React.ReactNode;
}

interface CapabilitySection {
  id: string;
  name: string;
  tagline: string;
  focus: string;
  description: string;
  image: string;
  services: Service[];
}

const iconStrategy = (
  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10" /><path d="M12 2v20M2 12h20" /><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
  </svg>
);
const iconOps = (
  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 2L2 7l10 5 10-5-10-5z" /><path d="M2 17l10 5 10-5" /><path d="M2 12l10 5 10-5" />
  </svg>
);
const iconTech = (
  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="3" width="20" height="14" rx="2" /><path d="M8 21h8M12 17v4" /><path d="M7 8l3 3-3 3M13 14h4" />
  </svg>
);

const iconPlanning = (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" /><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
  </svg>
);
const iconOrg = (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M23 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" />
  </svg>
);
const iconChart = (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <line x1="18" y1="20" x2="18" y2="10" /><line x1="12" y1="20" x2="12" y2="4" /><line x1="6" y1="20" x2="6" y2="14" />
  </svg>
);
const iconTarget = (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10" /><circle cx="12" cy="12" r="6" /><circle cx="12" cy="12" r="2" />
  </svg>
);
const iconGear = (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="3" /><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z" />
  </svg>
);
const iconCheck = (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" /><polyline points="22 4 12 14.01 9 11.01" />
  </svg>
);
const iconClipboard = (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2" /><rect x="8" y="2" width="8" height="4" rx="1" ry="1" />
  </svg>
);
const iconWrench = (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" />
  </svg>
);
const iconShield = (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
  </svg>
);
const iconDollar = (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <line x1="12" y1="1" x2="12" y2="23" /><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
  </svg>
);
const iconEye = (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" /><circle cx="12" cy="12" r="3" />
  </svg>
);
const iconDrone = (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 12m-2 0a2 2 0 1 0 4 0 2 2 0 1 0-4 0" /><path d="M4 6a2 2 0 1 0 0-4 2 2 0 0 0 0 4zM20 6a2 2 0 1 0 0-4 2 2 0 0 0 0 4zM4 22a2 2 0 1 0 0-4 2 2 0 0 0 0 4zM20 22a2 2 0 1 0 0-4 2 2 0 0 0 0 4z" /><path d="M6 6l4.5 4.5M18 6l-4.5 4.5M6 18l4.5-4.5M18 18l-4.5-4.5" />
  </svg>
);
const iconZap = (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
  </svg>
);

const capabilitySections: CapabilitySection[] = [
  {
    id: "strategy",
    name: "Strategy",
    tagline: "Decision systems · Planning · Organizational Design",
    focus: "Direction-setting, planning, organizational design, and high-level decision-making",
    description:
      "We help leaders see clearly, decide wisely, and act with confidence. From governance frameworks to strategic program planning, we translate organizational priorities into actionable plans that drive sustainable transformation.",
    image: STRATEGY_IMG,
    services: [
      {
        title: "Strategic Planning",
        desc: "Aligning leadership vision with measurable goals, building roadmaps that balance immediate needs with long-term organizational aspirations.",
        icon: iconPlanning,
      },
      {
        title: "Organizational IT Strategy",
        desc: "Designing technology strategies that serve the organization's mission—bridging the gap between business objectives and IT capabilities.",
        icon: iconGear,
      },
      {
        title: "Organizational Analysis",
        desc: "Evaluating structures, processes, and culture to identify inefficiencies and surface opportunities for meaningful, data-informed improvement.",
        icon: iconChart,
      },
      {
        title: "Organizational Change Management",
        desc: "Guiding organizations through transformation with frameworks that earn buy-in, reduce friction, and sustain momentum across every level.",
        icon: iconOrg,
      },
      {
        title: "Performance Management",
        desc: "Building accountability systems that connect individual contributions to strategic outcomes, fostering transparency and continuous improvement.",
        icon: iconTarget,
      },
      {
        title: "Program Effectiveness",
        desc: "Assessing whether programs deliver on their promise—identifying gaps, optimizing execution, and ensuring resources generate real impact.",
        icon: iconCheck,
      },
      {
        title: "Asset Management",
        desc: "Establishing strategic approaches to managing physical and digital assets, maximizing lifecycle value while minimizing risk and total cost of ownership.",
        icon: iconShield,
      },
    ],
  },
  {
    id: "operations",
    name: "Operations",
    tagline: "People · Process · Culture · Workforce",
    focus: "Execution, delivery, process improvement, and day-to-day program management",
    description:
      "We create sustainable high-performance strategies that foster collaboration, accountability, and organizational health. Our programs empower teams to deliver their best work—consistently and at scale.",
    image: OPERATIONS_IMG,
    services: [
      {
        title: "Process & Procedure Improvements",
        desc: "Redesigning workflows and eliminating bottlenecks so teams spend less time on bureaucracy and more time delivering results.",
        icon: iconGear,
      },
      {
        title: "Program & Project Leadership",
        desc: "Providing senior-level management that keeps complex, multi-stakeholder programs on schedule, within scope, and aligned with organizational goals.",
        icon: iconClipboard,
      },
      {
        title: "Project Delivery",
        desc: "Driving execution from kickoff to close-out—managing risk, coordinating teams, and ensuring deliverables meet quality standards.",
        icon: iconCheck,
      },
      {
        title: "Maintenance & Operations Improvements",
        desc: "Optimizing day-to-day operations and maintenance programs to extend asset life, reduce downtime, and improve service reliability.",
        icon: iconWrench,
      },
      {
        title: "Program Quality Assurance",
        desc: "Embedding quality controls and continuous feedback loops that ensure every program output meets established standards and stakeholder expectations.",
        icon: iconShield,
      },
      {
        title: "Administration Program Services",
        desc: "Managing administrative functions with efficiency and precision—from documentation to compliance, freeing leadership to focus on mission-critical priorities.",
        icon: iconClipboard,
      },
      {
        title: "Owner's Representative",
        desc: "Acting as your trusted agent on the ground—advocating for your interests, managing contractors, and ensuring projects reflect your vision and standards.",
        icon: iconEye,
      },
      {
        title: "Finance, Budget & Procurement",
        desc: "Strengthening financial governance, streamlining procurement processes, and building budget frameworks that stretch resources while maintaining compliance.",
        icon: iconDollar,
      },
    ],
  },
  {
    id: "technology",
    name: "Technology",
    tagline: "Human-centric AI · Digital Systems · Analytics · Data",
    focus: "Emerging tech, systems, and tech-enabled capabilities",
    description:
      "From establishing trustworthy data foundations to deploying intelligent automation, we help organizations harness the information layer. Our specialists streamline workflows so your people can focus on what machines can't do.",
    image: TECHNOLOGY_IMG,
    services: [
      {
        title: "Advanced Air Mobility & Drones",
        desc: "Guiding the planning, implementation, and integration of advanced air mobility and uncrewed aircraft systems within existing transport networks.",
        icon: iconDrone,
      },
      {
        title: "Automation & Integration",
        desc: "Connecting disparate systems and automating repetitive processes to reduce manual effort, improve accuracy, and accelerate decision cycles.",
        icon: iconZap,
      },
    ],
  },
];

/* ─── Component ─── */
export default function CapabilitiesPage() {
  const [activeTab, setActiveTab] = useState("strategy");
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const mouseX = useRef(0);
  const mouseY = useRef(0);
  const ringX = useRef(0);
  const ringY = useRef(0);
  const animFrame = useRef<number | null>(null);

  /* custom cursor */
  useEffect(() => {
    const move = (e: MouseEvent) => {
      mouseX.current = e.clientX;
      mouseY.current = e.clientY;
      if (dotRef.current) {
        dotRef.current.style.left = `${e.clientX}px`;
        dotRef.current.style.top = `${e.clientY}px`;
      }
    };
    const loop = () => {
      ringX.current += (mouseX.current - ringX.current) * 0.15;
      ringY.current += (mouseY.current - ringY.current) * 0.15;
      if (ringRef.current) {
        ringRef.current.style.left = `${ringX.current}px`;
        ringRef.current.style.top = `${ringY.current}px`;
      }
      animFrame.current = requestAnimationFrame(loop);
    };
    window.addEventListener("mousemove", move);
    animFrame.current = requestAnimationFrame(loop);
    return () => {
      window.removeEventListener("mousemove", move);
      if (animFrame.current) cancelAnimationFrame(animFrame.current);
    };
  }, []);

  /* particles */
  const canvasRef = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const c = canvasRef.current;
    if (!c) return;
    const ctx = c.getContext("2d");
    if (!ctx) return;
    let raf: number;
    const resize = () => { c.width = window.innerWidth; c.height = window.innerHeight; };
    resize();
    window.addEventListener("resize", resize);
    const dots = Array.from({ length: 40 }, () => ({
      x: Math.random() * c.width, y: Math.random() * c.height,
      vx: (Math.random() - 0.5) * 0.3, vy: (Math.random() - 0.5) * 0.3,
      r: Math.random() * 1.5 + 0.5,
    }));
    const draw = () => {
      ctx.clearRect(0, 0, c.width, c.height);
      dots.forEach((d) => {
        d.x += d.vx; d.y += d.vy;
        if (d.x < 0) d.x = c.width; if (d.x > c.width) d.x = 0;
        if (d.y < 0) d.y = c.height; if (d.y > c.height) d.y = 0;
        ctx.beginPath();
        ctx.arc(d.x, d.y, d.r, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(201,168,76,0.25)";
        ctx.fill();
      });
      raf = requestAnimationFrame(draw);
    };
    draw();
    return () => { window.removeEventListener("resize", resize); cancelAnimationFrame(raf); };
  }, []);

  /* scroll reveal */
  useEffect(() => {
    const els = document.querySelectorAll(".reveal");
    const ob = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) e.target.classList.add("visible"); }),
      { threshold: 0.12 }
    );
    els.forEach((el) => ob.observe(el));
    return () => ob.disconnect();
  }, []);

  /* orbs */
  const orbRef1 = useRef<HTMLDivElement>(null);
  const orbRef2 = useRef<HTMLDivElement>(null);
  useEffect(() => {
    let t = 0;
    const run = () => {
      t += 0.003;
      if (orbRef1.current) {
        orbRef1.current.style.transform = `translate(${Math.sin(t) * 60}px, ${Math.cos(t * 0.7) * 40}px)`;
      }
      if (orbRef2.current) {
        orbRef2.current.style.transform = `translate(${Math.cos(t * 0.8) * 50}px, ${Math.sin(t * 1.1) * 35}px)`;
      }
      requestAnimationFrame(run);
    };
    run();
  }, []);

  /* smooth scroll to section on tab click */
  const scrollToSection = (id: string) => {
    setActiveTab(id);
    const el = document.getElementById(id);
    if (el) {
      const offset = 100;
      const top = el.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: "smooth" });
    }
  };

  return (
    <>
      <div className="cursor-dot" ref={dotRef} />
      <div className="cursor-ring" ref={ringRef} />
      <canvas className="particle-canvas" ref={canvasRef} />
      <div className="orb orb-1" ref={orbRef1} />
      <div className="orb orb-2" ref={orbRef2} />
      <SiteNav />

      {/* ── Hero ── */}
      <section className="cap-hero">
        <Image
          src={HERO_IMG}
          alt="Capabilities"
          fill
          priority
          sizes="100vw"
          className="cap-hero-img"
        />
        <div className="cap-hero-overlay" />
        <div className="cap-hero-content reveal">
          <p className="cap-hero-label">
            <span className="gold-text">Our Capabilities</span>
          </p>
          <h1 className="cap-hero-title">
            Where expertise meets <em>execution</em>
          </h1>
          <p className="cap-hero-subtitle">
            Integrated advisory services spanning strategy, operations, and technology—designed for complex organizations navigating transformation.
          </p>
        </div>
      </section>

      {/* ── Sticky Tab Bar ── */}
      <div className="cap-tab-bar">
        <div className="cap-tab-bar-inner">
          {capabilitySections.map((s) => (
            <button
              key={s.id}
              className={`cap-tab${activeTab === s.id ? " active" : ""}`}
              onClick={() => scrollToSection(s.id)}
            >
              <span className="cap-tab-icon">
                {s.id === "strategy" && iconStrategy}
                {s.id === "operations" && iconOps}
                {s.id === "technology" && iconTech}
              </span>
              {s.name}
            </button>
          ))}
        </div>
      </div>

      {/* ── Capability Sections ── */}
      {capabilitySections.map((section, sIdx) => (
        <section key={section.id} id={section.id} className="cap-section">
          {/* Section header with image */}
          <div className={`cap-section-header reveal${sIdx % 2 !== 0 ? " cap-reverse" : ""}`}>
            <div className="cap-section-img-wrap">
              <Image
                src={section.image}
                alt={section.name}
                fill
                sizes="(max-width: 900px) 100vw, 50vw"
                className="cap-section-img"
              />
              <div className="cap-section-img-overlay" />
            </div>
            <div className="cap-section-text">
              <div className="cap-section-number">0{sIdx + 1}</div>
              <p className="cap-section-label">
                <span className="gold-text">{section.tagline}</span>
              </p>
              <h2 className="cap-section-title">{section.name}</h2>
              <p className="cap-section-focus">{section.focus}</p>
              <p className="cap-section-desc">{section.description}</p>
            </div>
          </div>

          {/* Services grid */}
          <div className="cap-services-grid">
            {section.services.map((svc, i) => (
              <div key={svc.title} className={`cap-service-card reveal rd${Math.min(i % 3, 2)}`}>
                <div className="cap-service-icon">{svc.icon}</div>
                <h3 className="cap-service-title">{svc.title}</h3>
                <p className="cap-service-desc">{svc.desc}</p>
                <div className="cap-service-bar" />
              </div>
            ))}
          </div>

          {/* Divider between sections */}
          {sIdx < capabilitySections.length - 1 && (
            <div className="section-divider" style={{ margin: "80px auto 0" }}>
              <div className="gold-line" />
            </div>
          )}
        </section>
      ))}

      {/* ── CTA ── */}
      <section className="cap-cta reveal">
        <div className="cap-cta-inner">
          <h2 className="cap-cta-title">Ready to transform your organization?</h2>
          <p className="cap-cta-text">
            Let&rsquo;s discuss how our integrated capabilities can address your unique challenges.
          </p>
          <Link href="/contact" className="cap-cta-btn">
            <span>Get In Touch</span>
          </Link>
        </div>
      </section>

      <SiteFooter />
    </>
  );
}
