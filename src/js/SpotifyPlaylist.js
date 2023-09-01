import SpotifyUser from '@/js/SpotifyUser';
import SpotifyImage from '@/js/SpotifyImage';

/**
 * @type {import('@/js/spotify').SpotifyPlaylist}
 */
class SpotifyPlaylist {
  constructor(fromApi) {
    this.uri = fromApi?.uri;
    this.name = fromApi?.name;
    this.owner = new SpotifyUser(fromApi?.owner);
    this.images = fromApi?.images?.map((img) => new SpotifyImage(img));
  }
}

export default SpotifyPlaylist;
