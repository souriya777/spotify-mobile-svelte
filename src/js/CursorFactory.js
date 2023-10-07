import SpotifySongCursor from '@/js/SpotifySongCursor';
import SpotifyPlaylistCursor from '@/js/SpotifyPlaylistCursor';
import SpotifyArtistCursor from '@/js/SpotifyArtistCursor';

class CursorFactory {
  static createCursor(type, args) {
    if (type === 'SpotifySongCursor') {
      return new SpotifySongCursor(args);
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
