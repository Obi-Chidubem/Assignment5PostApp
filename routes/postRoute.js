const express = require("express");
const postRoute = express.Router();
const bodyParser = require("body-parser");
const passport = require("passport");
const session = require("express-session");
const connectEnsureLogin = require("connect-ensure-login");

const { Post } = require("../models/postModel");

postRoute.use(bodyParser.urlencoded({ extended: true })); //Always do this. Just... please.
postRoute.use(passport.initialize());
postRoute.use(passport.session());
postRoute.use(connectEnsureLogin.ensureLoggedIn("/auth/login")); //I totally forgot i even had this. ha!

postRoute.get("/post", (req, res) => {
  res.render("posts");
});

postRoute.post("/post", async (req, res) => {
  const postBody = req.body;
  const post = await new Post({
    userName: req.user.username,
    userId: req.user.id,
    header: postBody.header,
    body: postBody.body,
    collaborators: postBody.collaborators,
  });
  await post.save();
  res.render("afterPost");
});

postRoute.get("/allPosts", async (req, res) => {
  const posts = await Post.find(); //always await the database queries
  // console.log(posts);
  res.render("allPosts", { posts: posts });
});

postRoute.get("/yourPosts", async (req, res) => {
  const posts = await Post.find({ userId: req.user._id }); //always await the database queries
  // console.log(posts);
  res.render("yourPosts", { user: req.user.username, posts: posts });
});

postRoute.get("/deletePost", (req, res) => {
  res.render("deletePost");
});

postRoute.post("/deletePost", async (req, res) => {
  thepost = await Post.find({ _id: req.body.id });
  // console.log(thepost[0].userName);
  // console.log(req.user.username);
  if (thepost[0].userId == req.user._id) {
    await Post.findByIdAndDelete({ _id: req.body.id });
    res.render("afterDelete");
  } else {
    res.send("This is not your Post. Please go back and reinput the id.");
  }
});

module.exports = { postRoute };
