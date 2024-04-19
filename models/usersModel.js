const mongoose = require("mongoose");
const passportLocalmongoose = require("passport-local-mongoose");

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
  },
});

userSchema.plugin(passportLocalmongoose); //This is so cheating
const User = mongoose.model("users", userSchema);

module.exports = { User };
