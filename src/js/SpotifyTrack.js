import SpotifyAlbum from '@js/SpotifyAlbum';
import SpotifyArtist from '@js/SpotifyArtist';

/**
 * @type {import('@js/spotify').SpotifyTrack}
 */
class SpotifyTrack {
  constructor(fromApi) {
    this.id = fromApi?.id;
    this.uri = fromApi?.uri;
    this.name = fromApi?.name;
    this.duration_ms = fromApi?.duration_ms;
    this.popularity = fromApi.popularity;
    this.album = new SpotifyAlbum(fromApi?.album);
    this.artists = fromApi?.artists?.map((item) => new SpotifyArtist(item));
  }
}

export default SpotifyTrack;
