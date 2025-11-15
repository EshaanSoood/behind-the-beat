import { ButtonTrapezoid } from "./ButtonTrapezoid";

type EmptyStateProps = {
  title: string;
  description: string;
};

export function EmptyState({ title, description }: EmptyStateProps) {
  return (
    <div className="surface-chamfer mx-auto flex max-w-prose flex-col items-center gap-4 border border-neutral-ui-border bg-neutral-ui-surface px-6 py-12 text-center shadow-soft">
      <h2 className="text-3xl font-semibold text-neutral-ui-text">{title}</h2>
      <p className="text-base text-neutral-ui-textMuted">{description}</p>
      <ButtonTrapezoid href="/" tone="neutral" size="md">
        Back to Home
      </ButtonTrapezoid>
    </div>
  );
}

