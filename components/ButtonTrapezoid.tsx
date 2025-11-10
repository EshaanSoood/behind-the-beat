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
  Omit<ComponentPropsWithoutRef<typeof Link>, "children" | "className" | "href"> & {
    href: NonNullable<ComponentPropsWithoutRef<typeof Link>["href"]>;
  };

type ButtonTrapezoidProps = ButtonTrapezoidAsButton | ButtonTrapezoidAsLink;

function isLinkProps(props: ButtonTrapezoidProps): props is ButtonTrapezoidAsLink {
  return typeof (props as ButtonTrapezoidAsLink).href !== "undefined";
}

export function ButtonTrapezoid(props: ButtonTrapezoidProps) {
  const { tone = "primary", size = "md", children, className } = props;

  const toneClasses = {
    primary: "button-trapezoid-primary",
    neutral: "button-trapezoid-neutral",
  };

  const sizeClasses = {
    sm: "button-trapezoid-sm",
    md: "button-trapezoid-md",
  };

  const sanitizedExtraClasses = className
    ?.split(/\s+/)
    .filter(Boolean)
    .filter((token) => !/^rounded(-|$)/.test(token) && !token.includes("radius"))
    .join(" ");

  const combinedClassName = [
    "button-trapezoid",
    "chamfered",
    "ch-14",
    toneClasses[tone],
    sizeClasses[size],
    sanitizedExtraClasses,
  ]
    .filter(Boolean)
    .join(" ");

  if (isLinkProps(props)) {
    const {
      href,
      tone: _tone,
      size: _size,
      className: _className,
      children: _children,
      ...linkProps
    } = props;
    return (
      <Link href={href} className={combinedClassName} {...linkProps}>
        {children}
      </Link>
    );
  }

  const {
    tone: _tone,
    size: _size,
    className: _className,
    children: _children,
    type = "button",
    ...buttonProps
  } = props;

  return (
    <button
      type={type}
      className={combinedClassName}
      {...buttonProps}
    >
      {children}
    </button>
  );
}

