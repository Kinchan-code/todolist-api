import { ControllerType } from "../types/types";
import {
  getAllTodos,
  getSingleTodo,
  createTodo,
  updateTodo,
  deleteTodo,
} from "../service/todos.service";
import CustomError from "../utils/helper";

export const getAllTodosController: ControllerType = async (req, res, next) => {
  try {
    const searchQuery = req.query.search || "";
    const todo = await getAllTodos(searchQuery as string);
    res.status(200).json({ status: "success", data: todo });
  } catch (error) {
    next(new CustomError(500, (error as Error).message));
  }
};

export const getSingleTodoController: ControllerType = async (
  req,
  res,
  next
) => {
  try {
    const todo = await getSingleTodo(req.params.id);
    res.status(200).json({ status: "success", data: todo });
  } catch (error) {
    next(new CustomError(500, (error as Error).message));
  }
};

export const createTodoController: ControllerType = async (req, res, next) => {
  try {
    const todo = await createTodo(req.body);
    res.status(200).json({ status: "success", data: todo });
  } catch (error) {
    next(new CustomError(500, (error as Error).message));
  }
};

export const updateTodoController: ControllerType = async (req, res, next) => {
  try {
    const todo = await updateTodo(req.params.id, req.body);
    res.status(200).json({ status: "success", data: todo });
  } catch (error) {
    next(new CustomError(500, (error as Error).message));
  }
};

export const deleteTodoController: ControllerType = async (req, res, next) => {
  try {
    const todo = await deleteTodo(req.params.id);
    res
      .status(200)
      .json({ status: "success", message: "Todo deleted successfully" });
  } catch (error) {
    next(new CustomError(500, (error as Error).message));
  }
};
