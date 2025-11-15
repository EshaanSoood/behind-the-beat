type TagProps = {
  children: React.ReactNode;
  className?: string;
};

export function Tag({ children, className }: TagProps) {
  const baseClassName =
    "surface-chamfer inline-flex items-center border border-neutral-ui-border bg-transparent px-3 py-1 text-xs font-semibold uppercase tracking-wide text-neutral-ui-text";
  const classes = [baseClassName, className].filter(Boolean).join(" ");

  return <span className={classes}>{children}</span>;
}

