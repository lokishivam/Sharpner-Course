const path = require("path");
const rootDir = require("../util/path");

exports.getContactUs = (req, res, next) => {
  res.sendFile(path.join(rootDir, "views", "contact-us.html"));
};

exports.postSuccess = (req, res, next) => {
  res.sendFile(path.join(rootDir, "views", "success.html"));
};
