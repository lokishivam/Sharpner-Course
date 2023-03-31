//Sequelize is a class
const Sequelize = require("sequelize");

//sequelize object will used to create connections and manage
const sequelize = new Sequelize("expense-app-sharpner", "root", "johncena48", {
  dialect: "mysql", //sequelize is also used for many other databases, so we specify
  host: "localhost",
});

module.exports = sequelize;
