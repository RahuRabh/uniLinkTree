const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
  try {
    const reqHeader = req.header("Authorization").split(" ");
    const token = reqHeader[1];
    console.log("token", token);
    if (!token) {
      return res.status(401).json({ message: "Unathorized access" });
    }
    const decode = jwt.verify(token, process.env.SECRET_KEY);
    req.userId = decode.userId;
    next();
  } catch (error) {
    console.log(error);
    res.status(401).json({
      message: "Invalid Token",
    });
  }
};

module.exports = verifyToken;