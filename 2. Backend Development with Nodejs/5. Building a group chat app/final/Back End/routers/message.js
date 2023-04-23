const express = require("express");
const router = express.Router();

const auth = require("../middleware/auth");
const messageConstroller = require("../controllers/message");

//router.post('/add-message/:groupId', auth.authenticateUser ,messageConstroller.addMessage);

router.get("/get-recent-messages", messageConstroller.getRecentMessages);

module.exports = router;
