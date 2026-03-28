"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import SiteNav from "@/components/site-nav";
import SiteFooter from "@/components/site-footer";
import PasswordGate from "@/components/password-gate";

const HERO_IMG = "https://images.unsplash.com/photo-1474631245212-32dc3c8310c6?w=1920&q=80";

const channels = [
  {
    id: "thought-leadership",
    href: "/insights/thought-leadership",
    title: "Thought Leadership",
    subtitle: "Expert perspectives",
    desc: "In-depth Q&As, analysis, and practitioner insights from our advisory team—covering data governance, workforce transformation, strategic planning, and the evolving landscape of public infrastructure.",
    image: "https://images.unsplash.com/photo-1553877522-43269d4ea984?w=800&q=80",
    cta: "Read Articles",
    accent: "#c9a84c",
  },
  {
    id: "podcast",
    href: "/insights/podcast",
    title: "The Rawlins Way",
    subtitle: "Podcast",
    desc: "Candid conversations about the real challenges facing transportation agencies and complex organizations. Our team and guests break down what it actually takes to lead change.",
    image: "https://images.unsplash.com/photo-1478737270239-2f02b77fc618?w=800&q=80",
    cta: "Listen Now",
    accent: "#d4be78",
  },
  {
    id: "case-studies",
    href: "/insights/case-studies",
    title: "Case Studies",
    subtitle: "Impact in action",
    desc: "Detailed accounts of how we've helped agencies and enterprises overcome operational hurdles, modernize systems, and deliver measurable results across complex programs.",
    image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800&q=80",
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

  useEffect(() => {
    let ob: IntersectionObserver;
    const raf = requestAnimationFrame(() => {
      const els = document.querySelectorAll(".reveal");
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
      }, 150);
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

  /* Waveform canvas for hero */
  const waveRef = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const c = waveRef.current;
    if (!c) return;
    const ctx = c.getContext("2d");
    if (!ctx) return;
    let raf: number;
    const resize = () => { c.width = c.offsetWidth * 2; c.height = c.offsetHeight * 2; ctx.scale(2, 2); };
    resize();
    let t = 0;
    const draw = () => {
      t += 0.02;
      ctx.clearRect(0, 0, c.offsetWidth, c.offsetHeight);
      const w = c.offsetWidth;
      const h = c.offsetHeight;
      for (let wave = 0; wave < 3; wave++) {
        ctx.beginPath();
        const amp = 12 + wave * 8;
        const freq = 0.008 - wave * 0.001;
        const offset = wave * 1.2;
        const alpha = 0.08 - wave * 0.02;
        for (let x = 0; x <= w; x++) {
          const y = h / 2 + Math.sin(x * freq + t + offset) * amp + Math.sin(x * freq * 2.5 + t * 1.5) * (amp * 0.3);
          if (x === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }
        ctx.strokeStyle = `rgba(201,168,76,${alpha})`;
        ctx.lineWidth = 1;
        ctx.stroke();
      }
      raf = requestAnimationFrame(draw);
    };
    draw();
    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <PasswordGate>
      <div className="cursor-dot" ref={dotRef} />
      <div className="cursor-ring" ref={ringRef} />
      <canvas className="particle-canvas" ref={canvasRef} />
      <div className="orb orb-1" ref={orbRef1} />
      <div className="orb orb-2" ref={orbRef2} />
      <SiteNav />

      {/* ── Hero ── */}
      <section className="ins-hero">
        <Image src={HERO_IMG} alt="Insights" fill priority sizes="100vw" className="ins-hero-img" />
        <div className="ins-hero-overlay" />
        <canvas className="ins-wave-canvas" ref={waveRef} />
        <div className="ins-hero-content reveal">
          <p className="ins-hero-label">
            <span className="gold-text">Knowledge &amp; Perspective</span>
          </p>
          <h1 className="ins-hero-title">
            Insights that <em>inform</em> action
          </h1>
          <p className="ins-hero-subtitle">
            Original research, practitioner perspectives, and real-world case studies from the front lines of organizational transformation.
          </p>
        </div>
        <div className="hero-scroll"><span>Scroll</span><div className="scroll-line" /></div>
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

      {/* ── Why Insights Matter ── */}
      <div className="parallax-panel">
        <p className="parallax-text reveal">
          The organizations that thrive are the ones that never stop <em>learning</em>.
        </p>
      </div>

      {/* ── CTA ── */}
      <section className="ins-cta reveal">
        <div className="ins-cta-inner">
          <h2 className="ins-cta-title">Have a topic you&rsquo;d like us to cover?</h2>
          <p className="ins-cta-text">
            We&rsquo;re always exploring new questions at the intersection of strategy, technology, and public service. Reach out to start a conversation.
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
