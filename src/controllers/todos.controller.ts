import { ControllerType } from "../types/types";
import {
  getAllTodos,
  getSingleTodo,
  createTodo,
  updateTodo,
  deleteTodo,
} from "../service/todos.service";
import CustomError from "../utils/helper";

// Custom request interface
interface CustomRequest extends Request {
  userId?: string;
}

// Search params interface
interface SearchParams {
  item?: string;
  completed?: boolean;
  priority?: string;
}

// Get all todos controller
export const getAllTodosController: ControllerType = async (req, res, next) => {
  try {
    const userId = (req as unknown as CustomRequest).userId; // Get the user ID from the request
    if (!userId) {
      res
        .status(401)
        .json({ status: "failed", message: "Unauthorized - userId not found" });
      return;
    } // Return an error if the user ID is not found

    const searchParams: SearchParams = {
      item: req.query.item as string, // Get the item from the request
      completed: req.query.completed === "true", // Get the completed status from the request
      priority: req.query.priority as string, // Get the priority from the request
    }; // Get the search parameters from the request

    const page = parseInt(req.query.page as string) || 1; // Get the page number from the request
    const limit = parseInt(req.query.limit as string) || 10; // Get the limit from the request

    const { todos, total, totalPages } = await getAllTodos(
      userId as string,
      searchParams,
      page,
      limit
    ); // Get all todos and meta data
    res.status(200).json({
      status: "success",
      total,
      data: todos,
      page,
      limit,
      totalPages,
    }); // Return the todos and meta data
  } catch (error) {
    next(new CustomError(500, (error as Error).message)); // Return an error if there is an error
  }
};

// Get single todo controller
export const getSingleTodoController: ControllerType = async (
  req,
  res,
  next
) => {
  try {
    const todo = await getSingleTodo(req.params.id); // Get a single todo
    if (!todo) {
      res.status(404).json({ status: "failed", message: "Todo not found" }); // Return an error if the todo is not found
      return;
    }
    res.status(200).json({ status: "success", data: todo }); // Return the todo
  } catch (error) {
    next(new CustomError(500, (error as Error).message)); // Return an error if there is an error
  }
};

// Create todo controller
export const createTodoController: ControllerType = async (req, res, next) => {
  try {
    const userId = (req as unknown as CustomRequest).userId; //
    if (!userId) {
      res.status(401).json({ status: "failed", message: "Unauthorized" }); // Return an error if the user ID is not found
      return;
    }
    const todo = await createTodo(userId as string, req.body); // Create a todo
    res.status(201).json({ status: "success", data: todo }); // Return the todo
  } catch (error) {
    next(new CustomError(500, (error as Error).message)); // Return an error if there is an error
  }
};

// Update todo controller
export const updateTodoController: ControllerType = async (req, res, next) => {
  try {
    const userId = (req as unknown as CustomRequest).userId; // Get the user ID from the request
    if (!userId) {
      res
        .status(401)
        .json({ status: "failed", message: "Unauthorized - userId not found" }); // Return an error if the user ID is not found
      return;
    }
    const todo = await updateTodo(userId as string, req.params.id, req.body); // Update a todo
    res.status(200).json({ status: "success", data: todo }); // Return the todo
  } catch (error) {
    next(new CustomError(500, (error as Error).message)); // Return an error if there is an error
  }
};

// Delete todo controller
export const deleteTodoController: ControllerType = async (req, res, next) => {
  try {
    const userId = (req as unknown as CustomRequest).userId; // Get the user ID from the request
    if (!userId) {
      res
        .status(401)
        .json({ status: "failed", message: "Unauthorized - userId not found" }); // Return an error if the user ID is not found
      return;
    }
    const todo = await deleteTodo(userId as string, req.params.id); // Delete a todo
    res.status(200).json({
      status: "success",
      message: "Todo deleted successfully",
      data: todo,
    }); // Return the todo
  } catch (error) {
    next(new CustomError(500, (error as Error).message)); // Return an error if there is an error
  }
};
