class Logger {
  static getNewInstance(filename) {
    return new LoggerFile(filename);
  }
}

class LoggerFile {
  constructor(filename) {
    this.filename = filename;
  }

  log(message = '', objectToDebug = {}, ...args) {
    const trace = this.#trace(message);
    console.log(trace, objectToDebug, ...args);
  }

  error(message = '', objectToDebug = '', ...args) {
    const trace = this.#trace(message);
    console.error(trace, objectToDebug, ...args);
  }

  #trace(message) {
    return `[souriya 😎][${this.filename}]: ${message}`;
  }
}

export default Logger;
