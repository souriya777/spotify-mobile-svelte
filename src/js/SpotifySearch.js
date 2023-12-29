import SpotifyAlbum from '@js/SpotifyAlbum';
import SpotifySearchArtist from '@js/SpotifySearchArtist';
import SpotifyPlaylist from '@js/SpotifyPlaylist';
import SpotifyTrack from '@js/SpotifyTrack';

/**
 * @type {import('@js/spotify').SpotifySearch}
 */
class SpotifySearch {
  constructor(fromApi) {
    this.albums = fromApi?.albums?.items?.map((item) => new SpotifyAlbum(item));
    this.artists = fromApi?.artists?.items?.map((item) => new SpotifySearchArtist(item));
    this.playlists = fromApi?.playlists?.items?.map((item) => new SpotifyPlaylist(item));
    this.tracks = fromApi?.tracks?.items?.map((item) => new SpotifyTrack(item));
  }
}

export default SpotifySearch;
