import {
  ComponentPropsWithoutRef,
  ElementType,
  ReactNode,
} from "react";

type SectionProps<T extends ElementType> = {
  as?: T;
  className?: string;
  children: ReactNode;
} & Omit<ComponentPropsWithoutRef<T>, "as" | "className" | "children">;

export function Section<T extends ElementType = "section">({
  as,
  className,
  children,
  ...rest
}: SectionProps<T>) {
  const Component = as ?? "section";
  const baseClassName = "container-page site-container";
  const combinedClassName = [baseClassName, className]
    .filter(Boolean)
    .join(" ");

  return (
    <Component
      className={combinedClassName}
      data-site-container=""
      {...(rest as ComponentPropsWithoutRef<T>)}
    >
      {children}
    </Component>
  );
}

