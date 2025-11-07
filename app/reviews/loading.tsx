export default function Loading() {
  return (
    <div className="loading-state">
      <div className="post-grid">
        {Array.from({ length: 8 }).map((_, index) => (
          <div key={index} className="loading-skeleton">
            <div className="loading-skeleton-header" />
            <div className="loading-skeleton-body" />
            <div className="loading-skeleton-footer" />
          </div>
        ))}
      </div>
    </div>
  );
}

