export const GOOGLE_ADS_ID: string;
export const GA4_MEASUREMENT_ID: string;

export type AdsStorage = {
  getItem(key: string): string | null;
  setItem(key: string, value: string): void;
  removeItem(key: string): void;
};

export type GtagEvent = {
  name: string;
  params: {
    send_to: string;
    page_path?: string;
    method?: string;
    link_url?: string;
    event_category?: string;
  };
};

export function allowAnotherConversion(storage: AdsStorage): void;
export function callClickEvents(href?: string): GtagEvent[];
export function createPageTracker(storage: AdsStorage): { view(pathname: string): GtagEvent[] };
export function leadEvents(storage: AdsStorage): GtagEvent[];
