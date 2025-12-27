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
app.use(cors({
  origin: "http://localhost:3000",
  credentials: true,
}));
app.use(express.json());
app.use(cookieParser());

app.use("/api/auth", authRoutes);
app.use("/api/links", linkRoutes);

app.get("/", (req, res) => {
  res.send("App is running...");
})

const HOST = process.env.HOST || "localhost";
const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
  console.log(`Backend Server is running at http://${HOST}:${PORT}`);
});
