"use client";

type ElectricBorderProps = {
  variant: "review" | "podcast";
  className?: string;
};

export function ElectricBorder({ variant, className = "" }: ElectricBorderProps) {
  return (
    <div
      className={`electric-border electric-border--${variant} ${className}`}
      aria-hidden="true"
    />
  );
}

