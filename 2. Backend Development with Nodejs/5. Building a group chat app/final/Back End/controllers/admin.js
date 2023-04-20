const Group = require("../models/group");
const User = require("../models/user");

exports.addUserToGroup = async (req, res) => {
  try {
    const { userEmail, groupId } = req.body;
    const group = await Group.findOne({ where: { id: groupId } });
    userToBeAdded = await User.findOne({ where: { email: userEmail } });

    if (userToBeAdded) {
      const result = await group.addUser(userToBeAdded, {
        through: { isAdmin: false },
      });
      return res.json({ message: "user is added" });
    } else {
      return res.status(404).json({
        message:
          "The email of the user you provided is invalid or user dosent exist in this app",
      });
    }
  } catch (error) {
    console.log(error);
    res.status(404).json({ error, message: error.message });
  }
};

exports.removeFromGroup = async (req, res) => {
  try {
    const { userEmail, groupId } = req.body;
    const group = await Group.findOne({ where: { id: groupId } });
    userToBeRemoved = await User.findOne({ where: { email: userEmail } });

    if (userToBeRemoved) {
      const result = await group.removeUser(userToBeRemoved);
      //console.log(result);
      return res.json({ message: "user Removed" });
    } else {
      return res.status(404).json({
        message:
          "The email of the user you provided is invalid or user dosent exist in this app",
      });
    }
  } catch (error) {
    console.log(error);
    res.status(404).json({ error, message: error.message });
  }
};

//note : if the user is not the member of the group,makeAdmin will make him member and admin.
exports.makeUserAdmin = async (req, res) => {
  try {
    const { userEmail, groupId } = req.body;
    const group = await Group.findOne({ where: { id: groupId } });
    userToBeAdmin = await User.findOne({ where: { email: userEmail } });

    if (userToBeAdmin) {
      const result = await group.addUser(userToBeAdmin, {
        through: { isAdmin: true },
      });
      //console.log(result);
      return res.json({ message: "made admin" });
    } else {
      return res.status(404).json({
        message:
          "The email of the user you provided is invalid or user dosent exist in this app",
      });
    }
  } catch (error) {
    console.log(error);
    res.status(404).json({ error, message: error.message });
  }
};
