import SpotifyTrack from '@/js/SpotifyTrack';

/**
 * @type {import('./spotify').SpotifyQueue}
 */
class SpotifyQueue {
  constructor(fromApi) {
    this.currently_playing = new SpotifyTrack(fromApi?.currently_playing);
    this.queue = fromApi?.queue?.map((item) => new SpotifyTrack(item));
  }
}

export default SpotifyQueue;
