import express from "express";
import { Router } from "express";
import {
  signupController,
  loginController,
  logoutController,
  // verifyEmailController,
  // forgotPasswordController,
  // resetPasswordController,
  checkAuthController,
  changePasswordController,
} from "../controllers/auth.controller";
import { verifyToken } from "../middleware/verifyToken";

const router: Router = express.Router(); // Create a router

// Check authentication
router.get("/check-auth", verifyToken, checkAuthController);

// Signup
router.post("/signup", signupController);

// Login
router.post("/login", loginController);

// Logout
router.post("/logout", logoutController);

// Change Password
router.post("/change-password", verifyToken, changePasswordController);

// Verify Email
// router.post("/verify-email", verifyEmailController);

// Forgot Password
// router.post("/forgot-password", forgotPasswordController);

// Reset Password
// router.post("/reset-password/:token", resetPasswordController);

export default router;
