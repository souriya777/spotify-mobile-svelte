import SpotifyArtist from '@/js/SpotifyArtist';
import SpotifyImage from '@/js/SpotifyImage';

/**
 * @type {import('@/js/spotify').SpotifyAlbum}
 */
class SpotifyAlbum {
  constructor(fromApi) {
    this.id = fromApi?.id;
    this.uri = fromApi?.uri;
    this.name = fromApi?.name;
    this.artists = fromApi?.artists?.map((item) => new SpotifyArtist(item));
    this.images = fromApi?.images?.map((img) => new SpotifyImage(img));
  }
}

export default SpotifyAlbum;
