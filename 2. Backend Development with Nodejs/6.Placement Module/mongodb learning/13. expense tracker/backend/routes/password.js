const express = require("express");
const router = express.Router();

const passwordController = require("../controllers/password");

router.post("/forgotPassword", passwordController.forgotPasswordHandler);
router.get("/resetPassword/:id", passwordController.resetPasswordHandler);
router.use("/updatePassword/:FpId", passwordController.updatePassword);

module.exports = router;
