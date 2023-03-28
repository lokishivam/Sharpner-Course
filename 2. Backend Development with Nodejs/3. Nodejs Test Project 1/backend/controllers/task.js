const Task = require("../models/task");

exports.postAddTask = async (req, res) => {
  try {
    const taskObj = req.body;
    console.log(taskObj);
    const resultTask = await Task.create({
      task: taskObj.task === "" ? null : taskObj.task,
      details: taskObj.details === "" ? null : taskObj.details,
      status: false,
    });
    res.json(resultTask);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};

exports.getTasks = async (req, res) => {
  try {
    const tasks = await Task.findAll();
    res.status(200).json(tasks);
  } catch (error) {
    res.status(500).json(error);
  }
};

exports.deleteTask = async (req, res) => {
  try {
    const id = req.params.taskId;
    const task = await Task.findByPk(id);
    task.destroy();
    res.status(200).json();
  } catch (error) {
    res.status(500).json(error); //internal server error
  }
};

exports.updateTask = async (req, res) => {
  try {
    const id = req.params.taskId;
    const task = await Task.findByPk(id);
    task.status = true;
    task.save();
    res.status(200).json();
  } catch (error) {
    res.status(500).json(error);
  }
};
