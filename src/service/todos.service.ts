import { TodoList } from "../models/todolist.model";
import CustomError from "../utils/helper";

export const getAllTodos = async (searchQuery: string) => {
  const todo = searchQuery
    ? { item: { $regex: searchQuery, $options: "i" } }
    : {};
  return await TodoList.find(todo);
};

export const getSingleTodo = async (id: string) => {
  return await TodoList.findById(id);
};

export const createTodo = async (todo: typeof TodoList) => {
  return await TodoList.create(todo);
};

export const updateTodo = async (id: string, todo: typeof TodoList) => {
  const existingTodo = await TodoList.findById(id);

  if (!existingTodo) {
    throw new CustomError(404, "Todo not found");
  }

  return await TodoList.findByIdAndUpdate(id, todo, {
    new: true,
  });
};

export const deleteTodo = async (id: string) => {
  const existingTodo = await TodoList.findById(id);

  if (!existingTodo) {
    throw new CustomError(404, "Todo not found");
  }

  return await TodoList.findByIdAndDelete(id);
};
