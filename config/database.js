const mongoose = require("mongoose");

const { MONGO_URI } = process.env;

exports.connect = async () => {
  // Connecting to the database
  console.log('connecting : ',MONGO_URI);
   await mongoose
    .connect(MONGO_URI, {
      user: "ourmind",
      pass: "123",
    })
    .then(() => {
      console.log("Successfully connected to database");
    })
    .catch((error) => {
      console.log("database connection failed. exiting now...");
      console.error(error);
      process.exit(1);
    });
};
