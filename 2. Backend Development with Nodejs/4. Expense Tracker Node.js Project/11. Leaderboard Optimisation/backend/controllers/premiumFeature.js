const Expense = require("../models/expense");
const User = require("../models/user");
const sequelize = require("../util/database");

exports.getLeadership = async (req, res) => {
  try {
    const expenses = await Expense.findAll();
    const users = await User.findAll();

    const expArr = await User.findAll({
      attributes: [
        "id",
        "name",
        [
          sequelize.fn("sum", sequelize.col("expenses.amount")), //tableName.col
          "total",
        ],
      ],
      include: [
        {
          model: Expense,
          attributes: [],
        },
      ],
      group: ["User.id"],
      order: [["total", "DESC"]],
    });

    res.status(200).json(expArr);
  } catch (error) {
    res.status(401).json(error);
  }
};
