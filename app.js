const express = require("express");
require("dotenv").config();
const mongoose = require("mongoose");
const database = require("./config/database");
const app = express();
const userRouter = require("./routes/UserRoutes");
const { SERVER_PORT } = process.env;

//middleware
app.use(express.json());
app.use("/api", userRouter);


const start = async () => {
  try {
      await database.connect();
      app.listen(SERVER_PORT, () => {
        console.log(`Server is running on port ${SERVER_PORT}`);
      });
  } catch (error) {
    console.log("Internal Server Error : ",error);
  }
};
start();
module.exports = app;
