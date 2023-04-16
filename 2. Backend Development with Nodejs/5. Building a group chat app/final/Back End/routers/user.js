const express =  require('express');
const router = express.Router();

const userConstroller = require('../controllers/user');

router.post('/add-user', userConstroller.addUser);

module.exports = router;
