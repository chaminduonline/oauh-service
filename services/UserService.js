const User = require("../models/User");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

exports.getAllUsers = async () => {
  return await User.find();
};

exports.createUser = async (user) => {
  return await User.create(user);
};
exports.getUserByEmail = async (id) => {
  return await User.findById(id);
};

exports.updateUser = async (id, user) => {
  return await User.findByIdAndUpdate(id, user);
};

exports.deleteUser = async (id) => {
  return await User.findByIdAndDelete(id);
};

exports.signIn = async (req) => {
  try {
    const { email, password } = req.body;
    // Validate if user exist in our database
    const user = await User.findOne({ email });

    if (user && (await bcrypt.compare(password, user.password))) {
      // Create token
      const token = jwt.sign(
        { user_id: user._id, email },
        process.env.TOKEN_KEY,
        {
          expiresIn: "2h",
        }
      );
      return {
        token: token,
        name: user.first_name,
        email: user.email,
      };
    } else {
      throw new Error("Invalid Credentials");
    }
  } catch (error) {
    throw new Error(error.message);
  }
};
