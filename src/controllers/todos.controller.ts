import { ControllerType } from "../types/types";
import {
  getAllTodos,
  getSingleTodo,
  createTodo,
  updateTodo,
  deleteTodo,
} from "../service/todos.service";
import CustomError from "../utils/helper";

interface CustomRequest extends Request {
  userId?: string;
}

interface SearchParams {
  item?: string;
  completed?: boolean;
  priority?: string;
}

export const getAllTodosController: ControllerType = async (req, res, next) => {
  try {
    const userId = (req as unknown as CustomRequest).userId;
    if (!userId) {
      res
        .status(401)
        .json({ status: "failed", message: "Unauthorized - userId not found" });
      return;
    }
    const searchParams: SearchParams = {
      item: req.query.item as string,
      completed: req.query.completed === "true",
      priority: req.query.priority as string,
    };
    const todo = await getAllTodos(userId as string, searchParams);
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
    if (!todo) {
      res.status(404).json({ status: "failed", message: "Todo not found" });
      return;
    }
    res.status(200).json({ status: "success", data: todo });
  } catch (error) {
    next(new CustomError(500, (error as Error).message));
  }
};

export const createTodoController: ControllerType = async (req, res, next) => {
  try {
    const userId = (req as unknown as CustomRequest).userId;
    if (!userId) {
      res.status(401).json({ status: "failed", message: "Unauthorized" });
      return;
    }
    const todo = await createTodo(userId as string, req.body);
    res.status(200).json({ status: "success", data: todo });
  } catch (error) {
    next(new CustomError(500, (error as Error).message));
  }
};

export const updateTodoController: ControllerType = async (req, res, next) => {
  try {
    const userId = (req as unknown as CustomRequest).userId;
    if (!userId) {
      res
        .status(401)
        .json({ status: "failed", message: "Unauthorized - userId not found" });
      return;
    }
    const todo = await updateTodo(userId as string, req.params.id, req.body);
    res.status(200).json({ status: "success", data: todo });
  } catch (error) {
    next(new CustomError(500, (error as Error).message));
  }
};

export const deleteTodoController: ControllerType = async (req, res, next) => {
  try {
    const userId = (req as unknown as CustomRequest).userId;
    if (!userId) {
      res
        .status(401)
        .json({ status: "failed", message: "Unauthorized - userId not found" });
      return;
    }
    const todo = await deleteTodo(userId as string, req.params.id);
    res.status(200).json({
      status: "success",
      message: "Todo deleted successfully",
      data: todo,
    });
  } catch (error) {
    next(new CustomError(500, (error as Error).message));
  }
};
