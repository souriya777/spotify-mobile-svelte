import { millisToMinuteSecond } from '@/js/time-utils';

class SpotifyPlaybackStateService {
  /**
   * @param {import('./spotify').SpotifyPlaybackState} playbackState
   * @returns {import('./spotify').SpotifyPlaybackState}
   */
  static refreshProgress(playbackState) {
    const {
      progress_ms = 0,
      item: { duration_ms = 0 },
    } = playbackState;

    playbackState.current_m_ss = millisToMinuteSecond(progress_ms);
    playbackState.end_m_ss = millisToMinuteSecond(duration_ms);
    playbackState.progress_percent = (progress_ms / duration_ms ?? 0) * 100;

    return playbackState;
  }
}

export default SpotifyPlaybackStateService;
