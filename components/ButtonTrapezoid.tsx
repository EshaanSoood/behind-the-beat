"use client";

import { ComponentPropsWithoutRef, ReactNode } from "react";
import Link from "next/link";

type BaseButtonTrapezoidProps = {
  tone?: "primary" | "neutral";
  size?: "sm" | "md";
  children: ReactNode;
  className?: string;
};

type ButtonTrapezoidAsButton = BaseButtonTrapezoidProps &
  Omit<ComponentPropsWithoutRef<"button">, "children" | "className"> & {
    href?: never;
  };

type ButtonTrapezoidAsLink = BaseButtonTrapezoidProps &
  Omit<ComponentPropsWithoutRef<typeof Link>, "children" | "className"> & {
    href: string;
  };

type ButtonTrapezoidProps = ButtonTrapezoidAsButton | ButtonTrapezoidAsLink;

export function ButtonTrapezoid({
  tone = "primary",
  size = "md",
  href,
  children,
  className,
  ...rest
}: ButtonTrapezoidProps) {
  const toneClasses = {
    primary: "button-trapezoid-primary",
    neutral: "button-trapezoid-neutral",
  };

  const sizeClasses = {
    sm: "button-trapezoid-sm",
    md: "button-trapezoid-md",
  };

  const combinedClassName = [
    "button-trapezoid",
    "surface-chamfer",
    "ch-14",
    toneClasses[tone],
    sizeClasses[size],
    className,
  ]
    .filter(Boolean)
    .join(" ");

  if (href) {
    const linkProps = rest as ComponentPropsWithoutRef<typeof Link>;
    // Remove href from rest if it exists to avoid duplicate
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { href: _href, ...linkRest } = linkProps as ComponentPropsWithoutRef<typeof Link> & {
      href?: string;
    };
    return (
      <Link href={href} className={combinedClassName} {...linkRest}>
        {children}
      </Link>
    );
  }

  return (
    <button
      type="button"
      className={combinedClassName}
      {...(rest as ComponentPropsWithoutRef<"button">)}
    >
      {children}
    </button>
  );
}

