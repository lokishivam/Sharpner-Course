const Sequelize = require("sequelize");

const sequelize = require("../util/database");
//sequelize not only contains the connection pool, But also other features of the sequelizqe package.

//we need to define a model i.e. table
const Task = sequelize.define("task", {
  //you can look for docs to know how to create a model
  id: {
    type: Sequelize.INTEGER, //we no longer are using sql code
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  task: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true,
  },
  details: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  status: {
    type: Sequelize.BOOLEAN,
    allowNull: false,
  },
});

module.exports = Task; //User model is exported
