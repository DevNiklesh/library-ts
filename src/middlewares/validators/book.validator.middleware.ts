import { NextFunction, Request, Response } from "express";
import { BookDTO } from "../../dto/book.dto";
import logger from "../../logger/logger";

export const validateBookMiddleware = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const body = req.body;
        const validatedRes = BookDTO.safeParse(body);
        if (!validatedRes.success) {
            throw validatedRes.error;
        }

        req.validBody = { ...req.validBody, ...validatedRes.data };
        logger.info("Book validation successful");
        next();
    } catch (error) {
        logger.info("Error in Book validation middleware");
        res.status(400).json({ error });
    }
};
