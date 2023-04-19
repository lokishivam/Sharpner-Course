const Sequelize = require("sequelize");

const sequelize = require("../util/database");

const GroupMembership = sequelize.define('groupMembership', {
    id: {
        type: Sequelize.INTEGER, 
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
      },
    isAdmin: Sequelize.BOOLEAN,
  });

module.exports = GroupMembership; //Group model is exported
