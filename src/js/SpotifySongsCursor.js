import SpotifySong from '@/js/SpotifySong';

/**
 * @type {import('./spotify').SpotifySongsCursor}
 */
class SpotifySongsCursor {
  constructor(fromApi) {
    this.items = fromApi?.items.map((item) => new SpotifySong(item));
    this.next = fromApi?.next;
  }
}

export default SpotifySongsCursor;
