const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    first_name: String,
    last_name: String,
    email: String,
    password: String,
    imageUrl: String,
    isEnabled: Boolean,
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    versionKey: false,
  }
);

module.exports = mongoose.model("User", userSchema);
