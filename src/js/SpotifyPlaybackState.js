import SpotifyTrackObject from '@/js/SpotifyTrackObject';

/**
 * @type {import('./spotify').SpotifyPlaybackState}
 */
class SpotifyPlaybackState {
  constructor(fromApi) {
    this.item = new SpotifyTrackObject(fromApi?.item);
  }
}

export default SpotifyPlaybackState;
