import SpotifyTrack from '@/js/SpotifyTrack';

/**
 * @type {import('./spotify').SpotifySong}
 */
class SpotifySong {
  constructor(fromApi) {
    this.track = new SpotifyTrack(fromApi?.track);
  }
}

export default SpotifySong;
