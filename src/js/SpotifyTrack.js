import SpotifyAlbum from '@/js/SpotifyAlbum';
import SpotifyArtist from '@/js/SpotifyArtist';

/**
 * @type {import('./spotify').SpofityTrack}
 */
class SpotifyTrack {
  constructor(fromApi) {
    this.uri = fromApi?.uri;
    this.name = fromApi?.name;
    this.album = new SpotifyAlbum(fromApi?.album);
    this.artists = fromApi?.artists?.map((item) => new SpotifyArtist(item));
  }
}

export default SpotifyTrack;
