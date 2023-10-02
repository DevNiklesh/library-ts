import mongoose, { Schema, Document, Model } from "mongoose";
import { BookType } from "../dto/book.dto";

export interface BookDoc extends BookType, Document {}

const bookSchema = new Schema<BookDoc>({
    name: { type: String, required: true },
    author: { type: String, required: true },
    description: { type: String },
    price: { type: Number, required: true },
    publisher: { type: String },
    inventory: { type: Number, required: true },
    rented: { type: Number, required: true },
});

export const BookModel: Model<BookDoc> = mongoose.model("books", bookSchema);
