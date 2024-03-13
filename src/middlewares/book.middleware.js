const Book = require("../models/book.model");

const getBook = async (req, res, next) => {
  try {
    const book = await Book.findById(req.params.bookId);
    if (book == null) {
      return res.status(404).json({ message: "Book not found" });
    }
    res.book = book;
    next();
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

module.exports = { getBook };
