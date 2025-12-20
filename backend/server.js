const cors = require("cors");
const dotenv = require("dotenv");
const express = require("express");
const authRoutes = require("./routes/auth");
const linkRoutes = require("./routes/link");
const errorHandler = require("./middleware/errorHanlder");
const connectDB = require("./config/db");
const cookieParser = require("cookie-parser");

dotenv.config();
connectDB();

//initiating express
const app = express();

//Middleware
app.use(cors());
app.use(express.json());
app.use(cookieParser());

// routes
app.use("/", (req, res) => {
  res.send("App is running...");
})

app.use("/api/auth", authRoutes);
app.use("/api/links", linkRoutes);

const HOST = process.env.HOST || "localhost";
const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
  console.log(`Backend Server is running at http://${HOST}:${PORT}`);
});
