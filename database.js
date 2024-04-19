const mongoose = require("mongoose");
require("dotenv").config();

// const MONGODB_CONNECTION_URI = process.env.MONGODB_CONNECTION_URI;

function connectToMongoDB(MONGODB_CONNECTION_URI) {
  mongoose.connect(MONGODB_CONNECTION_URI);

  mongoose.connection.on("connected", () => {
    console.log("Database Connected Successfully.");
  });

  mongoose.connection.on("error", (err) => {
    console.log("Error Connecting To Database: ", err);
  }); 
}

module.exports = { connectToMongoDB };
