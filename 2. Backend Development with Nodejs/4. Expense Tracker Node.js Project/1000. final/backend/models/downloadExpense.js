const Sequelize = require("sequelize");
const sequelize = require("../util/database");

const DownloadExpense = sequelize.define("downloadExpense", {
  id: {
    type: Sequelize.INTEGER, //we no longer are using sql code
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  link: {
    type: Sequelize.STRING,
  },

  name: Sequelize.STRING,
});

module.exports = DownloadExpense;
