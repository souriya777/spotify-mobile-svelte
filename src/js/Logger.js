class Logger {
  static getNewInstance(filename) {
    return new LoggerFile(filename);
  }
}

class LoggerFile {
  constructor(filename) {
    this.filename = filename;
  }

  log(message = '', objectToDebug = {}) {
    const trace = this.#trace(message);
    console.log(trace, objectToDebug);
  }

  error(message = '', objectToDebug = '') {
    const trace = this.#trace(message);
    console.error(trace, objectToDebug);
  }

  #trace(message) {
    return `[souriya 😎][${this.filename}]: ${message}`;
  }
}

export default Logger;
