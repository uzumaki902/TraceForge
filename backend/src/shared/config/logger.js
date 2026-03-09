import winston from "winston";
// Imports the Winston logging library.

import config from "./index";
// Imports the configuration file you created earlier
// (contains environment, ports, database settings etc).

const logger = winston.createLogger({
  // Creates a new logger instance.

  level: config.node_env === "production" ? "info" : "debug",
  // Sets the logging level.
  // In production → only important logs (info, warn, error).
  // In development → debug logs are also shown for troubleshooting.

  format: winston.format.combine(
    // Combines multiple formatting options for logs.

    winston.format.timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
    // Adds a timestamp to each log entry.

    winston.format.errors({ stack: true }),
    // Ensures that error logs include the full stack trace.

    winston.format.splat(),
    // Allows string interpolation like printf-style formatting.

    winston.format.json(),
    // Outputs logs in JSON format (useful for log analysis tools).
  ),

  defaultMeta: {
    service: "api-monitoring-service",
  },
  // Adds metadata to every log entry identifying which service produced it.

  transports: [
    new winston.transports.File({ filename: "logs/error.log", level: "error" }),
    // Stores error-level logs inside logs/error.log file.

    new winston.transports.File({ filename: "logs/combined.log" }),
    // Stores all logs (info, warn, error, debug) inside logs/combined.log.
  ],
});

if (config.node_env !== "production") {
  // If the app is not running in production (i.e., development mode)

  logger.add(
    new winston.transports.Console({
      // Adds console logging transport.

      format: winston.format.combine(
        winston.format.colorize(),
        // Adds colors to log levels for easier readability.

        winston.format.simple(),
        // Uses a simpler readable format for console output.
      ),
    }),
  );
}

export default logger;
// Exports the logger so it can be used across the entire application.
