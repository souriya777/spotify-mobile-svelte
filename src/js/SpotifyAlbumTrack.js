import SpotifyArtist from '@js/SpotifyArtist';

/**
 * @type {import('@js/spotify').SpotifyAlbumTrackCursor}
 */
class SpotifyAlbumTrack {
  constructor(fromApi) {
    this.id = fromApi?.id;
    this.uri = fromApi?.uri;
    this.name = fromApi?.name;
    this.disc_number = fromApi?.disc_number;
    this.track_number = fromApi?.track_number;
    this.duration_ms = fromApi?.duration_ms;
    this.artists = fromApi?.artists?.map((item) => new SpotifyArtist(item));
  }
}

export default SpotifyAlbumTrack;
