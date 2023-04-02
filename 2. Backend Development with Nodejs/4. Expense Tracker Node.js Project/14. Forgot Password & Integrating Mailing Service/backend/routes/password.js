const express = require("express");
const router = express.Router();

const passwordController = require("../controllers/password");

router.use("/forgotPassword", passwordController.forgotPasswordHandler);

module.exports = router;
