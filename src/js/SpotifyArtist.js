/**
 * @type {import('./spotify').SpotifyArtist}
 */
class SpotifyArtist {
  constructor(fromApi) {
    this.name = fromApi?.name;
  }
}

export default SpotifyArtist;
