"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import SiteNav from "@/components/site-nav";
import SiteFooter from "@/components/site-footer";

interface FormData {
  name: string;
  email: string;
  organization: string;
  interest: string;
  message: string;
}

export default function ContactPage() {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    organization: "",
    interest: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  // Cursor refs
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const mouseX = useRef(0);
  const mouseY = useRef(0);
  const ringX = useRef(0);
  const ringY = useRef(0);
  const animFrame = useRef<number | null>(null);

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

    const hoverEls = document.querySelectorAll(
      "a, button, .nav-item, .back-to-top, .contact-detail-item"
    );
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

    for (let i = 0; i < 15; i++) {
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

    return () => {
      container.innerHTML = "";
    };
  }, []);

  // Nav scroll + back-to-top
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
    const reveals = document.querySelectorAll(".reveal");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) entry.target.classList.add("visible");
        });
      },
      { threshold: 0.1, rootMargin: "0px 0px -40px 0px" }
    );
    reveals.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    console.log("Contact form submitted:", formData);
    // Simulate network delay
    await new Promise((r) => setTimeout(r, 1200));
    setSubmitting(false);
    setSubmitted(true);
  };

  const resetForm = () => {
    setSubmitted(false);
    setFormData({ name: "", email: "", organization: "", interest: "", message: "" });
  };

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
        <svg viewBox="0 0 24 24">
          <path d="M12 19V5M5 12l7-7 7 7" />
        </svg>
      </a>

      <SiteNav ctaHref="#contact-form" />

      <div className="content-wrapper">

        {/* ── Contact Hero ── */}
        <section className="contact-hero" id="top">
          <div className="contact-hero-content">
            <p className="section-label" style={{ textAlign: "center" }}>
              <span className="gold-text">contact rawlins</span>
            </p>
            <h1 className="hero-title">
              Ready to <em>partner</em> with <em>purpose?</em>
            </h1>
            <p className="hero-sub">
              Whether you&rsquo;re ready to engage or simply exploring what&rsquo;s
              possible, we&rsquo;d love to hear from you.
            </p>
          </div>
        </section>

        {/* Divider */}
        <div className="section-divider">
          <div className="gold-line" />
        </div>

        {/* ── Contact Section ── */}
        <section className="section-contact" id="contact-form">
          <div className="contact-wrapper">
            {/* Left: Contact Information */}
            <div className="contact-info reveal">
              <p className="section-label">
                <span className="gold-text">Get In Touch</span>
              </p>
              <h2 className="section-title">
                Send us a message
              </h2>
              <p className="section-text" style={{ marginBottom: "48px" }}>
                Our team is here to listen, advise, and partner with you. Share a
                bit about your organization and what you&rsquo;re working through
                &mdash; we&rsquo;ll take it from there.
              </p>

              <div className="contact-details">
                <div className="contact-detail-item reveal rd1">
                  <div className="contact-detail-icon">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                      <polyline points="22,6 12,13 2,6" />
                    </svg>
                  </div>
                  <div>
                    <div className="contact-detail-label">Email Us</div>
                    <a
                      href="mailto:info@rawlinsic.com"
                      className="contact-detail-value"
                    >
                      info@rawlinsic.com
                    </a>
                  </div>
                </div>

                <div className="contact-detail-item reveal rd2">
                  <div className="contact-detail-icon">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                      <path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6z" />
                      <rect x="2" y="9" width="4" height="12" />
                      <circle cx="4" cy="4" r="2" />
                    </svg>
                  </div>
                  <div>
                    <div className="contact-detail-label">Connect</div>
                    <a
                      href="https://linkedin.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="contact-detail-value"
                    >
                      LinkedIn &rarr;
                    </a>
                  </div>
                </div>

                <div className="contact-detail-item reveal rd3">
                  <div className="contact-detail-icon">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                      <circle cx="12" cy="12" r="10" />
                      <line x1="2" y1="12" x2="22" y2="12" />
                      <path d="M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z" />
                    </svg>
                  </div>
                  <div>
                    <div className="contact-detail-label">Global Presence</div>
                    <span
                      className="contact-detail-value"
                      style={{ color: "rgba(232,230,225,0.6)" }}
                    >
                      Based in Reno, NV, USA &middot; Working Internationally
                    </span>
                  </div>
                </div>
              </div>

              <div className="contact-divider" />

        
            </div>

            {/* Right: Contact Form */}
            <div className="contact-form-wrap reveal rd2">
              {!submitted ? (
                <form className="contact-form" onSubmit={handleSubmit} noValidate>
                  <div className="form-row">
                    <div className="form-group">
                      <label className="form-label" htmlFor="name">
                        Full Name <span className="form-required">*</span>
                      </label>
                      <input
                        className="form-input"
                        id="name"
                        name="name"
                        type="text"
                        placeholder="Your full name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        autoComplete="name"
                      />
                    </div>
                    <div className="form-group">
                      <label className="form-label" htmlFor="email">
                        Email Address <span className="form-required">*</span>
                      </label>
                      <input
                        className="form-input"
                        id="email"
                        name="email"
                        type="email"
                        placeholder="your@email.com"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        autoComplete="email"
                      />
                    </div>
                  </div>

                  <div className="form-group">
                    <label className="form-label" htmlFor="organization">
                      Organization
                    </label>
                    <input
                      className="form-input"
                      id="organization"
                      name="organization"
                      type="text"
                      placeholder="Your organization or agency"
                      value={formData.organization}
                      onChange={handleChange}
                      autoComplete="organization"
                    />
                  </div>

                  <div className="form-group">
                    <label className="form-label" htmlFor="interest">
                      Area of Interest
                    </label>
                    <select
                      className="form-input form-select"
                      id="interest"
                      name="interest"
                      value={formData.interest}
                      onChange={handleChange}
                    >
                      <option value="" disabled>
                        Select a practice area
                      </option>
                      <option value="strategy">Strategy</option>
                      <option value="operations">Operations</option>
                      <option value="technology">Technology</option>
                      <option value="aero">Advanced Air Mobility</option>
                      <option value="general">General Inquiry</option>
                    </select>
                  </div>

                  <div className="form-group">
                    <label className="form-label" htmlFor="message">
                      Message <span className="form-required">*</span>
                    </label>
                    <textarea
                      className="form-input form-textarea"
                      id="message"
                      name="message"
                      placeholder="Tell us about your organization and what you're working through..."
                      value={formData.message}
                      onChange={handleChange}
                      required
                      rows={6}
                    />
                  </div>

                  <button
                    type="submit"
                    className="form-submit"
                    disabled={submitting}
                  >
                    {submitting ? (
                      <span className="form-submit-inner">
                        <span className="form-spinner" />
                        <span>Sending&hellip;</span>
                      </span>
                    ) : (
                      <span className="form-submit-inner">
                        <span>Send Message</span>
                        <svg
                          width="18"
                          height="18"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                        >
                          <path d="M5 12h14M12 5l7 7-7 7" />
                        </svg>
                      </span>
                    )}
                  </button>
                </form>
              ) : (
                <div className="form-success">
                  <div className="form-success-icon">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                  </div>
                  <h3 className="form-success-title">Message Received</h3>
                  <p className="form-success-text">
                    Thank you for reaching out. A member of our team will be in
                    touch within one to two business days.
                  </p>
                  <button className="form-success-reset" onClick={resetForm}>
                    Send Another Message
                  </button>
                </div>
              )}
            </div>
          </div>
        </section>

        {/* Divider */}
        <div className="section-divider">
          <div className="gold-line" />
        </div>
      </div>

 

      {/* Divider */}
      <div className="section-divider">
        <div className="gold-line" />
      </div>

      <SiteFooter />
    </>
  );
}
