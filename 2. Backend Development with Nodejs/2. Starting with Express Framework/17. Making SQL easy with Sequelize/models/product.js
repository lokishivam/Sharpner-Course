const Sequelize = require("sequelize");

const sequelize = require("../util/database");
//sequelize not only contains the connection pool, But also other features of the sequelizqe package.

//we need to define a model i.e. table
const Product = sequelize.define("product", {
  //you can look for docs to know how to create a model
  id: {
    type: Sequelize.INTEGER, //we no longer are using sql code
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  title: Sequelize.STRING,
  price: {
    type: Sequelize.DOUBLE,
    allowNull: false,
  },
  imageUrl: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  description: {
    type: Sequelize.STRING,
    allowNull: false,
  },
});

module.exports = Product;
