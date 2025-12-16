const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {});
    console.log("Connected to MongoDB Successfully");
  } catch (err) {
    console.log("MongoDB Connectetion error", err.message);
    process.exit(1);
  }
};

module.exports = connectDB;
