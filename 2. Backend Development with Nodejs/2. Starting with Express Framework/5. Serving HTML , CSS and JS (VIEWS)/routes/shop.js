const express = require("express");
const router = express.Router();
const path = require("path");
const rootDir = require("../util/path");

router.get("/", (req, res, next) => {
  res.sendFile(path.join(rootDir, "views", "shop.html")); //we want to send a file and not html in string
  //sendFile is express function which will also set the headers
  //console.log(__dirname);
  //__dirname will help you find the absolute path of the folder of cur file.
});

module.exports = router;
