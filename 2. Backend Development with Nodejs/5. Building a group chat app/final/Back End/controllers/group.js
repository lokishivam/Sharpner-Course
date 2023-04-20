const Group = require("../models/group");
const User = require("../models/user");

exports.createGroup = async (req, res) => {
  try {
    const user = req.user;
    const { groupName } = req.body;
    const group = await Group.create({ name: groupName });
    await group.addUser(user, { through: { isAdmin: true } });
    res.json(group);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};

exports.getAllGroups = async (req, res) => {
  try {
    const user = req.user;
    /*//getting groups through Group.frindAll()
    const groups = await Group.findAll({
      attributes: ["id", "name"],
      include: [
        {
          model: User,
          where: { id: user.id },
          attributes: ["id"],
          through: { attributes: ["isAdmin"] },
        },
      ],
    });
*/

    const groups = await user.getGroups({ joinTableAttributes: ["isAdmin"] });
    res.json(groups);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};
