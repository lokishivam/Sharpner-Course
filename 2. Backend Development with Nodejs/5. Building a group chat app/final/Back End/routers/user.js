const express =  require('express');
const router = express.Router();

const userConstroller = require('../controllers/user');

router.post('/add-user', userConstroller.addUser);

router.post('/verify-user', userConstroller.verifyUser);

module.exports = router;
