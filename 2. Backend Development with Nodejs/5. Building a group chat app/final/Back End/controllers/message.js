const Group = require("../models/group");
const Message = require("../models/message");

exports.addMessage = async (req, res) => {
  try {
    const groupId = req.params.groupId;

    if (groupId === "undefined") {
      throw { message: "Select a group to message" };
    }
    const user = req.user;
    const { message } = req.body;
    await user.createMessage({
      sender: user.name,
      message: message,
      groupId: groupId,
    });
    res.json({ sucsess: true });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};

exports.getMessages = async (req, res) => {
  try {
    const groupId = req.params.groupId;
    const group = await Group.findOne({ where: { id: groupId } });
    console.log(group);
    const messages = await group.getMessages();
    // console.log('MMMMMMMMMMM',messages);
    res.json(messages);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};

exports.getRecentMessages = async (req, res) => {
  try {
    const from = Number(req.query.from);
    const messages = await Message.findAll({
      offset: from == 0 ? 0 : from - 1, //from will never be 0 **made sure by front end
      //no limit
    });
    res.json(messages);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};
