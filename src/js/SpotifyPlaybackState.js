import SpofityTrack from '@/js/SpofityTrack';
import SpotifyDevice from '@/js/SpotifyDevice';

/**
 * @type {import('./spotify').SpotifyPlaybackState}
 */
class SpotifyPlaybackState {
  constructor(fromApi) {
    this.device = new SpotifyDevice(fromApi?.device);
    this.is_playing = fromApi?.is_playing;
    this.shuffle_state = fromApi?.shuffle_state;
    this.repeat_state = fromApi?.repeat_state;
    this.progress_ms = fromApi?.progress_ms;
    this.item = new SpofityTrack(fromApi?.item);
  }

  /**
   * @param {string} deviceId
   * @returns {boolean}
   */
  isMyDeviceActive(deviceId) {
    return deviceId === this.device?.id ? true : false;
  }
}

export default SpotifyPlaybackState;
