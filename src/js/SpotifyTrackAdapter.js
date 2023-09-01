import SpotifyTrack from '@/js/SpotifyTrack';
import SpotifyAlbum from '@/js/SpotifyAlbum';
import SpotifyArtist from '@/js/SpotifyArtist';

class SpotifyTrackAdapter {
  /**
   * @param {import('@/js/spotify').SpotifyPlayerState} playerState
   * @returns {import('@/js/spotify').SpotifyTrack}
   */
  static adapt(playerState) {
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
}

export default SpotifyTrackAdapter;
