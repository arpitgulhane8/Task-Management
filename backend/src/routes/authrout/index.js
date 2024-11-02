const express = require("express");
const router = express.Router();
const {
  register,
  login,
  addContact,
  updateUser,
} = require("../../controllers/authController");
const authMiddleware = require("../../Middleware/authMiddleware");

// Register route
router.post("/register", register);

// login route
router.post("/login", login);

router.post("/addcontact", authMiddleware, addContact);

router.post("/updateUser", authMiddleware, updateUser);

module.exports = router;
