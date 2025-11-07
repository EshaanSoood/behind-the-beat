type TagProps = {
  children: React.ReactNode;
  className?: string;
};

export function Tag({ children, className }: TagProps) {
  return (
    <span className={`tag ${className || ""}`}>
      {children}
    </span>
  );
}

