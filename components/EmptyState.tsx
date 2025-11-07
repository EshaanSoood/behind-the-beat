import { ButtonTrapezoid } from "./ButtonTrapezoid";

type EmptyStateProps = {
  title: string;
  description: string;
};

export function EmptyState({ title, description }: EmptyStateProps) {
  return (
    <div className="empty-state">
      <h2 className="empty-state-title">{title}</h2>
      <p className="empty-state-description">{description}</p>
      <ButtonTrapezoid href="/" tone="neutral" size="md">
        Back to Home
      </ButtonTrapezoid>
    </div>
  );
}

