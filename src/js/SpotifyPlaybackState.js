import SpotifyTrack from '@/js/SpotifyTrack';
import SpotifyDevice from '@/js/SpotifyDevice';

/**
 * @type {import('./spotify').SpotifyPlaybackState}
 */
class SpotifyPlaybackState {
  constructor(fromApi) {
    this.device = new SpotifyDevice(fromApi?.device);
    this.is_playing = fromApi?.is_playing;
    this.shuffle_state = fromApi?.shuffle_state;
    this.repeat_state = fromApi?.repeat_state;
    this.progress_ms = fromApi?.progress_ms;
    this.item = new SpotifyTrack(fromApi?.item);
  }
}

export default SpotifyPlaybackState;
