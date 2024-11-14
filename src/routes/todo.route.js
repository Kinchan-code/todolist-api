const express = require("express");
const router = express.Router();
const {
  getAllTodosController,
  getSingleTodoController,
  createTodoController,
  updateTodoController,
  deleteTodoController,
} = require("../controllers/todos.controller");

// Get all todos
router.get("/todos", getAllTodosController);

// Get a single todo
router.get("/todos/:id", getSingleTodoController);

// Create a todo
router.post("/add-todo", createTodoController);

// Update a todo
router.put("/update-todo/:id", updateTodoController);

// Delete a todo
router.delete("/delete-todo/:id", deleteTodoController);

module.exports = router;
