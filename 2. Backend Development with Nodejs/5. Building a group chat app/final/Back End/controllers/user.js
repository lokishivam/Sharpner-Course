const bcrypt = require('bcrypt');
const User = require('../models/user');

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