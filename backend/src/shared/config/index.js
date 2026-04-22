import dotenv from "dotenv";

dotenv.config();

export const config = {
  // Server
  node_env: process.env.NODE_ENV || "development",
  port: parseInt(process.env.PORT || "5000", 10),

  // MongoDB
  mongo: {
    uri: process.env.MONGO_URI || "mongodb://localhost:27017/api_monitoring",
    dbName: process.env.MONGO_DB_NAME || "api_monitoring",
  },

  // PostgreSQL
  postgres: {
    host: process.env.PG_HOST || "localhost",
    port: parseInt(process.env.PG_PORT || "5432", 10),
    user: process.env.PG_USER || "postgres",
    password: process.env.PG_PASSWORD || "sai",
    database: process.env.PG_DATABASE || "api_monitoring",
  },

  // RabbitMQ
  rabbitmq: {
    url:
      process.env.RABBITMQ_URL ||
      "amqp://api_user:secure_password@localhost:5672/api_monitoring",
    queue: process.env.RABBITMQ_QUEUE || "api_hits",
  },
};