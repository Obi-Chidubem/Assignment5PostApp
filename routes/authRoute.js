const express = require("express");
const bodyParser = require("body-parser");
const passport = require("passport");
const { User } = require("../models/usersModel");
const session = require("express-session");
require("dotenv").config();

authRoute = express.Router();

authRoute.use(bodyParser.urlencoded({ extended: true })); //Always do this. Just... please.
authRoute.use(passport.initialize());
authRoute.use(passport.session());


passport.use(User.createStrategy());

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

authRoute.get("/login", (req, res) => {
  res.render("login");
});

authRoute.post(
  "/login",
  passport.authenticate("local", { failureRedirect: "/login" }),
  (req, res) => {
    res.render("userPage", { user: req.user.username });
  }
);

authRoute.get("/signup", (req, res) => {
  res.render("signup");
});

authRoute.post("/signup", async (req, res) => {
  const user = req.body;
  const username = await User.findByUsername(req.body.username);
  if (username) {
    res.send("Username already exists. Please choose another.");
  } else {
    User.register(
      new User({ username: user.username }),
      user.password,
      (err, user) => {
        if (err) {
          console.log(err);
          res.render("signup", { error: err });
        } else {
          passport.authenticate("local")(req, res, () => {
            res.render("userPage", { user: user.username });
          });
        }
      }
    );
  }
});

authRoute.get("/logout", (req, res) => {
  req.logout((err) => {
    if (err) {
      return err;
    }
    res.render("index");
  });
});

module.exports = { authRoute };
