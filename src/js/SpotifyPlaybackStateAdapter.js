import SpotifyTrack from '@js/SpotifyTrack';
import SpotifyPlaybackState from '@js/SpotifyPlaybackState';
import SpotifyRepeatMode from '@js/SpotifyRepeatMode';

class SpotifyPlaybackStateAdapter {
  /**
   * @param {import('@js/spotify').SpotifyPlayerState} playerState
   * @returns {import('@js/spotify').SpotifyPlaybackState}
   */
  static adapt(playerState) {
    const adaptee = {};

    adaptee.is_playing = playerState?.paused === false;
    adaptee.shuffle_state = playerState?.shuffle;
    adaptee.repeat_state = SpotifyRepeatMode.toSpotifyRepeatState(playerState?.repeat_mode);
    adaptee.progress_ms = playerState?.position;
    adaptee.item = new SpotifyTrack(playerState?.track_window?.current_track);

    return new SpotifyPlaybackState(adaptee);
  }
}

export default SpotifyPlaybackStateAdapter;
