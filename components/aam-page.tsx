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

const AAMPage = () => {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const mouseX = useRef(0);
  const mouseY = useRef(0);
  const ringX = useRef(0);
  const ringY = useRef(0);
  const animFrame = useRef<number | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  const [expandedCard, setExpandedCard] = useState<number | null>(null);
  const [expandedApproach, setExpandedApproach] = useState<Set<number>>(new Set());
  const [activeTab, setActiveTab] = useState(0);
  const [showAllAAM, setShowAllAAM] = useState(false);
  const [showAllUAS, setShowAllUAS] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  const phaseData = [
    {
      phase: "Phase 1",
      title: "Policy & System Planning",
      desc: "Develop policy, system plans, and standardized guidance for local implementation.",
      bg: PLANNING_IMG,
    },
    {
      phase: "Phase 2",
      title: "Regulatory Navigation",
      desc: "Provide regulatory understanding for compliance and guide regulatory coordination.",
      bg: INFRASTRUCTURE_IMG,
    },
    {
      phase: "Phase 3",
      title: "Infrastructure Planning",
      desc: "Plan for infrastructure, including vertiports, including technical research and validation.",
      bg: SKYLINE_IMG,
    },
    {
      phase: "Phase 4",
      title: "Functional Frameworks",
      desc: "Establish functional frameworks that support scalable program delivery and operational readiness.",
      bg: PLANNING_IMG,
    },
    {
      phase: "Phase 5",
      title: "Data & Safety Integration",
      desc: "Integrate data and safety policies into transportation systems.",
      bg: INFRASTRUCTURE_IMG,
    },
    {
      phase: "Phase 6",
      title: "Implementation & Scaling",
      desc: "Support implementation, deployment, and the scaling of AAM and UAS services.",
      bg: SKYLINE_IMG,
    },
    {
      phase: "Phase 7",
      title: "Community Engagement",
      desc: "Facilitate ongoing community engagement and public trust-building.",
      bg: PLANNING_IMG,
    },
  ];

  const approachData = [
    {
      title: "Define",
      desc: "Establish clear vision, objectives, and operational parameters for your AAM and UAS program.",
      bullets: [
        "Community needs assessment",
        "Vision and goals definition",
        "Program scope and timeline",
      ],
    },
    {
      title: "Enable",
      desc: "Build the infrastructure, policies, and partnerships required for successful deployment.",
      bullets: [
        "Policy framework development",
        "Stakeholder coordination",
        "Infrastructure planning",
      ],
    },
    {
      title: "Deliver",
      desc: "Implement, operate, and scale your AAM and UAS services with continuous optimization.",
      bullets: [
        "Operational deployment",
        "Safety and compliance monitoring",
        "Performance optimization",
      ],
    },
  ];

  const valueDeliveryTabs = [
    {
      label: "Air Taxis",
      img: CITY_AERIAL_IMG,
      title: "Urban Air Mobility Solutions",
      desc: "Transform passenger transportation through electric vertical takeoff and landing aircraft, enabling rapid point-to-point connectivity across metropolitan areas.",
      useCases: [
        "Urban air mobility solutions",
        "Vertiport integration planning",
        "Passenger safety and operations",
        "Multi-modal transportation integration",
      ],
    },
    {
      label: "Data Collection",
      img: TECH_NETWORK_IMG,
      title: "Geographic Intelligence & Insights",
      desc: "Harness unmanned aircraft systems to gather real-time aerial data for infrastructure monitoring, environmental assessment, and strategic planning.",
      useCases: [
        "Airborne data acquisition",
        "Infrastructure monitoring",
        "Environmental assessment",
        "Precision mapping and analytics",
      ],
    },
    {
      label: "Package Delivery",
      img: LOGISTICS_IMG,
      title: "Last-Mile Logistics Innovation",
      desc: "Revolutionize supply chain operations with autonomous delivery systems, enabling faster response times and expanding service areas.",
      useCases: [
        "Last-mile delivery optimization",
        "Supply chain resilience",
        "Emergency response capability",
        "Rapid goods distribution",
      ],
    },
  ];

  const stakeholderCategories = [
    {
      name: "Aviation Authorities",
      items: ["FAA", "ICAO", "NASAO"],
      icon: "shield",
    },
    {
      name: "Government Agencies",
      items: ["DOTs", "Security", "Emergency"],
      icon: "building",
    },
    {
      name: "Standards Organizations",
      items: ["ACRA", "AASHTO", "NCHRP"],
      icon: "book",
    },
    {
      name: "Academic Institutions",
      items: ["Research Centers", "Universities", "Labs"],
      icon: "compass",
    },
    {
      name: "Air Navigation Providers",
      items: ["UTM Operators", "ATM Providers", "Traffic Mgmt"],
      icon: "radar",
    },
    {
      name: "Operators & Services",
      items: ["Drone Operators", "Delivery Services", "Providers"],
      icon: "airplane",
    },
    {
      name: "Industry Partners",
      items: ["Manufacturers", "Tech Providers", "Integrators"],
      icon: "gear",
    },
    {
      name: "Cities & MPOs",
      items: ["Municipal Gov", "Planning Offices", "Transit Agencies"],
      icon: "map-pin",
    },
  ];

  const aamServices = [
    "Feasibility studies",
    "Vertiport planning",
    "Air traffic management",
    "Policy framework development",
    "Community outreach",
    "Pilot program design",
    "Economic impact analysis",
    "Safety case development",
    "Multimodal integration",
    "Regulatory compliance",
  ];

  const uasServices = [
    "Operational design domain development",
    "Drone delivery corridor planning",
    "Data governance frameworks",
    "BVLOS operations support",
    "Safety management systems",
    "Ground transportation integration",
    "Workforce training programs",
    "Airspace deconfliction",
    "Environmental impact assessments",
    "Procurement support",
  ];

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

    const hoverEls = document.querySelectorAll("a, button, .nav-item, .back-to-top");
    hoverEls.forEach((el) => {
      el.addEventListener("mouseenter", () => ring.classList.add("hover"));
      el.addEventListener("mouseleave", () => ring.classList.remove("hover"));
    });

    return () => {
      document.removeEventListener("mousemove", onMouseMove);
      if (animFrame.current) cancelAnimationFrame(animFrame.current);
    };
  }, []);

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

    return () => {
      container.innerHTML = "";
    };
  }, []);

  useEffect(() => {
    const backToTop = document.getElementById("backToTop");
    const onScroll = () => {
      if (backToTop) backToTop.classList.toggle("visible", window.scrollY > 500);
    };
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

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

  useEffect(() => {
    const track = scrollRef.current;
    if (!track) return;

    const onScroll = () => {
      const scrollLeft = track.scrollLeft;
      const scrollWidth = track.scrollWidth - track.clientWidth;
      const progress = scrollWidth > 0 ? (scrollLeft / scrollWidth) * 100 : 0;
      setScrollProgress(progress);
    };

    track.addEventListener("scroll", onScroll);
    return () => track.removeEventListener("scroll", onScroll);
  }, []);

  const toggleApproach = (index: number) => {
    setExpandedApproach((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(index)) {
        newSet.delete(index);
      } else {
        newSet.add(index);
      }
      return newSet;
    });
  };

  const scrollPhases = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const amount = 400;
      if (direction === 'left') {
        scrollRef.current.scrollBy({ left: -amount, behavior: 'smooth' });
      } else {
        scrollRef.current.scrollBy({ left: amount, behavior: 'smooth' });
      }
    }
  };

  const renderStakeholderIcon = (iconType: string) => {
    const iconMap: { [key: string]: string } = {
      shield: "M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4z",
      building: "M5 9.2V19h14V9.2M9 9V5h6v4M11 13h2v4h-2z",
      book: "M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zM9 9h6v2H9V9z",
      compass: "M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm3.6 8.7l-4.5 6.3-4.5-6.3H12z",
      radar: "M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm3.5-9c0-1.93-1.57-3.5-3.5-3.5S8.5 10.07 8.5 12s1.57 3.5 3.5 3.5 3.5-1.57 3.5-3.5z",
      airplane: "M19.35 10.04C18.67 6.59 15.64 4 12 4c-1.48 0-2.85.43-4.01 1.17l1.46 1.46C10.21 5.23 11.08 5 12 5c3.04 0 5.5 2.46 5.5 5.5v.04C17.52 10.65 19 12.37 19 14.5V21h2V14.5c0-2.02-1.1-3.78-2.65-4.46z",
      gear: "M19.43 12.98c.04-.32.07-.64.07-.98s-.03-.66-.07-.98l2.11-1.65c.19-.18.24-.46.12-.71l-2-3.46c-.12-.29-.39-.43-.69-.43-.29 0-.56.14-.69.43l-1.97 3.23c-.45-.32-.95-.58-1.49-.78l-.38-2.65C14.46 2.18 14.25 2 14 2h-4c-.25 0-.46.18-.49.42l-.38 2.65c-.54.2-1.04.46-1.49.78l-1.97-3.23c-.13-.29-.4-.43-.69-.43-.3 0-.57.14-.69.43l-2 3.46c-.13.25-.07.53.12.71l2.11 1.65c-.04.32-.07.65-.07.98s.03.66.07.98l-2.11 1.65c-.19.18-.24.46-.12.71l2 3.46c.12.29.39.43.69.43.29 0 .56-.14.69-.43l1.97-3.23c.45.32.95.58 1.49.78l.38 2.65c.03.24.24.42.49.42h4c.25 0 .46-.18.49-.42l.38-2.65c.54-.2 1.04-.46 1.49-.78l1.97 3.23c.13.29.4.43.69.43.3 0 .57-.14.69-.43l2-3.46c.12-.29.07-.57-.12-.71l-2.11-1.65zM12 15.5c-1.93 0-3.5-1.57-3.5-3.5s1.57-3.5 3.5-3.5 3.5 1.57 3.5 3.5-1.57 3.5-3.5 3.5z",
      "map-pin": "M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 3c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm0 14.2c-2.5 0-4.71-1.28-6-3.22.03-1.99 4-3.08 6-3.08 1.99 0 5.97 1.09 6 3.08-1.29 1.94-3.5 3.22-6 3.22z",
    };

    return iconMap[iconType] || iconMap.shield;
  };

  return (
    <>
      <div className="ambient-bg" />
      <div className="ambient-orbs">
        <div className="orb orb-1" />
        <div className="orb orb-2" />
        <div className="orb orb-3" />
        <div className="orb orb-4" />
      </div>
      <div className="micro-particles" id="microParticles" />

      <div className="cursor-dot" ref={dotRef} />
      <div className="cursor-ring" ref={ringRef} />

      <a href="#top" className="back-to-top" id="backToTop" aria-label="Back to top">
        <svg viewBox="0 0 24 24">
          <path d="M12 19V5M5 12l7-7 7 7" />
        </svg>
      </a>

      <SiteNav />

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
          <a href="#intro" className="hero-cta-btn">
            <span>explore our approach</span>
          </a>
        </div>
        <div className="hero-scroll">
          <span>Scroll</span>
          <div className="scroll-line" />
        </div>
      </section>

      <div className="section-divider">
        <div className="gold-line" />
      </div>

      <section className="new-intro" id="intro">
        <div className="new-intro-wrap">
          <div className="new-intro-images">
            <div className="intro-cinematic-wrap">
              <img
                src={DRONE_IMG}
                alt="Advanced Air Mobility drone technology"
                style={{ width: "100%", height: "100%", objectFit: "cover" }}
              />
            </div>
          </div>
          <div className="new-intro-content reveal rd1">
            <p className="section-label">
              <span className="gold-text">Our Foundation</span>
            </p>
            <h2 className="section-title">
              Why <em>AAM & UAS</em> Matter
            </h2>
            <p className="section-text">
              Advanced Air Mobility and Unmanned Aircraft Systems represent a fundamental shift in how communities can connect, serve, and innovate. These technologies offer unprecedented opportunities for urban planning, emergency response, logistics, and citizen well-being.
            </p>
            <button
              className="intro-expand-btn"
              onClick={() => toggleApproach(-1)}
            >
              <svg
                className="intro-expand-icon"
                style={{
                  transform: expandedApproach.has(-1) ? "rotate(180deg)" : "rotate(0deg)",
                }}
                viewBox="0 0 24 24"
                width="24"
                height="24"
              >
                <path d="M7 10l5 5 5-5" stroke="currentColor" fill="none" />
              </svg>
            </button>
            <div
              style={{
                maxHeight: expandedApproach.has(-1) ? "500px" : "0",
                overflow: "hidden",
                transition: "max-height 0.3s ease",
              }}
            >
              <div style={{ paddingTop: "20px", lineHeight: 1.8 }}>
                <p className="section-text">
                  By partnering with communities, Rawlins supports the full lifecycle of AAM and UAS adoption—from initial policy development through implementation and scaling. Our expertise spans regulatory frameworks, infrastructure planning, stakeholder coordination, and operational readiness, ensuring your region is prepared to thrive in this emerging mobility ecosystem.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="section-divider">
        <div className="gold-line" />
      </div>

      <div className="parallax-panel">
        <p className="parallax-text reveal">
          Next-generation aerial capabilities strengthen <em>multimodal transportation</em> and enable communities to benefit from a more connected, resilient mobility ecosystem.
        </p>
      </div>

      <div className="section-divider">
        <div className="gold-line" />
      </div>

      <section
        style={{
          padding: "100px 60px",
          borderTop: "1px solid rgba(201,168,76,0.2)",
          borderBottom: "1px solid rgba(201,168,76,0.2)",
          background: "var(--rawlins-bg)",
        }}
      >
        <div style={{ maxWidth: "1400px", margin: "0 auto", textAlign: "center" }}>
          <p className="section-label reveal">
            <span className="gold-text">Key Metrics</span>
          </p>
          <h2 className="section-title reveal">
            Our <em>Scale</em> &amp; Reach
          </h2>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-around",
            alignItems: "flex-start",
            marginTop: "80px",
            maxWidth: "1200px",
            margin: "80px auto 0",
            flexWrap: "wrap",
            gap: "60px",
          }}
        >
          {[
            { number: "3", label: "Core Service Areas" },
            { number: "7", label: "Program Phases" },
            { number: "50+", label: "Stakeholder Types" },
            { number: "28+", label: "States Served" },
          ].map((stat, idx) => (
            <div key={idx} style={{ textAlign: "center", flex: "1 1 150px", minWidth: "150px" }}>
              <div
                className="gold-text reveal"
                style={{
                  fontSize: "clamp(3rem, 5vw, 5rem)",
                  fontFamily: "var(--font-cormorant)",
                  fontWeight: 300,
                  marginBottom: "16px",
                  background: "linear-gradient(135deg, #c9a84c, #d4b878)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                {stat.number}
              </div>
              <p
                className="section-label reveal"
                style={{
                  fontSize: "12px",
                  letterSpacing: "2px",
                  color: "#e8d5a0",
                }}
              >
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </section>

      <div className="section-divider">
        <div className="gold-line" />
      </div>

      <section style={{ padding: "80px 60px", background: "var(--rawlins-bg)" }}>
        <div className="explore-header reveal" style={{ marginBottom: "60px" }}>
          <p className="section-label">
            <span className="gold-text">Value Delivery</span>
          </p>
          <h2 className="section-title">
            Advanced <em>Applications</em>
          </h2>
        </div>

        <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
          <div
            style={{
              display: "flex",
              gap: "12px",
              marginBottom: "60px",
              borderBottom: "1px solid rgba(201,168,76,0.2)",
              paddingBottom: "24px",
              justifyContent: "center",
            }}
          >
            {valueDeliveryTabs.map((tab, idx) => (
              <button
                key={idx}
                onClick={() => setActiveTab(idx)}
                style={{
                  padding: "12px 32px",
                  background: "transparent",
                  border: "none",
                  borderBottom: activeTab === idx ? "2px solid #c9a84c" : "none",
                  color: activeTab === idx ? "#e8d5a0" : "#a0a0a0",
                  fontSize: "14px",
                  fontFamily: "var(--font-dm-sans)",
                  fontWeight: 600,
                  letterSpacing: "2px",
                  cursor: "pointer",
                  transition: "all 0.3s ease",
                  textTransform: "uppercase",
                }}
              >
                {tab.label}
              </button>
            ))}
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "60px", alignItems: "center" }}>
            <div className="intro-cinematic-wrap reveal" style={{ height: "400px" }}>
              <img
                src={valueDeliveryTabs[activeTab].img}
                alt={valueDeliveryTabs[activeTab].label}
                style={{ width: "100%", height: "100%", objectFit: "cover" }}
              />
            </div>

            <div className="reveal rd2">
              <h3
                style={{
                  fontSize: "clamp(1.8rem, 3vw, 2.2rem)",
                  fontFamily: "var(--font-cormorant)",
                  fontWeight: 300,
                  color: "#fff",
                  marginBottom: "20px",
                }}
              >
                {valueDeliveryTabs[activeTab].title}
              </h3>
              <p className="section-text" style={{ marginBottom: "30px" }}>
                {valueDeliveryTabs[activeTab].desc}
              </p>
              <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
                {valueDeliveryTabs[activeTab].useCases.map((useCase, idx) => (
                  <li
                    key={idx}
                    className="section-text"
                    style={{ marginBottom: "12px", display: "flex", gap: "12px" }}
                  >
                    <span style={{ color: "#c9a84c", flexShrink: 0 }}>▪</span>
                    <span>{useCase}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      <div className="section-divider">
        <div className="gold-line" />
      </div>

      <section className="section-story" id="phases" style={{ padding: "80px 60px" }}>
        <div className="story-header reveal">
          <p className="section-label">
            <span className="gold-text">program lifecycle</span>
          </p>
          <h2 className="section-title">
            Program <em>Phases</em>
          </h2>
        </div>

        <div className="story-scroll-outer">
          <div className="story-scroll-track" ref={scrollRef}>
            {phaseData.map((phase, i) => (
              <div key={i} className="story-card">
                <div
                  className="story-card-bg"
                  style={{ backgroundImage: `url(${phase.bg})` }}
                />
                <div className="story-card-overlay" />
                <div className="story-card-header">
                  <span className="story-card-num">0{i + 1}</span>
                  <span className="timeline-phase">{phase.phase}</span>
                </div>
                <div className="story-card-divider" />
                <h4 className="story-card-title">{phase.title}</h4>
                <div className="story-card-body-wrap">
                  <p className="story-card-body">{phase.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="story-scroll-controls">
          <button
            className="story-arrow-btn"
            onClick={() => scrollPhases('left')}
            aria-label="Scroll left"
          >
            <svg viewBox="0 0 24 24" width="24" height="24">
              <path d="M15 18l-6-6 6-6" stroke="currentColor" fill="none" strokeWidth="2" />
            </svg>
          </button>
          <div className="story-scroll-progress-bar">
            <div
              className="story-scroll-progress-fill"
              style={{ width: `${scrollProgress}%` }}
            />
          </div>
          <button
            className="story-arrow-btn"
            onClick={() => scrollPhases('right')}
            aria-label="Scroll right"
          >
            <svg viewBox="0 0 24 24" width="24" height="24">
              <path d="M9 18l6-6-6-6" stroke="currentColor" fill="none" strokeWidth="2" />
            </svg>
          </button>
        </div>
      </section>

      <div className="section-divider">
        <div className="gold-line" />
      </div>

      <section style={{ padding: "100px 60px", background: "var(--rawlins-bg)" }}>
        <div className="explore-header reveal" style={{ marginBottom: "80px", textAlign: "center" }}>
          <p className="section-label">
            <span className="gold-text">Strategic Methodology</span>
          </p>
          <h2 className="section-title">
            Service <em>Approach</em>
          </h2>
        </div>

        <div style={{ maxWidth: "900px", margin: "0 auto", position: "relative", paddingLeft: "120px" }}>
          {approachData.map((step, idx) => (
            <div
              key={idx}
              className="reveal"
              style={{
                display: "flex",
                gap: "40px",
                marginBottom: "80px",
                position: "relative",
              }}
            >
              <div
                style={{
                  position: "absolute",
                  left: "30px",
                  top: 0,
                  width: "60px",
                  height: "60px",
                  borderRadius: "50%",
                  border: "2px solid #c9a84c",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontFamily: "var(--font-cormorant)",
                  fontSize: "1.5rem",
                  color: "#c9a84c",
                  background: "var(--rawlins-bg)",
                  zIndex: 2,
                }}
              >
                {idx + 1}
              </div>

              <div style={{ flex: 1 }}>
                <h3
                  style={{
                    fontSize: "clamp(1.5rem, 2.5vw, 1.8rem)",
                    fontFamily: "var(--font-cormorant)",
                    fontWeight: 300,
                    color: "#fff",
                    marginBottom: "16px",
                  }}
                >
                  {step.title}
                </h3>
                <p className="section-text" style={{ marginBottom: "20px" }}>
                  {step.desc}
                </p>
                <button
                  className="intro-expand-btn"
                  onClick={() => toggleApproach(idx)}
                  style={{ marginBottom: "12px" }}
                >
                  <svg
                    className="intro-expand-icon"
                    style={{
                      transform: expandedApproach.has(idx) ? "rotate(180deg)" : "rotate(0deg)",
                    }}
                    viewBox="0 0 24 24"
                    width="20"
                    height="20"
                  >
                    <path d="M7 10l5 5 5-5" stroke="currentColor" fill="none" />
                  </svg>
                </button>
                <div
                  style={{
                    maxHeight: expandedApproach.has(idx) ? "300px" : "0",
                    overflow: "hidden",
                    transition: "max-height 0.3s ease",
                  }}
                >
                  <ul
                    style={{
                      listStyle: "none",
                      padding: "0",
                      margin: "0",
                      fontSize: "15px",
                      lineHeight: 1.8,
                      color: "#b0b0b0",
                    }}
                  >
                    {step.bullets.map((bullet, bi) => (
                      <li key={bi} style={{ marginBottom: "10px", paddingLeft: "20px", position: "relative" }}>
                        <span style={{ position: "absolute", left: 0, color: "#c9a84c" }}>▪</span>
                        {bullet}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <div className="section-divider">
        <div className="gold-line" />
      </div>

      <div className="parallax-panel">
        <p className="parallax-text reveal">
          Successful AAM and UAS integration requires <em>coordinated planning</em>, stakeholder alignment, and a commitment to continuous innovation and community benefit.
        </p>
      </div>

      <div className="section-divider">
        <div className="gold-line" />
      </div>

      <section style={{ padding: "100px 60px", background: "var(--rawlins-bg)" }}>
        <div className="explore-header reveal" style={{ marginBottom: "80px", textAlign: "center" }}>
          <p className="section-label">
            <span className="gold-text">Stakeholder Ecosystem</span>
          </p>
          <h2 className="section-title">
            Who We <em>Partner</em> With
          </h2>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))",
            gap: "24px",
            maxWidth: "1200px",
            margin: "0 auto",
          }}
        >
          {stakeholderCategories.map((category, idx) => (
            <div
              key={idx}
              className="reveal"
              style={{
                border: "1px solid rgba(201,168,76,0.15)",
                padding: "30px",
                background: "rgba(10, 21, 40, 0.5)",
                borderRadius: "8px",
                transition: "all 0.3s ease",
                cursor: "pointer",
              }}
              onMouseEnter={(e) => {
                const target = e.currentTarget as HTMLElement;
                target.style.borderColor = "rgba(201,168,76,0.4)";
                target.style.background = "rgba(10, 21, 40, 0.8)";
                target.style.transform = "translateY(-4px)";
              }}
              onMouseLeave={(e) => {
                const target = e.currentTarget as HTMLElement;
                target.style.borderColor = "rgba(201,168,76,0.15)";
                target.style.background = "rgba(10, 21, 40, 0.5)";
                target.style.transform = "translateY(0)";
              }}
            >
              <svg
                width="32"
                height="32"
                viewBox="0 0 24 24"
                style={{ marginBottom: "16px", display: "block" }}
              >
                <path d={renderStakeholderIcon(category.icon)} stroke="#c9a84c" fill="none" strokeWidth="1.5" />
              </svg>
              <h4
                style={{
                  fontSize: "16px",
                  fontFamily: "var(--font-dm-sans)",
                  fontWeight: 600,
                  color: "#e8d5a0",
                  marginBottom: "12px",
                }}
              >
                {category.name}
              </h4>
              <ul
                style={{
                  listStyle: "none",
                  padding: "0",
                  margin: "0",
                  fontSize: "13px",
                  lineHeight: 1.7,
                  color: "#9a9a9a",
                }}
              >
                {category.items.map((item, iidx) => (
                  <li key={iidx} style={{ marginBottom: "6px" }}>
                    • {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      <div className="section-divider">
        <div className="gold-line" />
      </div>

      <section style={{ padding: "100px 60px", background: "var(--rawlins-bg)" }}>
        <div className="explore-header reveal" style={{ marginBottom: "80px", textAlign: "center" }}>
          <p className="section-label">
            <span className="gold-text">Service Portfolio</span>
          </p>
          <h2 className="section-title">
            AAM &amp; <em>UAS</em> Services
          </h2>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "100px",
            maxWidth: "1200px",
            margin: "0 auto",
          }}
        >
          <div className="reveal rd1">
            <h3
              style={{
                fontSize: "clamp(1.4rem, 2.5vw, 1.6rem)",
                fontFamily: "var(--font-cormorant)",
                fontWeight: 300,
                color: "#e8d5a0",
                marginBottom: "30px",
              }}
            >
              AAM Services
            </h3>
            <ul style={{ listStyle: "none", padding: "0", margin: "0" }}>
              {aamServices.slice(0, showAllAAM ? aamServices.length : 4).map((service, idx) => (
                <li
                  key={idx}
                  className="section-text"
                  style={{
                    marginBottom: "14px",
                    display: "flex",
                    gap: "12px",
                    fontSize: "15px",
                  }}
                >
                  <span style={{ color: "#c9a84c", flexShrink: 0 }}>▪</span>
                  <span>{service}</span>
                </li>
              ))}
            </ul>
            <button
              onClick={() => setShowAllAAM(!showAllAAM)}
              style={{
                marginTop: "24px",
                padding: "12px 24px",
                background: "transparent",
                border: "1px solid rgba(201,168,76,0.3)",
                color: "#c9a84c",
                fontFamily: "var(--font-dm-sans)",
                fontSize: "13px",
                fontWeight: 600,
                letterSpacing: "1px",
                cursor: "pointer",
                transition: "all 0.3s ease",
              }}
              onMouseEnter={(e) => {
                const target = e.currentTarget as HTMLElement;
                target.style.borderColor = "#c9a84c";
                target.style.backgroundColor = "rgba(201,168,76,0.1)";
              }}
              onMouseLeave={(e) => {
                const target = e.currentTarget as HTMLElement;
                target.style.borderColor = "rgba(201,168,76,0.3)";
                target.style.backgroundColor = "transparent";
              }}
            >
              {showAllAAM ? "Show Less" : "View all 10 services"}
            </button>
          </div>

          <div className="reveal rd2">
            <h3
              style={{
                fontSize: "clamp(1.4rem, 2.5vw, 1.6rem)",
                fontFamily: "var(--font-cormorant)",
                fontWeight: 300,
                color: "#e8d5a0",
                marginBottom: "30px",
              }}
            >
              UAS Services
            </h3>
            <ul style={{ listStyle: "none", padding: "0", margin: "0" }}>
              {uasServices.slice(0, showAllUAS ? uasServices.length : 4).map((service, idx) => (
                <li
                  key={idx}
                  className="section-text"
                  style={{
                    marginBottom: "14px",
                    display: "flex",
                    gap: "12px",
                    fontSize: "15px",
                  }}
                >
                  <span style={{ color: "#c9a84c", flexShrink: 0 }}>▪</span>
                  <span>{service}</span>
                </li>
              ))}
            </ul>
            <button
              onClick={() => setShowAllUAS(!showAllUAS)}
              style={{
                marginTop: "24px",
                padding: "12px 24px",
                background: "transparent",
                border: "1px solid rgba(201,168,76,0.3)",
                color: "#c9a84c",
                fontFamily: "var(--font-dm-sans)",
                fontSize: "13px",
                fontWeight: 600,
                letterSpacing: "1px",
                cursor: "pointer",
                transition: "all 0.3s ease",
              }}
              onMouseEnter={(e) => {
                const target = e.currentTarget as HTMLElement;
                target.style.borderColor = "#c9a84c";
                target.style.backgroundColor = "rgba(201,168,76,0.1)";
              }}
              onMouseLeave={(e) => {
                const target = e.currentTarget as HTMLElement;
                target.style.borderColor = "rgba(201,168,76,0.3)";
                target.style.backgroundColor = "transparent";
              }}
            >
              {showAllUAS ? "Show Less" : "View all 10 services"}
            </button>
          </div>
        </div>
      </section>

      <div className="section-divider">
        <div className="gold-line" />
      </div>

      <section className="section-team" id="cta">
        <div className="team-content reveal">
          <p className="section-label">
            <span className="gold-text">Get Started</span>
          </p>
          <h2 className="section-title">
            Ready to <em>Transform</em> Your Region?
          </h2>
          <p className="team-desc">
            Partner with Rawlins to unlock the potential of Advanced Air Mobility and UAS technology. Our experts are ready to guide your community toward innovation, resilience, and growth.
          </p>
          <Link href="/contact" className="btn-team">
            <span>Start a Conversation</span>
          </Link>
        </div>
      </section>

      <SiteFooter />
    </>
  );
};

export default AAMPage;
