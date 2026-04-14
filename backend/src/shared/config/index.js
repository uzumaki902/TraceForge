import dotenv from "dotenv";

dotenv.config();

export const config = {
  // Server configuration
  node_env: process.env.NODE_ENV || "development",
  port: parseInt(process.env.PORT || "5000", 10),

  //mongodb configurationsssssss


  mongo:{
     mongo_uri: process.env.MONGO_URI || "mongodb://localhost:27017/api_monitoring",
    dbNamw:process.env.DB_NAME || "api_monitoring",
  },

  postgres: {
    host: process.env.PG_HOST || "localhost",
    port: parseInt(process.env.PG_PORT || "5432", 10),
    user: process.env.PG_USER || "postgres",
    password: process.env.PG_PASSWORD || "postgres",
    database: process.env.PG_DATABASE || "api_monitoring",

  },
  rabbitmq: {
    url: process.env.RABBITMQ_URL || "amqp://localhost",
    queue: process.env.RABBITMQ_QUEUE || "api_monitoring_queue",
  }, 
   
}
