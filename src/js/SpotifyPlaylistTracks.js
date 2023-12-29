/**
 * @type {import('@js/spotify').SpotifyPlaylistTracks}
 */
class SpotifyPlaylistTracks {
  constructor(fromApi) {
    this.href = fromApi?.tracks?.href;
    this.total = fromApi?.tracks?.total;
  }
}

export default SpotifyPlaylistTracks;
