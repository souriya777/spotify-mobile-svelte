/**
 * @type {import('./spotify').SpotifyArtist}
 */
class SpotifyArtist {
  constructor(fromApi) {
    this.name = fromApi?.name;
    this.uri = fromApi?.uri;
  }
}

export default SpotifyArtist;
