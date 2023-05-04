const express = require("express");

const router = express.Router();

const userControllers = require("../controllers/user");

router.post("/add-user", userControllers.postAddUser);

router.post("/verify-user", userControllers.postVerifyUser);

module.exports = router;
