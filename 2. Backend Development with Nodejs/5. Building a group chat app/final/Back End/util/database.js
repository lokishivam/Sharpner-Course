const Sequelize = require('sequelize');
const sequelize = new Sequelize("group-chat", "root", "johncena48", {
    dialect: "mysql", //sequelize is also used for many other databases, so we specify
    host: "localhost",
  });

module.exports = sequelize;