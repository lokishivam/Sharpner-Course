const express = require("express");
const router = express.Router();

const premiumFeatureController = require("../controllers/premiumFeature");
// const authenticationMiddleware = require("../middlewares/authentication");

router.use(
  "/leadership",
  //   authenticationMiddleware.authenticateUser,
  premiumFeatureController.getLeadership
);

module.exports = router;
