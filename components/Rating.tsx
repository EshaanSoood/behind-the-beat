type RatingProps = {
  value: number;
  outOf?: number;
};

export function Rating({ value, outOf = 5 }: RatingProps) {
  if (value <= 0 || value > outOf) {
    return null;
  }

  return (
    <div
      className="inline-flex items-center gap-1 text-sm text-neutral-ui-textMuted"
      role="img"
      aria-label={`Rating: ${value} out of ${outOf}`}
    >
      {Array.from({ length: outOf }, (_, i) => (
        <svg
          key={i}
          className="h-3 w-3 text-brand-pink500"
          width="12"
          height="12"
          viewBox="0 0 12 12"
          fill={i < value ? "currentColor" : "none"}
          stroke="currentColor"
          strokeWidth="1"
          aria-hidden="true"
          focusable="false"
        >
          <polygon points="6,1 7.5,4.5 11.5,5 8.5,7.5 9.5,11.5 6,9 2.5,11.5 3.5,7.5 0.5,5 4.5,4.5" />
        </svg>
      ))}
    </div>
  );
}

