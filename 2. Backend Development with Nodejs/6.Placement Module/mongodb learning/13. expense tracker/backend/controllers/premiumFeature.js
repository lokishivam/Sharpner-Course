const Expense = require("../models/expense");
const User = require("../models/user");
// const sequelize = require("../util/database");

exports.getLeadership = async (req, res) => {
  try {
    const expArr = await User.find()
      .sort({ totalexpense: -1 })
      .select("_id name totalexpense");

    res.status(200).json(expArr);
  } catch (error) {
    console.log(error);
    res.status(401).json(error);
  }
};
