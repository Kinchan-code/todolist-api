import express from "express";
import { Router } from "express";
import {
  signupController,
  loginController,
  logoutController,
} from "../controllers/auth.controller";

const router: Router = express.Router();

// Signup
router.post("/signup", signupController);

// Login
router.post("/login", loginController);

// Logout
router.post("/logout", logoutController);

export default router;
