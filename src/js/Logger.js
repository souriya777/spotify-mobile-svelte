class Logger {
  static TEST_MODE = false;

  static getNewInstance(filename) {
    return new LoggerFile(filename);
  }
}

class LoggerFile {
  constructor(filename) {
    this.filename = filename;
  }

  log(message = '', toDebug = null, ...args) {
    if (Logger.TEST_MODE) {
      return;
    }

    const prefix = this.#prefix(message);
    if (toDebug) {
      console.log(prefix, toDebug, ...args);
    } else {
      console.log(prefix);
    }
  }

  error(message = '', toDebug = '', ...args) {
    if (Logger.TEST_MODE) {
      return;
    }

    const prefix = this.#prefix(message);
    if (toDebug) {
      console.error(prefix, toDebug, ...args);
    } else {
      console.error(prefix);
    }
  }

  #prefix(message) {
    return `[souriya 😎][${this.filename}]: ${message}`;
  }
}

export default Logger;
