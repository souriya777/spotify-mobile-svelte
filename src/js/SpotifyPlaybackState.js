import SpotifyTrack from '@/js/SpotifyTrack';
import SpotifyDevice from '@/js/SpotifyDevice';

/**
 * @type {import('@/js/spotify').SpotifyPlaybackState}
 */
class SpotifyPlaybackState {
  constructor(fromApi) {
    this.device = new SpotifyDevice(fromApi?.device);
    this.is_playing = fromApi?.is_playing;
    this.shuffle_state = fromApi?.shuffle_state;
    this.repeat_state = fromApi?.repeat_state;
    this.progress_ms = fromApi?.progress_ms;
    this.item = new SpotifyTrack(fromApi?.item);
    this.current_m_ss = '0:00';
    this.end_m_ss = '0:00';
    this.progress_percent = 0;
  }
}

export default SpotifyPlaybackState;
