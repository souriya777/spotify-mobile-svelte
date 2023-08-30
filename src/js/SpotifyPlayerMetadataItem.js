import SpotifyArtist from '@/js/SpotifyArtist';
import SpotifyImage from '@/js/SpotifyImage';

/**
 * @type {import('./spotify').SpotifyPlayerMetadataItem}
 */
class SpotifyPlayerMetadataItem {
  constructor(fromApi) {
    this.name = fromApi?.name;
    this.uri = fromApi?.uri;
    this.estimated_duration = fromApi?.estimated_duration;
    this.artists = fromApi?.artists?.map((item) => new SpotifyArtist(item));
    this.images = fromApi?.images?.map((item) => new SpotifyImage(item));
  }
}

export default SpotifyPlayerMetadataItem;
