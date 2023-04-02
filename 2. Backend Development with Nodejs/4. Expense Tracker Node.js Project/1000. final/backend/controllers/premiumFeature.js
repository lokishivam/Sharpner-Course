const Expense = require("../models/expense");
const User = require("../models/user");
const sequelize = require("../util/database");

exports.getLeadership = async (req, res) => {
  try {
    const expArr = await User.findAll({
      attributes: ["id", "name", "totalexpense"],
      order: [["totalexpense", "DESC"]],
    });

    res.status(200).json(expArr);
  } catch (error) {
    res.status(401).json(error);
  }
};
