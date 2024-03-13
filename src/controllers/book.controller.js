const Book = require("../models/book.model");
const User = require("../models/user.model");

const getBooks = async (req, res) => {
  try {
    const result = req.query["available"]
      ? await Book.find({ borrowed: false })
      : await Book.find();

    res.status(200).json({ data: result });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getBookById = async (req, res) => {
  res.status(200).json({ book: res.book });
};

const addBook = async (req, res) => {
  try {
    const newBook = await Book.create(req.body);
    res.status(201).json({ book: newBook });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const deleteBook = async (req, res) => {
  try {
    const book = res.book;
    const user = res.user;

    await User.updateOne(
      { _id: user.id, borrowedBooks: { $in: [book.id] } },
      {
        $pull: { borrowedBooks: book.id },
      }
    );
    await Book.deleteOne({ _id: book.id });

    res.status(202).json({ message: "Successfully deleted" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const borrowBook = async (req, res) => {
  try {
    const book = res.book;
    const user = res.user;

    await User.updateOne(
      { _id: user.id, borrowedBooks: { $nin: [book.id] } },
      {
        $push: { borrowedBooks: book.id },
      }
    );
    await Book.updateOne(
      { _id: book.id },
      { $set: { borrowedBy: user.id, borrowed: true } }
    );

    res.status(202).json({ message: "Successfully borrowed" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const returnBook = async (req, res) => {
  try {
    const book = res.book;
    const user = res.user;

    await User.updateOne(
      { _id: user.id },
      {
        $pull: { borrowedBooks: book.id },
      }
    );
    await Book.updateOne(
      { _id: book.id },
      { $set: { borrowedBy: null, borrowed: false } }
    );

    res.status(202).json({ message: "Successfully returned" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  getBooks,
  getBookById,
  addBook,
  deleteBook,
  borrowBook,
  returnBook,
};
