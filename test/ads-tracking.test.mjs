import assert from "node:assert/strict";
import test from "node:test";
import {
  GA4_MEASUREMENT_ID,
  GOOGLE_ADS_ID,
  THANK_YOU_STORAGE_KEY,
  allowAnotherConversion,
  callClickEvents,
  createMemoryStorage,
  createPageTracker,
  leadEvents,
  thankYouGuardScript,
} from "../shared/ads-tracking.mjs";

function names(events) {
  return events.map((event) => event.name);
}

test("the thank-you conversion is one Ads page view and not a second conversion event", () => {
  const storage = createMemoryStorage();
  const firstLoad = createPageTracker(storage);
  assert.deepEqual(firstLoad.view("/thank-you/"), []);

  const storageAfterForm = createMemoryStorage();
  const fromContact = createPageTracker(storageAfterForm);
  assert.deepEqual(fromContact.view("/contact/"), []);
  const arrival = fromContact.view("/thank-you/");
  assert.deepEqual(names(arrival), ["page_view", "page_view"]);
  assert.equal(arrival[0].params.send_to, GOOGLE_ADS_ID);
  assert.equal(arrival[1].params.send_to, GA4_MEASUREMENT_ID);
  assert.equal(arrival.some((event) => event.name === "conversion"), false);
  assert.equal(storageAfterForm.getItem(THANK_YOU_STORAGE_KEY), "1");

  assert.deepEqual(fromContact.view("/thank-you/"), []);
  const refresh = createPageTracker(storageAfterForm);
  assert.deepEqual(refresh.view("/"), []);
  assert.deepEqual(refresh.view("/thank-you/"), []);
});

test("a new quote clears the thank-you guard so the next visit can count", () => {
  const storage = createMemoryStorage({ [THANK_YOU_STORAGE_KEY]: "1", aztec_ads_lead_fired: "1" });
  allowAnotherConversion(storage);
  const tracker = createPageTracker(storage);
  assert.deepEqual(tracker.view("/"), []);
  const events = tracker.view("/thank-you/");
  assert.equal(events.length, 2);
  assert.equal(events.some((event) => event.name === "conversion"), false);
});

test("client route changes send one page view and re-renders do not", () => {
  const tracker = createPageTracker(createMemoryStorage());
  assert.deepEqual(tracker.view("/"), []);
  const next = tracker.view("/aluminum-fences/");
  assert.deepEqual(names(next), ["page_view", "page_view"]);
  assert.deepEqual(tracker.view("/aluminum-fences/"), []);
  assert.equal(tracker.view("/contact/").length, 2);
});

test("phone clicks are click_to_call for Ads and GA4 without a conversion label", () => {
  const events = callClickEvents("tel:8477404655");
  assert.deepEqual(names(events), ["click_to_call", "click_to_call"]);
  assert.equal(events[0].params.send_to, GOOGLE_ADS_ID);
  assert.equal(events[1].params.send_to, GA4_MEASUREMENT_ID);
  assert.equal(events.some((event) => String(event.params.send_to).includes("/")), false);
  assert.equal(events.some((event) => event.name === "conversion"), false);
});

test("the lead event fires once and only to GA4", () => {
  const storage = createMemoryStorage();
  const first = leadEvents(storage);
  assert.equal(first.length, 1);
  assert.equal(first[0].name, "generate_lead");
  assert.equal(first[0].params.send_to, GA4_MEASUREMENT_ID);
  assert.deepEqual(leadEvents(storage), []);
});

test("the thank-you guard leaves the AW config call untouched", () => {
  const script = thankYouGuardScript();
  assert.match(script, /aztec_thankyou_pv/);
  assert.match(script, /send_page_view=false/);
  assert.equal(script.includes("gtag('config'"), false);
  assert.equal(GA4_MEASUREMENT_ID, "G-79HY2VCPDP");
});
