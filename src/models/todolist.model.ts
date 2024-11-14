import mongoose from "mongoose";

const TodoListSchema = new mongoose.Schema(
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

const TodoList = mongoose.model("TodoList", TodoListSchema);

export default TodoList;
