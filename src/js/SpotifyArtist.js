/**
 * @type {import('@js/spotify').SpotifyArtist}
 */
class SpotifyArtist {
  constructor(fromApi) {
    this.id = fromApi?.id;
    this.name = fromApi?.name;
    this.uri = fromApi?.uri;
  }
}

export default SpotifyArtist;
