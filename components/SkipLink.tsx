export function SkipLink() {
  return (
    <a
      className="pointer-events-none fixed left-1/2 top-2 z-50 -translate-x-1/2 bg-neutral-ui-offwhite px-3 py-2 text-neutral-ui-text shadow-soft opacity-0 transition surface-chamfer focus-visible:pointer-events-auto focus-visible:opacity-100"
      href="#main"
    >
      Skip to content
    </a>
  );
}
