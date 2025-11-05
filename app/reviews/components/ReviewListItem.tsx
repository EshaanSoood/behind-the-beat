type ReviewListItemProps = {
  placeholder?: string;
};

export function ReviewListItem({ placeholder = "ReviewListItem placeholder." }: ReviewListItemProps) {
  return <li>{placeholder}</li>;
}

