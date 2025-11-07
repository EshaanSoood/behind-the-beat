export function formatDate(iso: string): string {
  const date = new Date(iso);
  const options: Intl.DateTimeFormatOptions = {
    month: "short",
    day: "numeric",
    year: "numeric",
  };
  return date.toLocaleDateString("en-US", options);
}

export function canonicalUrl(path: string): string {
  if (typeof window !== "undefined") {
    return `${window.location.origin}${path}`;
  }
  // SSR fallback
  return path.startsWith("/") ? path : `/${path}`;
}

