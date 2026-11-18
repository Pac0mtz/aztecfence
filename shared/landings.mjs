// Landing pages for fence services and towns the site already serves.
// Copy uses only facts already published: NAP, fence types, pool-code aluminum,
// repair/maintenance from the terms, 30+ years / since 1994, and the service-area list.

const SITE = "https://aztecfence.net";

const FENCE_LINKS = [
  { href: "/aluminum-fences/", label: "Aluminum fences" },
  { href: "/vinyl-picket-fencing/", label: "Vinyl picket fencing" },
  { href: "/wood-picket-fencing/", label: "Wood picket fencing" },
  { href: "/chain-link-fences/", label: "Chain link fences" },
  { href: "/privacy-fences/", label: "Privacy fences" },
  { href: "/gates/", label: "Gates" },
  { href: "/commercial-fencing/", label: "Commercial fencing" },
  { href: "/residential-fence/", label: "Residential fencing" },
];

function city(name, state) {
  return { "@type": "City", name, containedInPlace: state };
}

function page(entry) {
  return {
    related: FENCE_LINKS.slice(0, 4),
    ...entry,
  };
}

export const LANDING_PAGES = [
  page({
    path: "/pool-fences/",
    title: "Pool Fence Installation in Northern Illinois | Aztec Fence",
    description: "Pool-code aluminum fences with self-closing, self-latching gates in Northern Illinois. Free quotes from Aztec Fence in Round Lake. (847) 740-4655.",
    h1: "Pool Fence Installation",
    linkLabel: "Pool fences",
    eyebrow: "Pool-code aluminum",
    image: "/images/aluminum-02.jpg",
    imageAlt: "Ornamental aluminum fence installed by Aztec Fence",
    serviceType: "Pool fence installation",
    areaServed: { "@type": "AdministrativeArea", name: "Northern Illinois" },
    paragraphs: [
      "Aztec Fence installs pool-code aluminum fencing from our shop at 11 N Fairfield Rd in Round Lake. Aluminum is the style we use for pool enclosures: it stays rust-free, the picket spacing is set for local safety rules, and the gates are self-closing and self-latching.",
      "The same fences are powder-coated, carry a lifetime warranty, and need little more than a rinse. We install them for homes across Northern Illinois and the Wisconsin cities listed on our service-area page. Tell us the yard and the gate locations and we will quote the enclosure.",
    ],
    points: [
      "Pool-code aluminum fencing",
      "Self-closing, self-latching gates",
      "Picket spacing set for local safety rules",
      "Rust-free powder coat and a lifetime warranty",
    ],
    related: [
      { href: "/aluminum-fences/", label: "Aluminum fences" },
      { href: "/gates/", label: "Gates" },
      { href: "/privacy-fences/", label: "Privacy fences" },
      { href: "/residential-fence/", label: "Residential fencing" },
    ],
  }),
  page({
    path: "/fence-repair/",
    title: "Fence Repair in Northern Illinois | Aztec Fence Company",
    description: "Fence repair and maintenance for wood, vinyl, aluminum, and chain link across Northern Illinois. Aztec Fence, Round Lake. Free quotes. (847) 740-4655.",
    h1: "Fence Repair and Maintenance",
    linkLabel: "Fence repair",
    eyebrow: "Repair and maintenance",
    image: "/images/Residential-wood-solid-privacy-fence-05.jpg",
    imageAlt: "Wood privacy fence that Aztec Fence can repair or replace",
    serviceType: "Fence repair",
    areaServed: { "@type": "AdministrativeArea", name: "Northern Illinois" },
    paragraphs: [
      "Aztec Fence repairs and maintains fences as well as installing them. That covers residential, commercial, and industrial properties in Northern Illinois, in the materials we already build with: wood, vinyl, aluminum, chain link, and gates.",
      "A repair visit starts the same way as a new fence: call the Round Lake shop or send the quote form with photos of the damaged run. We will tell you whether the existing posts and rails can stay or the section should be rebuilt. There is no separate emergency line and no published trip fee. The quote is free.",
    ],
    points: [
      "Wood, vinyl, aluminum, and chain link",
      "Gates as well as fence runs",
      "Residential, commercial, and industrial properties",
      "Free quote from the Round Lake shop",
    ],
    related: [
      { href: "/wood-picket-fencing/", label: "Wood fences" },
      { href: "/vinyl-picket-fencing/", label: "Vinyl fences" },
      { href: "/chain-link-fences/", label: "Chain link fences" },
      { href: "/gates/", label: "Gates" },
    ],
  }),
  page({
    path: "/kenosha-wi/",
    title: "Fence Company in Kenosha, Wisconsin | Aztec Fence",
    description: "Fence installation for Kenosha, Pleasant Prairie, Lake Geneva, and Delavan from Aztec Fence in Round Lake, Illinois. Free quotes. (847) 740-4655.",
    h1: "Fence Installation in Kenosha and Southern Wisconsin",
    linkLabel: "Kenosha and Wisconsin",
    eyebrow: "Wisconsin service",
    image: "/images/Residential-vinyl-privacy-fence-08-1.jpg",
    imageAlt: "Vinyl privacy fence of the kind Aztec Fence installs",
    serviceType: "Fence installation",
    areaServed: [
      city("Kenosha", "Wisconsin"),
      city("Pleasant Prairie", "Wisconsin"),
      city("Lake Geneva", "Wisconsin"),
      city("Delavan", "Wisconsin"),
    ],
    paragraphs: [
      "Aztec Fence is based at 11 N Fairfield Rd, Round Lake, Illinois. We do not keep a second shop in Wisconsin. Kenosha, Pleasant Prairie, Lake Geneva, and Delavan are the Wisconsin cities on our service list, and the crew comes from Round Lake.",
      "Kenosha sits on Lake Michigan just north of the state line. The fence styles are the same ones we install in Lake County: vinyl, aluminum, wood, chain link, privacy, gates, and commercial runs. Call (847) 740-4655 or request a quote with the property address.",
    ],
    areas: [
      { id: "kenosha", name: "Kenosha", text: "The largest of the four Wisconsin cities we serve. Residential blocks west of the lake and commercial properties along the main roads are both in range of the Round Lake crew." },
      { id: "pleasant-prairie", name: "Pleasant Prairie", text: "Between the Illinois line and Kenosha. Yards here are often larger subdivision lots. Privacy, vinyl, and aluminum are the residential styles we install." },
      { id: "lake-geneva", name: "Lake Geneva", text: "Inland in Walworth County, on the lake the city is named for. We install the same residential and commercial fences we build in northern Illinois. The quote comes from the Round Lake shop." },
      { id: "delavan", name: "Delavan", text: "Also in Walworth County, west of Lake Geneva. It is the farthest of the Wisconsin cities on our list. Wood, vinyl, aluminum, chain link, and gates are available." },
    ],
    related: FENCE_LINKS.slice(0, 4),
  }),
  page({
    path: "/service-areas/",
    title: "Fence Service Areas in Illinois and Wisconsin | Aztec Fence",
    description: "Aztec Fence installs fences from Round Lake, IL across Lake County and into Kenosha, Pleasant Prairie, Lake Geneva, and Delavan. (847) 740-4655.",
    h1: "Fence Service Areas",
    linkLabel: "Service areas",
    eyebrow: "Illinois and Wisconsin",
    image: "/images/aluminum-05.jpg",
    imageAlt: "Aluminum fence project by Aztec Fence",
    serviceType: "Fence installation",
    areaServed: { "@type": "AdministrativeArea", name: "Northern Illinois" },
    pageType: "CollectionPage",
    listAllAreas: true,
    paragraphs: [
      "The shop is at 11 N Fairfield Rd, Round Lake, IL 60073. From there we install vinyl, aluminum, wood, chain link, privacy fences, and gates for homes and businesses. The city list below is the same one published on the homepage and in our business details. Pages exist for the towns people ask about most. The other names are still on the route; they do not each have a separate page.",
      "Wisconsin work is Kenosha, Pleasant Prairie, Lake Geneva, and Delavan only. We do not list a Kenosha address. Hours stay Monday through Friday 7:00 to 5:00 and Saturday 7:00 to 11:00.",
    ],
    related: [
      { href: "/pool-fences/", label: "Pool fences" },
      { href: "/fence-repair/", label: "Fence repair" },
      { href: "/kenosha-wi/", label: "Kenosha and Wisconsin" },
      { href: "/contact/", label: "Free quote" },
    ],
  }),
  town({
    path: "/service-areas/round-lake/",
    name: "Round Lake",
    title: "Fence Installation in Round Lake, IL | Aztec Fence Company",
    description: "Fence company in Round Lake, IL. The Aztec Fence shop is at 11 N Fairfield Rd. Vinyl, aluminum, wood, and chain link. Free quotes. (847) 740-4655.",
    h1: "Fence Installation in Round Lake",
    image: "/images/Residential-vinyl-privacy-fence-04-1.jpg",
    paragraphs: [
      "Round Lake is home base. The office and yard are at 11 N Fairfield Rd, Round Lake, IL 60073, on Fairfield Road in the village. Call (847) 740-4655 or come in for a quote during posted hours.",
      "We also cover the rest of the Round Lake names on our list: Round Lake Beach, Round Lake Heights, and Round Lake Park. Grayslake, Hainesville, Volo, and Fox Lake are the closest neighboring places we serve. Fence styles are vinyl, aluminum (including pool-code), wood, chain link, privacy, and gates.",
    ],
    neighbors: [
      { href: "/service-areas/grayslake/", label: "Grayslake" },
      { href: "/service-areas/mundelein/", label: "Mundelein" },
      { href: "/fence-repair/", label: "Fence repair" },
      { href: "/pool-fences/", label: "Pool fences" },
    ],
  }),
  town({
    path: "/service-areas/grayslake/",
    name: "Grayslake",
    title: "Fence Installation in Grayslake, IL | Aztec Fence",
    description: "Fence installation in Grayslake, IL from Aztec Fence in Round Lake. Vinyl, aluminum, wood, chain link, and privacy fences. Free quotes. (847) 740-4655.",
    h1: "Fence Installation in Grayslake",
    image: "/images/Residential-Vinyl-Picket-Fence-11.jpg",
    paragraphs: [
      "Grayslake is the village just south of our Round Lake shop. The downtown sits around the older center of town, and the College of Lake County campus is in Grayslake. Both older village lots and newer subdivisions are a short trip for the crew.",
      "Homeowners usually ask about privacy fences between close lots, vinyl pickets that do not need paint, and aluminum along the front. We quote those from the Round Lake shop. Bring any association rules you already have; we build to the style you are allowed to put up, and we do not file permits for you.",
    ],
    neighbors: [
      { href: "/service-areas/round-lake/", label: "Round Lake" },
      { href: "/service-areas/libertyville/", label: "Libertyville" },
      { href: "/privacy-fences/", label: "Privacy fences" },
      { href: "/vinyl-picket-fencing/", label: "Vinyl picket fencing" },
    ],
  }),
  town({
    path: "/service-areas/gurnee/",
    name: "Gurnee",
    title: "Fence Installation in Gurnee, IL | Aztec Fence",
    description: "Fence installation in Gurnee, IL for homes west of I-94 and commercial sites along Grand Avenue. Aztec Fence, Round Lake. (847) 740-4655.",
    h1: "Fence Installation in Gurnee",
    image: "/images/Residential-vinyl-privacy-fence-11-1.jpg",
    paragraphs: [
      "Gurnee is in eastern Lake County along I-94. The residential streets west of the tollway are a different job from the commercial strip around Grand Avenue, Gurnee Mills, and the amusement park. We install both: privacy and ornamental fences for yards, and chain link, security fencing, and gates for businesses.",
      "The drive starts at our Round Lake shop, not from a Gurnee office. Waukegan is the next city north, and Libertyville is southwest. Both are on our service list.",
    ],
    neighbors: [
      { href: "/service-areas/waukegan/", label: "Waukegan" },
      { href: "/service-areas/libertyville/", label: "Libertyville" },
      { href: "/commercial-fencing/", label: "Commercial fencing" },
      { href: "/privacy-fences/", label: "Privacy fences" },
    ],
  }),
  town({
    path: "/service-areas/libertyville/",
    name: "Libertyville",
    title: "Fence Installation in Libertyville, IL | Aztec Fence",
    description: "Fence installation in Libertyville, IL. Privacy, aluminum, wood, and vinyl from Aztec Fence in Round Lake. Free quotes. (847) 740-4655.",
    h1: "Fence Installation in Libertyville",
    image: "/images/Residential-wood-solid-privacy-fence-03.jpg",
    paragraphs: [
      "Libertyville is in central Lake County, with the downtown along Milwaukee Avenue and neighborhoods stretching toward the Des Plaines River and Independence Grove. Older blocks near the village center and newer subdivisions farther out are both work we schedule from Round Lake.",
      "Close-set yards usually need a privacy fence in wood or vinyl. Street-facing fronts are more often ornamental aluminum. We install both, plus gates. Confirm any village or association limit on height before we build; the quote visit is where we look at the line with you.",
    ],
    neighbors: [
      { href: "/service-areas/mundelein/", label: "Mundelein" },
      { href: "/service-areas/grayslake/", label: "Grayslake" },
      { href: "/privacy-fences/", label: "Privacy fences" },
      { href: "/aluminum-fences/", label: "Aluminum fences" },
    ],
  }),
  town({
    path: "/service-areas/mundelein/",
    name: "Mundelein",
    title: "Fence Installation in Mundelein, IL | Aztec Fence",
    description: "Fence installation in Mundelein, IL, including Diamond Lake and the Hawley Street area. Aztec Fence, Round Lake. (847) 740-4655.",
    h1: "Fence Installation in Mundelein",
    image: "/images/Residential-wood-privacy-board-on-board-fence-05.jpg",
    paragraphs: [
      "Mundelein is south of the Round Lake shop. Diamond Lake is on the west side of town, and the downtown runs along Hawley Street. The village shares borders with Libertyville and Vernon Hills, which are also on our list.",
      "Lake lots and ordinary subdivision yards get different fences. A lot on the water often wants an open aluminum or picket line so the view stays, while an interior lot wants a solid privacy fence. We install both, and we repair existing wood and vinyl runs.",
    ],
    neighbors: [
      { href: "/service-areas/libertyville/", label: "Libertyville" },
      { href: "/service-areas/round-lake/", label: "Round Lake" },
      { href: "/wood-picket-fencing/", label: "Wood fences" },
      { href: "/fence-repair/", label: "Fence repair" },
    ],
  }),
  town({
    path: "/service-areas/antioch/",
    name: "Antioch",
    title: "Fence Installation in Antioch, IL | Aztec Fence",
    description: "Fence installation in Antioch, IL, near the Chain of Lakes and the Wisconsin line. Aztec Fence installs from Round Lake. (847) 740-4655.",
    h1: "Fence Installation in Antioch",
    image: "/images/Residential-wood-solid-privacy-fence-11.jpg",
    paragraphs: [
      "Antioch is at the north end of Lake County, by the Chain of Lakes and the Wisconsin line. Lots are often larger than in the closer suburbs, and the downtown is the Main Street district. Our crew still comes from Round Lake. Antioch is on the way toward Kenosha and Pleasant Prairie, which we also serve.",
      "Wood and vinyl privacy fences suit the bigger backyards. Chain link is the usual choice at the rural edges. Aluminum and gates are available when the front of the property needs them. The quote includes the drive from Round Lake.",
    ],
    neighbors: [
      { href: "/kenosha-wi/", label: "Kenosha and Wisconsin" },
      { href: "/service-areas/round-lake/", label: "Round Lake" },
      { href: "/chain-link-fences/", label: "Chain link fences" },
      { href: "/wood-picket-fencing/", label: "Wood fences" },
    ],
  }),
  town({
    path: "/service-areas/waukegan/",
    name: "Waukegan",
    title: "Fence Installation in Waukegan, IL | Aztec Fence",
    description: "Residential and commercial fence installation in Waukegan, IL, the Lake County seat. Aztec Fence, Round Lake. Free quotes. (847) 740-4655.",
    h1: "Fence Installation in Waukegan",
    image: "/images/commercial-03-2.jpg",
    imageAlt: "Commercial chain link fence installed by Aztec Fence",
    paragraphs: [
      "Waukegan is the Lake County seat, on Lake Michigan north of Gurnee. Residential neighborhoods sit inland from the lakefront. Commercial and industrial sites are part of the same city, and those are a larger share of the calls here than in a village like Grayslake.",
      "For houses we install privacy, vinyl, wood, and aluminum. For businesses we install chain link, security fencing, and gates. Everything is scheduled from 11 N Fairfield Rd in Round Lake. There is no Waukegan storefront.",
    ],
    neighbors: [
      { href: "/service-areas/gurnee/", label: "Gurnee" },
      { href: "/commercial-fencing/", label: "Commercial fencing" },
      { href: "/security-fences/", label: "Security fences" },
      { href: "/chain-link-fences/", label: "Chain link fences" },
    ],
  }),
  town({
    path: "/service-areas/mchenry/",
    name: "McHenry",
    title: "Fence Installation in McHenry, IL | Aztec Fence",
    description: "Fence installation in McHenry, IL, along the Fox River in McHenry County. Aztec Fence serves McHenry from Round Lake. (847) 740-4655.",
    h1: "Fence Installation in McHenry",
    image: "/images/aluminum-19.jpg",
    paragraphs: [
      "McHenry is west of Round Lake, in McHenry County, along the Fox River. It is a different county from the Lake County towns, and it is already on our published list along with Huntley and Woodstock. The shop that quotes the work is still in Round Lake.",
      "River-town lots and ordinary residential streets both use the styles we install everywhere else: wood, vinyl, aluminum, chain link, privacy, and gates. We do not publish a McHenry price list. The quote is based on the line, the material, and the site.",
    ],
    neighbors: [
      { href: "/service-areas/round-lake/", label: "Round Lake" },
      { href: "/residential-fence/", label: "Residential fencing" },
      { href: "/vinyl-picket-fencing/", label: "Vinyl picket fencing" },
      { href: "/gates/", label: "Gates" },
    ],
  }),
];

