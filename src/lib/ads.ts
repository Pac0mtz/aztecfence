/**
 * Google Ads / GA4 helpers for Aztec Fence.
 *
 * The sitewide tag is the official snippet in index.html and is not rewritten.
 * IDs:
 *   AW-11484223030  Google Ads
 *   G-79HY2VCPDP    GA4 (aztecfence.net)
 *
 * "Book appointment" is the Ads URL page-load on /thank-you/. There is no
 * AW-11484223030/label, so this module never sends an event named conversion.
 * A repeat hit in the same session is suppressed before that snippet runs.
 * Phone clicks send click_to_call. A call conversion label is still required
 * before calls can count as Ads conversions.
 */
import {
  GOOGLE_ADS_ID,
  GA4_MEASUREMENT_ID,
  allowAnotherConversion,
  callClickEvents,
  createPageTracker,
  leadEvents,
} from "../../shared/ads-tracking.mjs";

export { GOOGLE_ADS_ID, GA4_MEASUREMENT_ID };
export const LEAD_CONVERSION_LABEL = "";
export const PHONE_CONVERSION_LABEL = "";

const ADS_KEYS = [
  "gclid",
  "gbraid",
  "wbraid",
  "utm_source",
  "utm_medium",
  "utm_campaign",
  "utm_term",
  "utm_content",
] as const;

const STORAGE_KEY = "aztec_ads";
const USER_DATA_KEY = "aztec_ads_user";

export type AdsParams = Partial<Record<(typeof ADS_KEYS)[number] | "landing", string>>;

type UserData = { email?: string; phone?: string };

function gtag(...args: unknown[]) {
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push(args);
}

let started = false;

export function getAdsParams(): AdsParams {
  try {
    const raw = sessionStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as AdsParams) : {};
  } catch {
    return {};
  }
}

export function captureAdsParams() {
  try {
    const params = new URLSearchParams(window.location.search);
    const next = getAdsParams();
    let changed = false;
    for (const key of ADS_KEYS) {
      const value = params.get(key);
      if (value) {
        next[key] = value;
        changed = true;
      }
    }
    if (!next.landing) {
      next.landing = window.location.pathname;
      changed = true;
    }
    if (changed) sessionStorage.setItem(STORAGE_KEY, JSON.stringify(next));
  } catch {
    /* private mode / blocked storage */
  }
}

export function saveLeadUserData(data: UserData) {
  try {
    sessionStorage.setItem(USER_DATA_KEY, JSON.stringify(data));
    allowAnotherConversion(browserStorage());
  } catch {
    /* ignore */
  }
}

function readLeadUserData(): UserData | null {
  try {
    const raw = sessionStorage.getItem(USER_DATA_KEY);
    return raw ? (JSON.parse(raw) as UserData) : null;
  } catch {
    return null;
  }
}

function toE164(phone: string): string | undefined {
  const digits = phone.replace(/\D/g, "");
  if (digits.length === 10) return `+1${digits}`;
  if (digits.length === 11 && digits.startsWith("1")) return `+${digits}`;
  if (phone.trim().startsWith("+") && digits.length >= 10) return `+${digits}`;
  return undefined;
}

function browserStorage() {
  return {
    getItem: (key: string) => {
      try { return sessionStorage.getItem(key); } catch { return null; }
    },
    setItem: (key: string, value: string) => {
      try { sessionStorage.setItem(key, value); } catch { /* ignore */ }
    },
    removeItem: (key: string) => {
      try { sessionStorage.removeItem(key); } catch { /* ignore */ }
    },
  };
}

const pageTracker = createPageTracker(browserStorage());

export function trackSpaPageView(pathname: string) {
  for (const event of pageTracker.view(pathname)) {
    const params = event.params as { page_path?: string };
    gtag("event", event.name, {
      ...event.params,
      page_location: `${window.location.origin}${params.page_path || ""}`,
      page_title: document.title,
    });
  }
}

export function reportLeadConversion() {
  const events = leadEvents(browserStorage());
  if (!events.length) return;

  const user = readLeadUserData();
  if (user?.email || user?.phone) {
    gtag("set", "user_data", {
      email: user.email || undefined,
      phone_number: user.phone ? toE164(user.phone) : undefined,
    });
  }

  for (const event of events) gtag("event", event.name, event.params);
}

export function reportPhoneConversion(href?: string) {
  for (const event of callClickEvents(href)) gtag("event", event.name, event.params);
}

function onTelClick(event: MouseEvent) {
  const target = event.target;
  if (!(target instanceof Element)) return;
  const link = target.closest("a[href^='tel:']");
  if (link) reportPhoneConversion(link.getAttribute("href") || undefined);
}

export function initGoogleAds() {
  captureAdsParams();
  if (started) return;
  started = true;

  window.dataLayer = window.dataLayer || [];
  window.gtag = window.gtag || gtag;
  window.gtag_report_conversion = () => {
    reportLeadConversion();
    return false;
  };

  // Shell snippet already called gtag('config') for Ads and GA4. Only install
  // the same snippet if that script is missing, and do not pass extra options
  // (enhanced conversions stay off; no second config on a normal page load).
  const tagSrc = `https://www.googletagmanager.com/gtag/js?id=${GOOGLE_ADS_ID}`;
  if (!document.querySelector(`script[src="${tagSrc}"]`)) {
    const script = document.createElement("script");
    script.async = true;
    script.src = tagSrc;
    document.head.appendChild(script);
    gtag("js", new Date());
    gtag("config", GOOGLE_ADS_ID);
    gtag("config", GA4_MEASUREMENT_ID);
  }

  document.addEventListener("click", onTelClick);
}
