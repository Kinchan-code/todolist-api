const TodoList = require("../models/todolist.model");
const CustomError = require("../utils/helper");

const getAllTodos = async (searchQuery) => {
  const todo = searchQuery
    ? { item: { $regex: searchQuery, $options: "i" } }
    : {};
  return await TodoList.find(todo);
};

const getSingleTodo = async (id) => {
  return await TodoList.findById(id);
};

const createTodo = async (todo) => {
  return await TodoList.create(todo);
};

const updateTodo = async (id, todo) => {
  const existingTodo = await TodoList.findById(id);

  if (!existingTodo) {
    throw new CustomError(404, "Todo not found");
  }

  return await TodoList.findByIdAndUpdate(id, todo, { new: true });
};

const deleteTodo = async (id) => {
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
