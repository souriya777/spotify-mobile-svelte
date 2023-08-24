import SpotifyImage from '@/js/SpotifyImage';

class SpotifyUser {
  constructor(fromApi) {
    /** @type {string} */
    this.id = fromApi?.id;

    /** @type {string} */
    this.display_name = fromApi?.display_name;

    /** @type {SpotifyImage[]} */
    this.images = fromApi?.images?.map((img) => new SpotifyImage(img));
  }
}

export default SpotifyUser;
