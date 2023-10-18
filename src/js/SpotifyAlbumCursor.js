import Cursor from '@/js/Cursor';

/**
 * @type {import('@/js/spotify').SpotifyAlbumCursor}
 */
class SpotifyAlbumCursor extends Cursor {
  constructor(fromApi) {
    super(fromApi);
    this.items = fromApi?.items;
  }
}

export default SpotifyAlbumCursor;
