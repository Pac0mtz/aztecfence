// Pure Google tag decisions. The AW-11484223030 snippet in index.html is not modified.
// Book appointment is the Ads URL page-load on /thank-you/. This module never emits
// an event named "conversion" and never invents an AW send_to label.

export const GOOGLE_ADS_ID = "AW-11484223030";
export const GA4_MEASUREMENT_ID = "G-79HY2VCPDP";
export const THANK_YOU_STORAGE_KEY = "aztec_thankyou_pv";
export const LEAD_FIRED_KEY = "aztec_ads_lead_fired";

export function normalizePath(pathname) {
  const clean = String(pathname || "/").split("?")[0].split("#")[0];
  if (!clean || clean === "/") return "/";
  return clean.endsWith("/") ? clean : `${clean}/`;
}

export function allowAnotherConversion(storage) {
  storage.removeItem(THANK_YOU_STORAGE_KEY);
  storage.removeItem(LEAD_FIRED_KEY);
}

export function leadEvents(storage) {
  if (storage.getItem(LEAD_FIRED_KEY) === "1") return [];
  storage.setItem(LEAD_FIRED_KEY, "1");
  return [{
    name: "generate_lead",
    params: { send_to: GA4_MEASUREMENT_ID, method: "contact_form" },
  }];
}

export function callClickEvents(href) {
  const params = {
    link_url: href || "tel:8477404655",
    event_category: "engagement",
  };
  return [
    { name: "click_to_call", params: { ...params, send_to: GOOGLE_ADS_ID } },
    { name: "click_to_call", params: { ...params, send_to: GA4_MEASUREMENT_ID } },
  ];
}

export function spaPageViewEvents({ pathname, lastPath, storage }) {
  const path = normalizePath(pathname);
  if (path === lastPath) return { lastPath, events: [] };
  if (path === "/thank-you/" && storage.getItem(THANK_YOU_STORAGE_KEY) === "1") {
    return { lastPath: path, events: [] };
  }
  if (path === "/thank-you/") storage.setItem(THANK_YOU_STORAGE_KEY, "1");
  const base = { page_path: path };
  return {
    lastPath: path,
    events: [
      { name: "page_view", params: { ...base, send_to: GOOGLE_ADS_ID } },
      { name: "page_view", params: { ...base, send_to: GA4_MEASUREMENT_ID } },
    ],
  };
}

export function createPageTracker(storage) {
  let lastPath = "";
  let skipInitial = true;
  return {
    view(pathname) {
      const path = normalizePath(pathname);
      if (skipInitial) {
        skipInitial = false;
        lastPath = path;
        return [];
      }
      const result = spaPageViewEvents({ pathname: path, lastPath, storage });
      lastPath = result.lastPath;
      return result.events;
    },
  };
}

export function createMemoryStorage(initial) {
  const data = new Map(Object.entries(initial || {}));
  return {
    getItem: (key) => (data.has(key) ? data.get(key) : null),
    setItem: (key, value) => { data.set(key, String(value)); },
    removeItem: (key) => { data.delete(key); },
  };
}

// Runs before the unchanged gtag snippet so a refresh of /thank-you/ does not
// send a second Ads page_view. The first load still lets the snippet fire.
export function thankYouGuardScript() {
  return `<script>(function(){try{var path=(location.pathname||"/").replace(/\\/+$/,"")||"/";if(path!=="/thank-you")return;var key=${JSON.stringify(THANK_YOU_STORAGE_KEY)};window.dataLayer=window.dataLayer||[];if(sessionStorage.getItem(key)==="1"){var raw=window.dataLayer.push.bind(window.dataLayer);window.dataLayer.push=function(){var args=arguments[0];if(args&&args[0]==="config"&&args[1]==="AW-11484223030"){var opts=args[2]&&typeof args[2]==="object"?args[2]:{};opts.send_page_view=false;args[2]=opts;}return raw.apply(window.dataLayer,arguments);};}else{sessionStorage.setItem(key,"1");}}catch(e){}})();</script>\n`;
}
