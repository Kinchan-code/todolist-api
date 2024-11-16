const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const todoRoutes = require("./routes/todo.route");
require("dotenv").config();

// Middleware
const app = express();
app.use(bodyParser.json());

// Routes
app.use("/api", todoRoutes);
app.get("/", (req, res) => {
  res.send("Hello from the other side hehe API");
});

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log("Connected to MongoDB!");
    const port = process.env.PORT || 3000;
    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  })
  .catch((err) => {
    console.log("Failed to connect to MongoDB", err);
  });
