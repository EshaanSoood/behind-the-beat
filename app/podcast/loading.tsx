export default function Loading() {
  return (
    <div className="w-full">
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 8 }).map((_, index) => (
          <div
            key={index}
            className="surface-chamfer flex flex-col gap-3 border border-neutral-ui-border bg-neutral-ui-offwhite px-6 py-6 shadow-soft"
          >
            <div className="h-5 w-2/3 animate-pulse bg-neutral-ui-bg" />
            <div className="h-4 w-full animate-pulse bg-neutral-ui-bg" />
            <div className="h-3 w-1/2 animate-pulse bg-neutral-ui-bg" />
          </div>
        ))}
      </div>
    </div>
  );
}

