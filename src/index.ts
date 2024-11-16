import express from "express";
import bodyParser from "body-parser";
import todoRoutes from "./routes/todo.route";
import authRoutes from "./routes/auth.routes";
import cookieParser from "cookie-parser";
import { connectDB } from "./config/database";
import { Request, Response, Application } from "express";

// Middleware
const app: Application = express();
app.use(bodyParser.json());
app.use(cookieParser());
// Routes
app.use("/api", todoRoutes);
app.use("/api/auth", authRoutes);
app.get("/", (req: Request, res: Response) => {
  res.send(`<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Welcome</title>
    <style>
      body {
        display: flex;
        justify-content: center;
        background-color: #121212;
        color: #fff;
        align-items: center;
        height: 100vh;
        margin: 0;
        font-family: Arial, sans-serif;
        font-weight: bold;
      }
    </style>
  </head>
  <body>
    <div>Welcome to the API!</div>
  </body>
</html>
`);
});

connectDB().then(() => {
  const port = process.env.PORT || 3000;
  app.listen(port, () => {
    console.log("Server is running on port", port);
  });
});
