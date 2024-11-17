import mongoose from "mongoose"; // Import mongoose for MongoDB interaction

// Define the user schema
const userSchema = new mongoose.Schema(
  {
    // Email field with validation
    email: {
      type: String, // This is the type of the email field
      required: true, // This is a required field
      unique: true, // This is a unique field
      match: /.+@.+\..+/, // This is a regular expression to match a valid email format
    },
    // Password field with validation
    password: {
      type: String, // Data type is String
      required: true, // This is a required field
      minlength: 8, // This is the minimum length of the password field
    },
    // Name field
    name: {
      type: String, // This is the type of the name field
      required: true, // This is a required field
    },
    // Last login date with default value
    lastLogin: {
      type: Date, // This is the type of the last login field
      default: Date.now, // This is the default value of the last login field
    },
    // Verification status with default value
    isVerified: {
      type: Boolean, // This is the type of the is verified field
      default: false, // This is the default value of the is verified field
    },
    // Reset password token
    resetPasswordToken: String, // This is the type of the reset password token field
    // Reset password token expiration date
    resetPasswordTokenExpiresAt: Date, // This is the type of the reset password token expiration date field
    verificationToken: String, // This is the type of the verification token field
    // Verification token expiration date
    verificationTokenExpiresAt: Date, // This is the type of the verification token expiration date field
  },
  {
    timestamps: true, // This adds createdAt and updatedAt fields to the schema
  }
);

export const User = mongoose.model("User", userSchema);
