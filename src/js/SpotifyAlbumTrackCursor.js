import Cursor from '@js/Cursor';
import SpotifyAlbumTrack from '@js/SpotifyAlbumTrack';

/**
 * @type {import('@js/spotify').SpotifyAlbumTrackCursor}
 */
class SpotifyAlbumTrackCursor extends Cursor {
  constructor(fromApi) {
    super(fromApi);
    this.items = fromApi?.items.map((item) => new SpotifyAlbumTrack(item));
  }
}

export default SpotifyAlbumTrackCursor;
