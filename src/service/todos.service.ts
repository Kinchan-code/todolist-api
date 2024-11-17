import { TodoList } from "../models/todolist.model";
import CustomError from "../utils/helper";

// Todo Data Interface based on the TodoList model
interface TodoData {
  item: string;
  completed?: boolean;
  priority?: string;
}

// Search Params Interface
interface SearchParams {
  item?: string;
  completed?: boolean;
  priority?: string;
}

// Validate Todo Data
function validateTodoData(todoData: TodoData) {
  if (!todoData.item || typeof todoData.item !== "string") {
    throw new CustomError(
      400,
      "Invalid item. Item is required and must be a string"
    );
  } // Check if item is a string

  if (
    todoData.completed !== undefined &&
    typeof todoData.completed !== "boolean"
  ) {
    throw new CustomError(
      400,
      "Invalid completed. Completed must be a boolean"
    );
  } // Check if completed is a boolean

  if (
    todoData.priority !== undefined &&
    !["low", "medium", "high"].includes(todoData.priority)
  ) {
    throw new CustomError(
      400,
      "Invalid priority. Must be low, medium, or high"
    );
  } // Check if priority is valid
}

// Get All Todos
export const getAllTodos = async (
  userId: string, // User ID
  searchParams: SearchParams, // Search parameters
  page: number = 1, // Default page is 1
  limit: number = 10 // Default limit is 10
) => {
  const query: any = { user: userId };
  if (searchParams.item) {
    query.item = { $regex: searchParams.item, $options: "i" }; // Case-insensitive search for item
  }
  if (searchParams.completed !== undefined) {
    query.completed = searchParams.completed; // Search for completed todos
  }
  if (searchParams.priority) {
    query.priority = searchParams.priority; // Search for todos with a specific priority
  }

  const skip = (page - 1) * limit; // Calculate skip value

  const todos = await TodoList.find(query)
    .populate("user", "name email _id") // Populate user details
    .skip(skip) // Skip the number of todos based on the page
    .limit(limit); // Limit the number of todos per page

  const total = await TodoList.countDocuments(query); // Total number of todos

  const totalPages = Math.ceil(total / limit); // Total number of pages

  return { todos, total, page, totalPages }; // Return the todos, total, page, and total pages
};

// Get Single Todo
export const getSingleTodo = async (id: string) => {
  return await TodoList.findById(id).populate("user", "name email _id"); // Populate user details
};

// Create Todo
export const createTodo = async (userId: string, todoData: TodoData) => {
  validateTodoData(todoData); // Validate the todo data

  const todo = new TodoList({
    user: userId, // Associate the todo with the userId
    item: todoData.item, // Item
    completed: todoData.completed || false, // Completed
    priority: todoData.priority || "low", // Priority
  });
  return await todo.save(); // Save the todo
};

// Update Todo
export const updateTodo = async (
  userId: string, // User ID
  id: string, // Todo ID
  todoData: TodoData // Todo data
) => {
  validateTodoData(todoData); // Validate the todo data

  const updateTodo = await TodoList.findOneAndUpdate(
    {
      _id: id, // Todo ID
      user: userId, // User ID
    },
    { $set: todoData }, // Set the todo data
    { new: true } // Return the updated todo
  );

  if (!updateTodo) {
    throw new CustomError(
      404,
      "Todo not found or you do not have permission to update this todo"
    );
  } // Check if the todo was found and updated

  return updateTodo; // Return the updated todo
};

// Delete Todo
export const deleteTodo = async (userId: string, id: string) => {
  const existingTodo = await TodoList.findByIdAndDelete({
    _id: id, // Todo ID
    user: userId, // User ID
  }); // Find the todo by ID and user ID

  if (!existingTodo) {
    throw new CustomError(404, "Todo not found");
  } // Check if the todo was found and deleted

  return existingTodo; // Return the deleted todo
};
