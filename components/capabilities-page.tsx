"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import SiteNav from "@/components/site-nav";
import SiteFooter from "@/components/site-footer";
import PasswordGate from "@/components/password-gate";

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
      { title: "Strategic Planning", desc: "Aligning leadership vision with measurable goals, building roadmaps that balance immediate needs with long-term organizational aspirations." },
      { title: "Organizational IT Strategy", desc: "Designing technology strategies that serve the organization's mission—bridging the gap between business objectives and IT capabilities." },
      { title: "Organizational Analysis", desc: "Evaluating structures, processes, and culture to identify inefficiencies and surface opportunities for meaningful, data-informed improvement." },
      { title: "Organizational Change Management", desc: "Guiding organizations through transformation with frameworks that earn buy-in, reduce friction, and sustain momentum across every level." },
      { title: "Performance Management", desc: "Building accountability systems that connect individual contributions to strategic outcomes, fostering transparency and continuous improvement." },
      { title: "Program Effectiveness", desc: "Assessing whether programs deliver on their promise—identifying gaps, optimizing execution, and ensuring resources generate real impact." },
      { title: "Asset Management", desc: "Establishing strategic approaches to managing physical and digital assets, maximizing lifecycle value while minimizing risk and total cost of ownership." },
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
      { title: "Process & Procedure Improvements", desc: "Redesigning workflows and eliminating bottlenecks so teams spend less time on bureaucracy and more time delivering results." },
      { title: "Program & Project Leadership", desc: "Providing senior-level management that keeps complex, multi-stakeholder programs on schedule, within scope, and aligned with organizational goals." },
      { title: "Project Delivery", desc: "Driving execution from kickoff to close-out—managing risk, coordinating teams, and ensuring deliverables meet quality standards." },
      { title: "Maintenance & Operations Improvements", desc: "Optimizing day-to-day operations and maintenance programs to extend asset life, reduce downtime, and improve service reliability." },
      { title: "Program Quality Assurance", desc: "Embedding quality controls and continuous feedback loops that ensure every program output meets established standards and stakeholder expectations." },
      { title: "Administration Program Services", desc: "Managing administrative functions with efficiency and precision—from documentation to compliance, freeing leadership to focus on mission-critical priorities." },
      { title: "Owner's Representative", desc: "Acting as your trusted agent on the ground—advocating for your interests, managing contractors, and ensuring projects reflect your vision and standards." },
      { title: "Finance, Budget & Procurement", desc: "Strengthening financial governance, streamlining procurement processes, and building budget frameworks that stretch resources while maintaining compliance." },
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
      { title: "Advanced Air Mobility & Drones", desc: "Guiding the planning, implementation, and integration of advanced air mobility and uncrewed aircraft systems within existing transport networks." },
      { title: "Automation & Integration", desc: "Connecting disparate systems and automating repetitive processes to reduce manual effort, improve accuracy, and accelerate decision cycles." },
    ],
  },
];

