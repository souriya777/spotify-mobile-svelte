import SpotifyRepeatState from '@js/SpotifyRepeatState';

class SpotifyRepeatMode {
  /**
   * @param {number} repeatMode
   * @returns {string}
   */
  static toSpotifyRepeatState(repeatMode) {
    switch (repeatMode) {
      case 0:
        return SpotifyRepeatState.OFF;
      case 1:
        return SpotifyRepeatState.CONTEXT;
      default:
        return SpotifyRepeatState.TRACK;
    }
  }
}

export default SpotifyRepeatMode;
