const User = require("../models/user");
const bcrypt = require("bcrypt");

exports.postAddUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const hash = await bcrypt.hash(password, 10);
    const user = await User.create({
      name: name === "" ? null : name,
      email: email === "" ? null : email,
      password: hash === "" ? null : hash,
    });
    res.json();
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};

exports.postVerifyUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ where: { email } }); //const users = await User.findAll({ where: { email } })//users[0]
    // it's possible that the findOne method may not return the instance that you expect,
    // as it will only return the first one that it finds. So use it only for a unique identifier.
    //user is either a valid user or null.

    if (user) {
      bcrypt.compare(password, user.password, (err, result) => {
        if (err) {
          res.status(401).json({ errors: [{ message: "Incorrect password" }] });
        } else {
          res.status(200).json();
        }
      });
    } else {
      res.status(404).json({ errors: [{ message: "User dosent exists" }] });
    }
  } catch (error) {
    res.status(500).json(error);
  }
};

// exports.getAddUsers = async (req, res) => {
//   try {
//     const users = await User.findAll();
//     res.status(200).json(users);
//   } catch (error) {
//     res.status(500).json(error);
//   }
// };

// exports.getDeleteUser = async (req, res) => {
//   try {
//     const id = req.params.userId;
//     const user = await User.findByPk(id);
//     const destroyedUser = await user.destroy();
//     res.status(200).json();
//   } catch (error) {
//     res.status(500).json(error); //internal server error
//   }
// };

// exports.getUser = async (req, res) => {
//   try {
//     const id = req.params.userId;
//     const user = await User.findByPk(id);
//     res.status(200).json(user);
//   } catch (error) {
//     res.status(200).json(user);
//   }
// };

// exports.postEditUser = async (req, res) => {
//   try {
//     const obj = req.body;
//     const user = await User.findByPk(obj.id);
//     user.name = obj.name;
//     user.email = obj.email;
//     user.phone = obj.phone;
//     await user.save();
//     res.status(200).json(); //we need to send so that request made by frontend gets resolved.
//   } catch (error) {
//     res.status(500).json(error);
//   }
// };
