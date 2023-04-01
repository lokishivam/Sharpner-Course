const Expense = require("../models/expense");
const sequelize = require("../util/database");

exports.postAddExpense = async (req, res) => {
  let transaction = await sequelize.transaction(); //returns a promise that resolves into transaction object
  try {
    const user = req.user;
    const { amount, description, category } = req.body;

    const expense = await user.createExpense(
      {
        amount: amount === "" ? null : amount,
        description: description === "" ? null : description,
        category: category === "" ? null : category,
      },
      { transaction }
    );

    await user.update(
      {
        totalexpense: user.totalexpense
          ? parseInt(user.totalexpense) + parseInt(amount)
          : amount,
      },
      { transaction }
    );
    transaction.commit(); //all the operations are at success. make the changes final
    res.json(expense);
  } catch (error) {
    transaction.rollback();
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
  let transaction = await sequelize.transaction();
  try {
    const user = req.user;
    const id = req.params.expenseId;
    const expense = await Expense.findByPk(id);
    const amount = expense.amount;
    await expense.destroy({ transaction });
    await user.update(
      {
        totalexpense: parseInt(user.totalexpense) - parseInt(amount),
      },
      { transaction }
    );
    transaction.commit();
    res.status(200).json();
  } catch (error) {
    transaction.rollback();

    res.status(500).json({ err: "server problem while deleting" }); //internal server error
  }
};
