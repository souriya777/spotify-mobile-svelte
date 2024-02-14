import SpotifyTrack from '@js/SpotifyTrack';
import SpotifyAlbum from '@js/SpotifyAlbum';
import SpotifyArtist from '@js/SpotifyArtist';

class SpotifyTrackAdapter {
  /**
   * @param {import('@js/spotify').SpotifyPlayerState} playerState
   * @returns {import('@js/spotify').SpotifyTrack}
   */
  static adaptPlayerState(playerState) {
    const adaptee = {};
    const current_track = playerState?.track_window?.current_track;

    if (current_track) {
      adaptee.uri = current_track?.uri;
      adaptee.name = current_track?.name;
      adaptee.duration_ms = current_track?.duration_ms;
      adaptee.album = new SpotifyAlbum(current_track?.album);
      adaptee.artists = current_track?.artists?.map((item) => new SpotifyArtist(item));
    }

    return new SpotifyTrack(adaptee);
  }

  /**
   * @param {import('@js/spotify').SpotifyAlbumTrack} albumTrack
   * @returns {import('@js/spotify').SpotifyTrack}
   */
  static adaptAlbumTrack(albumTrack) {
    const adaptee = {};

    if (albumTrack) {
      adaptee.id = albumTrack?.id;
      adaptee.uri = albumTrack?.uri;
      adaptee.name = albumTrack?.name;
      adaptee.duration_ms = albumTrack?.duration_ms;
      adaptee.artists = albumTrack?.artists?.map((item) => new SpotifyArtist(item));
    }

    return new SpotifyTrack(adaptee);
  }
}

export default SpotifyTrackAdapter;
