import winston from "winston";

// Configure winston
export const logger = winston.createLogger({
  level: "info",
  format: winston.format.json(),
  transports: [
    new winston.transports.File({ filename: "error.log" }),
    new winston.transports.Console({ format: winston.format.simple() }),
  ],
});
