const User = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const getToken = (id, ispremiumuser) => {
  return jwt.sign({ id, ispremiumuser }, "secretkey123"); //secretkey can be anything, usually random big string
  //we are generating token, this token will encrypt the id.
  //once loggedin user should save this token in localstorage and make request through this token only.
};
exports.getToken = getToken;

//signup
exports.postAddUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const hash = await bcrypt.hash(password, 10);
    const user = new User({
      name: name,
      email: email,
      password: hash,
      ispremiumuser: false,
    });
    await user.save();

    res.json({ success: true });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error, message: "UnsuccessFul signup attempt" });
  }
};

//login
exports.postVerifyUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (user) {
      bcrypt.compare(password, user.password, (err, result) => {
        if (result) {
          return res
            .status(200)
            .json({ token: getToken(user.id, user.ispremiumuser) });
        } else {
          return res
            .status(401)
            .json({ errors: [{ message: "Incorrect password" }] });
        }
      });
    } else {
      res.status(404).json({ errors: [{ message: "User dosent exists" }] });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};
