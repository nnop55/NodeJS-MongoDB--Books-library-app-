const mongoose = require("mongoose");

const User = require("./user.model");

const BookSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    author: { type: String, required: true },
    description: { type: String, required: true },
    borrowedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Users",
      default: null,
    },
    borrowed: { type: Boolean, required: true, default: false },
  },
  { versionKey: false }
);

module.exports = mongoose.model("Books", BookSchema);
