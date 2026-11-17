export const RESTORED_LAKE_COUNTY: readonly string[];

export const SERVICE_AREAS: readonly {
  state: string;
  places: readonly string[];
}[];

export function areaServedLd(): {
  "@type": string;
  name: string;
  containedInPlace: string;
}[];
