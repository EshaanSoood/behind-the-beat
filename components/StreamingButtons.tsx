import { ButtonTrapezoid } from "./ButtonTrapezoid";
import { SpotifyIcon } from "./icons/Spotify";
import { AppleMusicIcon } from "./icons/AppleMusic";
import { YouTubeMusicIcon } from "./icons/YouTubeMusic";

type StreamingButtonsProps = {
  spotify?: string;
  apple?: string;
  youtubeMusic?: string;
  size?: "sm" | "md";
};

export function StreamingButtons({
  spotify,
  apple,
  youtubeMusic,
  size = "md",
}: StreamingButtonsProps) {
  const buttons = [];

  if (spotify) {
    buttons.push(
      <ButtonTrapezoid
        key="spotify"
        href={spotify}
        tone="neutral"
        size={size}
        aria-label="Listen on Spotify"
        target="_blank"
        rel="noopener noreferrer"
        className="gap-2"
        data-role="stream-chip"
      >
        <SpotifyIcon className="h-4 w-4 text-brand-purple800" />
        <span>Spotify</span>
      </ButtonTrapezoid>
    );
  }

  if (apple) {
    buttons.push(
      <ButtonTrapezoid
        key="apple"
        href={apple}
        tone="neutral"
        size={size}
        aria-label="Listen on Apple Music"
        target="_blank"
        rel="noopener noreferrer"
        className="gap-2"
        data-role="stream-chip"
      >
        <AppleMusicIcon className="h-4 w-4 text-brand-purple800" />
        <span>Apple Music</span>
      </ButtonTrapezoid>
    );
  }

  if (youtubeMusic) {
    buttons.push(
      <ButtonTrapezoid
        key="youtube"
        href={youtubeMusic}
        tone="neutral"
        size={size}
        aria-label="Listen on YouTube Music"
        target="_blank"
        rel="noopener noreferrer"
        className="gap-2"
        data-role="stream-chip"
      >
        <YouTubeMusicIcon className="h-4 w-4 text-brand-purple800" />
        <span>YouTube Music</span>
      </ButtonTrapezoid>
    );
  }

  if (buttons.length === 0) {
    return null;
  }

  return <div className="flex flex-wrap gap-3">{buttons}</div>;
}

