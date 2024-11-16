import { TodoList } from "../models/todolist.model";
import CustomError from "../utils/helper";

// Todo Data Interface based on the TodoList model
interface TodoData {
  item: string;
  completed?: boolean;
  priority?: string;
}

interface SearchParams {
  item?: string;
  completed?: boolean;
  priority?: string;
}

export const getAllTodos = async (
  userId: string,
  searchParams: SearchParams
) => {
  const query: any = { user: userId };
  if (searchParams.item) {
    query.item = { $regex: searchParams.item, $options: "i" };
  }
  if (searchParams.completed !== undefined) {
    query.completed = searchParams.completed;
  }
  if (searchParams.priority) {
    query.priority = searchParams.priority;
  }

  return await TodoList.find(query).populate("user", "name email _id");
};

export const getSingleTodo = async (id: string) => {
  return await TodoList.findById(id).populate("user", "name email _id");
};

export const createTodo = async (userId: string, todoData: TodoData) => {
  const todo = new TodoList({
    user: userId, // Associate the todo with the userId
    item: todoData.item,
    completed: todoData.completed || false,
    priority: todoData.priority || "low",
  });
  return await todo.save();
};
export const updateTodo = async (
  userId: string,
  id: string,
  todoData: TodoData
) => {
  const existingTodo = await TodoList.findOne({
    _id: id,
    user: userId,
  });

  if (!existingTodo) {
    throw new CustomError(
      404,
      "Todo not found or you do not have permission to update this todo"
    );
  }

  existingTodo.item = todoData.item ?? existingTodo.item;
  existingTodo.completed = todoData.completed ?? existingTodo.completed;

  return await existingTodo.save();
};

export const deleteTodo = async (userId: string, id: string) => {
  const existingTodo = await TodoList.findByIdAndDelete({
    _id: id,
    user: userId,
  });

  if (!existingTodo) {
    throw new CustomError(404, "Todo not found");
  }

  return existingTodo;
};
