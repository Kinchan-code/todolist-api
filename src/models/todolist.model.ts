import mongoose from "mongoose";

// Todo list schema
export const TodoListSchema = new mongoose.Schema(
  {
    // User field with reference to the User model
    user: {
      type: mongoose.Schema.Types.ObjectId, // This is the type of the user field
      ref: "User", // This is the reference to the User model
      required: [true, "Please add a user"], // This is a required field
    },
    // Item field with validation
    item: {
      type: String, // This is the type of the item field
      required: [true, "Please add a task"], // This is a required field
    },
    // Completed field with validation and default value
    completed: {
      type: Boolean, // This is the type of the completed field
      required: [true, "Please add a completed status"], // This is a required field
      default: false, // This is the default value
    },
    // Priority field with validation and default value
    priority: {
      type: String, // This is the type of the priority field
      required: [true, "Please add a priority"], // This is a required field
      enum: ["low", "medium", "high"], // This specifies a list of allowed values for the priority field
      default: "low", // This is the default value
    },
  },
  { timestamps: true } // This adds createdAt and updatedAt fields
);

export const TodoList = mongoose.model("TodoList", TodoListSchema);
