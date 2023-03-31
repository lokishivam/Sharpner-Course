const jwt = require("jsonwebtoken");
const User = require("../models/user");

exports.authenticateUser = async (req, res, next) => {
  console.log("hollaaaaaaaaaaaaaaaaaaaaaa");
  try {
    const token = req.header("token");
    const decoded = jwt.verify(token, "secretkey123"); //gives decoded value
    if (!decoded) {
      res.status(404).json({ success: false });
    } else {
      const user = await User.findByPk(decoded.id);
      if (user) {
        req.user = user;
      } else {
        res.status(404).json({ success: false });
      }
    }
    next();
  } catch (error) {
    console.log("bollaaaaaaaaaaaaaaaaaaaaaa");
    res.status(404).json(error);
  }
};
