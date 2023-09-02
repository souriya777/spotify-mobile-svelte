class PlaybackNotAvailableOrActiveError extends Error {
  constructor(message) {
    super(message);
    this.name = 'PlaybackNotAvailableOrActiveError';
  }
}

export default PlaybackNotAvailableOrActiveError;
