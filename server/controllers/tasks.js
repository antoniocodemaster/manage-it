const { response } = require("express");
const Task = require("../models/Task");

const getTasks = async (req, res = response) => {
  const DEFAULT_TASKS_LIMIT = 10;

  const { limit = DEFAULT_TASKS_LIMIT, offset = 0 } = req.query;

  try {
    const tasks = await Task.find().skip(+offset).limit(+limit);

    res.json({ ok: true, tasks });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "Internal server error" });
  }
};

const addNewTask = async (req, res = response) => {
  const { name } = req.body;

  try {
    const newTask = new Task({ name });

    await newTask.save();

    res.status(201).json({ ok: true, createdTask: newTask });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "Internal server error" });
  }
};

const updateTask = async (req, res = response) => {
  const { id } = req.params;

  try {
    const taskDB = await Task.findById(id);

    if (!taskDB) return res.status(400).json({ msg: "Invalid task" });

    const updatedTask = await Task.findByIdAndUpdate(id, req.body, {
      new: true,
    });

    res.json({ ok: true, updatedTask });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ msg: "Internal server error" });
  }
};

const deleteTask = async (req, res = response) => {
  const { id } = req.params;

  try {
    const taskDB = await Task.findById(id);

    if (!taskDB) return res.status(400).json({ msg: "Invalid task" });

    const deletedTask = await Task.findByIdAndDelete(id);

    res.json({ ok: true, deletedTask });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "Internal server error" });
  }
};

module.exports = { getTasks, addNewTask, updateTask, deleteTask };
