import mongoose from "mongoose";
import dns from "dns";
import { config } from "./env.js";
dns.setServers(["8.8.8.8", "8.8.4.4"]);
export const connectDb = async () => {
    const url = config.DATABASE_URL;
    try {
        await mongoose.connect(url, {
            dbName: "FinanceManagement",
            serverSelectionTimeoutMS: 5000,
            family: 4
        });
    }
    catch (error) {
        process.exit(1);
    }
};
