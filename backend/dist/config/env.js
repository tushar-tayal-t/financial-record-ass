import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.resolve(__dirname, "../../.env") });
const requiredEnv = ["PORT", "JWT_SECRET", "DATABASE_URL", "REDIS_URL"];
requiredEnv.map((envVar) => {
    if (!process.env[envVar]) {
        throw new Error(`Missing required enviroment variable: ${envVar}`);
    }
});
export const config = {
    PORT: Number(process.env.PORT) || 5000,
    NODE_ENV: process.env.NODE_ENV || "development",
    DATABASE_URL: process.env.DATABASE_URL,
    JWT_SECRET: process.env.JWT_SECRET,
    REDIS_URL: process.env.REDIS_URL
};
