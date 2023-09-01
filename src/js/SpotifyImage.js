/**
 * @type {import('@/js/spotify').SpotifyImage}
 */
class SpotifyImage {
  constructor(fromApi) {
    this.url = fromApi?.url;
    this.height = fromApi?.height;
    this.width = fromApi?.width;
  }
}

export default SpotifyImage;
