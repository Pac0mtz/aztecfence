import type { ReactElement, ReactNode } from "react";

export interface FenceIconProps {
  size?: number;
  className?: string;
}

export type FenceIcon = (props: FenceIconProps) => ReactElement;

function Svg({ size = 16, className, children }: FenceIconProps & { children: ReactNode }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      {children}
    </svg>
  );
}

// Wood picket — pointed-top pickets on a rail
export const WoodPicketIcon: FenceIcon = (p) => (
  <Svg {...p}>
    <path d="M4 15h16" />
    <path d="M6 21V10l2-3 2 3v11" />
    <path d="M14 21V10l2-3 2 3v11" />
  </Svg>
);

// Privacy — solid boards, flat top
export const PrivacyBoardIcon: FenceIcon = (p) => (
  <Svg {...p}>
    <path d="M5 8h14" />
    <path d="M8 8v13M12 8v13M16 8v13" />
  </Svg>
);

// Chain link — framed diamond mesh
export const ChainLinkIcon: FenceIcon = (p) => (
  <Svg {...p}>
    <path d="M5 5v14M19 5v14" />
    <path d="M5 7h14M5 17h14" />
    <path d="M8 9l8 6M16 9l-8 6" />
  </Svg>
);

// Vinyl picket — rounded-top slats on a rail
export const VinylPicketIcon: FenceIcon = (p) => (
  <Svg {...p}>
    <path d="M4 15h16" />
    <path d="M7 21v-9a2 2 0 0 1 4 0v9" />
    <path d="M13 21v-9a2 2 0 0 1 4 0v9" />
  </Svg>
);

// Aluminum — ornamental spear-top bars
export const AluminumIcon: FenceIcon = (p) => (
  <Svg {...p}>
    <path d="M4 16h16" />
    <path d="M8 21V6" />
    <path d="M6.5 8 8 5l1.5 3" />
    <path d="M16 21V6" />
    <path d="M14.5 8 16 5l1.5 3" />
  </Svg>
);

// Commercial — building
export const CommercialIcon: FenceIcon = (p) => (
  <Svg {...p}>
    <path d="M3 21h18" />
    <path d="M5 21V8l7-4 7 4v13" />
    <path d="M10 21v-5h4v5" />
    <path d="M9 11h.01M15 11h.01" />
  </Svg>
);

// Residential — house
export const ResidentialIcon: FenceIcon = (p) => (
  <Svg {...p}>
    <path d="M3 11l9-7 9 7" />
    <path d="M5 10v11h14V10" />
    <path d="M10 21v-6h4v6" />
  </Svg>
);
