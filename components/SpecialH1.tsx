import { ReactNode } from "react";

type SpecialH1Props = {
  children: ReactNode;
  className?: string;
};

export function SpecialH1({ children, className }: SpecialH1Props) {
  const text = typeof children === "string" ? children : String(children);
  
  return (
    <div className={`special-h1-wrapper relative flex flex-col items-center justify-center ${className || ""}`}>
      {/* Background oversized light pink text - same text content, must be visible for script detection */}
      <div
        className="special-h1-background absolute inset-0 flex items-center justify-center pointer-events-none"
      >
        <div 
          className="special-h1-bg-text block font-display text-[88px] text-[rgb(255,211,232)] leading-[1] text-center whitespace-nowrap visible opacity-100" 
          data-role="special-h1-background"
        >
          {text}
        </div>
      </div>
      {/* Foreground dark purple H1 */}
      <h1 className="special-h1-foreground relative z-10 font-display text-[clamp(2rem,2vw+1.2rem,2.75rem)] leading-tight text-[var(--text-deep-purple)]">
        {text}
      </h1>
    </div>
  );
}

