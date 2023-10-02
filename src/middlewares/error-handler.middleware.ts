/* eslint-disable @typescript-eslint/no-unused-vars */
import { ErrorRequestHandler, NextFunction, Request, Response } from "express";
import { messages } from "../constants/messages";
import logger from "../logger/logger";

export const errorHandler: ErrorRequestHandler = (
    err: Error,
    req: Request,
    res: Response,
    next: NextFunction
) => {
    logger.info("Caught the error");
    if (err.message) {
        const errorMessage: string = err.message;
        res.status(500).json({ error: errorMessage });
    } else {
        res.status(500).json({ error: messages.serverError });
    }
};
