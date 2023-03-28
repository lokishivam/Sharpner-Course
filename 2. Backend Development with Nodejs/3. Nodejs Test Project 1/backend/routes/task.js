const express = require("express");

const router = express.Router();

const taskControllers = require("../controllers/task");

router.post("/add-task", taskControllers.postAddTask);

router.get("/get-tasks", taskControllers.getTasks);

// router.post("/edit-product", taskControllers.postEditProduct);

router.delete("/delete/:taskId", taskControllers.deleteTask);

router.get("/update-task/:taskId", taskControllers.updateTask);

module.exports = router;
