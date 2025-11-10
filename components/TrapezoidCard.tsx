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

  const variantClasses = {
    solid: "trapezoid-card-solid",
    frosted: "trapezoid-card-frosted",
    outline: "trapezoid-card-outline",
  };

  const combinedClassName = [
    "trapezoid-card",
    "chamfered",
    "chamfered-border",
    "ch-14",
    variantClasses[variant],
    isLink && "trapezoid-card-link",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  const cardContent = (
    <>
      {media && <div className="trapezoid-card-media chamfered ch-14">{media}</div>}
      <div className="trapezoid-card-content stack-sm">
        {kicker && <p className="trapezoid-card-kicker">{kicker}</p>}
        <h3 className="trapezoid-card-title">{title}</h3>
        {meta && <p className="trapezoid-card-meta">{meta}</p>}
        {children && <div className="trapezoid-card-body">{children}</div>}
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

