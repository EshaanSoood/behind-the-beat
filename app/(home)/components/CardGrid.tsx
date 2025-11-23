import { ReactNode, Children, cloneElement, isValidElement } from "react";

type CardGridProps = {
  children: ReactNode;
};

export function CardGrid({ children }: CardGridProps) {
  return (
    <div
      data-card-grid="true"
      role="list"
      className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3"
    >
      {Children.map(children, (child) => {
        if (!isValidElement(child)) {
          return child;
        }
        const props = child.props as any;
        const existingClassName = props.className || "";
        return cloneElement(child, {
          ...props,
          className: `min-h-[90vh] snap-center md:min-h-0 md:snap-none ${existingClassName}`,
        });
      })}
    </div>
  );
}

