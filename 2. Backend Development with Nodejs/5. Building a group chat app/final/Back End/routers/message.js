const express =  require('express');
const router = express.Router();

const auth = require('../middleware/auth');
const messageConstroller = require('../controllers/message');

router.post('/add-message', auth.authenticateUser ,messageConstroller.addMessage);

router.get('/get-all-messages', auth.authenticateUser ,messageConstroller.getMessages);

router.get('/get-recent-messages', messageConstroller.getRecentMessages);

module.exports = router;
