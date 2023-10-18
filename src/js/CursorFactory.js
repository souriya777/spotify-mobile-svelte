import SpotifySongCursor from '@/js/SpotifySongCursor';
import SpotifyAlbumCursor from '@/js/SpotifyAlbumCursor';
import SpotifyAlbumTrackCursor from '@/js/SpotifyAlbumTrackCursor';
import SpotifyPlaylistCursor from '@/js/SpotifyPlaylistCursor';
import SpotifyArtistCursor from '@/js/SpotifyArtistCursor';

class CursorFactory {
  static createCursor(type, args) {
    if (type === 'SpotifySongCursor') {
      return new SpotifySongCursor(args);
    }

    if (type === 'SpotifyAlbumCursor') {
      return new SpotifyAlbumCursor(args);
    }

    if (type === 'SpotifyAlbumTrackCursor') {
      return new SpotifyAlbumTrackCursor(args);
    }

    if (type === 'SpotifyPlaylistCursor') {
      return new SpotifyPlaylistCursor(args);
    }

    if (type === 'SpotifyArtistCursor') {
      return new SpotifyArtistCursor(args);
    }
  }
}

export default CursorFactory;
