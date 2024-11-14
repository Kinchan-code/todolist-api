import express from "express";
import bodyParser from "body-parser";
import todoRoutes from "./routes/todo.route";
import connectDB from "./config/database";
import { Request, Response } from "express";
require("dotenv").config();

// Middleware
const app = express();
app.use(bodyParser.json());

// Routes
app.use("/api", todoRoutes);
app.get("/", (req: Request, res: Response) => {
  res.send("Hello from the other side hehe API");
});

connectDB().then(() => {
  const port = process.env.PORT || 3000;
  app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });
});
