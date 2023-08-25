class QueueEmptyError extends Error {
  constructor(message) {
    super(message);
    this.name = 'QueueEmptyError';
  }
}

export default QueueEmptyError;
