const express = require("express");

const router = express.Router();

const userControllers = require("../controllers/user");

router.post("/add-user", userControllers.postAddUser);

router.get("/get-users", userControllers.getAddUsers);

router.post("/edit-user", userControllers.postEditUser);

router.get("/delete/:userId", userControllers.getDeleteUser);

router.get("/get-user/:userId", userControllers.getUser);

module.exports = router;
