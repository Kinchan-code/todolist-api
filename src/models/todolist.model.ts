import mongoose from "mongoose";

export const TodoListSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "Please add a user"],
    },
    item: {
      type: String,
      required: [true, "Please add a task"],
    },
    completed: {
      type: Boolean,
      required: [true, "Please add a completed status"],
      default: false,
    },
    priority: {
      type: String,
      required: [true, "Please add a priority"],
      enum: ["low", "medium", "high"],
      default: "low",
    },
  },
  { timestamps: true }
);

export const TodoList = mongoose.model("TodoList", TodoListSchema);