/* ─── Component ─── */
export default function CapabilitiesPage() {
  const [activeTab, setActiveTab] = useState("strategy");
  const [expandedService, setExpandedService] = useState<string | null>(null);
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const mouseX = useRef(0);
  const mouseY = useRef(0);
  const ringX = useRef(0);
  const ringY = useRef(0);
  const animFrame = useRef<number | null>(null);
  const serviceTrackRefs = useRef<Record<string, HTMLDivElement | null>>({});

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

  /* scroll reveal — double-rAF ensures browser has painted initial state before transitioning */
  useEffect(() => {
    let ob: IntersectionObserver;
    /* First rAF: browser commits the DOM. Second rAF: initial styles are painted. */
    const raf = requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        const els = document.querySelectorAll(".reveal");
        /* Force reflow so the browser has computed opacity:0 before we add visible */
        els.forEach((el) => { void (el as HTMLElement).offsetHeight; });
        ob = new IntersectionObserver(
          (entries) => entries.forEach((e) => { if (e.isIntersecting) e.target.classList.add("visible"); }),
          { threshold: 0.08 }
        );
        els.forEach((el) => ob.observe(el));
        /* fallback: force-check elements already in viewport */
        setTimeout(() => {
          els.forEach((el) => {
            const r = el.getBoundingClientRect();
            if (r.top < window.innerHeight && r.bottom > 0) el.classList.add("visible");
          });
        }, 100);

        /* After PasswordGate renders, scroll to hash target if present */
        const hash = window.location.hash;
        if (hash) {
          const target = document.querySelector(hash);
          if (target) {
            setTimeout(() => {
              const top = target.getBoundingClientRect().top + window.scrollY - 130;
              window.scrollTo({ top, behavior: "smooth" });
            }, 200);
          }
        }
      });
    });
    return () => { cancelAnimationFrame(raf); if (ob) ob.disconnect(); };
  }, []);

  /* orbs */
  const orbRef1 = useRef<HTMLDivElement>(null);
  const orbRef2 = useRef<HTMLDivElement>(null);
  useEffect(() => {
    let t = 0;
    const run = () => {
      t += 0.003;
      if (orbRef1.current) orbRef1.current.style.transform = `translate(${Math.sin(t) * 60}px, ${Math.cos(t * 0.7) * 40}px)`;
      if (orbRef2.current) orbRef2.current.style.transform = `translate(${Math.cos(t * 0.8) * 50}px, ${Math.sin(t * 1.1) * 35}px)`;
      requestAnimationFrame(run);
    };
    run();
  }, []);

  /* active tab tracks scroll position */
  useEffect(() => {
    const onScroll = () => {
      for (const s of capabilitySections) {
        const el = document.getElementById(s.id);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 200 && rect.bottom > 200) {
            setActiveTab(s.id);
            break;
          }
        }
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /* animated grid background */
  const gridCanvasRef = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const c = gridCanvasRef.current;
    if (!c) return;
    const ctx = c.getContext("2d");
    if (!ctx) return;
    let raf: number;
    const resize = () => { c.width = c.offsetWidth; c.height = c.offsetHeight; };
    resize();
    window.addEventListener("resize", resize);
    let t = 0;
    const draw = () => {
      t += 0.005;
      ctx.clearRect(0, 0, c.width, c.height);
      const spacing = 80;
      const cols = Math.ceil(c.width / spacing) + 1;
      const rows = Math.ceil(c.height / spacing) + 1;
      for (let r = 0; r < rows; r++) {
        for (let col = 0; col < cols; col++) {
          const x = col * spacing;
          const y = r * spacing;
          const dist = Math.sqrt((x - c.width / 2) ** 2 + (y - c.height / 2) ** 2);
          const pulse = Math.sin(t * 2 - dist * 0.005) * 0.5 + 0.5;
          const alpha = 0.02 + pulse * 0.06;
          ctx.beginPath();
          ctx.arc(x, y, 1.5, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(201,168,76,${alpha})`;
          ctx.fill();
        }
      }
      // horizontal lines
      for (let r = 0; r < rows; r++) {
        ctx.beginPath();
        ctx.moveTo(0, r * spacing);
        ctx.lineTo(c.width, r * spacing);
        ctx.strokeStyle = `rgba(201,168,76,0.03)`;
        ctx.stroke();
      }
      // vertical lines
      for (let col = 0; col < cols; col++) {
        ctx.beginPath();
        ctx.moveTo(col * spacing, 0);
        ctx.lineTo(col * spacing, c.height);
        ctx.stroke();
      }
      raf = requestAnimationFrame(draw);
    };
    draw();
    return () => { window.removeEventListener("resize", resize); cancelAnimationFrame(raf); };
  }, []);

  const scrollToSection = (id: string) => {
    setActiveTab(id);
    const el = document.getElementById(id);
    if (el) {
      const top = el.getBoundingClientRect().top + window.scrollY - 130;
      window.scrollTo({ top, behavior: "smooth" });
    }
  };

  const scrollTrack = (id: string, dir: number) => {
    const el = serviceTrackRefs.current[id];
    if (el) el.scrollBy({ left: dir * 380, behavior: "smooth" });
  };

  return (
    <PasswordGate>
      <div className="cursor-dot" ref={dotRef} />
      <div className="cursor-ring" ref={ringRef} />
      <canvas className="particle-canvas" ref={canvasRef} />
      <div className="orb orb-1" ref={orbRef1} />
      <div className="orb orb-2" ref={orbRef2} />
      <SiteNav />

      {/* ── Hero with animated grid ── */}
      <section className="cap-hero">
        <Image src={HERO_IMG} alt="Capabilities" fill priority sizes="100vw" className="cap-hero-img" />
        <div className="cap-hero-overlay" />
        <canvas className="cap-grid-canvas" ref={gridCanvasRef} />
        <div className="cap-hero-content reveal">
          <div className="cap-hero-badge">
            <span className="cap-hero-badge-dot" />
            <span>Integrated Advisory</span>
          </div>
          <h1 className="cap-hero-title">
            Strategy. Operations.<br /><em>Technology.</em>
          </h1>
          <p className="cap-hero-subtitle">
            Three disciplines, one mission—navigating complexity to deliver measurable, lasting transformation for the organizations we serve.
          </p>
          <div className="cap-hero-nav">
            {capabilitySections.map((s) => (
              <button key={s.id} className="cap-hero-nav-btn" onClick={() => scrollToSection(s.id)}>
                <span>{s.name}</span>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M7 17L17 7M17 7H7M17 7v10" /></svg>
              </button>
            ))}
          </div>
        </div>
        <div className="hero-scroll"><span>Scroll</span><div className="scroll-line" /></div>
      </section>

      {/* ── Sticky Tab Bar ── */}
      <div className="cap-tab-bar">
        <div className="cap-tab-bar-inner">
          {capabilitySections.map((s, i) => (
            <button key={s.id} className={`cap-tab${activeTab === s.id ? " active" : ""}`} onClick={() => scrollToSection(s.id)}>
              <span className="cap-tab-num">0{i + 1}</span>
              {s.name}
            </button>
          ))}
        </div>
      </div>

      {/* ── Capability Sections ── */}
      {capabilitySections.map((section, sIdx) => (
        <section key={section.id} id={section.id} className="cap-section">
          {/* Section intro: full-width image with overlaid text */}
          <div className="cap-section-banner reveal">
            <div className="cap-section-img-wrap">
              <Image src={section.image} alt={section.name} fill sizes="100vw" className="cap-section-img" />
              <div className="cap-section-img-overlay" />
            </div>
            <div className="cap-banner-content">
              <div className="cap-banner-number">0{sIdx + 1}</div>
              <h2 className="cap-banner-title">{section.name}</h2>
              <p className="cap-banner-tagline">{section.tagline}</p>
            </div>
          </div>

          {/* Description + focus row */}
          <div className="cap-desc-row reveal">
            <div className="cap-desc-focus">
              <div className="cap-focus-bar" />
              <p className="cap-focus-text">{section.focus}</p>
            </div>
            <p className="cap-desc-body">{section.description}</p>
          </div>

          {/* Horizontal scroll service cards */}
          <div className="cap-services-wrap">
            <div className="cap-services-header">
              <span className="cap-services-count">{section.services.length} Services</span>
              <div className="cap-services-arrows">
                <button className="cap-arrow-btn" onClick={() => scrollTrack(section.id, -1)} aria-label="Previous">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M15 18l-6-6 6-6" /></svg>
                </button>
                <button className="cap-arrow-btn" onClick={() => scrollTrack(section.id, 1)} aria-label="Next">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M9 18l6-6-6-6" /></svg>
                </button>
              </div>
            </div>
            <div
              className="cap-services-track"
              ref={(el) => { serviceTrackRefs.current[section.id] = el; }}
            >
              {section.services.map((svc, i) => {
                const isOpen = expandedService === `${section.id}-${i}`;
                return (
                  <div
                    key={svc.title}
                    className={`cap-svc-card${isOpen ? " expanded" : ""}`}
                    onClick={() => setExpandedService(isOpen ? null : `${section.id}-${i}`)}
                  >
                    <div className="cap-svc-index">
                      <span>{String(i + 1).padStart(2, "0")}</span>
                    </div>
                    <h3 className="cap-svc-title">{svc.title}</h3>
                    <div className="cap-svc-expand-icon">
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                        <line x1="12" y1="5" x2="12" y2="19" className="cap-svc-vline" />
                        <line x1="5" y1="12" x2="19" y2="12" />
                      </svg>
                    </div>
                    <div className="cap-svc-desc-wrap">
                      <p className="cap-svc-desc">{svc.desc}</p>
                    </div>
                    <div className="cap-svc-glow" />
                  </div>
                );
              })}
            </div>
          </div>

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
    </PasswordGate>
  );
}
