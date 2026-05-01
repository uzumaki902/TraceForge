import mongoose from "mongoose"; // Library/translator to talk to MongoDB
import config from "./index.js"; // Our config file with mongo URI, dbName from ENV
import logger from "./logger.js"; // To log messages like "connected" or "error"

/**
 * MongoDB database manager/connector
 * This is a BLUEPRINT (class) for managing ONE MongoDB connection
 * Think of it like a single WATER TANK shared by entire apartment
 */

/**
 * SINGLETON CLASS - Why class?
 * - Organizes all MongoDB functions together (connect, disconnect, get)
 * - Ensures ONLY ONE connection exists everywhere in app (no waste!)
 */
class MongoConnection {
  /**
   * CONSTRUCTOR - Runs FIRST when object is created
   * Sets up the "empty notebook" - connection exists but is null (not connected yet)
   * Without this, this.connection wouldn't exist → ERROR when checking it!
   */
  constructor() {
    this.connection = null; // "Notebook exists but empty" - ready for later use
  }

  /**
   * Connect to MongoDB
   * @returns {Promise<mongoose.Connection>}
   * Promise because async → "I promise to give connection when ready"
   */
  async connect() {
    try {
      // SINGLETON CHECK: If already connected? REUSE it! (Don't create multiple)
      // Like checking if water tank is full before filling again
      if (this.connection) {
        logger.info("Mongodb already connected"); // Log: "Already good!"
        return this.connection; // Return existing → efficient ✅
      }

      // ACTUAL CONNECTION - From MONGOOSE docs
      // async because connecting takes TIME (internet call)
      // await: "WAIT here until connection is done, THEN next line"
      // config.mongo.uri = "phone number" of MongoDB server
      // dbName = "which room/person in that server"
      await mongoose.connect(config.mongo.uri, {
        dbName: config.mongo.dbName,
      });

      // SAVE the active connection (from MONGOOSE docs)
      // Now this.connection = "notebook with data written"
      this.connection = mongoose.connection;

      // Log success (shows URI for debugging)
      logger.info(`MongoDB connected: ${config.mongo.uri}`);

      // EVENT LISTENERS - From MONGOOSE docs
      // Like setting up "alerts" for bad things
      // .on("error") → "If connection breaks while using, tell me!"
      this.connection.on("error", (err) => {
        logger.error("MongoDB connection error", err); // Log error details for debugging
      });

      // .on("disconnected") → "If connection drops suddenly, tell me!"
      this.connection.on("disconnected", () => {
        logger.error("MongoDB Disconnected"); // Helps debug "why did it drop?"
      });

      // Return the connection to whoever called this
      // Goes to main app file, NOT back to constructor
      return this.connection;
    } catch (error) {
      // Error handling
      // logger.error → Print to console (for US to see)
      // throw error → Pass error UP to caller (they handle it too)
      logger.error("Failed to connect to MongoDB:", error);
      throw error; // "Something wrong! Tell the main app"
    }
  }

  /**
   * This helps to disconnect the active mongodb connection
   * async because mongoose.disconnect() takes time
   */
  async disconnect() {
    try {
      // Check if connected first (safety)
      if (this.connection) {
        // From MONGOOSE docs - close the connection
        await mongoose.disconnect(); // await: wait for clean disconnect

        // Reset to original state ("empty notebook again")
        this.connection = null;

        logger.info("Mongodb disconnected!"); // Log for debugging
      }
      // If already null → do nothing (no error)
    } catch (error) {
      logger.error("Failed to disconnect to MongoDB:", error);
      throw error; // Pass error up
    }
  }

  /**
   * Get the active connection
   * @returns {mongoose.Connection}
   * NOT async - just return what we have (fast, no waiting)
   * If connected → real connection
   * If not → null
   */
  getConnection() {
    return this.connection; // Simple getter - current status
  }
}

/**
 * SINGLETON EXPORT - Magic line!
 * export default new MongoConnection()
 *
 * Why? Creates the object HERE ONCE
 * Every import gets SAME object → ONE connection everywhere
 *
 * Without "new": export default MongoConnection → each import creates NEW (bad!)
 * With "new": ONE shared → perfect for DB! (like one water tank)
 */
export default new MongoConnection();
