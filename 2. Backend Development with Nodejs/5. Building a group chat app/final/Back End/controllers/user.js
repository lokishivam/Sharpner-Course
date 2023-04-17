const bcrypt = require('bcrypt');
const User = require('../models/user');
const jwt = require("jsonwebtoken");
require('dotenv').config();

exports.addUser = async (req, res) => {
    try {
        const {name, email, password, mobile} = req.body
        const crptPassword = await bcrypt.hash(password, 10);
        console.log(crptPassword);
        await User.create({name, mobile,email, password: crptPassword});
        res.json('signup successful');
    } catch (error) {
        console.log(error);
        res.status(404).json(error);
    }
}

const getToken = (id) => {
    return jwt.sign({id}, process.env.JWT_SECRET_KEY);
}
exports.getToken = getToken;

exports.verifyUser = async (req, res) => {
    try {
        const {email, password, mobile} = req.body;

        const user = await User.findOne({where:{email:email}});
        //console.log(user);
        
        if (user) {
            bcrypt.compare(password, user.password, (err, result) => {
                if (result) {
                return res
                    .status(200)
                    .json({ token: getToken(user.id) });
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
        res.status(404).json(error)
    }
}