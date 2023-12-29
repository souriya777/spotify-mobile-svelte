import SpotifyImage from '@js/SpotifyImage';
import SpotifyArtist from '@js/SpotifyArtist';

/**
 * @type {import('@js/spotify').SpotifySearchArtist}
 */
class SpotifySearchArtist extends SpotifyArtist {
  constructor(fromApi) {
    super(fromApi);
    this.images = fromApi?.images?.map((img) => new SpotifyImage(img));
  }
}

export default SpotifySearchArtist;
