/**
 * Internal traffic filter for Vercel Analytics.
 *
 * Visit any page with ?internal=true  → sets a persistent cookie that
 *   suppresses ALL analytics (page views + custom events) for that browser.
 * Visit any page with ?internal=false → clears the cookie so tracking resumes.
 *
 * The cookie name is `rawlins_internal` and it persists for 1 year.
 */

const COOKIE_NAME = "rawlins_internal";
const ONE_YEAR = 365 * 24 * 60 * 60; // seconds

/** Check the URL for ?internal=true/false and set/clear the cookie. */
export function syncInternalCookie(): void {
  if (typeof window === "undefined") return;

  const params = new URLSearchParams(window.location.search);
  const flag = params.get("internal");

  if (flag === "true") {
    document.cookie = `${COOKIE_NAME}=1; path=/; max-age=${ONE_YEAR}; SameSite=Lax`;
  } else if (flag === "false") {
    document.cookie = `${COOKIE_NAME}=; path=/; max-age=0`;
  }
}

/** Returns true when the current browser is marked as internal traffic. */
export function isInternalTraffic(): boolean {
  if (typeof document === "undefined") return false;
  return document.cookie.split(";").some((c) => c.trim().startsWith(`${COOKIE_NAME}=`));
}
