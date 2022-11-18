const express = require("express");
const { body, validationResult } = require("express-validator");
const auth = require("../middleware/Auth"); 
const {
  getAllUsers,
  createUser,
  getUserByEmail,
  updateUser,
  deleteUser,
  signIn,
} = require("../controllers/UserController");

const router = express.Router();

router
  .route("/get-all-users")
  .get(auth,function (req, res) {
    return getAllUsers(req, res);
  })
  .post(
    body("email").isEmail().withMessage("Invalid email address"),
    body("first_name")
      .isLength({ min: 3 })
      .withMessage("must be at least 3 chars long"),
    body("last_name")
      .isLength({ min: 3 })
      .withMessage("must be at least 3 chars long"),
    body("password").not().isEmpty().trim().escape().withMessage("Required"),
    function (req, res) {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
      return createUser(req, res);
    }
  );

router.post("/get-access-token", function (req, res) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  return signIn(req, res);
});

router
  .route("/:id")
  .get(function (req, res) {
    return getUserByEmail(req, res);
  })
  .put(function (req, res) {
    return updateUser(req, res);
  })
  .delete(function (req, res) {
    return deleteUser(req, res);
  });

module.exports = router;
