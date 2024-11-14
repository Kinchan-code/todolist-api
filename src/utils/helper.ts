// errors/CustomError.js
class CustomError extends Error {
  statusCode: number;
  constructor(statusCode: number, message: string, logError: boolean = false) {
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

export default CustomError;
