require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const products = require("./routes/products");
const users = require("./routes/users");

const app = express();

mongoose
  .connect(process.env.DB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
  })
  .then(() => {
    console.log("MongoDB connected");
  });

app.use("/uploads", express.static("uploads"));
app.use(express.urlencoded({
  extended: true
}));
app.use(express.json());

app.use("/products", products);
app.use("/users", users);

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server connected on port ${port}`);
});