function town(entry) {
  return page({
    linkLabel: entry.name,
    eyebrow: `${entry.name}, Illinois`,
    imageAlt: `Fence project photo for Aztec Fence work serving ${entry.name}`,
    serviceType: "Fence installation",
    areaServed: city(entry.name, "Illinois"),
    related: entry.neighbors,
    ...entry,
  });
}

const BY_PATH = new Map(LANDING_PAGES.map((entry) => [entry.path, entry]));

export function landingByPath(pathname) {
  return BY_PATH.get(pathname) || null;
}

const PLACE_PATHS = {
  "Round Lake": "/service-areas/round-lake/",
  Grayslake: "/service-areas/grayslake/",
  Gurnee: "/service-areas/gurnee/",
  Libertyville: "/service-areas/libertyville/",
  Mundelein: "/service-areas/mundelein/",
  Antioch: "/service-areas/antioch/",
  Waukegan: "/service-areas/waukegan/",
  McHenry: "/service-areas/mchenry/",
  Kenosha: "/kenosha-wi/",
  "Pleasant Prairie": "/kenosha-wi/#pleasant-prairie",
  "Lake Geneva": "/kenosha-wi/#lake-geneva",
  Delavan: "/kenosha-wi/#delavan",
};

export function placePath(name) {
  return PLACE_PATHS[name] || null;
}

export function landingJsonLd(entry) {
  const url = `${SITE}${entry.path}`;
  const crumb = {
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: `${SITE}/` },
      ...(entry.path.startsWith("/service-areas/") && entry.path !== "/service-areas/"
        ? [{ "@type": "ListItem", position: 2, name: "Service areas", item: `${SITE}/service-areas/` },
           { "@type": "ListItem", position: 3, name: entry.h1, item: url }]
        : [{ "@type": "ListItem", position: 2, name: entry.h1, item: url }]),
    ],
  };
  const main = entry.pageType === "CollectionPage"
    ? {
        "@type": "CollectionPage",
        name: entry.h1,
        url,
        description: entry.description,
        about: { "@id": `${SITE}/#business` },
      }
    : {
        "@type": "Service",
        name: entry.h1,
        serviceType: entry.serviceType,
        url,
        description: entry.description,
        provider: { "@id": `${SITE}/#business` },
        areaServed: entry.areaServed,
      };
  return { "@context": "https://schema.org", "@graph": [main, crumb] };
}
