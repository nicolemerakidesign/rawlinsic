"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import SiteNav from "@/components/site-nav";
import SiteFooter from "@/components/site-footer";
import PasswordGate from "@/components/password-gate";

const HERO_IMG = "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=compress&cs=tinysrgb&w=1920";
const DATA_IMG = "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=compress&cs=tinysrgb&w=1200";
const WORKFLOW_IMG = "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=compress&cs=tinysrgb&w=1200";
const AI_IMG = "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=compress&cs=tinysrgb&w=1200";
const TEAM_IMG = "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=compress&cs=tinysrgb&w=1200";
const CONNECT_IMG = "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=compress&cs=tinysrgb&w=1200";
const DASHBOARD_IMG = "https://images.unsplash.com/photo-1551434678-e076c223a692?auto=compress&cs=tinysrgb&w=1200";
const NETWORK_IMG = "https://images.unsplash.com/photo-1544197150-b99a580bb7a8?auto=compress&cs=tinysrgb&w=1200";

const benefits = [
  { icon: "M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z", title: "Make better decisions", desc: "Up-to-date information in one place" },
  { icon: "M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z", title: "Achieve goals faster", desc: "Accomplish in less time" },
  { icon: "M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z", title: "Prioritize creativity", desc: "Focus on problem-solving over repetitive work" },
  { icon: "M13 10V3L4 14h7v7l9-11h-7z", title: "Innovate quickly", desc: "Accelerate the pace of innovation" },
];

const orgValues = [
  { title: "Optimize resources", desc: "Optimize the use of diverse resources across your organization." },
  { title: "Boost efficiency", desc: "Routine processes that take hours or days can be done in seconds, reducing errors." },
  { title: "Scale team impact", desc: "Scale the impact of teams beyond what manual processes allow." },
  { title: "Enhance responsiveness", desc: "React faster to changing conditions and stakeholder needs." },
  { title: "Support resilience", desc: "Standardized tasks support continuity of operations and enable faster response when needs evolve." },
  { title: "Support human talent", desc: "Free your people to focus on high-value work that requires human judgment." },
];

const pipeline = [
  { step: "01", label: "Data Governance", desc: "People bring trust to data through data governance.", color: "#c9a84c" },
  { step: "02", label: "Automation", desc: "Automation transforms workflows using clean, structured data.", color: "#d4b878" },
  { step: "03", label: "AI", desc: "AI recognizes patterns, makes predictions, evaluates alternatives, and adapts outputs over time.", color: "#e8d5a0" },
  { step: "04", label: "Human Validation", desc: "People validate AI results by applying context and judgment, then turn AI outputs into actionable insights.", color: "#c9a84c" },
];

const challenges = [
  { title: "Disconnected tools", solution: "We enable your systems to work together efficiently.", img: CONNECT_IMG },
  { title: "Duplicated work", solution: "We design and implement platforms that streamline processes, eliminate manual mistakes in routine workflows, and move data where people need it.", img: DASHBOARD_IMG },
  { title: "Fragmented information landscape", solution: "We integrate systems via a central hub to provide timely information in a unified view.", img: NETWORK_IMG },
  { title: "Capability gap", solution: "We equip teams in automation and help organizations apply AI effectively and responsibly. We guide leaders and organizations through the challenges of automation and AI, helping teams adapt to embrace new technologies and work practices.", img: TEAM_IMG },
];

