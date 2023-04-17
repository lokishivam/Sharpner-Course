//1. get the jwt and verify if user exists
//2. get the user and add it to the req

//verify jwt
//1. jwt parsing function
require("dotenv").config();
const jwt = require("jsonwebtoken");
const User = require("../models/user");

exports.authenticateUser = async (req, res, next) => {
  try {
    
    const token = req.header("token");

    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY); //gives decoded value
    
    if (!decoded) {
      return res.status(404).json({ success: false, message: "user doesnt exists" });
    } else {
      const user = await User.findByPk(decoded.id);
      if (user) {
        req.user = user;//adding user to req
      } else {
        return res.status(404).json({ success: false, message: "user doesnt exists"});
      }
    }
    next();//*** */
  } catch (error) {
    console.log(error);
    res.status(404).json({error, message:"auth failed"});
  }
};