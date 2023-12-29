import SpotifyAlbum from '@js/SpotifyAlbum';

/**
 * @type {import('@js/spotify').SpotifySavedAlbum}
 */
class SpotifySavedAlbum extends SpotifyAlbum {
  constructor(fromApi) {
    super(fromApi?.album);
    this.added_at = new Date(fromApi?.added_at);
  }
}

export default SpotifySavedAlbum;