export default function AutomationPage() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const mouseX = useRef(0);
  const mouseY = useRef(0);
  const ringX = useRef(0);
  const ringY = useRef(0);

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

  const [openChallenge, setOpenChallenge] = useState<number | null>(null);

  return (
    <>
      <div className="cursor-dot" ref={dotRef} />
      <div className="cursor-ring" ref={ringRef} />
    <PasswordGate>
      <div className="ambient-bg" />
      <div className="ambient-orbs">
        <div className="orb orb-1" /><div className="orb orb-2" /><div className="orb orb-3" /><div className="orb orb-4" />
      </div>

      <SiteNav />

      {/* ── Hero ── */}
      <section className="aam-hero aam-parallax-fixed" style={{ backgroundImage: `url(${HERO_IMG})` }}>
        <div className="aam-hero-overlay" />
        <div className="aam-hero-content">
          <span className="hero-label"><span className="gold-text">Technology</span></span>
          <h1 className="hero-title">Systems <em>Automation</em> &amp; AI</h1>
          <p className="hero-sub" style={{ opacity: 1, transform: "none", animation: "none" }}>
            Partnering to reshape the way people work
          </p>
          <Link href="/contact" className="hero-cta-btn" style={{ opacity: 1, transform: "none", animation: "none" }}>
            <span>Explore solutions</span>
          </Link>
        </div>
        <div className="hero-scroll"><span>Scroll</span><div className="scroll-line" /></div>
      </section>

      <div className="section-divider"><div className="gold-line" /></div>

      {/* ── Benefits: Help People Thrive ── */}
      <section className="aam-section" style={{ padding: "100px 48px" }}>
        <div className="aam-container">
          <div className="aam-section-header reveal">
            <p className="section-label"><span className="gold-text">Human-Centered Automation</span></p>
            <h2 className="section-title">How can automation help people <em>thrive?</em></h2>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: "32px", marginTop: "60px" }}>
            {benefits.map((b, i) => (
              <div key={i} className="reveal" style={{ padding: "40px 32px", border: "1px solid rgba(201,168,76,0.1)", borderRadius: "12px", background: "rgba(6,12,22,0.4)", transition: "all 0.3s" }}>
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#c9a84c" strokeWidth="1.5" style={{ marginBottom: "20px" }}>
                  <path d={b.icon} />
                </svg>
                <h3 style={{ fontFamily: "var(--font-cormorant), serif", fontSize: "24px", fontWeight: 400, color: "#fff", marginBottom: "8px" }}>{b.title}</h3>
                <p style={{ fontSize: "15px", color: "rgba(232,230,225,0.7)", lineHeight: 1.7 }}>{b.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Parallax Quote */}
      <div className="parallax-panel aam-parallax-fixed" style={{ backgroundImage: `url(${DATA_IMG})` }}>
        <div className="aam-parallax-overlay" />
        <p className="parallax-text1 reveal" style={{ position: "relative", zIndex: 2 }}>
          Strategic multimodal integration.<br /><em>Built on real-world success.</em>
        </p>
      </div>

      <div className="section-divider"><div className="gold-line" /></div>

      {/* ── Organizational Value ── */}
      <section className="aam-section" style={{ padding: "100px 48px" }}>
        <div className="aam-container">
          <div className="aam-section-header reveal">
            <p className="section-label"><span className="gold-text">Organizational Impact</span></p>
            <h2 className="section-title">How automation delivers <em>value</em></h2>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(340px, 1fr))", gap: "24px", marginTop: "60px" }}>
            {orgValues.map((v, i) => (
              <div key={i} className="reveal" style={{ display: "flex", gap: "20px", padding: "28px 24px", borderLeft: "2px solid rgba(201,168,76,0.3)", transition: "all 0.3s" }}>
                <span style={{ fontFamily: "var(--font-cormorant), serif", fontSize: "32px", fontWeight: 300, background: "linear-gradient(145deg, #c9a84c, #e8d5a0, #d4b878)", WebkitBackgroundClip: "text", backgroundClip: "text", color: "transparent", lineHeight: 1 }}>
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div>
                  <h3 style={{ fontSize: "18px", fontWeight: 600, color: "#fff", marginBottom: "6px" }}>{v.title}</h3>
                  <p style={{ fontSize: "15px", color: "rgba(232,230,225,0.7)", lineHeight: 1.7 }}>{v.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="section-divider"><div className="gold-line" /></div>

      {/* ── Pipeline: How it works together ── */}
      <section className="aam-section" style={{ padding: "100px 48px" }}>
        <div className="aam-container">
          <div className="aam-section-header reveal">
            <p className="section-label"><span className="gold-text">The Ecosystem</span></p>
            <h2 className="section-title">How data governance, automation, and <em>AI</em> work together</h2>
          </div>
          <div style={{ display: "flex", gap: "0", marginTop: "60px", flexWrap: "wrap" }}>
            {pipeline.map((p, i) => (
              <div key={i} className="reveal" style={{ flex: "1 1 240px", padding: "48px 32px", position: "relative", borderTop: `3px solid ${p.color}`, background: "rgba(6,12,22,0.3)" }}>
                <span style={{ fontFamily: "var(--font-cormorant), serif", fontSize: "48px", fontWeight: 300, color: p.color, opacity: 0.3, position: "absolute", top: "16px", right: "20px" }}>{p.step}</span>
                <h3 style={{ fontSize: "20px", fontWeight: 600, color: "#fff", marginBottom: "12px" }}>{p.label}</h3>
                <p style={{ fontSize: "15px", color: "rgba(232,230,225,0.75)", lineHeight: 1.75 }}>{p.desc}</p>
                {i < pipeline.length - 1 && (
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#c9a84c" strokeWidth="1.5" style={{ position: "absolute", right: "-12px", top: "50%", transform: "translateY(-50%)", zIndex: 2, display: "none" }} className="pipeline-arrow">
                    <path d="M9 18l6-6-6-6" />
                  </svg>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Parallax Quote 2 */}
      <div className="parallax-panel aam-parallax-fixed" style={{ backgroundImage: `url(${WORKFLOW_IMG})` }}>
        <div className="aam-parallax-overlay" />
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
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "48px", marginTop: "60px", alignItems: "center" }}>
            <div className="reveal">
              <div style={{ position: "relative", borderRadius: "12px", overflow: "hidden", aspectRatio: "4/3" }}>
                <Image src={AI_IMG} alt="AI and automation" fill sizes="(max-width: 768px) 100vw, 50vw" style={{ objectFit: "cover" }} />
                <div style={{ position: "absolute", inset: 0, background: "linear-gradient(135deg, rgba(6,12,22,0.2), rgba(6,12,22,0.5))" }} />
              </div>
            </div>
            <div className="reveal">
              <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: "24px" }}>
                <li style={{ paddingLeft: "20px", borderLeft: "2px solid rgba(201,168,76,0.4)", fontSize: "17px", color: "rgba(232,230,225,0.85)", lineHeight: 1.8 }}>
                  We design and implement digital solutions that help people work smarter and more creatively.
                </li>
                <li style={{ paddingLeft: "20px", borderLeft: "2px solid rgba(201,168,76,0.4)", fontSize: "17px", color: "rgba(232,230,225,0.85)", lineHeight: 1.8 }}>
                  We reduce manual effort, streamline and connect workflows, and establish effective <Link href="/capabilities" style={{ color: "#c9a84c", textDecoration: "underline", textUnderlineOffset: "4px" }}>data governance</Link> practices.
                </li>
                <li style={{ paddingLeft: "20px", borderLeft: "2px solid rgba(201,168,76,0.4)", fontSize: "17px", color: "rgba(232,230,225,0.85)", lineHeight: 1.8 }}>
                  We develop high-value AI use cases and a roadmap for adoption and scaling.
                </li>
                <li style={{ paddingLeft: "20px", borderLeft: "2px solid rgba(201,168,76,0.4)", fontSize: "17px", color: "rgba(232,230,225,0.85)", lineHeight: 1.8 }}>
                  We partner to guide <Link href="/capabilities" style={{ color: "#c9a84c", textDecoration: "underline", textUnderlineOffset: "4px" }}>organizational change</Link> by cultivating the culture required for new ways of working.
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <div className="section-divider"><div className="gold-line" /></div>

      {/* ── Addressing Key Challenges ── */}
      <section className="aam-section" style={{ padding: "100px 48px" }}>
        <div className="aam-container">
          <div className="aam-section-header reveal">
            <p className="section-label"><span className="gold-text">Addressing Key Challenges</span></p>
            <h2 className="section-title">Elevate human <em>potential</em> throughout your organization</h2>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "28px", marginTop: "60px" }}>
            {challenges.map((c, i) => (
              <div
                key={i}
                className="reveal"
                onClick={() => setOpenChallenge(openChallenge === i ? null : i)}
                style={{
                  position: "relative", borderRadius: "12px", overflow: "hidden",
                  border: "1px solid rgba(201,168,76,0.1)", cursor: "pointer",
                  transition: "all 0.3s",
                }}
              >
                <div style={{ position: "relative", height: "220px" }}>
                  <Image src={c.img} alt={c.title} fill sizes="(max-width: 768px) 100vw, 50vw" style={{ objectFit: "cover" }} />
                  <div style={{ position: "absolute", inset: 0, background: "linear-gradient(180deg, rgba(6,12,22,0.3) 0%, rgba(6,12,22,0.85) 100%)" }} />
                  <div style={{ position: "absolute", bottom: "24px", left: "24px", right: "24px", zIndex: 2 }}>
                    <span style={{ fontSize: "12px", fontWeight: 600, letterSpacing: "2px", textTransform: "uppercase", background: "linear-gradient(145deg, #c9a84c, #e8d5a0, #d4b878)", WebkitBackgroundClip: "text", backgroundClip: "text", color: "transparent" }}>Challenge</span>
                    <h3 style={{ fontFamily: "var(--font-cormorant), serif", fontSize: "24px", fontWeight: 400, color: "#fff", marginTop: "4px" }}>{c.title}</h3>
                  </div>
                </div>
                <div style={{ padding: "24px", background: "rgba(6,12,22,0.6)", maxHeight: openChallenge === i ? "300px" : "0", overflow: "hidden", transition: "max-height 0.4s ease, padding 0.4s ease", ...(openChallenge !== i ? { padding: "0 24px" } : {}) }}>
                  <p style={{ fontSize: "16px", color: "rgba(232,230,225,0.85)", lineHeight: 1.8 }}>{c.solution}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="section-divider"><div className="gold-line" /></div>

      {/* ── CTA ── */}
      <section className="aam-section aam-cta-section aam-parallax-fixed" style={{ backgroundImage: `url(${TEAM_IMG})` }}>
        <div className="aam-parallax-overlay" />
        <div className="aam-cta-wrap" style={{ position: "relative", zIndex: 2, textAlign: "center", padding: "0 32px" }}>
          <p className="section-label"><span className="gold-text">Get Started</span></p>
          <h2 className="section-title" style={{ color: "#fff", marginBottom: "20px" }}>Ready to transform how your organization works?</h2>
          <p style={{ fontSize: "17px", color: "rgba(232,230,225,0.8)", lineHeight: 1.8, maxWidth: "600px", margin: "0 auto 40px" }}>
            Let&rsquo;s discuss how automation and AI can elevate your team&rsquo;s capabilities.
          </p>
          <Link href="/contact" className="cs-cta-btn"><span>Connect With Us</span></Link>
        </div>
      </section>

      <div className="section-divider"><div className="gold-line" /></div>
      <SiteFooter />
    </PasswordGate>
    </>
  );
}
