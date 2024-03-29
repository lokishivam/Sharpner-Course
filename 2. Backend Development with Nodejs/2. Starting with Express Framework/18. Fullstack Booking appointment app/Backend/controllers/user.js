const User = require("../models/user");

exports.postAddUser = async (req, res) => {
  try {
    const user = req.body;
    const resultUser = await User.create({
      name: user.name === "" ? null : user.name,
      email: user.email,
      phone: user.phone,
    });
    res.json(resultUser);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};

exports.getAddUsers = async (req, res) => {
  try {
    const users = await User.findAll();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json(error);
  }
};

exports.getDeleteUser = async (req, res) => {
  try {
    const id = req.params.userId;
    const user = await User.findByPk(id);
    const destroyedUser = await user.destroy();
    res.status(200).json();
  } catch (error) {
    res.status(500).json(error); //internal server error
  }
};

exports.getUser = async (req, res) => {
  try {
    const id = req.params.userId;
    const user = await User.findByPk(id);
    res.status(200).json(user);
  } catch (error) {
    res.status(200).json(user);
  }
};

exports.postEditUser = async (req, res) => {
  try {
    const obj = req.body;
    const user = await User.findByPk(obj.id);
    user.name = obj.name;
    user.email = obj.email;
    user.phone = obj.phone;
    await user.save();
    res.status(200).json(); //we need to send so that request made by frontend gets resolved.
  } catch (error) {
    res.status(500).json(error);
  }
};
