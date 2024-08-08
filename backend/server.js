require("dotenv").config();

//requiring dependencies
const express = require("express");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const mongoose = require("mongoose");

//Import routes
const authRoutes = require("./routes/auth");
const linkRoutes = require("./routes/link");
const errorHandler = require("./middleware/errorHanlder")

//initiating express
const app = express();

//Middleware
app.use(cors());
app.use(express.json());
app.use(cookieParser());

//configuring mongoose
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log(err));

// routes
app.use("/api/auth", authRoutes);
app.use("/api/links", linkRoutes);
app.use("/*", (req, res) => {
  res.status(404).json({ errorMessage: "Route not found" });
});
app.use("/", errorHandler);

const HOST = process.env.HOST || "localhost";
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Backend Server is running at http://${HOST}:${PORT}`);
});
