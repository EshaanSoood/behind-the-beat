import Link from "next/link";
import { ChevronRightIcon } from "./icons/ChevronRight";

type BreadcrumbItem = {
  label: string;
  href?: string;
};

type BreadcrumbsProps = {
  items: BreadcrumbItem[];
};

export function Breadcrumbs({ items }: BreadcrumbsProps) {
  if (items.length === 0) {
    return null;
  }

  const truncateLabel = (label: string, maxLength: number = 60) => {
    if (label.length <= maxLength) return label;
    return `${label.slice(0, maxLength)}…`;
  };

  return (
    <nav aria-label="Breadcrumb" className="breadcrumbs">
      <ol className="breadcrumbs-list">
        {items.map((item, index) => {
          const isLast = index === items.length - 1;
          const displayLabel = isLast ? truncateLabel(item.label) : item.label;

          return (
            <li key={index} className="breadcrumbs-item">
              {isLast ? (
                <span aria-current="page" className="breadcrumbs-current">
                  {displayLabel}
                </span>
              ) : item.href ? (
                <Link href={item.href} className="breadcrumbs-link">
                  {displayLabel}
                </Link>
              ) : (
                <span>{displayLabel}</span>
              )}
              {!isLast && (
                <ChevronRightIcon className="breadcrumbs-separator" aria-hidden="true" />
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}

