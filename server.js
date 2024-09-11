const express = require("express");
require("express-async-errors");
require("dotenv").config();
const colors = require("colors");
const mongoConnect = require("./databaseConnect/database");
const errorHandler = require("./middlewares/errorHandler");

const postRouter = require("./routes/posts");
const userRouter = require("./routes/users");
const cors = require("cors");

const app = express();

const port = process.env.PORT;

app.use(express.urlencoded());
app.use(express.json());
app.use(cors());

mongoConnect();

app.use("/", userRouter);
app.use("/posts", postRouter);

app.use(errorHandler);

app.listen(port, () => console.log(`server is working on ${port}`));
