export type LandingPageData = {
  path: string;
  title: string;
  description: string;
  h1: string;
  eyebrow: string;
  image: string;
  imageAlt: string;
  paragraphs: string[];
  points?: string[];
  areas?: { id: string; name: string; text: string }[];
  listAllAreas?: boolean;
  related: { href: string; label: string }[];
};

export function landingByPath(path: string): LandingPageData | null;
export function landingJsonLd(page: LandingPageData): object;
export function placePath(name: string): string | null;
