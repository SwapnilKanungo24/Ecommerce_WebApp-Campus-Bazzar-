const express = require("express");
const { registerUser, loginUser, verifyOtp, logoutUser } = require("../controllers/authController");

const router = express.Router();

router.post("/register", registerUser);
router.post("/verify", verifyOtp);
router.post("/login", loginUser);
router.get("/logout", logoutUser);

module.exports = router;
