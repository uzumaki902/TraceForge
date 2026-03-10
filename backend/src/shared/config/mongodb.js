import mongoose from "mongoose";
import config from "./index";
import logger from "./logger";
//nice
const connectDB = async () => {
  try {
    await mongoose.connect(config.database_url);
    logger.info("MongoDB connected");
  } catch (error) {
    logger.error("MongoDB connection error", error);
    process.exit(1);
  }
};

export default connectDB;
