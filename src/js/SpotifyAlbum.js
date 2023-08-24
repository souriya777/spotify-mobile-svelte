import SpotifyImage from '@/js/SpotifyImage';

/**
 * @type {import('./spotify').SpotifyAlbum}
 */
class SpotifyAlbum {
  constructor(fromApi) {
    this.uri = fromApi?.uri;
    this.name = fromApi?.name;
    this.images = fromApi?.images?.map((img) => new SpotifyImage(img));
  }
}

export default SpotifyAlbum;
