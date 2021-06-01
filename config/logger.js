const winston = require("winston");

const { combine, timestamp, label, printf } = winston.format;

const { createLogger, transports } = winston;

const myFormat = printf(({ level, message, label, timestamp }) => {
  return `${timestamp} [${label}] ${level}: ${message}`;
});

const logger = createLogger({
  level: "info",
  format: combine(label({ label: "random-movies-api" }), timestamp(), myFormat),
  transports: [
    new transports.File({
      filename: "./config/logs/api-error.log",
      level: "error",
    }),
    new transports.File({ filename: "./config/logs/api-logs.log" }),
  ],
});

module.exports = logger;
