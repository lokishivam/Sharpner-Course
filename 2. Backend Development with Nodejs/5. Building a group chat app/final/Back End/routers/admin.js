const express = require("express");
const router = express.Router();

const auth = require("../middleware/auth");
const adminController = require("../controllers/admin");

//
router.post(
  "/add-to-group",
  auth.authenticateUser,
  auth.authenticateAdmin,
  adminController.addUserToGroup
);

router.post(
  "/remove-from-group",
  auth.authenticateUser,
  auth.authenticateAdmin,
  adminController.removeFromGroup
);

router.post(
  "/make-user-admin",
  auth.authenticateUser,
  auth.authenticateAdmin,
  adminController.makeUserAdmin
);

module.exports = router;
