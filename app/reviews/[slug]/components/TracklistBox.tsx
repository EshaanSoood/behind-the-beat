import type { Review } from "../../../../lib/content";
import { StreamingButtons } from "../../../../components/StreamingButtons";

type TracklistBoxProps = {
  review: Review;
};

export function TracklistBox({ review }: TracklistBoxProps) {
  return (
    <aside className="review-trackbox chamfered chamfered-border">
      <h2 className="tracklist-title">Tracklist</h2>
      <ol className="tracklist">
        {review.tracklist.map((track, index) => (
          <li key={index}>{track}</li>
        ))}
      </ol>
      {review.streaming && (
        <>
          <h2 className="stream-title">Stream the album</h2>
          <div className="stream-links">
            <StreamingButtons
              spotify={review.streaming.spotify}
              apple={review.streaming.apple}
              youtubeMusic={review.streaming.youtubeMusic}
              size="md"
            />
          </div>
        </>
      )}
    </aside>
  );
}

