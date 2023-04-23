require("dotenv").config();
const Group = require("../models/group");
const Message = require("../models/message");
const User = require("../models/user");
const AWS = require("aws-sdk");

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
      imageLink: null,
      groupId: groupId,
    });

    const io = require("../socket").getIO(); //dont import on the top, server starts after all the files are loaded.
    callback("sent", null);

    io.to(groupId).emit("recieveMessage", groupId, resultMessage); //emmiting messsages to all members in the group
  } catch (error) {
    console.log(error);
    callback("failed to send", error);
  }
};

//pagination
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

exports.addImage = async (groupId, userId, dataUrl, callback) => {
  try {
    const io = require("../socket").getIO();
    const base64Data = dataUrl.replace(/^data:image\/\w+;base64,/, "");
    const buffer = new Buffer.from(base64Data, "base64");
    // process the image data
    const fileName = `imageUpload-${new Date().getTime()}.jpg`;
    console.log(`Received image with data URL`);

    const s3response = await uploadToS3(buffer, fileName);

    const user = await User.findOne({ where: { id: userId } });
    const resultMessage = await user.createMessage({
      sender: user.name,
      message: null,
      imageLink: s3response.Location,
      groupId: groupId,
    });
    callback("sent", null);

    io.to(groupId).emit("recieveMessage", groupId, resultMessage);
  } catch (error) {
    console.log(error);
    callback("failed to send", error);
  }
};

const uploadToS3 = async (data, fileName) => {
  try {
    //console.log("3.1 Entered into s3 function");
    const S3_BUCKET_NAME = process.env.S3_BUCKET_NAME;
    const AWS_IAM_ACCESS_KEY = process.env.AWS_IAM_ACCESS_KEY;
    const AWS_IAM_SECRET_KEY = process.env.AWS_IAM_SECRET_KEY;

    //create an awsS3 object
    const s3bucket = new AWS.S3({
      accessKeyId: AWS_IAM_ACCESS_KEY,
      secretAccessKey: AWS_IAM_SECRET_KEY,
    });

    const params = {
      Bucket: S3_BUCKET_NAME,
      Key: fileName,
      Body: data,
      ContentType: "image/jpeg",
      ACL: "public-read",
    };

    const s3response = await s3bucket.upload(params).promise();
    console.log(s3response.Location);
    return s3response;
  } catch (error) {
    console.log(error);
  }
};
