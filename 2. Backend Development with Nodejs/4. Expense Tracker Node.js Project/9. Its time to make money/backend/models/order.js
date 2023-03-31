const Sequelize = require("sequelize");
const sequelize = require("../util/database");

const Order = sequelize.define("order", {
  id: {
    type: Sequelize.INTEGER, //we no longer are using sql code
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  orderId: { type: Sequelize.STRING },
  purchaseStatus: { type: Sequelize.STRING },
  paymentId: { type: Sequelize.STRING },
});

module.exports = Order;
