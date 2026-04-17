"use client";

import { useEffect } from "react";
import { Analytics } from "@vercel/analytics/next";
import { syncInternalCookie, isInternalTraffic } from "@/lib/internal-filter";

/**
 * Drop-in replacement for <Analytics /> that:
 *  1. Checks for ?internal=true/false on every page load and sets/clears
 *     the internal-traffic cookie.
 *  2. Suppresses ALL Vercel Analytics page-view events when the cookie
 *     is present (beforeSend returns null).
 */
export default function AnalyticsWrapper() {
  useEffect(() => {
    syncInternalCookie();
  }, []);

  return (
    <Analytics
      beforeSend={(event) => {
        if (isInternalTraffic()) return null;   // suppress page view
        return event;
      }}
    />
  );
}
