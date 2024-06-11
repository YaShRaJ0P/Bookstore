import {
  AddBook,
  GetBooks,
  GetBookById,
  UpdateBook,
  DeleteBook,
} from "../controllers/books.js";
import express from "express";
const router = express.Router();

// Route for saving a new book
router.post("/", AddBook);

//Route to Get all books
router.get("/", GetBooks);

// Route to get a book by id
router.get("/:id", GetBookById);

// Route to update a book
router.put("/:id", UpdateBook);

//Route to delete a book
router.delete("/:id", DeleteBook);

export default router;
