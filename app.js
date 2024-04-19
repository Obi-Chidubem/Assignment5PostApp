//The necessities
const express = require("express");
const session = require("express-session");
const bodyParser = require("body-parser");
require("dotenv").config();
app = express();

app.use(
  session({
    secret: process.env.SESSION_SECRET || "SomeRandomLongText",
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 1000 * 60 * 60 },
  })
);

//The view engine
app.set("view engine", "ejs");
app.set("views", "views");

// connecting to the db
const db = require("./database");
db.connectToMongoDB("mongodb://localhost:27017/SocialMedia"); //Don't do this. instead, put it in an env file and call it from there.
//I only did this for testing.

//The routes callfunctions
const authRouter = require("./routes/authRoute");
const postRouter = require("./routes/postRoute");

//setting the routes as potential middelware
app.use("/auth", authRouter.authRoute);
app.use("/posts", postRouter.postRoute);
app.use(bodyParser.urlencoded({ extended: true }));

//Middleware Galore
//The Unrouted methods
app.get("/", (req, res) => {
  // res.send("Home Page");
  res.render("index");
});

app.listen(3300, () => {
  console.log("Server running on port 3300");
});
