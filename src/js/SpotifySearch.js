import SpotifyAlbum from '@js/SpotifyAlbum';
import SpotifyArtist from '@js/SpotifyArtist';
import SpotifyPlaylist from '@js/SpotifyPlaylist';
import SpotifyTrack from '@js/SpotifyTrack';

/**
 * @type {import('@js/spotify').SpotifySearch}
 */
class SpotifySearch {
  constructor(fromApi) {
    this.albums = fromApi?.albums?.items?.map((item) => new SpotifyAlbum(item));
    this.artists = fromApi?.artists?.items?.map((item) => new SpotifyArtist(item));
    this.playlists = fromApi?.playlists?.items?.map((item) => new SpotifyPlaylist(item));
    this.tracks = fromApi?.tracks?.items?.map((item) => new SpotifyTrack(item));
  }
}

export default SpotifySearch;
