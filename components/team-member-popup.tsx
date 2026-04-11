"use client";

import React, { useEffect } from "react";
import Image from "next/image";
import { type TeamMember } from "@/lib/team-data";

/* ── Bio text renderer — mirrors the one used in team-page.tsx ──
 *  Handles **bold**, "- " bullets, and blank-line paragraph breaks. */
function RichText({ text }: { text: string }) {
  const parts = text.split(/(\*\*[^*]+\*\*)/g);
  return (
    <>
      {parts.map((part, i) => {
        if (part.startsWith("**") && part.endsWith("**")) {
          return <strong key={i}>{part.slice(2, -2)}</strong>;
        }
        return <span key={i}>{part}</span>;
      })}
    </>
  );
}

function BioText({ text }: { text: string }) {
  if (!text || text.trim() === "Coming soon!") {
    return <p className="team-bio-text">Coming soon.</p>;
  }
  const paragraphs = text.split(/\n\n+/);
  return (
    <>
      {paragraphs.map((para, pi) => {
        const lines = para.split("\n");
        const isBulletBlock = lines.some((l) => l.trim().startsWith("- "));
        if (isBulletBlock) {
          const items: string[] = [];
          let currentText = "";
          lines.forEach((line) => {
            if (line.trim().startsWith("- ")) {
              if (currentText) items.push(currentText.trim());
              currentText = line.trim().slice(2);
            } else {
              currentText += " " + line;
            }
          });
          if (currentText) items.push(currentText.trim());
          return (
            <ul key={pi} className="team-bio-list">
              {items.map((item, ii) => (
                <li key={ii}>
                  <RichText text={item} />
                </li>
              ))}
            </ul>
          );
        }
        return (
          <p key={pi} className="team-bio-text">
            <RichText text={para} />
          </p>
        );
      })}
    </>
  );
}

interface Props {
  member: TeamMember | null;
  onClose: () => void;
  /** Optional prev/next navigation — when omitted, arrows are hidden. */
  onPrev?: () => void;
  onNext?: () => void;
}

/**
 * Shared team member popup — extracted from team-page.tsx so other
 * pages (e.g. thought leadership article pages) can reuse the exact
 * same popup without duplicating markup.
 */
export default function TeamMemberPopup({ member, onClose, onPrev, onNext }: Props) {
  /* Lock body scroll while the popup is open. */
  useEffect(() => {
    if (!member) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    document.documentElement.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
      document.documentElement.style.overflow = "";
    };
  }, [member]);

  /* Keyboard: Escape closes, arrows navigate if handlers provided. */
  useEffect(() => {
    if (!member) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      else if (e.key === "ArrowLeft" && onPrev) onPrev();
      else if (e.key === "ArrowRight" && onNext) onNext();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [member, onClose, onPrev, onNext]);

  if (!member) return null;

  return (
    <div
      className="team-popup-overlay"
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
      role="dialog"
      aria-modal="true"
      aria-label={`Profile: ${member.name}`}
    >
      {onPrev && (
        <button
          className="team-popup-arrow team-popup-arrow-prev"
          onClick={onPrev}
          aria-label="Previous member"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M15 18l-6-6 6-6" />
          </svg>
        </button>
      )}

      <div className="team-popup">
        <button
          className="team-popup-close"
          onClick={onClose}
          aria-label="Close profile"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M18 6L6 18M6 6l12 12" />
          </svg>
        </button>

        {/* Left Panel */}
        <div className="team-popup-left">
          <div className="team-popup-photo-ring">
            <Image
              src={member.photo}
              alt={member.name}
              width={300}
              height={375}
              className="team-popup-photo"
              sizes="300px"
            />
          </div>
          {member.title && (
            <span className="team-popup-title-badge">{member.title}</span>
          )}
          <h2 className="team-popup-name">{member.name}</h2>
          <p className="team-popup-role"><em>{member.role}</em></p>
          <p className="team-popup-location">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ display: "inline", marginRight: "4px", verticalAlign: "middle" }}>
              <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" /><circle cx="12" cy="10" r="3" />
            </svg>
            Located in {member.location}
          </p>
          <div className="team-popup-divider" />
          {member.phone && (
            <a href={`tel:${member.phone.replace(/[^+\d]/g, "")}`} className="team-popup-contact-item">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.8a19.79 19.79 0 01-3.07-8.68A2 2 0 012.18 1h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.91 8.15a16 16 0 006.94 6.94l1.52-1.52a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z" />
              </svg>
              <span>{member.phone}</span>
            </a>
          )}
          {member.phone2 && (
            <a href={`tel:${member.phone2.replace(/[^+\d]/g, "")}`} className="team-popup-contact-item">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.8a19.79 19.79 0 01-3.07-8.68A2 2 0 012.18 1h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.91 8.15a16 16 0 006.94 6.94l1.52-1.52a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z" />
              </svg>
              <span>{member.phone2}</span>
            </a>
          )}
          {member.email && (
            <a href={`mailto:${member.email}`} className="team-popup-contact-item">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" /><polyline points="22,6 12,13 2,6" />
              </svg>
              <span>{member.email}</span>
            </a>
          )}
          {member.linkedin && (
            <div className="team-popup-social">
              <a
                href={member.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="team-popup-social-btn"
                aria-label="LinkedIn"
              >
                <span style={{ fontFamily: "Arial, sans-serif", fontSize: "22px", fontWeight: 700, color: "#0e1e3a", lineHeight: 1, letterSpacing: "-0.5px" }}>in</span>
              </a>
            </div>
          )}
        </div>

        {/* Right Panel */}
        <div className="team-popup-right">
          {member.background && (
            <div className="team-popup-section">
              <h3 className="team-popup-section-title">Background</h3>
              <BioText text={member.background} />
            </div>
          )}
          {member.achievements && (
            <>
              <div className="team-popup-section-divider" />
              <div className="team-popup-section">
                <h3 className="team-popup-section-title">Achievements</h3>
                <BioText text={member.achievements} />
              </div>
            </>
          )}
          {!member.background && !member.achievements && (
            <div className="team-popup-section">
              <p className="team-bio-text" style={{ color: "#888" }}>
                Profile coming soon.
              </p>
            </div>
          )}
        </div>
      </div>

      {onNext && (
        <button
          className="team-popup-arrow team-popup-arrow-next"
          onClick={onNext}
          aria-label="Next member"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M9 18l6-6-6-6" />
          </svg>
        </button>
      )}
    </div>
  );
}
