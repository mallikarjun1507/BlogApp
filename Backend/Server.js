const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
require("dotenv").config();

const db = require("./config/db");

// Route Imports
const postRoutes = require("./routes/postRoutes");
const createUserRoute = require("./routes/createRoute");
const loginUserRoute = require("./routes/login");

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Test DB Connection
db.connect((err) => {
  if (err) {
    console.error(" Database connection failed:", err.stack);
    return;
  }
  console.log(" Connected to database as ID", db.threadId);
});

// API Routes
app.use("/api/posts", postRoutes);               
app.use("/api/users/create", createUserRoute);   
app.use("/api/users/login", loginUserRoute);     

//  Root route
app.get("/", (req, res) => {
  res.send("Welcome to BlogApp API");
});

//  Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(` Server running on port ${PORT}`));
