"use client";

type ElectricBorderProps = {
  variant: "review" | "podcast";
  isActive: boolean;
  className?: string;
};

export function ElectricBorder({ variant, isActive, className = "" }: ElectricBorderProps) {
  return (
    <div
      className={`electric-border electric-border--${variant} ${className}`}
      data-active={isActive ? "true" : "false"}
      aria-hidden="true"
    />
  );
}

