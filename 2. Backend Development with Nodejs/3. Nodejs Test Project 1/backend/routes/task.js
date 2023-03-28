const express = require("express");

const router = express.Router();

const taskControllers = require("../controllers/task");

router.post("/add-task", taskControllers.postAddTask);

// router.get("/get-products", taskControllers.getProducts);

// router.post("/edit-product", taskControllers.postEditProduct);

// router.delete("/delete/:productId", taskControllers.deleteProduct);

// router.get("/get-product/:productId", taskControllers.getProduct);

module.exports = router;
