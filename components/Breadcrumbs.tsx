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
    <nav aria-label="Breadcrumb" className="mb-6">
      <ol className="flex flex-wrap items-center gap-2 text-sm text-neutral-ui-textMuted">
        {items.map((item, index) => {
          const isLast = index === items.length - 1;
          const displayLabel = isLast ? truncateLabel(item.label) : item.label;

          return (
            <li key={index} className="flex items-center gap-2">
              {isLast ? (
                <span aria-current="page" className="font-medium text-neutral-ui-text">
                  {displayLabel}
                </span>
              ) : item.href ? (
                <Link
                  href={item.href}
                  className="focus-chamfer transition hover:text-neutral-ui-text"
                >
                  {displayLabel}
                </Link>
              ) : (
                <span>{displayLabel}</span>
              )}
              {!isLast && (
                <ChevronRightIcon className="h-3 w-3 flex-shrink-0 text-neutral-ui-textMuted" aria-hidden="true" />
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}

