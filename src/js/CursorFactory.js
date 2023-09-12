import SpotifyPlaylistCursor from '@/js/SpotifyPlaylistCursor';

class CursorFactory {
  static createCursor(type, args) {
    if (type === 'SpotifyPlaylistCursor') {
      return new SpotifyPlaylistCursor(args);
    }
  }
}

export default CursorFactory;
