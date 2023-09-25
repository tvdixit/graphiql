const express = require("express");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
const dbConnect = require("./Config/db");

dotenv.config();
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

dbConnect();

const { User, Restaurant, Inquiry } = require("./Routes/index");
app.use("/user", User.route);
app.use("/restaurant", Restaurant.route);
app.use("/inquiry", Inquiry.route);

app.listen(4500, () => {
  console.log(`Server started at ${process.env.PORT}`);
});
