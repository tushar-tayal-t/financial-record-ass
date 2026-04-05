import express, {} from "express";
import helmet from "helmet";
import cors from "cors";
import { ErrorHandlerMiddleware } from "./middleware/error.middleware.js";
import router from "./routes/index.js";
const app = express();
app.use(express.json());
app.use(helmet());
app.use(cors());
// All routes here
app.use("/", router);
// route not found handler
app.use((_req, res) => {
    res.status(404).json({
        success: false,
        message: "Route not found",
    });
});
app.use(ErrorHandlerMiddleware);
export default app;
