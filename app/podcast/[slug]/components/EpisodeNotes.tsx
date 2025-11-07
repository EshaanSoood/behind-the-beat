import type { Episode } from "../../../../lib/content";
import { PullQuote } from "../../../../components/PullQuote";

type EpisodeNotesProps = {
  episode: Episode;
};

export function EpisodeNotes({ episode }: EpisodeNotesProps) {
  return (
    <section className="stack-sm">
      {episode.pullQuote && (
        <PullQuote cite={episode.guest}>{episode.pullQuote}</PullQuote>
      )}
      <h2>Episode Notes</h2>
      <div className="prose-measure stack-sm">
        {episode.notes && <p>{episode.notes}</p>}
        {episode.body.raw && (
          <div
            className="episode-notes-content"
            dangerouslySetInnerHTML={{ __html: episode.body.raw }}
          />
        )}
        {episode.transcriptUrl && (
          <p className="caption">
            <a href={episode.transcriptUrl} target="_blank" rel="noopener noreferrer">
              Read transcript →
            </a>
          </p>
        )}
      </div>
    </section>
  );
}

