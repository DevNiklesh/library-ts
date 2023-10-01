import express, { Application } from "express";
import cookieParser from "cookie-parser";
import compression from "compression";
import cors from "cors";

import { config } from "./config/config";
import { connectMongo } from "./database/mongo-db";
import { unknownPath } from "./middlewares/unknown-path.middleware";
import { errorHandler } from "./middlewares/error-handler.middleware";
import { routes } from "./routes/routes";
import logger from "./logger/logger";

const app: Application = express();

app.use(
    cors({
        credentials: true,
    })
);

app.use(compression());
app.use(cookieParser());
app.use(express.json());

// Registering router
routes(app);

app.use(unknownPath);
app.use(errorHandler);

async function bootServer() {
    try {
        await connectMongo();
    } catch (error) {
        logger.error(error);
    } finally {
        app.listen(config.port, () => {
            logger.info(`listening on port ${config.port}`);
        });
    }
}

bootServer();
