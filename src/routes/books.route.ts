import { Router } from "express";
import { methodNotAllowed } from "../middlewares/unknown-path.middleware";
import booksController from "../controllers/books.controller";
import { validateBookMiddleware } from "../middlewares/validators/book.validator.middleware";

const router = Router();

router
    .route("/book")
    .post(validateBookMiddleware, booksController.createBook)
    .all(methodNotAllowed);

router.route("/books").get(booksController.getBooks).all(methodNotAllowed);

export default router;
