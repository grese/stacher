
const {info, log, warn, error} = console;

class Logger {
  // class methods:
  static info() {
    return info.apply(this, arguments);
  }
  static log() {
    return log.apply(this, arguments);
  }
  static warn() {
    return warn.apply(this, arguments);
  }
  static error() {
    return error.apply(this, arguments);
  }
}

module.exports = Logger;