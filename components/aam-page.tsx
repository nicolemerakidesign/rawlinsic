'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import SiteNav from '@/components/site-nav';
import SiteFooter from '@/components/site-footer';

const AAMPage = () => {
  const [expandedSections, setExpandedSections] = useState<Set<string>>(new Set());
  const [expandedCards, setExpandedCards] = useState<Set<string>>(new Set());
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const reveals = document.querySelectorAll('.reveal');
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) entry.target.classList.add('visible');
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
    );
    reveals.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const toggleSection = (sectionId: string) => {
    setExpandedSections((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(sectionId)) {
        newSet.delete(sectionId);
      } else {
        newSet.add(sectionId);
      }
      return newSet;
    });
  };

  const toggleCard = (cardId: string) => {
    setExpandedCards((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(cardId)) {
        newSet.delete(cardId);
      } else {
        newSet.add(cardId);
      }
      return newSet;
    });
  };

  const scrollContainer = (containerId: string, direction: 'prev' | 'next') => {
    const container = document.getElementById(containerId);
    if (container) {
      const scrollAmount = 420;
      container.scrollBy({
        left: direction === 'prev' ? -scrollAmount : scrollAmount,
        behavior: 'smooth',
      });
    }
  };

  return (
    <div ref={containerRef} className="min-h-screen bg-[var(--rawlins-bg)] text-white overflow-hidden relative">
      <style>{`
        /* AAM-Specific Styles Only */

        .aam-svg-illustration {
          width: 100%;
          max-width: 400px;
          height: auto;
          margin: 0 auto;
        }

        .aam-value-card {
          position: relative;
          border-radius: 6px;
          overflow: hidden;
          border: 1px solid rgba(229, 203, 135, 0.07);
          background: rgba(10, 21, 40, 0.4);
          backdrop-filter: blur(10px);
          padding: 40px 32px;
          transition: all 0.3s ease;
        }

        .aam-value-card:hover {
          border-color: rgba(201, 168, 76, 0.2);
          transform: translateY(-4px);
          box-shadow: 0 12px 40px rgba(201, 168, 76, 0.1);
        }

        .aam-value-visual {
          width: 100%;
          height: 150px;
          border-radius: 4px;
          margin-bottom: 24px;
          background-size: cover;
          background-position: center;
          transition: transform 0.3s ease;
        }

        .aam-value-card:hover .aam-value-visual {
          transform: scale(1.02);
        }

        .aam-value-title {
          font-family: var(--font-cormorant);
          font-size: 24px;
          font-weight: 400;
          margin-bottom: 12px;
          color: #fff;
        }

        .aam-value-desc {
          font-size: 14px;
          color: rgba(255, 255, 255, 0.7);
          margin-bottom: 16px;
          line-height: 1.6;
        }

        .aam-expand-btn {
          width: 48px;
          height: 48px;
          border-radius: 50%;
          border: 1px solid rgba(201, 168, 76, 0.3);
          background: rgba(201, 168, 76, 0.05);
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: all 0.3s ease;
          margin-top: 12px;
        }

        .aam-expand-btn:hover {
          border-color: rgba(201, 168, 76, 0.6);
          background: rgba(201, 168, 76, 0.1);
        }

        .aam-expand-btn svg {
          width: 20px;
          height: 20px;
          color: #c9a84c;
          transition: transform 0.3s ease;
        }

        .aam-expand-btn.expanded svg {
          transform: rotate(180deg);
        }

        .aam-expandable {
          max-height: 0;
          opacity: 0;
          overflow: hidden;
          transition: max-height 0.3s ease, opacity 0.3s ease;
        }

        .aam-expandable.expanded {
          max-height: 500px;
          opacity: 1;
        }

        .aam-bullet-list {
          list-style: none;
          margin: 16px 0 0 0;
          padding: 0;
        }

        .aam-bullet-list li {
          font-size: 14px;
          color: rgba(255, 255, 255, 0.65);
          padding: 8px 0;
          padding-left: 20px;
          position: relative;
          line-height: 1.6;
        }

        .aam-bullet-list li::before {
          content: '→';
          position: absolute;
          left: 0;
          color: #c9a84c;
          font-weight: 600;
        }

        .aam-phase-card {
          flex: 0 0 clamp(320px, 28vw, 380px);
          border: 1px solid rgba(201, 168, 76, 0.1);
          border-left: 3px solid rgba(201, 168, 76, 0.3);
          border-radius: 6px;
          padding: 32px 28px;
          background: rgba(10, 21, 40, 0.2);
          transition: all 0.3s ease;
        }

        .aam-phase-card:hover {
          border-color: rgba(201, 168, 76, 0.2);
          border-left-color: rgba(201, 168, 76, 0.5);
          transform: translateY(-6px);
        }

        .aam-phase-number {
          font-family: var(--font-cormorant);
          font-size: 48px;
          font-weight: 300;
          color: rgba(201, 168, 76, 0.3);
          margin-bottom: 8px;
        }

        .aam-phase-title {
          font-family: var(--font-cormorant);
          font-size: 20px;
          font-weight: 400;
          margin-bottom: 12px;
          color: #fff;
        }

        .aam-phase-desc {
          font-size: 14px;
          color: rgba(255, 255, 255, 0.65);
          line-height: 1.7;
        }

        .aam-scroll-track {
          display: flex;
          gap: 20px;
          overflow-x: auto;
          scroll-behavior: smooth;
          padding: 0;
          scrollbar-width: thin;
        }

        .aam-scroll-track::-webkit-scrollbar {
          height: 6px;
        }

        .aam-scroll-track::-webkit-scrollbar-track {
          background: transparent;
        }

        .aam-scroll-track::-webkit-scrollbar-thumb {
          background: rgba(201, 168, 76, 0.2);
          border-radius: 3px;
        }

        .aam-scroll-track::-webkit-scrollbar-thumb:hover {
          background: rgba(201, 168, 76, 0.4);
        }

        .aam-scroll-controls {
          display: flex;
          gap: 12px;
          margin-top: 32px;
          justify-content: center;
        }

        .aam-scroll-btn {
          width: 44px;
          height: 44px;
          border-radius: 50%;
          border: 1px solid rgba(201, 168, 76, 0.3);
          background: rgba(201, 168, 76, 0.05);
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .aam-scroll-btn:hover {
          border-color: rgba(201, 168, 76, 0.6);
          background: rgba(201, 168, 76, 0.1);
        }

        .aam-scroll-btn svg {
          width: 18px;
          height: 18px;
          color: #c9a84c;
        }

        .aam-service-card {
          flex: 1;
          min-height: 400px;
          border-radius: 6px;
          overflow: hidden;
          border: 1px solid rgba(201, 168, 76, 0.1);
          padding: 48px 40px;
          position: relative;
          display: flex;
          flex-direction: column;
          transition: all 0.3s ease;
        }

        .aam-service-card:hover {
          border-color: rgba(201, 168, 76, 0.2);
          transform: translateY(-4px);
        }

        .aam-service-badge {
          display: inline-block;
          font-size: 12px;
          letter-spacing: 2px;
          text-transform: uppercase;
          padding: 8px 16px;
          border-radius: 4px;
          background: rgba(201, 168, 76, 0.1);
          color: #c9a84c;
          margin-bottom: 20px;
          width: fit-content;
        }

        .aam-service-title {
          font-family: var(--font-cormorant);
          font-size: 32px;
          font-weight: 400;
          margin-bottom: 16px;
          color: #fff;
        }

        .aam-service-desc {
          font-size: 15px;
          color: rgba(255, 255, 255, 0.7);
          line-height: 1.8;
          margin-bottom: 24px;
          flex-grow: 1;
        }

        .aam-capability-list {
          list-style: none;
          margin: 0;
          padding: 0;
          max-height: 0;
          opacity: 0;
          overflow: hidden;
          transition: max-height 0.3s ease, opacity 0.3s ease;
        }

        .aam-capability-list.expanded {
          max-height: 600px;
          opacity: 1;
        }

        .aam-capability-list li {
          font-size: 14px;
          color: rgba(255, 255, 255, 0.65);
          padding: 8px 0;
          padding-left: 20px;
          position: relative;
          line-height: 1.6;
        }

        .aam-capability-list li::before {
          content: '•';
          position: absolute;
          left: 0;
          color: #c9a84c;
        }

        .aam-stakeholder-section {
          display: grid;
          grid-template-columns: 1fr auto 1fr;
          gap: 60px;
          align-items: start;
          margin-top: 60px;
        }

        .aam-stakeholder-column {
          display: flex;
          flex-direction: column;
        }

        .aam-stakeholder-title {
          font-family: var(--font-cormorant);
          font-size: 20px;
          font-weight: 400;
          margin-bottom: 24px;
          color: #fff;
        }

        .aam-stakeholder-list {
          list-style: none;
          margin: 0;
          padding: 0;
          max-height: 0;
          opacity: 0;
          overflow: hidden;
          transition: max-height 0.3s ease, opacity 0.3s ease;
        }

        .aam-stakeholder-list.expanded {
          max-height: 500px;
          opacity: 1;
        }

        .aam-stakeholder-list li {
          font-size: 14px;
          color: rgba(255, 255, 255, 0.7);
          padding: 12px 0;
          border-bottom: 1px solid rgba(201, 168, 76, 0.05);
        }

        .aam-stakeholder-hub {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: flex-start;
        }

        .aam-hub-center {
          position: relative;
          width: 120px;
          height: 120px;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 40px;
        }

        .aam-hub-ring {
          position: absolute;
          border: 1px solid rgba(201, 168, 76, 0.2);
          border-radius: 50%;
          animation: pulse 2s ease-in-out infinite;
        }

        .aam-hub-ring:nth-child(1) {
          width: 120px;
          height: 120px;
        }

        .aam-hub-ring:nth-child(2) {
          width: 160px;
          height: 160px;
          animation-delay: 0.2s;
        }

        .aam-hub-ring:nth-child(3) {
          width: 200px;
          height: 200px;
          animation-delay: 0.4s;
        }

        .aam-hub-text {
          position: relative;
          z-index: 2;
          text-align: center;
          font-family: var(--font-cormorant);
          font-size: 16px;
          font-weight: 400;
          color: #c9a84c;
        }

        @keyframes pulse {
          0%, 100% { opacity: 0.3; transform: scale(1); }
          50% { opacity: 0.6; transform: scale(1.05); }
        }

        .aam-video-placeholder {
          width: 100%;
          aspect-ratio: 16 / 9;
          background: linear-gradient(135deg, rgba(201, 168, 76, 0.1), rgba(74, 144, 226, 0.1));
          border: 1px solid rgba(201, 168, 76, 0.2);
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
          position: relative;
          overflow: hidden;
          transition: all 0.3s ease;
          cursor: pointer;
        }

        .aam-video-placeholder:hover {
          border-color: rgba(201, 168, 76, 0.4);
          box-shadow: 0 0 40px rgba(201, 168, 76, 0.15);
        }

        .aam-play-button {
          width: 80px;
          height: 80px;
          border: 2px solid #c9a84c;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          position: relative;
          transition: all 0.3s ease;
        }

        .aam-video-placeholder:hover .aam-play-button {
          transform: scale(1.1);
          box-shadow: 0 0 30px rgba(201, 168, 76, 0.4);
        }

        .aam-play-button::after {
          content: '';
          width: 0;
          height: 0;
          border-left: 20px solid #c9a84c;
          border-top: 12px solid transparent;
          border-bottom: 12px solid transparent;
          margin-left: 4px;
        }

        .aam-cta-section {
          text-align: center;
          padding: 100px 40px;
        }

        .aam-cta-title {
          font-family: var(--font-cormorant);
          font-size: clamp(2.2rem, 3vw, 3rem);
          font-weight: 300;
          margin-bottom: 20px;
          background: linear-gradient(145deg, #c9a84c, #e8d5a0, #d4b878);
          -webkit-background-clip: text;
          color: transparent;
        }

        .aam-cta-subtitle {
          font-size: 16px;
          color: rgba(255, 255, 255, 0.7);
          margin-bottom: 40px;
          max-width: 600px;
          margin-left: auto;
          margin-right: auto;
        }

        .aam-cta-btn {
          display: inline-block;
          padding: 14px 40px;
          border: 1px solid rgba(201, 168, 76, 0.5);
          border-radius: 4px;
          background: transparent;
          color: #fff;
          font-family: var(--font-dm-sans);
          font-size: 12px;
          font-weight: 600;
          letter-spacing: 2px;
          text-transform: uppercase;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .aam-cta-btn:hover {
          border-color: #c9a84c;
          background: rgba(201, 168, 76, 0.1);
          box-shadow: 0 0 30px rgba(201, 168, 76, 0.15);
        }

        @media (max-width: 768px) {
          .aam-stakeholder-section {
            grid-template-columns: 1fr;
            gap: 40px;
          }

          .aam-phase-card {
            flex: 0 0 clamp(280px, 80vw, 400px);
          }

          .aam-service-card {
            min-height: 300px;
            padding: 32px 24px;
          }

          .aam-cta-section {
            padding: 60px 20px;
          }
        }
      `}</style>

      <SiteNav />

      <div className="content-wrapper">
        {/* Hero Section */}
        <section className="aam-hero min-h-screen flex flex-col justify-center items-center px-6 py-20 relative overflow-hidden">
          <div className="reveal rd1 text-center max-w-5xl">
            <div className="text-sm uppercase tracking-widest text-[#c9a84c] mb-8 font-semibold">
              Technology · Advanced Air Mobility
            </div>
            <h1 className="section-title mb-6">
              Advanced Air Mobility <em>&amp; UAS</em>
            </h1>
            <p className="section-text mx-auto mb-12 text-base">
              Translating next-generation aerial capabilities into integrated mobility solutions for communities and regions worldwide.
            </p>
          </div>

          {/* Video Placeholder */}
          <div className="reveal rd2 w-full max-w-2xl">
            <div className="aam-video-placeholder">
              <div className="aam-play-button" />
            </div>
          </div>

          {/* Scroll Indicator */}
          <div className="absolute bottom-12 left-1/2 transform -translate-x-1/2 flex flex-col items-center gap-3 animate-bounce">
            <span className="text-xs uppercase tracking-widest text-[#c9a84c] font-semibold">Scroll</span>
            <div className="w-1 h-8 bg-gradient-to-b from-[#c9a84c] to-transparent rounded-full" />
          </div>
        </section>

        {/* Section Divider */}
        <div className="section-divider py-12">
          <div className="gold-line" />
        </div>

        {/* Overview Section */}
        <section className="py-20 px-6">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
              {/* Left: SVG Illustration */}
              <div className="reveal rd1">
                <svg
                  className="aam-svg-illustration"
                  viewBox="0 0 400 400"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  {/* Connected network visualization */}
                  <defs>
                    <linearGradient id="nodeGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#c9a84c" stopOpacity="0.8" />
                      <stop offset="100%" stopColor="#e8d5a0" stopOpacity="0.4" />
                    </linearGradient>
                  </defs>

                  {/* Connecting lines */}
                  <line x1="80" y1="80" x2="320" y2="320" stroke="#c9a84c" strokeWidth="1" opacity="0.3" />
                  <line x1="320" y1="80" x2="80" y2="320" stroke="#c9a84c" strokeWidth="1" opacity="0.3" />
                  <line x1="200" y1="50" x2="200" y2="350" stroke="#c9a84c" strokeWidth="1" opacity="0.3" />
                  <line x1="50" y1="200" x2="350" y2="200" stroke="#c9a84c" strokeWidth="1" opacity="0.3" />

                  {/* Nodes */}
                  <circle cx="200" cy="200" r="12" fill="url(#nodeGradient)" />
                  <circle cx="80" cy="80" r="8" fill="#c9a84c" opacity="0.6" />
                  <circle cx="320" cy="80" r="8" fill="#c9a84c" opacity="0.6" />
                  <circle cx="80" cy="320" r="8" fill="#c9a84c" opacity="0.6" />
                  <circle cx="320" cy="320" r="8" fill="#c9a84c" opacity="0.6" />
                  <circle cx="200" cy="50" r="8" fill="#c9a84c" opacity="0.6" />
                  <circle cx="200" cy="350" r="8" fill="#c9a84c" opacity="0.6" />
                  <circle cx="50" cy="200" r="8" fill="#c9a84c" opacity="0.6" />
                  <circle cx="350" cy="200" r="8" fill="#c9a84c" opacity="0.6" />

                  {/* Center glow */}
                  <circle cx="200" cy="200" r="20" fill="#c9a84c" opacity="0.1" />
                </svg>
              </div>

              {/* Right: Content with Expand */}
              <div className="reveal rd2">
                <div className="section-label gold-text">Our Focus</div>
                <h2 className="section-title mb-6">Unlocking Aerial Mobility Potential</h2>
                <p className="section-text mb-6">
                  We partner with government agencies, municipalities, and private enterprises to navigate the complex landscape of advanced air mobility. Our expertise spans regulatory frameworks, infrastructure planning, and operational integration.
                </p>

                {/* Expand Button */}
                <button
                  onClick={() => toggleSection('overview')}
                  className={`aam-expand-btn ${expandedSections.has('overview') ? 'expanded' : ''}`}
                  aria-expanded={expandedSections.has('overview')}
                >
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <polyline points="6 9 12 15 18 9"></polyline>
                  </svg>
                </button>

                {/* Expandable Content */}
                <div className={`aam-expandable ${expandedSections.has('overview') ? 'expanded' : ''}`}>
                  <ul className="aam-bullet-list">
                    <li>Regulatory and policy advisory</li>
                    <li>Infrastructure and airspace integration planning</li>
                    <li>Community engagement and stakeholder coordination</li>
                    <li>Technology assessment and operational readiness</li>
                    <li>Business model and economic feasibility analysis</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Parallax Quote Panel */}
        <section className="py-20 px-6 bg-gradient-to-b from-transparent via-[rgba(14,30,60,0.2)] to-transparent">
          <div className="max-width-5xl mx-auto text-center reveal">
            <p className="section-title text-center">
              We translate <em>next-generation aerial capabilities</em> into integrated mobility solutions for communities and regions.
            </p>
          </div>
        </section>

        {/* Section Divider */}
        <div className="section-divider py-12">
          <div className="gold-line" />
        </div>

        {/* Value Delivery Cards */}
        <section className="py-20 px-6">
          <div className="max-w-6xl mx-auto">
            <div className="mb-16 reveal">
              <div className="section-label gold-text">Our Approach</div>
              <h2 className="section-title">Value Delivery Across Three Domains</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Card 1: Air Taxis & Passenger Mobility */}
              <div className="reveal rd1 aam-value-card">
                <div
                  className="aam-value-visual"
                  style={{
                    background: 'radial-gradient(ellipse at 60% 40%, rgba(201, 168, 76, 0.2), transparent), linear-gradient(135deg, rgba(74, 144, 226, 0.1), rgba(201, 168, 76, 0.05))',
                  }}
                />
                <h3 className="aam-value-title">Air Taxis & Passenger Mobility</h3>
                <p className="aam-value-desc">
                  Enabling safe, efficient urban and regional air transportation.
                </p>
                <button
                  onClick={() => toggleCard('card-1')}
                  className={`aam-expand-btn ${expandedCards.has('card-1') ? 'expanded' : ''}`}
                  aria-expanded={expandedCards.has('card-1')}
                >
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <polyline points="6 9 12 15 18 9"></polyline>
                  </svg>
                </button>
                <div className={`aam-expandable ${expandedCards.has('card-1') ? 'expanded' : ''}`}>
                  <ul className="aam-bullet-list">
                    <li>Vertiport site selection and design</li>
                    <li>Operational integration with existing transport</li>
                    <li>Safety and certification frameworks</li>
                    <li>Market demand and feasibility studies</li>
                    <li>Community engagement strategies</li>
                  </ul>
                </div>
              </div>

              {/* Card 2: Data Collection & Inspection */}
              <div className="reveal rd2 aam-value-card">
                <div
                  className="aam-value-visual"
                  style={{
                    background: 'linear-gradient(45deg, rgba(201, 168, 76, 0.15) 25%, transparent 25%, transparent 50%, rgba(201, 168, 76, 0.15) 50%, rgba(201, 168, 76, 0.15) 75%, transparent 75%, transparent), linear-gradient(-45deg, rgba(74, 144, 226, 0.1) 25%, transparent 25%, transparent 50%, rgba(74, 144, 226, 0.1) 50%, rgba(74, 144, 226, 0.1) 75%, transparent 75%, transparent)',
                    backgroundSize: '40px 40px',
                    backgroundPosition: '0 0, 20px 20px',
                  }}
                />
                <h3 className="aam-value-title">Data Collection & Inspection</h3>
                <p className="aam-value-desc">
                  Leveraging UAS for efficient infrastructure monitoring.
                </p>
                <button
                  onClick={() => toggleCard('card-2')}
                  className={`aam-expand-btn ${expandedCards.has('card-2') ? 'expanded' : ''}`}
                  aria-expanded={expandedCards.has('card-2')}
                >
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <polyline points="6 9 12 15 18 9"></polyline>
                  </svg>
                </button>
                <div className={`aam-expandable ${expandedCards.has('card-2') ? 'expanded' : ''}`}>
                  <ul className="aam-bullet-list">
                    <li>Regulatory compliance and waivers</li>
                    <li>Sensor technology integration</li>
                    <li>Data processing and analytics</li>
                    <li>Infrastructure asset management</li>
                    <li>Cost-benefit analysis vs. traditional methods</li>
                  </ul>
                </div>
              </div>

              {/* Card 3: Package Delivery & Logistics */}
              <div className="reveal rd3 aam-value-card">
                <div
                  className="aam-value-visual"
                  style={{
                    background: 'radial-gradient(circle at 30% 50%, rgba(201, 168, 76, 0.15) 0%, transparent 30%), radial-gradient(circle at 70% 50%, rgba(74, 144, 226, 0.1) 0%, transparent 35%)',
                  }}
                />
                <h3 className="aam-value-title">Package Delivery & Logistics</h3>
                <p className="aam-value-desc">
                  Scaling autonomous delivery networks for last-mile optimization.
                </p>
                <button
                  onClick={() => toggleCard('card-3')}
                  className={`aam-expand-btn ${expandedCards.has('card-3') ? 'expanded' : ''}`}
                  aria-expanded={expandedCards.has('card-3')}
                >
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <polyline points="6 9 12 15 18 9"></polyline>
                  </svg>
                </button>
                <div className={`aam-expandable ${expandedCards.has('card-3') ? 'expanded' : ''}`}>
                  <ul className="aam-bullet-list">
                    <li>Logistics hub and delivery zone planning</li>
                    <li>Fleet management systems</li>
                    <li>Route optimization algorithms</li>
                    <li>Environmental impact assessment</li>
                    <li>Economic modeling for operator viability</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section Divider */}
        <div className="section-divider py-12">
          <div className="gold-line" />
        </div>

        {/* How We Serve - Horizontal Scrolling Phases */}
        <section className="py-20 px-6">
          <div className="max-w-7xl mx-auto">
            <div className="mb-12 reveal">
              <div className="section-label gold-text">Our Journey</div>
              <h2 className="section-title">How We Serve</h2>
            </div>

            {/* Horizontal Scroll Container */}
            <div className="overflow-hidden">
              <div className="aam-scroll-track" id="phaseScroll">
                <div className="reveal rd1 aam-phase-card">
                  <div className="aam-phase-number">01</div>
                  <h3 className="aam-phase-title">Discovery</h3>
                  <p className="aam-phase-desc">Understanding your region's unique needs, constraints, and opportunities for advanced air mobility integration.</p>
                </div>
                <div className="reveal rd2 aam-phase-card">
                  <div className="aam-phase-number">02</div>
                  <h3 className="aam-phase-title">Assessment</h3>
                  <p className="aam-phase-desc">Evaluating regulatory frameworks, airspace capacity, infrastructure readiness, and economic viability.</p>
                </div>
                <div className="reveal rd3 aam-phase-card">
                  <div className="aam-phase-number">03</div>
                  <h3 className="aam-phase-title">Strategy</h3>
                  <p className="aam-phase-desc">Developing comprehensive roadmaps that align with regional goals and stakeholder interests.</p>
                </div>
                <div className="reveal rd1 aam-phase-card">
                  <div className="aam-phase-number">04</div>
                  <h3 className="aam-phase-title">Planning</h3>
                  <p className="aam-phase-desc">Creating detailed implementation plans including infrastructure, operations, and governance structures.</p>
                </div>
                <div className="reveal rd2 aam-phase-card">
                  <div className="aam-phase-number">05</div>
                  <h3 className="aam-phase-title">Coordination</h3>
                  <p className="aam-phase-desc">Facilitating dialogue between government agencies, operators, and community stakeholders.</p>
                </div>
                <div className="reveal rd3 aam-phase-card">
                  <div className="aam-phase-number">06</div>
                  <h3 className="aam-phase-title">Integration</h3>
                  <p className="aam-phase-desc">Supporting operational integration and continuous improvement as systems mature and scale.</p>
                </div>
                <div className="reveal rd1 aam-phase-card">
                  <div className="aam-phase-number">07</div>
                  <h3 className="aam-phase-title">Scaling</h3>
                  <p className="aam-phase-desc">Replicating successful models across additional communities and expanding service capabilities.</p>
                </div>
              </div>
            </div>

            {/* Scroll Controls */}
            <div className="aam-scroll-controls">
              <button
                onClick={() => scrollContainer('phaseScroll', 'prev')}
                className="aam-scroll-btn"
                aria-label="Scroll phases left"
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <polyline points="15 18 9 12 15 6"></polyline>
                </svg>
              </button>
              <button
                onClick={() => scrollContainer('phaseScroll', 'next')}
                className="aam-scroll-btn"
                aria-label="Scroll phases right"
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <polyline points="9 18 15 12 9 6"></polyline>
                </svg>
              </button>
            </div>
          </div>
        </section>

        {/* Section Divider */}
        <div className="section-divider py-12">
          <div className="gold-line" />
        </div>

        {/* Service Approach - Three Cards */}
        <section className="py-20 px-6">
          <div className="max-w-6xl mx-auto">
            <div className="mb-16 reveal">
              <div className="section-label gold-text">Our Method</div>
              <h2 className="section-title">Three Pillars of Service</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Define Card */}
              <div className="reveal rd1 aam-service-card" style={{ background: 'linear-gradient(135deg, rgba(14,30,60,0.3), rgba(201,168,76,0.05))' }}>
                <div className="aam-service-badge">Phase 01</div>
                <h3 className="aam-service-title">Define</h3>
                <p className="aam-service-desc">
                  We clarify your objectives, analyze existing conditions, and establish success metrics for advanced air mobility initiatives.
                </p>
                <button
                  onClick={() => toggleCard('define')}
                  className={`aam-expand-btn ${expandedCards.has('define') ? 'expanded' : ''}`}
                  aria-expanded={expandedCards.has('define')}
                >
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <polyline points="6 9 12 15 18 9"></polyline>
                  </svg>
                </button>
                <ul className={`aam-capability-list ${expandedCards.has('define') ? 'expanded' : ''}`}>
                  <li>Vision and goal setting</li>
                  <li>Stakeholder analysis</li>
                  <li>Baseline assessment</li>
                  <li>Requirement definition</li>
                  <li>Success metrics</li>
                </ul>
              </div>

              {/* Enable Card */}
              <div className="reveal rd2 aam-service-card" style={{ background: 'linear-gradient(135deg, rgba(20,40,70,0.3), rgba(201,168,76,0.05))' }}>
                <div className="aam-service-badge">Phase 02</div>
                <h3 className="aam-service-title">Enable</h3>
                <p className="aam-service-desc">
                  We build the organizational, regulatory, and operational foundations required for successful deployment.
                </p>
                <button
                  onClick={() => toggleCard('enable')}
                  className={`aam-expand-btn ${expandedCards.has('enable') ? 'expanded' : ''}`}
                  aria-expanded={expandedCards.has('enable')}
                >
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <polyline points="6 9 12 15 18 9"></polyline>
                  </svg>
                </button>
                <ul className={`aam-capability-list ${expandedCards.has('enable') ? 'expanded' : ''}`}>
                  <li>Policy framework development</li>
                  <li>Infrastructure planning</li>
                  <li>Organizational design</li>
                  <li>Training and capacity building</li>
                  <li>System integration</li>
                </ul>
              </div>

              {/* Deliver Card */}
              <div className="reveal rd3 aam-service-card" style={{ background: 'linear-gradient(135deg, rgba(10,25,50,0.3), rgba(201,168,76,0.08))' }}>
                <div className="aam-service-badge">Phase 03</div>
                <h3 className="aam-service-title">Deliver</h3>
                <p className="aam-service-desc">
                  We support implementation, manage stakeholder engagement, and optimize operations for sustained success.
                </p>
                <button
                  onClick={() => toggleCard('deliver')}
                  className={`aam-expand-btn ${expandedCards.has('deliver') ? 'expanded' : ''}`}
                  aria-expanded={expandedCards.has('deliver')}
                >
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <polyline points="6 9 12 15 18 9"></polyline>
                  </svg>
                </button>
                <ul className={`aam-capability-list ${expandedCards.has('deliver') ? 'expanded' : ''}`}>
                  <li>Project management</li>
                  <li>Change management</li>
                  <li>Performance monitoring</li>
                  <li>Continuous improvement</li>
                  <li>Scaling support</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Section Divider */}
        <div className="section-divider py-12">
          <div className="gold-line" />
        </div>

        {/* Parallax Quote Panel 2 */}
        <section className="py-20 px-6 bg-gradient-to-b from-transparent via-[rgba(14,30,60,0.2)] to-transparent">
          <div className="max-width-5xl mx-auto text-center reveal">
            <p className="section-title text-center">
              Advanced air mobility is not a distant future—it's an <em>emerging reality</em> that requires thoughtful planning today.
            </p>
          </div>
        </section>

        {/* Section Divider */}
        <div className="section-divider py-12">
          <div className="gold-line" />
        </div>

        {/* Stakeholder Ecosystem */}
        <section className="py-20 px-6">
          <div className="max-w-6xl mx-auto">
            <div className="mb-16 reveal">
              <div className="section-label gold-text">Our Network</div>
              <h2 className="section-title">Stakeholder Ecosystem</h2>
              <p className="section-text mt-6">
                We work across a diverse network of government agencies, private operators, technology providers, and community organizations.
              </p>
            </div>

            <div className="aam-stakeholder-section">
              {/* Public Sector */}
              <div className="reveal rd1 aam-stakeholder-column">
                <h3 className="aam-stakeholder-title">Public Sector</h3>
                <button
                  onClick={() => toggleCard('public-sector')}
                  className="text-left mb-4 flex items-center gap-2 text-[#c9a84c] hover:text-[#e8d5a0] transition"
                >
                  <span className={`transform transition ${expandedCards.has('public-sector') ? 'rotate-180' : ''}`}>▼</span>
                  <span className="text-sm uppercase tracking-widest font-semibold">View Stakeholders</span>
                </button>
                <ul className={`aam-stakeholder-list ${expandedCards.has('public-sector') ? 'expanded' : ''}`}>
                  <li>Federal Aviation Administration (FAA)</li>
                  <li>State Transportation Departments</li>
                  <li>Municipal Government Agencies</li>
                  <li>Urban Development Authorities</li>
                  <li>Environmental Protection Agencies</li>
                </ul>
              </div>

              {/* Hub Center */}
              <div className="reveal aam-stakeholder-hub">
                <div className="aam-hub-center">
                  <div className="aam-hub-ring" />
                  <div className="aam-hub-ring" />
                  <div className="aam-hub-ring" />
                  <div className="aam-hub-text">Rawlins<br />Aero Team</div>
                </div>
              </div>

              {/* Private Sector */}
              <div className="reveal rd3 aam-stakeholder-column">
                <h3 className="aam-stakeholder-title">Private Sector</h3>
                <button
                  onClick={() => toggleCard('private-sector')}
                  className="text-left mb-4 flex items-center gap-2 text-[#c9a84c] hover:text-[#e8d5a0] transition"
                >
                  <span className={`transform transition ${expandedCards.has('private-sector') ? 'rotate-180' : ''}`}>▼</span>
                  <span className="text-sm uppercase tracking-widest font-semibold">View Stakeholders</span>
                </button>
                <ul className={`aam-stakeholder-list ${expandedCards.has('private-sector') ? 'expanded' : ''}`}>
                  <li>Aircraft Manufacturers</li>
                  <li>UAS Technology Providers</li>
                  <li>Logistics & Delivery Companies</li>
                  <li>Air Mobility Operators</li>
                  <li>Infrastructure Developers</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Section Divider */}
        <div className="section-divider py-12">
          <div className="gold-line" />
        </div>

        {/* Large Video Section */}
        <section className="py-20 px-6">
          <div className="max-w-5xl mx-auto">
            <div className="reveal">
              <div className="aam-video-placeholder">
                <div className="aam-play-button" />
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="aam-cta-section">
          <div className="reveal rd1">
            <h2 className="aam-cta-title">Ready to Explore Advanced Air Mobility?</h2>
            <p className="aam-cta-subtitle">
              Let's discuss how your community can benefit from next-generation aerial capabilities.
            </p>
            <Link href="/contact">
              <button className="aam-cta-btn">Get in Touch</button>
            </Link>
          </div>
        </section>

        {/* Section Divider */}
        <div className="section-divider py-12">
          <div className="gold-line" />
        </div>
      </div>

      <SiteFooter />
    </div>
  );
};

export default AAMPage;
