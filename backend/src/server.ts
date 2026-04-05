import app from "./app.js";
import { connectDb } from "./config/db.js";
import { config } from "./config/env.js";
import { connectToRedis } from "./config/redis.js";
import { logger } from "./utils/logger.js";

const PORT = config.PORT;

const startServer = async() => {
  try {
    await connectToRedis();
    await connectDb();
    logger.info(`✅ Conneted to database successfully`);

    const server = app.listen(PORT, () => {
      logger.info(`✅ Server running on port ${PORT}`);
    });

    const shutDown = (signal: string) => {
      logger.info(`${signal} received. Shutting down server`);
      server.close(()=>{
        logger.info("Server closed");
        process.exit(0);
      });
    }

    process.on("SIGINT", shutDown);
    process.on("SIGTERM", shutDown);
  } catch(error: any) {
    logger.error("❌ Startup error:", error);
    process.exit(1);
  }
}

startServer();