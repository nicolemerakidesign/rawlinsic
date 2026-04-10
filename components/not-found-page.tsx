"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import SiteNav from "@/components/site-nav";
import SiteFooter from "@/components/site-footer";

export default function NotFoundPage() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const dot = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;
    let mouseX = 0, mouseY = 0, ringX = 0, ringY = 0;
    let rafId: number;
    const onMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      dot.style.left = mouseX - 4 + "px";
      dot.style.top = mouseY - 4 + "px";
    };
    const animate = () => {
      ringX += (mouseX - ringX) * 0.12;
      ringY += (mouseY - ringY) * 0.12;
      ring.style.left = ringX - 20 + "px";
      ring.style.top = ringY - 20 + "px";
      rafId = requestAnimationFrame(animate);
    };
    document.addEventListener("mousemove", onMove);
    rafId = requestAnimationFrame(animate);
    return () => {
      document.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <>
      <div className="cursor-dot" ref={dotRef} />
      <div className="cursor-ring" ref={ringRef} />
      <div className="ambient-bg" />
      <div className="ambient-orbs">
        <div className="orb orb-1" />
        <div className="orb orb-2" />
        <div className="orb orb-3" />
        <div className="orb orb-4" />
      </div>

      <SiteNav />

      <main className="nf-main" id="top">
        <div className="nf-content">
          <span className="hero-label">
            <span className="gold-text">Error 404</span>
          </span>
          <h1 className="hero-title nf-title">
            Page <em>not found</em>
          </h1>
          <p className="hero-sub nf-sub">
            The page you were looking for has moved, been retired, or never existed. Let&rsquo;s
            get you back on track.
          </p>

          <div className="nf-actions">
            <Link href="/" className="auto-hero-btn">
              <span>Back to Home</span>
            </Link>
            <Link href="/contact" className="nf-secondary-btn">
              <span>Contact Us</span>
            </Link>
          </div>
        </div>
      </main>

      <SiteFooter />
    </>
  );
}
