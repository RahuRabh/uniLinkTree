const express = require("express");
const router = express.Router();
const authController = require("../controllers/auth");
const verifyToken = require("../middleware/authMiddleware");
const User = require("../models/user");

router.post("/register", authController.registerUser);
router.post("/login", authController.loginUser);
router.get("/verify", verifyToken, async (req, res) => {
  const user = await User.findById(req.userId).select("name");

  res.json({
    name: user.name,
    authenticated: true,
    userId: req.userId,
    linkUrl: `http://localhost:3000/links/${user._id}`,
  });
});
router.post("/logout", authController.logoutUser);

module.exports = router;
