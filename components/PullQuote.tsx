type PullQuoteProps = {
  children: React.ReactNode;
  cite?: string;
};

export function PullQuote({ children, cite }: PullQuoteProps) {
  return (
    <blockquote
      className="pull-quote relative my-10 pl-6 text-[var(--text)] before:absolute before:left-0 before:top-0 before:h-full before:w-1 before:bg-[var(--brand-gradient)] before:content-['']"
      role="note"
    >
      <div className="text-2xl font-medium leading-snug text-[var(--text)]">{children}</div>
      {cite && (
        <cite className="mt-4 block text-sm not-italic text-[var(--text-muted)]">{cite}</cite>
      )}
    </blockquote>
  );
}

