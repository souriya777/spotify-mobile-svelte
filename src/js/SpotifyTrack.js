/**
 * @type {import('./spotify').SpofityTrack}
 */
class SpotifyTrack {
  constructor(fromApi) {
    this.uri = fromApi?.uri;
  }
}

export default SpotifyTrack;
