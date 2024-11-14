import mongoose from "mongoose";

export const TodoListSchema = new mongoose.Schema(
  {
    item: {
      type: String,
      required: [true, "Please add a task"],
    },
    completed: {
      type: Boolean,
      required: [true, "Please add a completed status"],
      default: false,
    },
  },
  { timestamps: true }
);

export const TodoList = mongoose.model("TodoList", TodoListSchema);
