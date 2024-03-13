const express = require("express");
const connectDB = require("./config/database");

const app = express();
app.use(express.json());

const userRouter = require("./routers/user.router");
const bookRouter = require("./routers/book.router");

app.use("/api/users", userRouter);
app.use("/api/books", bookRouter);

connectDB();

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running ${PORT}`);
});
