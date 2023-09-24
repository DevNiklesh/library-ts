import { ErrorRequestHandler, Request, Response } from "express";
import { messages } from "../constants/messages";

export const errorHandler: ErrorRequestHandler = (err: Error, req: Request, res: Response) => {
    if (err.message) {
        const errorMessage: string = err.message;
        res.status(500).json({ error: errorMessage });
    } else {
        res.status(500).json({ error: messages.serverError });
    }
};