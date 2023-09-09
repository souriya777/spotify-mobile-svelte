/**
 * @type {import('@/js/spotify').SpotifyAlbumCursor}
 */
class SpotifyAlbumCursor {
  constructor(fromApi) {
    this.href = fromApi?.href;
    this.limit = fromApi?.limit;
    this.offset = fromApi?.offset;
    this.total = fromApi?.total;
    this.next = fromApi?.next;
    this.previous = fromApi?.previous;
    this.items = fromApi?.items;
  }
}

export default SpotifyAlbumCursor;
