import SpotifyPlaylistExtendedItem from '@js/SpotifyPlaylistExtendedItem';

/**
 * @type {import('@js/spotify').SpotifyPlaylistExtended}
 */
class SpotifyPlaylistExtended {
  constructor(fromApi) {
    this.items = fromApi?.items?.map((item) => new SpotifyPlaylistExtendedItem(item));
  }
}

export default SpotifyPlaylistExtended;
