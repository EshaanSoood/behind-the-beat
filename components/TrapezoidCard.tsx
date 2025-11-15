"use client";

import {
  ComponentPropsWithoutRef,
  ElementType,
  ReactNode,
} from "react";

type TrapezoidCardProps<T extends ElementType = "article"> = {
  variant?: "solid" | "frosted" | "outline";
  as?: T;
  title: string;
  kicker?: string;
  meta?: string;
  href?: string;
  media?: ReactNode;
  children?: ReactNode;
} & Omit<ComponentPropsWithoutRef<T>, "as" | "title" | "kicker" | "meta" | "href" | "media" | "children">;

export function TrapezoidCard<T extends ElementType = "article">({
  variant = "solid",
  as,
  title,
  kicker,
  meta,
  href,
  media,
  children,
  className,
  ...rest
}: TrapezoidCardProps<T>) {
  const Component = (href ? "a" : as) ?? "article";
  const isLink = Boolean(href);

  const baseClassName =
    "surface-chamfer flex h-full min-h-[200px] flex-col gap-4 overflow-hidden transition duration-200";
  const interactionClassName = isLink
    ? "cursor-pointer hover:-translate-y-1 hover:shadow-card"
    : "";

  const variantClassName: Record<"solid" | "frosted" | "outline", string> = {
    solid: "border border-neutral-ui-border bg-neutral-ui-surface shadow-soft",
    frosted:
      "border border-neutral-ui-border bg-white/70 shadow-soft backdrop-blur-md",
    outline:
      "border border-neutral-ui-border bg-transparent shadow-soft",
  };

  const combinedClassName = [
    `${baseClassName} focus-chamfer`,
    variantClassName[variant],
    interactionClassName,
    className,
  ]
    .filter(Boolean)
    .join(" ");

  const cardContent = (
    <>
      {media && (
        <div className="surface-chamfer surface-frost-pink-70 relative aspect-square overflow-hidden border border-neutral-ui-border">
          {media}
        </div>
      )}
      <div className="flex flex-1 flex-col gap-4 px-6 pb-6 pt-6">
        {kicker && (
          <p className="text-xs font-semibold uppercase tracking-wide text-neutral-ui-textMuted">
            {kicker}
          </p>
        )}
        <h3 className="text-2xl font-semibold text-neutral-ui-text">{title}</h3>
        {meta && <p className="text-sm text-neutral-ui-textMuted">{meta}</p>}
        {children && <div className="mt-auto text-base text-neutral-ui-text">{children}</div>}
      </div>
    </>
  );

  if (isLink) {
    return (
      <Component
        href={href}
        className={combinedClassName}
        role="article"
        {...(rest as ComponentPropsWithoutRef<"a">)}
      >
        {cardContent}
      </Component>
    );
  }

  return (
    <Component className={combinedClassName} {...(rest as ComponentPropsWithoutRef<T>)}>
      {cardContent}
    </Component>
  );
}

