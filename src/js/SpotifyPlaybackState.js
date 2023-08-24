import SpofityTrack from '@/js/SpofityTrack';

/**
 * @type {import('./spotify').SpotifyPlaybackState}
 */
class SpotifyPlaybackState {
  constructor(fromApi) {
    this.is_playing = fromApi?.is_playing;
    this.shuffle_state = fromApi?.shuffle_state;
    this.repeat_state = fromApi?.repeat_state;
    this.progress_ms = fromApi?.progress_ms;
    this.item = new SpofityTrack(fromApi?.item);
  }
}

export default SpotifyPlaybackState;
