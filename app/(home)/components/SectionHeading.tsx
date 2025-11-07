type SectionHeadingProps = {
  title: string;
  eyebrow?: string;
};

export function SectionHeading({ title, eyebrow }: SectionHeadingProps) {
  return (
    <header className="home-section-heading">
      {eyebrow ? <p className="home-section-eyebrow">{eyebrow}</p> : null}
      <h2>{title}</h2>
    </header>
  );
}

