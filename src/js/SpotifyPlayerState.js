import SpofityTrack from '@/js/SpofityTrack';
import SpotifyPlayerMetadataItem from '@/js/SpotifyPlayerMetadataItem';

/**
 * @type {import('./spotify').SpotifyPlayerState}
 */
class SpotifyPlayerState {
  constructor(fromApi) {
    this.paused = fromApi?.paused;
    this.shuffle = fromApi?.shuffle;
    this.repeat_mode = fromApi?.repeat_mode;
    this.duration = fromApi?.duration;
    this.position = fromApi?.position;
    this.context = {
      metadata: {
        current_item: new SpotifyPlayerMetadataItem(fromApi?.context?.metadata?.current_item),
        previous_items: fromApi?.context?.metadata?.previous_items?.map(
          (item) => new SpotifyPlayerMetadataItem(item),
        ),
        next_items: fromApi?.context?.metadata?.next_items?.map(
          (item) => new SpotifyPlayerMetadataItem(item),
        ),
      },
    };
    this.track_window = {
      current_track: new SpofityTrack(fromApi?.track_window?.current_track),
      previous_tracks: fromApi?.track_window?.previous_tracks?.map(
        (item) => new SpofityTrack(item),
      ),
      next_tracks: fromApi?.track_window?.next_tracks?.map((item) => new SpofityTrack(item)),
    };
  }
}

export default SpotifyPlayerState;
