const express =  require('express');
const router = express.Router();

const auth = require('../middleware/auth');
const messageConstroller = require('../controllers/message');

router.post('/add-message', auth.authenticateUser ,messageConstroller.addMessage);

module.exports = router;
