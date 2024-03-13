const express = require("express");
const router = express.Router();

const {
  getBooks,
  getBookById,
  addBook,
  deleteBook,
  borrowBook,
  returnBook,
} = require("../controllers/book.controller");
const { getBook } = require("../middlewares/book.middleware");
const { getUser } = require("../middlewares/user.middleware");

router.post("/", addBook);
router.get("/", getBooks);
router.get("/:bookId", getBook, getBookById);
router.delete("/:bookId/:userId", getBook, getUser, deleteBook);
router.put("/:bookId/borrow/:userId", getBook, getUser, borrowBook);
router.put("/:bookId/return/:userId", getBook, getUser, returnBook);

module.exports = router;
