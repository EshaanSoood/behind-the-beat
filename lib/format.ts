export function formatDate(iso: string): string {
  const date = new Date(iso);
  
  // Use a consistent format that won't differ between server and client
  // This prevents hydration mismatches
  const options: Intl.DateTimeFormatOptions = {
    month: "short",
    day: "numeric",
    year: "numeric",
    timeZone: "UTC", // Use UTC to ensure consistency
  };
  
  try {
    return date.toLocaleDateString("en-US", options);
  } catch (error) {
    // Fallback to ISO string if date parsing fails
    console.error("Error formatting date:", error, iso);
    return iso;
  }
}

export function canonicalUrl(path: string): string {
  if (typeof window !== "undefined") {
    return `${window.location.origin}${path}`;
  }
  // SSR fallback
  return path.startsWith("/") ? path : `/${path}`;
}

