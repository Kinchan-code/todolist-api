// errors/CustomError.js
class CustomError extends Error {
  constructor(statusCode, message, logError = false) {
    super(message);
    this.statusCode = statusCode;
    this.message = message;
    this.name = this.constructor.name;

    // Optionally log errors
    if (logError) {
      console.error(`${this.name}: ${message}`);
    }
  }
}

module.exports = CustomError;
