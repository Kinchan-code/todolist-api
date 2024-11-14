const {
  getAllTodos,
  getSingleTodo,
  createTodo,
  updateTodo,
  deleteTodo,
} = require("../service/todos.service");
const CustomError = require("../utils/helper");

const getAllTodosController = async (req, res, next) => {
  try {
    const searchQuery = req.query.search || "";
    const todo = await getAllTodos(searchQuery);
    res.status(200).json(todo);
  } catch (error) {
    next(new CustomError(500, error.message));
  }
};

const getSingleTodoController = async (req, res, next) => {
  try {
    const todo = await getSingleTodo(req.params.id);
    res.status(200).json(todo);
  } catch (error) {
    next(new CustomError(500, error.message));
  }
};

const createTodoController = async (req, res, next) => {
  try {
    const todo = await createTodo(req.body);
    res.status(200).json(todo);
  } catch (error) {
    next(new CustomError(500, error.message));
  }
};

const updateTodoController = async (req, res, next) => {
  try {
    const todo = await updateTodo(req.params.id, req.body);
    res.status(200).json(todo);
  } catch (error) {
    next(new CustomError(500, error.message));
  }
};

const deleteTodoController = async (req, res, next) => {
  try {
    const todo = await deleteTodo(req.params.id);
    res.status(200).json({ message: "Todo deleted successfully" });
  } catch (error) {
    next(new CustomError(500, error.message));
  }
};

module.exports = {
  getAllTodosController,
  getSingleTodoController,
  createTodoController,
  updateTodoController,
  deleteTodoController,
};
