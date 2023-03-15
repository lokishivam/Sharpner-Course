const express = require("express");
const router = express.Router();

router.get("/", (req, res, next) => {
  console.log("welcome to middleware ");
  res.send("<h1> hello to node js </h1>");
});

module.exports = router;
