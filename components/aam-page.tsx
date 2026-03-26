'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import SiteNav from '@/components/site-nav';
import SiteFooter from '@/components/site-footer';

const AAMPage = () => {
  const [expandedCard, setExpandedCard] = useState<string | null>(null);
  const [expandedAccordion, setExpandedAccordion] = useState<number | null>(null);
  const [expandedService, setExpandedService] = useState<'aam' | 'uas' | null>(null);
  const [visibleElements, setVisibleElements] = useState<Set<string>>(new Set());
  const observerRef = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisibleElements((prev) => new Set([...prev, entry.target.id]));
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -100px 0px' }
    );

    const reveals = document.querySelectorAll('.reveal');
    reveals.forEach((el) => {
      if (observerRef.current) {
        observerRef.current.observe(el);
      }
    });

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, []);

  useEffect(() => {
    const reveals = document.querySelectorAll('.reveal');
    reveals.forEach((el) => {
      if (visibleElements.has(el.id)) {
        el.classList.add('visible');
      }
    });
  }, [visibleElements]);

  const toggleCard = (cardId: string) => {
    setExpandedCard(expandedCard === cardId ? null : cardId);
  };

  const toggleAccordion = (index: number) => {
    setExpandedAccordion(expandedAccordion === index ? null : index);
  };

  const aamServices = [
    'Feasibility studies and site assessments',
    'Vertiport planning and design guidance',
    'Air traffic management integration support',
    'Policy and governance framework development',
    'Community outreach and public engagement',
    'Pilot program design and oversight',
    'Economic impact and cost-benefit analysis',
    'Safety case development and risk assessment',
    'Multimodal integration planning',
    'Regulatory compliance and certification support',
  ];

  const uasServices = [
    'Operational design domain (ODD) development',
    'Drone delivery corridor planning',
    'Data governance and privacy frameworks',
    'Beyond visual line of sight (BVLOS) operations support',
    'Safety management system development',
    'Integration with ground transportation networks',
    'Workforce training and UAS operator programs',
    'Airspace deconfliction and UTM integration',
    'Environmental and community impact assessments',
    'Procurement support and vendor evaluation',
  ];

  return (
    <main style={{ backgroundColor: '#0a1628', color: '#ffffff', minHeight: '100vh' }}>
      <SiteNav />

      <style>{`
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }

        body {
          font-family: 'DM Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
          color: #ffffff;
          background-color: #0a1628;
        }

        .aam-container {
          background-color: #0a1628;
          position: relative;
          overflow: hidden;
        }

        /* Background ambient orbs */
        .aam-container::before {
          content: '';
          position: fixed;
          top: -40%;
          right: -10%;
          width: 600px;
          height: 600px;
          background: radial-gradient(circle, rgba(201, 168, 76, 0.08) 0%, transparent 70%);
          border-radius: 50%;
          pointer-events: none;
          z-index: 0;
        }

        .aam-container::after {
          content: '';
          position: fixed;
          bottom: -20%;
          left: -10%;
          width: 500px;
          height: 500px;
          background: radial-gradient(circle, rgba(212, 184, 120, 0.06) 0%, transparent 70%);
          border-radius: 50%;
          pointer-events: none;
          z-index: 0;
        }

        .content-wrapper {
          position: relative;
          z-index: 1;
        }

        /* Hero Section */
        .hero {
          min-height: 100vh;
          display: flex;
          flex-direction: column;
          justify-content: flex-start;
          padding: 180px 60px 100px;
          background: linear-gradient(135deg, rgba(10, 22, 40, 0.95) 0%, rgba(20, 35, 60, 0.9) 100%);
          position: relative;
          overflow: hidden;
        }

        .hero::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background:
            radial-gradient(circle at 20% 50%, rgba(201, 168, 76, 0.1) 0%, transparent 50%),
            radial-gradient(circle at 80% 80%, rgba(212, 184, 120, 0.08) 0%, transparent 50%);
          pointer-events: none;
        }

        .hero-content {
          position: relative;
          z-index: 2;
          max-width: 900px;
        }

        .breadcrumb {
          font-size: 13px;
          letter-spacing: 2px;
          text-transform: uppercase;
          color: #c9a84c;
          margin-bottom: 40px;
          font-weight: 600;
        }

        .hero-title {
          font-family: 'Cormorant Garamond', serif;
          font-size: 64px;
          font-weight: 600;
          line-height: 1.2;
          margin-bottom: 24px;
          color: #ffffff;
        }

        .hero-title-italic {
          font-style: italic;
          color: #c9a84c;
        }

        .hero-subtitle {
          font-size: 24px;
          font-weight: 300;
          line-height: 1.4;
          color: #d4b878;
          margin-bottom: 80px;
          max-width: 700px;
        }

        .video-placeholder {
          width: 100%;
          max-width: 600px;
          aspect-ratio: 16 / 9;
          background: rgba(30, 40, 60, 0.6);
          border: 1px solid rgba(201, 168, 76, 0.3);
          border-radius: 8px;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          margin-bottom: 100px;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .video-placeholder:hover {
          border-color: rgba(201, 168, 76, 0.6);
          background: rgba(30, 40, 60, 0.8);
        }

        .play-icon {
          width: 80px;
          height: 80px;
          margin-bottom: 20px;
        }

        .video-text {
          font-size: 16px;
          font-weight: 600;
          color: #c9a84c;
        }

        .video-subtext {
          font-size: 13px;
          color: #999;
          margin-top: 8px;
        }

        .scroll-indicator {
          position: absolute;
          bottom: 40px;
          left: 50%;
          transform: translateX(-50%);
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 12px;
          animation: bounce 2s infinite;
        }

        @keyframes bounce {
          0%, 100% { transform: translateX(-50%) translateY(0); }
          50% { transform: translateX(-50%) translateY(10px); }
        }

        .scroll-text {
          font-size: 12px;
          letter-spacing: 1px;
          text-transform: uppercase;
          color: #c9a84c;
        }

        .scroll-line {
          width: 2px;
          height: 30px;
          background: linear-gradient(to bottom, #c9a84c, transparent);
        }

        /* Section Structure */
        .section {
          padding: 120px 60px;
          position: relative;
          z-index: 2;
        }

        .section-label {
          font-size: 13px;
          letter-spacing: 2px;
          text-transform: uppercase;
          color: #c9a84c;
          margin-bottom: 20px;
          font-weight: 600;
        }

        .section-heading {
          font-family: 'Cormorant Garamond', serif;
          font-size: 48px;
          font-weight: 600;
          margin-bottom: 40px;
          color: #ffffff;
        }

        .gold-divider {
          height: 2px;
          background: linear-gradient(to right, #c9a84c, transparent);
          margin: 60px 0;
        }

        /* Overview Section */
        .overview-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 80px;
          align-items: start;
        }

        .overview-left h3 {
          font-family: 'Cormorant Garamond', serif;
          font-size: 42px;
          font-weight: 600;
          line-height: 1.2;
          margin-bottom: 40px;
          color: #e8d5a0;
        }

        .overview-right p {
          font-size: 16px;
          line-height: 1.8;
          margin-bottom: 24px;
          color: #ccc;
        }

        /* Value Cards Section */
        .value-intro {
          font-size: 16px;
          line-height: 1.8;
          color: #d4b878;
          margin-bottom: 60px;
          max-width: 900px;
        }

        .cards-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 40px;
        }

        .value-card {
          background: rgba(20, 35, 60, 0.6);
          border: 1px solid rgba(201, 168, 76, 0.2);
          border-radius: 8px;
          padding: 40px;
          transition: all 0.3s ease;
          cursor: pointer;
        }

        .value-card:hover {
          border-color: rgba(201, 168, 76, 0.5);
          background: rgba(20, 35, 60, 0.8);
          transform: translateY(-4px);
        }

        .card-icon {
          width: 60px;
          height: 60px;
          margin-bottom: 24px;
        }

        .gold-accent-bar {
          width: 40px;
          height: 4px;
          background: #c9a84c;
          margin-bottom: 20px;
        }

        .card-title {
          font-family: 'Cormorant Garamond', serif;
          font-size: 24px;
          font-weight: 600;
          margin-bottom: 12px;
          color: #e8d5a0;
        }

        .card-description {
          font-size: 14px;
          line-height: 1.6;
          color: #aaa;
          margin-bottom: 24px;
        }

        .expand-button {
          background: none;
          border: none;
          color: #c9a84c;
          font-size: 14px;
          font-weight: 600;
          cursor: pointer;
          padding: 0;
          display: flex;
          align-items: center;
          gap: 8px;
          transition: all 0.3s ease;
        }

        .expand-button:hover {
          gap: 12px;
        }

        .expand-icon {
          display: inline-block;
          transition: transform 0.3s ease;
        }

        .expand-button.expanded .expand-icon {
          transform: rotate(180deg);
        }

        .card-bullets {
          max-height: 0;
          overflow: hidden;
          transition: max-height 0.3s ease;
        }

        .card-bullets.expanded {
          max-height: 400px;
          margin-top: 20px;
          border-top: 1px solid rgba(201, 168, 76, 0.2);
          padding-top: 20px;
        }

        .card-bullets ul {
          list-style: none;
        }

        .card-bullets li {
          font-size: 13px;
          line-height: 1.8;
          color: #999;
          margin-bottom: 12px;
          padding-left: 20px;
          position: relative;
        }

        .card-bullets li::before {
          content: '▪';
          position: absolute;
          left: 0;
          color: #c9a84c;
        }

        /* How We Serve Section */
        .serve-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 80px;
          align-items: start;
        }

        .serve-left h3 {
          font-family: 'Cormorant Garamond', serif;
          font-size: 42px;
          font-weight: 600;
          line-height: 1.2;
          margin-bottom: 24px;
          color: #e8d5a0;
        }

        .serve-left p {
          font-size: 16px;
          line-height: 1.8;
          color: #ccc;
          margin-bottom: 20px;
        }

        .accordion-item {
          border-bottom: 1px solid rgba(201, 168, 76, 0.2);
          padding: 24px 0;
        }

        .accordion-item:first-child {
          padding-top: 0;
        }

        .accordion-header {
          background: none;
          border: none;
          width: 100%;
          text-align: left;
          color: #e8d5a0;
          font-size: 16px;
          font-weight: 600;
          cursor: pointer;
          padding: 0;
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 20px;
          transition: color 0.3s ease;
        }

        .accordion-header:hover {
          color: #c9a84c;
        }

        .accordion-number {
          color: #c9a84c;
          font-weight: 700;
          flex-shrink: 0;
        }

        .accordion-toggle {
          color: #c9a84c;
          font-size: 20px;
          flex-shrink: 0;
          transition: transform 0.3s ease;
        }

        .accordion-toggle.expanded {
          transform: rotate(180deg);
        }

        .accordion-content {
          max-height: 0;
          overflow: hidden;
          transition: max-height 0.3s ease;
          color: #999;
          font-size: 14px;
          line-height: 1.8;
        }

        .accordion-content.expanded {
          max-height: 200px;
          margin-top: 16px;
        }

        /* Service Categories */
        .categories-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 40px;
        }

        .category-card {
          background: rgba(20, 35, 60, 0.6);
          border: 1px solid rgba(201, 168, 76, 0.2);
          border-radius: 8px;
          padding: 40px;
          transition: all 0.3s ease;
          cursor: pointer;
        }

        .category-card:hover {
          border-color: rgba(201, 168, 76, 0.5);
          background: rgba(20, 35, 60, 0.8);
          transform: translateY(-4px);
        }

        .category-badge {
          display: inline-block;
          padding: 8px 16px;
          border-radius: 4px;
          font-size: 12px;
          font-weight: 600;
          letter-spacing: 1px;
          text-transform: uppercase;
          margin-bottom: 24px;
        }

        .category-badge-define {
          background: rgba(201, 168, 76, 0.2);
          color: #c9a84c;
        }

        .category-badge-enable {
          background: rgba(212, 184, 120, 0.2);
          color: #d4b878;
        }

        .category-badge-deliver {
          background: rgba(232, 213, 160, 0.2);
          color: #e8d5a0;
        }

        .category-title {
          font-family: 'Cormorant Garamond', serif;
          font-size: 28px;
          font-weight: 600;
          margin-bottom: 20px;
          color: #e8d5a0;
        }

        .category-bullets {
          max-height: 0;
          overflow: hidden;
          transition: max-height 0.3s ease;
        }

        .category-bullets.expanded {
          max-height: 500px;
        }

        .category-bullets ul {
          list-style: none;
          margin-top: 20px;
          border-top: 1px solid rgba(201, 168, 76, 0.2);
          padding-top: 20px;
        }

        .category-bullets li {
          font-size: 13px;
          line-height: 1.8;
          color: #999;
          margin-bottom: 12px;
          padding-left: 20px;
          position: relative;
        }

        .category-bullets li::before {
          content: '▪';
          position: absolute;
          left: 0;
          color: #c9a84c;
        }

        /* Service Portfolio */
        .portfolio-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 60px;
        }

        .portfolio-column h3 {
          font-size: 20px;
          font-weight: 600;
          color: #e8d5a0;
          margin-bottom: 30px;
          font-family: 'DM Sans', sans-serif;
        }

        .portfolio-items {
          display: flex;
          flex-direction: column;
          gap: 16px;
        }

        .portfolio-item {
          padding: 16px;
          background: rgba(20, 35, 60, 0.4);
          border-left: 3px solid #c9a84c;
          border-radius: 4px;
          font-size: 14px;
          line-height: 1.6;
          color: #ccc;
          transition: all 0.3s ease;
        }

        .portfolio-item:hover {
          background: rgba(20, 35, 60, 0.6);
          border-left-color: #e8d5a0;
        }

        .portfolio-item.hidden {
          display: none;
        }

        .view-all-button {
          background: none;
          border: 1px solid #c9a84c;
          color: #c9a84c;
          padding: 12px 24px;
          border-radius: 4px;
          font-size: 13px;
          font-weight: 600;
          letter-spacing: 1px;
          text-transform: uppercase;
          cursor: pointer;
          margin-top: 24px;
          transition: all 0.3s ease;
        }

        .view-all-button:hover {
          background: rgba(201, 168, 76, 0.1);
          border-color: #e8d5a0;
          color: #e8d5a0;
        }

        /* Stakeholders Section */
        .stakeholders-intro {
          max-width: 900px;
          margin-bottom: 80px;
        }

        .stakeholders-intro p {
          font-size: 16px;
          line-height: 1.8;
          color: #d4b878;
        }

        .stakeholder-diagram {
          display: grid;
          grid-template-columns: 1fr 1fr 1fr;
          gap: 60px;
          align-items: start;
          background: rgba(20, 35, 60, 0.4);
          border: 1px solid rgba(201, 168, 76, 0.2);
          border-radius: 8px;
          padding: 60px 40px;
          margin-bottom: 60px;
        }

        .stakeholder-column {
          display: flex;
          flex-direction: column;
          gap: 40px;
        }

        .stakeholder-group {
          background: rgba(30, 45, 70, 0.8);
          border-left: 3px solid #c9a84c;
          padding: 20px;
          border-radius: 4px;
        }

        .stakeholder-group-title {
          font-size: 13px;
          font-weight: 700;
          letter-spacing: 1px;
          text-transform: uppercase;
          color: #c9a84c;
          margin-bottom: 12px;
        }

        .stakeholder-items {
          list-style: none;
          font-size: 13px;
          line-height: 1.8;
          color: #aaa;
        }

        .stakeholder-items li {
          margin-bottom: 8px;
        }

        .stakeholder-center {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          position: relative;
        }

        .hub-circle {
          position: relative;
          display: flex;
          align-items: center;
          justify-content: center;
          width: 200px;
          height: 200px;
          margin-bottom: 40px;
        }

        .hub-pulse-ring {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          border: 2px solid rgba(201, 168, 76, 0.4);
          border-radius: 50%;
          animation: pulse-ring 3s ease-in-out infinite;
        }

        .hub-pulse-ring:nth-child(1) {
          width: 200px;
          height: 200px;
          animation-delay: 0s;
        }

        .hub-pulse-ring:nth-child(2) {
          width: 240px;
          height: 240px;
          animation-delay: 0.5s;
          border-color: rgba(201, 168, 76, 0.2);
        }

        .hub-pulse-ring:nth-child(3) {
          width: 280px;
          height: 280px;
          animation-delay: 1s;
          border-color: rgba(201, 168, 76, 0.1);
        }

        @keyframes pulse-ring {
          0% {
            transform: translate(-50%, -50%) scale(1);
            opacity: 1;
          }
          100% {
            transform: translate(-50%, -50%) scale(1.2);
            opacity: 0;
          }
        }

        .hub-center {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          text-align: center;
          z-index: 2;
        }

        .hub-logo {
          width: 60px;
          height: 60px;
          margin: 0 auto 12px;
          background: linear-gradient(135deg, #c9a84c, #e8d5a0);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: 700;
          font-size: 24px;
          color: #0a1628;
        }

        .hub-text {
          font-size: 11px;
          font-weight: 600;
          letter-spacing: 1px;
          text-transform: uppercase;
          color: #c9a84c;
          margin-bottom: 8px;
        }

        .hub-subtitle {
          font-family: 'Cormorant Garamond', serif;
          font-size: 14px;
          color: #e8d5a0;
        }

        .hub-roles {
          display: flex;
          flex-direction: column;
          gap: 12px;
          margin-top: 30px;
        }

        .hub-role {
          font-size: 11px;
          color: #999;
          padding: 8px 12px;
          background: rgba(201, 168, 76, 0.1);
          border-radius: 4px;
          text-align: center;
        }

        /* Video Section */
        .video-section {
          background: rgba(20, 35, 60, 0.6);
          border: 1px solid rgba(201, 168, 76, 0.2);
          border-radius: 8px;
          padding: 80px 60px;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          min-height: 500px;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .video-section:hover {
          border-color: rgba(201, 168, 76, 0.5);
          background: rgba(20, 35, 60, 0.8);
        }

        .video-play-icon {
          width: 100px;
          height: 100px;
          margin-bottom: 30px;
        }

        .video-section-title {
          font-family: 'Cormorant Garamond', serif;
          font-size: 36px;
          font-weight: 600;
          color: #e8d5a0;
          margin-bottom: 12px;
        }

        .video-section-subtitle {
          font-size: 14px;
          color: #999;
        }

        /* CTA Section */
        .cta-section {
          text-align: center;
          max-width: 800px;
          margin: 0 auto;
        }

        .cta-section h2 {
          font-family: 'Cormorant Garamond', serif;
          font-size: 48px;
          font-weight: 600;
          margin-bottom: 24px;
          color: #e8d5a0;
        }

        .cta-section p {
          font-size: 16px;
          line-height: 1.8;
          color: #ccc;
          margin-bottom: 40px;
        }

        .cta-button {
          display: inline-block;
          padding: 16px 40px;
          background: linear-gradient(135deg, #c9a84c, #d4b878);
          color: #0a1628;
          border: none;
          border-radius: 4px;
          font-size: 14px;
          font-weight: 700;
          letter-spacing: 1px;
          text-transform: uppercase;
          cursor: pointer;
          transition: all 0.3s ease;
          text-decoration: none;
        }

        .cta-button:hover {
          transform: translateY(-2px);
          box-shadow: 0 12px 24px rgba(201, 168, 76, 0.3);
        }

        /* Reveal Animation */
        .reveal {
          opacity: 0;
          transform: translateY(30px);
          transition: opacity 0.6s ease, transform 0.6s ease;
        }

        .reveal.visible {
          opacity: 1;
          transform: translateY(0);
        }

        /* Responsive */
        @media (max-width: 1024px) {
          .hero {
            padding: 140px 40px 80px;
          }

          .hero-title {
            font-size: 48px;
          }

          .hero-subtitle {
            font-size: 20px;
          }

          .section {
            padding: 80px 40px;
          }

          .section-heading {
            font-size: 36px;
          }

          .overview-grid,
          .serve-grid {
            grid-template-columns: 1fr;
            gap: 40px;
          }

          .cards-grid,
          .categories-grid {
            grid-template-columns: 1fr;
          }

          .stakeholder-diagram {
            grid-template-columns: 1fr;
            gap: 40px;
          }

          .portfolio-grid {
            grid-template-columns: 1fr;
          }
        }

        @media (max-width: 768px) {
          .hero {
            padding: 100px 24px 60px;
          }

          .hero-title {
            font-size: 36px;
          }

          .hero-subtitle {
            font-size: 18px;
          }

          .section {
            padding: 60px 24px;
          }

          .section-heading {
            font-size: 28px;
          }

          .overview-left h3,
          .serve-left h3 {
            font-size: 28px;
          }
        }
      `}</style>

      <div className="aam-container">
        <div className="content-wrapper">
          {/* Hero Section */}
          <section className="hero" id="hero-reveal">
            <div className="hero-content">
              <div className="breadcrumb">Technology · Advanced Air Mobility & UAS</div>
              <h1 className="hero-title">
                Partnering to turn AAM and UAS concepts into{' '}
                <span className="hero-title-italic">community transport solutions</span>
              </h1>
              <p className="hero-subtitle">
                Are you ready for the next major phase in transportation's evolution?
              </p>
              <div className="video-placeholder">
                <svg className="play-icon" viewBox="0 0 80 80" fill="none">
                  <circle cx="40" cy="40" r="39" stroke="#c9a84c" strokeWidth="2" />
                  <polygon points="35,25 35,55 60,40" fill="#c9a84c" />
                </svg>
                <div className="video-text">Video Coming Soon</div>
              </div>
            </div>
            <div className="scroll-indicator">
              <div className="scroll-text">Scroll</div>
              <div className="scroll-line" />
            </div>
          </section>

          {/* Overview Section */}
          <section className="section" id="overview-reveal">
            <div className="reveal" id="overview-content">
              <div className="section-label">Overview</div>
              <div className="overview-grid">
                <div className="overview-left">
                  <h2 className="section-heading">
                    The next major phase in transportation's evolution
                  </h2>
                </div>
                <div className="overview-right">
                  <p>
                    Advanced air mobility (AAM) and uncrewed aircraft systems (UAS) are
                    increasingly part of modern mobility ecosystems. Together, these systems and
                    associated technologies are expected to transform transportation by enhancing
                    connectivity, improving cargo logistics, expediting emergency response, and
                    assisting infrastructure inspection.
                  </p>
                  <p>
                    Next-generation aerial capabilities, integrated into existing mobility
                    systems, complement ground, rail, and maritime transport networks. They
                    strengthen multimodal transportation and enable urban, rural, and regional
                    areas to benefit from a more connected, resilient, and adaptable mobility
                    ecosystem.
                  </p>
                </div>
              </div>
            </div>
          </section>

          <div className="gold-divider" />

          {/* Value Section */}
          <section className="section" id="value-reveal">
            <div className="reveal" id="value-content">
              <div className="section-label">Where AAM and UAS deliver value</div>
              <h2 className="section-heading">Capabilities that underpin the future of mobility</h2>
              <p className="value-intro">
                The capabilities pioneered by UAS technologies underpin the development of AAM,
                which extends UAS applications into full-scale mobility solutions. UAS refers to
                all uncrewed aircraft, from small drones to larger remotely piloted systems. AAM
                represents a new vision of mobility, expanding transportation options for
                passengers, cargo, and emergency services across communities and regions.
              </p>

              <div className="cards-grid">
                {[
                  {
                    id: 'aam-taxis',
                    title: 'AAM (Air Taxis)',
                    desc: 'Expanding passenger mobility through electric vertical takeoff and landing (eVTOL) aircraft for urban and regional transport.',
                    bullets: [
                      'Urban mobility',
                      'Business travel',
                      'Emergency medical transport',
                      'Regional connectivity',
                      'Tourism & sightseeing',
                    ],
                  },
                  {
                    id: 'uas-data',
                    title: 'UAS Data Collection',
                    desc: 'Harnessing drone technology to gather critical infrastructure, environmental, and operational data at scale.',
                    bullets: [
                      'Infrastructure inspection',
                      'Construction inspection & monitoring',
                      'Environmental monitoring',
                      'Aerial surveying & mapping',
                      'Disaster response',
                    ],
                  },
                  {
                    id: 'uas-delivery',
                    title: 'UAS Package Delivery',
                    desc: 'Enabling efficient, scalable last-mile and specialized delivery operations across diverse geographies.',
                    bullets: [
                      'Last-mile delivery',
                      'Medical supply delivery',
                      'Rural & remote delivery',
                      'Inter-community delivery',
                      'Retail & e-commerce support',
                    ],
                  },
                ].map((card) => (
                  <div
                    key={card.id}
                    className="value-card reveal"
                    id={`card-${card.id}`}
                    onClick={() => toggleCard(card.id)}
                  >
                    <svg className="card-icon" viewBox="0 0 60 60" fill="none">
                      {card.id === 'aam-taxis' && (
                        <>
                          <circle cx="30" cy="15" r="8" fill="#c9a84c" />
                          <path
                            d="M 30 23 L 15 50 L 20 50 L 28 35 L 32 35 L 40 50 L 45 50 Z"
                            fill="#c9a84c"
                          />
                        </>
                      )}
                      {card.id === 'uas-data' && (
                        <>
                          <rect x="10" y="10" width="40" height="40" fill="none" stroke="#c9a84c" strokeWidth="2" />
                          <circle cx="30" cy="30" r="6" fill="#c9a84c" />
                          <path d="M 20 15 L 40 45 M 40 15 L 20 45" stroke="#c9a84c" strokeWidth="2" />
                        </>
                      )}
                      {card.id === 'uas-delivery' && (
                        <>
                          <path
                            d="M 15 40 L 30 15 L 45 40 Z"
                            fill="none"
                            stroke="#c9a84c"
                            strokeWidth="2"
                          />
                          <line x1="30" y1="15" x2="30" y2="40" stroke="#c9a84c" strokeWidth="2" />
                          <circle cx="30" cy="48" r="5" fill="none" stroke="#c9a84c" strokeWidth="2" />
                        </>
                      )}
                    </svg>
                    <div className="gold-accent-bar" />
                    <h3 className="card-title">{card.title}</h3>
                    <p className="card-description">{card.desc}</p>
                    <button
                      className={`expand-button ${expandedCard === card.id ? 'expanded' : ''}`}
                    >
                      <span>{expandedCard === card.id ? 'Show Less' : 'Learn More'}</span>
                      <span className="expand-icon">▼</span>
                    </button>
                    <div className={`card-bullets ${expandedCard === card.id ? 'expanded' : ''}`}>
                      <ul>
                        {card.bullets.map((bullet, idx) => (
                          <li key={idx}>{bullet}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          <div className="gold-divider" />

          {/* How We Serve Section */}
          <section className="section" id="serve-reveal">
            <div className="reveal" id="serve-content">
              <div className="section-label">How we serve our clients</div>
              <div className="serve-grid">
                <div className="serve-left">
                  <h2 className="section-heading">Guiding programs from concept through sustained operation</h2>
                  <p>
                    Our team brings together regulatory guidance, operational expertise, and
                    program strategy to deliver real-world results. We support AAM and UAS
                    initiatives throughout the program lifecycle.
                  </p>
                </div>
                <div className="serve-right">
                  <h3 style={{ fontSize: '18px', fontWeight: '600', marginBottom: '30px', color: '#e8d5a0' }}>
                    Essential phases
                  </h3>
                  {[
                    {
                      title: 'Policy & System Planning',
                      desc: 'Develop policy, system plans, and standardized guidance for local implementation.',
                    },
                    {
                      title: 'Regulatory Navigation',
                      desc: 'Provide regulatory understanding for compliance and guide regulatory coordination.',
                    },
                    {
                      title: 'Infrastructure Planning',
                      desc: 'Plan for infrastructure, including vertiports, including technical research and validation.',
                    },
                    {
                      title: 'Functional Frameworks',
                      desc: 'Establish functional frameworks that support scalable program delivery and operational readiness.',
                    },
                    {
                      title: 'Data & Safety Integration',
                      desc: 'Integrate data and safety policies into transportation systems to ensure safe, reliable operations.',
                    },
                    {
                      title: 'Implementation & Scaling',
                      desc: 'Support implementation, deployment, and the scaling of AAM and UAS services across communities.',
                    },
                    {
                      title: 'Community Engagement',
                      desc: 'Facilitate ongoing community engagement and public trust-building throughout the program lifecycle.',
                    },
                  ].map((item, idx) => (
                    <div key={idx} className="accordion-item reveal" id={`accordion-${idx}`}>
                      <button
                        className="accordion-header"
                        onClick={() => toggleAccordion(idx)}
                      >
                        <span className="accordion-number">{idx + 1}</span>
                        <span style={{ flex: 1 }}>{item.title}</span>
                        <span className={`accordion-toggle ${expandedAccordion === idx ? 'expanded' : ''}`}>
                          ▼
                        </span>
                      </button>
                      <div
                        className={`accordion-content ${expandedAccordion === idx ? 'expanded' : ''}`}
                      >
                        {item.desc}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>

          <div className="gold-divider" />

          {/* Service Categories Section */}
          <section className="section" id="categories-reveal">
            <div className="reveal" id="categories-content">
              <div className="section-label">Our Service Categories</div>
              <h2 className="section-heading">Our approach across the program lifecycle</h2>

              <div className="cards-grid">
                {[
                  {
                    id: 'define',
                    badge: 'Define',
                    title: 'Develop Policy',
                    items: [
                      'National aviation policy framework development',
                      'Translating emerging use cases into policy considerations',
                      'Inter-ministerial and cross-border coordination',
                      'Evidence-based policy sequencing',
                    ],
                  },
                  {
                    id: 'enable',
                    badge: 'Enable',
                    title: 'Navigate Regulations',
                    items: [
                      'Regulatory gap assessments',
                      'Certification and approval pathways',
                      'BVLOS and advanced operations support',
                      'Standards alignment and participation',
                      'Audit-ready, defensible regulatory programs',
                    ],
                  },
                  {
                    id: 'deliver',
                    badge: 'Deliver',
                    title: 'Integrate and Implement',
                    items: [
                      'Airspace integration',
                      'Aviation infrastructure readiness and planning',
                      'Multi-stakeholder coordination and governance',
                      'Risk-informed implementation pilots',
                      'Sustainable authority capacity building',
                    ],
                  },
                ].map((cat) => (
                  <div
                    key={cat.id}
                    className="category-card reveal"
                    id={`category-${cat.id}`}
                    onClick={() =>
                      setExpandedCard(
                        expandedCard === `cat-${cat.id}` ? null : `cat-${cat.id}`
                      )
                    }
                  >
                    <div className={`category-badge category-badge-${cat.id}`}>
                      {cat.badge}
                    </div>
                    <h3 className="category-title">{cat.title}</h3>
                    <button
                      className={`expand-button ${
                        expandedCard === `cat-${cat.id}` ? 'expanded' : ''
                      }`}
                    >
                      <span>{expandedCard === `cat-${cat.id}` ? 'Show Less' : 'View Details'}</span>
                      <span className="expand-icon">▼</span>
                    </button>
                    <div
                      className={`category-bullets ${
                        expandedCard === `cat-${cat.id}` ? 'expanded' : ''
                      }`}
                    >
                      <ul>
                        {cat.items.map((item, idx) => (
                          <li key={idx}>{item}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          <div className="gold-divider" />

          {/* Service Portfolio Section */}
          <section className="section" id="portfolio-reveal">
            <div className="reveal" id="portfolio-content">
              <div className="section-label">Our Service Portfolio</div>
              <h2 className="section-heading">Comprehensive AAM & UAS capabilities</h2>

              <div className="portfolio-grid">
                <div>
                  <h3>AAM Services</h3>
                  <div className="portfolio-items">
                    {aamServices.map((service, idx) => (
                      <div
                        key={idx}
                        className={`portfolio-item ${
                          expandedService === 'aam' ? '' : idx >= 4 ? 'hidden' : ''
                        } reveal`}
                        id={`aam-service-${idx}`}
                      >
                        {service}
                      </div>
                    ))}
                  </div>
                  {expandedService !== 'aam' && (
                    <button
                      className="view-all-button"
                      onClick={() => setExpandedService('aam')}
                    >
                      View all {aamServices.length} services
                    </button>
                  )}
                  {expandedService === 'aam' && (
                    <button
                      className="view-all-button"
                      onClick={() => setExpandedService(null)}
                    >
                      Show less
                    </button>
                  )}
                </div>

                <div>
                  <h3>UAS Services</h3>
                  <div className="portfolio-items">
                    {uasServices.map((service, idx) => (
                      <div
                        key={idx}
                        className={`portfolio-item ${
                          expandedService === 'uas' ? '' : idx >= 4 ? 'hidden' : ''
                        } reveal`}
                        id={`uas-service-${idx}`}
                      >
                        {service}
                      </div>
                    ))}
                  </div>
                  {expandedService !== 'uas' && (
                    <button
                      className="view-all-button"
                      onClick={() => setExpandedService('uas')}
                    >
                      View all {uasServices.length} services
                    </button>
                  )}
                  {expandedService === 'uas' && (
                    <button
                      className="view-all-button"
                      onClick={() => setExpandedService(null)}
                    >
                      Show less
                    </button>
                  )}
                </div>
              </div>
            </div>
          </section>

          <div className="gold-divider" />

          {/* Stakeholders Section */}
          <section className="section" id="stakeholders-reveal">
            <div className="reveal" id="stakeholders-content">
              <div className="section-label">Stakeholders we engage</div>
              <h2 className="section-heading">Connecting policy to operations across the ecosystem</h2>

              <div className="stakeholders-intro">
                <p>
                  We engage multiple stakeholders in the public and private sectors across AAM
                  and UAS to align policy, regulation, operations, and technology; integrate
                  systems and infrastructure; implement, deploy, and scale services.
                </p>
              </div>

              <div className="stakeholder-diagram">
                {/* Public Sector */}
                <div className="stakeholder-column">
                  <div className="stakeholder-group">
                    <div className="stakeholder-group-title">Aviation Authorities</div>
                    <ul className="stakeholder-items">
                      <li>Federal Aviation Administration</li>
                      <li>International Civil Aviation Organization</li>
                      <li>NASAO</li>
                    </ul>
                  </div>
                  <div className="stakeholder-group">
                    <div className="stakeholder-group-title">Government Agencies</div>
                    <ul className="stakeholder-items">
                      <li>Departments of Transportation</li>
                      <li>Security Agencies</li>
                      <li>Emergency Management</li>
                    </ul>
                  </div>
                  <div className="stakeholder-group">
                    <div className="stakeholder-group-title">Standards Organizations</div>
                    <ul className="stakeholder-items">
                      <li>ACRA</li>
                      <li>AASHTO</li>
                      <li>NCHRP</li>
                      <li>FHWA</li>
                    </ul>
                  </div>
                  <div className="stakeholder-group">
                    <div className="stakeholder-group-title">Academic Institutions</div>
                    <ul className="stakeholder-items">
                      <li>Research universities</li>
                      <li>Transportation research centers</li>
                      <li>Engineering programs</li>
                    </ul>
                  </div>
                </div>

                {/* Center Hub */}
                <div className="stakeholder-center">
                  <div className="hub-circle">
                    <div className="hub-pulse-ring" />
                    <div className="hub-pulse-ring" />
                    <div className="hub-pulse-ring" />
                    <div className="hub-center">
                      <div className="hub-logo">R</div>
                      <div className="hub-text">Rawlins</div>
                      <div className="hub-text">Aero Team</div>
                      <div className="hub-subtitle">Connecting Policy to Operations</div>
                    </div>
                  </div>
                  <div className="hub-roles">
                    <div className="hub-role">Policy & Standards Development</div>
                    <div className="hub-role">Regulatory Translation</div>
                    <div className="hub-role">Technical Research & Validation</div>
                    <div className="hub-role">Integration & Deployment Support</div>
                  </div>
                </div>

                {/* Private Sector */}
                <div className="stakeholder-column">
                  <div className="stakeholder-group">
                    <div className="stakeholder-group-title">Air Navigation Service Providers</div>
                    <ul className="stakeholder-items">
                      <li>UTM operators</li>
                      <li>Air traffic management providers</li>
                      <li>Data service providers</li>
                    </ul>
                  </div>
                  <div className="stakeholder-group">
                    <div className="stakeholder-group-title">Operators & Service Providers</div>
                    <ul className="stakeholder-items">
                      <li>Drone operators (data collection)</li>
                      <li>Package delivery services</li>
                      <li>Air taxi operators</li>
                    </ul>
                  </div>
                  <div className="stakeholder-group">
                    <div className="stakeholder-group-title">Industry</div>
                    <ul className="stakeholder-items">
                      <li>Aircraft manufacturers</li>
                      <li>Technology providers</li>
                      <li>Infrastructure developers</li>
                    </ul>
                  </div>
                  <div className="stakeholder-group">
                    <div className="stakeholder-group-title">Cities & MPOs</div>
                    <ul className="stakeholder-items">
                      <li>Metropolitan planning organizations</li>
                      <li>Municipal governments</li>
                      <li>Regional transit authorities</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <div className="gold-divider" />

          {/* Video Placeholder Section */}
          <section className="section" id="video-section-reveal">
            <div className="reveal" id="video-section-content">
              <div className="video-section">
                <svg className="video-play-icon" viewBox="0 0 100 100" fill="none">
                  <circle cx="50" cy="50" r="49" stroke="#c9a84c" strokeWidth="2" />
                  <polygon points="40,30 40,70 75,50" fill="#c9a84c" />
                </svg>
                <h2 className="video-section-title">See AAM & UAS in Action</h2>
                <p className="video-section-subtitle">Video coming soon</p>
              </div>
            </div>
          </section>

          <div className="gold-divider" />

          {/* CTA Section */}
          <section className="section" id="cta-reveal">
            <div className="reveal" id="cta-content">
              <div className="section-label">Ready to get started?</div>
              <div className="cta-section">
                <h2>
                  Whether you are just beginning or well along on your journey, we can provide
                  guidance and support.
                </h2>
                <p>
                  To learn more about our service portfolio and how we can help you deliver
                  successful AAM and UAS outcomes for your community, reach out to our team.
                </p>
                <Link href="/contact" className="cta-button">
                  Get in touch
                </Link>
              </div>
            </div>
          </section>
        </div>
      </div>

      <SiteFooter />
    </main>
  );
};

export default AAMPage;
