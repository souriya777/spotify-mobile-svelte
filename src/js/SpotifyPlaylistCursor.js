import SpotifyPlaylist from '@/js/SpotifyPlaylist';

/**
 * @type {import('@/js/spotify').SpotifyPlaylistCursor}
 */
class SpotifyPlaylistCursor {
  constructor(fromApi) {
    this.href = fromApi?.href;
    this.limit = fromApi?.limit;
    this.offset = fromApi?.offset;
    this.total = fromApi?.total;
    this.next = fromApi?.next;
    this.previous = fromApi?.previous;
    this.items = fromApi?.items.map((item) => new SpotifyPlaylist(item));
  }
}

export default SpotifyPlaylistCursor;
