const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const todoRoutes = require("./routes/todo.route");
const connectDB = require("./config/database");
require("dotenv").config();

// Middleware
const app = express();
app.use(bodyParser.json());

// Routes
app.use("/api", todoRoutes);
app.get("/", (req, res) => {
  res.send("Hello from the other side hehe API");
});

connectDB().then(() => {
  const port = process.env.PORT || 3000;
  app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });
});
