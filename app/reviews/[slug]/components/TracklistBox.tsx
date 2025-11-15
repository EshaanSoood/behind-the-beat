import type { Review } from "../../../../lib/content";
import { StreamingButtons } from "../../../../components/StreamingButtons";

type TracklistBoxProps = {
  review: Review;
};

export function TracklistBox({ review }: TracklistBoxProps) {
  return (
    <>
      <aside className="tracklist-panel surface-chamfer flex flex-col gap-4 border border-[var(--border-accent-strong)] bg-[var(--surface-frost-pink-70)] px-6 py-6 text-[var(--text)] shadow-soft" data-role="tracklist-panel">
        <h2 className="font-display text-[var(--text-h2)] leading-tight text-[var(--text-deep-purple)]">
          Tracklist
        </h2>
        <ol className="list-decimal space-y-2 text-base leading-relaxed">
          {review.tracklist.map((track, index) => (
            <li key={index}>{track}</li>
          ))}
        </ol>
      </aside>
      {review.streaming && (
        <div className="streaming-row mt-6" data-role="streaming-row">
          <div className="flex flex-col gap-3">
            <StreamingButtons
              spotify={review.streaming.spotify}
              apple={review.streaming.apple}
              youtubeMusic={review.streaming.youtubeMusic}
              size="md"
            />
          </div>
        </div>
      )}
    </>
  );
}

