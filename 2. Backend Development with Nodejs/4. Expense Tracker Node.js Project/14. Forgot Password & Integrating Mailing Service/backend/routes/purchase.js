const express = require("express");
const router = express.Router();

const purchaseController = require("../controllers/purchase");
const authenticationMiddleware = require("../middlewares/authentication");

router.use(
  "/buy-premium",
  authenticationMiddleware.authenticateUser,
  purchaseController.getBuyPremium
);

router.use(
  "/update-premium",
  authenticationMiddleware.authenticateUser,
  purchaseController.postUpdatePremium
);

module.exports = router;
