import { BookType } from "../dto/book.dto";
import { BookModel } from "../model/book.model";

export class BooksService {
    async createBook(book: BookType): Promise<BookType> {
        console.log(book);

        const bookToSave = new BookModel(book);
        const createdBook = await bookToSave.save();

        return createdBook;
    }

    async getBook(): Promise<BookType[]> {
        const books = await BookModel.find({});

        return books;
    }
}
