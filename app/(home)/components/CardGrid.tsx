import { ReactNode } from "react";

type CardGridProps = {
  children: ReactNode;
};

export function CardGrid({ children }: CardGridProps) {
  return (
    <div
      data-card-grid="true"
      role="list"
      className="home-card-grid grid w-full grid-cols-1 auto-rows-[minmax(0,1fr)] sm:grid-cols-2 lg:grid-cols-3"
    >
      {children}
    </div>
  );
}

