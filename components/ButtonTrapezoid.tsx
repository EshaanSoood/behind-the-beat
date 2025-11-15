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

  const toneClassName: Record<"primary" | "neutral", string> = {
    primary: "bg-brand-purple800 text-brand-pink100 hover:bg-brand-purple600",
    neutral:
      "border border-neutral-ui-border bg-neutral-ui-offwhite text-neutral-ui-text hover:bg-neutral-ui-bg",
  };

  const sizeClassName: Record<"sm" | "md", string> = {
    sm: "px-4 py-3 text-sm",
    md: "px-6 py-4 text-base",
  };

  const combinedClassName = [
    "button-trapezoid surface-chamfer inline-flex min-h-[44px] items-center justify-center whitespace-nowrap uppercase tracking-wide font-semibold shadow-soft transition focus-chamfer",
    toneClassName[tone],
    sizeClassName[size],
    className,
  ]
    .filter(Boolean)
    .join(" ");

  if (isLinkProps(props)) {
    const { href, ...rawLinkProps } = props;
    const sanitizedLinkProps = { ...rawLinkProps } as Record<string, unknown>;
    delete sanitizedLinkProps.tone;
    delete sanitizedLinkProps.size;
    delete sanitizedLinkProps.className;
    delete sanitizedLinkProps.children;
    return (
      <Link href={href} className={combinedClassName} {...(sanitizedLinkProps as Omit<ButtonTrapezoidAsLink, "href">)}>
        {children}
      </Link>
    );
  }

  const { type = "button", ...rawButtonProps } = props;
  const sanitizedButtonProps = { ...rawButtonProps } as Record<string, unknown>;
  delete sanitizedButtonProps.tone;
  delete sanitizedButtonProps.size;
  delete sanitizedButtonProps.className;
  delete sanitizedButtonProps.children;
  delete sanitizedButtonProps.href;

  return (
    <button
      type={type}
      className={combinedClassName}
      {...(sanitizedButtonProps as Omit<ButtonTrapezoidAsButton, "type">)}
    >
      {children}
    </button>
  );
}

