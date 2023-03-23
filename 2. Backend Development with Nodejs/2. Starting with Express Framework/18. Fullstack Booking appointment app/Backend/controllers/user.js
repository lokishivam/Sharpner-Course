const User = require("../models/user");

exports.postAddUser = (req, res) => {
  const user = req.body;
  User.create({
    name: user.name,
    email: user.email,
    phone: user.phone,
  })
    .then((user) => {
      res.json(user);
    })
    .catch();
};

exports.getAddUsers = (req, res) => {
  User.findAll()
    .then((users) => {
      res.json(users);
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.getDeleteUser = (req, res) => {
  const id = req.params.userId;
  console.log(id);
  User.findByPk(id)
    .then((user) => {
      return user.destroy();
    })
    .then(() => {
      console.log("deleted successfuly");
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.getUser = (req, res) => {
  const id = req.params.userId;
  User.findByPk(id)
    .then((user) => {
      res.json(user);
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.postEditUser = (req, res) => {
  const obj = req.body;
  User.findByPk(obj.id)
    .then((user) => {
      user.name = obj.name;
      user.email = obj.email;
      user.phone = obj.phone;
      return user.save();
    })
    .then((user) => {
      console.log(user);
      res.json(user); //we need to send so that request made by frontend gets resolved.
    })
    .catch((err) => {
      console.log(err);
    });
};
