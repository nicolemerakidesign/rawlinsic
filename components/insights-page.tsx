"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import SiteNav from "@/components/site-nav";
import SiteFooter from "@/components/site-footer";
import PasswordGate from "@/components/password-gate";

const HERO_IMG = "/images/pages/insights-hero.jpg";

const channels = [
  {
    id: "thought-leadership",
    href: "/insights/thought-leadership",
    title: "Thought Leadership",
    subtitle: "Expert perspectives",
    desc: "In-depth Q&As, analysis, and practitioner insights from our advisory team—covering data governance, workforce transformation, strategic planning, and the evolving landscape of public infrastructure.",
    image: "/images/pages/insights-card-2.jpg",
    cta: "Read Articles",
    accent: "#c9a84c",
  },
  {
    id: "podcast",
    href: "/insights/podcast",
    title: "The Rawlins Way",
    subtitle: "Podcast",
    desc: "Candid conversations about the real challenges facing transportation agencies and complex organizations. Our team and guests break down what it actually takes to lead change.",
    image: "/images/pages/insights-card-3.jpg",
    cta: "Listen Now",
    accent: "#d4be78",
  },
  {
    id: "case-studies",
    href: "/insights/case-studies",
    title: "Case Studies",
    subtitle: "Impact in action",
    desc: "Detailed accounts of how we've helped agencies and enterprises overcome operational hurdles, modernize systems, and deliver measurable results across complex programs.",
    image: "/images/pages/auto-optimize.jpg",
    cta: "Explore Cases",
    accent: "#e0cfa0",
  },
];

export default function InsightsPage() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const mouseX = useRef(0);
  const mouseY = useRef(0);
  const ringX = useRef(0);
  const ringY = useRef(0);
  const animFrame = useRef<number | null>(null);

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

  /* ── Scroll handler: sticky nav background ── */
  useEffect(() => {
    const nav = document.getElementById("mainNav");
    const onScroll = () => {
      if (nav) nav.classList.toggle("scrolled", window.scrollY > 60);
    };
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

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

  return (
    <PasswordGate>
      <div className="ambient-bg" />
      <div className="ambient-orbs">
        <div className="orb orb-1" ref={orbRef1} />
        <div className="orb orb-2" ref={orbRef2} />
        <div className="orb orb-3" />
        <div className="orb orb-4" />
      </div>
      <div className="cursor-dot" ref={dotRef} />
      <div className="cursor-ring" ref={ringRef} />
      <canvas className="particle-canvas" ref={canvasRef} />
      <SiteNav />

      {/* ── Hero — parallax fixed background ── */}
      <section className="aam-hero aam-parallax-fixed" style={{ backgroundImage: `url(${HERO_IMG})` }}>
        <div className="aam-hero-overlay" style={{ background: "rgba(6,12,22,0.82)" }} />
        <div className="aam-hero-content">
          <span className="hero-label"><span className="gold-text">Knowledge &amp; Perspective</span></span>
          <h1 className="hero-title">Insights that <em>inform</em> action</h1>
          <p className="hero-sub">
            Original research, practitioner perspectives, and real-world case studies from the front lines of organizational transformation.
          </p>
        </div>
        <div className="hero-scroll"><span style={{ background: "linear-gradient(145deg, #c9a84c, #e8d5a0, #d4b878)", WebkitBackgroundClip: "text", backgroundClip: "text", color: "transparent", fontSize: "0.6rem", letterSpacing: "3px", textTransform: "uppercase" as const }}>Scroll</span><div className="scroll-line" /></div>
      </section>

      {/* ── Channel Cards ── */}
      <section className="ins-channels">
        <div className="ins-channels-inner">
          {channels.map((ch, i) => (
            <Link href={ch.href} key={ch.id} className={`ins-channel-card reveal rd${i}`}>
              <div className="ins-channel-img-wrap">
                <Image src={ch.image} alt={ch.title} fill sizes="(max-width: 768px) 100vw, 33vw" className="ins-channel-img" />
                <div className="ins-channel-img-overlay" />
              </div>
              <div className="ins-channel-body">
                <span className="ins-channel-subtitle">{ch.subtitle}</span>
                <h2 className="ins-channel-title">{ch.title}</h2>
                <span className="ins-channel-expand-hint">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="12" y1="5" x2="12" y2="19" />
                    <line x1="5" y1="12" x2="19" y2="12" />
                  </svg>
                </span>
                <p className="ins-channel-desc">{ch.desc}</p>
                <span className="ins-channel-cta">
                  {ch.cta}
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M7 17L17 7M17 7H7M17 7v10" />
                  </svg>
                </span>
              </div>
              <div className="ins-channel-accent" style={{ background: `linear-gradient(180deg, ${ch.accent}, transparent)` }} />
            </Link>
          ))}
        </div>
      </section>

      {/* ── Quote Panel ── */}
      <div className="parallax-panel">
        <p className="parallax-text reveal">
          Organizations that thrive are the ones that never stop <em>learning</em>.
        </p>
      </div>

      {/* ── CTA ── */}
      <section style={{ padding: "100px 48px 120px", textAlign: "center", position: "relative" }}>
        <div style={{ maxWidth: "900px", margin: "0 auto", position: "relative", zIndex: 10 }}>
          <p className="section-label"><span className="gold-text">Start a Conversation</span></p>
          <h2 className="section-title" style={{ marginBottom: "20px", textAlign: "center" }}>
            Have a <em>topic</em> you&rsquo;d like to discuss?
          </h2>
          <p className="hero-sub" style={{ opacity: 1, transform: "none", animation: "none", textAlign: "center" }}>
            We&rsquo;re always exploring new questions and emerging needs shaping how organizations plan, deliver, and evolve&mdash;particularly in transportation and increasingly across other sectors.
          </p>
          <Link href="/contact" className="auto-hero-btn" style={{ opacity: 1, transform: "none", animation: "none" }}>
            <span>Get In Touch</span>
          </Link>
        </div>
      </section>

      <SiteFooter />
    </PasswordGate>
  );
}
