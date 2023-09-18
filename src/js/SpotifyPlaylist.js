import SpotifyUser from '@/js/SpotifyUser';
import SpotifyImage from '@/js/SpotifyImage';
import SpotifyPlaylistTracks from '@/js/SpotifyPlaylistTracks';

/**
 * @type {import('@/js/spotify').SpotifyPlaylist}
 */
class SpotifyPlaylist {
  constructor(fromApi) {
    this.id = fromApi?.id;
    this.uri = fromApi?.uri;
    this.name = fromApi?.name;
    this.owner = new SpotifyUser(fromApi?.owner);
    this.images = fromApi?.images?.map((img) => new SpotifyImage(img));
    this.tracks = new SpotifyPlaylistTracks(fromApi);
    if (fromApi?.added_at) {
      this.added_at = new Date(fromApi.added_at);
    }
  }
}

export default SpotifyPlaylist;
