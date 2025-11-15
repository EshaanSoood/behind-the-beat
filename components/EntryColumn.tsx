import { ReactNode } from "react";

type EntryColumnProps = {
  children: ReactNode;
  variant?: "review" | "podcast";
  className?: string;
};

export function EntryColumn({ children, variant = "review", className }: EntryColumnProps) {
  const variantClass = variant === "review" ? "entry-column--review" : "entry-column--podcast";
  
  return (
    <div
      className={`entry-column prose-measure mx-auto w-full max-w-[700px] px-6 ${variantClass} ${className || ""}`}
      data-role="entry-column"
    >
      {children}
    </div>
  );
}

