import SpotifyAlbum from '@/js/SpotifyAlbum';
import SpotifyArtist from '@/js/SpotifyArtist';

/**
 * @type {import('./spotify').SpotifyTrackObject}
 */
class SpotifyTrackObject {
  constructor(fromApi) {
    this.name = fromApi?.name;
    this.album = new SpotifyAlbum(fromApi?.album);
    this.artists = fromApi?.artists?.map((item) => new SpotifyArtist(item));
  }
}

export default SpotifyTrackObject;
