/**
 * @type {import('@/js/spotify').SpotifyPlaylistExtendedItem}
 */
class SpotifyPlaylistExtendedItem {
  constructor(fromApi) {
    this.added_at = new Date(fromApi?.added_at);
  }
}

export default SpotifyPlaylistExtendedItem;
