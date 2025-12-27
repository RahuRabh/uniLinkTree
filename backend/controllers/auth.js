const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const User = require("../models/user");

const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const isExistingUser = await User.findOne({ email: email });
    if (isExistingUser) {
      return res.status(401).json({
        message: "Email already exists",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const userData = new User({
      name: name,
      email: email,
      password: hashedPassword,
    });

    await userData.save();
    res.status(200).json({ message: "User Registered" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const userDetails = await User.findOne({ email });
    if (!userDetails) {
      return res.status(401).json({ message: "Invalid email" });
    }

    const passwordMatch = await bcrypt.compare(password, userDetails.password);
    if (!passwordMatch) {
      return res.status(401).json({ message: "Invalid password" });
    }

    //sending user personalized sharable link
    // const linkUrl = `https://uni-link-tree.vercel.app/links/${userDetails._id}`;
    const linkUrl = `http://localhost:3000/links/${userDetails._id}`;

    const token = jwt.sign(
      { userId: userDetails._id },
      process.env.SECRET_KEY,
      { expiresIn: "30d" }
    );
    res.cookie("token", token, {
      httpOnly: true,
      secure: true,
      sameSite: "none",
    });

    res.status(200).json({
      message: "Logged in",
      userId: userDetails._id,
      name: userDetails.name,
      linkUrl,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

const logoutUser = (req, res) => {
  res.clearCookie("token", {
    httpOnly: true,
    secure: true,
    sameSite: "none",
  });
  res.status(200).json({ message: "Logged out successfully" });
};

module.exports = { registerUser, loginUser, logoutUser };
