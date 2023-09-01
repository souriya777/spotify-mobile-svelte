import SpotifyTrack from '@/js/SpotifyTrack';
import SpotifyContext from '@/js/SpotifyContext';

/**
 * @type {import('@/js/spotify').SpotifySong}
 */
class SpotifySong {
  constructor(fromApi) {
    this.track = new SpotifyTrack(fromApi?.track);
    this.context = new SpotifyContext(fromApi?.context);
  }
}

export default SpotifySong;
