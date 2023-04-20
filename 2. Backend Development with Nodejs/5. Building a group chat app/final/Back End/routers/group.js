const express = require("express");
const router = express.Router();

const auth = require("../middleware/auth");
const groupController = require("../controllers/group");

router.post(
  "/create-group",
  auth.authenticateUser,
  groupController.createGroup
);

router.get(
  "/get-all-groups",
  auth.authenticateUser,
  groupController.getAllGroups
);

module.exports = router;
