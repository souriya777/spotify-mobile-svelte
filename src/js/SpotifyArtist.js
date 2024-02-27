import SpotifyImage from '@js/SpotifyImage';

/**
 * @type {import('@js/spotify').SpotifyArtist}
 */
class SpotifyArtist {
  constructor(fromApi) {
    this.id = fromApi?.id;
    this.name = fromApi?.name;
    this.uri = fromApi?.uri;
    this.images = fromApi?.images?.map((img) => new SpotifyImage(img));
  }
}

export default SpotifyArtist;
