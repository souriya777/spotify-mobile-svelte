/**
 * @type {import('./spotify').SpotifyContext}
 */
class SpotifyContext {
  constructor(fromApi) {
    this.type = fromApi?.type;
    this.uri = fromApi?.uri;
  }
}

export default SpotifyContext;
