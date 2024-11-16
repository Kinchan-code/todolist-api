import express from "express";
import { Router } from "express";
import { verifyToken } from "../middleware/verifyToken";
import {
  getAllTodosController,
  getSingleTodoController,
  createTodoController,
  updateTodoController,
  deleteTodoController,
} from "../controllers/todos.controller";

const router: Router = express.Router();

// Get all todos
router.get("/todos", verifyToken, getAllTodosController);

// Get a single todo
router.get("/todo/:id", verifyToken, getSingleTodoController);

// Create a todo
router.post("/add-todo", verifyToken, createTodoController);

// Update a todo
router.put("/update-todo/:id", verifyToken, updateTodoController);

// Delete a todo
router.delete("/delete-todo/:id", verifyToken, deleteTodoController);

export default router;
