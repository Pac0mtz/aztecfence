export interface Page {
  path: string;
  title: string;
  description: string;
  h1?: string;
  linkLabel?: string;
}

export const PAGES: readonly Page[];

export function routePath(path: string): string;
