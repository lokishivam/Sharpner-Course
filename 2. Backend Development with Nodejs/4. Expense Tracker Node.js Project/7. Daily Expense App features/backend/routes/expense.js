const express = require("express");

const router = express.Router();

const expenseControllers = require("../controllers/expense");

router.post("/add-expense", expenseControllers.postAddExpense);

router.get("/get-expenses", expenseControllers.getExpenses);

router.delete("/delete/:expenseId", expenseControllers.deleteExpense);

module.exports = router;
