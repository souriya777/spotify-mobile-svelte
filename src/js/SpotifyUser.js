import SpotifyImage from '@js/SpotifyImage';

/**
 * @type {import('@js/spotify').SpotifyUser}
 */
class SpotifyUser {
  constructor(fromApi) {
    this.id = fromApi?.id;
    this.display_name = fromApi?.display_name;
    this.images = fromApi?.images?.map((img) => new SpotifyImage(img));
  }
}

export default SpotifyUser;
