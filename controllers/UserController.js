const userService = require("../services/UserService");
const bcrypt = require("bcrypt");

exports.getAllUsers = async (req, res) => {
  try {
    const blogs = await userService.getAllUsers();
    res.json({ data: blogs, message: "success" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.createUser = async (req, res) => {
  try {
    let saltRounds = await bcrypt.genSalt(10);
    req.body.password = await bcrypt.hash(req.body.password, saltRounds);

    const user = await userService.createUser(req.body);

    res.json({ data: user, message: "success" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getUserByEmail = async (req, res) => {
  try {
    const blog = await userService.getUserByEmail(req.params.id);
    res.json({ data: blog, message: "success" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.updateUser = async (req, res) => {
  try {
    const blog = await userService.updateUser(req.params.id, req.body);
    res.json({ data: blog, message: "success" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.deleteUser = async (req, res) => {
  try {
    const blog = await userService.deleteUser(req.params.id);
    res.json({ data: blog, message: "success" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.signIn = async (req, res) => { 
  try {
    const user = await userService.signIn(req);
    res.json({ data: user, message: "success" });
  } catch (err) {
    res
      .status(err.message != "Invalid Credentials" ? 500 : 403)
      .json({ error: err.message });
  }
};
