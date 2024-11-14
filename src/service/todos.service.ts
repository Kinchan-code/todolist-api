import TodoList from "../models/todolist.model";
import CustomError from "../utils/helper";

const getAllTodos = async (searchQuery: string) => {
  const todo = searchQuery
    ? { item: { $regex: searchQuery, $options: "i" } }
    : {};
  return await TodoList.find(todo);
};

const getSingleTodo = async (id: string) => {
  return await TodoList.findById(id);
};

const createTodo = async (todo: typeof TodoList) => {
  return await TodoList.create(todo);
};

const updateTodo = async (id: string, todo: typeof TodoList) => {
  const existingTodo = await TodoList.findById(id);

  if (!existingTodo) {
    throw new CustomError(404, "Todo not found");
  }

  return await TodoList.findByIdAndUpdate(id, todo, {
    new: true,
  });
};

const deleteTodo = async (id: string) => {
  const existingTodo = await TodoList.findById(id);

  if (!existingTodo) {
    throw new CustomError(404, "Todo not found");
  }

  return await TodoList.findByIdAndDelete(id);
};

module.exports = {
  getAllTodos,
  getSingleTodo,
  createTodo,
  updateTodo,
  deleteTodo,
};
