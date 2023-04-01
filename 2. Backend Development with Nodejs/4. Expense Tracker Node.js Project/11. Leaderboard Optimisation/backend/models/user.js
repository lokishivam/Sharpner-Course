const Sequelize = require("sequelize");

const sequelize = require("../util/database");
//sequelize not only contains the connection pool, But also other features of the sequelizqe package.

//we need to define a model i.e. table
const User = sequelize.define("user", {
  //you can look for docs to know how to create a model
  id: {
    type: Sequelize.INTEGER, //we no longer are using sql code
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  name: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  email: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true,
  },
  password: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  ispremiumuser: Sequelize.BOOLEAN,
});

module.exports = User; //User model is exported
