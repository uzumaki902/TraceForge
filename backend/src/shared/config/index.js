// Global level config for the entire application
// This file stores all configuration settings (database, server, auth, etc)
// so the whole app can import them from one place.

import dotenv from "dotenv";
// Imports the dotenv library which allows us to load environment variables from a .env file.

dotenv.config();
// Reads the .env file and loads its variables into process.env.

const config = {
  // Server configuration
  node_env: process.env.NODE_ENV || "development",
  // Reads NODE_ENV from .env. If not provided, default is "development".

  port: parseInt(process.env.PORT || "5000", 10),
  // Gets the port number from .env. If not set, server runs on port 5000.
  // parseInt converts the value from string to number.

  // MongoDB configuration
  mongo: {
    uri: process.env.MONGO_URI || "mongodb://localhost:27017/api_monitoring",
    // MongoDB connection string.
    // If MONGO_URI is not in .env, it connects to local MongoDB on port 27017.

    dbName: process.env.MONGO_DB_NAME || "api_monitoring",
    // Name of the MongoDB database.
    // Default database name is "api_monitoring".
  },

  // PostgreSQL configuration
  postgres: {
    host: process.env.PG_HOST || "localhost",
    // PostgreSQL server location.
    // Default is localhost (running on the same machine).

    port: parseInt(process.env.PG_PORT || "5432", 10),
    // PostgreSQL port (5432 is the default port).
    // Converted from string to number.

    database: process.env.PG_DATABASE || "api_monitoring",
    // Name of the PostgreSQL database.

    user: process.env.PG_USER || "postgres",
    // PostgreSQL username.

    password: process.env.PG_PASSWORD || "sai",
    // PostgreSQL password.
  },

  // RabbitMQ configuration
  rabbitmq: {
    url:
      process.env.RABBITMQ_URL ||
      "amqp://api_user:secure_password@localhost:5672/api_monitoring",
    // Connection URL for RabbitMQ.
    // Format: amqp://username:password@host:port/vhost
    // If .env doesn't provide it, it uses this default connection.

    queue: process.env.RABBITMQ_QUEUE || "api_hits",
    // Name of the message queue used for storing API events.

    publisherConfirms:
      process.env.RABBITMQ_PUBLISHER_CONFIRMS === "true" || false,
    // Enables publisher confirmations.
    // This ensures RabbitMQ confirms that messages were successfully received.

    retryAttempts: parseInt(process.env.RABBITMQ_RETRY_ATTEMPTS || "3", 10),
    // Number of times the system retries sending a message if it fails.

    retryDelay: parseInt(process.env.RABBITMQ_RETRY_DELAY || "1000", 10),
    // Delay (in milliseconds) between retry attempts.
    // Default: 1000ms = 1 second.
  },

  // JWT Authentication configuration
  jwt: {
    secret: process.env.JWT_SECRET || "traceforge-secret-key",
    // Secret key used to sign JWT tokens.
    // This ensures tokens cannot be forged.

    expiresIn: process.env.JWT_EXPIRES_IN || "24h",
    // Token expiration time.
    // Example: 24h means the token becomes invalid after 24 hours.
  },

  // Rate Limiting configuration
  rateLimit: {
    windowMs: parseInt(process.env.RATE_LIMIT_WINDOW_MS || "900000", 10),
    // Time window for rate limiting.
    // 900000 milliseconds = 15 minutes.

    maxRequests: parseInt(process.env.RATE_LIMIT_MAX_REQUESTS || "1000", 10),
    // Maximum number of requests allowed from one IP within the window.
    // Default: 1000 requests per 15 minutes.
  },
};

export default config;
// Exports the config object so other files in the app can import and use it.
