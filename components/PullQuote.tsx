type PullQuoteProps = {
  children: React.ReactNode;
  cite?: string;
};

export function PullQuote({ children, cite }: PullQuoteProps) {
  return (
    <blockquote className="pull-quote" role="note">
      <div className="pull-quote-content">{children}</div>
      {cite && <cite className="pull-quote-cite">{cite}</cite>}
    </blockquote>
  );
}

