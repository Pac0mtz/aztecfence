/**
 * Google Ads / GA4 helpers for Aztec Fence.
 *
 * The sitewide tag is the official snippet in index.html (first HTML for every
 * route, including /thank-you/ and /contact-us/). IDs:
 *   AW-11484223030  Google Ads
 *   G-79HY2VCPDP    GA4 (aztecfence.net)
 *
 * "Book appointment" is a URL page-load conversion on the base Ads tag
 * (URLs starting with aztecfence.net/thank-you). There is no official
 * AW-11484223030/label, so these stay empty and this module does not send
 * a conversion event. Do not point tracking at /thank-you/thank-you.
 */
export const GOOGLE_ADS_ID = "AW-11484223030";
export const GA4_MEASUREMENT_ID = "G-79HY2VCPDP";
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
const LEAD_FIRED_KEY = "aztec_ads_lead_fired";

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
    sessionStorage.removeItem(LEAD_FIRED_KEY);
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

function sendTo(label: string) {
  return GOOGLE_ADS_ID && label ? `${GOOGLE_ADS_ID}/${label}` : undefined;
}

export function reportLeadConversion() {
  try {
    if (sessionStorage.getItem(LEAD_FIRED_KEY)) return;
    sessionStorage.setItem(LEAD_FIRED_KEY, "1");
  } catch {
    /* still fire once per page load */
  }

  const user = readLeadUserData();
  if (user?.email || user?.phone) {
    gtag("set", "user_data", {
      email: user.email || undefined,
      phone_number: user.phone ? toE164(user.phone) : undefined,
    });
  }

  const conversion = sendTo(LEAD_CONVERSION_LABEL);
  if (conversion) {
    gtag("event", "conversion", { send_to: conversion });
  }
  gtag("event", "generate_lead", { method: "contact_form" });
}

export function reportPhoneConversion() {
  const conversion = sendTo(PHONE_CONVERSION_LABEL);
  if (conversion) {
    gtag("event", "conversion", { send_to: conversion });
  }
  gtag("event", "phone_click", { event_category: "engagement" });
}

function onTelClick(event: MouseEvent) {
  const target = event.target;
  if (!(target instanceof Element)) return;
  const link = target.closest("a[href^='tel:']");
  if (link) reportPhoneConversion();
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
