import SpotifyTrack from '@js/SpotifyTrack';
import SpotifyContext from '@js/SpotifyContext';

/**
 * @type {import('@js/spotify').SpotifySong}
 */
class SpotifySong {
  constructor(fromApi) {
    this.track = new SpotifyTrack(fromApi?.track);
    this.context = new SpotifyContext(fromApi?.context);
    // in `Liked song` we receive it
    if (fromApi?.added_at) {
      this.added_at = new Date(fromApi.added_at);
    }
  }
}

export default SpotifySong;
