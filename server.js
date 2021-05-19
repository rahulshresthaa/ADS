if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

const express = require("express");
const app = express();
const expressLayouts = require("express-ejs-layouts");

//Index Router
const indexRouter = require("./routes/index");

//Setting the view engine: EJS
app.set("view engine", "ejs");
//Setting Views in views directory
app.set("views", __dirname + "/views");
//Settting Epxress Layouts
app.set("layout", "layouts/layout");
app.use(expressLayouts);
app.use(express.static("public"));

const mongoose = require("mongoose");
mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true });
const db = mongoose.connection;
db.on("error", (error) => console.log(error));
db.once("open", () => console.log("Connected to Mongoose"));

app.use("/", indexRouter);
app.listen(process.env.PORT || 3000);
