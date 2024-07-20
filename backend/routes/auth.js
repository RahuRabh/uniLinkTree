const express = require("express");
const router = express.Router();
const authController = require("../controllers/auth");

//Routes for registration
router.post("/register", authController.registerUser);
//Routes for login
router.post("/login", authController.loginUser);

module.exports = router;

// "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2Njk2MTNkYWY3ODM0OWI3OGFlMDVhZmIiLCJpYXQiOjE3MjExMjYyODR9.ibPE3bcosXpmjE5N5r1L5lTRs7pLAIhBxQfRyZCyOJI",
//     "userId": "669613daf78349b78ae05afb"