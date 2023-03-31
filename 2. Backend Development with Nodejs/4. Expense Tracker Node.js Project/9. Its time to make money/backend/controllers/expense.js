const Expense = require("../models/expense");

exports.postAddExpense = async (req, res) => {
  try {
    const user = req.user;
    const { amount, description, category } = req.body;
    const expense = await user.createExpense({
      amount: amount === "" ? null : amount,
      description: description === "" ? null : description,
      category: category === "" ? null : category,
    });
    res.json(expense);
  } catch (error) {
    res.status(500).json(error);
  }
};

exports.getExpenses = async (req, res) => {
  try {
    const user = req.user;
    const expenses = await user.getExpenses();
    res.status(200).json(expenses);
  } catch (error) {
    res.status(500).json(error);
  }
};

exports.deleteExpense = async (req, res) => {
  try {
    const id = req.params.expenseId;
    const expense = await Expense.findByPk(id);
    await expense.destroy();
    res.status(200).json();
  } catch (error) {
    res.status(500).json(error); //internal server error
  }
};
