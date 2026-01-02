const express = require("express");
const router = express.Router();
const { registerUser, loginUser } = require("../controllers/authController");

router.post("/signup", registerUser); // /api/auth/signup
router.post("/login", loginUser);     // /api/auth/login

module.exports = router;
