import Cursor from '@js/Cursor';

/**
 * @type {import('@js/spotify').SpotifyArtistCursor}
 */
class SpotifyArtistCursor extends Cursor {
  constructor(fromApi) {
    super(fromApi);
    this.items = fromApi?.items;
  }
}

export default SpotifyArtistCursor;
