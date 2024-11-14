import express from "express";
import bodyParser from "body-parser";
import todoRoutes from "./routes/todo.route";
import { connectDB } from "./config/database";
import { Request, Response, Application } from "express";
import path from "path";
require("dotenv").config();

// Middleware
const app: Application = express();
app.use(bodyParser.json());

// Routes
app.use("/api", todoRoutes);
app.get("/", (req: Request, res: Response) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

connectDB().then(() => {
  const port = process.env.PORT || 3000;
  app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });
});
