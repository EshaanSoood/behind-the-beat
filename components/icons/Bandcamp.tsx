import type { SVGProps } from "react";

export function BandcampIcon({ className, ...props }: SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      aria-hidden="true"
      {...props}
    >
      <path d="M0 18.75l7.437-13.5H24l-7.5 13.5H0z" />
    </svg>
  );
}

