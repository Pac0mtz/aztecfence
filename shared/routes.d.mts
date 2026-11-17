export interface Page {
  path: string;
  title: string;
  description: string;
  linkLabel?: string;
}

export const PAGES: readonly Page[];

export function routePath(path: string): string;
