import SpotifyPlaylistItem from '@/js/SpotifyPlaylistItem';

/**
 * @type {import('@/js/spotify').SpotifyPlaylistItems}
 */
class SpotifyPlaylistItems {
  constructor(fromApi) {
    this.items = fromApi?.items?.map((item) => new SpotifyPlaylistItem(item));
  }
}

export default SpotifyPlaylistItems;
