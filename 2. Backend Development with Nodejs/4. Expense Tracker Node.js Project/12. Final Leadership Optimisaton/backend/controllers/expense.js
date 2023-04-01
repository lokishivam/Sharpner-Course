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
    user.update({
      totalexpense: user.totalexpense
        ? parseInt(user.totalexpense) + parseInt(amount)
        : amount,
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
    const user = req.user;
    const id = req.params.expenseId;
    const expense = await Expense.findByPk(id);
    const amount = expense.amount;
    await expense.destroy();
    await user.update({
      totalexpense: parseInt(user.totalexpense) - parseInt(amount),
    });
    res.status(200).json();
  } catch (error) {
    res.status(500).json(error); //internal server error
  }
};
