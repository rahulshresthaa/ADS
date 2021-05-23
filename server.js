if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

//Imports
const express = require("express");
const app = express();
const expressLayouts = require("express-ejs-layouts");
const bodyParser = require("body-parser");

//Index Router
const indexRouter = require("./routes/index");
const cuisineRouter = require("./routes/cuisines");

//Setting the view engine: EJS
app.set("view engine", "ejs");
//Setting Views in views directory
app.set("views", __dirname + "/views");
//Settting Epxress Layouts
app.set("layout", "layouts/layout");
app.use(expressLayouts);
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: false }));

const mongoose = require("mongoose");
mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true });
const db = mongoose.connection;
db.on("error", (error) => console.log(error));
db.once("open", () => console.log("Connected to Mongoose"));

//Using Router
app.use("/", indexRouter);
app.use("/cuisines", cuisineRouter);

app.listen(process.env.PORT || 3000);
