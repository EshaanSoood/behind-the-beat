type TagProps = {
  children: React.ReactNode;
  className?: string;
};

export function Tag({ children, className }: TagProps) {
  const classes = ["tag", "chamfered", "chamfered-border", className].filter(Boolean).join(" ");

  return <span className={classes}>{children}</span>;
}

