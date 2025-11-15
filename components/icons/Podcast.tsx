export function PodcastIcon({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      aria-hidden="true"
      focusable="false"
    >
      <path d="M12 2C8.13 2 5 5.13 5 9c0 2.38 1.19 4.47 3 5.74V17c0 1.1.9 2 2 2h4c1.1 0 2-.9 2-2v-2.26c1.81-1.27 3-3.36 3-5.74 0-3.87-3.13-7-7-7zm-2 12v2h4v-2c-.6.4-1.3.6-2 .6s-1.4-.2-2-.6zm0-8c0-1.1.9-2 2-2s2 .9 2 2-.9 2-2 2-2-.9-2-2zm8 8h-2v2h2v2H6v-2h2v-2H6c-1.1 0-2-.9-2-2V9c0-4.42 3.58-8 8-8s8 3.58 8 8v6c0 1.1-.9 2-2 2z" />
    </svg>
  );
}

