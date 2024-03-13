const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    fullName: { type: String, required: true },
    borrowedBooks: [{ type: mongoose.Schema.Types.ObjectId, ref: "Books" }],
  },
  { versionKey: false }
);

module.exports = mongoose.model("Users", UserSchema);
