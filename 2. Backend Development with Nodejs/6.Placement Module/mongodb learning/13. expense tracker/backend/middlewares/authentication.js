const jwt = require("jsonwebtoken");
const User = require("../models/user");

exports.authenticateUser = async (req, res, next) => {
  try {
    const token = req.header("token");
    const decoded = jwt.verify(token, "secretkey123"); //gives decoded value
    if (!decoded) {
      return res.status(404).json("invalid token");
    } else {
      const user = await User.findOne({ _id: decoded.id });
      if (user) {
        req.user = user;
      } else {
        return res.status(404).json("user not found");
      }
    }
    next();
  } catch (error) {
    console.log(error);
    res.status(404).json(error.message);
  }
};
