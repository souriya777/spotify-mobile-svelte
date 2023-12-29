import SpotifyTrack from '@js/SpotifyTrack';
import SpotifyDevice from '@js/SpotifyDevice';

/**
 * @type {import('@js/spotify').SpotifyPlaybackState}
 */
class SpotifyPlaybackState {
  constructor(fromApi) {
    this.is_playing = fromApi?.is_playing;
    this.shuffle_state = fromApi?.shuffle_state;
    this.repeat_state = fromApi?.repeat_state;
    this.progress_ms = fromApi?.progress_ms;
    this.item = new SpotifyTrack(fromApi?.item);
    this.device = new SpotifyDevice(fromApi?.device);
  }
}

export default SpotifyPlaybackState;
