//1. get the jwt and verify if user exists
//2. get the user and add it to the req

//verify jwt
//1. jwt parsing function
require("dotenv").config();
const jwt = require("jsonwebtoken");
const User = require("../models/user");
const GroupMembership = require("../models/groupMembership");

exports.authenticateUser = async (req, res, next) => {
  try {
    const token = req.header("token");

    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY); //gives decoded value

    if (!decoded) {
      return res
        .status(404)
        .json({ success: false, message: "user doesnt exists" });
    } else {
      const user = await User.findByPk(decoded.id);
      if (user) {
        req.user = user; //adding user to req
      } else {
        return res
          .status(404)
          .json({ success: false, message: "user doesnt exists" });
      }
    }
    next(); //*** */
  } catch (error) {
    console.log(error);
    res.status(404).json({ error, message: "auth failed" });
  }
};

//
//whether a user is a admin or not
//we have a user which is to be added, a group and a admin.
//if the admin is genuine of the group,
//if not return an error.

exports.authenticateAdmin = async (req, res, next) => {
  try {
    const { groupId } = req.body;
    const adminId = req.user.id;
    const result = await GroupMembership.findOne({
      where: { groupId: groupId, userId: adminId, isAdmin: true },
    });
    // console.log(result);
    if (!result) {
      return res.status(404).json({ message: "You are not a admin" });
    }
    next();
  } catch (error) {
    console.log(error);
    res.status(404).json({ error, message: error.message });
  }
};
