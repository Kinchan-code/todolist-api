import express from "express";
import { Router } from "express";
import {
  getAllTodosController,
  getSingleTodoController,
  createTodoController,
  updateTodoController,
  deleteTodoController,
} from "../controllers/todos.controller";

const router: Router = express.Router();

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

export default router;
