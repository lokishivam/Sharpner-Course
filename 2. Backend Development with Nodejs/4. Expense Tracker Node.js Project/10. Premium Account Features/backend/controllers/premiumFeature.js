const Expense = require("../models/expense");
const User = require("../models/user");

exports.getLeadership = async (req, res) => {
  try {
    const expenses = await Expense.findAll();
    const users = await User.findAll();

    const userMap = new Map();
    for (let user of users) {
      const id = user.id;
      userMap.set(id, user);
    }

    const map = new Map();
    for (let expense of expenses) {
      const userId = expense.userId;
      if (map.has(userId)) {
        map.set(userId, map.get(userId) + expense.amount);
      } else {
        map.set(userId, expense.amount);
      }
    }

    const expArr = [];
    for (let key of map.keys()) {
      expArr.push({
        //userId: key,
        total: map.get(key),
        name: userMap.get(key).name,
      });
    }

    expArr.sort((a, b) => a.total - b.total);

    res.status(200).json(expArr);
  } catch (error) {
    res.status(401).json(error);
  }
};
