// Illinois keeps the 11 areas from the audit, then every Lake County town
// from the old "Areas We Serve" list that was not already named.
const CURRENT_ILLINOIS = [
  "Lake County",
  "Round Lake",
  "Grayslake",
  "McHenry",
  "Huntley",
  "Woodstock",
  "Highland Park",
  "Wilmette",
  "Kenilworth",
  "Winnetka",
  "Evanston",
];

export const RESTORED_LAKE_COUNTY = [
  "Antioch",
  "Bannockburn",
  "Barrington",
  "Beach Park",
  "Buffalo Grove",
  "Deerfield",
  "Fox Lake",
  "Green Oaks",
  "Gurnee",
  "Hainesville",
  "Highwood",
  "Indian Creek",
  "Island Lake",
  "Kildeer",
  "Lake Barrington",
  "Lake Bluff",
  "Lake Forest",
  "Lake Villa",
  "Lake Zurich",
  "Libertyville",
  "Lincolnshire",
  "Lindenhurst",
  "Long Grove",
  "Mettawa",
  "Mundelein",
  "North Barrington",
  "Old Mill Creek",
  "Park City",
  "Port Barrington",
  "Riverwoods",
  "Round Lake Beach",
  "Round Lake Heights",
  "Round Lake Park",
  "Tower Lakes",
  "Vernon Hills",
  "Volo",
  "Wadsworth",
  "Wauconda",
  "Waukegan",
  "Winthrop Harbor",
  "Zion",
];

const WISCONSIN = ["Kenosha", "Pleasant Prairie", "Lake Geneva", "Delavan"];

export const SERVICE_AREAS = [
  { state: "Illinois", places: [...CURRENT_ILLINOIS, ...RESTORED_LAKE_COUNTY] },
  { state: "Wisconsin", places: WISCONSIN },
];

export function areaServedLd() {
  const illinois = SERVICE_AREAS[0].places.map((name) => (
    name === "Lake County"
      ? { "@type": "AdministrativeArea", name, containedInPlace: "Illinois" }
      : { "@type": "City", name, containedInPlace: "Illinois" }
  ));
  const wisconsin = SERVICE_AREAS[1].places.map((name) => ({
    "@type": "City",
    name,
    containedInPlace: "Wisconsin",
  }));
  return [...illinois, ...wisconsin];
}
