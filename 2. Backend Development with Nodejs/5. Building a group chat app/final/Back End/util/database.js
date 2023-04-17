require("dotenv").config();

const Sequelize = require('sequelize');
const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USERNAME, process.env.DB_PASSWORD, {
    dialect: "mysql", //sequelize is also used for many other databases, so we specify
    host: process.env.DB_HOST,
  });

module.exports = sequelize;