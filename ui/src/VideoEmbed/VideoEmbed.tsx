import { forwardRef, type HTMLAttributes } from "react";
import styles from "./VideoEmbed.module.css";

export interface VideoEmbedProps extends HTMLAttributes<HTMLDivElement> {
  /** Poster image shown before playback. */
  poster?: string;
  alt?: string;
  /** Called when the play button is pressed (e.g. swap to the real player/iframe). */
  onPlay?: () => void;
}

const cx = (...a: Array<string | false | undefined>) => a.filter(Boolean).join(" ");

export const VideoEmbed = forwardRef<HTMLDivElement, VideoEmbedProps>(function VideoEmbed(
  { poster, alt = "", onPlay, className, ...rest },
  ref,
) {
  return (
    <div ref={ref} className={cx(styles.embed, className)} {...rest}>
      {poster ? <img className={styles.poster} src={poster} alt={alt} /> : null}
      <button type="button" className={styles.play} aria-label="Reproducir video" onClick={onPlay}>
        <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
          <path d="M8 5v14l11-7z" />
        </svg>
      </button>
    </div>
  );
});
