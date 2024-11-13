const mongoose = require("mongoose");

const TodoListSchema = mongoose.Schema(
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

module.exports = TodoList;
