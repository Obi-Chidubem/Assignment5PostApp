const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const postSchema = new Schema({
  userName: {
    type: String,
    required: true,
  },
  userId: {
    type: String,
    required: true,
  },
  header: {
    type: String,
    required: true,
  },
  body: {
    type: String,
    require: true,
  },
  collaborators: {
    type: String,
    required: false,
  },
  createAt: {
    type: Date,
    default: Date.now,
  },
});

const Post = mongoose.model("posts", postSchema); //collection name in the mongoDB is posts
module.exports = { Post };
