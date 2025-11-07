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
  const combinedClassName = ["container-page", className]
    .filter(Boolean)
    .join(" ");

  return (
    <Component className={combinedClassName} {...(rest as ComponentPropsWithoutRef<T>)}>
      {children}
    </Component>
  );
}

