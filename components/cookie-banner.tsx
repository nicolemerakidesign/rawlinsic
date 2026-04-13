"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";

const STORAGE_KEY = "cookie-consent";

interface ConsentPreference {
  analytics: boolean;
  timestamp: number;
}

/** Check whether the visitor has accepted analytics cookies. */
export function hasAnalyticsConsent(): boolean {
  if (typeof window === "undefined") return false;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return false;
    const pref: ConsentPreference = JSON.parse(raw);
    return pref.analytics === true;
  } catch {
    return false;
  }
}

export default function CookieBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (!stored) setVisible(true);
    } catch {
      /* localStorage unavailable — don't show */
    }
  }, []);

  const respond = (accepted: boolean) => {
    const pref: ConsentPreference = {
      analytics: accepted,
      timestamp: Date.now(),
    };
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(pref));
    } catch {
      /* silent */
    }
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div className="cookie-banner" role="dialog" aria-label="Cookie consent">
      <div className="cookie-banner-inner">
        <p className="cookie-banner-text">
          We use cookies and analytics to improve your experience.{" "}
          <Link href="/privacy-policy" className="cookie-banner-link">
            Privacy&nbsp;Policy
          </Link>
        </p>
        <div className="cookie-banner-actions">
          <button
            className="cookie-btn cookie-btn-decline"
            onClick={() => respond(false)}
          >
            Decline
          </button>
          <button
            className="cookie-btn cookie-btn-accept"
            onClick={() => respond(true)}
          >
            Accept
          </button>
        </div>
      </div>
    </div>
  );
}
