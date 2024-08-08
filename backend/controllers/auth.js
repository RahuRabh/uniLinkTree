const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

//User model
const User = require("../models/user");

// Logic for handling registration
const registerUser = async (req, res) => {
  try {
    //receiving data from frontend ui
    const { name, email, password, confirmPassword } = req.body;
    
    //to check if user already exits
    const isExistingUser = await User.findOne({ email: email });
    if (isExistingUser) {
      return res.json({
        errorMessage: "Email already exists",
      });
    }
    if (password !== confirmPassword) {
      return res.json({
        errorMessage: "Passwords do not match",
      });
    }

    //hashing password
    const hashedPassword = await bcrypt.hash(password, 10);
    const userData = new User({
      name: name,
      email: email,
      password: hashedPassword,
      confirmPassword: hashedPassword,
    });
    await userData.save();
    res.json({ message: "Registered" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ errorMessage: "Internal Server Error" });
  }
};

// Logic for handling login
const loginUser = async (req, res) => {
  try {

    //receiving data from frontend ui
    const { email, password } = req.body;

    //check user by its email
    const userDetails = await User.findOne({ email });
    if (!userDetails) {
      return res.json({ errorMessage: "Invalid email" });
    }
    const passwordMatch = await bcrypt.compare(password, userDetails.password);
    if (!passwordMatch) {
      return res.json({ errorMessage: "Invalid password" });
    }

    //sending user personalized sharable link
    const linkUrl = `https://uni-link-tree.vercel.app/links/${userDetails._id}`;
    // const linkUrl = `http://localhost:3001/links/${userDetails._id}`

    const token = jwt.sign({ userId: userDetails._id }, process.env.SECRET_KEY);
    res.cookie("token", token, { httpOnly: true });
    res.json({
      message: "Logged",
      token: token,
      userId: userDetails._id,
      name: userDetails.name,
      linkUrl
    });
  } catch (error) {
    console.log(error);
  }
};

module.exports = { registerUser, loginUser };
