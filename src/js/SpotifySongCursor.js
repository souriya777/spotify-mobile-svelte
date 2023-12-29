import Cursor from '@js/Cursor';
import SpotifySong from '@js/SpotifySong';

/**
 * @type {import('@js/spotify').SpotifySongCursor}
 */
class SpotifySongCursor extends Cursor {
  constructor(fromApi) {
    super(fromApi);
    this.items = fromApi?.items.map((item) => new SpotifySong(item));
  }
}

export default SpotifySongCursor;
