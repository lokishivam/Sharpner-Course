const Group = require("../models/group");
const Message = require("../models/message");
const User = require("../models/user");

// exports.addMessage = async (req, res) => {
//   try {
//     const groupId = req.params.groupId;

//     if (groupId === "undefined") {
//       throw { message: "Select a group to message" };
//     }
//     const user = req.user;
//     const { message } = req.body;
//     await user.createMessage({
//       sender: user.name,
//       message: message,
//       groupId: groupId,
//     });
//     res.json({ sucsess: true });
//   } catch (error) {
//     console.log(error);
//     res.status(500).json({ message: error.message });
//   }
// };

//getting messages through websockets
exports.addMessage = async (groupId, userId, message, callback) => {
  try {
    const user = await User.findOne({ where: { id: userId } });
    if (groupId === "undefined") {
      throw new Error({ message: "Select a group to message" });
    }

    const resultMessage = await user.createMessage({
      sender: user.name,
      message: message,
      groupId: groupId,
    });

    const io = require("../socket").getIO();
    callback("sent", null);

    io.to(groupId).emit("recieveMessage", groupId, resultMessage); //emmiting messsages to all members in the group
  } catch (error) {
    console.log(error);
    callback("failed to send", error);
  }
};

exports.getMessages = async (req, res) => {
  try {
    const groupId = req.params.groupId;
    const group = await Group.findOne({ where: { id: groupId } });

    const messages = await group.getMessages();
    // console.log('MMMMMMMMMMM',messages);
    res.json(messages);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};

/*know that we are not using messageId as offset in this function.
because a group will have messages whose Id's are consecutive e.g. [3,5,9,34,....]
So we will use the index of the array after we ask for a group's array.
*/
exports.getRecentMessages = async (req, res) => {
  try {
    const groupId = Number(req.query.groupId);

    let oldestMessageIndex; //the oldest message that is printed in chatbox
    if (req.query.oldestMessageLoaded === "undefined") {
      const count = await Message.count({
        where: {
          groupId: groupId,
        },
      });
      oldestMessageIndex = count;
    } else {
      oldestMessageIndex = Number(req.query.oldestMessageLoaded);
    }

    console.log(oldestMessageIndex);
    let fromIndex = oldestMessageIndex - 10; //starting index of the new Arrayarray that I will be sending.
    fromIndex = fromIndex >= 0 ? fromIndex : 0;

    const group = await Group.findOne({ where: { id: groupId } });

    const messages = await group.getMessages({
      limit: 10,
      offset: fromIndex,
    });

    res.json({ messages, oldestMessageSentIndex: fromIndex });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};
