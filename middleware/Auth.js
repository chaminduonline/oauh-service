const jwt = require("jsonwebtoken");

const config = process.env;

const verifyToken = (req, res, next) => {
  const token =
    req.body.token || req.query.token || req.headers["x-access-token"];

  if (!token) {
    return res
      .json({ data: [], message: "A token is required for authentication" })
      .status(499);
  }
  try {
    const decoded = jwt.verify(token, config.TOKEN_KEY);
    req.user = decoded;
  } catch (err) {
    return res.json({ data: [], message: "Invalid Token" }).status(401);
  }
  return next();
};

module.exports = verifyToken;
