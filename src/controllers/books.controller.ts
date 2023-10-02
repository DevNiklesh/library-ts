import { NextFunction, Request, Response } from "express";
import logger from "../logger/logger";
import { BooksService } from "../services/book.service";
import { BookType } from "../dto/book.dto";

const bookService = new BooksService();

export class BooksController {
    async createBook(req: Request, res: Response, next: NextFunction) {
        try {
            const validatedBook: BookType = req.validBody;

            const createdBook = await bookService.createBook(validatedBook);

            res.status(200).json({ data: createdBook });
        } catch (err) {
            logger.error(err);
            next(err);
        }
    }

    async getBooks(req: Request, res: Response, next: NextFunction) {
        try {
            res.status(200).json({ data: await bookService.getBook() });
        } catch (err) {
            logger.error(err);
            next(err);
        }
    }
}

export default new BooksController();
