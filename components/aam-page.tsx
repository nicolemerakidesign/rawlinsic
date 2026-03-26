'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import SiteNav from '@/components/site-nav';
import SiteFooter from '@/components/site-footer';

const AAMPage = () => {
  const [expandedSections, setExpandedSections] = useState<Set<string>>(new Set());
  const [expandedCards, setExpandedCards] = useState<Set<string>>(new Set());
  const [visibleElements, setVisibleElements] = useState<Set<string>>(new Set());
  const [scrollPosition, setScrollPosition] = useState(0);
  const observerRef = useRef<IntersectionObserver | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

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

  useEffect(() => {
    const handleScroll = () => {
      setScrollPosition(window.scrollY);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
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

  return (
    <div ref={containerRef} className="min-h-screen bg-gradient-to-br from-[#0a1628] via-[#0d1f3c] to-[#0a1628] text-white overflow-hidden relative">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,600;0,700;1,400;1,600&family=DM+Sans:wght@400;500;600;700&display=swap');

        * {
          scrollbar-width: thin;
          scrollbar-color: rgba(201, 168, 76, 0.3) transparent;
        }

        ::-webkit-scrollbar {
          width: 8px;
        }

        ::-webkit-scrollbar-track {
          background: transparent;
        }

        ::-webkit-scrollbar-thumb {
          background: rgba(201, 168, 76, 0.3);
          border-radius: 4px;
        }

        ::-webkit-scrollbar-thumb:hover {
          background: rgba(201, 168, 76, 0.5);
        }

        body {
          font-family: 'DM Sans', sans-serif;
          cursor: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20"><circle cx="10" cy="10" r="8" fill="%23c9a84c" opacity="0.6"/></svg>') 10 10, auto;
        }

        .reveal {
          opacity: 0;
          transform: translateY(30px);
          transition: opacity 0.8s ease-out, transform 0.8s ease-out;
        }

        .reveal.visible {
          opacity: 1;
          transform: translateY(0);
        }

        h1, h2, h3, h4, h5, h6 {
          font-family: 'Cormorant Garamond', serif;
          font-weight: 600;
          letter-spacing: 0.5px;
        }

        /* Ambient Orbs */
        .ambient-orbs {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          pointer-events: none;
          z-index: 0;
          overflow: hidden;
        }

        .orb {
          position: absolute;
          border-radius: 50%;
          filter: blur(80px);
          opacity: 0.08;
          animation: float 15s ease-in-out infinite;
        }

        .orb-1 {
          width: 400px;
          height: 400px;
          background: radial-gradient(circle, rgba(201, 168, 76, 0.3), transparent);
          top: -100px;
          left: -100px;
          animation-duration: 20s;
        }

        .orb-2 {
          width: 300px;
          height: 300px;
          background: radial-gradient(circle, rgba(74, 144, 226, 0.2), transparent);
          top: 50%;
          right: -50px;
          animation-duration: 25s;
          animation-delay: -5s;
        }

        .orb-3 {
          width: 350px;
          height: 350px;
          background: radial-gradient(circle, rgba(138, 97, 193, 0.2), transparent);
          bottom: -100px;
          left: 20%;
          animation-duration: 30s;
          animation-delay: -10s;
        }

        .orb-4 {
          width: 280px;
          height: 280px;
          background: radial-gradient(circle, rgba(201, 168, 76, 0.25), transparent);
          top: 30%;
          left: 50%;
          animation-duration: 22s;
          animation-delay: -8s;
        }

        @keyframes float {
          0%, 100% {
            transform: translate(0, 0);
          }
          33% {
            transform: translate(-30px, -40px);
          }
          66% {
            transform: translate(30px, 20px);
          }
        }

        /* Micro Particles */
        .particles {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          pointer-events: none;
          z-index: 1;
          overflow: hidden;
        }

        .particle {
          position: absolute;
          background: rgba(201, 168, 76, 0.4);
          border-radius: 50%;
          animation: rise 20s infinite;
        }

        @keyframes rise {
          0% {
            opacity: 0;
            transform: translateY(0) translateX(0);
          }
          10% {
            opacity: 1;
          }
          90% {
            opacity: 1;
          }
          100% {
            opacity: 0;
            transform: translateY(-100vh) translateX(100px);
          }
        }

        /* Main Content */
        .content-wrapper {
          position: relative;
          z-index: 10;
        }

        /* Hero Section */
        .hero {
          min-height: 100vh;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          padding: 40px 20px;
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
          background: radial-gradient(ellipse at 50% 30%, rgba(201, 168, 76, 0.1), transparent 60%);
          pointer-events: none;
        }

        .hero-content {
          position: relative;
          z-index: 2;
          text-align: center;
          max-width: 1200px;
          width: 100%;
        }

        .breadcrumb {
          font-size: 12px;
          letter-spacing: 2px;
          text-transform: uppercase;
          color: #c9a84c;
          margin-bottom: 40px;
          font-weight: 600;
        }

        .hero-title {
          font-size: clamp(3rem, 8vw, 5rem);
          line-height: 1.1;
          margin-bottom: 20px;
          background: linear-gradient(135deg, #ffffff 0%, #e8d5a0 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .hero-title .gold {
          color: #c9a84c;
          font-style: italic;
        }

        .hero-subtitle {
          font-size: clamp(1rem, 2vw, 1.25rem);
          color: #b0b8c1;
          margin-bottom: 60px;
          font-weight: 300;
          letter-spacing: 0.5px;
        }

        /* SVG Aircraft Illustration */
        .aircraft-illustration {
          width: 100%;
          max-width: 500px;
          height: auto;
          margin: 40px 0;
          animation: float-aircraft 4s ease-in-out infinite;
        }

        @keyframes float-aircraft {
          0%, 100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-20px);
          }
        }

        /* Video Placeholder */
        .video-placeholder {
          width: 100%;
          max-width: 800px;
          aspect-ratio: 16 / 9;
          background: linear-gradient(135deg, rgba(201, 168, 76, 0.1), rgba(74, 144, 226, 0.1));
          border: 1px solid rgba(201, 168, 76, 0.2);
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
          position: relative;
          overflow: hidden;
          margin-top: 40px;
          transition: all 0.3s ease;
          cursor: pointer;
        }

        .video-placeholder:hover {
          border-color: rgba(201, 168, 76, 0.4);
          box-shadow: 0 0 40px rgba(201, 168, 76, 0.15);
        }

        .play-button {
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

        .video-placeholder:hover .play-button {
          transform: scale(1.1);
          box-shadow: 0 0 30px rgba(201, 168, 76, 0.4);
        }

        .play-button::after {
          content: '';
          width: 0;
          height: 0;
          border-left: 20px solid #c9a84c;
          border-top: 12px solid transparent;
          border-bottom: 12px solid transparent;
          margin-left: 4px;
        }

        /* Scroll Indicator */
        .scroll-indicator {
          position: absolute;
          bottom: 30px;
          left: 50%;
          transform: translateX(-50%);
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 10px;
          animation: bounce 2s infinite;
        }

        .scroll-indicator-text {
          font-size: 12px;
          letter-spacing: 1px;
          text-transform: uppercase;
          color: #c9a84c;
          font-weight: 600;
        }

        .scroll-indicator-dot {
          width: 8px;
          height: 8px;
          border: 2px solid #c9a84c;
          border-radius: 50%;
        }

        @keyframes bounce {
          0%, 100% {
            opacity: 1;
          }
          50% {
            opacity: 0.5;
            transform: translateX(-50%) translateY(10px);
          }
        }

        /* Section */
        .section {
          padding: 80px 40px;
          position: relative;
          z-index: 10;
        }

        .section-label {
          font-size: 11px;
          letter-spacing: 2.5px;
          text-transform: uppercase;
          color: #c9a84c;
          margin-bottom: 15px;
          font-weight: 700;
          display: block;
        }

        .section-title {
          font-size: clamp(2rem, 5vw, 3.5rem);
          line-height: 1.2;
          margin-bottom: 50px;
          color: #ffffff;
        }

        /* Divider */
        .divider {
          height: 1px;
          background: linear-gradient(to right, transparent, #c9a84c, transparent);
          margin: 60px 0;
          opacity: 0.5;
        }

        /* Overview Section */
        .overview-container {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 80px;
          align-items: center;
          max-width: 1400px;
          margin: 0 auto;
        }

        .overview-visual {
          position: relative;
          height: 400px;
        }

        .connected-nodes {
          width: 100%;
          height: 100%;
        }

        .overview-content {
          position: relative;
          z-index: 2;
        }

        .overview-heading {
          font-size: 2rem;
          margin-bottom: 25px;
          color: #ffffff;
        }

        .expandable-text {
          max-height: 100px;
          overflow: hidden;
          transition: max-height 0.4s ease;
          color: #b0b8c1;
          line-height: 1.8;
          font-size: 1.05rem;
        }

        .expandable-text.expanded {
          max-height: 800px;
        }

        .expand-button {
          background: none;
          border: none;
          color: #c9a84c;
          cursor: pointer;
          padding: 20px 0;
          font-size: 24px;
          display: flex;
          align-items: center;
          gap: 10px;
          transition: all 0.3s ease;
          font-weight: 600;
        }

        .expand-button:hover {
          transform: translateX(5px);
        }

        .expand-button svg {
          transition: transform 0.3s ease;
        }

        .expand-button.expanded svg {
          transform: rotate(180deg);
        }

        /* Parallax Quote */
        .parallax-quote {
          margin: 120px 0;
          padding: 80px 40px;
          background: linear-gradient(135deg, rgba(13, 31, 60, 0.8), rgba(10, 22, 40, 0.9));
          border-top: 1px solid rgba(201, 168, 76, 0.2);
          border-bottom: 1px solid rgba(201, 168, 76, 0.2);
          position: relative;
          overflow: hidden;
          z-index: 10;
        }

        .parallax-quote::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: radial-gradient(circle at ${scrollPosition * 0.3}px 50%, rgba(201, 168, 76, 0.05), transparent);
          pointer-events: none;
        }

        .quote-content {
          position: relative;
          z-index: 2;
          max-width: 900px;
          margin: 0 auto;
          text-align: center;
        }

        .quote-text {
          font-size: clamp(1.5rem, 4vw, 2.2rem);
          font-style: italic;
          line-height: 1.6;
          color: #e8d5a0;
          margin-bottom: 20px;
        }

        .quote-attribution {
          font-size: 0.95rem;
          color: #c9a84c;
          font-weight: 600;
          letter-spacing: 1px;
        }

        /* Value Cards Section */
        .value-cards {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
          gap: 40px;
          max-width: 1400px;
          margin: 0 auto;
        }

        .value-card {
          background: linear-gradient(135deg, rgba(201, 168, 76, 0.05), rgba(74, 144, 226, 0.05));
          border: 1px solid rgba(201, 168, 76, 0.15);
          border-radius: 12px;
          padding: 40px;
          transition: all 0.4s ease;
          position: relative;
          overflow: hidden;
          cursor: pointer;
        }

        .value-card::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: radial-gradient(circle at 30% 30%, rgba(201, 168, 76, 0.1), transparent);
          opacity: 0;
          transition: opacity 0.4s ease;
          pointer-events: none;
        }

        .value-card:hover {
          border-color: rgba(201, 168, 76, 0.4);
          transform: translateY(-4px);
          box-shadow: 0 20px 60px rgba(201, 168, 76, 0.1);
        }

        .value-card:hover::before {
          opacity: 1;
        }

        .card-visual {
          width: 100%;
          height: 150px;
          margin-bottom: 30px;
          border-radius: 8px;
          background: linear-gradient(135deg, rgba(201, 168, 76, 0.15), rgba(74, 144, 226, 0.15));
          display: flex;
          align-items: center;
          justify-content: center;
          position: relative;
          overflow: hidden;
        }

        .card-visual-aircraft {
          font-size: 60px;
          opacity: 0.6;
        }

        .card-visual-grid {
          position: relative;
          width: 100%;
          height: 100%;
        }

        .grid-dot {
          position: absolute;
          width: 6px;
          height: 6px;
          background: #c9a84c;
          border-radius: 50%;
          opacity: 0.7;
          animation: pulse 2s ease-in-out infinite;
        }

        @keyframes pulse {
          0%, 100% {
            opacity: 0.7;
            transform: scale(1);
          }
          50% {
            opacity: 1;
            transform: scale(1.5);
          }
        }

        .card-visual-delivery {
          position: relative;
          width: 100%;
          height: 100%;
          display: flex;
          align-items: center;
          justify-content: space-around;
          padding: 0 20px;
        }

        .delivery-node {
          width: 16px;
          height: 16px;
          background: #c9a84c;
          border-radius: 50%;
          position: relative;
        }

        .delivery-line {
          position: absolute;
          height: 2px;
          background: linear-gradient(to right, transparent, #c9a84c, transparent);
          top: 50%;
          left: 10%;
          right: 10%;
          opacity: 0.5;
        }

        .card-title {
          font-size: 1.4rem;
          margin-bottom: 15px;
          color: #ffffff;
        }

        .card-description {
          color: #b0b8c1;
          line-height: 1.7;
          font-size: 0.95rem;
          margin-bottom: 20px;
        }

        .card-expand {
          display: flex;
          align-items: center;
          gap: 8px;
          color: #c9a84c;
          font-weight: 600;
          font-size: 0.9rem;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .card-expand:hover {
          gap: 12px;
        }

        .card-expand svg {
          transition: transform 0.3s ease;
        }

        .card-expand.expanded svg {
          transform: rotate(180deg);
        }

        .card-details {
          max-height: 0;
          overflow: hidden;
          transition: max-height 0.4s ease;
          margin-top: 15px;
          padding-top: 15px;
          border-top: 1px solid rgba(201, 168, 76, 0.2);
        }

        .card-details.expanded {
          max-height: 300px;
        }

        .card-details ul {
          list-style: none;
          padding: 0;
          margin: 0;
        }

        .card-details li {
          color: #b0b8c1;
          margin-bottom: 10px;
          padding-left: 20px;
          position: relative;
          font-size: 0.95rem;
          line-height: 1.6;
        }

        .card-details li::before {
          content: '▸';
          position: absolute;
          left: 0;
          color: #c9a84c;
          font-size: 1.2rem;
        }

        /* Horizontal Scroll Section */
        .horizontal-scroll-wrapper {
          position: relative;
          overflow: hidden;
          padding: 40px 0;
          max-width: 100%;
        }

        .scroll-progress {
          height: 3px;
          background: linear-gradient(to right, rgba(201, 168, 76, 0.2), rgba(201, 168, 76, 0.5), rgba(201, 168, 76, 0.2));
          margin-bottom: 30px;
        }

        .scroll-progress-bar {
          height: 100%;
          background: linear-gradient(to right, #c9a84c, #d4b878);
          width: 0%;
          transition: width 0.3s ease;
        }

        .scroll-controls {
          display: flex;
          gap: 15px;
          justify-content: center;
          margin-bottom: 30px;
        }

        .scroll-button {
          width: 44px;
          height: 44px;
          background: linear-gradient(135deg, rgba(201, 168, 76, 0.15), rgba(201, 168, 76, 0.05));
          border: 1px solid rgba(201, 168, 76, 0.3);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          color: #c9a84c;
          transition: all 0.3s ease;
          font-weight: 600;
        }

        .scroll-button:hover {
          background: linear-gradient(135deg, rgba(201, 168, 76, 0.25), rgba(201, 168, 76, 0.1));
          border-color: rgba(201, 168, 76, 0.5);
          transform: scale(1.05);
        }

        .scroll-button:active {
          transform: scale(0.95);
        }

        .scroll-container {
          display: flex;
          gap: 30px;
          overflow-x: auto;
          padding: 0 20px;
          scroll-behavior: smooth;
          -webkit-overflow-scrolling: touch;
          scrollbar-width: none;
        }

        .scroll-container::-webkit-scrollbar {
          display: none;
        }

        .phase-card {
          flex: 0 0 320px;
          background: linear-gradient(135deg, rgba(201, 168, 76, 0.08), rgba(74, 144, 226, 0.08));
          border: 1px solid rgba(201, 168, 76, 0.2);
          border-radius: 12px;
          padding: 35px;
          display: flex;
          flex-direction: column;
          gap: 15px;
          transition: all 0.4s ease;
          cursor: pointer;
          position: relative;
          overflow: hidden;
        }

        .phase-card::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: radial-gradient(circle at 50% 50%, rgba(201, 168, 76, 0.1), transparent);
          opacity: 0;
          transition: opacity 0.4s ease;
          pointer-events: none;
        }

        .phase-card:hover {
          border-color: rgba(201, 168, 76, 0.4);
          transform: translateY(-4px);
          box-shadow: 0 15px 40px rgba(201, 168, 76, 0.15);
        }

        .phase-card:hover::before {
          opacity: 1;
        }

        .phase-number {
          font-size: 2.5rem;
          font-weight: 700;
          background: linear-gradient(135deg, #c9a84c, #e8d5a0);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .phase-title {
          font-size: 1.2rem;
          color: #ffffff;
          font-weight: 600;
        }

        .phase-description {
          font-size: 0.9rem;
          color: #b0b8c1;
          line-height: 1.6;
          max-height: 0;
          overflow: hidden;
          transition: max-height 0.4s ease;
        }

        .phase-card.expanded .phase-description {
          max-height: 200px;
        }

        .phase-expand {
          display: flex;
          align-items: center;
          gap: 8px;
          color: #c9a84c;
          font-weight: 600;
          font-size: 0.85rem;
          margin-top: 10px;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .phase-expand:hover {
          gap: 12px;
        }

        .phase-expand svg {
          transition: transform 0.3s ease;
        }

        .phase-card.expanded .phase-expand svg {
          transform: rotate(180deg);
        }

        /* Service Approach Cards */
        .service-cards {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(340px, 1fr));
          gap: 40px;
          max-width: 1400px;
          margin: 0 auto;
        }

        .service-card {
          position: relative;
          border-radius: 12px;
          overflow: hidden;
          border: 1px solid rgba(201, 168, 76, 0.2);
          transition: all 0.4s ease;
          cursor: pointer;
          min-height: 450px;
          display: flex;
          flex-direction: column;
        }

        .service-card::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          z-index: 0;
          background: linear-gradient(135deg, rgba(201, 168, 76, 0.1), rgba(74, 144, 226, 0.1));
          pointer-events: none;
        }

        .service-card-content {
          position: relative;
          z-index: 2;
          padding: 40px;
          display: flex;
          flex-direction: column;
          flex: 1;
        }

        .service-badge {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          width: 80px;
          height: 80px;
          background: linear-gradient(135deg, rgba(201, 168, 76, 0.2), rgba(201, 168, 76, 0.05));
          border: 1px solid rgba(201, 168, 76, 0.3);
          border-radius: 50%;
          margin-bottom: 25px;
          font-size: 11px;
          font-weight: 700;
          letter-spacing: 1px;
          color: #c9a84c;
          text-align: center;
          padding: 10px;
          transition: all 0.3s ease;
        }

        .service-card:hover .service-badge {
          background: linear-gradient(135deg, rgba(201, 168, 76, 0.3), rgba(201, 168, 76, 0.1));
          transform: scale(1.1);
        }

        .service-title {
          font-size: 1.8rem;
          color: #ffffff;
          margin-bottom: 20px;
          font-weight: 600;
        }

        .service-description {
          color: #b0b8c1;
          line-height: 1.8;
          font-size: 0.95rem;
          margin-bottom: 25px;
          flex: 1;
        }

        .service-items {
          max-height: 0;
          overflow: hidden;
          transition: max-height 0.4s ease;
          padding-top: 0;
          margin-top: 0;
          border-top: 0 solid rgba(201, 168, 76, 0.2);
        }

        .service-card.expanded .service-items {
          max-height: 250px;
          padding-top: 20px;
          margin-top: 20px;
          border-top: 1px solid rgba(201, 168, 76, 0.2);
        }

        .service-items ul {
          list-style: none;
          padding: 0;
          margin: 0;
        }

        .service-items li {
          color: #b0b8c1;
          margin-bottom: 10px;
          padding-left: 20px;
          position: relative;
          font-size: 0.9rem;
          line-height: 1.5;
        }

        .service-items li::before {
          content: '▸';
          position: absolute;
          left: 0;
          color: #c9a84c;
          font-size: 1.2rem;
        }

        .service-expand {
          display: flex;
          align-items: center;
          gap: 8px;
          color: #c9a84c;
          font-weight: 600;
          font-size: 0.9rem;
          cursor: pointer;
          transition: all 0.3s ease;
          align-self: flex-start;
          margin-top: auto;
        }

        .service-expand:hover {
          gap: 12px;
        }

        .service-expand svg {
          transition: transform 0.3s ease;
        }

        .service-card.expanded .service-expand svg {
          transform: rotate(180deg);
        }

        .service-card:hover {
          border-color: rgba(201, 168, 76, 0.4);
          transform: translateY(-4px);
          box-shadow: 0 20px 60px rgba(201, 168, 76, 0.1);
        }

        /* Stakeholder Ecosystem */
        .ecosystem-container {
          max-width: 800px;
          margin: 0 auto;
          position: relative;
        }

        .ecosystem-diagram {
          width: 100%;
          aspect-ratio: 1;
          position: relative;
          margin: 40px 0;
        }

        .ecosystem-center {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          width: 100px;
          height: 100px;
          background: linear-gradient(135deg, #c9a84c, #e8d5a0);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 0.7rem;
          font-weight: 700;
          text-align: center;
          color: #0a1628;
          padding: 10px;
          box-shadow: 0 0 50px rgba(201, 168, 76, 0.3);
          animation: pulse-glow 3s ease-in-out infinite;
          z-index: 2;
        }

        @keyframes pulse-glow {
          0%, 100% {
            box-shadow: 0 0 50px rgba(201, 168, 76, 0.3);
            transform: translate(-50%, -50%) scale(1);
          }
          50% {
            box-shadow: 0 0 80px rgba(201, 168, 76, 0.5);
            transform: translate(-50%, -50%) scale(1.05);
          }
        }

        .ecosystem-ring {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          border: 2px solid rgba(201, 168, 76, 0.2);
          border-radius: 50%;
          animation: ring-pulse 4s ease-in-out infinite;
        }

        .ecosystem-ring-1 {
          width: 250px;
          height: 250px;
        }

        .ecosystem-ring-2 {
          width: 400px;
          height: 400px;
          animation-delay: 1s;
        }

        @keyframes ring-pulse {
          0%, 100% {
            opacity: 0.3;
          }
          50% {
            opacity: 0.1;
          }
        }

        .ecosystem-node {
          position: absolute;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 10px;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .ecosystem-node-circle {
          width: 60px;
          height: 60px;
          background: linear-gradient(135deg, rgba(201, 168, 76, 0.2), rgba(74, 144, 226, 0.2));
          border: 2px solid rgba(201, 168, 76, 0.4);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 1.5rem;
          transition: all 0.3s ease;
        }

        .ecosystem-node:hover .ecosystem-node-circle {
          background: linear-gradient(135deg, rgba(201, 168, 76, 0.4), rgba(74, 144, 226, 0.3));
          border-color: rgba(201, 168, 76, 0.7);
          transform: scale(1.15);
          box-shadow: 0 0 30px rgba(201, 168, 76, 0.3);
        }

        .ecosystem-node-label {
          font-size: 0.8rem;
          color: #b0b8c1;
          text-align: center;
          opacity: 0;
          transition: opacity 0.3s ease;
          max-width: 80px;
        }

        .ecosystem-node:hover .ecosystem-node-label {
          opacity: 1;
        }

        .ecosystem-details {
          position: absolute;
          bottom: 0;
          left: 50%;
          transform: translateX(-50%);
          width: 100%;
          margin-top: 40px;
        }

        .ecosystem-expand {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          color: #c9a84c;
          font-weight: 600;
          font-size: 0.9rem;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .ecosystem-expand:hover {
          gap: 12px;
        }

        .ecosystem-expand svg {
          transition: transform 0.3s ease;
        }

        .ecosystem-expand.expanded svg {
          transform: rotate(180deg);
        }

        .ecosystem-content {
          max-height: 0;
          overflow: hidden;
          transition: max-height 0.4s ease;
          margin-top: 0;
          padding-top: 0;
          border-top: 0 solid rgba(201, 168, 76, 0.2);
        }

        .ecosystem-expand.expanded ~ .ecosystem-content {
          max-height: 400px;
          margin-top: 20px;
          padding-top: 20px;
          border-top: 1px solid rgba(201, 168, 76, 0.2);
        }

        .ecosystem-lists {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 30px;
        }

        .ecosystem-list h4 {
          font-size: 0.95rem;
          color: #c9a84c;
          margin-bottom: 15px;
          font-weight: 600;
        }

        .ecosystem-list ul {
          list-style: none;
          padding: 0;
          margin: 0;
        }

        .ecosystem-list li {
          color: #b0b8c1;
          margin-bottom: 8px;
          padding-left: 20px;
          position: relative;
          font-size: 0.9rem;
          line-height: 1.5;
        }

        .ecosystem-list li::before {
          content: '▸';
          position: absolute;
          left: 0;
          color: #c9a84c;
        }

        /* CTA Section */
        .cta-section {
          text-align: center;
          padding: 80px 40px;
          max-width: 800px;
          margin: 0 auto;
        }

        .cta-heading {
          font-size: 2.5rem;
          margin-bottom: 20px;
          color: #ffffff;
        }

        .cta-text {
          color: #b0b8c1;
          margin-bottom: 40px;
          font-size: 1.05rem;
          line-height: 1.8;
        }

        .cta-button {
          display: inline-flex;
          align-items: center;
          gap: 12px;
          padding: 16px 40px;
          background: linear-gradient(135deg, #c9a84c, #e8d5a0);
          color: #0a1628;
          text-decoration: none;
          border-radius: 8px;
          font-weight: 700;
          letter-spacing: 1px;
          transition: all 0.3s ease;
          border: none;
          cursor: pointer;
          font-size: 1rem;
          text-transform: uppercase;
        }

        .cta-button:hover {
          transform: translateY(-2px);
          box-shadow: 0 15px 40px rgba(201, 168, 76, 0.3);
          background: linear-gradient(135deg, #e8d5a0, #c9a84c);
        }

        .cta-button:active {
          transform: translateY(0);
        }

        /* Responsive */
        @media (max-width: 1024px) {
          .section {
            padding: 60px 30px;
          }

          .overview-container {
            grid-template-columns: 1fr;
            gap: 50px;
          }

          .overview-visual {
            height: 300px;
          }

          .parallax-quote {
            padding: 60px 30px;
            margin: 80px 0;
          }

          .value-cards {
            grid-template-columns: 1fr;
            gap: 30px;
          }

          .service-cards {
            grid-template-columns: 1fr;
            gap: 30px;
          }

          .ecosystem-lists {
            grid-template-columns: 1fr;
          }

          .scroll-container {
            padding: 0 10px;
          }

          .phase-card {
            flex: 0 0 280px;
            padding: 25px;
          }
        }

        @media (max-width: 768px) {
          .hero {
            padding: 30px 20px;
            min-height: 80vh;
          }

          .hero-title {
            font-size: 2rem;
          }

          .hero-subtitle {
            font-size: 1rem;
          }

          .aircraft-illustration {
            max-width: 300px;
          }

          .section {
            padding: 50px 20px;
          }

          .section-title {
            font-size: 1.8rem;
            margin-bottom: 30px;
          }

          .parallax-quote {
            padding: 40px 20px;
            margin: 60px 0;
          }

          .quote-text {
            font-size: 1.3rem;
          }

          .overview-visual {
            height: 250px;
          }

          .value-cards {
            grid-template-columns: 1fr;
            gap: 20px;
          }

          .value-card {
            padding: 30px;
          }

          .card-visual {
            height: 120px;
            margin-bottom: 20px;
          }

          .service-cards {
            grid-template-columns: 1fr;
            gap: 20px;
          }

          .service-card {
            min-height: 350px;
          }

          .service-card-content {
            padding: 30px;
          }

          .service-badge {
            width: 70px;
            height: 70px;
            font-size: 10px;
          }

          .service-title {
            font-size: 1.4rem;
          }

          .scroll-container {
            padding: 0 10px;
          }

          .phase-card {
            flex: 0 0 260px;
            padding: 20px;
          }

          .phase-number {
            font-size: 2rem;
          }

          .phase-title {
            font-size: 1rem;
          }

          .ecosystem-ring-1 {
            width: 200px;
            height: 200px;
          }

          .ecosystem-ring-2 {
            width: 320px;
            height: 320px;
          }

          .ecosystem-center {
            width: 80px;
            height: 80px;
            font-size: 0.65rem;
          }

          .ecosystem-node-circle {
            width: 50px;
            height: 50px;
            font-size: 1.2rem;
          }

          .cta-section {
            padding: 60px 20px;
          }

          .cta-heading {
            font-size: 1.8rem;
          }

          .cta-button {
            padding: 14px 32px;
            font-size: 0.9rem;
          }
        }
      `}</style>

      <div className="ambient-orbs">
        <div className="orb orb-1"></div>
        <div className="orb orb-2"></div>
        <div className="orb orb-3"></div>
        <div className="orb orb-4"></div>
      </div>

      <div className="particles">
        {Array.from({ length: 20 }).map((_, i) => (
          <div
            key={`particle-${i}`}
            className="particle"
            style={{
              left: `${Math.random() * 100}%`,
              width: `${2 + Math.random() * 4}px`,
              height: `${2 + Math.random() * 4}px`,
              animationDelay: `${Math.random() * 20}s`,
              animationDuration: `${15 + Math.random() * 10}s`,
            }}
          ></div>
        ))}
      </div>

      <div className="content-wrapper">
        <SiteNav />

        {/* HERO SECTION */}
        <section className="hero">
          <div className="hero-content">
            <span className="breadcrumb">Technology · Advanced Air Mobility & UAS</span>

            <h1 className="hero-title">
              Advanced Air Mobility <span className="gold">&amp; UAS</span>
            </h1>

            <p className="hero-subtitle">Transforming the future of urban and regional transportation through innovative autonomous solutions</p>

            <svg className="aircraft-illustration" viewBox="0 0 400 200" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <linearGradient id="aircraftGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#c9a84c" stopOpacity="0.8" />
                  <stop offset="100%" stopColor="#e8d5a0" stopOpacity="0.6" />
                </linearGradient>
              </defs>
              <g opacity="0.7">
                <ellipse cx="200" cy="100" rx="80" ry="40" fill="url(#aircraftGradient)" />
                <path d="M 180 100 L 160 90 L 160 110 Z" fill="url(#aircraftGradient)" />
                <path d="M 220 100 L 240 95 L 240 105 Z" fill="url(#aircraftGradient)" />
                <circle cx="170" cy="100" r="4" fill="#e8d5a0" />
                <circle cx="190" cy="100" r="4" fill="#e8d5a0" />
                <circle cx="210" cy="100" r="4" fill="#e8d5a0" />
                <circle cx="230" cy="100" r="4" fill="#e8d5a0" />
                <path d="M 140 105 Q 150 120 160 115" stroke="url(#aircraftGradient)" strokeWidth="2" fill="none" />
                <path d="M 240 105 Q 250 120 260 115" stroke="url(#aircraftGradient)" strokeWidth="2" fill="none" />
              </g>
            </svg>

            <div className="video-placeholder">
              <div className="play-button"></div>
            </div>
          </div>

          <div className="scroll-indicator">
            <span className="scroll-indicator-text">Scroll to explore</span>
            <div className="scroll-indicator-dot"></div>
          </div>
        </section>

        {/* OVERVIEW SECTION */}
        <section className="section" id="overview-section" style={{ position: 'relative', zIndex: 10 }}>
          <span className="section-label">About the Future</span>
          <h2 className="section-title">What Is Advanced Air Mobility?</h2>

          <div className="overview-container">
            <div className="overview-visual reveal" id="overview-visual">
              <svg className="connected-nodes" viewBox="0 0 400 400" xmlns="http://www.w3.org/2000/svg">
                <defs>
                  <linearGradient id="nodeGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#c9a84c" stopOpacity="0.6" />
                    <stop offset="100%" stopColor="#4a90e2" stopOpacity="0.6" />
                  </linearGradient>
                </defs>
                <g opacity="0.8">
                  <line x1="50" y1="50" x2="350" y2="350" stroke="url(#nodeGradient)" strokeWidth="1" opacity="0.4" />
                  <line x1="50" y1="350" x2="350" y2="50" stroke="url(#nodeGradient)" strokeWidth="1" opacity="0.4" />
                  <line x1="200" y1="50" x2="200" y2="350" stroke="url(#nodeGradient)" strokeWidth="1" opacity="0.4" />
                  <line x1="50" y1="200" x2="350" y2="200" stroke="url(#nodeGradient)" strokeWidth="1" opacity="0.4" />
                  <line x1="100" y1="100" x2="300" y2="300" stroke="url(#nodeGradient)" strokeWidth="1" opacity="0.3" />
                  <line x1="100" y1="300" x2="300" y2="100" stroke="url(#nodeGradient)" strokeWidth="1" opacity="0.3" />

                  <circle cx="200" cy="200" r="16" fill="#c9a84c" opacity="0.9" />
                  <circle cx="50" cy="50" r="10" fill="#4a90e2" opacity="0.7" />
                  <circle cx="350" cy="350" r="10" fill="#4a90e2" opacity="0.7" />
                  <circle cx="50" cy="350" r="10" fill="#4a90e2" opacity="0.7" />
                  <circle cx="350" cy="50" r="10" fill="#4a90e2" opacity="0.7" />
                  <circle cx="200" cy="50" r="8" fill="#8a61c1" opacity="0.6" />
                  <circle cx="200" cy="350" r="8" fill="#8a61c1" opacity="0.6" />
                  <circle cx="50" cy="200" r="8" fill="#8a61c1" opacity="0.6" />
                  <circle cx="350" cy="200" r="8" fill="#8a61c1" opacity="0.6" />

                  <circle cx="200" cy="200" r="20" fill="none" stroke="#c9a84c" strokeWidth="1" opacity="0.3" />
                  <circle cx="200" cy="200" r="28" fill="none" stroke="#c9a84c" strokeWidth="1" opacity="0.2" />
                </g>
              </svg>
            </div>

            <div className="overview-content reveal" id="overview-content">
              <h3 className="overview-heading">Multimodal Urban Mobility</h3>

              <div className="expandable-text" id="overview-text">
                Advanced Air Mobility (AAM) and Uncrewed Aircraft Systems (UAS) represent the convergence of cutting-edge aerospace technology with urban planning, creating a transformative transportation ecosystem. These solutions address critical infrastructure challenges and open entirely new possibilities for how people and goods move through our cities.
              </div>

              <button
                className="expand-button"
                onClick={() => {
                  const text = document.getElementById('overview-text');
                  const btn = document.currentTarget;
                  text?.classList.toggle('expanded');
                  btn.classList.toggle('expanded');
                }}
              >
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M5 7.5L10 12.5L15 7.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                Learn More
              </button>
            </div>
          </div>
        </section>

        {/* PARALLAX QUOTE 1 */}
        <div className="parallax-quote" id="quote-1">
          <div className="quote-content reveal" id="quote-1-content">
            <p className="quote-text">
              "The future of transportation isn't just about moving faster—it's about moving smarter, safer, and more sustainably in a connected urban ecosystem."
            </p>
            <p className="quote-attribution">— Rawlins Group</p>
          </div>
        </div>

        {/* VALUE DELIVERY SECTION */}
        <section className="section" id="value-section">
          <span className="section-label">Market Potential</span>
          <h2 className="section-title">Where AAM & UAS Deliver Value</h2>

          <div className="value-cards">
            {/* Air Taxis Card */}
            <div className="value-card reveal" id="air-taxis-card">
              <div className="card-visual">
                <div className="card-visual-aircraft">🚁</div>
              </div>
              <h3 className="card-title">Air Taxis</h3>
              <p className="card-description">Urban air mobility solutions that bypass surface congestion</p>

              <div
                className="card-expand"
                onClick={() => {
                  const card = document.getElementById('air-taxis-card');
                  const details = card?.querySelector('.card-details');
                  const btn = card?.querySelector('.card-expand');
                  details?.classList.toggle('expanded');
                  btn?.classList.toggle('expanded');
                }}
              >
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M3 6L8 11L13 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                Expand
              </div>

              <div className="card-details">
                <ul>
                  <li>Point-to-point urban transportation</li>
                  <li>Congestion reduction in major metros</li>
                  <li>Fast intra-city connectivity</li>
                  <li>Premium last-mile solutions</li>
                </ul>
              </div>
            </div>

            {/* Data Collection Card */}
            <div className="value-card reveal" id="data-collection-card">
              <div className="card-visual card-visual-grid">
                <div className="delivery-line"></div>
                {[10, 30, 50, 70, 90].map((pos) =>
                  [20, 40, 60, 80].map((top) => (
                    <div
                      key={`dot-${pos}-${top}`}
                      className="grid-dot"
                      style={{
                        left: `${pos}%`,
                        top: `${top}%`,
                        animationDelay: `${(pos + top) * 0.01}s`,
                      }}
                    ></div>
                  ))
                )}
              </div>
              <h3 className="card-title">Data Collection</h3>
              <p className="card-description">Real-time intelligence and infrastructure insights</p>

              <div
                className="card-expand"
                onClick={() => {
                  const card = document.getElementById('data-collection-card');
                  const details = card?.querySelector('.card-details');
                  const btn = card?.querySelector('.card-expand');
                  details?.classList.toggle('expanded');
                  btn?.classList.toggle('expanded');
                }}
              >
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M3 6L8 11L13 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                Expand
              </div>

              <div className="card-details">
                <ul>
                  <li>Agricultural monitoring & crop analysis</li>
                  <li>Infrastructure inspection & surveying</li>
                  <li>Environmental data collection</li>
                  <li>Real-time traffic & mobility analytics</li>
                </ul>
              </div>
            </div>

            {/* Package Delivery Card */}
            <div className="value-card reveal" id="package-delivery-card">
              <div className="card-visual card-visual-delivery">
                <div className="delivery-line"></div>
                <div className="delivery-node"></div>
                <div className="delivery-node"></div>
                <div className="delivery-node"></div>
              </div>
              <h3 className="card-title">Package Delivery</h3>
              <p className="card-description">Fast, efficient last-mile and remote delivery</p>

              <div
                className="card-expand"
                onClick={() => {
                  const card = document.getElementById('package-delivery-card');
                  const details = card?.querySelector('.card-details');
                  const btn = card?.querySelector('.card-expand');
                  details?.classList.toggle('expanded');
                  btn?.classList.toggle('expanded');
                }}
              >
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M3 6L8 11L13 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                Expand
              </div>

              <div className="card-details">
                <ul>
                  <li>Same-day delivery acceleration</li>
                  <li>Rural and remote area access</li>
                  <li>Reduced logistics costs</li>
                  <li>Supply chain optimization</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* PARALLAX QUOTE 2 */}
        <div className="parallax-quote" id="quote-2">
          <div className="quote-content reveal" id="quote-2-content">
            <p className="quote-text">
              "Success in AAM requires more than technology—it demands collaboration across government, industry, and communities to build the infrastructure and trust that enables innovation."
            </p>
            <p className="quote-attribution">— Rawlins Group</p>
          </div>
        </div>

        {/* HOW WE SERVE SECTION */}
        <section className="section" id="how-we-serve">
          <span className="section-label">Our Methodology</span>
          <h2 className="section-title">How We Serve AAM & UAS Programs</h2>

          <div className="horizontal-scroll-wrapper">
            <div className="scroll-progress">
              <div className="scroll-progress-bar" id="progress-bar"></div>
            </div>

            <div className="scroll-controls">
              <button
                className="scroll-button"
                onClick={() => {
                  const container = document.querySelector('.scroll-container');
                  if (container) {
                    container.scrollBy({ left: -350, behavior: 'smooth' });
                  }
                }}
              >
                ←
              </button>
              <button
                className="scroll-button"
                onClick={() => {
                  const container = document.querySelector('.scroll-container');
                  if (container) {
                    container.scrollBy({ left: 350, behavior: 'smooth' });
                  }
                }}
              >
                →
              </button>
            </div>

            <div
              className="scroll-container"
              onScroll={(e) => {
                const scrollLeft = e.currentTarget.scrollLeft;
                const scrollWidth = e.currentTarget.scrollWidth - e.currentTarget.clientWidth;
                const progress = (scrollLeft / scrollWidth) * 100;
                const bar = document.getElementById('progress-bar');
                if (bar) {
                  bar.style.width = `${progress}%`;
                }
              }}
            >
              {[
                {
                  number: '01',
                  title: 'Policy & System Planning',
                  description: 'Strategic framework development and stakeholder alignment to establish foundational AAM infrastructure and governance models.',
                },
                {
                  number: '02',
                  title: 'Regulatory Navigation',
                  description: 'Expert guidance through complex FAA and state regulatory requirements, certification pathways, and compliance frameworks.',
                },
                {
                  number: '03',
                  title: 'Infrastructure Planning',
                  description: 'Identification and development of vertiports, charging stations, and ground support facilities for operational networks.',
                },
                {
                  number: '04',
                  title: 'Functional Frameworks',
                  description: 'Design of air traffic management systems, safety protocols, and operational procedures tailored to AAM environments.',
                },
                {
                  number: '05',
                  title: 'Data & Safety Integration',
                  description: 'Implementation of real-time data systems, cybersecurity measures, and safety monitoring across the AAM ecosystem.',
                },
                {
                  number: '06',
                  title: 'Implementation & Scaling',
                  description: 'Deployment of pilot programs and gradual scaling strategies with continuous performance optimization.',
                },
                {
                  number: '07',
                  title: 'Community Engagement',
                  description: 'Public education, stakeholder outreach, and social acceptance programs to ensure sustainable adoption.',
                },
              ].map((phase) => (
                <div
                  key={phase.number}
                  className="phase-card reveal"
                  id={`phase-${phase.number}`}
                  onClick={() => {
                    const card = document.getElementById(`phase-${phase.number}`);
                    const desc = card?.querySelector('.phase-description');
                    const expand = card?.querySelector('.phase-expand');
                    card?.classList.toggle('expanded');
                    desc?.classList.toggle('expanded');
                    expand?.classList.toggle('expanded');
                  }}
                >
                  <span className="phase-number">{phase.number}</span>
                  <h3 className="phase-title">{phase.title}</h3>
                  <p className="phase-description">{phase.description}</p>
                  <div className="phase-expand">
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M3 6L8 11L13 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    Details
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* SERVICE APPROACH SECTION */}
        <section className="section" id="service-approach">
          <span className="section-label">Our Capabilities</span>
          <h2 className="section-title">Our Service Approach</h2>

          <div className="service-cards">
            {[
              {
                id: 'define',
                badge: 'DEFINE',
                title: 'Define',
                description: 'We begin by understanding your vision, market opportunity, and strategic objectives for AAM integration.',
                items: [
                  'Market analysis and opportunity assessment',
                  'Stakeholder identification and engagement',
                  'Strategic roadmap development',
                  'Feasibility and business case analysis',
                  'Partnership framework design',
                ],
              },
              {
                id: 'enable',
                badge: 'ENABLE',
                title: 'Enable',
                description: 'We equip programs with the policies, frameworks, and infrastructure required for successful AAM deployment.',
                items: [
                  'Regulatory navigation and compliance',
                  'Infrastructure planning and site selection',
                  'Technology integration and system design',
                  'Workforce development and training',
                  'Safety and security protocols',
                ],
              },
              {
                id: 'deliver',
                badge: 'DELIVER',
                title: 'Deliver',
                description: 'We guide implementation, manage pilots, and scale operations while ensuring measurable outcomes and community support.',
                items: [
                  'Pilot program design and execution',
                  'Performance monitoring and analytics',
                  'Public and stakeholder communication',
                  'Operational optimization',
                  'Scaling and market expansion strategies',
                ],
              },
            ].map((service) => (
              <div
                key={service.id}
                className="service-card reveal"
                id={`service-${service.id}`}
                onClick={() => {
                  const card = document.getElementById(`service-${service.id}`);
                  const items = card?.querySelector('.service-items');
                  const expand = card?.querySelector('.service-expand');
                  card?.classList.toggle('expanded');
                  items?.classList.toggle('expanded');
                  expand?.classList.toggle('expanded');
                }}
              >
                <div className="service-card-content">
                  <div className="service-badge">{service.badge}</div>
                  <h3 className="service-title">{service.title}</h3>
                  <p className="service-description">{service.description}</p>

                  <div className="service-items">
                    <ul>
                      {service.items.map((item, idx) => (
                        <li key={idx}>{item}</li>
                      ))}
                    </ul>
                  </div>

                  <div className="service-expand">
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M3 6L8 11L13 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    Capabilities
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* STAKEHOLDER ECOSYSTEM SECTION */}
        <section className="section" id="ecosystem-section">
          <span className="section-label">Our Network</span>
          <h2 className="section-title">Stakeholder Ecosystem</h2>

          <div className="ecosystem-container">
            <div className="ecosystem-diagram">
              <div className="ecosystem-ring ecosystem-ring-1"></div>
              <div className="ecosystem-ring ecosystem-ring-2"></div>

              <div className="ecosystem-center">Rawlins Hub</div>

              {/* Left Side - Public Sector */}
              <div className="ecosystem-node" style={{ top: '20%', left: '5%' }}>
                <div className="ecosystem-node-circle">🏛️</div>
                <div className="ecosystem-node-label">Federal Agencies</div>
              </div>

              <div className="ecosystem-node" style={{ top: '50%', left: '8%' }}>
                <div className="ecosystem-node-circle">🏢</div>
                <div className="ecosystem-node-label">State Government</div>
              </div>

              <div className="ecosystem-node" style={{ top: '80%', left: '15%' }}>
                <div className="ecosystem-node-circle">🏙️</div>
                <div className="ecosystem-node-label">Local Government</div>
              </div>

              {/* Right Side - Private Sector */}
              <div className="ecosystem-node" style={{ top: '20%', right: '5%' }}>
                <div className="ecosystem-node-circle">✈️</div>
                <div className="ecosystem-node-label">Aerospace Companies</div>
              </div>

              <div className="ecosystem-node" style={{ top: '50%', right: '8%' }}>
                <div className="ecosystem-node-circle">💼</div>
                <div className="ecosystem-node-label">Technology Partners</div>
              </div>

              <div className="ecosystem-node" style={{ top: '80%', right: '15%' }}>
                <div className="ecosystem-node-circle">🚚</div>
                <div className="ecosystem-node-label">Logistics & Operators</div>
              </div>
            </div>

            <div className="ecosystem-details" style={{ marginTop: '40px', position: 'relative', zIndex: 3 }}>
              <div
                className="ecosystem-expand"
                onClick={() => {
                  const btn = document.querySelector('.ecosystem-expand');
                  const content = btn?.nextElementSibling as HTMLElement;
                  btn?.classList.toggle('expanded');
                  if (content) {
                    content.style.maxHeight = btn?.classList.contains('expanded') ? '400px' : '0px';
                    content.style.marginTop = btn?.classList.contains('expanded') ? '20px' : '0px';
                    content.style.paddingTop = btn?.classList.contains('expanded') ? '20px' : '0px';
                    content.style.borderTop = btn?.classList.contains('expanded') ? '1px solid rgba(201, 168, 76, 0.2)' : '0px solid rgba(201, 168, 76, 0.2)';
                  }
                }}
              >
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M3 6L8 11L13 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                View Stakeholders
              </div>

              <div style={{ maxHeight: 0, overflow: 'hidden', transition: 'all 0.4s ease' }}>
                <div className="ecosystem-lists">
                  <div className="ecosystem-list">
                    <h4>Public Sector Partners</h4>
                    <ul>
                      <li>Federal Aviation Administration (FAA)</li>
                      <li>Department of Transportation</li>
                      <li>State Aviation Boards</li>
                      <li>Municipal Planning & Zoning</li>
                      <li>Infrastructure Authorities</li>
                    </ul>
                  </div>
                  <div className="ecosystem-list">
                    <h4>Private Sector Partners</h4>
                    <ul>
                      <li>eVTOL Manufacturers</li>
                      <li>Drone & UAS Operators</li>
                      <li>Software & Data Platforms</li>
                      <li>Insurance & Risk Management</li>
                      <li>Logistics & Delivery Networks</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* FULL-WIDTH VIDEO SECTION */}
        <section style={{ padding: '80px 40px', position: 'relative', zIndex: 10 }}>
          <div className="video-placeholder" style={{ margin: '0 auto' }}>
            <div className="play-button"></div>
          </div>
        </section>

        {/* CTA SECTION */}
        <section className="cta-section" id="cta">
          <div className="reveal" id="cta-content">
            <h2 className="cta-heading">Ready to Transform Your Region?</h2>
            <p className="cta-text">
              Let's explore how Advanced Air Mobility and UAS solutions can create new economic opportunities, improve infrastructure, and enhance quality of life in your community.
            </p>
            <Link href="/contact" className="cta-button">
              Start a Conversation
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M5 10H15M15 10L10 5M15 10L10 15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </Link>
          </div>
        </section>

        <SiteFooter />
      </div>
    </div>
  );
};

export default AAMPage;
