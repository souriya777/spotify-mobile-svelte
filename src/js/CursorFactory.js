import SpotifySongCursor from '@/js/SpotifySongCursor';
import SpotifyPlaylistCursor from '@/js/SpotifyPlaylistCursor';

class CursorFactory {
  static createCursor(type, args) {
    if (type === 'SpotifySongCursor') {
      return new SpotifySongCursor(args);
    }

    if (type === 'SpotifyPlaylistCursor') {
      return new SpotifyPlaylistCursor(args);
    }
  }
}

export default CursorFactory;
