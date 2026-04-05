import { createClient } from "redis";
import { config } from "./env.js";
import { logger } from "../utils/logger.js";
export const redisClient = createClient({
    url: config.REDIS_URL,
    socket: {
        reconnectStrategy: (retries) => {
            if (retries > 5) {
                console.log("❌ Max Redis reconnection attempts reached");
                return false;
            }
            return Math.min(retries * 500, 3000);
        }
    }
});
redisClient.on("error", (err) => {
    logger.error("❌ Redis client error:", err.message);
});
redisClient.on("connect", function () {
    logger.info("✅ Successfully connect to redis");
});
redisClient.on("reconnecting", () => {
    logger.info("Reconnecting to Redis...");
});
export async function connectToRedis() {
    try {
        await redisClient.connect();
    }
    catch (error) {
        logger.error("❌ Failed to connect to Redis:", error.message);
        process.exit(1);
    }
}
