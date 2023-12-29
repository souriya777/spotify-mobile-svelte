import Cursor from '@js/Cursor';
import SpotifyPlaylist from '@js/SpotifyPlaylist';

/**
 * @type {import('@js/spotify').SpotifyPlaylistCursor}
 */
class SpotifyPlaylistCursor extends Cursor {
  constructor(fromApi) {
    super(fromApi);
    this.items = fromApi?.items.map((item) => new SpotifyPlaylist(item));
  }
}

export default SpotifyPlaylistCursor;
