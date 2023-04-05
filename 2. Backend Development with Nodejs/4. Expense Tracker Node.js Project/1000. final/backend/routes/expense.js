const express = require("express");

const router = express.Router();

const expenseControllers = require("../controllers/expense");
const authenticationMiddleware = require("../middlewares/authentication");

router.post(
  "/add-expense",
  authenticationMiddleware.authenticateUser,
  expenseControllers.postAddExpense
);

router.get(
  "/get-expenses",
  authenticationMiddleware.authenticateUser,
  expenseControllers.getExpenses
);

router.delete(
  "/delete/:expenseId",
  authenticationMiddleware.authenticateUser,
  expenseControllers.deleteExpense
);

router.get(
  "/download",
  authenticationMiddleware.authenticateUser,
  expenseControllers.downloadExpenses
);

module.exports = router;
