const TodoList = require("../models/todolist.model");

const getAllTodos = async (req, res) => {
  try {
    const searchQuery = req.query.search || "";
    const todo = searchQuery
      ? await TodoList.find({ item: { $regex: searchQuery, $options: "i" } })
      : await TodoList.find();
    res.status(200).json(todo);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getSingleTodo = async (req, res) => {
  try {
    const todo = await TodoList.findById(req.params.id);
    res.status(200).json(todo);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const createTodo = async (req, res) => {
  try {
    const todo = await TodoList.create(req.body);
    res.status(200).json(todo);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateTodo = async (req, res) => {
  try {
    const todo = await TodoList.findByIdAndUpdate(req.params.id, req.body);

    if (!todo) {
      res.status(404).json({ message: "Todo not found" });
    }

    const updatedTodo = await TodoList.findById(req.params.id);
    res.status(200).json(updatedTodo);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deleteTodo = async (req, res) => {
  try {
    const todo = await TodoList.findByIdAndDelete(req.params.id);

    if (!todo) {
      res.status(404).json({ message: "Todo not found" });
    }
    res.status(200).json({ message: "Todo deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getAllTodos,
  getSingleTodo,
  createTodo,
  updateTodo,
  deleteTodo,
};
