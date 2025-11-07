import { ReactNode } from "react";

type CardGridProps = {
  children: ReactNode;
};

export function CardGrid({ children }: CardGridProps) {
  return <div className="home-card-grid">{children}</div>;
}

