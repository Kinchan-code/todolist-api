import { Request, Response, NextFunction } from "express";

const {
  getAllTodos,
  getSingleTodo,
  createTodo,
  updateTodo,
  deleteTodo,
} = require("../service/todos.service.ts");
const CustomError = require("../utils/helper");

type ControllerType = (
  req: Request,
  res: Response,
  next: NextFunction
) => Promise<void>;

const getAllTodosController: ControllerType = async (req, res, next) => {
  try {
    const searchQuery = req.query.search || "";
    const todo = await getAllTodos(searchQuery);
    res.status(200).json(todo);
  } catch (error) {
    next(new CustomError(500, (error as Error).message));
  }
};

const getSingleTodoController: ControllerType = async (req, res, next) => {
  try {
    const todo = await getSingleTodo(req.params.id);
    res.status(200).json(todo);
  } catch (error) {
    next(new CustomError(500, (error as Error).message));
  }
};

const createTodoController: ControllerType = async (req, res, next) => {
  try {
    const todo = await createTodo(req.body);
    res.status(200).json(todo);
  } catch (error) {
    next(new CustomError(500, (error as Error).message));
  }
};

const updateTodoController: ControllerType = async (req, res, next) => {
  try {
    const todo = await updateTodo(req.params.id, req.body);
    res.status(200).json(todo);
  } catch (error) {
    next(new CustomError(500, (error as Error).message));
  }
};

const deleteTodoController: ControllerType = async (req, res, next) => {
  try {
    const todo = await deleteTodo(req.params.id);
    res.status(200).json({ message: "Todo deleted successfully" });
  } catch (error) {
    next(new CustomError(500, (error as Error).message));
  }
};

export {
  getAllTodosController,
  getSingleTodoController,
  createTodoController,
  updateTodoController,
  deleteTodoController,
};
