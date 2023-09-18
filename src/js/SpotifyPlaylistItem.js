/**
 * @type {import('@/js/spotify').SpotifyPlaylistItem}
 */
class SpotifyPlaylistItem {
  constructor(fromApi) {
    this.added_at = new Date(fromApi?.added_at);
  }
}

export default SpotifyPlaylistItem;
