const express = require("express");
const router = express.Router();
const {
  getAllTodos,
  getSingleTodo,
  createTodo,
  updateTodo,
  deleteTodo,
} = require("../controllers/todos.controller");

// Get all todos
router.get("/todos", getAllTodos);

// Get a single todo
router.get("/todos/:id", getSingleTodo);

// Create a todo
router.post("/add-todo", createTodo);

// Update a todo
router.put("/update-todo/:id", updateTodo);

// Delete a todo
router.delete("/delete-todo/:id", deleteTodo);

module.exports = router;
